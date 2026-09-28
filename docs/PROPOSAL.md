# Resilience Cluster — sayt üzrə ilkin struktur və icra müddəti təklifi

**Kimə:** Rəhbərlik
**Mövzu:** BCG-nin göndərdiyi materiallar (təqdimat və sayt mətni) əsasında 1 səhifəlik daxili sayt
**Status:** İşlək prototip hazırdır (EN + AZ, şifrə ilə qorunur)

---

## 1. Qısa xülasə

- BCG materialları **bir uzun səhifəlik (landing) sayt** formatına tam uyğundur. Mətnin həcmi ikinci səhifəni əsaslandırmır, lövbər naviqasiyası ilə bütün bölmələr bir səhifədə rahat oxunur.
- Sayt hələlik **yalnız komanda daxili** istifadə üçündür. Word sənədindəki mətnlə yanaşı təqdimatdakı daxili strategiya materialları da (anchor şirkətlər, lokallaşdırma yolları) səhifəyə daxil edilib. Heç bir məlumat buraxılmayıb.
- Materialları birləşdirərkən **11 uyğunsuzluq və boşluq** aşkar edilib. Onlar saytın sonunda "Yoxlama qeydləri" bölməsində toplanıb, 3-ü BCG ilə mütləq dəqiqləşdirilməlidir (bax: bölmə 5).
- Təxmini icra müddəti: **cəmi ~5 iş günü**. Prototip artıq hazır olduğu üçün qalan hissə əsasən rəy, düzəlişlər və deploydur (bax: bölmə 4).

## 2. Mənbələr

| Mənbə | Məzmun | İstifadə |
|---|---|---|
| Word — *Resilience Cluster website content draft* | 4 bölmə: Klaster haqqında, Fokus istiqamətləri (4), Niyə Azərbaycan, Güzəştlər (vergi + ixrac proqramları) | Əsas sayt mətni, olduğu kimi |
| PDF — *Technology resilience cluster v4* (BCG, 13 slayd) | Yuxarıdakıların slayd versiyası + $1B hədəfi, 6 istiqamət, vergi cədvəli, anchor şirkət strategiyası (slayd 7–12) | Rəqəmlər, əlavə detallar, vizual üslub, loqolar |

Yalnız bir mənbədə olan hər bir məlumat saytda **"Deck only / Yalnız təqdimatda"** nişanı ilə işarələnib. Bu nişanları başlıqdakı düymə ilə gizlətmək olur.

## 3. Təklif olunan struktur (1 səhifə)

```
Başlıq (Nazirlik loqosu · Daxili nişanı · Mənbə qeydləri açarı · EN/AZ)
│
├─ Hero — klasterin adı, əsas mesaj, $1B İKT ixracı hədəfi, 4 əsas göstərici
│
├─ 01 Klaster haqqında — klaster nədir + modelin 4 öhdəliyi
├─ 02 Fokus istiqamətləri — 4 əsas + 2 əlavə (PUA: ayrıca; Data/Sİ: kəsişən) + əhatədən kənar
├─ 03 Niyə Azərbaycan — 3 səbəb
├─ 04 Güzəştlər
│     4.1 Vergi və tənzimləmə (6 qrup, BCG cədvəlindəki bütün rəqəmlərlə)
│     4.2 İxraca dəstək proqramları (4 istiqamət, 7 proqram, məbləğlərlə)
│
│  ── Daxili strategiya ──────────────────────────────────
├─ 05 Anchor şirkət strategiyası
│     • Prioritetləşdirmə meyarları (strateji cəlbedicilik × lokallaşdırma)
│     • İstiqamətlər üzrə ilkin namizəd siyahısı (45 unikal şirkət, loqolarla)
│     • 5 prioritet şirkət qrupu + dəyər zəncirində lokallaşdırma
│     • Lokallaşdırma yolu 1 — Rusiyadan çıxmış şirkətlər (5)
│     • Lokallaşdırma yolu 2 — Azərbaycanda artıq aktiv olan şirkətlər (7)
│
├─ 06 Yoxlama qeydləri — BCG ilə dəqiqləşdiriləcək 11 məsələ
└─ Footer — mənbələr, məxfilik qeydi
```

