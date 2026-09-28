import type { RefItem } from "./types";

export type Loc = Record<string, string>;
export type Copy = { title: string; dek: string; body: string };

const b = (...parts: string[]) => parts.join("\n\n");

export const categories: { slug: string; sort: number; name: Loc }[] = [
  { slug: "kurdistan", sort: 1, name: { ckb: "کوردستان", kmr: "Kurdistan", en: "Kurdistan", ar: "كردستان", fa: "کردستان", tr: "Kürdistan", de: "Kurdistan", fr: "Kurdistan", es: "Kurdistán" } },
  { slug: "politics", sort: 2, name: { ckb: "سیاسەت", kmr: "Siyaset", en: "Politics", ar: "سياسة", fa: "سیاست", tr: "Siyaset", de: "Politik", fr: "Politique", es: "Política" } },
  { slug: "culture", sort: 3, name: { ckb: "کەلتور", kmr: "Çand", en: "Culture", ar: "ثقافة", fa: "فرهنگ", tr: "Kültür", de: "Kultur", fr: "Culture", es: "Cultura" } },
  { slug: "science", sort: 4, name: { ckb: "زانست", kmr: "Zanist", en: "Science", ar: "علوم", fa: "دانش", tr: "Bilim", de: "Wissenschaft", fr: "Sciences", es: "Ciencia" } },
  { slug: "society", sort: 5, name: { ckb: "کۆمەڵگا", kmr: "Civak", en: "Society", ar: "مجتمع", fa: "جامعه", tr: "Toplum", de: "Gesellschaft", fr: "Société", es: "Sociedad" } },
  { slug: "opinion", sort: 6, name: { ckb: "بۆچوون", kmr: "Raman", en: "Opinion", ar: "رأي", fa: "دیدگاه", tr: "Görüş", de: "Meinung", fr: "Opinion", es: "Opinión" } },
];

export const tags: { slug: string; name: Loc }[] = [
  { slug: "hewlêr", name: { ckb: "هەولێر", kmr: "Hewlêr", en: "Hewlêr", ar: "أربيل", fa: "اربیل", tr: "Hewlêr" } },
  { slug: "language", name: { ckb: "زمان", kmr: "Ziman", en: "Language", ar: "لغة", fa: "زبان", tr: "Dil" } },
  { slug: "city", name: { ckb: "شار", kmr: "Bajar", en: "City", ar: "مدينة", fa: "شهر", tr: "Kent" } },
  { slug: "music", name: { ckb: "مۆسیقا", kmr: "Muzîk", en: "Music", ar: "موسيقى", fa: "موسیقی", tr: "Müzik" } },
  { slug: "water", name: { ckb: "ئاو", kmr: "Av", en: "Water", ar: "ماء", fa: "آب", tr: "Su" } },
  { slug: "archive", name: { ckb: "ئەرشیف", kmr: "Arşîv", en: "Archive", ar: "أرشيف", fa: "بایگانی", tr: "Arşiv" } },
  { slug: "schools", name: { ckb: "قوتابخانە", kmr: "Dibistan", en: "Schools", ar: "مدارس", fa: "مدرسه", tr: "Okul" } },
  { slug: "food", name: { ckb: "خۆراک", kmr: "Xwarin", en: "Food", ar: "طعام", fa: "خوراک", tr: "Yemek" } },
];

type Author = {
  id: string;
  slug: string;
  name: Loc;
  title: Loc;
  location: Loc;
  languages: string;
  email: string;
  bio: Loc;
  education: Record<string, { years: string; place: string; detail: string }[]>;
  experience: Record<string, { years: string; place: string; detail: string }[]>;
};

const cv = (
  ckb: [string, string, string],
  kmr: [string, string, string],
  en: [string, string, string],
) => ({
  ckb: [{ years: ckb[0], place: ckb[1], detail: ckb[2] }],
  kmr: [{ years: kmr[0], place: kmr[1], detail: kmr[2] }],
  en: [{ years: en[0], place: en[1], detail: en[2] }],
});

export const authors: Author[] = [
  {
    id: "staff:ava",
    slug: "ava-hama",
    name: { ckb: "ئاڤا حەمە", kmr: "Ava Heme", en: "Ava Hama", he: "אווה חמה", ar: "آفا حمة", fa: "آفا حمه", tr: "Ava Hama" },
    title: { ckb: "سەرنووسەری کەلتور", kmr: "Edîtora çandê", en: "Culture editor", ar: "محررة الثقافة", fa: "دبیر فرهنگ", tr: "Kültür editörü" },
    location: { ckb: "هەولێر", kmr: "Hewlêr", en: "Hewlêr", ar: "أربيل", fa: "اربیل", tr: "Hewlêr" },
    languages: "کوردی سۆرانی · Kurmancî · English",
    email: "ava@kncsite.com",
    bio: {
      ckb: "ئافا حەمە لە گەڕەکی قەڵا گەورە بووە و ئێستا بەشی کەلتوری KNC Publish دەنووسێت. حەزی لەو شوێنانەیە کە شارەکە بە دەنگ و نان و بەرد خۆی دەگێڕێتەوە، نەک تەنها بە ڕاگەیاندن.",
      kmr: "Ava Heme li taxeke kelê mezin bûye û niha beşa çandê ya KNC Publish dinivîse. Ew li cihên wisa digere ku bajar bi deng, nan û kevir xwe vedibêje.",
      en: "Ava Hama grew up in the citadel quarter and now edits culture for KNC Publish. She looks for the places where a city explains itself in sound, bread and brick rather than in a press release.",
    },
    education: cv(
      ["٢٠١١–٢٠١٥", "زانکۆی سلێمانی", "ئەدەبی کوردی"],
      ["2011–2015", "Zanîngeha Silêmaniyê", "Edebiyata kurdî"],
      ["2011–2015", "University of Sulaymaniyah", "Kurdish literature"],
    ),
    experience: cv(
      ["٢٠١٩–ئێستا", "KNC Publish", "سەرنووسەری کەلتور"],
      ["2019–niha", "KNC Publish", "Edîtora çandê"],
      ["2019–present", "KNC Publish", "Culture editor"],
    ),
  },
  {
    id: "staff:diyar",
    slug: "diyar-osman",
    name: { ckb: "دیار عوسمان", kmr: "Diyar Osman", en: "Diyar Osman", he: "דיאר עוסמאן", ar: "ديار عثمان", fa: "دیار عثمان", tr: "Diyar Osman" },
    title: { ckb: "پەیامنێری زانست", kmr: "Nûçegihanê zanistê", en: "Science correspondent", ar: "مراسل العلوم", fa: "خبرنگار علم", tr: "Bilim muhabiri" },
    location: { ckb: "سلێمانی", kmr: "Silêmanî", en: "Sulaymaniyah", ar: "السليمانية", fa: "سلیمانیه", tr: "Süleymaniye" },
    languages: "کوردی سۆرانی · English · Türkçe",
    email: "diyar@kncsite.com",
    bio: {
      ckb: "دیار عوسمان زانست وەک هەواڵ دەنووسێت: پرسیارێکی ڕوون، ڕێبازێکی دیار، و سەرچاوەیەک کە خوێنەر دەتوانێت بگەڕێتەوە سەری.",
      kmr: "Diyar Osman zanistê wek nûçe dinivîse: pirseke zelal, rêbazeke diyarkirî, û çavkaniyeke ku xwîner dikare lê vegere.",
      en: "Diyar Osman writes science as news: one clear question, a visible method, and a source a reader can actually look up.",
    },
    education: cv(
      ["٢٠١٢–٢٠١٦", "زانکۆی سەلاحەddین", "زانستی ژینگە"],
      ["2012–2016", "Zanîngeha Selaheddîn", "Zanista jîngehê"],
      ["2012–2016", "Salahaddin University", "Environmental science"],
    ),
    experience: cv(
      ["٢٠٢٠–ئێستا", "KNC Publish", "پەیامنێری زانست"],
      ["2020–niha", "KNC Publish", "Nûçegihanê zanistê"],
      ["2020–present", "KNC Publish", "Science correspondent"],
    ),
  },
  {
    id: "staff:rojin",
    slug: "rojin-baran",
    name: { ckb: "ڕۆژین بارانی", kmr: "Rojîn Baranî", en: "Rojin Barani", he: "רוז׳ין באראן", ar: "روجين باران", fa: "روژین باران", tr: "Rojin Baran" },
    title: { ckb: "پەیامنێری شار و سیاسەت", kmr: "Nûçegihana bajar û siyasetê", en: "City and politics reporter", ar: "مراسلة المدينة والسياسة", fa: "خبرنگار شهر و سیاست", tr: "Kent ve siyaset muhabiri" },
    location: { ckb: "دهۆک", kmr: "Dihok", en: "Duhok", ar: "دهوك", fa: "دهوک", tr: "Duhok" },
    languages: "Kurmancî · سۆرانی · English",
    email: "rojin@kncsite.com",
    bio: {
      ckb: "ڕۆژین باران لەسەر ئەنجومەن، قوتابخانە و خزمەتگوزاری دەنووسێت. پرسیارەکەی هەمیشە یەکە: ئەم بڕیارە بۆ کێ ئاسانە و بۆ کێ قورسە؟",
      kmr: "Rojîn Baran li ser encûmen, dibistan û xizmetan dinivîse. Pirsa wê her tim yek e: ev biryar ji bo kê hêsan e û ji bo kê dijwar e?",
      en: "Rojin Baran covers councils, schools and public services. Her standing question is who a decision makes life easier for, and who it makes harder for.",
    },
    education: cv(
      ["٢٠١٣–٢٠١٧", "زانکۆی دهۆک", "یاسا"],
      ["2013–2017", "Zanîngeha Dihokê", "Hiqûq"],
      ["2013–2017", "University of Duhok", "Law"],
    ),
    experience: cv(
      ["٢٠١٨–ئێستا", "KNC Publish", "پەیامنێری سیاسەت"],
      ["2018–niha", "KNC Publish", "Nûçegihana siyasetê"],
      ["2018–present", "KNC Publish", "Politics reporter"],
    ),
  },
  {
    id: "staff:sherko",
    slug: "sherko-miran",
    name: { ckb: "شێرکۆ میران", kmr: "Şêrko Mîran", en: "Sherko Miran", he: "שרקו מיראן", ar: "شيركو ميران", fa: "شیرکو میران", tr: "Şerko Miran" },
    title: { ckb: "ستوونی بۆچوون", kmr: "Stûna ramanê", en: "Opinion columnist", ar: "كاتب رأي", fa: "ستون‌نویس", tr: "Köşe yazarı" },
    location: { ckb: "هەولێر", kmr: "Hewlêr", en: "Hewlêr", ar: "أربيل", fa: "اربیل", tr: "Hewlêr" },
    languages: "کوردی سۆرانی · Kurmancî · Français",
    email: "sherko@kncsite.com",
    bio: {
      ckb: "شێرکۆ میران پۆست و بۆچوون دەنووسێت. پێی وایە هەواڵنگەیەک کە تەنها یەک ئەلفوبێی هەبێت، نیوەی خوێنەرەکانی لە دەرەوە دەهێڵێتەوە.",
      kmr: "Şêrko Mîran nivîs û ramanan dinivîse. Ew difikire ku jûrnaleke bi tenê yek alfabeyê nîvê xwînerên xwe li derve dihêle.",
      en: "Sherko Miran writes posts and columns. He thinks a newsroom with only one alphabet leaves half its readers standing outside.",
    },
    education: cv(
      ["٢٠٠٨–٢٠١٢", "زانکۆی سەلاحەddین", "ئەدەب و ڕۆژنامەوانی"],
      ["2008–2012", "Zanîngeha Selaheddîn", "Edebiyat û rojnamevanî"],
      ["2008–2012", "Salahaddin University", "Literature and journalism"],
    ),
    experience: cv(
      ["٢٠١٦–ئێستا", "KNC Publish", "ستووننووس"],
      ["2016–niha", "KNC Publish", "Nivîskarê stûnê"],
      ["2016–present", "KNC Publish", "Columnist"],
    ),
  },
];

