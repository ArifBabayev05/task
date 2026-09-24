#!/usr/bin/env node
/*
 * İRİA dəvəti — WhatsApp-dan avtomatik göndərmə (öz kompüterinizdə işləyir).
 *
 * WhatsApp Web-ə sizin hesabınızla qoşulur (QR kodu bir dəfə skan edirsiniz),
 * contacts.csv-dəki nömrələrə message.txt-i olduğu kimi göndərir.
 * Gün ərzində fasilələrlə işləyir:
 *   - hər mesaj arası təsadüfi 1–1.5 dəqiqə
 *   - hər 15 mesajdan sonra 10 dəqiqə fasilə
 *   - yalnız iş saatlarında (10:00–18:00), qalan vaxt gözləyir
 *
 * İstifadə:
 *   npm install
 *   node auto.js --test 994774407050     # bir test mesajı
 *   node auto.js                         # contacts.csv-dəki hamı
 *
 * Kimə göndərildiyi sent_log.csv-də saxlanılır; dayandırıb yenidən işə salsanız
 * qaldığı yerdən davam edir, heç kimə ikinci dəfə getmir.
 */

const fs = require("fs");
const path = require("path");
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

const HERE = __dirname;
const CONTACTS = path.join(HERE, "contacts.csv");
const MESSAGE = path.join(HERE, "message.txt");
const SENT_LOG = path.join(HERE, "sent_log.csv");

// ---- Tənzimləmələr ---------------------------------------------------------
const CFG = {
  delayMin: 60, // mesajlar arası, saniyə
  delayMax: 90,
  batchSize: 15, // bu qədər mesajdan sonra uzun fasilə
  breakMin: 10 * 60,
  breakMax: 10 * 60,
  startHour: 10, // yalnız bu saatlar arası göndərir
  endHour: 18,
  maxFailsInRow: 3, // ardıcıl bu qədər xəta olsa dayanır
};

// ---- Köməkçilər ------------------------------------------------------------
const sleep = (s) => new Promise((r) => setTimeout(r, s * 1000));
const rand = (a, b) => a + Math.random() * (b - a);
const now = () => new Date().toLocaleTimeString("az-AZ", { hour12: false });
const log = (...a) => console.log(`[${now()}]`, ...a);

function normalizeAz(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("994") && d.length === 12) return d;
  if (d.startsWith("0") && d.length === 10) return "994" + d.slice(1);
  if (d.length === 9) return "994" + d;
  return null;
}

function loadContacts() {
  const lines = fs.readFileSync(CONTACTS, "utf8").replace(/^﻿/, "").split(/\r?\n/);
  const header = lines.shift().split(",").map((h) => h.trim().toLowerCase());
  const idx = header.indexOf("phone");
  const seen = new Set();
  const out = [];
  lines.forEach((line, i) => {
    if (!line.trim()) return;
    const phone = normalizeAz(line.split(",")[idx]);
    if (!phone) return log(`[!] sətir ${i + 2}: yanlış nömrə, ötürülür`);
    if (seen.has(phone)) return log(`[!] sətir ${i + 2}: təkrar nömrə ${phone}, ötürülür`);
    seen.add(phone);
    out.push(phone);
  });
  return out;
}

function loadSent() {
  if (!fs.existsSync(SENT_LOG)) return new Set();
  return new Set(
    fs.readFileSync(SENT_LOG, "utf8").split(/\r?\n/).slice(1)
      .map((l) => l.split(","))
      .filter((c) => c[2] === "sent" || c[2] === "not_on_whatsapp")
      .map((c) => c[1])
  );
}

function record(phone, status, detail = "") {
  if (!fs.existsSync(SENT_LOG)) fs.writeFileSync(SENT_LOG, "time,phone,status,detail\n");
  const safe = String(detail).replace(/[\r\n,]/g, " ");
  fs.appendFileSync(SENT_LOG, `${new Date().toISOString()},${phone},${status},${safe}\n`);
}

async function waitForWorkingHours() {
  for (;;) {
    const h = new Date().getHours();
    if (h >= CFG.startHour && h < CFG.endHour) return;
    log(`İş saatı deyil (${CFG.startHour}:00–${CFG.endHour}:00), 10 dəq gözləyirəm...`);
    await sleep(600);
  }
}

// ---- WhatsApp bağlantısı ---------------------------------------------------
// whatsapp-web.js-in məlum xətası: səhifə arxa planda yenilənəndə
// "Attempted to use detached Frame" çıxır. Belə xətada brauzeri yenidən açıb
// eyni nömrəni təkrar yoxlayırıq (mesaj getməyib, ona görə təkrar göndərmə olmur).
const CONN_ERR = /detached Frame|Execution context was destroyed|Target closed|Session closed|Protocol error|Connection closed/i;

