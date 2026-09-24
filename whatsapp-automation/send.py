#!/usr/bin/env python3
"""
İRİA tədbir dəvəti — WhatsApp göndərmə alətı.

İki rejim var:

  links  — Şəxsi / WhatsApp Business tətbiqi üçün. Hər nömrə üçün mesajı
           əvvəlcədən dolduran wa.me linki olan HTML səhifə yaradır. Linkə
           klikləyirsiniz, WhatsApp açılır, "Göndər"i özünüz basırsınız.
           Heç bir bot / qeyri-rəsmi kitabxana istifadə olunmur.

  cloud  — Rəsmi WhatsApp Business Cloud API (Meta). Tam avtomatik.
           Meta tərəfindən təsdiqlənmiş şablon (template) tələb edir.
           Bloklanmamaq üçün ən etibarlı yoldur.

Nümunələr:
  python3 send.py links                       # links.html yaradır
  python3 send.py cloud --dry-run             # heç nə göndərmir, yoxlayır
  python3 send.py cloud --test +994774407050  # yalnız test nömrəsinə
  python3 send.py cloud                       # contacts.csv-dəki hamıya

Yalnız Python standart kitabxanası istifadə olunur.
"""

import argparse
import csv
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
CONTACTS = HERE / "contacts.csv"
MESSAGE = HERE / "message.txt"
SENT_LOG = HERE / "sent_log.csv"
LINKS_HTML = HERE / "links.html"

GRAPH_VERSION = os.environ.get("WA_GRAPH_VERSION", "v21.0")


# --------------------------------------------------------------------------- #
# Nömrələr
# --------------------------------------------------------------------------- #
def normalize_az(raw: str) -> str | None:
    """Azərbaycan nömrəsini 994XXXXXXXXX formatına salır (+ işarəsiz)."""
    digits = re.sub(r"\D", "", raw or "")
    if digits.startswith("00"):
        digits = digits[2:]
    if digits.startswith("994") and len(digits) == 12:
        return digits
    if digits.startswith("0") and len(digits) == 10:  # 0501234567
        return "994" + digits[1:]
    if len(digits) == 9:  # 501234567
        return "994" + digits
    return None


def load_contacts(path: Path) -> list[dict]:
    contacts, seen = [], set()
    with path.open(encoding="utf-8-sig", newline="") as f:
        for i, row in enumerate(csv.DictReader(f), start=2):
            phone = normalize_az(row.get("phone", ""))
            if not phone:
                print(f"  [!] sətir {i}: yanlış nömrə '{row.get('phone')}', ötürülür")
                continue
            if phone in seen:
                print(f"  [!] sətir {i}: təkrar nömrə {phone}, ötürülür")
                continue
            seen.add(phone)
            contacts.append({"phone": phone, "name": (row.get("name") or "").strip()})
    return contacts


def load_sent() -> set[str]:
    if not SENT_LOG.exists():
        return set()
    with SENT_LOG.open(encoding="utf-8", newline="") as f:
        return {r["phone"] for r in csv.DictReader(f) if r.get("status") == "sent"}


