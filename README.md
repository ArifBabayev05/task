# Azərbaycan Texnoloji Dayanıqlılıq Klasteri: veb sayt

Klaster üçün bir səhifəlik sayt: klaster haqqında məlumat, fəaliyyət istiqamətləri, aparıcı tərəfdaşlar, üzvlərə imkanlar, qoşulma şərtləri və modal pəncərədə açılan müraciət formu. Müraciətlər bazada saxlanılır və şifrəli admin səhifəsində baxılır, Excel üçün yüklənir.

- **Texnologiya:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Dillər:** Azərbaycan dili (əsas, `/az`) və ingilis dili (`/en`)
- **Repo:** `github.com/ArifBabayev05/task` (branch: `main`)
- **Hazırkı deploy:** Vercel layihəsi `arif-babayev-projs/task`

Mündəricat:

1. [Tez başlanğıc (lokal)](#1-tez-başlanğıc-lokal)
2. [Layihənin strukturu](#2-layihənin-strukturu)
3. [Səhifə və bölmələr](#3-səhifə-və-bölmələr)
4. [Mətnləri dəyişmək](#4-mətnləri-dəyişmək)
5. [Dizayn sistemi](#5-dizayn-sistemi)
6. [Müraciət formu, baza və admin](#6-müraciət-formu-baza-və-admin)
7. [Mühit dəyişənləri (env)](#7-mühit-dəyişənləri-env)
8. [Vercel-ə deploy](#8-vercel-ə-deploy)
9. [Görülən işlərin tarixçəsi və qərarlar](#9-görülən-işlərin-tarixçəsi-və-qərarlar)
10. [Açıq qalan işlər](#10-açıq-qalan-işlər)
11. [Problemlərin həlli](#11-problemlərin-həlli)

---

## 1. Tez başlanğıc (lokal)

### Tələblər

- **Node.js 20.9 və ya daha yeni** (tövsiyə: Node 22 LTS). Yoxlamaq üçün: `node -v`
- npm (Node ilə gəlir)
- Git

### Quraşdırma

```bash
# 1. Layihəni götürün (və ya ZIP arxivini açın)
git clone https://github.com/ArifBabayev05/task.git resilience-cluster
cd resilience-cluster

# 2. Asılılıqları quraşdırın
npm install

# 3. (İstəyə bağlı) env faylını yaradın
cp .env.example .env.local        # Windows PowerShell: Copy-Item .env.example .env.local

# 4. İnkişaf serverini işə salın
npm run dev
```

Brauzerdə **http://localhost:3000** açın. Sayt avtomatik olaraq `/az`-a yönləndirir.

Lokalda heç bir env dəyişəni tələb olunmur:
- müraciət formu işləyir və göndərilən müraciətlər terminalda (server konsolunda) çap olunur;
- `/admin` səhifəsi yalnız `ADMIN_PASSWORD` təyin edildikdə açılır (bax: [6-cı bölmə](#6-müraciət-formu-baza-və-admin)).

### Əmrlər

| Əmr | Nə edir |
|---|---|
| `npm run dev` | İnkişaf serveri (http://localhost:3000), dəyişikliklər dərhal görünür |
| `npm run build` | Production build |
| `npm start` | Production build-i işə salır (əvvəlcə `npm run build`) |
| `npm run lint` | ESLint yoxlaması |
| `npm run typecheck` | TypeScript tip yoxlaması |

> **Qeyd (Next.js 16):** bu versiyada `middleware` faylının adı `proxy` olub (`src/proxy.ts`), `dynamic` seqment konfiqurasiyası əvəzinə `connection()` istifadə olunur. Next.js sənədləri quraşdırmadan sonra `node_modules/next/dist/docs/` qovluğunda da var (`AGENTS.md` faylına bax).

---

## 2. Layihənin strukturu

```
.
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── layout.tsx        # Kök layout (az/en), metadata, noindex
│   │   │   └── page.tsx          # Əsas səhifə: bölmələri və müraciət modalını yığır
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin üçün ayrıca kök layout
│   │   │   ├── page.tsx          # Müraciətlərin siyahısı (şifrəli)
│   │   │   └── export.csv/
│   │   │       └── route.ts      # CSV (Excel) yükləmə
│   │   └── globals.css           # Tailwind + dizayn tokenləri (rənglər, radius, şrift)
│   ├── components/
│   │   ├── Header.tsx            # Brend zolağı, loqo, dil açarı, "Müraciət et", naviqasiya
│   │   ├── Hero.tsx              # Başlıq, qısa mətn, düymələr, foto, faktlar sətri
│   │   ├── Sections.tsx          # About, Domains, Partners, Benefits, Join bölmələri
│   │   ├── Footer.tsx            # Footer
│   │   ├── ApplyDialog.tsx       # Modal (<dialog>) və onu açan ApplyButton
│   │   ├── ApplicationForm.tsx   # Müraciət formu (client component, useActionState)
│   │   └── ui.tsx                # Container, Heading
│   ├── content/
│   │   ├── types.ts              # Kontentin tip sxemi (hər iki dil eyni formada olmalıdır)
│   │   ├── az.ts                 # Azərbaycan dilində bütün mətnlər (əsas mənbə)
│   │   ├── en.ts                 # İngilis dilində tərcümə
│   │   └── index.ts              # Dillər, default dil (az), getContent()
│   ├── lib/
│   │   ├── application.ts        # Form sahələri, səhv kodları, tiplər (client + server)
│   │   ├── apply.ts              # Server Action: yoxlama, spam qoruması, göndərmə
│   │   ├── deliver.ts            # Bazaya yazma + istəyə bağlı email/webhook bildirişi
│   │   ├── store.ts              # Upstash Redis (REST API) ilə saxlama və oxuma
│   │   └── labels.ts             # Admin və CSV üçün AZ etiketləri, tarix formatı (Bakı vaxtı)
│   └── proxy.ts                  # Basic Auth: /admin üçün məcburi, bütün sayt üçün istəyə bağlı
├── public/images/
│   ├── boardroom.jpg             # Hero fotosu (BCG təqdimatından)
│   ├── ministry-logo-white.png   # Nazirlik loqosu (ağ)
│   └── ministry-emblem.png       # Favicon
├── docs/
│   ├── PROPOSAL.md               # Menecer üçün ilkin struktur və müddət təklifi, uyğunsuzluqlar siyahısı
│   └── SOURCE.md                 # Bütün mənbə kodu bir faylda (arxiv/bərpa üçün)
├── .env.example                  # Env şablonu
├── next.config.ts                # "/" → "/az" yönləndirmə, təhlükəsizlik başlıqları, noindex
├── package.json
└── README.md
```

---

## 3. Səhifə və bölmələr

URL-lər: `/az` (default), `/en`. `/` avtomatik `/az`-a yönləndirir.

| Bölmə | id (link) | Məzmun |
|---|---|---|
| Hero | `#top` | Başlıq, qısa təsvir, "Klasterə qoşulun" (modalı açır), "İstiqamətlərə baxın", foto, 3 fakt |
| Klaster haqqında | `#haqqinda` | Klaster nədir, 4 prinsip |
| Fəaliyyət istiqamətləri | `#istiqametler` | 8 istiqamət (kibertəhlükəsizlik, kommunikasiya, məlumat, Sİ, bulud, dayanıqlılıq, kosmik, PUA) |
| Aparıcı tərəfdaşlar | `#terefdaslar` | Milli və qlobal şirkətlərin rolu, 4 mərhələli əməkdaşlıq (Tapşırıq → Komanda → Pilot → İxrac) |
| Üzvlərə imkanlar | `#imkanlar` | 4 imkan və İRİA proqramları / Texnopark güzəştləri qeydi |
| Qoşulma | `#qosulma` | Kimlər qoşula bilər, "Müraciət göndərin" (modalı açır) |
| Müraciət modalı | `#muraciet` | Bu link ilə səhifə açılanda form avtomatik açılır |

Hər iki dildə axtarış sistemləri üçün `noindex` qoyulub (`layout.tsx` metadata və `next.config.ts` başlıqları). Sayt publik olacaqsa, bu iki yeri dəyişin.

---

## 4. Mətnləri dəyişmək

Bütün mətnlər iki faylda saxlanılır, komponentlərdə mətn yoxdur:

- `src/content/az.ts`: Azərbaycan dili (əsas mənbə)
- `src/content/en.ts`: ingilis dili

Hər iki fayl `src/content/types.ts`-dəki `Content` tipinə uyğun olmalıdır. Bir dilə sahə əlavə edib digərini unutsanız, `npm run typecheck` xəta verəcək.

Nümunələr:
- hero mətni: `hero.title`, `hero.lead`, `hero.facts`;
- istiqamət əlavə etmək: `domains.items`-ə yeni element (`id`, `title`, `body`). İkonu `src/components/Sections.tsx` → `domainIcons` obyektinə əlavə edin (lucide-react ikonları). Formda seçim kimi görünməsi üçün `src/lib/application.ts` → `DOMAIN_IDS`-ə də əlavə edin;
- form mətnləri: `form` bloku (sahə adları, xəta mesajları, uğur mesajı).

Mətndə "—" (uzun tire) işlədilmir, üslub sadə və rəsmidir.

---

## 5. Dizayn sistemi

Dizayn sakit, institusional üslubdadır: ağ fon, nazik xətlər, tipoqrafik iyerarxiya, bir brend rəngi və foto. Qradiyent, parıltı, animasiya və dekorativ ikon qutuları yoxdur. Scroll zamanı heç bir animasiya işləmir (bu, qəsdən belədir).

### Tokenlər

Bütün rənglər `src/app/globals.css` faylındakı `@theme` blokundadır. Brendi dəyişmək üçün yalnız bu dəyərləri dəyişmək kifayətdir:

| Token | Dəyər | İstifadə |
|---|---|---|
| `--color-brand-950` | `#071a33` | Footer fonu |
| `--color-brand-900` | `#0b2545` | Üst zolaq, əsas düymələr, başlıqlar, qoşulma bölməsi |
| `--color-brand-800` | `#13315c` | Düymə hover |
| `--color-brand-700` | `#1d4e89` | Linklər, nömrələr, ikonlar, fokus |
| `--color-brand-100` | `#e6edf5` | Yüngül fon vurğuları |
| `--color-surface` | `#f4f6f9` | Alternativ bölmə fonu |
| `--color-line` | `#dde3ea` | Xətlər və çərçivələr |
| `--color-ink` | `#1a2230` | Əsas mətn |
| `--color-muted` | `#5b6676` | İkinci dərəcəli mətn |
| `--color-danger` | `#b42318` | Form xətaları |
| `--radius-card` | `4px` | Künc radiusu |

Tailwind-də bu tokenlər sinif kimi işləyir: `bg-brand-900`, `text-muted`, `border-line` və s.

- **Şrift:** Inter (`@fontsource-variable/inter`, lokal paketdir, internet tələb etmir). Dəyişmək üçün başqa `@fontsource` paketi quraşdırıb `globals.css`-də `@import` və `--font-sans`-ı yeniləyin.
- **İkonlar:** `lucide-react`, nazik xətli (`strokeWidth={1.5}`), brend rəngində.
- **Şəkillər:** `public/images/`. Hero fotosunu dəyişmək üçün faylı əvəz edin və ya `Hero.tsx`-də yolu dəyişin.
- **Loqo:** header və footer-də `ministry-logo-white.png`. İRİA loqosu əlavə olunacaqsa, faylı `public/images/`-ə qoyub `Header.tsx` və `Footer.tsx`-də istifadə edin.
- **Layout:** maksimum en `max-w-7xl`. Bölmələrdə başlıq solda (4/12), məzmun sağda (8/12). Mobil üçün tam uyğunlaşdırılıb (390px-də yoxlanılıb).

---

## 6. Müraciət formu, baza və admin

### Necə işləyir

1. "Klasterə qoşulun", "Müraciət et" və "Müraciət göndərin" düymələri formu **modal pəncərədə** (`<dialog>`) açır. Esc, X düyməsi və ya kənara klik ilə bağlanır.
2. Form **Server Action** ilə göndərilir (`src/lib/apply.ts`). Bütün sahələr serverdə yoxlanılır. Xəta olanda yazılan məlumat itmir, xəta mesajları sahələrin altında görünür.
3. **Spam qoruması:** gizli "honeypot" sahəsi və 3 saniyədən tez göndərmənin bloklanması. Bota uğur göstərilir, müraciət isə saxlanılmır.
4. Uğurlu müraciət `src/lib/deliver.ts` vasitəsilə:
   - **Upstash Redis bazasına** yazılır (əsas yol);
   - istəyə bağlı olaraq **email** (Resend) və/və ya **webhook** (Google Sheets, Slack və s.) ilə bildiriş göndərilir.
5. Production-da heç bir yer konfiqurasiya olunmayıbsa, form xəta göstərir, müraciət səssizcə itmir. Lokal (dev) rejimdə isə müraciət terminala çap olunur.

### Form sahələri

Müraciət növü (klaster üzvü / aparıcı tərəfdaş)\*, şirkətin adı\*, VÖEN, vebsayt, Texnopark rezidentliyi\*, fəaliyyət istiqamətləri\* (ən azı 1), məhsul və ya texnologiya\*, texniki komandanın ölçüsü, ad və soyad\*, vəzifə, email\*, telefon, əlavə qeyd, razılıq\*. Ulduzlu (\*) sahələr mütləqdir.

### Baza: Upstash Redis

Müraciətlər `cluster:applications` açarı altında JSON siyahısı kimi saxlanılır (ən yenisi birinci). Kod SDK istifadə etmir, Upstash REST API ilə birbaşa işləyir (`src/lib/store.ts`).

**Vercel-də qoşmaq (təxminən 2 dəqiqə):**
1. Vercel → layihə → **Storage** → **Create Database** → **Upstash for Redis** → plan **Free**, region **Frankfurt (fra1)**.
2. **Connect** ilə layihəyə bağlayın. `KV_REST_API_URL` və `KV_REST_API_TOKEN` avtomatik əlavə olunur.
3. **Redeploy** edin.

**Lokalda bazanı sınamaq:** [console.upstash.com](https://console.upstash.com)-da pulsuz Redis bazası yaradın. "REST API" bölməsindən URL və token-i `.env.local`-a `KV_REST_API_URL` və `KV_REST_API_TOKEN` kimi yazın, `npm run dev`-i yenidən başladın. Vercel-dəki bazanın açarlarını da istifadə edə bilərsiniz (Storage → baza → `.env.local` tabı).

### Admin səhifəsi: `/admin`

- `ADMIN_PASSWORD` təyin edilməyibsə, `/admin` **404** qaytarır.
- Təyin edilibsə, brauzer istifadəçi adı (default `admin`, `ADMIN_USER` ilə dəyişilir) və şifrə soruşur.
- Səhifədə bütün müraciətlər (tarix Bakı vaxtı ilə, şirkət, əlaqə şəxsi, növ) və hər birinin detalları var.
- **"CSV yüklə (Excel)"** düyməsi `/admin/export.csv` faylını endirir. Fayl UTF-8 BOM ilə və `;` ayırıcısı ilə hazırlanır, Excel-də Azərbaycan hərfləri düzgün görünür. Formul inyeksiyasından qorunur.

Lokalda sınamaq: `.env.local`-a `ADMIN_PASSWORD=istənilən-şifrə` yazın, serveri yenidən başladın, http://localhost:3000/admin açın.

---

## 7. Mühit dəyişənləri (env)

Hamısı `.env.example`-də var. Lokalda `.env.local`, Vercel-də **Settings → Environment Variables**. Dəyişiklikdən sonra Vercel-də **Redeploy** lazımdır.

| Dəyişən | Məcburi? | Təyinat |
|---|---|---|
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Production-da tövsiyə olunur | Upstash Redis (müraciətlərin saxlanması). `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` adları da qəbul olunur |
| `ADMIN_PASSWORD` | `/admin` üçün | Admin səhifəsinin şifrəsi |
| `ADMIN_USER` | Xeyr | Admin istifadəçi adı (default `admin`) |
| `RESEND_API_KEY`, `APPLICATION_EMAIL_TO`, `APPLICATION_EMAIL_FROM` | Xeyr | Hər müraciət üçün email bildirişi ([Resend](https://resend.com)) |
| `APPLICATION_WEBHOOK_URL`, `APPLICATION_WEBHOOK_SECRET` | Xeyr | Hər müraciəti JSON olaraq POST edir (secret `X-Webhook-Secret` başlığında) |
| `SITE_PASSWORD`, `SITE_USER` | Xeyr | Bütün saytı şifrə ilə bağlamaq (default olaraq sayt açıqdır) |

`.env.local` faylı git-ə düşmür (`.gitignore`). Açarları və şifrələri heç vaxt koda və ya çata yazmayın.

---

## 8. Vercel-ə deploy

Layihə artıq Vercel-ə bağlıdır (`arif-babayev-projs/task`), `main`-ə hər push avtomatik deploy olunur.

Sıfırdan qurmaq lazım olarsa:
1. [vercel.com](https://vercel.com) → **Add New → Project** → GitHub repo-sunu seçin. Framework avtomatik "Next.js" kimi tanınır, əlavə ayar lazım deyil.
2. **Deploy**.
3. [6-cı bölmədəki](#6-müraciət-formu-baza-və-admin) addımlarla Upstash Redis qoşun və `ADMIN_PASSWORD` təyin edin, sonra **Redeploy** edin.
4. Yoxlama: saytda test müraciəti göndərin və `/admin`-də görün.

Başqa hostinqdə (öz serveriniz, Docker): `npm run build && npm start` (port 3000). Server Action və `/admin` Node.js serveri tələb edir, ona görə sırf statik hostinq (məs. GitHub Pages) uyğun deyil.

---

## 9. Görülən işlərin tarixçəsi və qərarlar

1. **Başlanğıc (BCG materialları):** BCG-nin Word sənədi (sayt mətni) və PDF təqdimatı (13 slayd) əsasında EN/AZ bir səhifəlik sayt quruldu. Materiallar arasında 11 uyğunsuzluq tapıldı, siyahısı `docs/PROPOSAL.md`-nin 8-ci bölməsindədir. Menecer üçün struktur və müddət təklifi də həmin sənəddədir.
2. **İnteraktivlik və chartlar:** chartlar, tab-lar və filtrlər əlavə olundu. Sonra istifadəçi rəyinə görə scroll animasiyaları tamamilə çıxarıldı (səhifənin geri tullanması problemi həll olundu), "—" işarəsi və təmtəraqlı ifadələr silindi, daxili qeydlər çıxarıldı.
3. **İRİA HTML strukturu:** sayt İRİA-nın hazırladığı HTML strukturuna keçirildi: Klaster haqqında, İstiqamətlər, Aparıcı tərəfdaşlar, Üzvlərə imkanlar, Qoşulma. İxrac dəstəyi qeydi yeni mətnlə yeniləndi. BCG-yə aid köhnə bölmələr (anchor şirkət siyahıları, vergi kartları, chartlar) çıxarıldı. Onlar git tarixçəsində qalır: commit `499cf69`.
4. **Müraciət formu:** əvvəl bölmə kimi, sonra modal pəncərə kimi quruldu. Upstash Redis-də saxlama, şifrəli `/admin` və CSV əlavə olundu.
5. **Dizayn yenilənməsi:** "süni intellekt" təəssüratı verən elementlər (qradiyent hero, parıltılı şəbəkə diaqramı, rəngli ikon kartları, "01 ·" nişanları) çıxarıldı. Onların yerinə sakit, institusional dizayn quruldu. Rənglər tokenlərdədir, İRİA brendi gələndə asan dəyişilir.

Əvvəlki versiyalara baxmaq üçün: `git log --oneline`, `git show <commit>`.

---

## 10. Açıq qalan işlər

- [ ] **İRİA brendi:** loqo, rəng palitrası və şrift hələ tətbiq olunmayıb, çünki idda.az əvvəlki mühitdən əlçatan deyildi. Etmək üçün: İRİA loqosunu `public/images/`-ə qoyun, `globals.css`-dəki `--color-brand-*` dəyərlərini brendbuka uyğun dəyişin, lazım olsa şrifti yeniləyin, `Header.tsx` və `Footer.tsx`-də loqonu əlavə edin.
- [ ] **Upstash Redis + `ADMIN_PASSWORD`:** Vercel-də qoşulmalıdır ([6-cı bölmə](#6-müraciət-formu-baza-və-admin)). Qoşulmayana qədər production-da form göndərişdə xəta verir.
- [ ] **İngilis tərcüməsi:** `en.ts` tərcüməsi yoxlanılmalıdır.
- [ ] **Sayt publik olacaqsa:** `noindex`-i çıxarın (`src/app/[lang]/layout.tsx` və `next.config.ts`). Lazım olarsa, məxfilik siyasəti linki əlavə edin.
- [ ] **Hero fotosu:** hazırkı foto BCG təqdimatından götürülüb. İRİA-nın öz fotoları ilə əvəz etmək tövsiyə olunur.

---

## 11. Problemlərin həlli

| Problem | Həll |
|---|---|
| `npm install` xəta verir | `node -v` ilə versiyanı yoxlayın (20.9+ lazımdır). `node_modules` və `package-lock.json`-u silmədən yenidən cəhd edin, alınmasa `npm cache clean --force` |
| Port 3000 məşğuldur | `npm run dev -- -p 3001` |
| Form "Müraciət göndərilmədi" deyir (production) | Upstash Redis qoşulmayıb və ya env dəyişənləri yoxdur. Vercel → Storage və Env yoxlayın, **Redeploy** edin. Vercel → Logs bölməsində `[application]` ilə başlayan xətaya baxın |
| `/admin` 404 qaytarır | `ADMIN_PASSWORD` təyin olunmayıb və ya təyin edildikdən sonra redeploy edilməyib |
| `/admin` "Verilənlər bazası qoşulmayıb" yazır | `KV_REST_API_URL` / `KV_REST_API_TOKEN` yoxdur |
| CSV Excel-də qarışıq simvollarla açılır | Faylı birbaşa iki kliklə açın (UTF-8 BOM var). "Data → From Text" ilə açırsınızsa, kodlaşdırmanı UTF-8, ayırıcını `;` seçin |
| Dəyişiklik saytda görünmür | Vercel-də deploy statusunu yoxlayın və səhifəni tam yeniləyin (Ctrl+Shift+R / Cmd+Shift+R) |
| Lokalda müraciət bazaya getmir | `.env.local`-da Upstash dəyişənləri olmadan müraciət yalnız terminala çap olunur, bu normaldır |