function connect() {
  return new Promise((resolve, reject) => {
    const client = new Client({
      authStrategy: new LocalAuth({ dataPath: path.join(HERE, ".wa-session") }),
      puppeteer: { headless: false }, // brauzer pəncərəsi görünür — nə baş verdiyini izləyə bilərsiniz
    });
    client.on("qr", (qr) => {
      log("Telefonda: WhatsApp → Parametrlər → Əlaqəli cihazlar → Cihaz əlavə et, bu QR-ı skan edin:");
      qrcode.generate(qr, { small: true });
    });
    client.on("auth_failure", (m) => reject(new Error("Giriş alınmadı: " + m)));
    client.on("disconnected", (r) => {
      log("Əlaqə kəsildi:", r);
      if (r === "LOGOUT") {
        log("Telefondan çıxış edilib — proqram dayandırıldı. Yenidən işə salıb QR-ı skan edin.");
        process.exit(1);
      }
    });
    client.once("ready", async () => {
      log("WhatsApp-a qoşuldu, söhbətlərin yüklənməsi gözlənilir...");
      await sleep(20);
      resolve(client);
    });
    client.initialize().catch(reject);
  });
}

async function reconnect(old) {
  try {
    await old.destroy();
  } catch (_) {}
  await sleep(15);
  return connect();
}

async function sendOne(client, phone, text) {
  const wid = await client.getNumberId(phone);
  if (!wid) return "not_on_whatsapp";
  await client.sendMessage(wid._serialized, text);
  return "sent";
}

// ---- Əsas ------------------------------------------------------------------
async function run(text, phones) {
  let client = await connect();
  let sent = 0;
  let failsInRow = 0;

  for (let i = 0; i < phones.length; i++) {
    const phone = phones[i];
    const tag = `${i + 1}/${phones.length} +${phone}`;
    await waitForWorkingHours();

    let status, detail = "";
    for (let attempt = 1; ; attempt++) {
      try {
        status = await sendOne(client, phone, text);
        break;
      } catch (e) {
        if (CONN_ERR.test(e.message) && attempt <= 3) {
          log(`  bağlantı problemi (${attempt}/3), brauzer yenidən açılır...`);
          client = await reconnect(client);
          continue;
        }
        status = "failed";
        detail = e.message;
        break;
      }
    }
    record(phone, status, detail);

    if (status === "not_on_whatsapp") {
      log(`[–] ${tag} WhatsApp-da yoxdur, ötürülür`);
      continue; // mesaj getmədi — fasiləyə ehtiyac yoxdur
    }
    if (status === "failed") {
      failsInRow++;
      log(`[✗] ${tag} — ${detail}`);
      if (failsInRow >= CFG.maxFailsInRow) {
        log("Ardıcıl xətalar — təhlükəsizlik üçün dayandırıldı. Hesabı yoxlayın.");
        break;
      }
    } else {
      sent++;
      failsInRow = 0;
      log(`[✓] ${tag}`);
    }

    if (i === phones.length - 1) break;
    if (status === "sent" && sent % CFG.batchSize === 0) {
      const b = rand(CFG.breakMin, CFG.breakMax);
      log(`${sent} mesaj göndərildi — ${Math.round(b / 60)} dəq fasilə`);
      await sleep(b);
    } else {
      const d = rand(CFG.delayMin, CFG.delayMax);
      log(`  növbəti mesaj ${Math.round(d)} san sonra`);
      await sleep(d);
    }
  }
  log(`Bitdi: ${sent} mesaj göndərildi. Ətraflı: sent_log.csv`);
  await sleep(5);
  try {
    await client.destroy();
  } catch (_) {}
}

async function main() {
  const args = process.argv.slice(2);
  const testIdx = args.indexOf("--test");
  const text = fs.readFileSync(MESSAGE, "utf8").trim();

  let phones;
  if (testIdx !== -1) {
    const p = normalizeAz(args[testIdx + 1]);
    if (!p) return console.error("Yanlış test nömrəsi");
    phones = [p];
  } else {
    const done = loadSent();
    const all = loadContacts();
    phones = all.filter((p) => !done.has(p));
    log(`${all.length} nömrə, ${all.length - phones.length} artıq edilib, ${phones.length} qalıb`);
  }
  if (!phones.length) return log("Göndəriləcək nömrə yoxdur.");

  await run(text, phones);
  process.exit(0);
}

main().catch((e) => {
  log("Xəta:", e.message);
  process.exit(1);
});