def log_result(phone: str, status: str, detail: str) -> None:
    new = not SENT_LOG.exists()
    with SENT_LOG.open("a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if new:
            w.writerow(["time", "phone", "status", "detail"])
        w.writerow([datetime.now().isoformat(timespec="seconds"), phone, status, detail])


# --------------------------------------------------------------------------- #
# links rejimi
# --------------------------------------------------------------------------- #
def build_links(contacts: list[dict], text: str) -> None:
    rows = []
    for n, c in enumerate(contacts, 1):
        url = f"https://wa.me/{c['phone']}?text={urllib.parse.quote(text)}"
        label = html.escape(c["name"] or "")
        rows.append(
            f'<tr><td>{n}</td><td>+{c["phone"]}</td><td>{label}</td>'
            f'<td><a href="{url}" target="_blank" onclick="this.closest(\'tr\').classList.add(\'done\')">'
            f"WhatsApp-da aç</a></td></tr>"
        )
    page = f"""<!doctype html><html lang="az"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>WhatsApp dəvətləri</title>
<style>
body{{font-family:system-ui,sans-serif;max-width:760px;margin:24px auto;padding:0 16px}}
table{{border-collapse:collapse;width:100%}}td{{padding:8px;border-bottom:1px solid #ddd}}
tr.done{{opacity:.4;text-decoration:line-through}}
pre{{white-space:pre-wrap;background:#f5f5f5;padding:12px;border-radius:8px}}
</style>
<h1>WhatsApp dəvətləri ({len(contacts)} nəfər)</h1>
<p>Linkə klikləyin → WhatsApp açılır → mesajı yoxlayıb <b>Göndər</b>-i basın.
Tələsməyin: hər mesaj arasında bir qədər gözləyin, bir gündə hamısını birdən göndərməyin.</p>
<details><summary>Mesaj mətni</summary><pre>{html.escape(text)}</pre></details>
<table>{''.join(rows)}</table></html>"""
    LINKS_HTML.write_text(page, encoding="utf-8")
    print(f"[✓] {LINKS_HTML} yaradıldı ({len(contacts)} link)")


# --------------------------------------------------------------------------- #
# cloud rejimi (rəsmi API)
# --------------------------------------------------------------------------- #
def send_template(token: str, phone_id: str, to: str, template: str, lang: str) -> tuple[bool, str]:
    url = f"https://graph.facebook.com/{GRAPH_VERSION}/{phone_id}/messages"
    body = {
        "messaging_product": "whatsapp",
        "to": to,
        "type": "template",
        "template": {"name": template, "language": {"code": lang}},
    }
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = json.load(r)
            return True, data.get("messages", [{}])[0].get("id", "")
    except urllib.error.HTTPError as e:
        return False, f"HTTP {e.code}: {e.read().decode(errors='replace')[:300]}"
    except urllib.error.URLError as e:
        return False, f"şəbəkə xətası: {e.reason}"


def run_cloud(contacts: list[dict], args) -> None:
    token = os.environ.get("WA_TOKEN")
    phone_id = os.environ.get("WA_PHONE_NUMBER_ID")
    template = args.template or os.environ.get("WA_TEMPLATE", "iria_event_invite")
    lang = args.lang or os.environ.get("WA_TEMPLATE_LANG", "az")

    if not args.dry_run and not (token and phone_id):
        sys.exit("WA_TOKEN və WA_PHONE_NUMBER_ID mühit dəyişənlərini təyin edin (README-yə baxın).")

    sent = load_sent()
    todo = [c for c in contacts if c["phone"] not in sent]
    skipped = len(contacts) - len(todo)
    if skipped:
        print(f"  {skipped} nömrəyə artıq göndərilib (sent_log.csv), ötürülür")
    print(f"  Şablon: {template} ({lang}) — {len(todo)} nömrə")

    if not args.dry_run and not args.test and not args.yes:
        if input(f"{len(todo)} nəfərə göndərilsin? [y/N] ").strip().lower() != "y":
            sys.exit("Ləğv edildi.")

    ok = fail = 0
    for n, c in enumerate(todo, 1):
        if args.dry_run:
            print(f"  [dry-run] {n}/{len(todo)} → +{c['phone']}")
            continue
        success, detail = send_template(token, phone_id, c["phone"], template, lang)
        log_result(c["phone"], "sent" if success else "failed", detail)
        if success:
            ok += 1
            print(f"  [✓] {n}/{len(todo)} +{c['phone']}")
        else:
            fail += 1
            print(f"  [✗] {n}/{len(todo)} +{c['phone']} — {detail}")
            # Keyfiyyət / limit xətasında dayan — davam etmək nömrənin reytinqini pisləşdirər.
            if any(code in detail for code in ("131048", "131056", "130429", "368")):
                sys.exit("Meta limit/keyfiyyət xəbərdarlığı verdi — göndərmə dayandırıldı.")
        time.sleep(args.delay)

    if not args.dry_run:
        print(f"\nNəticə: {ok} göndərildi, {fail} uğursuz. Ətraflı: {SENT_LOG.name}")


# --------------------------------------------------------------------------- #
def main() -> None:
    p = argparse.ArgumentParser(description="İRİA WhatsApp dəvət göndərişi")
    p.add_argument("mode", choices=["links", "cloud"])
    p.add_argument("--test", metavar="NÖMRƏ", help="yalnız bu nömrəyə göndər (contacts.csv nəzərə alınmır)")
    p.add_argument("--dry-run", action="store_true", help="heç nə göndərmə, sadəcə siyahını göstər")
    p.add_argument("--yes", action="store_true", help="təsdiq soruşma")
    p.add_argument("--delay", type=float, default=1.0, help="API sorğuları arası saniyə (default 1)")
    p.add_argument("--template", help="Meta şablon adı (default: iria_event_invite)")
    p.add_argument("--lang", help="şablon dil kodu (default: az)")
    p.add_argument("--contacts", type=Path, default=CONTACTS)
    args = p.parse_args()

    if args.test:
        phone = normalize_az(args.test)
        if not phone:
            sys.exit(f"Yanlış test nömrəsi: {args.test}")
        contacts = [{"phone": phone, "name": "Test"}]
    else:
        contacts = load_contacts(args.contacts)
    if not contacts:
        sys.exit("Göndəriləcək nömrə yoxdur.")

    if args.mode == "links":
        build_links(contacts, MESSAGE.read_text(encoding="utf-8").strip())
    else:
        run_cloud(contacts, args)


if __name__ == "__main__":
    main()
