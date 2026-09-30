# Resilience Cluster: sayt üzrə ilkin struktur və icra müddəti təklifi

**Kimə:** Rəhbərlik
**Mövzu:** BCG-nin göndərdiyi materiallar (təqdimat və sayt mətni) əsasında 1 səhifəlik daxili sayt
**Status:** İlkin təklif. Qeyd: 30.09.2026 tarixində sayt İRİA-nın yeni HTML strukturuna keçirilib (Klaster haqqında, İstiqamətlər, Aparıcı tərəfdaşlar, Üzvlərə imkanlar, Qoşulma).

---

## 1. Qısa xülasə

- BCG materialları **bir uzun səhifəlik (landing) sayt** formatına tam uyğundur. Mətnin həcmi ikinci səhifəni əsaslandırmır, lövbər naviqasiyası ilə bütün bölmələr bir səhifədə rahat oxunur.
- Sayt şifrəsiz açılır, amma axtarış sistemlərində göstərilmir (`noindex`). Word sənədindəki mətnlə yanaşı təqdimatdakı strategiya materialları da (anchor şirkətlər, lokallaşdırma yolları) səhifəyə daxil edilib. Heç bir məlumat buraxılmayıb.
- Materialları birləşdirərkən **11 uyğunsuzluq və boşluq** aşkar edilib. Tam siyahı bu sənədin 8-ci bölməsindədir. Ən vacib 3-ü saytda artıq həll olunub (bax: bölmə 5), qalanları BCG ilə dəqiqləşdirilməlidir.
- Təxmini icra müddəti: **cəmi ~5 iş günü**. Prototip artıq hazır olduğu üçün qalan hissə əsasən rəy, düzəlişlər və deploydur (bax: bölmə 4).

## 2. Mənbələr

| Mənbə | Məzmun | İstifadə |
|---|---|---|
| Word: *Resilience Cluster website content draft* | 4 bölmə: Klaster haqqında, Fokus istiqamətləri (4), Niyə Azərbaycan, Güzəştlər (vergi + ixrac proqramları) | Əsas sayt mətni, olduğu kimi |
| PDF: *Technology resilience cluster v4* (BCG, 13 slayd) | Yuxarıdakıların slayd versiyası + $1B hədəfi, 6 istiqamət, vergi cədvəli, anchor şirkət strategiyası (slayd 7–12) | Rəqəmlər, əlavə detallar, vizual üslub, loqolar |

Yalnız bir mənbədə olan hər bir məlumat saytda **"Deck only / Yalnız təqdimatda"** nişanı ilə işarələnib. Bu nişanları başlıqdakı düymə ilə gizlətmək olur.

## 3. Təklif olunan struktur (1 səhifə)

```
Başlıq (Nazirlik loqosu · Mənbə qeydləri açarı · EN/AZ)
│
├─ Hero: klasterin adı, əsas mesaj, $1B İKT ixracı hədəfi, 4 əsas göstərici
│
├─ 01 Klaster haqqında: klaster nədir + modelin 4 öhdəliyi
├─ 02 Fokus istiqamətləri: 4 əsas + 2 əlavə (PUA: ayrıca; Data/Sİ: kəsişən) + əhatədən kənar
├─ 03 Niyə Azərbaycan: 3 səbəb
├─ 04 Güzəştlər
│     4.1 Vergi və tənzimləmə (6 qrup, BCG cədvəlindəki bütün rəqəmlərlə)
│     4.2 İxraca dəstək proqramları (4 istiqamət, 7 proqram, məbləğlərlə)
│
├─ 05 Anchor şirkət strategiyası
│     • Prioritetləşdirmə meyarları (strateji cəlbedicilik × lokallaşdırma)
│     • İstiqamətlər üzrə ilkin namizəd siyahısı (45 unikal şirkət, loqolarla)
│     • 5 prioritet şirkət qrupu + dəyər zəncirində lokallaşdırma
│     • Lokallaşdırma yolu 1: Rusiyadan çıxmış şirkətlər (5)
│     • Lokallaşdırma yolu 2: Azərbaycanda artıq aktiv olan şirkətlər (7)
│
└─ Footer: mənbələr
```