const corpusRefs: RefItem[] = [
  { authors: "Haig, G. & Öpengin, E.", year: "2014", title: "Kurdish: A critical research overview", source: "Kurdish Studies 2(2)" },
  { authors: "Hassanpour, A.", year: "1992", title: "Nationalism and Language in Kurdistan, 1918–1985", source: "Mellen Research University Press" },
  { authors: "Esmaili, K. S.", year: "2012", title: "Challenges in Kurdish text processing", source: "Kurdish NLP workshop" },
  { authors: "Ahmadi, S.", year: "2020", title: "KLPT: Kurdish language processing toolkit", source: "LREC" },
];

const waterRefs: RefItem[] = [
  { authors: "IPCC", year: "2022", title: "Climate Change 2022: Impacts, Adaptation and Vulnerability", source: "Working Group II, Sixth Assessment Report" },
  { authors: "FAO", year: "2021", title: "Mountains and water: highland agriculture under stress", source: "Food and Agriculture Organization" },
  { authors: "UNEP", year: "2023", title: "Mountain outlook: rivers that start above the plain", source: "United Nations Environment Programme" },
];

export type SeedStory = {
  group: string;
  kind: "article" | "post";
  type: "standard" | "premium" | "scientific";
  status: "published" | "review";
  category: string;
  author: string;
  image: string;
  caption: Loc;
  zones: string[];
  tags: string[];
  views: number;
  daysAgo: number;
  refs: RefItem[];
  copy: Record<string, Copy>;
};