Gələcəkdə sayt **publik** versiyaya keçərsə: 05-ci bölmə çıxarılır, əvəzinə "Üzvlük / Əlaqə" (CTA) bölməsi əlavə olunur. Struktur buna hazırdır, çünki daxili hissə ayrıca blokdur.

## 4. İcra müddəti

| Mərhələ | İş | Müddət | Status |
|---|---|---|---|
| 0 | Materialların təhlili, struktur, işlək prototip (EN + AZ qaralama) | 1 iş günü | ✅ Hazırdır |
| 1 | Daxili rəy + BCG ilə açıq məsələlərin dəqiqləşdirilməsi | 2 iş günü* | Gözləyir |
| 2 | Rəyə əsasən düzəlişlər, AZ mətninin redaktəsi | 1–2 iş günü | — |
| 3 | Vercel-ə deploy, şifrənin qurulması, yekun yoxlama (desktop/mobil) | 0.5 iş günü | — |
| | **Cəmi** | **~5 iş günü** | |

\* Müddət əsasən BCG-nin cavab sürətindən asılıdır. Texniki hissə paralel davam edə bilər.

**Publik versiya lazım olarsa (əlavə, təxminən 1–2 həftə):** daxili bölmənin çıxarılması, müraciət/əlaqə forması, domen (məs. nazirliyin subdomeni), analitika, hüquqi və kommunikasiya yoxlaması.

## 5. BCG ilə dəqiqləşdirilməli əsas məsələlər

1. **İstiqamətlərin sayı:** Word-də 4, təqdimatda 6 (PUA və Data/Sİ əlavə). Rəsmi çərçivə hansıdır?
2. **0% mənfəət vergisinin ixrac şərti:** təqdimatda "gəlir Azərbaycan hesablarına daxil olmalıdır" şərti var, Word-də yoxdur.
3. **CrowdStrike (slayd 12):** "klasterə uyğunluq" mətni IAI sətrinin təkrarıdır (peyk/Yer müşahidəsi). Ehtimal ki, kopyalama xətasıdır.

Digər məsələlər ($1B hədəfinin ili, "100% (<50%)" ifadəsinin mənası, Mandiant uyğunsuzluğu, təkrarlanan slayd, orfoqrafik və formatlama səhvləri) saytın "Yoxlama qeydləri" bölməsində ətraflı verilib.

## 6. Texniki yanaşma (qısa)

- **Next.js 16 + TypeScript + Tailwind CSS.** Səhifələr statik olaraq qurulur, sürətlidir, Vercel-də pulsuz planda işləyir.
- **İki dil:** `/en` və `/az`. Bütün mətn `src/content/` qovluğunda strukturlaşdırılmış fayllardadır, redaktə üçün kodu bilmək lazım deyil.
- **Giriş qorunması:** bütün səhifə və fayllar (loqolar daxil) şifrə ilə qorunur (HTTP Basic Auth). Şifrə Vercel-də təyin edilməyibsə, sayt ümumiyyətlə açılmır (fail-closed). Axtarış sistemləri üçün `noindex`.
- **Vizual üslub:** BCG təqdimatının palitrası, şəkilləri və Nazirlik loqosu. Loqolar birbaşa PDF-dən çıxarılıb.

## 7. Qərar tələb olunan suallar

1. Açıq məsələlər BCG-yə kim tərəfindən göndərilsin?
2. AZ mətnini kim redaktə edəcək (kommunikasiya komandası?)
3. Vercel hesabı: şirkətin mövcud hesabı var, yoxsa yenisi açılsın?
4. Sayt gələcəkdə publik olacaqsa, domen və "sahib qurum" (Nazirlik / İRİA) necə olacaq?
