# AI üçün promptlar

Bu faylda layihə üzərində AI köməkçisi (Claude Code, Cursor, ChatGPT və s.) ilə işləmək üçün hazır promptlar var. Promptu olduğu kimi köçürüb yapışdırın.

- **Prompt 1:** mövcud layihə üzərində işi davam etdirmək (ən çox lazım olacaq).
- **Prompt 2:** saytı sıfırdan, eyni dizaynla yenidən qurmaq.
- **Prompt 3:** tez-tez lazım olan qısa tapşırıqlar.

Claude Code ilə işləyirsinizsə, terminalda layihə qovluğunda `claude` yazın və promptu yapışdırın. Başqa alətdə repo əlçatan deyilsə, `docs/SOURCE.md` faylını promptla birlikdə əlavə edin (orada bütün kod var).

---

## Prompt 1: layihəni davam etdirmək

```text
Sən "Azərbaycan Texnoloji Dayanıqlılıq Klasteri" saytı üzərində işləyirsən. Kod bu qovluqdadır. İşə başlamazdan əvvəl README.md, AGENTS.md və docs/PROMPT.md fayllarını oxu.

Layihə haqqında:
- Bir səhifəlik sayt: Klaster haqqında, Fəaliyyət istiqamətləri (8), Aparıcı tərəfdaşlar (4 mərhələ), Üzvlərə imkanlar, Qoşulma. Müraciət formu modal pəncərədə açılır.
- Next.js 16.3 (App Router), React 19, TypeScript, Tailwind CSS v4. Bu Next.js versiyasında dəyişikliklər var: middleware əvəzinə src/proxy.ts, "dynamic" seqment konfiqurasiyası yoxdur (connection() istifadə olunur). Kod yazmazdan əvvəl node_modules/next/dist/docs/ içindəki müvafiq sənədi oxu.
- Dillər: /az (əsas mənbə dili, default) və /en. Bütün mətnlər src/content/az.ts və src/content/en.ts fayllarındadır, tip sxemi src/content/types.ts. Komponentlərə mətn yazma, həmişə kontent fayllarına əlavə et və hər iki dili yenilə.
- Rənglər və radius yalnız src/app/globals.css içindəki @theme tokenlərindədir. Komponentlərdə hex rəng yazma, token siniflərini istifadə et (bg-brand-900, text-muted, border-line və s.).
- Müraciətlər Server Action (src/lib/apply.ts) ilə yoxlanılır, Upstash Redis-ə yazılır (src/lib/store.ts, açar cluster:applications), /admin səhifəsində Basic Auth ilə göstərilir (ADMIN_PASSWORD), /admin/export.csv ilə Excel üçün yüklənir.

Qaydalar (mütləq):
1. Dizayn üslubunu qoru: ağ fon, nazik xətlər, sakit institusional görünüş, bir brend rəngi. Qradiyent, parıltı, kölgəli rəngli kartlar, emoji, dekorativ ikon qutuları əlavə etmə. Sayt "AI ilə yığılmış" kimi görünməməlidir, peşəkar və dövlət qurumuna uyğun olmalıdır.
2. Scroll zamanı heç bir animasiya, parallax, scroll-spy və ya avtomatik scroll olmasın. Yalnız hover rəng dəyişməsi kimi sadə effektlər qəbul olunur.
3. Mətnlərdə "—" (uzun tire) işlətmə. Təmtəraqlı, reklam xarakterli ifadələr yazma ("inqilabi", "misilsiz", "aydın milli hədəf" və s.). Dil sadə, dəqiq və rəsmi olsun.
4. "Cədvəl kimi göstər" tipli görünüş açarları, "daxili material", "mənbə qeydi", "yoxlama qeydləri" kimi işarələr əlavə etmə.
5. Azərbaycan dili əsas mənbədir. Əvvəl az.ts-i yaz, sonra en.ts-ə tərcümə et.
6. Mobil görünüşü (390px) poz: üfüqi scroll olmamalıdır. Responsive grid-lərdə həmişə açıq grid-cols-1 yaz.
7. Açarları, tokenləri, şifrələri koda, commit-ə və ya çata yazma. Onlar .env.local-da (lokal) və Vercel Environment Variables-da saxlanılır.
8. Dəyişiklikdən sonra yoxla: npm run lint, npm run typecheck, npm run build. Hamısı xətasız keçməlidir.

Tapşırıq:
[BURAYA TAPŞIRIĞI YAZIN]
```

---

## Prompt 2: saytı sıfırdan eyni dizaynla qurmaq

