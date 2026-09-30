import type { Content } from "./types";

export const az: Content = {
  meta: {
    locale: "az",
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    description:
      "Həyati sistemlərin təhlükəsiz və fasiləsiz işləməsini təmin edən texnologiyalar üzərində çalışan şirkətləri bir araya gətirən klaster.",
  },
  ui: {
    skipToContent: "Məzmuna keç",
    languageLabel: "Dil",
    sectionsLabel: "Bölmələr",
    org: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi",
    nav: [
      { id: "haqqinda", label: "Klaster haqqında" },
      { id: "istiqametler", label: "İstiqamətlər" },
      { id: "terefdaslar", label: "Aparıcı tərəfdaşlar" },
      { id: "imkanlar", label: "Üzvlərə imkanlar" },
      { id: "qosulma", label: "Qoşulma" },
      { id: "muraciet", label: "Müraciət" },
    ],
    backToTop: "Yuxarı qayıt",
  },
  hero: {
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    lead: "Həyati sistemlərin təhlükəsiz və fasiləsiz işləməsini təmin edən texnologiyalar üzərində çalışan şirkətləri bir araya gətiririk. Klaster yerli həllərin hazırlanmasını, tətbiqini və regiona ixracını dəstəkləyir.",
    primary: { label: "Klasterə qoşulun", href: "#qosulma" },
    secondary: { label: "İstiqamətlərə baxın", href: "#istiqametler" },
    diagramLabel: "Aparıcı tərəfdaş ətrafında birləşən klaster üzvləri",
    legend: { anchor: "Aparıcı tərəfdaş", members: "Klaster üzvləri" },
  },
  about: {
    kicker: "01 · Klaster haqqında",
    title: "Klaster nədir",
    lead: "Klaster Texnopark rezidentlərini, aparıcı tərəfdaş şirkətləri və dövlət qurumlarını ümumi məqsəd ətrafında birləşdirir: kritik infrastrukturu qoruyan həllər yaratmaq və onları xarici bazarlara çıxarmaq.",
    pillars: [
      {
        title: "Mövcud imkanlara əsaslanmaq",
        body: "Azərbaycanın infrastrukturu, texniki bacarıqları və beynəlxalq tərəfdaşlıqları başlanğıc nöqtəsidir.",
      },
      {
        title: "Ekosistem yaratmaq",
        body: "Yerli və beynəlxalq şirkətlər arasında əməkdaşlıq, xarici şirkətlər üçün isə bazara sadələşdirilmiş giriş.",
      },
      {
        title: "Bilik və təcrübəni yerində qurmaq",
        body: "Aparıcı texnologiya şirkətlərinin xidmət, inteqrasiya və tətbiq fəaliyyətlərini Azərbaycanda qurmaq, yerli ekspertizanı inkişaf etdirmək.",
      },
      {
        title: "İxraca hazır həllər",
        body: "Mərkəzi Asiya, Yaxın Şərq və Afrika bazarları üçün Azərbaycandan təqdim olunan inteqrasiya olunmuş həllər.",
      },
    ],
  },
  domains: {
    kicker: "02 · İstiqamətlər",
    title: "Fəaliyyət istiqamətləri",
    lead: "Klaster mülki dayanıqlılıq texnologiyalarını əhatə edir.",
    items: [
      { id: "cyber", title: "Kibertəhlükəsizlik və rəqəmsal etimad", body: "Təhdidlərin aşkarlanması, identifikasiya, məlumatların qorunması, elektron imza" },
      { id: "comms", title: "Təhlükəsiz kommunikasiyalar", body: "Kritik missiya rabitəsi, şəbəkə dayanıqlılığı, şifrələmə" },
      { id: "data", title: "Məlumat və verilənlər", body: "Data platformaları, analitika, qərar qəbuluna dəstək" },
      { id: "ai", title: "Süni intellekt", body: "Sİ əsaslı analitika, avtomatlaşdırma və proqnozlaşdırma" },
      { id: "cloud", title: "Bulud texnologiyaları", body: "Dayanıqlı bulud infrastrukturu və rəqəmsal xidmətlər" },
      { id: "resilience", title: "Dayanıqlılıq həlləri", body: "Real vaxt monitorinqi, erkən xəbərdarlıq, xidmətlərin fasiləsizliyi" },
      { id: "space", title: "Kosmik texnologiyalar", body: "Peyk rabitəsi, Yerin müşahidəsi, məlumat xidmətləri" },
      { id: "uav", title: "Pilotsuz uçuş aparatları", body: "Mülki tətbiqlər: inspeksiya, monitorinq, logistika" },
    ],
  },
  partners: {
    kicker: "03 · Aparıcı tərəfdaşlar",
    title: "Aparıcı tərəfdaşlar",
    lead: "Klaster böyük milli şirkətlər və qlobal texnologiya şirkətləri ilə aparıcı (anchor) tərəfdaş kimi işləyir.",
    roles: [
      {
        title: "Milli şirkətlər",
        sectors: "Telekommunikasiya, kosmik, enerji və nəqliyyat",
        body: "Real tapşırıqlar və pilot layihələr təqdim edir.",
      },
      {
        title: "Qlobal texnologiya şirkətləri",
        body: "Texnologiya, standart və sertifikatlaşdırma gətirir.",
      },
    ],
    stepsTitle: "Əməkdaşlıq necə qurulur",
    steps: [
      { title: "Tapşırıq", body: "Aparıcı tərəfdaş həll tələb edən konkret tapşırığı müəyyən edir." },
      { title: "Komanda", body: "Klaster üzvlərindən tapşırığa uyğun şirkətlər qrupu formalaşır." },
      { title: "Pilot", body: "Həll real mühitdə pilot layihə kimi sınaqdan keçirilir." },
      { title: "İxrac", body: "Referansı olan hazır həll xarici bazarlara çıxarılır." },
    ],
  },
  benefits: {
    kicker: "04 · Üzvlərə imkanlar",
    title: "Klaster üzvlərinə imkanlar",
    lead: "Aşağıdakı imkanlar ilk növbədə klaster üzvlərinə təqdim olunur.",
    items: [
      { title: "Layihə üzərində dərhal işə başlamaq", body: "Aparıcı tərəfdaşların tapşırıqlarına və pilot layihələrə birbaşa çıxış." },
      { title: "İxraca dəstək", body: "Hədəf bazarların araşdırılması, satış fəaliyyətinə və bazara çıxışa dəstək." },
      {
        title: "Beynəlxalq tədbirlər",
        body: "Beynəlxalq konfranslarda və Azərbaycan milli pavilyonunda iştirak, dövlət nümayəndə heyətlərinin səfərlərinə qoşulmaq.",
      },
      { title: "Şəbəkələşmə və tərəfdaşlıq", body: "İnvestorlar, xarici tərəfdaşlar və digər klaster üzvləri ilə əlaqələr." },
    ],
    note: "İxraca dəstək və beynəlxalq tədbirlərdə iştirak İRİA-nın proqramları çərçivəsində həyata keçirilir. Bundan əlavə, Texnopark rezidentləri olan klaster üzvləri qanunvericiliklə müəyyən edilmiş güzəştlərdən istifadə edir.",
  },
  join: {
    kicker: "05 · Qoşulma",
    title: "Klasterə kimlər qoşula bilər",
    criteria: [
      "Fəaliyyəti yuxarıdakı istiqamətlərdən birinə aid olan Texnopark rezidentləri",
      "Öz məhsulu və ya texnologiyası olan şirkətlərə üstünlük verilir",
      "Formalaşmış texniki komanda və birgə layihələrdə iştirak etməyə hazırlıq",
    ],
    box: {
      title: "Müraciət",
      body: "Klasterə qoşulmaq və ya aparıcı tərəfdaş kimi əməkdaşlıq etmək üçün müraciət göndərin.",
      button: { label: "Müraciət göndərin", href: "#muraciet" },
    },
  },
  form: {
    kicker: "06 · Müraciət",
    title: "Müraciət forması",
    lead: "Formu doldurun. Müraciətinizə baxıldıqdan sonra sizinlə göstərdiyiniz email vasitəsilə əlaqə saxlanılacaq.",
    requiredNote: "* ilə işarələnmiş sahələr mütləqdir.",
    groups: { type: "Müraciət növü", company: "Şirkət", activity: "Fəaliyyət", contact: "Əlaqə şəxsi" },
    fields: {
      type: {
        label: "Nə üçün müraciət edirsiniz",
        options: [
          { value: "member", label: "Klasterə üzv kimi qoşulmaq" },
          { value: "anchor", label: "Aparıcı tərəfdaş kimi əməkdaşlıq" },
        ],
      },
      company: "Şirkətin adı",
      taxId: "VÖEN",
      website: "Vebsayt",
      websiteHint: "Məsələn: https://sirket.az",
      resident: {
        label: "Texnopark rezidentisinizmi",
        options: [
          { value: "yes", label: "Bəli" },
          { value: "applying", label: "Müraciət mərhələsindədir" },
          { value: "no", label: "Xeyr" },
        ],
      },
      domains: "Fəaliyyət istiqamətləri",
      domainsHint: "Bir və ya bir neçə istiqamət seçin.",
      product: "Məhsul və ya texnologiya",
      productHint: "Şirkətin öz məhsulu və ya texnologiyası haqqında qısa məlumat.",
      teamSize: { label: "Texniki komandanın ölçüsü", placeholder: "Seçin", options: ["1–10", "11–50", "51–200", "200+"] },
      name: "Ad və soyad",
      role: "Vəzifə",
      email: "Email",
      phone: "Telefon",
      message: "Əlavə qeyd",
      consent: "Təqdim etdiyim məlumatların müraciətə baxılması məqsədilə istifadə olunmasına razıyam.",
    },
    optional: "istəyə bağlı",
    submit: "Müraciəti göndər",
    submitting: "Göndərilir…",
    errors: {
      summary: "Formu göndərmək üçün qeyd olunan sahələri düzəldin.",
      required: "Bu sahəni doldurun.",
      email: "Düzgün email ünvanı daxil edin.",
      domains: "Ən azı bir istiqamət seçin.",
      url: "Düzgün veb ünvan daxil edin.",
      tooLong: "Mətn çox uzundur.",
      consent: "Davam etmək üçün razılığınızı təsdiqləyin.",
      failed: "Müraciət göndərilmədi. Bir az sonra yenidən cəhd edin.",
    },
    success: {
      title: "Müraciətiniz qəbul olundu",
      body: "Təşəkkür edirik. Müraciətinizə baxıldıqdan sonra göstərdiyiniz email ünvanı ilə sizinlə əlaqə saxlanılacaq.",
      again: "Yeni müraciət göndər",
    },
  },
  footer: {
    text: "İnnovasiya və Rəqəmsal İnkişaf Agentliyi, Rəqəmsal İnkişaf və Nəqliyyat Nazirliyi, 2026",
  },
};