export const stories: SeedStory[] = [
  {
    group: "citadel-memory",
    kind: "article",
    type: "premium",
    status: "published",
    category: "culture",
    author: "staff:ava",
    image: "/media/citadel.jpg",
    caption: {
      ckb: "قەڵای هەولێر لە ڕووناکی کۆتاییی دواڕۆژدا.",
      kmr: "Kela Hewlêrê di ronahiya êvarê de.",
      en: "The Erbil citadel in the last light of the afternoon.",
      ar: "قلعة أربيل في ضوء آخر النهار.",
      fa: "قلعه اربیل در نور آخر روز.",
      tr: "Erbil Kalesi, günün son ışığında.",
    },
    zones: ["hero", "section:culture"],
    tags: ["hewlêr", "city"],
    views: 1840,
    daysAgo: 0,
    refs: [],
    copy: {
      ckb: {
        title: "قەڵای هەولێر: شارێک کە لە بەرددا دەژی",
        dek: "قەڵاکە تەنها شوێنەوار نییە. نەخشەی شارەکەیە، لە بازاڕی خوارەوە تا کۆڵانە بەردینەکانی سەرەوە.",
        body: b(
          "زیاتر لە حەوت هەزار ساڵە خەڵک دەگەڕێنەوە بۆ هەمان گردی هێلکەیی لە دەشتی هەولێر. قەڵاکە بە شووشە خۆی ناناسێنێت. وەک بیرەوەری بەرز دەبێتەوە: هێواش، و پاشان یەکسەر، دیواری خشتێکی هەنگوینی لە ڕووناکی کۆتاییی دواڕۆژدا.",
          "ئەگەر بەو ڕێگایەدا بڕۆیت کە بە دەوری گردەکەدا دەسووڕێتەوە، شارەکە چین چین خۆی ڕیز دەکات. لە خوارەوە، بازاڕی قەیسەری هێشتا لەسەر نرخ و قوماش دەدوێت. لە سەرەوە، خانوو نۆژەنکراوەکان وەرشە و مۆزەخانەیەکی بچووک و ئەو خێزانانە لەخۆدەگرن کە نایانەوێت ناوێکی یونسکۆ گەڕەکێک بکاتە پۆستکار.",
          "ئەوەی هەواڵنگەکە لە گەڕەکی قەڵا فێری دەبێت ئەوەیە کە پاراستن گفتوگۆیەکی شارستانییە. هەر دەرگایەکی نۆژەنکراو بڕیارێکە لەسەر ئەوەی شارەکە بۆ کێیە: میوانێک کە کاتژمێرێک دەمێنێتەوە، یان دانیشتوویەک کە تەمەنی لێ دەژی.",
        ),
      },
      kmr: {
        title: "Kela Hewlêrê: bajarek ku di kevir de dijî",
        dek: "Kele ne tenê şûnwarek e. Nexşeya bajar e, ji bazara jêr heta kolanên kevirîn ên jor.",
        body: b(
          "Zêdetirî heft hezar sal e mirov vedigerin heman girê hêkî yê deşta Hewlêrê. Kele xwe bi camê nade naskirin. Ew wek bîranînê bilind dibe: hêdî, paşê carekê, dîwarek ji kerpîçê hingivîn di ronahiya dawî ya êvarê de.",
          "Heke tu li wê rêyê bimeşî ku li dora gir dizivire, bajar xwe tebeqe bi tebeqe rêz dike. Li jêr, bazara Qeyseriyê hîn li ser biha û qumaşê diaxive. Li jor, xaniyên nûjenkirî atolyeyan, muzexaneyeke biçûk û wan malbatan digirin ku naxwazin navekî UNESCO taxekê bike kartpostalek.",
          "Tiştê ku jûrnal li taxa kelê fêr dibe ev e ku parastin nîqaşeke bajarî ye. Her deriyê nûjenkirî biryarek e li ser wê yekê ku bajar ji bo kê ye: mêvanek ku saetekê dimîne, an niştecîhek ku emrê xwe lê dijî.",
        ),
      },
      en: {
        title: "The citadel of Erbil, a city that lives in stone",
        dek: "The mound is not only a monument. It is a map of the city, from the bazaar below to the brick lanes above.",
        body: b(
          "For more than seven thousand years people have returned to the same oval of earth on the plain of Hewlêr. The citadel does not announce itself in glass. It rises the way memory does: slowly, and then all at once, a wall of honey-coloured brick in the last light of the afternoon.",
          "Walk the road that circles the mound and the city arranges itself in layers. Below, the Qaysari market still argues about price and cloth. Above, restored houses hold workshops, a small museum, and families who refuse the idea that a UNESCO inscription should turn a neighbourhood into a postcard.",
          "What this newsroom keeps learning in the citadel quarter is that preservation is a civic argument. Every restored doorway is a decision about who the city is for: a visitor who stays an hour, or a resident who stays a life.",
        ),
      },
      ar: {
        title: "قلعة أربيل: مدينة تعيش في الحجر",
        dek: "التل ليس أثرًا فحسب. إنه خريطة المدينة، من السوق في الأسفل إلى الأزقة الحجرية في الأعلى.",
        body: b(
          "منذ أكثر من سبعة آلاف سنة يعود الناس إلى البيضة الترابية نفسها في سهل أربيل. القلعة لا تعرّف عن نفسها بالزجاج. ترتفع كما ترتفع الذاكرة: ببطء، ثم دفعة واحدة، جدار من الآجر العسلي في ضوء آخر النهار.",
          "إذا مشيت في الطريق الذي يدور حول التل، ترتّب المدينة نفسها طبقات. في الأسفل ما زال سوق القيصرية يجادل في السعر والقماش. في الأعلى، بيوت مرممة وورش ومتحف صغير وعائلات ترفض أن يحوّل نقش اليونسكو حارة إلى بطاقة بريدية.",
          "ما تتعلمه غرفة الأخبار من حارة القلعة هو أن الحفظ نقاش مدني. كل باب رُمّم قرار حول لمن تكون المدينة: لزائر يبقى ساعة، أم لمقيم يبقى عمرًا.",
        ),
      },
      fa: {
        title: "قلعه اربیل: شهری که در سنگ زندگی می‌کند",
        dek: "تپه فقط یک بنای یادبود نیست. نقشه شهر است، از بازار پایین تا کوچه‌های آجری بالا.",
        body: b(
          "بیش از هفت هزار سال است که مردم به همان تپه بیضی در دشت اربیل برمی‌گردند. قلعه خودش را با شیشه معرفی نمی‌کند. مثل حافظه بالا می‌آید: آهسته، و بعد یکباره، دیواری از آجر عسلی در نور آخر روز.",
          "اگر راهی را بروی که دور تپه می‌چرخد، شهر لایه‌لایه ردیف می‌شود. پایین، بازار قیصریه هنوز بر سر قیمت و پارچه بحث می‌کند. بالا، خانه‌های مرمت‌شده کارگاه و موزه‌ای کوچک و خانواده‌هایی را نگه می‌دارند که نمی‌خواهند نام یونسکو محله را به کارت‌پستال بدل کند.",
          "آنچه تحریریه از محله قلعه می‌آموزد این است که حفاظت بحثی شهری است. هر درِ مرمت‌شده تصمیمی است درباره اینکه شهر مال کیست: مهمانی که یک ساعت می‌ماند، یا ساکنی که عمرش را آنجا می‌گذراند.",
        ),
      },
      tr: {
        title: "Erbil Kalesi: taşta yaşayan bir kent",
        dek: "Höyük yalnızca bir anıt değil. Aşağıdaki çarşıdan yukarıdaki taş sokaklara kentin haritası.",
        body: b(
          "Yedi bin yıldan uzun süredir insanlar Hewlêr ovasındaki aynı oval toprağa dönüyor. Kale kendini camla tanıtmıyor. Bellek gibi yükseliyor: yavaşça, sonra birden, günün son ışığında bal rengi tuğladan bir duvar.",
          "Höyüğün çevresindeki yolda yürürseniz kent kendini katman katman dizer. Aşağıda Kayseri çarşısı hâlâ fiyat ve kumaş üzerine tartışır. Yukarıda onarılmış evler atölyeleri, küçük bir müzeyi ve UNESCO yazısının mahalleyi kartpostala çevirmesini reddeden aileleri tutar.",
          "Haber odasının kale mahallesinde öğrendiği şey, korumanın kentsel bir tartışma olduğudur. Onarılan her kapı, kentin kimin için olduğuna dair bir karardır: bir saat kalan ziyaretçi mi, yoksa ömrünü orada geçiren sakin mi.",
        ),
      },
    },
  },
  {
    group: "civic-decade",
    kind: "article",
    type: "standard",
    status: "published",
    category: "politics",
    author: "staff:rojin",
    image: "/media/civic.jpg",
    caption: {
      ckb: "هۆڵی کۆبوونەوە پێش ئەوەی گفتوگۆ دەست پێ بکات.",
      kmr: "Salona civînê berî ku gotûbêj dest pê bike.",
      en: "The meeting room before the discussion begins.",
      ar: "قاعة الاجتماع قبل أن يبدأ النقاش.",
      fa: "سالن نشست پیش از آغاز گفتگو.",
      tr: "Tartışma başlamadan önce toplantı salonu.",
    },
    zones: ["hero", "section:politics"],
    tags: ["schools", "language", "city"],
    views: 1320,
    daysAgo: 1,
    refs: [],
    copy: {
      ckb: {
        title: "دەیەی داهاتوو: گفتوگۆی شار و زمانی گشتی",
        dek: "ئەنجومەن، قوتابخانە و فەرمانگە. پرسیارەکە حزبی نییە — پرسیاری خزمەتگوزارییە.",
        body: b(
          "لە هەولێر و سلێمانی و دهۆک، گفتوگۆی داهاتوو لەسەر ناوی لایەنەکان کەمترە و لەسەر ئەوە زیاترە کە خەڵک چۆن دەتوانن بە زمانی خۆیان داواکارییەک پێشکەش بکەن. فەرمانگەیەک کە تەنها بە یەک ئەلفوبێ کار دەکات، نیوەی شارەکە دەشارێتەوە.",
          "ئەنجومەنە ناوخۆییەکان ئەمساڵ دوو پرسیاری سادەیان لەبەردەستە. یەکەم: چۆن بودجەی قوتابخانە دەگاتە گەڕەکە دوورەکان، نەک تەنها ناوەند. دووەم: چۆن تۆماری گشتی دەتوانرێت بە سۆرانی و کورمانجی پێکەوە بخوێنرێتەوە، بێ ئەوەی یەکێکیان ببێتە پەراوێز.",
          "KNC Publish ئەم گفتوگۆیە وەک هەواڵی ئاسایی دەگوازێتەوە، نەک وەک دروشم. ژمارەکان، بڕیارەکان و ئەو پرسیارانەی خەڵک لە چایخانەدا دەیپرسن، هەرسێکیان جێگەیان لە ڕاپۆرتەکەدا هەیە.",
        ),
      },
      kmr: {
        title: "Dehsaliya bê: diyaloga bajar û zimanê giştî",
        dek: "Encûmen, dibistan û daîre. Pirs ne ya partiyê ye — pirs ya xizmetê ye.",
        body: b(
          "Li Hewlêr, Silêmanî û Dihokê, diyaloga pêşerojê kêmtir li ser navên aliyan e û zêdetir li ser wê yekê ye ku mirov çawa dikarin bi zimanê xwe daxwazekê bidin. Daîreyeke ku tenê bi yek alfabeyê dixebite nîvê bajar vedişêre.",
          "Encûmenên herêmî îsal du pirsên sade li ber xwe digirin. Yekem: budceya dibistanê çawa digihîje taxên dûr, ne tenê navendê. Duyem: tomarên giştî çawa dikarin bi soranî û kurmancî bi hev re bêne xwendin, bêyî ku yek bibe kêlek.",
          "KNC Publish vê gotûbêjê wek nûçeyeke asayî vediguhêze, ne wek dirûşmekê. Hejmar, biryar û ew pirsên ku mirov li çayxaneyê dikin, her sê jî cihê xwe di raporta de hene.",
        ),
      },
      en: {
        title: "The next decade: the city, and the language of public life",
        dek: "Councils, schools and offices. The question is not partisan. It is about whether a service can be used.",
        body: b(
          "In Hewlêr, Sulaymaniyah and Duhok, the argument about the next ten years is less about party names and more about whether a person can file a request in their own language. An office that works in only one alphabet hides half the city.",
          "Local councils have two plain questions in front of them this year. First: how school budgets reach the outer neighbourhoods, not only the centre. Second: how a public record can be read in Sorani and Kurmanji together, without turning one of them into a footnote.",
          "KNC Publish carries this as ordinary news, not as a slogan. The numbers, the decisions, and the questions people ask in a tea house all belong in the same report.",
        ),
      },
      ar: {
        title: "العقد المقبل: حوار المدينة ولغة الحياة العامة",
        dek: "المجالس والمدارس والدوائر. السؤال ليس حزبيًا. السؤال: هل يمكن استخدام الخدمة؟",
        body: b(
          "في أربيل والسليمانية ودهوك، حديث السنوات العشر المقبلة أقل عن أسماء الأحزاب وأكثر عن قدرة الناس على تقديم طلب بلغتهم. دائرة تعمل بأبجدية واحدة تخفي نصف المدينة.",
          "أمام المجالس المحلية هذا العام سؤالان بسيطان. الأول: كيف تصل ميزانية المدرسة إلى الأحياء البعيدة لا إلى المركز فقط. الثاني: كيف يُقرأ السجل العام بالسورانية والكرمانجية معًا من دون أن تصير إحداهما هامشًا.",
          "تنقل KNC Publish هذا الحوار كخبر عادي لا كشعار. الأرقام والقرارات والأسئلة التي تُطرح في بيت الشاي لها مكانها في التقرير نفسه.",
        ),
      },
      fa: {
        title: "دهه پیش رو: گفتگوی شهر و زبان زندگی عمومی",
        dek: "شورا، مدرسه و اداره. پرسش حزبی نیست. پرسش این است که آیا خدمت قابل استفاده است.",
        body: b(
          "در اربیل و سلیمانیه و دهوک، بحث ده سال آینده کمتر درباره نام حزب‌هاست و بیشتر درباره این است که مردم بتوانند درخواستشان را به زبان خودشان بنویسند. اداره‌ای که فقط با یک الفبا کار می‌کند نیمی از شهر را پنهان می‌کند.",
          "شوراهای محلی امسال دو پرسش ساده پیش رو دارند. اول: بودجه مدرسه چطور به محله‌های دور می‌رسد، نه فقط به مرکز. دوم: پرونده عمومی چطور می‌تواند همزمان به سورانی و کرمانجی خوانده شود، بی‌آنکه یکی پاورقی شود.",
          "KNC Publish این گفتگو را مثل یک خبر معمولی منتقل می‌کند، نه مثل شعار. عددها، تصمیم‌ها و پرسش‌هایی که در چایخانه پرسیده می‌شود، هر سه در یک گزارش جا دارند.",
        ),
      },
      tr: {
        title: "Gelecek on yıl: kent ve kamusal dil",
        dek: "Meclis, okul ve daire. Soru parti sorusu değil. Soru, hizmetin kullanılıp kullanılamayacağı.",
        body: b(
          "Hewlêr, Süleymaniye ve Duhok’ta önümüzdeki on yılın tartışması parti adlarından çok, insanın kendi dilinde dilekçe verip veremeyeceğiyle ilgili. Tek alfabeyle çalışan bir daire kentin yarısını saklar.",
          "Yerel meclislerin bu yıl önünde iki yalın soru var. Birincisi: okul bütçesi yalnızca merkeze değil, uzak mahallelere nasıl ulaşır. İkincisi: kamu kaydı Soranice ve Kurmancca birlikte nasıl okunur, biri dipnot olmadan.",
          "KNC Publish bu konuşmayı slogan değil olağan haber olarak taşır. Sayılar, kararlar ve çayevinde sorulan sorular aynı raporda yer alır.",
        ),
      },
    },
  },
  {
    group: "digital-corpus",
    kind: "article",
    type: "scientific",
    status: "published",
    category: "science",
    author: "staff:diyar",
    image: "/media/corpus.jpg",
    caption: {
      ckb: "دەستنووس و تێبینی لەسەر مێزی توێژینەوە.",
      kmr: "Destnivîs û nîşe li ser maseya lêkolînê.",
      en: "Manuscripts and notes on a research desk.",
    },
    zones: ["hero", "section:science"],
    tags: ["language", "archive"],
    views: 980,
    daysAgo: 2,
    refs: corpusRefs,
    copy: {
      ckb: {
        title: "کۆرپسی دیجیتاڵی کوردی: زانستێک بۆ زمانێکی بێ سنوور",
        dek: "بۆ ئەوەی گەڕان و وەرگێڕان کار بکەن، سەرەتا دەبێت دەقەکان کۆبکرێنەوە، پۆلێن بکرێن و بپارێزرێن.",
        body: b(
          "زمانێک کە لە دوو ئەلفوبێ و چەندین شێوەزاردا دەژی، بۆ ئامێرەکان ئاسان نییە. گەڕانێک کە «هەولێر» و «Hewlêr» وەک دوو شار دەبینێت، هەواڵەکە دەشکێنێت. کۆرپس — کۆمەڵە دەقێکی پۆلێنکراو — یەکەم ئامرازی ئەم کارەیە.",
          "توێژەرانی زمانەوانی کوردی ساڵانێکە ئاماژە بەم کەلێنە دەکەن: کەمیی دەقی نیشانەکراو، جیاوازیی ئیملا، و نەبوونی ستانداردێکی هاوبەش بۆ هەواڵ. ئەم ڕاپۆرتە سەرچاوەکانی ئەو گفتوگۆیە کۆدەکاتەوە، نەک ئەوەی کە کێشەکە تەواو بووبێت.",
          "بۆ هەواڵنگەیەک وەک KNC Publish، کۆرپس تەنها پرۆژەیەکی ئەکادیمی نییە. ئەگەر وتارێک بە سۆرانی بنووسرێت و هاوتاکەی بە کورمانجی، پێویستە سیستەمەکە بزانێت کە ئەمانە یەک وتارن. ئەمە هەمان بیرۆکەیە کە لەم سایتەدا گرووپی وەرگێڕان پێی دەوترێت.",
        ),
      },
      kmr: {
        title: "Korpusa dîjîtal a kurdî: zanistek ji bo zimanekî bê sînor",
        dek: "Ji bo ku lêgerîn û werger bixebitin, divê pêşî nivîs bêne komkirin, polînkirin û parastin.",
        body: b(
          "Zimanek ku bi du alfabeyan û gelek zaravayan dijî, ji bo makîneyan ne hêsan e. Lêgerîneke ku «هەولێر» û «Hewlêr» wek du bajaran dibîne, nûçeyê diperçiqîne. Korpus — komika nivîsên polînkirî — amûra yekem a vî karî ye.",
          "Lêkolînerên zimanê kurdî salan e amaje bi vî valahiyê dikin: kêmasiya nivîsên nîşankirî, cudahiya rastnivîsê, û nebûna standardeke hevpar ji bo nûçeyan. Ev rapor çavkaniyên wê gotûbêjê dicivîne, ne ku bibêje pirsgirêk qediya ye.",
          "Ji bo jûrnaleke wek KNC Publish, korpus ne tenê projeyeke akademîk e. Heke gotarek bi soranî bê nivîsandin û hevtaya wê bi kurmancî, divê pergal bizanibe ku ev yek gotar in. Ev heman raman e ku li ser vî malperî jê re koma wergerê tê gotin.",
        ),
      },
      en: {
        title: "A digital corpus for Kurdish: scholarship for a language without a border",
        dek: "Search and translation only work once texts are collected, labelled and kept.",
        body: b(
          "A language that lives in two alphabets and several varieties is not easy for machines. A search box that treats «هەولێر» and «Hewlêr» as two cities breaks the news in half. A corpus — a labelled collection of text — is the first tool for that job.",
          "Researchers in Kurdish linguistics have pointed at the same gap for years: too little annotated text, unsettled spelling, and no shared standard for news. This piece gathers the sources of that conversation. It does not pretend the problem is solved.",
          "For a newsroom like KNC Publish, a corpus is not only an academic project. When a story is written in Sorani and its pair is written in Kurmanji, the system has to know they are one story. That is the same idea this site calls a translation group.",
        ),
      },
    },
  },
  {
    group: "tea-square",
    kind: "article",
    type: "standard",
    status: "published",
    category: "society",
    author: "staff:ava",
    image: "/media/tea.jpg",
    caption: {
      ckb: "چای لە پەرداخی باریکدا، پێش ئەوەی گفتوگۆ دەست پێ بکات.",
      kmr: "Çay di stekanên zirav de, berî ku gotûbêj dest pê bike.",
      en: "Tea in thin glasses, before the conversation starts.",
    },
    zones: ["lead", "section:society"],
    tags: ["food", "city"],
    views: 860,
    daysAgo: 3,
    refs: [],
    copy: {
      ckb: {
        title: "چایخانە وەک مەیدانی گشتی",
        dek: "پێش ئەوەی هەواڵ بگاتە ڕادیۆ، زۆرجار لەسەر سینییەکی مسی دەست پێ دەکات.",
        body: b(
          "چایخانە لە شارەکانی کوردستان تەنها شوێنی نانخواردن نییە. ئەوە شوێنێکە کە نرخ، ڕێگا، نەخۆشی و هەواڵی گەڕەک تێدا تاقی دەکرێنەوە. پەرداخە باریکەکان کات دەپێون: یەکەم دانە بۆ سڵاو، دووەم بۆ پرسیار، سێیەم بۆ بڕیار.",
          "لە هەواڵێکی ئاساییدا، چایخانە دەکرێت تەنها وەک ڕەنگ بێت. لە ڕاپۆرتێکی باشدا، ئەو شوێنەیە کە سەرچاوەکان ڕازین قسە بکەن. KNC Publish داوا لە نووسەرانی دەکات ناوی گەڕەک و کاتی ڕۆژ بنووسن، نەک تەنها «بەپێی سەرچاوەیەک».",
          "ئەم وتارە بەشێکە لە زنجیرەیەک لەسەر شوێنە گشتییەکان: بازاڕ، قوتابخانە، چایخانە. هەر یەکەیان ڕێگایەکە بۆ ئەوەی شارەکە ببینرێت بێ ئەوەی ببێتە دیمەنێکی گەشتیاری.",
        ),
      },
      kmr: {
        title: "Çayxane wek meydana giştî",
        dek: "Berî ku nûçe bigihîje radyoyê, gelek caran li ser sîniyeke sifir dest pê dike.",
        body: b(
          "Çayxane li bajarên Kurdistanê ne tenê cihê xwarinê ye. Ew cihê ku biha, rê, nexweşî û nûçeyên taxê lê têne ceribandin. Stekanên zirav demê dipîvin: ya yekem ji bo silavê, ya duyem ji bo pirsê, ya sêyem ji bo biryarê.",
          "Di nûçeyeke lawaz de çayxane tenê reng e. Di raporteke baş de ew cihê ku çavkanî razî ne biaxivin. KNC Publish ji nivîskaran dixwaze navê taxê û dema rojê binivîsin, ne tenê «li gorî çavkaniyekê».",
          "Ev gotar beşek e ji zincîreyekê li ser cihên giştî: bazar, dibistan, çayxane. Her yek rêyek e ku bajar bê dîtin bêyî ku bibe dîmeneke geştyarî.",
        ),
      },
      en: {
        title: "The tea house as a public square",
        dek: "Before a story reaches the radio, it often starts on a copper tray.",
        body: b(
          "In Kurdish cities a tea house is not only a place to eat. It is where prices, roads, illness and neighbourhood news get tested. The thin glasses keep time: the first is a greeting, the second a question, the third a decision.",
          "In a thin news story the tea house is colour. In a good one it is where sources are willing to talk. KNC Publish asks writers to name the neighbourhood and the hour, not only to write “according to a source”.",
          "This piece belongs to a series on public rooms: the market, the school, the tea house. Each is a way to see the city without turning it into a postcard.",
        ),
      },
    },
  },
  {
    group: "tembur-living",
    kind: "article",
    type: "premium",
    status: "published",
    category: "culture",
    author: "staff:ava",
    image: "/media/tembur.jpg",
    caption: {
      ckb: "تەمبوور لەسەر کەلووێک، پێش کۆنسێرت.",
      kmr: "Tembûr li ser kilîmekê, berî konserê.",
      en: "A tembûr on a kilim, before the concert.",
    },
    zones: ["lead", "section:culture"],
    tags: ["music"],
    views: 740,
    daysAgo: 4,
    refs: [],
    copy: {
      ckb: {
        title: "تەمبوور: ئامێرێک کە بیرگەی دەنگە",
        dek: "مۆسیقا لێرە تەنها سەرنجڕاکێش نییە. ڕێگایەکە بۆ ئەوەی نەوەیەک ناوی مەقامێک بزانێت.",
        body: b(
          "تەمبوور ملی درێژە و دەنگی کەمە، بەڵام لە هۆڵێکی بچووکدا هەموو شتێک پڕ دەکات. مامۆستایان دەڵێن فێربوونەکە لە تەکنیکەوە دەست پێ ناکات. لە گوێگرتنەوە دەست پێ دەکات: کام دەنگ درێژە، کام دەنگ نابێت پەلەی پێ بکرێت.",
          "لەم ساڵانەی دواییدا وەرشەی فێرکردن لە هەولێر و سلێمانی زیاتر بوون. هەندێکیان لە ماڵەوەن، هەندێکیان لە سەنتەری کەلتور. پرسیارەکە ئەوەیە ئایا تۆمارە کۆنەکان دەپارێزرێن وەک سەرچاوە، یان تەنها وەک کلیپێکی کورت لە تۆڕە کۆمەڵایەتییەکان.",
          "ئەم وتارە ئاستبەرزە داوا ناکات خوێنەر مۆسیقازان بێت. داوا دەکات گوێی لەوە بێت کە شارێک چۆن بیرەوەریی خۆی دەپارێزێت کاتێک ئامێرەکە هێشتا لە ژوورێکدا دەژەنرێت، نەک تەنها لە مۆزەخانە.",
        ),
      },
      kmr: {
        title: "Tembûr: amûrek ku bîra deng e",
        dek: "Muzîk li vir ne tenê xeml e. Rêyek e ku nifşek navê maqamekê bizanibe.",
        body: b(
          "Tembûr stûyê wê dirêj e û dengê wê nizm e, lê di saloneke biçûk de her tiştî tije dike. Mamoste dibêjin fêrbûn bi teknîkê dest pê nake. Bi guhdarkirinê dest pê dike: kîjan deng dirêj e, kîjan deng nabe ku bi lez were birin.",
          "Di van salên dawî de atolye li Hewlêr û Silêmaniyê zêde bûne. Hin li malê ne, hin li navendên çandê. Pirs ev e ka tomarên kevn wek çavkanî tên parastin, an tenê wek klîpeke kurt li ser torên civakî.",
          "Ev gotara asta bilind naxwaze ku xwîner muzîkzan be. Dixwaze ku bibihîze ka bajarek çawa bîra xwe diparêze dema amûr hîn li odeyekê tê lêdan, ne tenê li muzeyê.",
        ),
      },
      en: {
        title: "The tembûr, an instrument that remembers",
        dek: "Music here is not decoration. It is how a generation learns the name of a maqam.",
        body: b(
          "The tembûr has a long neck and a quiet voice, and in a small room it fills everything. Teachers say the lesson does not begin with technique. It begins with listening: which note is allowed to last, and which one must not be hurried.",
          "Workshops in Hewlêr and Sulaymaniyah have multiplied. Some are in houses, some in cultural centres. The question is whether old recordings are kept as sources, or only as short clips on a social feed.",
          "This feature does not ask the reader to be a musician. It asks them to notice how a city keeps its memory when the instrument is still played in a room, not only displayed in a museum.",
        ),
      },
    },
  },
  {
    group: "highland-water",
    kind: "article",
    type: "scientific",
    status: "published",
    category: "science",
    author: "staff:diyar",
    image: "/media/water.jpg",
    caption: {
      ckb: "دۆڵێک لە چیاکانی زاگرۆس، سەرەتای بەیانی.",
      kmr: "Geliyek li çiyayên Zagrosê, sibehê zû.",
      en: "A Zagros valley at the start of the morning.",
    },
    zones: ["latest", "section:science"],
    tags: ["water"],
    views: 690,
    daysAgo: 6,
    refs: waterRefs,
    copy: {
      ckb: {
        title: "ئاو لە شاخە بەرزەکان: تێبینییەکی مەیدانی",
        dek: "ڕووبارەکان لە سەرەوە دەست پێ دەکەن. پرسیاری زانستی ئەوەیە ئاوەکە دواتر بۆ کوێ دەڕوات و کێ دەیژمێرێت.",
        body: b(
          "دەشتی کشتوکاڵی بێ ئەو ئاوەی کە لە چیاکان دێت ناژی. ئەم تێبینییە مەیدانییە ڕاپۆرتە نێودەوڵەتییەکان لەگەڵ ئەو شتە کۆدەکاتەوە کە خەڵکی گوندەکان بە چاو دەیبینن: وەرزی باران کورتتر، و بەفرێک کە زووتر دەتوێتەوە.",
          "زانست لێرەدا دروشم نییە. سەرچاوەکان لە کۆتایی وتارەکەدان، بۆ ئەوەی خوێنەر بزانێت کام ڕاپۆرت قسە لەسەر شاخ و ئاو دەکات و کامەیان تەنها پێشبینیی گشتییە. جیاکردنەوەی ئەم دووانە کارێکی ڕۆژنامەوانییە.",
          "KNC Publish وتاری زانستی وەک جۆرێکی تایبەت دەناسێنێت: پرسیار، ڕێباز، و سەرچاوە. ئەم وتارە نموونەی ئەو قاڵبەیە، نەک وتاری کۆتایی لەسەر کەشوهەوا.",
        ),
      },
      kmr: {
        title: "Av li çiyayên bilind: nîşeyeke meydanî",
        dek: "Çem li jor dest pê dikin. Pirsa zanistê ev e ku av paşê diçe ku derê û kê wê dijimêre.",
        body: b(
          "Deşta çandiniyê bêyî wê ava ku ji çiyan tê najî. Ev nîşeya meydanî raporên navneteweyî bi wê yekê re dicivîne ku gundî bi çavan dibînin: demsala baranê kurttir e, û berf zûtir dihele.",
          "Zanist li vir ne dirûşm e. Çavkanî li dawiya gotarê ne, da ku xwîner bizanibe kîjan rapor li ser çiya û avê diaxive û kîjan tenê pêşbîniyeke giştî ye. Veqetandina van her duyan karekî rojnamevaniyê ye.",
          "KNC Publish gotara zanistî wek cureyekî taybet dinase: pirs, rêbaz, û çavkanî. Ev gotar mînaka wê qalibê ye, ne gotara dawî li ser hewayê.",
        ),
      },
      en: {
        title: "Water in the high mountains: a field note",
        dek: "The rivers begin above the plain. The scientific question is where the water goes next, and who counts it.",
        body: b(
          "The agricultural plain does not live without the water that comes off the mountains. This field note puts international reports next to what people in the villages can see: a shorter rainy season, and snow that melts sooner.",
          "Science is not a slogan here. The references sit at the end so a reader can tell which report actually discusses mountains and water, and which is only a general forecast. Separating those two is a journalistic job.",
          "KNC Publish treats a scientific article as its own register: a question, a method, and sources. This piece is an example of that form, not the last word on the climate.",
        ),
      },
    },
  },
  {
    group: "harvest-week",
    kind: "article",
    type: "standard",
    status: "published",
    category: "society",
    author: "staff:rojin",
    image: "/media/harvest.jpg",
    caption: {
      ckb: "دەشتی گەنم لە کۆتایی ڕۆژدا.",
      kmr: "Deşta genim di dawiya rojê de.",
      en: "Wheat country at the end of the day.",
    },
    zones: ["latest", "section:society", "sidebar"],
    tags: ["food"],
    views: 540,
    daysAgo: 8,
    refs: [],
    copy: {
      ckb: {
        title: "هەفتەی دروێنە لە دەشت",
        dek: "دروێنە تەنها وێنەیەکی جوان نییە. ڕۆژژمێری کرێ، ئاو و نرخە.",
        body: b(
          "کاتێک گەنمەکە زەرد دەبێت، شارەکە دەنگی دەشت دەبیستێت. خێزانەکان دابەش دەبن لەسەر ئەوەی کێ دەمێنێتەوە و کێ دەچێتە سەر زەوی. ئەم هەفتەیە لە ڕاپۆرتەکەدا بە ژمارە دەنووسرێت: کرێی ڕۆژ، نرخی گاز، و ئەو کاتەی باران دواکەوت.",
          "KNC Publish نایەوێت دەشت ببێتە دیمەنێکی بێ خەڵک. ئەگەر وێنەکە بەتاڵ دیار بێت، دەقەکە دەبێت ناوی کارەکە بهێنێت. دروێنە کارە، نەک تەنها ڕەنگ.",
          "ئەم وتارە لە سەرەتا لە سێ شوێن دەردەکەوێت — دوایین، کۆمەڵگا، و هەڵبژاردەی لاتەنیشت — چونکە سەرنووسەر وای داناوە. وتارێک بەبێ ئەو نیشانانە تەنها جارێک دەردەکەوێت.",
        ),
      },
      kmr: {
        title: "Hefteya dirûnê li deştê",
        dek: "Dirûn ne tenê wêneyekî xweşik e. Salnameya krê, av û bihayê ye.",
        body: b(
          "Gava genim zer dibe, bajar dengê deştê dibihîze. Malbat li ser wê yekê parve dibin ku kê dimîne û kê diçe ser erdê. Ev hefte di raporê de bi hejmaran tê nivîsandin: krêya rojê, bihayê gazê, û ew dema ku baran dereng ma.",
          "KNC Publish naxwaze deşt bibe dîmeneke bê mirov. Heke wêne vala xuya bike, divê nivîs navê kar bibêje. Dirûn kar e, ne tenê reng.",
          "Ev gotar li destpêkê li sê cihan xuya dike — dawî, civak, û hilbijartina kêlekê — ji ber ku edîtor wisa daniye. Gotareke bê wan nîşanan tenê carekê xuya dike.",
        ),
      },
      en: {
        title: "Harvest week on the plain",
        dek: "The harvest is not only a beautiful picture. It is a calendar of wages, water and price.",
        body: b(
          "When the wheat turns, the city hears the plain. Families split the week between who stays and who goes out to the fields. This report writes the week in numbers: the day wage, the price of fuel, and the rain that came late.",
          "KNC Publish does not want the plain to become a landscape with no one in it. If the photograph looks empty, the text has to name the work. A harvest is labour, not only colour.",
          "On the homepage this story appears in three places — Latest, Society, and the sidebar — because an editor ticked those boxes. A story without those ticks appears once.",
        ),
      },
    },
  },
  {
    group: "two-alphabets",
    kind: "post",
    type: "premium",
    status: "published",
    category: "opinion",
    author: "staff:sherko",
    image: "/media/alphabet.jpg",
    caption: {
      ckb: "دوو دەفتەر، دوو ئەلفوبێ، یەک مێز.",
      kmr: "Du defter, du alfabê, yek mase.",
      en: "Two notebooks, two alphabets, one desk.",
    },
    zones: ["latest", "section:opinion"],
    tags: ["language"],
    views: 410,
    daysAgo: 5,
    refs: [],
    copy: {
      ckb: {
        title: "بۆچی یەک هەواڵنگە دوو ئەلفوبێی دەوێت",
        dek: "پۆستێک، نەک ڕاپۆرت. بۆچوونێک لەسەر ئەوەی وەرگێڕان کارێکی زیادە نییە.",
        body: b(
          "ئەگەر خوێنەرێک دوگمەی زمان بگۆڕێت و وتارەکە نەگۆڕێت، ئەوا سایتەکە تەنها ڕووکارەکەی گۆڕیوە. KNC Publish داوا دەکات هەمان وتار، هەمان گرووپ، بە زمانێکی تر هەبێت. ئەمە ڕازاندنەوە نییە. ئەمە ڕێزگرتنە لە خوێنەر.",
          "سۆرانی زمانی سەرەکی ئەم هەواڵنگەیەیە. کورمانجی و ئینگلیزی هاوتان، نەک وەرگێڕانێکی لاواز لە پەراوێز. زمانەکانی تر دەرگايان کراوەیە، و کاتێک وتارەکە ئامادە نەبێت، ئێمە درۆ ناکەین کە هەیە.",
          "ئەمە پۆستە، نەک وتاری هەواڵ. جیاوازییەکە لە قاڵبدایە: پۆست دەنگێکی دیارە، وتار ڕاپۆرتە، لاپەڕە شوێنێکی جێگیرە وەک «دەربارە» و «ڕێسای ڕەوشت».",
        ),
      },
      kmr: {
        title: "Çima jûrnalek du alfabeyan divê",
        dek: "Nivîsek e, ne rapor. Ramanek li ser wê yekê ku werger ne xeml e.",
        body: b(
          "Heke xwîner bişkoka ziman biguherîne û gotar neguherê, malper tenê rûxara xwe guherandiye. KNC Publish dixwaze heman gotar, heman kom, bi zimanekî din hebe. Ev ne xeml e. Ev rêzgirtina li xwîner e.",
          "Soranî zimanê sereke yê vê jûrnalê ye. Kurmancî û îngilîzî hevpişk in, ne wergera lawaz a li kêlekê. Zimanên din vekirî ne, û gava gotar ne amade be em derewan nakin ku heye.",
          "Ev nivîs e, ne gotara nûçeyê. Cudahî di qalibê de ye: nivîs dengekî diyarkirî ye, gotar rapor e, rûpel cîhekî sabît e wek «Derbar» û «Exlaq».",
        ),
      },
      en: {
        title: "Why one newsroom needs two alphabets",
        dek: "A post, not a report. An argument that translation is not decoration.",
        body: b(
          "If a reader changes the language and the story does not change, the site has only changed its chrome. KNC Publish asks for the same story, in the same group, in another language. That is not ornament. It is respect for the reader.",
          "Sorani is this newsroom’s first language. Kurmanji and English sit beside it, not as a thin translation in the margin. Other languages are open, and when a story is not ready in them we do not pretend that it is.",
          "This is a post, not a news article. The difference is the form: a post has a visible voice, an article is a report, a page is a fixed place such as About or Ethics.",
        ),
      },
    },
  },
  {
    group: "bazaar-evening",
    kind: "article",
    type: "standard",
    status: "review",
    category: "kurdistan",
    author: "staff:ava",
    image: "/media/newsroom.jpg",
    caption: {
      ckb: "مێزی هەواڵنگە پێش بڵاوکردنەوە.",
      kmr: "Maseya jûrnalê berî weşanê.",
      en: "The newsroom desk before publication.",
    },
    zones: [],
    tags: ["hewlêr", "city"],
    views: 12,
    daysAgo: 1,
    refs: [],
    copy: {
      ckb: {
        title: "ئێوارە لە بازاڕی قەیسەری",
        dek: "ڕەشنووسێک لە پێداچوونەوەدایە. هێشتا لە سەرەتا دەرناکەوێت.",
        body: b(
          "کاتێک چراکانی بازاڕ دادەگیرسێن، قوماشەکان ڕەنگێکی تر وەردەگرن. ئەم ڕەشنووسە چاوەڕوانی تێبینیی سەرنووسەرە: ئایا سەرچاوەکان بەسەن، ئایا ژێرنووسی وێنە ڕوونە.",
          "نووسەر ناتوانێت خۆی بڵاوی بکاتەوە. دوگمەی «ناردن بۆ پێداچوونەوە» وتارەکە دەخاتە ڕیز. سەرنووسەر یان سەرپەرشتیار بڵاوی دەکاتەوە یان دەیانگەڕێنێتەوە لەگەڵ تێبینی.",
          "ئەم دەقە بۆ ئەوەیە ڕیزی پێداچوونەوە بەتاڵ نەبێت کاتێک یەکەم جار مێزی سەرنووسەر دەکرێتەوە.",
        ),
      },
      kmr: {
        title: "Êvar li bazara Qeyseriyê",
        dek: "Reşnivîsek di nirxandinê de ye. Hîn li destpêkê xuya nake.",
        body: b(
          "Gava çirayên bazarê vêdikevin, qumaş rengê din digirin. Ev reşnivîs li hêviya nîşeya edîtor e: gelo çavkanî bes in, gelo binivîsa wêneyê zelal e.",
          "Nivîskar nikare bi xwe biweşîne. Bişkoka «Bişîne nirxandinê» gotarê dike rêzê. Edîtor an superadmin diweşîne an bi nîşeyekê vedigerîne.",
          "Ev nivîs ji bo wê ye ku rêza nirxandinê vala nebe gava cara yekem mase tê vekirin.",
        ),
      },
      en: {
        title: "Evening in the Qaysari bazaar",
        dek: "A draft in review. It does not appear on the homepage yet.",
        body: b(
          "When the market lamps come on, the cloth takes another colour. This draft is waiting for an editor’s note: whether the sources are enough, and whether the caption is clear.",
          "A writer cannot publish alone. Submit for review puts the story in the queue. An editor or a superadmin publishes it, or returns it with a note.",
          "The piece exists so the review queue is not empty the first time the desk is opened.",
        ),
      },
    },
  },
  {
    group: "library-hour",
    kind: "article",
    type: "standard",
    status: "published",
    category: "kurdistan",
    author: "staff:diyar",
    image: "/media/newsroom.jpg",
    caption: {
      ckb: "مێزێکی هێمن پێش دەستپێکردنی ڕۆژ.",
      kmr: "Maseyeke aram berî destpêka rojê.",
      en: "A quiet desk before the day begins.",
    },
    zones: [],
    tags: ["archive", "hewlêr"],
    views: 2210,
    daysAgo: 9,
    refs: [],
    copy: {
      ckb: {
        title: "کاتژمێرێک لە کتێبخانەی شار",
        dek: "ئەم وتارە لە سەرەتا دووبارە نابێتەوە. تەنها لە زۆرترین خوێنراو و لە پۆلی کوردستان دەردەکەوێت.",
        body: b(
          "کتێبخانەکە پێش ئەوەی قوتابخانەکان دەست پێ بکەن دەکرێتەوە. خەڵک دێن بۆ ڕۆژنامەی دوێنێ، نەک تەنها بۆ کتێب. ئەمەش هەواڵە: شوێنێک کە خوێندنەوە هێشتا کارێکی گشتییە.",
          "KNC Publish ئەم وتارەی دانا بێ نیشانی سەرەتا، بۆ ئەوەی لە هەر پەڕەیەکدا تەنها جارێک دەربکەوێت، مەگەر سەرنووسەر خۆی زیاتر هەڵیبژێرێت.",
        ),
      },
      kmr: {
        title: "Saetek li pirtûkxaneya bajar",
        dek: "Ev gotar li destpêkê dubare nabe. Tenê di nav yên herî zêde xwendî û di beşa Kurdistanê de xuya dike.",
        body: b(
          "Pirtûkxane berî ku dibistan vebin vedibe. Mirov tên ji bo rojnameya duh, ne tenê ji bo pirtûkan. Ev jî nûçe ye: cihek ku xwendin hîn karekî giştî ye.",
          "KNC Publish ev gotar bê nîşana destpêkê danî, da ku li her rûpelê tenê carekê xuya bike, heta edîtor bi xwe zêdetir hilbijêre.",
        ),
      },
      en: {
        title: "An hour in the city library",
        dek: "This story is not repeated on the homepage. It surfaces in Most read, and in the Kurdistan section.",
        body: b(
          "The library opens before the schools do. People come for yesterday’s paper, not only for books. That is news too: a room where reading is still a public act.",
          "KNC Publish left this story off the homepage zones, so it appears once on any page unless an editor deliberately places it again.",
        ),
      },
    },
  },
  {
    group: "evening-routes",
    kind: "article",
    type: "standard",
    status: "published",
    category: "kurdistan",
    author: "staff:rojin",
    image: "/media/civic.jpg",
    caption: {
      ckb: "هۆڵێک کە چاوەڕوانی ئێوارەیە.",
      kmr: "Salonek li hêviya êvarê ye.",
      en: "A hall waiting for evening.",
    },
    zones: [],
    tags: ["city"],
    views: 1660,
    daysAgo: 7,
    refs: [],
    copy: {
      ckb: {
        title: "ڕێگاکانی ئێوارە لە دەرەوەی ناوەند",
        dek: "وتارێکی بڵاوکراو کە سەرنووسەر نەیکردووە بە سلاید یان ڕیزی یەکەم.",
        body: b(
          "دوای دابەزینی خۆر، پاسەکان کەمتر دەبن و گەڕەکە دەرەکییەکان درەوشانەوەیەکی تریان هەیە. ڕاپۆرتەکە ناوی وێستگەکان دەهێنێت، نەک تەنها وشەی «گواستنەوە».",
          "ئەگەر ئەم وتارە دواتر بخرێتە ناو سلایدی سەرەتا، ئەوا لەوێش دەردەکەوێت. تا ئەو کاتە، جارێک لە لیستی زۆرترین خوێنراو بەسە.",
        ),
      },
      kmr: {
        title: "Rêyên êvarê li derveyî navendê",
        dek: "Gotareke weşandî ku edîtor nekiriye slayd an rêza yekem.",
        body: b(
          "Piştî avabûnê otobus kêm dibin û taxên derve ronahiyeke din digirin. Rapor navê rawestgehan dibêje, ne tenê peyva «veguhastin».",
          "Heke ev gotar paşê bikeve slayda destpêkê, wê li wir jî xuya bike. Heta wê demê, carek di nav yên herî zêde xwendî de bes e.",
        ),
      },
      en: {
        title: "Evening routes beyond the centre",
        dek: "A published story the editor did not place in the slideshow or the lead row.",
        body: b(
          "After sunset the buses thin out and the outer neighbourhoods take on another light. The report names the stops, rather than only the word “transport”.",
          "If this story is later ticked into the hero, it will show there too. Until then, once in Most read is enough.",
        ),
      },
    },
  },
];

