import type { Sql } from "@/lib/db";

type LangCopy = { title: string; dek: string; body: string };
type Piece = {
  group: string;
  author: string;
  name: { ckb: string; kmr: string; en: string; he: string };
  image: string;
  category: string;
  daysAgo: number;
  views: number;
  copy: Record<"ckb" | "kmr" | "en" | "he", LangCopy>;
};

const p = (...parts: string[]) => parts.join("\n\n");

const READERS: Piece[] = [
  {
    group: "reader-constitution-first",
    author: "reader:karwan",
    name: { ckb: "کاروان ئەحمەد", kmr: "Karwan Ehmed", en: "Karwan Ahmed", he: "קרואן אחמד" },
    image: "/media/constitution.jpg",
    category: "politics",
    daysAgo: 1,
    views: 186,
    copy: {
      ckb: {
        title: "دەستوور پێش ئاھەنگ دێت",
        dek: "دەوڵەت بە ناونیشان دروست نابێت. یەکەم دەق یاسای بنەڕەتییە.",
        body: p(
          "من وەک خوێنەر دەینووسم، نەک وەک بڕیارێکی کۆنگرە. کوردستان وڵاتێکی داگیرکراوە و گەلی کورد نەتەوەیە. ئەم دوو ڕستەیە هێشتا دەوڵەت نین. دەوڵەت کاتێک دەست پێ دەکات کە دەقێکی بنەڕەتی هەبێت: خاک، خەڵک، دەسەڵات و یاسا لە یەک بڕیاردابێت.",
          "ئاھەنگ و ئاڵا دوای دەقن. ئەوانەی نەتەوەکانی تر وەک دەوڵەت دامەزراندوون، سەرەتا دەستووریان نووسیوە و دامەزراوەیان داناوە. داوای من لە وتارەکەمدا ئەوەیە کە گفتوگۆی گشتی لەسەر دەستوور بێت، نەک لەسەر ناونیشان.",
        ),
      },
      kmr: {
        title: "Destûr berî merasîmê tê",
        dek: "Dewlet bi navdêran nayê avakirin. Nivîsa yekem qanûna bingehîn e.",
        body: p(
          "Ez wek xwîner dinivîsim, ne wek biryareke kongreyê. Kurdistan welatekî dagirkirî ye û gelê kurd netewek e. Ev her du hevok hîn dewlet nînin. Dewlet dema dest pê dike ku nivîseke bingehîn hebe: ax, gel, desthilat û qanûn di yek biryarê de.",
          "Merasîm û ala piştî nivîsê ne. Yên ku neteweyên din wek dewlet ava kirine, pêşî destûr nivîsîne û sazî danîne. Daxwaza min di vê gotarê de ev e ku gotûbêja giştî li ser destûrê be, ne li ser navdêran.",
        ),
      },
      en: {
        title: "A constitution comes before a ceremony",
        dek: "A state is not made by a title. The first text is a basic law.",
        body: p(
          "I write as a reader, not as a decision of the Congress. Kurdistan is an occupied country and the Kurdish people are a nation. Those two sentences are not yet a state. A state begins when there is a founding text: land, people, authority, and law in one decision.",
          "Ceremony and a flag come after the text. Those who established other nations as states wrote a constitution first and set down institutions. What I ask in this article is that the public argument be about the constitution, not about a title.",
        ),
      },
      he: {
        title: "חוקה באה לפני טקס",
        dek: "מדינה אינה נוצרת מתואר. הטקסט הראשון הוא חוק יסוד.",
        body: p(
          "אני כותב כקורא, לא כהחלטה של הקונגרס. כורדיסטן היא ארץ כבושה והעם הכורדי הוא אומה. שני המשפטים האלה עדיין אינם מדינה. מדינה מתחילה כאשר יש טקסט מכונן: אדמה, עם, סמכות וחוק בהחלטה אחת.",
          "טקס ודגל באים אחרי הטקסט. מי שייסדו אומות אחרות כמדינות כתבו תחילה חוקה והניחו מוסדות. מה שאני מבקש במאמר הזה הוא שהוויכוח הציבורי יהיה על החוקה, לא על תואר.",
        ),
      },
    },
  },
  {
    group: "reader-treasury",
    author: "reader:shilan",
    name: { ckb: "شیلان کەریم", kmr: "Şîlan Kerîm", en: "Shilan Karim", he: "שילאן כרים" },
    image: "/media/treasury.jpg",
    category: "politics",
    daysAgo: 2,
    views: 142,
    copy: {
      ckb: {
        title: "خەزێنە سامانێکی حیزبی نییە",
        dek: "دەوڵەتی سەربەخۆ خەزێنەیەکی گشتی دەوێت، نەک سندووقێکی ڕێکخراو.",
        body: p(
          "سەربەخۆیی کاتێک دامەزراوە دەبێت کە بودجە، باج، گومرگ و دراو لەژێر یەک یاسای گشتیدا بن. تا ئەو کاتە ئابووری هەیە، بەڵام خەزێنەی دەوڵەت نییە.",
          "حیزب دەتوانێت سندووقی خۆی هەبێت. دەوڵەت نابێت. خوێنەرێک دەتوانێت ئەم جیاوازییە بخوازێت بەبێ ئەوەی بڕیارێکی کۆنگرە بدات: خەزێنە هی یاسای گشتییە، نەک هی ڕێکخراوێک.",
        ),
      },
      kmr: {
        title: "Xezîne ne milkê partiyekê ye",
        dek: "Dewleteke serbixwe xezîneyeke giştî dixwaze, ne sindoqa rêxistinekê.",
        body: p(
          "Serbixwebûn dema dibe sazî ku budce, baca, gumrik û dirav di bin yek qanûna giştî de bin. Heta wê demê aborî heye, lê xezîneya dewletê nîne.",
          "Partî dikare sindoqa xwe hebe. Dewlet nikare. Xwînerek dikare vê cudahiyê bixwaze bêyî ku biryareke kongreyê bide: xezîne ya qanûna giştî ye, ne ya rêxistinekê.",
        ),
      },
      en: {
        title: "A treasury is not a party purse",
        dek: "An independent state needs a public treasury, not an organisation’s fund.",
        body: p(
          "Independence becomes an institution when a budget, a tax, a customs post, and a currency sit under one public law. Until then there is an economy, but there is no state treasury.",
          "A party may have its own fund. A state may not be that fund. A reader can ask for the difference without issuing a decision of the Congress: the treasury belongs to public law, not to an organisation.",
        ),
      },
      he: {
        title: "אוצר אינו קופת מפלגה",
        dek: "מדינה עצמאית צריכה אוצר ציבורי, לא קופה של ארגון.",
        body: p(
          "עצמאות נעשית מוסד כאשר תקציב, מס, מכס ומטבע יושבים תחת חוק ציבורי אחד. עד אז יש כלכלה, אבל אין אוצר של מדינה.",
          "למפלגה מותר שתהיה קופה משלה. למדינה אסור שתהיה אותה קופה. קורא יכול לדרוש את ההבדל בלי לתת החלטה של הקונגרס: האוצר שייך לחוק הציבורי, לא לארגון.",
        ),
      },
    },
  },
  {
    group: "reader-citizenship",
    author: "reader:hemin",
    name: { ckb: "هێمن ساڵح", kmr: "Hêmin Salih", en: "Hemin Salih", he: "הימן סאלח" },
    image: "/media/civic.jpg",
    category: "society",
    daysAgo: 3,
    views: 121,
    copy: {
      ckb: {
        title: "هاوڵاتیبوون دۆخێکی یاساییە",
        dek: "نەتەوە هەست نییە بە تەنیا. هاوڵاتی کەسێکە کە یاسا دەیناسێت.",
        body: p(
          "گەلی کورد نەتەوەیە. هاوڵاتی شتێکی ترە: کەسێکە کە دەوڵەت ناوی، ماف و ئەرکی لە دەقێکدا دەنووسێت. بەبێ ئەو دەقە نەتەوە هەیە، بەڵام هاوڵاتیبوونی دەوڵەت نییە.",
          "ئەم وتارە داوا ناکات کۆنگرە بڕیار بدات. داوا دەکات گفتوگۆکە لەسەر پێناسەی یاسایی بێت: کێ هاوڵاتی دەوڵەتی کوردستانە، و ئەو پێناسەیە لە کام دامەزراوەدا تۆمار دەکرێت.",
        ),
      },
      kmr: {
        title: "Hemwelatî rewşeke hiqûqî ye",
        dek: "Netew tenê hest nîne. Hemwelatî kesek e ku qanûn wî dinase.",
        body: p(
          "Gelê kurd netewek e. Hemwelatî tiştekî din e: kesek e ku dewlet nav, maf û erkê wî di nivîsekê de dinivîse. Bêyî wê nivîsê netew heye, lê hemwelatiya dewletê nîne.",
          "Ev gotar naxwaze kongre biryarê bide. Dixwaze gotûbêj li ser pênaseya hiqûqî be: kî hemwelatiyê dewleta Kurdistanê ye, û ew pênase di kîjan saziyê de tê tomarkirin.",
        ),
      },
      en: {
        title: "Citizenship is a legal status",
        dek: "A nation is not only a feeling. A citizen is a person the law can name.",
        body: p(
          "The Kurdish people are a nation. A citizen is something else: a person whose name, rights, and duties a state writes into a text. Without that text there is a nation, but there is no citizenship of a state.",
          "This article does not ask the Congress to decide. It asks that the argument be about a legal definition: who is a citizen of the state of Kurdistan, and which institution records that definition.",
        ),
      },
      he: {
        title: "אזרחות היא מעמד משפטי",
        dek: "אומה אינה רק רגש. אזרח הוא אדם שהחוק יכול לקרוא בשמו.",
        body: p(
          "העם הכורדי הוא אומה. אזרח הוא דבר אחר: אדם שמדינה כותבת את שמו, זכויותיו וחובותיו בטקסט. בלי הטקסט הזה יש אומה, אבל אין אזרחות של מדינה.",
          "המאמר הזה אינו מבקש מהקונגרס להחליט. הוא מבקש שהוויכוח יהיה על הגדרה משפטית: מי הוא אזרח מדינת כורדיסטן, ואיזה מוסד רושם את ההגדרה.",
        ),
      },
    },
  },
  {
    group: "reader-one-state",
    author: "reader:narin",
    name: { ckb: "نارین دارا", kmr: "Narîn Dara", en: "Narin Dara", he: "נארין דארא" },
    image: "/media/one-country.jpg",
    category: "kurdistan",
    daysAgo: 4,
    views: 210,
    copy: {
      ckb: {
        title: "یەک وڵات، یەک دەوڵەت",
        dek: "کوردستان وڵاتێکە. دابەشبوون ئەنجامی داگیرکارییە، نەک سروشتی وڵات.",
        body: p(
          "باکوور و باشوور و ڕۆژھەڵات و ڕۆژئاوا پارچەی داگیرکراون. وڵاتەکە یەکە. ئەم وتارە بەرگری لەو یەکێتییە ناکات وەک ھەست. وەک بابەتی دەوڵەت دەیخوێنێتەوە: یەک خاک، یەک یاسا، یەک دەسەڵاتی گشتی.",
          "سەربەخۆیی لێرەدا ناونیشان نییە. دامەزراندنی ئەو دەوڵەتەیە کە ھەر چوار پارچەکە وەک یەک وڵاتی داگیرکراو دەبینێت و ئامانجی ڕزگاری و دەوڵەتسازییە.",
        ),
      },
      kmr: {
        title: "Yek welat, yek dewlet",
        dek: "Kurdistan welatek e. Parçebûn encama dagirkirinê ye, ne siruşta welat.",
        body: p(
          "Bakur, başûr, rojhilat û rojava parçeyên dagirkirî ne. Welat yek e. Ev gotar wê yekîtiyê wek hest naparêze. Wek mijara dewletê dixwîne: yek ax, yek qanûn, yek desthilata giştî.",
          "Serbixwebûn li vir ne navdêr e. Avakirina wê dewletê ye ku her çar parçeyan wek yek welatê dagirkirî dibîne û armanca wê rizgarî û avakirina dewletê ye.",
        ),
      },
      en: {
        title: "One country, one state",
        dek: "Kurdistan is one country. Partition is the result of occupation, not the nature of the country.",
        body: p(
          "The north, the south, the east, and the west are occupied parts. The country is one. This article does not defend that unity as a feeling. It reads it as a matter of state: one territory, one law, one public authority.",
          "Independence here is not a label. It is the founding of the state that sees all four parts as one occupied country, and whose aim is liberation and state formation.",
        ),
      },
      he: {
        title: "ארץ אחת, מדינה אחת",
        dek: "כורדיסטן היא ארץ אחת. החלוקה היא תוצאה של כיבוש, לא טבע הארץ.",
        body: p(
          "הצפון, הדרום, המזרח והמערב הם חלקים כבושים. הארץ אחת. המאמר הזה אינו מגן על האחדות כרגש. הוא קורא אותה כעניין של מדינה: טריטוריה אחת, חוק אחד, סמכות ציבורית אחת.",
          "עצמאות כאן אינה תווית. היא ייסוד המדינה שרואה את ארבעת החלקים כארץ כבושה אחת, ומטרתה שחרור וכינון מדינה.",
        ),
      },
    },
  },
  {
    group: "reader-national-army",
    author: "reader:rebaz",
    name: { ckb: "ڕێباز عەلی", kmr: "Rêbaz Elî", en: "Rebaz Ali", he: "רבאז עלי" },
    image: "/media/institution-flag.jpg",
    category: "politics",
    daysAgo: 5,
    views: 168,
    copy: {
      ckb: {
        title: "سوپای نیشتمانی شوێنی لە دەستووردایە",
        dek: "سوپا دامەزراوەی دەوڵەتە، نەک دەزگای حیزب. شوێنەکەی دەبێت لە دەقدا بێت.",
        body: p(
          "ئەم وتارە ڕێنمایی سەربازی نییە. پرسیارەکەی دەستوورییە. سوپای نیشتمانی، وەک پەرلەمان و دادگا و خەزێنە، دامەزراوەی دەوڵەتە. فەرماندەییەکەی لە یاساوە دێت، نەک لە ڕێکخراوێکەوە.",
          "دەوڵەتێک کە سوپا لە دەستووردا جێی نەکات، دامەزراندنی تەواو نییە. من وەک خوێنەر دەڵێم شوێنی ئەم دامەزراوەیە دەبێت لە گفتوگۆی گشتیدا بێت.",
        ),
      },
      kmr: {
        title: "Artêşa niştimanî cihê xwe di destûrê de ye",
        dek: "Artêş saziyeke dewletê ye, ne amûra partiyekê. Cihê wê divê di nivîsê de be.",
        body: p(
          "Ev gotar rêberiya leşkerî nîne. Pirsa wê destûrî ye. Artêşa niştimanî, wek meclis û dadgeh û xezîne, saziyeke dewletê ye. Fermandariya wê ji qanûnê tê, ne ji rêxistinekê.",
          "Dewleteke ku artêşê di destûrê de bi cih neke, avakirina wê ne temam e. Ez wek xwîner dibêjim cihê vê saziyê divê di gotûbêja giştî de be.",
        ),
      },
      en: {
        title: "A national army belongs in the constitution",
        dek: "An army is an institution of the state, not an instrument of a party. Its place has to be in the text.",
        body: p(
          "This article is not a military manual. Its question is constitutional. A national army, like a parliament, a court, and a treasury, is an institution of the state. Its command comes from the law, not from an organisation.",
          "A state that does not place the army in the constitution has not finished founding itself. As a reader I say the place of this institution belongs in the public argument.",
        ),
      },
      he: {
        title: "צבא לאומי מקומו בחוקה",
        dek: "צבא הוא מוסד של המדינה, לא כלי של מפלגה. מקומו חייב להיות בטקסט.",
        body: p(
          "המאמר הזה אינו מדריך צבאי. השאלה שלו חוקתית. צבא לאומי, כמו פרלמנט, בית משפט ואוצר, הוא מוסד של המדינה. הפיקוד עליו בא מן החוק, לא מארגון.",
          "מדינה שאינה ממקמת את הצבא בחוקה לא סיימה את ייסודה. כקורא אני אומר שמקומו של המוסד הזה שייך לוויכוח הציבורי.",
        ),
      },
    },
  },
  {
    group: "reader-liberation",
    author: "reader:lanja",
    name: { ckb: "لانجا قادر", kmr: "Lanya Qadir", en: "Lanja Qadir", he: "לאנג׳ה קאדר" },
    image: "/media/congress.jpg",
    category: "opinion",
    daysAgo: 6,
    views: 133,
    copy: {
      ckb: {
        title: "ڕزگاری بڕیارێکی سیاسییە",
        dek: "ڕزگاری ئاوات نییە. بڕیارە لەسەر کۆتاییھێنان بە داگیرکاری و دامەزراندنی دەوڵەت.",
        body: p(
          "کوردستان وڵاتێکی داگیرکراوە. ڕزگاری واتە کۆتاییھێنان بەو داگیرکارییە و دانانی دەوڵەتێک کە یاساکەی ھی نەتەوەکە بێت. ئەمە بابەتی ئەقڵی دەوڵەتە، نەک بابەتی ناونیشان.",
          "کۆنگرەی نیشتمانیی کوردستان گۆڕەپانی ئەم گفتوگۆیەیە. وتارەکەم بڕیاری کۆنگرە نییە. خوێندنەوەی خوێنەرێکە لەسەر ئەوەی ڕزگاری دەبێت وەک بڕیارێکی سیاسی بخوێندرێتەوە.",
        ),
      },
      kmr: {
        title: "Rizgarî biryareke siyasî ye",
        dek: "Rizgarî ne xewn e. Biryar e li ser bidawîkirina dagirkirinê û avakirina dewletê.",
        body: p(
          "Kurdistan welatekî dagirkirî ye. Rizgarî tê wateya bidawîkirina wê dagirkirinê û danîna dewleteke ku qanûna wê ya neteweyê be. Ev mijara aqilê dewletê ye, ne mijara navdêran.",
          "Kongreya Niştimanî ya Kurdistanê meydana vê gotûbêjê ye. Gotara min ne biryara kongreyê ye. Xwendina xwînerekê ye li ser wê yekê ku rizgarî divê wek biryareke siyasî were xwendin.",
        ),
      },
      en: {
        title: "Liberation is a political decision",
        dek: "Liberation is not a wish. It is a decision to end occupation and found a state.",
        body: p(
          "Kurdistan is an occupied country. Liberation means ending that occupation and founding a state whose law belongs to the nation. This is a matter of state reason, not a matter of titles.",
          "The Kurdistan National Congress is the arena of this argument. My article is not a decision of the Congress. It is a reader’s reading of liberation as a political decision.",
        ),
      },
      he: {
        title: "שחרור הוא החלטה פוליטית",
        dek: "שחרור אינו משאלה. הוא החלטה לסיים כיבוש ולייסד מדינה.",
        body: p(
          "כורדיסטן היא ארץ כבושה. שחרור פירושו סיום הכיבוש הזה וייסוד מדינה שהחוק שלה שייך לאומה. זה עניין של תבונת מדינה, לא עניין של תארים.",
          "הקונגרס הלאומי של כורדיסטן הוא הזירה של הוויכוח הזה. מאמרי אינו החלטה של הקונגרס. הוא קריאה של קורא את השחרור כהחלטה פוליטית.",
        ),
      },
    },
  },
  {
    group: "reader-assembly",
    author: "reader:hawre",
    name: { ckb: "ھاورێ جەلال", kmr: "Hawrê Celal", en: "Hawre Jalal", he: "הוורי ג׳לאל" },
    image: "/media/institutions.jpg",
    category: "politics",
    daysAgo: 7,
    views: 97,
    copy: {
      ckb: {
        title: "ئەوەی لە ئەنجومەنی دامەزرێنەر دەیخوازم",
        dek: "ئەنجومەنێکی دامەزرێنەر دەبێت دەق بنووسێت، نەک ڕاگەیاندن.",
        body: p(
          "ئەنجومەنی دامەزرێنەر شوێنی وتار نییە. شوێنی نووسینی دەستوورە: پەرلەمان، دادگا، خەزێنە، سوپا، و پێناسەی ھاوڵاتی. ئەگەر ئەم دامەزراوانە لە دەقدا نەبن، ئەنجومەنەکە تەنیا کۆبوونەوەیە.",
          "من وەک خوێنەر داوا دەکەم ئەو ئەنجومەنە بە ئاشکرا کار بکات. دەقەکە دەبێت بۆ خوێندنەوەی گشتی بێت، چونکە دەوڵەتسازی بەبێ دەقی گشتی ناتەواوە.",
        ),
      },
      kmr: {
        title: "Tiştê ku ez ji meclisa avaker dixwazim",
        dek: "Mecliseke avaker divê nivîsê binivîse, ne daxuyanî.",
        body: p(
          "Meclisa avaker ne cihê gotaran e. Cihê nivîsandina destûrê ye: meclis, dadgeh, xezîne, artêş, û pênaseya hemwelatî. Heke ev sazî di nivîsê de nebin, meclis tenê civînek e.",
          "Ez wek xwîner dixwazim ew meclis bi eşkere bixebite. Nivîs divê ji bo xwendina giştî be, ji ber ku avakirina dewletê bêyî nivîseke giştî natemam e.",
        ),
      },
      en: {
        title: "What I expect from a constituent assembly",
        dek: "A constituent assembly has to write a text, not a communiqué.",
        body: p(
          "A constituent assembly is not a place for speeches. It is the place where a constitution is written: parliament, court, treasury, army, and the definition of a citizen. If those institutions are not in the text, the assembly is only a meeting.",
          "As a reader I ask that the assembly work in public. The text has to be readable by the public, because state formation without a public text is unfinished.",
        ),
      },
      he: {
        title: "מה שאני מצפה מאספה מכוננת",
        dek: "אספה מכוננת צריכה לכתוב טקסט, לא הודעה.",
        body: p(
          "אספה מכוננת אינה מקום לנאומים. היא המקום שבו נכתבת חוקה: פרלמנט, בית משפט, אוצר, צבא, והגדרת האזרח. אם המוסדות האלה אינם בטקסט, האספה היא רק ישיבה.",
          "כקורא אני מבקש שהאספה תעבוד בגלוי. הטקסט חייב להיות קריא לציבור, מפני שכינון מדינה בלי טקסט ציבורי אינו גמור.",
        ),
      },
    },
  },
  {
    group: "reader-border",
    author: "reader:ashti",
    name: { ckb: "ئاشتی محەممەد", kmr: "Aştî Mihemed", en: "Ashti Mohammed", he: "אשתי מוחמד" },
    image: "/media/territory.jpg",
    category: "kurdistan",
    daysAgo: 8,
    views: 154,
    copy: {
      ckb: {
        title: "سنوور پرسیارێکی یاساییە",
        dek: "خاک دیمەن نییە. بابەتی یاسایە: کێ فەرمان دەدات، و لەسەر کام نەخشە.",
        body: p(
          "کاتێک باس لە سنوور و ڕووبار و دەشت دەکرێت، پرسیارە ڕاستەکە ئەوە نییە دیمەنەکە چەند جوانە. پرسیارەکە ئەوەیە کام یاسا فەرمان بە خاکەکە دەدات. لە وڵاتێکی داگیرکراودا ئەو یاسایە ھی نەتەوەکە نییە.",
          "دەوڵەتسازی یاساکە دەگۆڕێت. دامەزراوەکانی خاک تۆماری سنوور، دادگای موڵک، و دەسەڵاتێکی گشتین کە بڕیارەکەی یەک بێت. بەبێ ئەمانە خاک ھەر خاکە، بەڵام دەوڵەت نییە.",
        ),
      },
      kmr: {
        title: "Sînor pirsek hiqûqî ye",
        dek: "Ax ne dîmen e. Mijara qanûnê ye: kî fermanê dide, û li ser kîjan nexşe.",
        body: p(
          "Dema behsa sînor, çem û deştê tê kirin, pirs a rast ne ew e ku dîmen çiqas xweşik e. Pirs ev e ka kîjan qanûn fermanê dide axê. Li welatekî dagirkirî ew qanûn ne ya neteweyê ye.",
          "Avakirina dewletê qanûnê diguherîne. Saziyên axê tomara sînor, dadgeha milk, û desthilateke giştî ne ku biryara wê yek be. Bêyî van ax hîn ax e, lê ne dewlet e.",
        ),
      },
      en: {
        title: "A border is a legal question",
        dek: "Land is not a view. It is a matter of law: who commands, and on which map.",
        body: p(
          "When the subject is a border, a river, or a plain, the right question is not how fine the view is. The question is which law commands the land. In an occupied country that law is not the nation’s.",
          "State formation changes the law. The institutions of territory are a register of borders, a court of property, and a public authority whose decision is one. Without them the land remains land, but it is not a state.",
        ),
      },
      he: {
        title: "גבול הוא שאלה משפטית",
        dek: "אדמה אינה נוף. היא עניין של חוק: מי מצווה, ועל איזה מפה.",
        body: p(
          "כאשר הנושא הוא גבול, נהר או מישור, השאלה הנכונה אינה עד כמה הנוף יפה. השאלה היא איזה חוק מצווה על האדמה. בארץ כבושה החוק הזה אינו חוק האומה.",
          "כינון מדינה מחליף את החוק. מוסדות הטריטוריה הם מרשם גבולות, בית משפט לקניין, וסמכות ציבורית שהחלטתה אחת. בלי אלה האדמה נשארת אדמה, אבל אינה מדינה.",
        ),
      },
    },
  },
  {
    group: "reader-party-state",
    author: "reader:berivan",
    name: { ckb: "بەریڤان ڕەشید", kmr: "Berîvan Reşîd", en: "Berivan Rashid", he: "בריבאן רשיד" },
    image: "/media/state-reason.jpg",
    category: "opinion",
    daysAgo: 9,
    views: 176,
    copy: {
      ckb: {
        title: "حیزب دەوڵەت نییە",
        dek: "حیزب ڕێکخراوێکە. دەوڵەت دامەزراوەی یاسای گشتییە. تێکەڵکردنیان دەوڵەتسازی دەوەستێنێت.",
        body: p(
          "نەتەوە دەتوانێت چەندین حیزبی ھەبێت. دەوڵەت یەک یاسای گشتییە. کاتێک حیزب جێگەی دادگا و خەزێنە و سوپا دەگرێتەوە، دامەزراندن نەبووە بە دەوڵەت. بووە بە ڕێکخراوێک کە ناوی دەوڵەتی لێ نراوە.",
          "ئەم وتارە ھی خوێنەرێکە. داوا دەکات جیاوازییەکە لە گفتوگۆی گشتیدا بمێنێتەوە: حیزب دەتوانێت ھەڵوێست بگرێت، دەوڵەت دەبێت یاسا بێت.",
        ),
      },
      kmr: {
        title: "Partî ne dewlet e",
        dek: "Partî rêxistinek e. Dewlet saziyeke qanûna giştî ye. Tevlihevkirina wan avakirina dewletê radiwestîne.",
        body: p(
          "Netew dikare çend partiyan hebin. Dewlet yek qanûna giştî ye. Dema partî cihê dadgeh, xezîne û artêşê digire, avakirin nebûye dewlet. Bûye rêxistinek ku navê dewletê lê hatiye kirin.",
          "Ev gotar ya xwînerekê ye. Dixwaze cudahî di gotûbêja giştî de bimîne: partî dikare helwestê bigire, dewlet divê qanûn be.",
        ),
      },
      en: {
        title: "A party is not a state",
        dek: "A party is an organisation. A state is an institution of public law. Mixing them stops state formation.",
        body: p(
          "A nation can have several parties. A state is one public law. When a party takes the place of a court, a treasury, and an army, founding has not become a state. It has become an organisation with the name of a state.",
          "This article belongs to a reader. It asks that the difference stay in the public argument: a party may take a position, a state has to be law.",
        ),
      },
      he: {
        title: "מפלגה אינה מדינה",
        dek: "מפלגה היא ארגון. מדינה היא מוסד של חוק ציבורי. ערבובם עוצר את כינון המדינה.",
        body: p(
          "לאומה יכולות להיות כמה מפלגות. מדינה היא חוק ציבורי אחד. כאשר מפלגה תופסת את מקום בית המשפט, האוצר והצבא, הייסוד לא נעשה מדינה. הוא נעשה ארגון ששמו מדינה.",
          "המאמר הזה של קוראת. הוא מבקש שההבדל יישאר בוויכוח הציבורי: מפלגה רשאית לנקוט עמדה, מדינה חייבת להיות חוק.",
        ),
      },
    },
  },
  {
    group: "reader-state-reason",
    author: "reader:dara",
    name: { ckb: "دارا حەسەن", kmr: "Dara Hesen", en: "Dara Hassan", he: "דארא חסן" },
    image: "/media/customs.jpg",
    category: "science",
    daysAgo: 10,
    views: 118,
    copy: {
      ckb: {
        title: "ئەقڵی دەوڵەت، نەک ناونیشان",
        dek: "دەوڵەتسازی زانستێکی گشتییە: چەمک، دامەزراوە، و دەق.",
        body: p(
          "ئەقڵی دەوڵەت لقێکی زانستە. پرسیارەکە ئەوەیە چۆن نەتەوەیەک دەزانێت دەوڵەت چییە پێش ئەوەی دەوڵەتەکە تەواو بێت. وەڵامەکە لە چەمکدایە: سەربەخۆیی، ھاوڵاتی، دەستوور، دامەزراوە، و جیاوازیی نێوان حیزب و دەوڵەت.",
          "ئەم وتارە ڕێنمایی نییە و بڕیاری کۆنگرە نییە. خوێندنەوەی خوێنەرێکە لەسەر ئەوەی دەوڵەتسازی بەبێ ئەم چەمکانە ناتەواو دەمێنێتەوە.",
        ),
      },
      kmr: {
        title: "Aqilê dewletê, ne navdêr",
        dek: "Avakirina dewletê zanyariyeke giştî ye: têgeh, sazî, û nivîs.",
        body: p(
          "Aqilê dewletê şaxeke zanistê ye. Pirs ev e ka neteweyek çawa dizane dewlet çi ye berî ku dewlet temam bibe. Bersiv di têgehan de ye: serbixwebûn, hemwelatî, destûr, sazî, û cudahiya di navbera partî û dewletê de.",
          "Ev gotar ne rêberî ye û ne biryara kongreyê ye. Xwendina xwînerekî ye li ser wê yekê ku avakirina dewletê bêyî van têgehan natemam dimîne.",
        ),
      },
      en: {
        title: "State reason, not a title",
        dek: "State formation is a public science: concepts, institutions, and a text.",
        body: p(
          "State reason is a branch of knowledge. The question is how a nation can know what a state is before the state is complete. The answer is in the concepts: independence, citizen, constitution, institution, and the difference between a party and a state.",
          "This article is not a manual and it is not a decision of the Congress. It is a reader’s reading of the claim that state formation stays unfinished without those concepts.",
        ),
      },
      he: {
        title: "תבונת מדינה, לא תואר",
        dek: "כינון מדינה הוא מדע ציבורי: מושגים, מוסדות, וטקסט.",
        body: p(
          "תבונת מדינה היא ענף של ידע. השאלה היא איך אומה יכולה לדעת מהי מדינה לפני שהמדינה הושלמה. התשובה במושגים: עצמאות, אזרח, חוקה, מוסד, וההבדל בין מפלגה למדינה.",
          "המאמר הזה אינו מדריך ואינו החלטה של הקונגרס. הוא קריאה של קורא את הטענה שכינון מדינה נשאר חסר בלי המושגים האלה.",
        ),
      },
    },
  },
];