Gələcəkdə sayt **publik** versiyaya keçərsə: 05-ci bölmə çıxarılır, əvəzinə "Üzvlük / Əlaqə" (CTA) bölməsi əlavə olunur. Struktur buna hazırdır, çünki strategiya hissəsi ayrıca blokdur.

## 4. İcra müddəti

| Mərhələ | İş | Müddət | Status |
|---|---|---|---|
| 0 | Materialların təhlili, struktur, işlək prototip (EN + AZ qaralama) | 1 iş günü | ✅ Hazırdır |
| 1 | Daxili rəy + BCG ilə açıq məsələlərin dəqiqləşdirilməsi | 2 iş günü* | Gözləyir |
| 2 | Rəyə əsasən düzəlişlər, AZ mətninin redaktəsi | 1–2 iş günü | Gözləyir |
| 3 | Vercel-ə deploy, şifrənin qurulması, yekun yoxlama (desktop/mobil) | 0.5 iş günü | Gözləyir |
| | **Cəmi** | **~5 iş günü** | |

\* Müddət əsasən BCG-nin cavab sürətindən asılıdır. Texniki hissə paralel davam edə bilər.

**Publik versiya lazım olarsa (əlavə, təxminən 1–2 həftə):** daxili bölmənin çıxarılması, müraciət/əlaqə forması, domen (məs. nazirliyin subdomeni), analitika, hüquqi və kommunikasiya yoxlaması.

## 5. Əsas məsələlər və həlli

1. **İstiqamətlərin sayı:** Word-də 4, təqdimatda 6 (PUA və Data/Sİ əlavə). ✅ Hər iki çərçivə saytda yan-yana göstərilir, istiqamətlər üzrə namizəd şirkətlərin chartı ilə.
2. **0% mənfəət vergisinin ixrac şərti:** təqdimatda "gəlir Azərbaycan hesablarına daxil olmalıdır" şərti var, Word-də yox idi. ✅ Şərt saytın əsas mətninə əlavə edilib.
3. **CrowdStrike (slayd 12):** "klasterə uyğunluq" mətni IAI sətrinin təkrarı idi. ✅ 3-cü slayddakı kiber imkanlarla əvəz olunub, təkrar yoxdur. Yekun ifadəni BCG təsdiqləməlidir.

Saytda əsas rəqəmlər chartlarla da göstərilir: istiqamətlər üzrə namizəd şirkətlər, vergi güzəştləri, royalti, ixrac dəstəyi məbləğləri, prioritet qruplar və Rusiyadan çıxış xronologiyası.

Digər məsələlər ($1B hədəfinin ili, "100% (<50%)" ifadəsinin mənası, Mandiant uyğunsuzluğu, təkrarlanan slayd, orfoqrafik və formatlama səhvləri) aşağıda, 8-ci bölmədə ətraflı verilib.

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

## 8. Materiallardakı uyğunsuzluqlar (tam siyahı)

Bu siyahı əvvəl saytda "Yoxlama qeydləri" bölməsində idi. Sayt sadələşdirilərkən oradan çıxarılıb, burada saxlanılır.