export const pages: { slug: string; copy: Record<string, { title: string; body: string }> }[] = [
  {
    slug: "about",
    copy: {
      ckb: {
        title: "دەربارەی KNC Publish",
        body: b(
          "KNC Publish هەواڵنگەیەکی کوردییە لەسەر kncsite.com. زمانی سەرەکی کوردی سۆرانییە، و کورمانجی و ئینگلیزی لە تەنیشتین. زمانەکانی تر بۆ ڕووکار و، کاتێک ئامادە بن، بۆ هەمان وتار کراونەتەوە.",
          "ئێمە وتار، پۆست و لاپەڕە بڵاو دەکەینەوە. وتاری ئاسایی هەواڵە. وتاری ئاستبەرز درێژترە. وتاری زانستی سەرچاوەی هەیە. پۆست دەنگێکی دیارە. لاپەڕە شوێنێکی جێگیرە.",
          "لۆگۆکە جێگرەوەیە. سەرپەرشتیار دەتوانێت لە ڕێکخستنەکاندا لینکی وێنەیەک دابنێت.",
        ),
      },
      kmr: {
        title: "Derbarê KNC Publish",
        body: b(
          "KNC Publish jûrnaleke kurdî ye li ser kncsite.com. Zimanê sereke kurdiya soranî ye, û kurmancî û îngilîzî li kêlekê ne. Zimanên din ji bo rûxarê vekirî ne û, gava amade bin, ji bo heman gotarê jî.",
          "Em gotar, nivîs û rûpelan diweşînin. Gotara asayî nûçe ye. Ya asta bilind dirêjtir e. Ya zanistî çavkaniyan digire. Nivîs dengekî diyarkirî ye. Rûpel cîhekî sabît e.",
          "Logo cihgir e. Superadmin dikare di mîhengan de girêdana wêneyekê deyne.",
        ),
      },
      en: {
        title: "About KNC Publish",
        body: b(
          "KNC Publish is a Kurdish newsroom at kncsite.com. Sorani is the first language. Kurmanji and English sit beside it. Further languages are open for the interface and, when a translation exists, for the same story.",
          "We publish articles, posts and pages. A standard article is news. A feature runs longer. A scientific article carries references. A post has a visible voice. A page is a fixed place.",
          "The logo is a placeholder. A superadmin can paste an image URL in settings.",
        ),
      },
    },
  },
  {
    slug: "ethics",
    copy: {
      ckb: {
        title: "ڕێسای ڕەوشت",
        body: b(
          "ناوی سەرچاوە ناهێنین کاتێک ناوهێنان زیانی هەبێت. وتاری بڵاوکراو دەبێت بە پێداچوونەوەی سەرنووسەر تێپەڕیبێت. نووسەر ناتوانێت بە تەنها بڵاو بکاتەوە.",
          "ڕاستکردنەوە لەسەر هەمان وتار دەنووسرێت، نەک بە سڕینەوەی بێ دەنگ. وەرگێڕان نابێت مانای وتارەکە بگۆڕێت. ئەگەر وەرگێڕان ئامادە نەبێت، ئێمە وەشانی نزیک پیشان دەدەین و ڕاشکاوانە دەیڵێین.",
          "ڕیکلام و وتار تێکەڵ ناکەین. ئەم وەشانە نموونەی هەواڵنگەیە، نەک بڵاوکراوەیەکی فەرمیی دامەزراوەیی.",
        ),
      },
      kmr: {
        title: "Rêzeya exlaqê",
        body: b(
          "Em navê çavkaniyê nabêjin gava gotin zirarê bide. Gotara weşandî divê di nirxandina edîtor re derbas bibe. Nivîskar bi tenê nikare biweşîne.",
          "Rastkirin li ser heman gotarê tê nivîsandin, ne bi jêbirina bêdeng. Werger nikare wateya gotarê biguherîne. Heke werger ne amade be, em guhertoya nêzîk nîşan didin û eşkere dibêjin.",
          "Em reklam û gotarê tevlihev nakin. Ev guherto nimûneya jûrnalekê ye, ne weşana fermî ya saziyekê.",
        ),
      },
      en: {
        title: "Ethics",
        body: b(
          "We do not name a source when naming them would cause harm. A published story has to pass an editor. A writer cannot publish alone.",
          "Corrections are written on the same story, not silently erased. A translation must not change the meaning. If a translation is not ready, we show the nearest edition and say so.",
          "We do not mix advertising and reporting. This edition is a newsroom demonstration, not an official institutional publication.",
        ),
      },
    },
  },
  {
    slug: "contact",
    copy: {
      ckb: {
        title: "پەیوەندی",
        body: b(
          "بۆ وتار و پێداچوونەوە: desk@kncsite.com",
          "بۆ خوێنەران: hello@kncsite.com",
          "KNC Publish · kncsite.com · هەولێر",
        ),
      },
      kmr: {
        title: "Têkilî",
        body: b(
          "Ji bo gotar û nirxandinê: desk@kncsite.com",
          "Ji bo xwîneran: hello@kncsite.com",
          "KNC Publish · kncsite.com · Hewlêr",
        ),
      },
      en: {
        title: "Contact",
        body: b(
          "For stories and review: desk@kncsite.com",
          "For readers: hello@kncsite.com",
          "KNC Publish · kncsite.com · Hewlêr",
        ),
      },
    },
  },
];

export const PLUGIN_CATALOG = [
  { slug: "weather", key: "pluginWeather" },
  { slug: "newsletter", key: "pluginNews" },
  { slug: "most-read", key: "pluginRead" },
  { slug: "share", key: "pluginShare" },
  { slug: "reading-progress", key: "pluginProgress" },
  { slug: "related", key: "pluginRelated" },
  { slug: "citations", key: "pluginCite" },
] as const;
