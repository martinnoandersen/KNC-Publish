//#region node_modules/.nitro/vite/services/ssr/assets/i18n-J2xLYLI0.js
var LANGS = [
	{
		id: "ckb",
		label: "کوردی سۆرانی",
		short: "سۆرانی",
		dir: "rtl"
	},
	{
		id: "kmr",
		label: "Kurdî Kurmancî",
		short: "Kurmancî",
		dir: "ltr"
	},
	{
		id: "en",
		label: "English",
		short: "English",
		dir: "ltr"
	},
	{
		id: "ar",
		label: "العربية",
		short: "العربية",
		dir: "rtl"
	},
	{
		id: "fa",
		label: "فارسی",
		short: "فارسی",
		dir: "rtl"
	},
	{
		id: "tr",
		label: "Türkçe",
		short: "Türkçe",
		dir: "ltr"
	},
	{
		id: "de",
		label: "Deutsch",
		short: "Deutsch",
		dir: "ltr"
	},
	{
		id: "fr",
		label: "Français",
		short: "Français",
		dir: "ltr"
	},
	{
		id: "es",
		label: "Español",
		short: "Español",
		dir: "ltr"
	}
];
var LANG_SET = new Set(LANGS.map((l) => l.id));
function isLang(value) {
	return typeof value === "string" && LANG_SET.has(value);
}
function langMeta(id) {
	return LANGS.find((l) => l.id === id) ?? LANGS[0];
}
var FALLBACK_LANGS = [
	"ckb",
	"en",
	"kmr",
	"ar",
	"fa",
	"tr",
	"de",
	"fr",
	"es"
];
var DICT = {
	tagline: {
		ckb: "هەواڵنگەیەکی کوردی بۆ وتار، پۆست و لاپەڕە",
		kmr: "Jûrnaleke kurdî ji bo gotar, nivîs û rûpelan",
		en: "A Kurdish newsroom for articles, posts and pages",
		ar: "غرفة أخبار كردية للمقالات والتدوينات والصفحات",
		fa: "تحریریه‌ای کُردی برای مقاله، نوشته و صفحه",
		tr: "Makale, yazı ve sayfalar için Kürtçe bir haber odası",
		de: "Ein kurdischer Newsroom für Artikel, Beiträge und Seiten",
		fr: "Une rédaction kurde pour articles, billets et pages",
		es: "Una redacción kurda para artículos, posts y páginas"
	},
	edition: {
		ckb: "هەولێر",
		kmr: "Hewlêr",
		en: "Hewlêr",
		ar: "أربيل",
		fa: "اربیل",
		tr: "Hewlêr",
		de: "Hewlêr",
		fr: "Hewlêr",
		es: "Hewlêr"
	},
	signIn: {
		ckb: "چوونەژوورەوە",
		kmr: "Têkeve",
		en: "Sign in",
		ar: "تسجيل الدخول",
		fa: "ورود",
		tr: "Giriş",
		de: "Anmelden",
		fr: "Connexion",
		es: "Entrar"
	},
	search: {
		ckb: "گەڕان",
		kmr: "Lêgerîn",
		en: "Search",
		ar: "بحث",
		fa: "جستجو",
		tr: "Ara",
		de: "Suche",
		fr: "Recherche",
		es: "Buscar"
	},
	searchPlaceholder: {
		ckb: "ناونیشان، بابەت، تاگ…",
		kmr: "Sernav, mijar, etîket…",
		en: "Headline, topic, tag…",
		ar: "عنوان، موضوع، وسم…",
		fa: "عنوان، موضوع، برچسب…",
		tr: "Başlık, konu, etiket…",
		de: "Titel, Thema, Schlagwort…",
		fr: "Titre, sujet, mot-clé…",
		es: "Título, tema, etiqueta…"
	},
	desk: {
		ckb: "مێزی سەرنووسەر",
		kmr: "Maseya edîtor",
		en: "The Desk",
		ar: "مكتب التحرير",
		fa: "میز تحریریه",
		tr: "Masa",
		de: "Redaktion",
		fr: "Le desk",
		es: "La mesa"
	},
	latest: {
		ckb: "دوایین",
		kmr: "Dawî",
		en: "Latest",
		ar: "الأحدث",
		fa: "تازه‌ها",
		tr: "Son yazılar",
		de: "Aktuell",
		fr: "En ce moment",
		es: "Lo último"
	},
	mostRead: {
		ckb: "زۆرترین خوێنراو",
		kmr: "Herî zêde xwendî",
		en: "Most read",
		ar: "الأكثر قراءة",
		fa: "پرخواننده‌ترین",
		tr: "Çok okunanlar",
		de: "Meistgelesen",
		fr: "Les plus lus",
		es: "Lo más leído"
	},
	newsletterTitle: {
		ckb: "نامەی بەیانی",
		kmr: "Nameya sibehê",
		en: "Morning note",
		ar: "رسالة الصباح",
		fa: "یادداشت صبح",
		tr: "Sabah notu",
		de: "Morgennotiz",
		fr: "Note du matin",
		es: "Nota de la mañana"
	},
	newsletterBody: {
		ckb: "هەڵبژاردەی سەرنووسەر، هەفتەی جارێک. ئیمەیڵەکەت تەنها لەسەر ئەم ئامێرە دەمێنێتەوە.",
		kmr: "Hilbijartina edîtor, hefteyê carekê. E-peyam tenê li ser vê cîhazê dimîne.",
		en: "The editor’s selection, once a week. Your email stays on this device only.",
		ar: "مختارات التحرير مرة في الأسبوع. بريدك يبقى على هذا الجهاز فقط.",
		fa: "انتخاب سردبیر، هفته‌ای یک بار. ایمیل فقط روی همین دستگاه می‌ماند.",
		tr: "Editörün seçkisi, haftada bir. E-postanız yalnızca bu cihazda kalır.",
		de: "Die Auswahl der Redaktion, einmal pro Woche. Die E-Mail bleibt nur auf diesem Gerät.",
		fr: "La sélection de la rédaction, une fois par semaine. L’e-mail reste sur cet appareil.",
		es: "La selección de la redacción, una vez por semana. El correo se queda en este dispositivo."
	},
	subscribe: {
		ckb: "بەشداربوون",
		kmr: "Beşdar bibe",
		en: "Subscribe",
		ar: "اشترك",
		fa: "عضویت",
		tr: "Abone ol",
		de: "Abonnieren",
		fr: "S’abonner",
		es: "Suscribirse"
	},
	subscribed: {
		ckb: "تۆمار کرا. سوپاس.",
		kmr: "Hat tomarkirin. Spas.",
		en: "You’re on the list. Thank you.",
		ar: "تم التسجيل. شكرًا.",
		fa: "ثبت شد. سپاس.",
		tr: "Listeye eklendiniz. Teşekkürler.",
		de: "Sie stehen auf der Liste. Danke.",
		fr: "C’est noté. Merci.",
		es: "Ya estás en la lista. Gracias."
	},
	by: {
		ckb: "نووسینی",
		kmr: "Nivîsên",
		en: "By",
		ar: "بقلم",
		fa: "نوشته",
		tr: "Yazan",
		de: "Von",
		fr: "Par",
		es: "Por"
	},
	minRead: {
		ckb: "خولەک خوێندنەوە",
		kmr: "deqe xwendin",
		en: "min read",
		ar: "د قراءة",
		fa: "دقیقه مطالعه",
		tr: "dk okuma",
		de: "Min. Lesezeit",
		fr: "min de lecture",
		es: "min de lectura"
	},
	related: {
		ckb: "بابەتی پەیوەندیدار",
		kmr: "Gotarên têkildar",
		en: "Related",
		ar: "ذات صلة",
		fa: "مرتبط",
		tr: "İlgili",
		de: "Verwandt",
		fr: "À lire aussi",
		es: "Relacionados"
	},
	references: {
		ckb: "سەرچاوەکان",
		kmr: "Çavkanî",
		en: "References",
		ar: "المراجع",
		fa: "منابع",
		tr: "Kaynakça",
		de: "Literatur",
		fr: "Références",
		es: "Referencias"
	},
	share: {
		ckb: "هاوبەشکردن",
		kmr: "Parvekirin",
		en: "Share",
		ar: "مشاركة",
		fa: "هم‌رسانی",
		tr: "Paylaş",
		de: "Teilen",
		fr: "Partager",
		es: "Compartir"
	},
	copyLink: {
		ckb: "لینک کۆپی بکە",
		kmr: "Girêdanê kopî bike",
		en: "Copy link",
		ar: "نسخ الرابط",
		fa: "کپی پیوند",
		tr: "Bağlantıyı kopyala",
		de: "Link kopieren",
		fr: "Copier le lien",
		es: "Copiar enlace"
	},
	copied: {
		ckb: "کۆپی کرا",
		kmr: "Hat kopîkirin",
		en: "Copied",
		ar: "تم النسخ",
		fa: "کپی شد",
		tr: "Kopyalandı",
		de: "Kopiert",
		fr: "Copié",
		es: "Copiado"
	},
	notTranslated: {
		ckb: "ئەم وتارە هێشتا بەم زمانە وەرنەگێڕدراوە. وەشانی نزیکترین زمان پیشان دەدرێت.",
		kmr: "Ev gotar hîn bi vî zimanî nehatiye wergerandin. Guhertoya herî nêzîk tê nîşandan.",
		en: "This story is not yet in this language. Showing the closest edition.",
		ar: "هذه المادة غير متوفرة بهذه اللغة بعد. نعرض أقرب نسخة.",
		fa: "این مطلب هنوز به این زبان ترجمه نشده. نزدیک‌ترین نسخه نشان داده می‌شود.",
		tr: "Bu yazı henüz bu dilde yok. En yakın sürüm gösteriliyor.",
		de: "Dieser Text liegt noch nicht in dieser Sprache vor. Die nächste Fassung wird gezeigt.",
		fr: "Ce texte n’est pas encore dans cette langue. L’édition la plus proche s’affiche.",
		es: "Este texto aún no está en este idioma. Mostramos la edición más cercana."
	},
	about: {
		ckb: "دەربارە",
		kmr: "Derbar",
		en: "About",
		ar: "عن الموقع",
		fa: "درباره",
		tr: "Hakkında",
		de: "Über uns",
		fr: "À propos",
		es: "Acerca de"
	},
	ethics: {
		ckb: "ڕێسای ڕەوشت",
		kmr: "Exlaq",
		en: "Ethics",
		ar: "الأخلاقيات",
		fa: "اخلاق",
		tr: "İlkeler",
		de: "Ethik",
		fr: "Éthique",
		es: "Ética"
	},
	contact: {
		ckb: "پەیوەندی",
		kmr: "Têkilî",
		en: "Contact",
		ar: "اتصال",
		fa: "تماس",
		tr: "İletişim",
		de: "Kontakt",
		fr: "Contact",
		es: "Contacto"
	},
	sections: {
		ckb: "بەشەکان",
		kmr: "Beş",
		en: "Sections",
		ar: "الأقسام",
		fa: "بخش‌ها",
		tr: "Bölümler",
		de: "Ressorts",
		fr: "Rubriques",
		es: "Secciones"
	},
	languages: {
		ckb: "زمانەکان",
		kmr: "Ziman",
		en: "Languages",
		ar: "اللغات",
		fa: "زبان‌ها",
		tr: "Diller",
		de: "Sprachen",
		fr: "Langues",
		es: "Idiomas"
	},
	rights: {
		ckb: "هەموو مافێک پارێزراوە",
		kmr: "Hemû maf parastî ne",
		en: "All rights reserved",
		ar: "جميع الحقوق محفوظة",
		fa: "همه حقوق محفوظ است",
		tr: "Tüm hakları saklıdır",
		de: "Alle Rechte vorbehalten",
		fr: "Tous droits réservés",
		es: "Todos los derechos reservados"
	},
	posts: {
		ckb: "پۆستەکان",
		kmr: "Nivîs",
		en: "Posts",
		ar: "تدوينات",
		fa: "نوشته‌ها",
		tr: "Yazılar",
		de: "Beiträge",
		fr: "Billets",
		es: "Posts"
	},
	articles: {
		ckb: "وتارەکان",
		kmr: "Gotar",
		en: "Articles",
		ar: "مقالات",
		fa: "مقاله‌ها",
		tr: "Makaleler",
		de: "Artikel",
		fr: "Articles",
		es: "Artículos"
	},
	authorArticles: {
		ckb: "بەرهەمەکان",
		kmr: "Berhem",
		en: "Work",
		ar: "الأعمال",
		fa: "آثار",
		tr: "Yazılar",
		de: "Arbeiten",
		fr: "Textes",
		es: "Obra"
	},
	education: {
		ckb: "خوێندن",
		kmr: "Perwerde",
		en: "Education",
		ar: "التعليم",
		fa: "تحصیل",
		tr: "Eğitim",
		de: "Ausbildung",
		fr: "Formation",
		es: "Formación"
	},
	experience: {
		ckb: "ئەزموون",
		kmr: "Ezmûn",
		en: "Experience",
		ar: "الخبرة",
		fa: "تجربه",
		tr: "Deneyim",
		de: "Erfahrung",
		fr: "Expérience",
		es: "Experiencia"
	},
	location: {
		ckb: "شوێن",
		kmr: "Cih",
		en: "Location",
		ar: "المكان",
		fa: "مکان",
		tr: "Yer",
		de: "Ort",
		fr: "Lieu",
		es: "Lugar"
	},
	spoken: {
		ckb: "زمان",
		kmr: "Ziman",
		en: "Languages",
		ar: "اللغات",
		fa: "زبان‌ها",
		tr: "Diller",
		de: "Sprachen",
		fr: "Langues",
		es: "Idiomas"
	},
	count: {
		ckb: "وتار",
		kmr: "gotar",
		en: "stories",
		ar: "مادة",
		fa: "مطلب",
		tr: "yazı",
		de: "Texte",
		fr: "textes",
		es: "textos"
	},
	standard: {
		ckb: "ئاسایی",
		kmr: "Standard",
		en: "News",
		ar: "خبر",
		fa: "خبر",
		tr: "Haber",
		de: "Nachricht",
		fr: "Actu",
		es: "Noticia"
	},
	premium: {
		ckb: "ئاستبەرز",
		kmr: "Asta bilind",
		en: "Feature",
		ar: "تحقيق",
		fa: "گزارش ویژه",
		tr: "Dosya",
		de: "Reportage",
		fr: "Grand format",
		es: "Reportaje"
	},
	scientific: {
		ckb: "زانستی",
		kmr: "Zanistî",
		en: "Science",
		ar: "علمي",
		fa: "علمی",
		tr: "Bilimsel",
		de: "Wissenschaft",
		fr: "Scientifique",
		es: "Científico"
	},
	editorsChoice: {
		ckb: "هەڵبژاردەی سەرنووسەر",
		kmr: "Hilbijartina edîtor",
		en: "Editor’s choice",
		ar: "اختيار التحرير",
		fa: "انتخاب سردبیر",
		tr: "Editörün seçimi",
		de: "Empfehlung",
		fr: "Le choix",
		es: "Elección"
	},
	weather: {
		ckb: "کەش",
		kmr: "Hewa",
		en: "Weather",
		ar: "الطقس",
		fa: "هوا",
		tr: "Hava",
		de: "Wetter",
		fr: "Météo",
		es: "Tiempo"
	},
	menu: {
		ckb: "مێنو",
		kmr: "Pêşek",
		en: "Menu",
		ar: "القائمة",
		fa: "فهرست",
		tr: "Menü",
		de: "Menü",
		fr: "Menu",
		es: "Menú"
	},
	close: {
		ckb: "داخستن",
		kmr: "Bigire",
		en: "Close",
		ar: "إغلاق",
		fa: "بستن",
		tr: "Kapat",
		de: "Schließen",
		fr: "Fermer",
		es: "Cerrar"
	},
	next: {
		ckb: "دواتر",
		kmr: "Pêş",
		en: "Next",
		ar: "التالي",
		fa: "بعدی",
		tr: "Sonraki",
		de: "Weiter",
		fr: "Suivant",
		es: "Siguiente"
	},
	prev: {
		ckb: "پێشتر",
		kmr: "Paş",
		en: "Previous",
		ar: "السابق",
		fa: "قبلی",
		tr: "Önceki",
		de: "Zurück",
		fr: "Précédent",
		es: "Anterior"
	},
	home: {
		ckb: "سەرەتا",
		kmr: "Destpêk",
		en: "Home",
		ar: "الرئيسية",
		fa: "خانه",
		tr: "Ana sayfa",
		de: "Start",
		fr: "Accueil",
		es: "Inicio"
	},
	empty: {
		ckb: "هێشتا هیچ نییە.",
		kmr: "Hîn tiştek nîne.",
		en: "Nothing here yet.",
		ar: "لا شيء بعد.",
		fa: "هنوز چیزی نیست.",
		tr: "Henüz bir şey yok.",
		de: "Noch nichts.",
		fr: "Rien pour l’instant.",
		es: "Aún no hay nada."
	},
	resultsFor: {
		ckb: "ئەنجام بۆ",
		kmr: "Encam ji bo",
		en: "Results for",
		ar: "نتائج",
		fa: "نتایج",
		tr: "Sonuçlar",
		de: "Ergebnisse für",
		fr: "Résultats pour",
		es: "Resultados de"
	},
	allStories: {
		ckb: "هەموو",
		kmr: "Hemû",
		en: "All",
		ar: "الكل",
		fa: "همه",
		tr: "Tümü",
		de: "Alle",
		fr: "Tout",
		es: "Todo"
	},
	hashtags: {
		ckb: "تاگەکان",
		kmr: "Etîket",
		en: "Tags",
		ar: "الوسوم",
		fa: "برچسب‌ها",
		tr: "Etiketler",
		de: "Schlagworte",
		fr: "Mots-clés",
		es: "Etiquetas"
	},
	pages: {
		ckb: "لاپەڕەکان",
		kmr: "Rûpel",
		en: "Pages",
		ar: "الصفحات",
		fa: "صفحه‌ها",
		tr: "Sayfalar",
		de: "Seiten",
		fr: "Pages",
		es: "Páginas"
	},
	account: {
		ckb: "هەژمار",
		kmr: "Hesab",
		en: "Account",
		ar: "الحساب",
		fa: "حساب",
		tr: "Hesap",
		de: "Konto",
		fr: "Compte",
		es: "Cuenta"
	},
	createAccount: {
		ckb: "هەژماری نوێ",
		kmr: "Hesabek nû",
		en: "Create account",
		ar: "حساب جديد",
		fa: "حساب تازه",
		tr: "Hesap oluştur",
		de: "Konto erstellen",
		fr: "Créer un compte",
		es: "Crear cuenta"
	},
	email: {
		ckb: "ئیمەیڵ",
		kmr: "E-peyam",
		en: "Email",
		ar: "البريد",
		fa: "ایمیل",
		tr: "E-posta",
		de: "E-Mail",
		fr: "E-mail",
		es: "Correo"
	},
	password: {
		ckb: "وشەی نهێنی",
		kmr: "Şîfre",
		en: "Password",
		ar: "كلمة السر",
		fa: "گذرواژه",
		tr: "Parola",
		de: "Passwort",
		fr: "Mot de passe",
		es: "Contraseña"
	},
	name: {
		ckb: "ناو",
		kmr: "Nav",
		en: "Name",
		ar: "الاسم",
		fa: "نام",
		tr: "Ad",
		de: "Name",
		fr: "Nom",
		es: "Nombre"
	},
	or: {
		ckb: "یان",
		kmr: "an",
		en: "or",
		ar: "أو",
		fa: "یا",
		tr: "veya",
		de: "oder",
		fr: "ou",
		es: "o"
	},
	continueWith: {
		ckb: "بەردەوامبە لەگەڵ",
		kmr: "Bidomîne bi",
		en: "Continue with",
		ar: "المتابعة عبر",
		fa: "ادامه با",
		tr: "Şununla devam",
		de: "Weiter mit",
		fr: "Continuer avec",
		es: "Continuar con"
	},
	haveAccount: {
		ckb: "هەژمارم هەیە",
		kmr: "Hesabê min heye",
		en: "I have an account",
		ar: "لدي حساب",
		fa: "حساب دارم",
		tr: "Hesabım var",
		de: "Ich habe ein Konto",
		fr: "J’ai un compte",
		es: "Ya tengo cuenta"
	},
	needAccount: {
		ckb: "هەژمارم نییە",
		kmr: "Hesabê min nîne",
		en: "I need an account",
		ar: "أحتاج حسابًا",
		fa: "حساب ندارم",
		tr: "Hesabım yok",
		de: "Ich brauche ein Konto",
		fr: "Je n’ai pas de compte",
		es: "Necesito una cuenta"
	},
	signedInAs: {
		ckb: "چوویتە ژوورەوە وەک",
		kmr: "Tu ketî wek",
		en: "Signed in as",
		ar: "دخلت بصفة",
		fa: "وارد شده‌اید به نام",
		tr: "Giriş yapıldı",
		de: "Angemeldet als",
		fr: "Connecté en tant que",
		es: "Sesión iniciada como"
	},
	openDesk: {
		ckb: "کردنەوەی مێز",
		kmr: "Maseyê veke",
		en: "Open the desk",
		ar: "افتح المكتب",
		fa: "میز را باز کن",
		tr: "Masayı aç",
		de: "Redaktion öffnen",
		fr: "Ouvrir le desk",
		es: "Abrir la mesa"
	},
	dashboard: {
		ckb: "پوختە",
		kmr: "Kurte",
		en: "Overview",
		ar: "نظرة عامة",
		fa: "نمای کلی",
		tr: "Özet",
		de: "Überblick",
		fr: "Aperçu",
		es: "Resumen"
	},
	newStory: {
		ckb: "وتاری نوێ",
		kmr: "Gotara nû",
		en: "New story",
		ar: "مادة جديدة",
		fa: "مطلب تازه",
		tr: "Yeni yazı",
		de: "Neuer Text",
		fr: "Nouveau texte",
		es: "Texto nuevo"
	},
	reviewQueue: {
		ckb: "پێداچوونەوە",
		kmr: "Nirxandin",
		en: "Review",
		ar: "المراجعة",
		fa: "بازبینی",
		tr: "İnceleme",
		de: "Prüfung",
		fr: "Relecture",
		es: "Revisión"
	},
	taxonomy: {
		ckb: "پۆل و تاگ",
		kmr: "Kategorî û etîket",
		en: "Categories & tags",
		ar: "التصنيف والوسوم",
		fa: "دسته و برچسب",
		tr: "Kategori ve etiket",
		de: "Rubriken & Tags",
		fr: "Rubriques et tags",
		es: "Categorías y etiquetas"
	},
	people: {
		ckb: "خەڵک",
		kmr: "Kes",
		en: "People",
		ar: "الأشخاص",
		fa: "افراد",
		tr: "Kişiler",
		de: "Personen",
		fr: "Personnes",
		es: "Personas"
	},
	appearance: {
		ckb: "ڕووکار",
		kmr: "Xuyang",
		en: "Themes",
		ar: "المظهر",
		fa: "پوسته",
		tr: "Temalar",
		de: "Themen",
		fr: "Thèmes",
		es: "Temas"
	},
	plugins: {
		ckb: "پێوەکراوەکان",
		kmr: "Pêvek",
		en: "Plugins",
		ar: "الإضافات",
		fa: "افزونه‌ها",
		tr: "Eklentiler",
		de: "Plugins",
		fr: "Extensions",
		es: "Plugins"
	},
	settings: {
		ckb: "ڕێکخستن",
		kmr: "Mîheng",
		en: "Settings",
		ar: "الإعدادات",
		fa: "تنظیمات",
		tr: "Ayarlar",
		de: "Einstellungen",
		fr: "Réglages",
		es: "Ajustes"
	},
	profile: {
		ckb: "پرۆفایل",
		kmr: "Profîl",
		en: "Profile",
		ar: "الملف",
		fa: "نمایه",
		tr: "Profil",
		de: "Profil",
		fr: "Profil",
		es: "Perfil"
	},
	myStories: {
		ckb: "وتارەکانی من",
		kmr: "Gotarên min",
		en: "My stories",
		ar: "موادي",
		fa: "مطالب من",
		tr: "Yazılarım",
		de: "Meine Texte",
		fr: "Mes textes",
		es: "Mis textos"
	},
	saveDraft: {
		ckb: "پاشەکەوت وەک ڕەشنووس",
		kmr: "Wekî reşnivîs tomar bike",
		en: "Save draft",
		ar: "حفظ كمسودة",
		fa: "ذخیره پیش‌نویس",
		tr: "Taslak kaydet",
		de: "Entwurf speichern",
		fr: "Enregistrer le brouillon",
		es: "Guardar borrador"
	},
	submitReview: {
		ckb: "ناردن بۆ پێداچوونەوە",
		kmr: "Bişîne nirxandinê",
		en: "Submit for review",
		ar: "إرسال للمراجعة",
		fa: "ارسال برای بازبینی",
		tr: "İncelemeye gönder",
		de: "Zur Prüfung",
		fr: "Envoyer en relecture",
		es: "Enviar a revisión"
	},
	publish: {
		ckb: "بڵاوکردنەوە",
		kmr: "Biweşîne",
		en: "Publish",
		ar: "نشر",
		fa: "انتشار",
		tr: "Yayınla",
		de: "Veröffentlichen",
		fr: "Publier",
		es: "Publicar"
	},
	reject: {
		ckb: "گەڕاندنەوە",
		kmr: "Vegerîne",
		en: "Return",
		ar: "إعادة",
		fa: "بازگشت",
		tr: "Geri gönder",
		de: "Zurückgeben",
		fr: "Renvoyer",
		es: "Devolver"
	},
	title: {
		ckb: "ناونیشان",
		kmr: "Sernav",
		en: "Headline",
		ar: "العنوان",
		fa: "عنوان",
		tr: "Başlık",
		de: "Titel",
		fr: "Titre",
		es: "Título"
	},
	dek: {
		ckb: "پوختەی سەرەوە",
		kmr: "Kurteya jorîn",
		en: "Deck",
		ar: "المقدمة",
		fa: "لید",
		tr: "Spot",
		de: "Vorspann",
		fr: "Chapô",
		es: "Entradilla"
	},
	body: {
		ckb: "دەق",
		kmr: "Nivîs",
		en: "Body",
		ar: "المتن",
		fa: "متن",
		tr: "Metin",
		de: "Text",
		fr: "Texte",
		es: "Cuerpo"
	},
	kind: {
		ckb: "جۆر",
		kmr: "Cure",
		en: "Kind",
		ar: "النوع",
		fa: "گونه",
		tr: "Tür",
		de: "Art",
		fr: "Genre",
		es: "Tipo"
	},
	article: {
		ckb: "وتار",
		kmr: "Gotar",
		en: "Article",
		ar: "مقال",
		fa: "مقاله",
		tr: "Makale",
		de: "Artikel",
		fr: "Article",
		es: "Artículo"
	},
	post: {
		ckb: "پۆست",
		kmr: "Nivîs",
		en: "Post",
		ar: "تدوين",
		fa: "نوشته",
		tr: "Yazı",
		de: "Beitrag",
		fr: "Billet",
		es: "Post"
	},
	type: {
		ckb: "ئاست",
		kmr: "Ast",
		en: "Register",
		ar: "المستوى",
		fa: "سطح",
		tr: "Düzey",
		de: "Niveau",
		fr: "Registre",
		es: "Registro"
	},
	language: {
		ckb: "زمانی وتار",
		kmr: "Zimanê gotarê",
		en: "Story language",
		ar: "لغة المادة",
		fa: "زبان مطلب",
		tr: "Yazı dili",
		de: "Sprache des Textes",
		fr: "Langue du texte",
		es: "Idioma del texto"
	},
	group: {
		ckb: "گرووپی وەرگێڕان",
		kmr: "Koma wergerê",
		en: "Translation group",
		ar: "مجموعة الترجمة",
		fa: "گروه ترجمه",
		tr: "Çeviri grubu",
		de: "Übersetzungsgruppe",
		fr: "Groupe de traduction",
		es: "Grupo de traducción"
	},
	groupHint: {
		ckb: "هەمان کلیل بۆ هەموو زمانەکانی یەک وتار. بەتاڵ بهێڵە بۆ وتارێکی نوێ.",
		kmr: "Heman kilît ji bo hemû zimanên yek gotarê. Ji bo gotareke nû vala bihêle.",
		en: "Same key for every language of one story. Leave empty to start a new story.",
		ar: "نفس المفتاح لكل لغات المادة الواحدة. اتركه فارغًا لمادة جديدة.",
		fa: "همین کلید برای همه زبان‌های یک مطلب. برای مطلب تازه خالی بگذارید.",
		tr: "Bir yazının her dili için aynı anahtar. Yeni yazı için boş bırakın.",
		de: "Gleicher Schlüssel für jede Sprache eines Textes. Leer lassen für einen neuen Text.",
		fr: "La même clé pour chaque langue d’un texte. Laisser vide pour un nouveau texte.",
		es: "La misma clave para cada idioma de un texto. Déjela vacía para uno nuevo."
	},
	image: {
		ckb: "وێنەی سەرەکی",
		kmr: "Wêneya sereke",
		en: "Lead image",
		ar: "الصورة الرئيسية",
		fa: "تصویر اصلی",
		tr: "Ana görsel",
		de: "Aufmacherbild",
		fr: "Image principale",
		es: "Imagen principal"
	},
	caption: {
		ckb: "ژێرنووس",
		kmr: "Binivîs",
		en: "Caption",
		ar: "التعليق",
		fa: "شرح",
		tr: "Altyazı",
		de: "Bildunterschrift",
		fr: "Légende",
		es: "Pie"
	},
	category: {
		ckb: "پۆل",
		kmr: "Kategorî",
		en: "Category",
		ar: "التصنيف",
		fa: "دسته",
		tr: "Kategori",
		de: "Rubrik",
		fr: "Rubrique",
		es: "Categoría"
	},
	tagsHint: {
		ckb: "تاگەکان بە کۆما",
		kmr: "Etîket bi komayê",
		en: "Tags, comma separated",
		ar: "وسوم مفصولة بفاصلة",
		fa: "برچسب‌ها با ویرگول",
		tr: "Etiketler, virgülle",
		de: "Tags, durch Komma",
		fr: "Tags, séparés par des virgules",
		es: "Etiquetas, separadas por comas"
	},
	onHome: {
		ckb: "لە دوایینەکانی سەرەتا",
		kmr: "Di dawiyên destpêkê de",
		en: "Show in Latest",
		ar: "في الأحدث",
		fa: "در تازه‌ها",
		tr: "Son yazılarda göster",
		de: "Unter Aktuell",
		fr: "Dans En ce moment",
		es: "En Lo último"
	},
	onHero: {
		ckb: "لە سلایدی سەرەتا",
		kmr: "Di slayda destpêkê de",
		en: "Hero slideshow",
		ar: "عرض الشرائح",
		fa: "اسلاید اصلی",
		tr: "Manşet slaytı",
		de: "Aufmacher-Slideshow",
		fr: "Diaporama",
		es: "Carrusel"
	},
	onLead: {
		ckb: "لە ڕیزی یەکەم",
		kmr: "Di rêza yekem de",
		en: "Lead row",
		ar: "صف الصدارة",
		fa: "ردیف نخست",
		tr: "Üst sıra",
		de: "Lead-Reihe",
		fr: "Rangée d’ouverture",
		es: "Fila de apertura"
	},
	onSidebar: {
		ckb: "هەڵبژاردەی لاتەنیشت",
		kmr: "Hilbijartina kêlekê",
		en: "Sidebar pick",
		ar: "اختيار الشريط",
		fa: "انتخاب ستون",
		tr: "Kenar seçimi",
		de: "Seitenleiste",
		fr: "Colonne",
		es: "Lateral"
	},
	sectionPlace: {
		ckb: "بەشی سەرەتا",
		kmr: "Beşa destpêkê",
		en: "Homepage section",
		ar: "قسم الصفحة",
		fa: "بخش صفحه",
		tr: "Ana sayfa bölümü",
		de: "Startseiten-Ressort",
		fr: "Rubrique d’accueil",
		es: "Sección de portada"
	},
	status: {
		ckb: "دۆخ",
		kmr: "Rewş",
		en: "Status",
		ar: "الحالة",
		fa: "وضعیت",
		tr: "Durum",
		de: "Status",
		fr: "Statut",
		es: "Estado"
	},
	draft: {
		ckb: "ڕەشنووس",
		kmr: "Reşnivîs",
		en: "Draft",
		ar: "مسودة",
		fa: "پیش‌نویس",
		tr: "Taslak",
		de: "Entwurf",
		fr: "Brouillon",
		es: "Borrador"
	},
	inReview: {
		ckb: "لە پێداچوونەوە",
		kmr: "Di nirxandinê de",
		en: "In review",
		ar: "قيد المراجعة",
		fa: "در بازبینی",
		tr: "İncelemede",
		de: "In Prüfung",
		fr: "En relecture",
		es: "En revisión"
	},
	published: {
		ckb: "بڵاوکراوە",
		kmr: "Weşandî",
		en: "Published",
		ar: "منشور",
		fa: "منتشر شده",
		tr: "Yayında",
		de: "Veröffentlicht",
		fr: "Publié",
		es: "Publicado"
	},
	returned: {
		ckb: "گەڕێندرایەوە",
		kmr: "Vegerandî",
		en: "Returned",
		ar: "أُعيد",
		fa: "بازگشته",
		tr: "Geri gönderildi",
		de: "Zurückgegeben",
		fr: "Renvoyé",
		es: "Devuelto"
	},
	note: {
		ckb: "تێبینیی سەرنووسەر",
		kmr: "Nîşeya edîtor",
		en: "Editor’s note",
		ar: "ملاحظة التحرير",
		fa: "یادداشت سردبیر",
		tr: "Editör notu",
		de: "Redaktionsnotiz",
		fr: "Note de la rédaction",
		es: "Nota de redacción"
	},
	refsHint: {
		ckb: "سەرچاوە: نووسەر | ساڵ | ناونیشان | بڵاوکراوە",
		kmr: "Çavkanî: nivîskar | sal | sernav | weşan",
		en: "Reference: author | year | title | source",
		ar: "مرجع: المؤلف | السنة | العنوان | المصدر",
		fa: "منبع: نویسنده | سال | عنوان | منبع",
		tr: "Kaynak: yazar | yıl | başlık | yayın",
		de: "Quelle: Autor | Jahr | Titel | Publikation",
		fr: "Référence : auteur | année | titre | source",
		es: "Referencia: autor | año | título | fuente"
	},
	role: {
		ckb: "ڕۆڵ",
		kmr: "Rol",
		en: "Role",
		ar: "الدور",
		fa: "نقش",
		tr: "Rol",
		de: "Rolle",
		fr: "Rôle",
		es: "Rol"
	},
	reader: {
		ckb: "خوێنەر",
		kmr: "Xwîner",
		en: "Reader",
		ar: "قارئ",
		fa: "خواننده",
		tr: "Okur",
		de: "Leser",
		fr: "Lecteur",
		es: "Lector"
	},
	writer: {
		ckb: "نووسەر",
		kmr: "Nivîskar",
		en: "Writer",
		ar: "كاتب",
		fa: "نویسنده",
		tr: "Yazar",
		de: "Autor",
		fr: "Auteur",
		es: "Autor"
	},
	editor: {
		ckb: "سەرنووسەر",
		kmr: "Edîtor",
		en: "Editor",
		ar: "محرر",
		fa: "دبیر",
		tr: "Editör",
		de: "Redakteur",
		fr: "Éditeur",
		es: "Editor"
	},
	superadmin: {
		ckb: "سەرپەرشتیار",
		kmr: "Superadmin",
		en: "Superadmin",
		ar: "مشرف أعلى",
		fa: "مدیر کل",
		tr: "Süper yönetici",
		de: "Superadmin",
		fr: "Superadmin",
		es: "Superadmin"
	},
	save: {
		ckb: "پاشەکەوت",
		kmr: "Tomar bike",
		en: "Save",
		ar: "حفظ",
		fa: "ذخیره",
		tr: "Kaydet",
		de: "Speichern",
		fr: "Enregistrer",
		es: "Guardar"
	},
	enabled: {
		ckb: "چالاک",
		kmr: "Çalak",
		en: "On",
		ar: "مفعل",
		fa: "روشن",
		tr: "Açık",
		de: "An",
		fr: "Actif",
		es: "Activo"
	},
	logo: {
		ckb: "لۆگۆ (لینک)",
		kmr: "Logo (girêdan)",
		en: "Logo URL",
		ar: "رابط الشعار",
		fa: "نشانی نشان",
		tr: "Logo bağlantısı",
		de: "Logo-URL",
		fr: "URL du logo",
		es: "URL del logo"
	},
	logoHint: {
		ckb: "بەتاڵ = نیشانەی KNC. لینکێکی وێنە دابنێ بۆ گۆڕینی.",
		kmr: "Vala = nîşana KNC. Girêdaneke wêneyê deyne ji bo guhertinê.",
		en: "Empty uses the KNC mark. Paste an image URL to replace it.",
		ar: "الفراغ يُبقي علامة KNC. الصق رابط صورة لاستبدالها.",
		fa: "خالی یعنی نشان KNC. برای جایگزینی نشانی تصویر بگذارید.",
		tr: "Boşsa KNC işareti kalır. Değiştirmek için görsel bağlantısı yapıştırın.",
		de: "Leer lässt das KNC-Zeichen. Bild-URL zum Ersetzen einfügen.",
		fr: "Vide : le sigle KNC. Collez une URL d’image pour le remplacer.",
		es: "Vacío: la marca KNC. Pegue una URL de imagen para sustituirla."
	},
	bodyHint: {
		ckb: "پەرەگراف بە دێڕی بەتاڵ. وێنە: ![ژێرنووس](/media/tea.jpg) — سەردێڕ: ## ",
		kmr: "Paragraf bi rêzika vala. Wêne: ![binivîs](/media/tea.jpg) — sernav: ## ",
		en: "Blank line between paragraphs. Image: ![caption](/media/tea.jpg) — heading: ## ",
		ar: "سطر فارغ بين الفقرات. صورة: ![تعليق](/media/tea.jpg) — عنوان: ## ",
		fa: "خط خالی بین بندها. تصویر: ![شرح](/media/tea.jpg) — عنوان: ## ",
		tr: "Paragraflar arası boş satır. Görsel: ![altyazı](/media/tea.jpg) — başlık: ## ",
		de: "Leerzeile zwischen Absätzen. Bild: ![Unterschrift](/media/tea.jpg) — Überschrift: ## ",
		fr: "Ligne vide entre paragraphes. Image : ![légende](/media/tea.jpg) — titre : ## ",
		es: "Línea en blanco entre párrafos. Imagen: ![pie](/media/tea.jpg) — título: ## "
	},
	noAccess: {
		ckb: "ئەم بەشە بۆ ڕۆڵی ئێستات نییە.",
		kmr: "Ev beş ne ji bo rola te ya niha ye.",
		en: "This section isn’t available for your role.",
		ar: "هذا القسم غير متاح لدورك الحالي.",
		fa: "این بخش برای نقش شما در دسترس نیست.",
		tr: "Bu bölüm şu anki rolünüz için açık değil.",
		de: "Dieser Bereich ist für Ihre Rolle nicht frei.",
		fr: "Cette section n’est pas ouverte à votre rôle.",
		es: "Esta sección no está disponible para tu rol."
	},
	firstAdmin: {
		ckb: "یەکەم کەس کە دەچێتە ژوورەوە دەبێتە سەرپەرشتیار.",
		kmr: "Kesê yekem ku têkeve dibe superadmin.",
		en: "The first person to sign in becomes superadmin.",
		ar: "أول من يسجّل الدخول يصبح المشرف الأعلى.",
		fa: "نخستین کسی که وارد شود مدیر کل می‌شود.",
		tr: "İlk giren kişi süper yönetici olur.",
		de: "Die erste Anmeldung wird Superadmin.",
		fr: "La première connexion devient superadmin.",
		es: "Quien entre primero será superadmin."
	},
	filter: {
		ckb: "پاڵاوتن",
		kmr: "Parzûn",
		en: "Filter",
		ar: "تصفية",
		fa: "پالایش",
		tr: "Süz",
		de: "Filter",
		fr: "Filtrer",
		es: "Filtrar"
	},
	all: {
		ckb: "هەموو",
		kmr: "Hemû",
		en: "All",
		ar: "الكل",
		fa: "همه",
		tr: "Tümü",
		de: "Alle",
		fr: "Tout",
		es: "Todo"
	},
	saved: {
		ckb: "پاشەکەوت کرا",
		kmr: "Hat tomarkirin",
		en: "Saved",
		ar: "تم الحفظ",
		fa: "ذخیره شد",
		tr: "Kaydedildi",
		de: "Gespeichert",
		fr: "Enregistré",
		es: "Guardado"
	},
	bio: {
		ckb: "پوختەی ژیان",
		kmr: "Jiyanname",
		en: "Biography",
		ar: "السيرة",
		fa: "زندگی‌نامه",
		tr: "Özgeçmiş",
		de: "Biografie",
		fr: "Biographie",
		es: "Biografía"
	},
	lineHint: {
		ckb: "هەر دێڕێک: ساڵەکان | شوێن | وردەکاری",
		kmr: "Her rêzik: sal | cih | hûrgulî",
		en: "Each line: years | place | detail",
		ar: "كل سطر: السنوات | المكان | التفصيل",
		fa: "هر خط: سال‌ها | مکان | جزئیات",
		tr: "Her satır: yıllar | yer | ayrıntı",
		de: "Jede Zeile: Jahre | Ort | Detail",
		fr: "Chaque ligne : années | lieu | détail",
		es: "Cada línea: años | lugar | detalle"
	},
	viewSite: {
		ckb: "بینینی سایت",
		kmr: "Malperê bibîne",
		en: "View site",
		ar: "عرض الموقع",
		fa: "دیدن سایت",
		tr: "Siteyi gör",
		de: "Zur Website",
		fr: "Voir le site",
		es: "Ver el sitio"
	},
	classic: {
		ckb: "کاغەزی ڕۆژنامە",
		kmr: "Kaxezê rojnameyê",
		en: "Newsprint",
		ar: "ورق الجريدة",
		fa: "کاغذ روزنامه",
		tr: "Gazete kâğıdı",
		de: "Zeitungspapier",
		fr: "Papier journal",
		es: "Papel de diario"
	},
	night: {
		ckb: "شەو",
		kmr: "Şev",
		en: "Night ink",
		ar: "حبر الليل",
		fa: "جوهر شب",
		tr: "Gece mürekkebi",
		de: "Nacht",
		fr: "Encre de nuit",
		es: "Tinta nocturna"
	},
	warm: {
		ckb: "گەرم",
		kmr: "Germ",
		en: "Warm paper",
		ar: "ورق دافئ",
		fa: "کاغذ گرم",
		tr: "Sıcak kâğıt",
		de: "Warmes Papier",
		fr: "Papier chaud",
		es: "Papel cálido"
	},
	pluginWeather: {
		ckb: "شریتی کەش لە سەرەوە",
		kmr: "Kêşa hewayê li jor",
		en: "Weather strip in the masthead",
		ar: "شريط الطقس في الترويسة",
		fa: "نوار هوا در سرصفحه",
		tr: "Manşette hava şeridi",
		de: "Wetterleiste im Kopf",
		fr: "Bande météo dans la manchette",
		es: "Franja del tiempo en la cabecera"
	},
	pluginNews: {
		ckb: "نامەی بەیانی لە لاتەنیشت",
		kmr: "Nameya sibehê li kêlekê",
		en: "Morning note in the sidebar",
		ar: "رسالة الصباح في الشريط",
		fa: "یادداشت صبح در ستون",
		tr: "Kenarda sabah notu",
		de: "Morgennotiz in der Seitenleiste",
		fr: "Note du matin dans la colonne",
		es: "Nota matinal en el lateral"
	},
	pluginRead: {
		ckb: "زۆرترین خوێنراو",
		kmr: "Herî zêde xwendî",
		en: "Most-read list",
		ar: "قائمة الأكثر قراءة",
		fa: "فهرست پرخواننده",
		tr: "Çok okunanlar listesi",
		de: "Meistgelesen-Liste",
		fr: "Liste des plus lus",
		es: "Lista de lo más leído"
	},
	pluginShare: {
		ckb: "دوگمەی هاوبەشکردن لە وتار",
		kmr: "Bişkoka parvekirinê di gotarê de",
		en: "Share buttons on stories",
		ar: "أزرار المشاركة",
		fa: "دکمه‌های هم‌رسانی",
		tr: "Yazıda paylaşım düğmeleri",
		de: "Teilen-Schaltflächen",
		fr: "Boutons de partage",
		es: "Botones de compartir"
	},
	pluginProgress: {
		ckb: "هێڵی پێشکەوتنی خوێندنەوە",
		kmr: "Xêza pêşketina xwendinê",
		en: "Reading progress bar",
		ar: "شريط تقدم القراءة",
		fa: "نوار پیشرفت خواندن",
		tr: "Okuma çubuğu",
		de: "Lesefortschritt",
		fr: "Barre de lecture",
		es: "Barra de lectura"
	},
	pluginRelated: {
		ckb: "بابەتی پەیوەندیدار",
		kmr: "Gotarên têkildar",
		en: "Related stories",
		ar: "مواد ذات صلة",
		fa: "مطالب مرتبط",
		tr: "İlgili yazılar",
		de: "Verwandte Texte",
		fr: "Textes liés",
		es: "Textos relacionados"
	},
	pluginCite: {
		ckb: "سەرچاوەی وتاری زانستی",
		kmr: "Çavkaniyên gotara zanistî",
		en: "Citations on science pieces",
		ar: "مراجع المواد العلمية",
		fa: "منابع مطالب علمی",
		tr: "Bilim yazılarında kaynakça",
		de: "Literatur bei Wissenschaft",
		fr: "Références des papiers scientifiques",
		es: "Citas en piezas científicas"
	},
	activeTheme: {
		ckb: "ڕووکاری چالاک",
		kmr: "Xuyanga çalak",
		en: "Active theme",
		ar: "المظهر النشط",
		fa: "پوسته فعال",
		tr: "Etkin tema",
		de: "Aktives Thema",
		fr: "Thème actif",
		es: "Tema activo"
	},
	addCategory: {
		ckb: "پۆلی نوێ",
		kmr: "Kategorîya nû",
		en: "New category",
		ar: "تصنيف جديد",
		fa: "دسته تازه",
		tr: "Yeni kategori",
		de: "Neue Rubrik",
		fr: "Nouvelle rubrique",
		es: "Categoría nueva"
	},
	slug: {
		ckb: "کلیل",
		kmr: "Kilît",
		en: "Slug",
		ar: "المسار",
		fa: "نامک",
		tr: "Kısa ad",
		de: "Kürzel",
		fr: "Identifiant",
		es: "Slug"
	},
	pageBody: {
		ckb: "دەقی لاپەڕە",
		kmr: "Nivîsa rûpelê",
		en: "Page body",
		ar: "متن الصفحة",
		fa: "متن صفحه",
		tr: "Sayfa metni",
		de: "Seitentext",
		fr: "Texte de la page",
		es: "Texto de la página"
	},
	alsoIn: {
		ckb: "هەروەها بە",
		kmr: "Herwiha bi",
		en: "Also in",
		ar: "متاح أيضًا بـ",
		fa: "همچنین به",
		tr: "Ayrıca",
		de: "Auch auf",
		fr: "Aussi en",
		es: "También en"
	},
	staff: {
		ckb: "دەستەی ناوخۆ",
		kmr: "Karmendên navxweyî",
		en: "Staff",
		ar: "الطاقم",
		fa: "هیئت",
		tr: "Kadro",
		de: "Redaktion",
		fr: "Rédaction",
		es: "Redacción"
	},
	promoteHint: {
		ckb: "سەرپەرشتیار دەتوانێت خوێنەر بکاتە نووسەر یان سەرنووسەر.",
		kmr: "Superadmin dikare xwîner bike nivîskar an edîtor.",
		en: "A superadmin can promote readers to writers or editors.",
		ar: "المشرف الأعلى يرقّي القرّاء إلى كتّاب أو محررين.",
		fa: "مدیر کل می‌تواند خواننده را نویسنده یا دبیر کند.",
		tr: "Süper yönetici okuru yazar veya editör yapabilir.",
		de: "Ein Superadmin kann Leser zu Autoren oder Redakteuren machen.",
		fr: "Un superadmin peut promouvoir un lecteur auteur ou éditeur.",
		es: "Un superadmin puede hacer autor o editor a un lector."
	}
};
function t(lang, key) {
	const row = DICT[key];
	return row[lang] ?? row.en ?? row.ckb ?? key;
}
function typeLabel(lang, type) {
	if (type === "premium") return t(lang, "premium");
	if (type === "scientific") return t(lang, "scientific");
	return t(lang, "standard");
}
function statusLabel(lang, status) {
	if (status === "review") return t(lang, "inReview");
	if (status === "published") return t(lang, "published");
	if (status === "rejected") return t(lang, "returned");
	return t(lang, "draft");
}
function roleLabel(lang, role) {
	if (role === "superadmin") return t(lang, "superadmin");
	if (role === "editor") return t(lang, "editor");
	if (role === "writer") return t(lang, "writer");
	return t(lang, "reader");
}
var WEEKDAYS = {
	ckb: [
		"یەکشەممە",
		"دووشەممە",
		"سێشەممە",
		"چوارشەممە",
		"پێنجشەممە",
		"هەینی",
		"شەممە"
	],
	kmr: [
		"Yekşem",
		"Duşem",
		"Sêşem",
		"Çarşem",
		"Pêncşem",
		"În",
		"Şemî"
	],
	en: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	ar: [
		"الأحد",
		"الاثنين",
		"الثلاثاء",
		"الأربعاء",
		"الخميس",
		"الجمعة",
		"السبت"
	],
	fa: [
		"یکشنبه",
		"دوشنبه",
		"سه‌شنبه",
		"چهارشنبه",
		"پنجشنبه",
		"جمعه",
		"شنبه"
	],
	tr: [
		"Pazar",
		"Pazartesi",
		"Salı",
		"Çarşamba",
		"Perşembe",
		"Cuma",
		"Cumartesi"
	],
	de: [
		"Sonntag",
		"Montag",
		"Dienstag",
		"Mittwoch",
		"Donnerstag",
		"Freitag",
		"Samstag"
	],
	fr: [
		"dimanche",
		"lundi",
		"mardi",
		"mercredi",
		"jeudi",
		"vendredi",
		"samedi"
	],
	es: [
		"domingo",
		"lunes",
		"martes",
		"miércoles",
		"jueves",
		"viernes",
		"sábado"
	]
};
var MONTHS = {
	ckb: [
		"کانوونی دووەم",
		"شوبات",
		"ئازار",
		"نیسان",
		"ئایار",
		"حوزەیران",
		"تەممووز",
		"ئاب",
		"ئەیلوول",
		"تشرینی یەکەم",
		"تشرینی دووەم",
		"کانوونی یەکەم"
	],
	kmr: [
		"rêbendan",
		"reşemî",
		"adar",
		"avrêl",
		"gulan",
		"hezîran",
		"tîrmeh",
		"tebax",
		"îlon",
		"cotmeh",
		"mijdar",
		"kanûn"
	],
	en: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	ar: [
		"يناير",
		"فبراير",
		"مارس",
		"أبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر"
	],
	fa: [
		"ژانویه",
		"فوریه",
		"مارس",
		"آوریل",
		"مه",
		"ژوئن",
		"ژوئیه",
		"اوت",
		"سپتامبر",
		"اکتبر",
		"نوامبر",
		"دسامبر"
	],
	tr: [
		"Ocak",
		"Şubat",
		"Mart",
		"Nisan",
		"Mayıs",
		"Haziran",
		"Temmuz",
		"Ağustos",
		"Eylül",
		"Ekim",
		"Kasım",
		"Aralık"
	],
	de: [
		"Januar",
		"Februar",
		"März",
		"April",
		"Mai",
		"Juni",
		"Juli",
		"August",
		"September",
		"Oktober",
		"November",
		"Dezember"
	],
	fr: [
		"janvier",
		"février",
		"mars",
		"avril",
		"mai",
		"juin",
		"juillet",
		"août",
		"septembre",
		"octobre",
		"novembre",
		"décembre"
	],
	es: [
		"enero",
		"febrero",
		"marzo",
		"abril",
		"mayo",
		"junio",
		"julio",
		"agosto",
		"septiembre",
		"octubre",
		"noviembre",
		"diciembre"
	]
};
function formatWhen(lang, iso, withWeekday = false) {
	if (!iso) return "";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	const id = isLang(lang) ? lang : "en";
	const day = date.getUTCDate();
	const month = MONTHS[id][date.getUTCMonth()] ?? "";
	const year = date.getUTCFullYear();
	const weekday = WEEKDAYS[id][date.getUTCDay()] ?? "";
	const core = id === "en" ? `${month} ${day}, ${year}` : `${day} ${month} ${year}`;
	return withWeekday ? `${weekday} · ${core}` : core;
}
function minutesOf(text) {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 180));
}
//#endregion
export { langMeta as a, statusLabel as c, isLang as i, t as l, LANGS as n, minutesOf as o, formatWhen as r, roleLabel as s, FALLBACK_LANGS as t, typeLabel as u };
