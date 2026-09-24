# WhatsApp dəvət göndərişi (İRİA — 25 sentyabr tədbiri)

92 nəfərə dəvət mesajı göndərmək üçün alət. **Bloklanmamaq** əsas tələb olduğu üçün
qeyri-rəsmi botlar (whatsapp-web.js, Selenium, "WhatsApp sender" proqramları)
**istifadə olunmur** — onlar WhatsApp qaydalarını pozur və şəxsi nömrənin
bloklanmasının ən çox rast gəlinən səbəbidir. Onun yerinə iki təhlükəsiz yol var.

## Fayllar

| Fayl | Nədir |
|---|---|
| `contacts.csv` | Nömrələr (`phone,name`). Hazırda yalnız test nömrəsi var. `0501234567`, `+994501234567`, `994501234567` formatlarının hamısı qəbul olunur. |
| `message.txt` | Mesaj mətni (links rejimi üçün). |
| `send.py` | Alət. Yalnız Python 3.10+ lazımdır, heç nə quraşdırmaq lazım deyil. |
| `sent_log.csv` | Avtomatik yaranır; kimə göndərilib — təkrar işə salanda eyni adama ikinci dəfə getmir. |

---

## Variant A — Rəsmi WhatsApp Cloud API (tam avtomatik, tövsiyə olunur)

Meta-nın rəsmi biznes API-si. Toplu göndəriş üçün nəzərdə tutulub, bloklanma riski
yoxdur (qaydalara əməl etdikdə). Yeni nömrə gündə **250** unikal şəxsə yaza bilir —
92 üçün kifayətdir.

1. <https://developers.facebook.com> → **Create App** → *Business* → **WhatsApp** məhsulunu əlavə edin.
2. **WhatsApp → API Setup**: göndərən nömrəni qoşun (bu nömrə hazırda WhatsApp
   tətbiqində aktiv olmamalıdır; ayrıca nömrə götürmək daha rahatdır).
   Buradan `Phone number ID` və token götürün (daimi token üçün: Business Settings → System Users).
3. **WhatsApp Manager → Message templates → Create**:
   - Kateqoriya: **Marketing** (və ya Utility)
   - Ad: `iria_event_invite`
   - Dil: **Azerbaijani (az)**
   - Mətn: `message.txt`-in məzmunu
   - İstəyə görə *Quick reply* düymələri: "Bəli, iştirak edəcəm" / "Xeyr"

   Təsdiq adətən bir neçə dəqiqə – bir neçə saat çəkir.
4. Test:

   ```bash
   export WA_TOKEN="..."
   export WA_PHONE_NUMBER_ID="..."
   python3 send.py cloud --test +994774407050
   ```

5. Hamısı: `contacts.csv`-ə 92 nömrəni yazın, sonra

   ```bash
   python3 send.py cloud --dry-run   # əvvəl yoxlayın
   python3 send.py cloud             # təsdiq soruşur, sonra göndərir
   ```

   Meta limit/keyfiyyət xətası qaytararsa skript avtomatik dayanır.

Qeyd: test mərhələsində (app "Development" rejimində) API yalnız
**API Setup** səhifəsində əlavə etdiyiniz alıcı nömrələrinə göndərir — `+994774407050`-u
ora əlavə edib WhatsApp-dan gələn kodla təsdiqləyin.

## Variant B — wa.me linkləri (öz nömrənizdən, yarı-avtomatik)

API qurmağa vaxt yoxdursa. Mesajı hər kəs üçün hazırlayır, göndərməni isə siz basırsınız.

```bash
python3 send.py links --test +994774407050   # test
python3 send.py links                        # contacts.csv-dəki hamı üçün
```

`links.html` faylını açın, hər sətirdəki linkə klikləyin → WhatsApp açılır, mətn hazırdır → **Göndər**.

---

## Bloklanmamaq üçün qaydalar (hər iki variant)

WhatsApp nömrəni əsasən **istifadəçilərin "Block / Report" basmasına** görə məhdudlaşdırır.
Ona görə ən vacib şey — mesajın gözlənilən və faydalı olmasıdır:

- Yalnız tədbirlə əlaqəsi olan, nömrəsini qanuni yolla (qeydiyyat, əvvəlki əməkdaşlıq) verən şəxslərə yazın.
- Mesajda kimin yazdığı aydın olsun (bu mətndə var — İRİA, Arif). Nömrənizin profil adı/şəkli də İRİA olsun.
- Maraqlanmayanlar üçün çıxış yolu əlavə etmək məsləhətdir, məs: *"Maraqlı deyilsinizsə, bildirin — bir daha narahat etmərik."*
- Eyni adama ikinci dəfə yazmayın (skript bunu `sent_log.csv` ilə izləyir).
- Variant B-də: yeni açılmış nömrədən istifadə etməyin; 92 mesajı bir neçə saata / iki günə bölün; cavab verənlərə dərhal cavab yazın.

---

## Variant C — Tam avtomatik, öz nömrənizdən (`auto.js`)

Mesajı olduğu kimi, gün ərzində fasilələrlə özü göndərir. **Öz kompüterinizdə** işlədin
(Node.js 18+ lazımdır: <https://nodejs.org>).

```bash
cd whatsapp-automation
npm install
node auto.js --test 994774407050   # 1 test mesajı
node auto.js                       # contacts.csv-dəki hamı
```

İlk dəfə terminalda QR çıxır: telefonda **WhatsApp → Əlaqəli cihazlar → Cihaz əlavə et** ilə skan edin.
Sessiya yadda qalır, sonrakı dəfə QR lazım olmur.

Rejim (`auto.js`-in əvvəlindəki `CFG`-də dəyişmək olar):
- mesajlar arası təsadüfi 1–1.5 dəq, hər 15 mesajdan sonra 10 dəq fasilə;
- yalnız 10:00–18:00 arası göndərir;
- WhatsApp-ı olmayan nömrələri ötürür; ardıcıl 3 xəta olsa dayanır;
- `Ctrl+C` ilə dayandırıb yenidən işə salsanız qaldığı yerdən davam edir.

92 nəfər təxminən 2.5 saata gedir. Kompüter yuxu rejiminə keçməməlidir.

⚠️ Bu, WhatsApp Web-in qeyri-rəsmi avtomatlaşdırılmasıdır — WhatsApp qaydalarına ziddir.
Fasilələr riski azaldır, amma sıfıra endirmir. Mümkünsə şəxsi yox, ayrıca iş nömrəsindən istifadə edin.