export async function ensureReaderArticles(sql: Sql): Promise<void> {
  const existing = await sql<{ n: number }>`
    select count(distinct a.group_key)::int as n
    from articles a
    join placements pl on pl.article_id = a.id
    where pl.zone = 'readers' and a.group_key like 'reader-%'
  `;
  if ((Number(existing[0]?.n) || 0) >= READERS.length) return;

  for (const piece of READERS) {
    const slug = piece.author.slice("reader:".length);
    await sql`
      insert into profiles (
        user_id, slug, display_name, role, title, location, languages, email_public,
        bio, education, experience, is_staff
      ) values (
        ${piece.author},
        ${slug},
        ${JSON.stringify(piece.name)},
        'reader',
        ${JSON.stringify({ ckb: "خوێنەر", kmr: "Xwîner", en: "Reader", he: "קורא" })},
        ${JSON.stringify({ ckb: "کوردستان", kmr: "Kurdistan", en: "Kurdistan", he: "כורדיסטן" })},
        ${"ckb, kmr, en, he"},
        ${""},
        ${JSON.stringify({ ckb: "خوێنەرێک کە وتار دەنێرێت.", kmr: "Xwînerek ku gotaran dişîne.", en: "A reader who sends articles.", he: "קורא ששולח מאמרים." })},
        ${"{}"},
        ${"{}"},
        false
      )
      on conflict (user_id) do nothing
    `;
    for (const lang of ["ckb", "kmr", "en", "he"] as const) {
      const copy = piece.copy[lang];
      const publishedAt = new Date(Date.now() - piece.daysAgo * 86400000).toISOString();
      await sql`
        insert into articles (
          group_key, lang, kind, type, status, title, dek, body, image, image_caption,
          category_slug, author_id, refs, views, published_at
        ) values (
          ${piece.group},
          ${lang},
          'article',
          'standard',
          'published',
          ${copy.title},
          ${copy.dek},
          ${copy.body},
          ${piece.image},
          ${""},
          ${piece.category},
          ${piece.author},
          ${"[]"},
          ${piece.views},
          ${publishedAt}
        )
        on conflict (group_key, lang) do nothing
      `;
      const found = await sql<{ id: number }>`
        select id from articles where group_key = ${piece.group} and lang = ${lang}
      `;
      const id = found[0]?.id;
      if (!id) continue;
      await sql`
        insert into placements (article_id, zone) values (${id}, 'readers')
        on conflict do nothing
      `;
    }
  }
}