| # | Status | Məsələ | Təfərrüat |
|---|---|---|---|
| 1 | Həll olunub | İstiqamətlərin sayı: dörd və ya altı | Word qaralaması dörd əsas istiqaməti əhatə edir, təqdimatın 3-cü slaydında isə “altı prioritet istiqamət” yazılıb (mülki PUA sistemləri: “ayrıca əhatə olunur”, data və Sİ: “kəsişən imkan”). Hər iki çərçivə indi 02-ci bölmədə yan-yana göstərilir, istiqamətlər üzrə namizəd şirkətlərin chartı ilə birlikdə. |
| 2 | Həll olunub | 0% mənfəət vergisi: ixrac şərti mətnə əlavə edilib | Təqdimatın 5-ci slaydında sıfır dərəcəli mənfəət vergisinə bank daxilolma şərti (“gəlir Azərbaycandakı hesablara daxil olmalıdır”) əlavə olunub, Word qaralamasında isə bu şərt yox idi. Şərt indi 4.1 bölməsində “Mənfəət və dividendlər” mətninə daxil edilib. |
| 3 | Həll olunub | CrowdStrike üçün “klasterə uyğunluq” düzəldilib | 12-ci slaydda CrowdStrike sətri IAI mətnini təkrarlayırdı (Yerin müşahidəsi / peyk mühəndisliyi). O, 3-cü slayddakı müvafiq kibertəhlükəsizlik imkanları (təhdidlərin aşkarlanması və cavab tədbirləri; identifikasiya və giriş idarəetməsi) ilə əvəz olunub, təkrar qalmayıb. Yekun ifadəni BCG təsdiqləməlidir. |
| 4 | Yoxla | $1 mlrd İKT ixracı hədəfi yalnız təqdimatdadır | 2-ci slaydda milli hədəf kimi “$1B ICT export” göstərilib, amma hədəf ili və ya baza göstəricisi yoxdur. Word qaralamasında bu rəqəm istifadə olunmur. |
| 5 | Yoxla | İnvestisiya güzəşti “100% (<50%)” qeyri-müəyyəndir | “(<50%)” ifadəsinin mənası izah olunmayıb (gəlirin/mənfəətin payı üzrə limit?). Word qaralamasında yalnız “uyğun investisiyaların tam məbləğdə çıxılması” deyilir. |
| 6 | Yoxla | Mandiant: “Azərbaycanda iştirak edir” və “layihə müəyyən edilməyib” | 9-cu slaydda Google/Mandiant Azərbaycanda danışıqlarda/tenderlərdə iştirak edən şirkətlər qrupuna daxil edilib, 12-ci slaydda isə Mandiant-a aid Azərbaycan layihəsinin ictimai şəkildə müəyyən edilmədiyi qeyd olunur. |
| 7 | Yoxla | Slaydlar arasında istiqamət təsnifatı fərqlənir | 11–12-ci slaydlarda şirkətlər “Data, bulud və Sİ” altında qruplaşdırılıb (məs. Siemens, Microsoft), 3-cü slaydda isə data və Sİ ayrıca istiqamət deyil, kəsişən imkan kimi təqdim olunur. |
| 8 | Düzəlt | Təkrarlanan slayd | 7 və 10-cu slaydlar (prioritetləşdirmə meyarları) eynidir. Bu səhifədə bir dəfə göstərilib. |
| 9 | Düzəlt | Təqdimatda orfoqrafik səhvlər və artıq mətn | 5-ci slayd: “Estonian's governance architecture” əvəzinə “Estonia's” olmalıdır. 6-cı slayd: hədəfli media təbliğatı altında artıq “Remote” sözü; “meting” əvəzinə “meeting” olmalıdır; cümlənin ortasında böyük hərflə “Developed”; dövlət səfərləri bəndində bağlanmamış mötərizə. |
| 10 | Düzəlt | Word qaralamasında formatlama səhvləri | Bir neçə əsas mətn abzası başlıq kimi formatlanıb (“What the cluster is” mətni, “Enable the ecosystem” mətni və Heading 1 kimi formatlanmış “economic reform agenda” mətni). “For outlined reasons” ifadəsi qeyri-təbii səslənir. Hər hansı CMS-ə ötürməzdən əvvəl düzəldilməlidir. |
| 11 | Düzəlt | Azərbaycan dilində versiya qaralama tərcümədir | Bu səhifənin AZ versiyası daxili qaralama tərcümədir və hər hansı xarici istifadədən əvvəl məzmun sahibi tərəfindən yoxlanılmalıdır. |