Bu promptu yalnız layihəni tamamilə yenidən yaratmaq lazım olanda istifadə edin. Mətnlər üçün `docs/SOURCE.md` faylını (xüsusən `src/content/az.ts` və `en.ts` bölmələrini) və `public/images/` şəkillərini əlavə edin.

```text
Next.js ilə bir səhifəlik veb sayt qur: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri". Aşağıdakı spesifikasiyaya dəqiq əməl et. Mətnlər əlavə etdiyim faylda (src/content/az.ts və en.ts) var, onları dəyişmədən istifadə et.

TEXNOLOGİYA
- create-next-app ilə: Next.js 16.3.x (App Router, src/ qovluğu, TypeScript, ESLint), React 19, Tailwind CSS v4 (@tailwindcss/postcss), @fontsource-variable/inter, lucide-react, server-only. Başqa UI kitabxanası istifadə etmə.
- Next.js 16-da middleware faylı src/proxy.ts adlanır. "export const dynamic" yoxdur, dinamik render üçün "await connection()" (next/server) istifadə et. Kod yazmazdan əvvəl node_modules/next/dist/docs/ sənədlərini yoxla.
- next.config.ts: images.unoptimized = true; "/" ünvanını "/az"-a müvəqqəti yönləndir; bütün yollara başlıqlar: X-Robots-Tag "noindex, nofollow, noarchive", Referrer-Policy "no-referrer", X-Content-Type-Options "nosniff", X-Frame-Options "DENY".

MARŞRUTLAR
- src/app/[lang]/layout.tsx: kök layout, generateStaticParams ["az","en"], dynamicParams = false, generateMetadata (title, description, robots noindex, ikon /images/ministry-emblem.png), <html lang={lang}>, <body class="min-h-dvh">.
- src/app/[lang]/page.tsx: "Məzmuna keç" skip link, Header, <main id="main"> içində Hero, About, Domains, Partners, Benefits, Join, sonra Footer və ApplyDialog.
- src/app/admin/layout.tsx: ayrıca kök layout (<html lang="az">, body bg-surface, noindex).
- src/app/admin/page.tsx: müraciətlərin siyahısı (hər biri <details> içində, tarix Bakı vaxtı ilə), baza qoşulmayıbsa xəbərdarlıq, "CSV yüklə (Excel)" linki.
- src/app/admin/export.csv/route.ts: CSV, UTF-8 BOM, ";" ayırıcısı, AZ sütun adları, formul inyeksiyasından qoruma (=, +, -, @ ilə başlayan xanaların önünə '), fayl adı muracietler-YYYY-MM-DD.csv.
- src/proxy.ts: /admin və /admin/* üçün Basic Auth (ADMIN_USER default "admin", ADMIN_PASSWORD). ADMIN_PASSWORD yoxdursa /admin 404 qaytarsın. SITE_PASSWORD təyin olunubsa bütün saytı Basic Auth ilə bağla (SITE_USER default "team"), yoxdursa sayt açıqdır. Şifrə müqayisəsi sabit zamanlı olsun.

DİZAYN TOKENLƏRİ (src/app/globals.css, Tailwind v4 @theme)
--font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif
--color-brand-950 #071a33 | --color-brand-900 #0b2545 | --color-brand-800 #13315c | --color-brand-700 #1d4e89 | --color-brand-100 #e6edf5
--color-surface #f4f6f9 | --color-line #dde3ea | --color-ink #1a2230 | --color-muted #5b6676 | --color-danger #b42318
--radius-card 4px
Əlavə: html { scroll-padding-top: 5rem }, html:has(dialog[open]) { overflow: hidden }, body ağ fon, rəng ink, antialiased; dialog::backdrop rgb(7 26 51 / .6); .no-scrollbar sinfi. Heç bir animasiya və keyframe yoxdur.

ÜMUMİ ÜSLUB
- Container: mx-auto max-w-7xl px-4 sm:px-6 lg:px-8.
- Bölmə başlığı (h2): text-[1.75rem] sm:text-[2rem], font-semibold, tracking-tight, brand-900; lead: text-[1.0625rem], muted, max-w-xl.
- Bölmələr py-16 sm:py-24. Ağ və surface fonlar növbələşir, surface bölmələrində border-y border-line.
- Kartlar əvəzinə nazik üst xətlər (border-t border-line pt-5). Nömrələr "01", "02" formatında, text-sm font-semibold brand-700.
- İkonlar lucide-react, strokeWidth 1.5, brand-700, qutusuz.
- Düymələr: rounded-[var(--radius-card)], font-semibold. Əsas: bg-brand-900 ağ mətn, hover brand-800. Kompakt (header): ağ fon, brand-900 mətn.
- "Split" layout: desktopda başlıq və lead solda (lg:col-span-4), məzmun sağda (lg:col-span-8), 12 sütunlu grid, mobildə grid-cols-1.

BÖLMƏLƏR
1. Header (sticky top-0 z-40):
   - Üst zolaq bg-brand-900, hündürlük h-16: ağ nazirlik loqosu (h-9), şaquli ayırıcı xətt (w-px bg-white/25), təşkilat adı (13px, white/85, md-dən görünür); sağda AZ/EN dil linkləri (aktiv olan ağ və altı xətli) və kompakt "Müraciət et" düyməsi (sm-dən görünür).
   - Altında ağ naviqasiya zolağı border-b border-line: Klaster haqqında, İstiqamətlər, Aparıcı tərəfdaşlar, Üzvlərə imkanlar, Qoşulma (anchor linklər #haqqinda, #istiqametler, #terefdaslar, #imkanlar, #qosulma), text-sm, hover-da alt xətt brand-700. Mobildə üfüqi sürüşür, scrollbar gizlidir.
2. Hero (id="top", ağ fon): 12 sütun. Solda (7): təşkilat adı (text-sm brand-700), h1 (text-4xl sm:text-5xl, semibold, leading-[1.1], brand-900), lead (text-lg muted), "Klasterə qoşulun" düyməsi (modalı açır) və "İstiqamətlərə baxın" oxlu link. Sağda (5): boardroom.jpg, aspect 4/3 (lg-də 4/5), object-cover, radius-card. Altında faktlar zolağı (bg-surface, border-y): 3 sütun, aralarında şaquli xətlər, dəyər text-2xl semibold brand-900, izah text-sm muted.
3. About (#haqqinda, ağ): Split; sağda 2 sütunlu nömrələnmiş 4 prinsip.
4. Domains (#istiqametler, surface): başlıq, altında 8 istiqamət 4 sütunlu "hairline" grid-də (gap-px bg-line, border border-line, hər xana bg-white p-6): ikon (size-6), başlıq, qısa mətn. İkonlar: cyber ShieldCheck, comms RadioTower, data Database, ai BrainCircuit, cloud Cloud, resilience Activity, space Satellite, uav Drone.
5. Partners (#terefdaslar, ağ): Split; sağda 2 rol (border-t-2 border-brand-900, sektorlar brand-700 ilə). Altında border-t ilə ayrılmış "Əməkdaşlıq mərhələləri": 4 sütun, nömrəli; birinci mərhələnin üst xətti brand-900, digərləri line.
6. Benefits (#imkanlar, surface): Split; 2x2 imkanlar; altında qeyd bloku (border-l-2 border-brand-700, ağ fon, px-5 py-4). Qeydin mətni: "İxraca dəstək və beynəlxalq tədbirlərdə iştirak İRİA-nın proqramları çərçivəsində həyata keçirilir. Bundan əlavə, Texnopark rezidentləri olan klaster üzvləri qanunvericiliklə müəyyən edilmiş güzəştlərdən istifadə edir."
7. Join (#qosulma, bg-brand-900, ağ mətn): solda (7) başlıq və Check ikonlu şərtlər siyahısı (white/85); sağda (5) ağ qutu: başlıq, mətn, "Müraciət göndərin" düyməsi (modalı açır).
8. Footer (bg-brand-950, white/70): solda loqo (h-10) və təşkilat adı, sağda 2 sütunlu naviqasiya; alt zolaq border-t border-white/10: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi, Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi, 2026" və "Yuxarı qayıt".

MÜRACİƏT MODALI
- Native <dialog> + showModal(). Bütün "Müraciət" düymələri window-a "apply:open" hadisəsi göndərir, dialog onu dinləyir. URL-də #muraciet varsa səhifə açılanda modal açılır; bağlananda hash silinir. Esc, X düyməsi və kənara (backdrop) klik bağlayır.
- Ölçü: w-[min(100%-2rem,48rem)], max-h-[calc(100dvh-2rem)], daxili scroll, ağ fon, radius-card, shadow-2xl. Yuxarıda sticky başlıq (başlıq, qısa mətn, X), border-b.
- Form (client component, useActionState + Server Action): 
  • Müraciət növü: "Klasterə üzv kimi qoşulmaq" / "Aparıcı tərəfdaş kimi əməkdaşlıq" (böyük radio kartlar, seçiləndə border-brand-700 bg-brand-100/60)*
  • Şirkət: ad*, VÖEN, vebsayt, Texnopark rezidentliyi (Bəli / Müraciət mərhələsindədir / Xeyr, pill radio)*
  • Fəaliyyət: istiqamətlər (8 checkbox, ən azı 1)*, məhsul və ya texnologiya (textarea)*, texniki komandanın ölçüsü (select: 1–10, 11–50, 51–200, 200+)
  • Əlaqə: ad və soyad*, vəzifə, email*, telefon, əlavə qeyd
  • Razılıq checkbox*
  Məcburi sahələrdə qırmızı *, qeyri-məcburilərdə "(istəyə bağlı)". Xəta olanda yuxarıda role="alert" xülasə (fokus alır), hər sahənin altında xəta, aria-invalid və aria-describedby. Daxil edilənlər itmir. Uğurda CircleCheck ikonlu təşəkkür bloku (fokus alır) və "Yeni müraciət göndər" düyməsi.
- Server tərəfi: bütün sahələrin yoxlanması (qısa sahələr 200, uzun sahələr 2000 simvol), vebsaytın normallaşdırılması (https:// əlavə et), spam qoruması: gizli "fax" honeypot sahəsi və gizli startedAt (3 saniyədən tez göndərilsə bota saxta uğur qaytar, saxlama).
- Çatdırılma: Upstash Redis REST API (KV_REST_API_URL / KV_REST_API_TOKEN, alternativ UPSTASH_REDIS_REST_*), LPUSH "cluster:applications" (id: crypto.randomUUID(), submittedAt ISO tarix). İstəyə bağlı: Resend ilə email (RESEND_API_KEY, APPLICATION_EMAIL_TO, APPLICATION_EMAIL_FROM) və webhook (APPLICATION_WEBHOOK_URL, X-Webhook-Secret başlığı). Heç biri konfiqurasiya olunmayıbsa dev rejimində konsola yaz və uğur qaytar, production-da xəta qaytar.

KEYFİYYƏT TƏLƏBLƏRİ
- Scroll zamanı heç bir animasiya, scroll-spy, avtomatik scroll yoxdur.
- Mətnlərdə "—" işarəsi yoxdur, üslub sadə və rəsmidir.
- 390px enində üfüqi scroll yoxdur. Hydration xətası yoxdur (Intl ilə valyuta/tarix formatını client və server fərqli göstərə bilər, deterministik formatlayıcı istifadə et).
- Əlçatanlıq: skip link, focus-visible outline brand-700, düzgün label-lər.
- Sonda: npm run lint, npx tsc --noEmit, npm run build xətasız keçməlidir.
```

