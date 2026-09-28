import { C, candidatesByDomain, pools } from "./companies";
import type { Content } from "./types";

// Draft translation of en.ts — pending review by the content owner.
export const az: Content = {
  meta: {
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    description:
      "Komanda daxili brifinq: Azərbaycan Texnoloji Dayanıqlılıq Klasteri — model, fokus istiqamətləri, güzəştlər və anchor şirkət strategiyası (BCG materialları əsasında, sentyabr 2026).",
  },
  ui: {
    skipToContent: "Məzmuna keç",
    internalBadge: "Daxili",
    internalNotice: "Daxili iş materialı — ictimai yayım üçün deyil",
    sourcesOn: "Mənbə qeydləri: açıq",
    sourcesOff: "Mənbə qeydləri: bağlı",
    deckOnly: "Yalnız təqdimatda",
    wordOnly: "Yalnız Word-də",
    sourceLegend:
      "Məzmun BCG-nin sayt mətni qaralaması (Word) və BCG təqdimatı birləşdirilərək hazırlanıb. Yalnız bir mənbədə olan məlumatlar işarələnib.",
    languageLabel: "Dil",
    nav: [
      { id: "about", label: "Klaster haqqında" },
      { id: "domains", label: "Fokus istiqamətləri" },
      { id: "why-azerbaijan", label: "Niyə Azərbaycan" },
      { id: "incentives", label: "Güzəştlər" },
      { id: "strategy", label: "Anchor strategiyası" },
      { id: "review", label: "Yoxlama qeydləri" },
    ],
    sectionPublic: "Klaster narrativi",
    sectionInternal: "Daxili strategiya",
    backToTop: "Yuxarı qayıt",
  },
  hero: {
    eyebrow: "Dayanıqlılıq klasteri — şirkətlərin yerləşdirilməsi",
    title: "Azərbaycan Texnoloji Dayanıqlılıq Klasteri",
    lead:
      "Azərbaycan Dayanıqlılıq Klasterini həyati sistemlərin təhlükəsizliyini və fasiləsizliyini gücləndirən texnologiyaların cəlb edilməsi və lokallaşdırılması üçün əsas platforma kimi mövqeləndirir, eyni zamanda bu həllərin miqyaslanmasına və ixrac bazarlarında rəqabət aparmasına şərait yaradır.",
    ambitionLabel: "Aydın milli hədəf",
    ambitionValue: "$1 mlrd",
    ambitionCaption: "İKT ixracı",
    tagline: "Azərbaycan həlləri cəlb etməyi, miqyaslamağı və ixrac etməyi hədəfləyir",
    stats: [
      { value: "4", label: "bir-biri ilə əlaqəli öhdəlik" },
      { value: "4 + 2", label: "əsas + dəstəkləyici istiqamət", source: "deck" },
      { value: "0%", label: "uyğun texnoloji fəaliyyətlər üçün uzunmüddətli mənfəət vergisi" },
      { value: "$20K / $50K", label: "illik bazar tədqiqatı qrantı / satış mütəxəssisi dəstəyi" },
    ],
    date: "BCG materialları · Sentyabr 2026",
  },
  about: {
    kicker: "01 · Klaster haqqında",
    title: "Klaster nədir",
    lead:
      "Azərbaycan Dayanıqlılıq Klasterini həyati sistemlərin təhlükəsizliyini və fasiləsizliyini gücləndirən texnologiyaların cəlb edilməsi və lokallaşdırılması üçün əsas platforma kimi mövqeləndirir, eyni zamanda bu həllərin miqyaslanmasına və ixrac bazarlarında rəqabət aparmasına şərait yaradır.",
    modelTitle: "Model necə işləyir",
    modelLead: "Klaster bir-biri ilə əlaqəli dörd öhdəlik üzərində qurulub.",
    deckBulletsLabel: "Təqdimatdan",
    commitments: [
      {
        title: "Mövcud güclü tərəflərə əsaslanmaq",
        body:
          "Klaster Azərbaycanın infrastrukturuna, formalaşmış texniki imkanlarına, həmçinin digər texnologiya klasterləri və provayderlərlə beynəlxalq tərəfdaşlıqlarına əsaslanır.",
        bullets: [
          "Azərbaycanın infrastrukturundan, imkanlarından və digər ekosistemlər/texnologiya provayderləri ilə beynəlxalq tərəfdaşlıqlarından istifadə etmək",
        ],
      },
      {
        title: "Ekosistemi təmin etmək",
        body:
          "Klaster beynəlxalq şirkətlərə “yumşaq eniş” (soft-landing) platforması təqdim edir: şirkətlər hüquqi şəxsin qeydiyyatı, tərəfdaş axtarışı və tənzimləyici tələblərlə təkbaşına məşğul olmadan bazara sadələşdirilmiş şəkildə daxil olurlar.",
        bullets: [
          "Beynəlxalq şirkətlər üçün “yumşaq eniş” platforması təqdim etmək",
          "Yerli və qlobal şirkətlər arasında əməkdaşlığı təşviq etmək",
        ],
      },
      {
        title: "Cəlb etmək və lokallaşdırmaq",
        body:
          "Klaster aparıcı dayanıqlılıq texnologiyası provayderlərini cəlb edir və onların dəyər zəncirinin seçilmiş hissələrinin — xüsusilə xidmətlər, inteqrasiya və tətbiqin — Azərbaycanda lokallaşdırılmasını dəstəkləyir, eyni zamanda yerli imkanları və ekspertizanı inkişaf etdirir.",
        bullets: [
          "Aparıcı dayanıqlılıq texnologiyası provayderlərini cəlb etmək",
          "Onların dəyər zəncirinin seçilmiş hissələrini lokallaşdırmaq (xidmətlər, inteqrasiya, tətbiq)",
          "Yerli imkanları və ekspertizanı inkişaf etdirmək",
        ],
      },
      {
        title: "İxrac modelini inkişaf etdirmək",
        body:
          "Son məqsəd Azərbaycandan təqdim olunan inteqrasiya olunmuş, ixraca hazır həllər portfelidir; dəyər zəncirinin seçilmiş fəaliyyətləri xaricdəki müştərilərə xidmət göstərəcək. Prioritet bazarlara Mərkəzi Asiya, Yaxın Şərq, Afrika və qonşu regionlar daxildir.",
        bullets: [
          "Dəyər zəncirinin seçilmiş hissələrini yerinə yetirən inteqrasiya olunmuş, ixraca hazır həllər yaratmaq",
          "Mərkəzi Asiya, Yaxın Şərq və Afrika, həmçinin qonşu bazarlara prioritet diqqət",
        ],
      },
    ],
  },
  domains: {
    kicker: "02 · Fokus istiqamətləri",
    title: "Mülki və ikili təyinatlı dayanıqlılıq texnologiyaları",
    lead:
      "Dayanıqlılıq Klasteri mülki və ikili təyinatlı dayanıqlılıq texnologiyalarına fokuslanır. Dörd əsas texnoloji istiqamət əhatə olunur.",
    deckTitle:
      "Təqdimatda altı prioritet istiqamət göstərilir: aşağıdakı dörd əsas istiqamət, üstəgəl mülki avtonom və PUA sistemləri (ayrıca əhatə olunur) və data və süni intellekt (kəsişən dəstəkləyici imkan).",
    statusLabels: {
      core: "Əsas istiqamət",
      separate: "Ayrıca əhatə olunur",
      crossCutting: "Kəsişən dəstəkləyici imkan",
    },
    items: [
      {
        id: "cyber",
        title: "Kibertəhlükəsizlik və rəqəmsal etimad",
        description: "Kritik xidmətlərin asılı olduğu şəbəkələrin, sistemlərin və məlumatların qorunması",
        bullets: [
          "Təhdidlərin aşkarlanması və cavab tədbirləri",
          "İdentifikasiya və giriş idarəetməsi",
          "Məlumatların qorunması",
        ],
        status: "core",
      },
      {
        id: "comms",
        title: "Təhlükəsiz kommunikasiyalar",
        description:
          "Əsas infrastruktur zəiflədikdə və ya təhdid altında olduqda rabitənin əlçatan və qorunan qalmasının təmin edilməsi",
        bullets: [
          "Kritik missiya kommunikasiyaları",
          "Şəbəkə dayanıqlılığı",
          "Şifrələmə və təhlükəsiz məlumat mübadiləsi",
        ],
        status: "core",
      },
      {
        id: "awareness",
        title: "Situasiya məlumatlılığı və monitorinq",
        description:
          "Mülki operatorlara aktivlər, infrastruktur və ərazi üzrə baş verənlərin dəqiq və aktual mənzərəsinin təqdim edilməsi",
        bullets: [
          "Real vaxt monitorinq sistemləri",
          "İdarəetmə və nəzarət (mülki)",
          "Məsafədən zondlama və xəbərdarlıq",
        ],
        status: "core",
      },
      {
        id: "space",
        title: "Kosmik texnologiyalara əsaslanan həllər",
        description:
          "Yer üzərində rabitə, müşahidə və məlumat xidmətlərinin göstərilməsi üçün kosmik infrastrukturdan istifadə",
        bullets: ["Peyk rabitəsi", "Yerin müşahidəsi", "Məlumat və rabitə xidmətləri"],
        status: "core",
      },
      {
        id: "uav",
        title: "Avtonom və PUA sistemləri (mülki)",
        bullets: ["İnspeksiya və monitorinq", "Logistika və infrastruktur dəstəyi"],
        status: "separate",
        note: "Ayrıca əhatə olunur",
        source: "deck",
      },
      {
        id: "data-ai",
        title: "Data və süni intellektə əsaslanan dayanıqlılıq",
        bullets: ["Data platformaları", "Süni intellektə əsaslanan analitika", "Qərar qəbuletməyə dəstək sistemləri"],
        status: "crossCutting",
        note: "Ayrıca son istifadə istiqaməti deyil, kəsişən dəstəkləyici imkanlardır",
        source: "deck",
      },
    ],
    listNote: "Siyahılar nümunəvidir — təqdimatda hər istiqamət “…” ilə bitir.",
    exclusion: {
      title: "Əhatə dairəsindən kənar",
      body:
        "Klasterə hərbi təyinatlı həllər daxil edilməyəcək, məsələn, silah sistemləri, kinetik hərbi platformalar, hücum xarakterli kiber imkanlar.",
    },
  },
  why: {
    kicker: "03 · Niyə Azərbaycan",
    title: "Dayanıqlılıq həllərinin miqyaslanması üçün cəlbedici platforma",
    lead: "Azərbaycan aşağıdakı səbəblərə görə dayanıqlılıq həllərinin miqyaslanması üçün cəlbedici platformadır.",
    reasons: [
      {
        icon: "landmark",
        title: "Dövlət tərəfindən dəstəklənən dayanıqlılıq gündəliyi",
        body:
          "Dayanıqlılıq texnologiyaları Azərbaycanda milli səviyyəli prioritetdir; dövlət infrastrukturu və xidmətləri üzrə milli prioritetlərlə dəstəklənən, dövlətin təmin etdiyi yerli tələb mövcuddur.",
        bullets: [
          "Dayanıqlılıq texnologiyaları klasteri dövlət dəstəkli yerli tələbə malik milli səviyyəli prioritetdir",
          "Əhəmiyyətli dövlət dəstəyi ilə ixrac yönümlü texnologiya ekosistemi qurmaq üzrə uzunmüddətli planlar",
        ],
      },
      {
        icon: "bridge",
        title: "Siyasi bloklara bağlı olmayan etibarlı regional qapı",
        body:
          "Azərbaycanın strateji coğrafi mövqeyi Avropa, Mərkəzi Asiya, Yaxın Şərq, Afrika və digər regionları birləşdirir; bu da dayanıqlılıq bazarının böyük hissəsini vahid bazadan regional əlçatanlıq daxilində saxlayır. Ölkə bütün qonşuları və region ölkələri ilə balanslı, dostluq və siyasi cəhətdən müstəqil münasibətlər saxlayır.",
        bullets: [
          "Avropa, Mərkəzi Asiya, Yaxın Şərq, Afrika və digər regionları birləşdirən strateji coğrafi mövqe",
          "Bütün qonşular və region ölkələri ilə balanslı, dostluq və siyasi cəhətdən müstəqil münasibətlər",
        ],
      },
      {
        icon: "gavel",
        title: "Davam edən iqtisadi islahatlar gündəliyi",
        body:
          "Azərbaycan biznes mühitini yaxşılaşdırmaq və investor inamını gücləndirmək məqsədilə daha geniş transformasiya gündəliyini irəli aparır. Biznes əməliyyatlarını sadələşdirmək, bazara daxilolma və böyümə qarşısındakı maneələri azaltmaq üçün əlavə tənzimləyici islahatlar planlaşdırılır.",
        bullets: [
          "Biznes mühitinin yaxşılaşdırılmasına və investor inamının artırılmasına yönəlmiş transformasiya gündəliyi",
          "Bazarın şəffaflığını artırmağa yönəlmiş tənzimləyici dəyişikliklər yoldadır",
        ],
      },
    ],
  },
  incentives: {
    kicker: "04 · Güzəştlər və üstünlüklər",
    title: "Klaster üzvləri üçün müəyyən edilmiş dəstək paketi",
    lead:
      "Dayanıqlılıq Klasterinə üzvlük fiskal güzəştlər, ixracın inkişafı proqramları, bazara daxilolma və Azərbaycanda fəaliyyətin qurulmasına yardım daxil olmaqla müəyyən edilmiş dəstək paketinə çıxış imkanı verir.",
    tax: {
      title: "4.1 Texnologiya şirkətləri üçün qurulmuş vergi və tənzimləmə çərçivəsi",
      headline:
        "Dayanıqlılıq klasterinin inkişafını dəstəkləmək üçün Azərbaycan hazırda postsovet məkanında ən əhatəli iqtisadi islahatı həyata keçirir",
      subline:
        "Bu islahat Estoniyanın idarəetmə arxitekturasını, BƏƏ-nin sıfır vergi fiskal modelini və Sinqapurun əqli mülkiyyət üzrə dəqiqliyini vahid qanunvericilik dövründə birləşdirir və Azərbaycanı vergi və tənzimləmə baxımından bütün regional həmkarlarını qabaqlamaq mövqeyinə gətirir.",
      intro:
        "Azərbaycan ölkəni texnologiya biznesləri üçün rəqabətqabiliyyətli bazaya çevirmək məqsədilə geniş miqyaslı iqtisadi islahat həyata keçirir:",
      selectedExamples: "Seçilmiş nümunələr",
      groups: [
        {
          title: "Mənfəət və dividendlər",
          body:
            "Süni intellekt, rəqəmsal və kibertəhlükəsizlik daxil olmaqla uyğun fəaliyyətlər üçün uzunmüddətli sıfır dərəcəli mənfəət vergisi və innovasiya sektorunda dividendlərə sıfır dərəcə.",
          rows: [
            { category: "Korporativ və rəqəmsal vergitutma", label: "Mənfəət vergisi", value: "0% (uzunmüddətli)", note: "Süni intellekt, rəqəmsal və kibertəhlükəsizlik fəaliyyətlərinə şamil olunur" },
            { category: "Korporativ və rəqəmsal vergitutma", label: "İxrac şərti", value: "Bank daxilolma şərti", note: "Gəlir Azərbaycandakı hesablara daxil olmalıdır", source: "deck" },
            { category: "Dividendlər", label: "Dividend vergisi", value: "0%", note: "İnnovasiya sektoruna şamil olunur" },
          ],
        },
        {
          title: "İnsan resursları",
          body:
            "İKT mütəxəssisləri — xarici ekspertlər, geri qayıdan rezidentlər və tədqiqat-inkişaf (R&D) əməkdaşları — üçün iyirmi il müddətinə sıfır dərəcəli gəlir vergisi.",
          rows: [
            { category: "Gəlir vergisi", label: "İKT mütəxəssisləri", value: "0% (20 il)", note: "Xarici ekspertlərə, geri qayıdan rezidentlərə, R&D əməkdaşlarına şamil olunur" },
          ],
        },
        {
          title: "İnvestisiya və R&D",
          body:
            "Uyğun investisiyaların tam məbləğdə gəlirdən çıxılması və əmək haqqı, materiallar və sınaqları əhatə edən, uğursuz layihələr də daxil olmaqla, R&D xərcləri üçün artırılmış (super) güzəşt.",
          rows: [
            { category: "İnvestisiya güzəştləri", label: "İnvestisiya güzəşti", value: "100% (<50%)", note: "Gəlirdən/mənfəətdən çıxılır", source: "deck" },
            { category: "R&D güzəştləri", label: "Güzəşt", value: "250% (super güzəşt)", note: "Əmək haqqı, materiallar, sınaqlar daxil olmaqla", source: "deck" },
            { category: "R&D güzəştləri", label: "Uğursuz R&D", value: "Çıxılır", note: "Uğursuz layihələr də daxildir" },
          ],
        },
        {
          title: "Əqli mülkiyyət",
          body:
            "Royalti gəlirləri böyük ölçüdə vergidən azaddır; bu da uyğun əqli mülkiyyət gəlirləri üzrə effektiv dərəcəni təxminən bir faizə endirir.",
          rows: [
            { category: "Əqli mülkiyyət / texnologiya gəliri", label: "Royalti gəliri", value: "95% azad", note: "Yalnız 5%-i vergiyə cəlb olunur → ~1% effektiv" },
          ],
        },
        {
          title: "İdxal",
          body:
            "Texnologiya idxalı və xidmətləri ƏDV-dən, avadanlıq idxalı isə gömrük rüsumundan azaddır.",
          rows: [
            { category: "ƏDV / gömrük", label: "ƏDV", value: "0%", note: "Texnologiya idxalı və xidmətləri azaddır" },
            { category: "ƏDV / gömrük", label: "Gömrük", value: "0%", note: "Avadanlıq idxalı azaddır" },
          ],
        },
        {
          title: "Məsafədən qeydiyyat",
          body:
            "Şirkətin qeydiyyatı, rəqəmsal identifikasiya və bank hesabının açılması tam məsafədən həyata keçirilir; beləliklə, şirkət Azərbaycana səfər etmədən təsis oluna və fəaliyyətə başlaya bilər.",
          rows: [
            { category: "Yumşaq eniş", label: "Rəqəmsal ID – Virtual VÖEN", value: "Məsafədən" },
            { category: "Yumşaq eniş", label: "Şirkətin qeydiyyatı", value: "Məsafədən" },
            { category: "Yumşaq eniş", label: "Bank hesabı", value: "Rəqəmsal qoşulma" },
          ],
        },
      ],
    },
    exportSupport: {
      title: "4.2 İxraca dəstək proqramları",
      intro:
        "Klaster üzvlərinin böyüməsini sürətləndirmək məqsədilə dörd istiqamət üzrə xüsusi ixraca dəstək proqramları hazırlanır:",
      deckIntro:
        "Klasterin hər bir üzvünün böyüməsini sürətləndirmək üçün xüsusi ixraca dəstək proqramları hazırlanır.",
      areas: [
        {
          title: "Hədəf bazara dəstək",
          body:
            "Üzvlər konkret bazara daxil olmazdan əvvəl onun ixrac potensialını qiymətləndirmək üçün hədəf bazar tədqiqatının hazırlanmasına hər şirkət üzrə ildə 20 000 ABŞ dollarınadək qrant əldə edə bilərlər. Bazar seçildikdən sonra həmin bazar üzrə xüsusi satış mütəxəssisinin işə götürülməsi və satış heyətinin təlimi üçün ildə 50 000 ABŞ dollarınadək maliyyə dəstəyi göstərilir.",
          programs: [
            {
              name: "Hədəf bazar tədqiqatı",
              amount: "≤ $20 000 / il",
              detail:
                "Hədəf bazar tədqiqatı üçün bir şirkətə ildə maksimum 20 000 ABŞ dolları. Qrant şirkət üçün potensial ixrac bazarını qiymətləndirən tədqiqatın hazırlanmasına ayrılır.",
            },
            {
              name: "Hədəf bazarda satışa dəstək",
              amount: "≤ $50 000 / il",
              detail:
                "Hədəf bazar üzrə xüsusi satış mütəxəssisinin işə götürülməsi üçün ildə 50 000 ABŞ dollarınadək maliyyə dəstəyi və satış heyətinin təlimi.",
            },
          ],
        },
        {
          title: "Beynəlxalq şəbəkələşmə",
          body:
            "Azərbaycan əsas regional konfranslarda və qlobal sənaye tədbirlərində milli stend saxlayır; bu, üzvlərə müstəqil iştirakın tam xərcini daşımadan sərgidə təmsil olunmaq imkanı verir. Bundan əlavə, seçilmiş aparıcı sənaye konfranslarına səfər və iştirak xərcləri kompensasiya edilir ki, üzvlər əlaqələr qursun, kommersiya imkanlarını inkişaf etdirsin və onları müqavilələrə çevirsin.",
          programs: [
            { name: "Beynəlxalq sərgilər", detail: "Əsas regional konfranslarda və qlobal sənaye tədbirlərində Azərbaycan stendi." },
            {
              name: "Konfranslarda iştirak",
              detail:
                "Şəbəkələşməni və ixrac müqavilələrinin imzalanmasını dəstəkləmək üçün aparıcı sənaye konfranslarına səfər və bilet xərclərinin kompensasiyası.",
            },
          ],
        },
        {
          title: "Marketinq və təşviq",
          body:
            "Azərbaycanın səfirlikləri üzv şirkətləri bazarın inkişafı üzrə fəal tərəfdaş kimi dəstəkləyir, prioritet bazarlarda müvafiq tanışlıq və görüşlərin təşkilinə kömək edir. Paralel olaraq İRİA və Nazirlik həm Azərbaycanın, həm də klaster şirkətlərinin hədəf coğrafiyalarda tanınmasını gücləndirir.",
          programs: [
            {
              name: "Səfirliklər vasitəsilə şəbəkələşmə",
              detail:
                "Səfirliklər şirkətlər üçün proaktiv satış nümayəndəsinə çevriləcək, təyinat ölkələrində mənalı görüşlər təşkil edəcək.",
            },
            {
              name: "Hədəfli media təbliğatı",
              detail:
                "Klaster İRİA və Nazirlik vasitəsilə hədəf bazarlarda Azərbaycanın və klaster şirkətlərinin tanınmasını dəstəkləyəcək.",
            },
          ],
        },
        {
          title: "Dövlət satışları",
          body:
            "Üzvlər həm daxili, həm də xarici dövlət səviyyəli şəbəkələşmədən — Azərbaycana səfər edən xarici nümayəndə heyətləri ilə görüşlərdən və İRİA və Nazir tərəfindən rəhbərlik edilən seçilmiş beynəlxalq missiyalarda iştirakdan — faydalanır.",
          programs: [
            {
              name: "Dövlət səfərləri",
              detail:
                "Klaster üzvləri daxili və xarici dövlət şəbəkələşməsinə dəvət olunacaq (Azərbaycana səfər edən nümayəndə heyətləri ilə görüşlər və İRİA və Nazirin xarici səfərlərində iştirak).",
            },
          ],
        },
      ],
    },
  },
  strategy: {
    kicker: "05 · Anchor şirkət strategiyası",
    title: "Anchor şirkətlərin cəlb edilməsi",
    lead:
      "Klasterin “anchor” (aparıcı) şirkətləri kimi hansı şirkətlərin çıxış edə biləcəyi, onların necə prioritetləşdirildiyi və Azərbaycanda lokallaşdırmaya doğru iki yol barədə BCG iş materialı. Yalnız təqdimatda yer alır.",
    criteria: {
      kicker: "Prioritetləşdirmə",
      title:
        "Anchor şirkətlərə Azərbaycan üçün strateji dəyərin etibarlı lokallaşdırma yolu ilə kəsişdiyi hallarda üstünlük verilməlidir",
      duplicateNote: "Təqdimatın 7 və 10-cu slaydlarında göstərilib (eyni məzmun).",
      columns: [
        {
          title: "Azərbaycan üçün strateji cəlbedicilik",
          tone: "blue",
          items: [
            { icon: "cog", title: "İstiqamətə uyğunluq", body: "Dayanıqlılıq texnologiyası istiqamətlərinə uyğunluq (kiber, kommunikasiya, monitorinq, PUA, kosmos, data/Sİ)" },
            { icon: "chart", title: "Sektor aktuallığı", body: "Prioritet tətbiq sektorları üçün aktuallıq (məs. nəqliyyat və logistika, rəqəmsal və rabitə)" },
            { icon: "network", title: "Anchor / ekosistem effekti", body: "Təchizatçıları, istedadları, innovasiyanı və əlavə investisiyanı cəlb etmək potensialı" },
            { icon: "globe", title: "Regional ixrac potensialı", body: "Azərbaycandan kənar bazarlara (Mərkəzi Asiya, Yaxın Şərq, Afrika) xidmət göstərmək imkanı" },
            { icon: "cloud", title: "Miqyas və etibarlılıq", body: "Sübut olunmuş texnologiyaya, maliyyə gücünə və uzunmüddətli öhdəliyə malik qlobal şirkət" },
          ],
        },
        {
          title: "Lokallaşdırmanın mümkünlüyü",
          tone: "green",
          items: [
            { icon: "pin", title: "Lokallaşdırmanın dərinliyi", body: "Əhəmiyyətli fəaliyyətlərin (mühəndislik, inteqrasiya, tətbiq, yığım, R&D) lokallaşdırılması imkanı" },
            { icon: "hub", title: "Yeni regional hab əsaslandırması", body: "Azərbaycanda yeni regional hab yaratmağın strateji məntiqi (məs. Rusiyadan sonrakı dövr, yeni bazarların əhatəsi)" },
            { icon: "handshake", title: "Davam edən danışıqlar", body: "Yerli şirkətlərlə artıq qurulmuş münasibətlər/fəaliyyət" },
            { icon: "shield", title: "Geosiyasi mümkünlük", body: "Qəbuledilən geosiyasi və tənzimləyici şərtlər (ixrac nəzarəti, icazələr, uyğunlaşma)" },
          ],
        },
      ],
    },
    candidates: {
      kicker: "Strateji uyğunluq",
      title:
        "Hər əsas istiqamət üzrə Azərbaycan texnoloji dayanıqlılıq klasterində anchor rolunu oynamaq potensialına malik ilkin namizəd şirkətlər¹ siyahısı müəyyən edilib",
      domains: [
        { title: "Kibertəhlükəsizlik və rəqəmsal etimad", companies: candidatesByDomain[0] },
        { title: "Təhlükəsiz kommunikasiyalar", companies: candidatesByDomain[1] },
        { title: "Situasiya məlumatlılığı və monitorinq", companies: candidatesByDomain[2] },
        { title: "Kosmik texnologiyalara əsaslanan həllər", companies: candidatesByDomain[3] },
      ],
      footnotes: [
        "1. İlkin siyahıya qlobal miqyas, kateqoriya liderliyi və sübut olunmuş kritik missiya tətbiqləri əsasında şirkətlər daxil edilib",
        "2. Estoniya şirkətləri strateji tərəfdaşlıq mülahizələri əsasında ayrıca daxil edilib",
      ],
    },
    pools: {
      kicker: "Strateji uyğunluq",
      title:
        "Potensial anchor şirkətlər, qlobal şirkətlər və Azərbaycanla artıq əməkdaşlıq edən şirkətlər daxil olmaqla, beş prioritet qrupdan seçilə bilər",
      pools: [
        { title: "Qlobal sənaye-texnologiya liderləri", tone: "navy", companies: pools[0] },
        { title: "İsrailin müdafiə-texnologiya şirkətləri", tone: "green", companies: pools[1] },
        { title: "Potensial Çin şirkətləri", tone: "blue", companies: pools[2] },
        { title: "Azərbaycanda danışıqlarda/tenderlərdə iştirak edən şirkətlər", tone: "ink", companies: pools[3] },
        { title: "Kiber şirkətlər", tone: "gray", companies: pools[4] },
      ],
      chainTitle:
        "Potensial anchor şirkətlər prioritet qruplardan cəlb edilir və dəyər zəncirinin seçilmiş hissələri üzrə lokallaşdırılır",
      chain: [
        { icon: "blueprint", label: "Yerli mühəndislik və inteqrasiya" },
        { icon: "monitor", label: "Xidmətlər / SOC / monitorinq" },
        { icon: "wrench", label: "Tətbiq və texniki xidmət" },
        { icon: "certificate", label: "Təlim və sertifikatlaşdırma" },
        { icon: "tools", label: "Seçilmiş yığım / sınaq" },
        { icon: "ship", label: "Regional ixrac habı" },
      ],
      footnote: "* Schneider Electric İstanbuldan idarə olunan Türkiyə və Mərkəzi Asiya klasterini idarə edir",
    },
    pathway1: {
      kicker: "Lokallaşdırma yolu 1",
      title:
        "Regional fəaliyyət boşluğu olan şirkətlər Azərbaycanın özünü yeni əməliyyat habı kimi mövqeləndirməsi üçün imkan yaradır",
      subtitle: "Bu şirkətlərin hazırda Azərbaycanın qarşılaya biləcəyi ödənilməmiş regional əməliyyat ehtiyacı ola bilər",
      headers: {
        company: "Şirkət",
        domain: "İstiqamət",
        exit: "Rusiyadan çıxış",
        footprint: "Regional mövcudluq",
        fit: "Dayanıqlılıq klasterinə uyğunluq",
        value: "Azərbaycana gəlməyin dəyər təklifi",
        current: "Azərbaycanda mövcud fəaliyyət",
      },
      rows: [
        {
          company: C.honeywell,
          domain: "Kibertəhlükəsizlik və rəqəmsal etimad",
          exit: "İyun 2022",
          footprint: "Hökumət tərəfindən Qazaxıstanda regional hab təklif olunub, yenilik yoxdur",
          fit: [
            "OT aktivlərinin aşkarlanması və inventarizasiyası",
            "Sənaye şəbəkəsi / müdaxilə monitorinqi",
            "24/7 OT SOC və insidentlərə cavab",
            "Zəifliklərin idarə edilməsi, seqmentasiya və uyğunluq",
          ],
          value: ["Mövcud SOCAR referans bazası", "OT SOC / təhlükəsizlik xidmətlərinin lokallaşdırılması potensialı"],
          current: "Yerli ofis + mühəndislik/xidmət",
          currentTone: "green",
        },
        {
          company: C.emerson,
          domain: "Situasiya məlumatlılığı və monitorinq",
          exit: "Mart 2023",
          footprint: "Regionda aydın hab yoxdur",
          fit: [
            "Proses idarəetməsi və SCADA – DeltaV / Ovation",
            "Maşın və aktivlərin vəziyyətinin monitorinqi",
            "Proqnozlaşdırıcı vəziyyət monitorinqi / erkən xəbərdarlıq analitikası",
            "Enerji, su və sənaye aktivlərinin məsafədən monitorinqi",
          ],
          value: ["Azərbaycanda aktiv layihə bazası (məs. Şahdəniz layihəsi)", "Mühəndislik miqyasının genişlənməsinə dayaq"],
          current: "Yerli ofis + layihə icrası",
          currentTone: "green",
        },
        {
          company: C.abb,
          domain: "Situasiya məlumatlılığı və monitorinq",
          exit: "İyul 2022",
          footprint: "Mərkəzi Asiyanı əhatə edən İstanbul qərargahı",
          fit: [
            "Aktiv performansının idarə edilməsi – ABB Ability Genix APM",
            "Avadanlığın vəziyyətinin real vaxt monitorinqi",
            "Proqnozlaşdırıcı texniki xidmət və nasazlıqların aşkarlanması",
            "Park / infrastrukturun vəziyyəti üzrə panellər və xəbərdarlıqlar",
          ],
          value: ["Ofis və quraşdırılmış baza", "Avtomatlaşdırma habı üçün baza", "Aktiv elektrikləşdirmə anchor-u"],
          current: "Yerli ofis + həyat dövrü xidmətləri",
          currentTone: "green",
        },
        {
          company: C.siemens,
          domain: "Data, bulud və Sİ",
          exit: "2022",
          footprint: "Rusiyadan sonra hab yoxdur, Qazaxıstanda güclü mövcud baza",
          fit: [
            "OT aktivlərinin aşkarlanması və müdaxilənin aşkarlanması",
            "Sənaye avtomatlaşdırması / idarəetmə sistemlərinin monitorinqi",
            "Dəmir yolu və infrastrukturun vəziyyətinin monitorinqi",
            "Proqnozlaşdırıcı texniki xidmət və əməliyyat analitikası",
          ],
          value: [
            "Sübut olunmuş kritik infrastruktur (CII) referans bazası",
            "Daha dərin mühəndisliyə yol",
            "Sektorlararası dayanıqlılıq layihələri (enerji, metro, ağıllı infrastruktur)",
          ],
          current: "Nümayəndə / tərəfdaş kanalı vasitəsilə",
          currentTone: "blue",
        },
        {
          company: C.nokia,
          domain: "Təhlükəsiz kommunikasiya",
          exit: "2023",
          footprint: "Regionda aydın hab yoxdur",
          fit: [
            "Kritik missiya üçün özəl 4G/5G şəbəkələri",
            "Təhlükəsiz səs, video və məlumat kommunikasiyaları / MCX",
            "Kommunal xidmətlər, dəmir yolu və ictimai təhlükəsizlik üçün dayanıqlı rabitə",
            "Komanda mərkəzi, sahə cihazları və sənaye OT rabitəsi",
          ],
          value: ["Mövcud anchor müştəri və tətbiq", "Kritik korporativ rabitəyə genişlənmə"],
          current: "Yerli ofis + şəbəkə quraşdırılması",
          currentTone: "green",
        },
      ],
    },
    pathway2: {
      kicker: "Lokallaşdırma yolu 2",
      title:
        "Azərbaycanda artıq fəaliyyət göstərən şirkətlər üçün mövcud layihələr daha dərin lokallaşdırmaya daha az maneəli yol yarada bilər",
      subtitle: "Bu şirkətlərin artıq əlaqələri və referans bazası var ki, bu da bazara daxilolma riskini azaldır",
      headers: {
        company: "Şirkət",
        domain: "İstiqamət",
        projects: "İştirak etdiyi layihələr / tenderlər",
        fit: "Dayanıqlılıq klasterinə uyğunluq",
      },
      rows: [
        {
          company: [C.radware],
          domain: "Kibertəhlükəsizlik və rəqəmsal etimad",
          projects: [
            "Radware AzInTelecom data mərkəzində tətbiq olunub",
            "Mövcud təhlükəsizlik lisenziyalarının uzadılması üzrə bir neçə ARDNF (SOFAZ) tenderi",
          ],
          fit: ["DDoS və tətbiqlərin qorunması", "GovCloud / dövlət rəqəmsal xidmətlərinin dayanıqlılığı"],
        },
        {
          company: [C.crowdstrike],
          domain: "Kibertəhlükəsizlik və rəqəmsal etimad",
          projects: [
            "Milli Kibertəhlükəsizlik Forumunda, dövlət rəsmiləri ilə dəyirmi masalarda və digər tədbirlərdə iştirak",
          ],
          fit: ["Suveren Yer müşahidəsi və monitorinq imkanı", "Yerli peyk mühəndisliyi, yığımı və bacarıqların ötürülməsi"],
          flag: "Uyğunluq mətni IAI sətrini təkrarlayır (Yerin müşahidəsi / peyklər) — ehtimal ki, təqdimatda kopyalama xətasıdır.",
        },
        {
          company: [C.google, C.mandiant],
          domain: "Data, bulud və Sİ",
          projects: [
            "2025-ci ildə RİNN–Google arasında bulud, innovasiya laboratoriyaları və bacarıqlar üzrə müzakirələr",
            "Mandiant-a aid Azərbaycan layihəsi ictimai şəkildə müəyyən edilməyib",
          ],
          fit: ["Kiber insidentlərə cavab və təhdid kəşfiyyatı", "Kritik infrastrukturun kiber hazırlığı"],
        },
        {
          company: [C.microsoft],
          domain: "Data, bulud və Sİ",
          projects: [
            "AzInTelecom vasitəsilə dövlət proqram təminatı lisenziyalaşdırılması",
            "PKI / elektron imza infrastrukturuna dəstək və IoT laboratoriyası üzrə əməkdaşlıq",
          ],
          fit: ["Rəqəmsal identiklik və etibarlı e-hökumət", "Dövlət / kritik infrastrukturun kiber müdafiəsi"],
        },
        {
          company: [C.iai],
          domain: "Kosmik texnologiyalara əsaslanan həllər",
          projects: ["Azercosmos ilə Azersky-2 proqramı", "Texnologiya transferi; ikinci peykin yerli istehsalı planlaşdırılır"],
          fit: ["Suveren Yer müşahidəsi və monitorinq imkanı", "Yerli peyk mühəndisliyi, yığımı və bacarıqların ötürülməsi"],
        },
        {
          company: [C.spacex],
          domain: "Kosmik texnologiyalara əsaslanan həllər",
          projects: [
            "2023-cü ildə Starlink xidmətinin satışı üzrə Azercosmos–SpaceX sazişi",
            "Starlink dövlət, nəqliyyat, dəniz və uzaq ərazilərdə istifadə üçün sınaqdan keçirilib",
          ],
          fit: ["Dayanıqlı peyk rabitəsi", "Kritik infrastruktur üçün ehtiyat rabitə"],
        },
        {
          company: [C.thales],
          domain: "Situasiya məlumatlılığı və monitorinq",
          projects: [
            "Bakı Metropoliteni: Bənövşəyi xəttin idarəetmə mərkəzi, siqnalizasiya və telekommunikasiya sistemləri",
            "SCADA, CBTC və TETRA tətbiqi; heyətin təlimi",
          ],
          fit: [
            "İnfrastrukturun real vaxt monitorinqi və idarə edilməsi",
            "Kritik missiya kommunikasiyaları",
            "Nəqliyyatın əməliyyat dayanıqlılığı",
          ],
        },
      ],
    },
  },
  review: {
    kicker: "06 · Yoxlama qeydləri",
    title: "İki mənbə birləşdirilərkən aşkar edilən açıq məsələlər",
    lead:
      "Məzmun növbəti mərhələyə keçməzdən əvvəl BCG ilə dəqiqləşdirilməli olan uyğunsuzluqlar və boşluqlar. Aşkar orfoqrafik səhvlər səhifədə düzəldilib; mahiyyət etibarilə olan hər şey mənbədə olduğu kimi göstərilib və burada qeyd olunub.",
    severity: { high: "Dəqiqləşdir", medium: "Yoxla", low: "Düzəlt" },
    items: [
      {
        severity: "high",
        title: "İstiqamətlərin sayı: dörd və ya altı",
        body:
          "Word qaralaması dörd əsas istiqaməti əhatə edir. Təqdimatın 3-cü slaydında “altı prioritet istiqamət” yazılıb və mülki PUA sistemləri (“ayrıca əhatə olunur”) və data və Sİ (“kəsişən imkan”) əlavə olunub. 7, 11 və 12-ci slaydlarda da PUA və “Data, bulud və Sİ” kateqoriya kimi istifadə olunur. Səhifədə altısı da statusu ilə göstərilib — rəsmi çərçivəni təsdiqləyin.",
      },
      {
        severity: "high",
        title: "0% mənfəət vergisi: ixrac şərti Word-də yoxdur",
        body:
          "Təqdimatın 5-ci slaydında sıfır dərəcəli mənfəət vergisinə bank daxilolma şərti (“gəlir Azərbaycandakı hesablara daxil olmalıdır”) əlavə olunub. Word qaralamasında bu şərt qeyd edilmir.",
      },
      {
        severity: "high",
        title: "CrowdStrike üçün “klasterə uyğunluq” IAI-dən kopyalanmış görünür",
        body:
          "12-ci slaydda CrowdStrike sətrində “Suveren Yer müşahidəsi və monitorinq imkanı; Yerli peyk mühəndisliyi, yığımı və bacarıqların ötürülməsi” göstərilib — bu, IAI sətri ilə eynidir və kibertəhlükəsizliklə əlaqəli deyil.",
      },
      {
        severity: "medium",
        title: "$1 mlrd İKT ixracı hədəfi yalnız təqdimatdadır",
        body:
          "2-ci slaydda milli hədəf kimi “$1B ICT export” göstərilib, lakin hədəf ili və ya baza göstəricisi yoxdur. Word qaralamasında bu rəqəm istifadə olunmur.",
      },
      {
        severity: "medium",
        title: "İnvestisiya güzəşti “100% (<50%)” qeyri-müəyyəndir",
        body:
          "“(<50%)” ifadəsinin mənası izah olunmayıb (gəlirin/mənfəətin payı üzrə limit?). Word qaralamasında yalnız “uyğun investisiyaların tam məbləğdə çıxılması” deyilir.",
      },
      {
        severity: "medium",
        title: "Mandiant: “Azərbaycanda iştirak edir” və “layihə müəyyən edilməyib”",
        body:
          "9-cu slaydda Google/Mandiant Azərbaycanda danışıqlarda/tenderlərdə iştirak edən şirkətlər qrupuna daxil edilib, 12-ci slaydda isə Mandiant-a aid Azərbaycan layihəsinin ictimai şəkildə müəyyən edilmədiyi qeyd olunur.",
      },
      {
        severity: "medium",
        title: "Slaydlar arasında istiqamət təsnifatı fərqlənir",
        body:
          "11–12-ci slaydlarda şirkətlər “Data, bulud və Sİ” altında qruplaşdırılıb (məs. Siemens, Microsoft), 3-cü slaydda isə data və Sİ ayrıca istiqamət deyil, kəsişən imkan kimi təqdim olunur.",
      },
      {
        severity: "low",
        title: "Təkrarlanan slayd",
        body: "7 və 10-cu slaydlar (prioritetləşdirmə meyarları) eynidir. Bu səhifədə bir dəfə göstərilib.",
      },
      {
        severity: "low",
        title: "Təqdimatda orfoqrafik səhvlər və artıq mətn",
        body:
          "5-ci slayd: “Estonian's governance architecture” → “Estonia's”. 6-cı slayd: hədəfli media təbliğatı altında artıq “Remote” sözü; “meting” → “meeting”; cümlənin ortasında böyük hərflə “Developed”; dövlət səfərləri bəndində bağlanmamış mötərizə.",
      },
      {
        severity: "low",
        title: "Word qaralamasında formatlama səhvləri",
        body:
          "Bir neçə əsas mətn abzası başlıq kimi formatlanıb (“What the cluster is” mətni, “Enable the ecosystem” mətni və Heading 1 kimi formatlanmış “economic reform agenda” mətni). “For outlined reasons” ifadəsi qeyri-təbii səslənir. Hər hansı CMS-ə ötürməzdən əvvəl düzəldilməlidir.",
      },
      {
        severity: "low",
        title: "Azərbaycan dilində versiya qaralama tərcümədir",
        body:
          "Bu səhifənin AZ versiyası daxili qaralama tərcümədir və hər hansı xarici istifadədən əvvəl məzmun sahibi tərəfindən yoxlanılmalıdır.",
      },
    ],
  },
  footer: {
    prepared: "BCG materialları əsasında hazırlanmış komanda daxili brifinq (sentyabr 2026).",
    sources:
      "Mənbələr: “Resilience Cluster — website content draft” (Word) və “Technology resilience cluster v4” (BCG təqdimatı).",
    confidentiality: "Daxili — ilkin şirkət hədəfləməsini ehtiva edir. Yaymayın.",
  },
};