---

## Prompt 3: qısa tapşırıqlar

Bunları Prompt 1-in sonundakı "Tapşırıq" yerinə yazın.

**İRİA brendini tətbiq etmək**
```text
İRİA brendini tətbiq et. Loqo faylı public/images/iria-logo.svg (ağ variant: public/images/iria-logo-white.svg). Brend rəngləri: [HEX KODLARI]. Şrift: [ŞRİFT ADI].
Yalnız globals.css-dəki --color-brand-* tokenlərini dəyiş (950 ən tünd, 100 ən açıq çalar), komponent strukturuna toxunma. Loqonu Header.tsx və Footer.tsx-ə nazirlik loqosunun yanına əlavə et. Rənglər arasında kontrast WCAG AA səviyyəsində olsun. Dizayn üslubu dəyişməsin.
```

**Yeni bölmə əlavə etmək**
```text
"[BÖLMƏNİN ADI]" bölməsini [HANSI BÖLMƏDƏN] sonra əlavə et. Mətn: [MƏTN].
types.ts-ə tip, az.ts və en.ts-ə mətn, Sections.tsx-ə mövcud Split/Heading üslubunda komponent, ui.nav-a link əlavə et. Fon rəngi qonşu bölmələrlə növbələşsin (ağ / surface).
```

**Mətn dəyişikliyi**
```text
az.ts-də [HANSI HİSSƏ] mətnini belə dəyiş: "[YENİ MƏTN]". en.ts-də də uyğun tərcüməni yenilə. Başqa heç nəyə toxunma.
```

**Saytı publik (axtarışda görünən) etmək**
```text
Saytı axtarış sistemləri üçün aç: src/app/[lang]/layout.tsx-də robots noindex-i və next.config.ts-də X-Robots-Tag başlığını çıxar. /admin noindex qalsın. hreflang alternates, sitemap.ts və robots.ts əlavə et (/admin bağlı olsun).
```

**Formaya sahə əlavə etmək**
```text
Müraciət formuna "[SAHƏ ADI]" sahəsini əlavə et ([məcburi / istəyə bağlı], [mətn / seçim]). src/lib/application.ts (Field tipi), src/lib/apply.ts (yoxlama), ApplicationForm.tsx (mövcud label/textInput köməkçiləri ilə), types.ts, az.ts, en.ts, src/lib/deliver.ts (formatApplication), admin/page.tsx və export.csv/route.ts-i yenilə.
```
