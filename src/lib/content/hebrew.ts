import type { Sql } from "@/lib/db";

type Copy = { title: string; dek: string; caption: string; body: string };

const p = (...parts: string[]) => parts.join("\n\n");

export const HEBREW_ARTICLES: Record<string, Copy> = {
  "citadel-memory": {
    title: "היכן מתחילה תבונת המדינה",
    dek: "מדינה אינה נוסדת על תרבות או על שפה. היא מתחילה כאשר אומה לומדת לחשוב כמדינה.",
    caption: "סופרים דנים בתבונת המדינה.",
    body: p(
      "כורדיסטן היא ארץ כבושה, והכורדים הם אומה. שני המשפטים האלה עדיין אינם מדינה. מדינה מתחילה כאשר עם יכול לומר מהי מדינה: טריטוריה, אוכלוסייה, סמכות, חוק, ומוסד שמחזיק את הארבעה בהחלטה אחת.",
      "זוהי תבונת המדינה. זהו מדע ציבורי, לא רגש תרבותי. לאומה יכולים להיות שפה וזיכרון ועדיין לא תהיה לה מדינה. כינון מדינה מתחיל כאשר השאלה משתנה: לא איך אנו חיים, אלא איך אנו מושלים.",
      "מאמר זה עוסק בתבונת המדינה: אדמה, עם, סמכות וחוק בהחלטה אחת.",
    ),
  },
  "civic-decade": {
    title: "מיסוד, לא ניהול",
    dek: "שירותים על אדמה כבושה אינם מדינה. מדינה קיימת כאשר המוסדות שייכים לחוק של האומה.",
    caption: "דיון במוסדות המדינה.",
    body: p(
      "ניהול ומיסוד אינם אותו דבר. יכולים להיות בתי ספר, כבישים ומשרדים ועדיין לא תהיה מדינה, אם החוק אינו חוק האומה. מיסוד פירושו אספה, בית משפט, אוצר ושירות ציבורי השייכים למדינה, לא לשלטון כובש.",
      "הדרך שבה מדינות אחרות החלו נקראת כאן כשיטה, לא כדגם להעתקה. מי שכוננו את נורווגיה כמדינה החלו בטקסט משפטי ובמוסדות. מי שכוננו את ארצות הברית החלו בוויכוח ציבורי על ממשל. העניין אינו פדרליזם. העניין הוא איך מדינה מתחילה: טקסט, מוסדות ושיח ציבורי.",
      "הקונגרס הלאומי של כורדיסטן הוא הזירה של העבודה הזאת. מאמר זה אינו החלטה של הקונגרס. הוא מאמר על העבודה.",
    ),
  },
  "digital-corpus": {
    title: "מדע המדינה: שיח שהופך מדינה לאפשרית",
    dek: "תבונת המדינה היא ענף של ידע. השאלה היא איך אומה יכולה לדעת מהי מדינה לפני שהמדינה הושלמה.",
    caption: "מקורות במדע המדינה.",
    body: p(
      "כינון מדינה בלי שיח מדעי נשאר חסר. אומה צריכה להגדיר את המושגים: ריבונות, אזרחות, חוקה, מוסד, וההבדל בין מפלגה למדינה. זה אינו בלשנות. זהו מדע המדינה.",
      "ב־1814 נורווגיה כתבה חוקה לפני שהמדינה הייתה מובטחת. באמריקה, מאמרי הפדרליסט היו ויכוח ציבורי על השאלה אם מדינה נוסדת בהחלטה ולא רק במנהג. קריאת הדוגמאות האלה לכורדיסטן אינה אימוץ של פדרליזם. פירושה שמדינה מתחילה בשיח ובטקסט.",
      "## מקורות\n\nזהו מאמר מדעי. המקורות בסופו. המסקנה פוליטית, אבל השיטה היא מדע המדינה: מושג, השוואה, וגבול ההשוואה.",
    ),
  },
  "tea-square": {
    title: "הקונגרס הוא זירה של רצון, לא לשכת עיתונות",
    dek: "הקונגרס הלאומי של כורדיסטן הוא מקום של הכרעה פוליטית. האתר הזה הוא מקום למאמרים.",
    caption: "מאמר על ההבדל בין הקונגרס לאתר המאמרים.",
    body: p(
      "הקונגרס הלאומי של כורדיסטן הוא הזירה לכינוס הרצון הפוליטי לקראת שחרור וכינון מדינה. עבודתו היא כינון מדינה: תבונת מדינה, חוקה ומוסדות.",
      "> מאמר באתר הזה אינו החלטה של הקונגרס. הוא דעתו של אדם הקשור לקונגרס.",
      "הקורא קורא כאן מאמרים על זירת הרצון הפוליטי.",
    ),
  },
  "tembur-living": {
    title: "צבא לאומי כמוסד חוקתי",
    dek: "מדינה שאינה ממקמת את הצבא בחוקה לא השלימה את המיסוד. זהו מאמר משפטי, לא מדריך צבאי.",
    caption: "הצבא הלאומי כמוסד.",
    body: p(
      "צבא לאומי הוא מוסד של המדינה, כמו אספה, בית משפט ואוצר. השאלה במאמר הזה אינה צבאית. היא חוקתית: הצבא שייך למדינה ולא למפלגה; פיקודו בא מן החוק; גבולו כתוב בטקסט ציבורי.",
      "בחוקה של נורווגיה ובחוקה של ארצות הברית יש לכוח המזוין מקום משפטי, מפני שהמכוננים לא ראו מדינה שלמה בלי המוסד הזה. הקריאה הזאת לכורדיסטן אינה הצעת פדרליזם. היא הכרה בכך שכינון מדינה בלי מוסד של הגנה נשאר חסר.",
      "מאמר זה אינו מדריך ואינו הודעה של הקונגרס. הוא מאמר על מקומו של צבא לאומי בתוך תבונת המדינה.",
    ),
  },
  "highland-water": {
    title: "אדמה כמושא של חוק, לא כנוף",
    dek: "ריבונות על טריטוריה היא מושג משפטי. מים, גבולות ואוצר הם עניין למוסדות.",
    caption: "אדמת כורדיסטן כעניין של מדינה.",
    body: p(
      "כאשר הנושא הוא מים, מישור וגבול, השאלה הנכונה אינה עד כמה הנוף יפה. השאלה היא איזה חוק מצווה על הטריטוריה. בארץ כבושה החוק הזה אינו חוק האומה. כינון מדינה מחליף את החוק.",
      "מוסדות הטריטוריה הם מרשם גבולות, בית משפט לקניין, וסמכות ציבורית שהחלטתה אחת. בלי המוסדות האלה האדמה נשארת אדמה, אבל אינה מדינה.",
      "## מקורות\n\nזהו מאמר מדעי. הנושא הוא ריבונות, לא כתיבת מסע.",
    ),
  },
  "harvest-week": {
    title: "אוצר ומטבע, מוסדות של עצמאות",
    dek: "מדינה בלי אוצר ובלי חוק כספים ציבורי היא שם בלבד. עצמאות כאן היא מוסד.",
    caption: "האוצר כמוסד של המדינה.",
    body: p(
      "יבול ושוק נעשים חלק ממדינה כאשר תקציב, מס, מכס ומטבע יושבים תחת חוק ציבורי אחד. עד אז יש כלכלה, אבל אין מוסדות של מדינה.",
      "מי שכוננו מדינות במקומות אחרים שאלו תחילה מי גובה, מי מוציא, ותחת איזה טקסט. אותה שאלה שייכת לכורדיסטן. התשובה אינה פדרליזם. התשובה היא אוצר של מדינה עצמה.",
    ),
  },
  "two-alphabets": {
    title: "כתיבת החוקה, הטקסט הראשון של מדינה",
    dek: "מדינה מתחילה בטקסט יסודי. חוקה היא תבונת המדינה לאחר שהפכה לחוק.",
    caption: "חוקה כטקסט מכונן.",
    body: p(
      "חוקה אינה שיר ואינה סיסמה. היא טקסט שאומר מאין באה הסמכות, מי מחוקק, מהו בית משפט, של מי האוצר, ותחת פיקודו של מי עומד הצבא. בלי הטקסט הזה למוסדות יש שמות ואין יסוד.",
      "השיטה נלמדת מן הדרך שבה מדינות החלו. אספה מכוננת, ויכוח ציבורי, טקסט, ואימוץ. נורווגיה ב־1814 והוויכוח המכונן באמריקה נקראים כאן כשיטה, לא כמפה פוליטית לכורדיסטן. המטרה של כורדיסטן היא עצמאות ומדינה משלה.",
      "## מקורות\n\nהמקורות הם לתולדות החוקות, לא להעתקת צורתו של מישהו אחר.",
    ),
  },
  "bazaar-evening": {
    title: "דין מסחרי כמוסד",
    dek: "שוק בלי מכס ובלי דיני חוזים אינו נעשה חלק ממדינה.",
    caption: "דין כלכלי, לא תיאור של שוק.",
    body: p(
      "שוק הוא המקום שבו חי המחיר, אבל מחיר בלי מוסדות אינו ריבונות. מדינה זקוקה לדיני חוזים, לרשות מכס, ולקנה מידה אחד לכל הטריטוריה.",
      "זה אינו תיאור של חיי השוק. זהו מאמר על הדרך שבה כלכלה לאומית נעשית מוסד. עד שהמוסד הזה קיים, העצמאות אינה מתבצעת בגבול.",
    ),
  },
  "library-hour": {
    title: "ארכיון ההכרעות, זיכרונה של מדינה",
    dek: "ארכיון שהוא רק תרבות אינו מייסד מדינה. ארכיון של הכרעות הוא חלק מתבונת המדינה.",
    caption: "ארכיון של הכרעות פוליטיות.",
    body: p(
      "מדינה שומרת את זיכרונה בהכרעותיה, לא רק בשירים. פרוטוקול של אספה, נוסח של חוק וטיוטה של חוקה הם הארכיון שבו אומה יודעת איך למדה להיות מדינה.",
      "אם הקונגרס הלאומי של כורדיסטן אינו רושם את הכרעותיו, הוא חדל להיות זירה ונעשה זיכרון בלי טקסט. המאמר מבקש להבחין בין ארכיון של תרבות לארכיון של מיסוד.",
    ),
  },
  "evening-routes": {
    title: "ארץ אחת, קונגרס אחד, מפעל אחד של מדינה",
    dek: "צפון, דרום, מזרח ומערב הם ארבעה חלקים של ארץ כבושה אחת. הקונגרס הוא הזירה של מפעל מדינה אחד.",
    caption: "ארבעה חלקים, מפעל אחד של מדינה.",
    body: p(
      "הגבולות של עכשיו אינם מפת האומה. הם מפת הכיבוש. הקונגרס הלאומי של כורדיסטן קיים כדי לכנס את רצונם של החלקים האלה בזירה אחת, לעצמאות ולמיסוד של מדינה.",
      "הקונגרס הלאומי של כורדיסטן הוא הזירה של העבודה הזאת. כאן העבודה היא כינון מדינה, דרך תבונת מדינה, חוקה ומוסדות.",
      "המאמר הזה לקורא הכללי, על ארץ אחת ועל מפעל אחד של מדינה.",
    ),
  },
};

const HEBREW_CATEGORIES: Record<string, string> = {
  kurdistan: "כורדיסטן הכבושה",
  politics: "תבונת המדינה",
  culture: "מוסדות",
  science: "חוקה",
  society: "כינון מדינה",
  opinion: "דעה",
};

const HEBREW_MENU = [
  { label: "תבונת המדינה", href: "/section/politics", mega: true, children: [
    { label: "היכן זה מתחיל", href: "/article/citadel-memory" },
    { label: "ארכיון ההכרעות", href: "/article/library-hour" },
  ] },
  { label: "מוסדות", href: "/section/culture", mega: true, children: [
    { label: "מיסוד", href: "/article/civic-decade" },
  ] },
  { label: "חוקה", href: "/section/science", mega: true, children: [
    { label: "מדע המדינה", href: "/article/digital-corpus" },
    { label: "כתיבת החוקה", href: "/article/two-alphabets" },
  ] },
  { label: "כינון מדינה", href: "/section/society", mega: true, children: [
    { label: "צבא לאומי", href: "/article/tembur-living" },
    { label: "אוצר", href: "/article/harvest-week" },
  ] },
  { label: "כורדיסטן", href: "/section/kurdistan", mega: false, children: [] },
  { label: "דעה", href: "/section/opinion", mega: false, children: [] },
  { label: "קונגרה", href: "/kongre", mega: false, children: [] },
  { label: "ספרים", href: "/books", mega: false, children: [] },
];

export async function applyHebrew(sql: Sql): Promise<void> {
  for (const [group, copy] of Object.entries(HEBREW_ARTICLES)) {
    const found = await sql<{ id: number }>`select id from articles where group_key = ${group} and lang = 'he'`;
    if (found[0]) {
      await sql`
        update articles set title = ${copy.title}, dek = ${copy.dek}, body = ${copy.body}, image_caption = ${copy.caption}, updated_at = now()
        where id = ${found[0].id}
      `;
      continue;
    }
    const base = await sql<{ id: number }>`
      select id from articles where group_key = ${group} and lang = 'en'
    `;
    const baseId = base[0]?.id ?? (await sql<{ id: number }>`
      select id from articles where group_key = ${group} and lang = 'ckb'
    `)[0]?.id;
    if (!baseId) continue;
    const inserted = await sql<{ id: number }>`
      insert into articles (
        group_key, lang, kind, type, status, title, subtitle, dek, body, image, image_caption,
        category_slug, author_id, refs, files, views, published_at
      )
      select group_key, 'he', kind, type, status, ${copy.title}, '', ${copy.dek}, ${copy.body}, image, ${copy.caption},
        category_slug, author_id, refs, files, 0, published_at
      from articles where id = ${baseId}
      returning id
    `;
    const id = inserted[0]?.id;
    if (!id) continue;
    await sql`
      insert into placements (article_id, zone)
      select ${id}, zone from placements where article_id = ${baseId}
      on conflict do nothing
    `;
    await sql`
      insert into article_tags (article_id, tag_id)
      select ${id}, tag_id from article_tags where article_id = ${baseId}
      on conflict do nothing
    `;
  }

  const cats = await sql<{ slug: string; name: string }>`select slug, name from categories`;
  for (const cat of cats) {
    const he = HEBREW_CATEGORIES[cat.slug];
    if (!he) continue;
    let name = asRecord(cat.name);
    name.he = he;
    await sql`update categories set name = ${JSON.stringify(name)} where slug = ${cat.slug}`;
  }

  const pages = [
    ["about", "אודות", p(
      "זהו אתר מאמרים. המאמרים נכתבים בידי אנשים הקשורים לקונגרס הלאומי של כורדיסטן.",
      "הקונגרס הלאומי של כורדיסטן הוא זירת ההכרעה הפוליטית לשחרור כורדיסטן ולכינון מדינה. העבודה עוברת דרך תבונת המדינה, חוקה ומוסדות.",
      "kncsite.com, kurdistankongress.com, kurdistankongress.net, kurdistankongress.org.",
    )],
    ["ethics", "כללי כתיבה", p(
      "השמות נכתבים כהלכה. הכרעה ומאמר אינם מתערבבים.",
      "השם הוא הקונגרס הלאומי של כורדיסטן, KNC.",
      "המטרה היא עצמאות וכינון מדינה. פדרליזם ואוטונומיה אינם התוכנית של המאמרים האלה.",
    )],
    ["contact", "קשר", p("למכתב אל המערכת: העורך קורא. מאמר באתר אינו הודעה של הקונגרס.")],
  ] as const;
  for (const [slug, title, body] of pages) {
    const row = await sql<{ id: number }>`select id from pages where slug = ${slug} and lang = 'he'`;
    if (row[0]) {
      await sql`update pages set title = ${title}, body = ${body} where id = ${row[0].id}`;
    } else {
      await sql`insert into pages (slug, lang, title, body, status) values (${slug}, 'he', ${title}, ${body}, 'published')`;
    }
  }

  const wires = await sql<{ n: number }>`select count(*)::int as n from wires where lang = 'he'`;
  if ((Number(wires[0]?.n) || 0) === 0) {
    const lines = [
      ["חוקה", "מדינה מתחילה בטקסט יסודי: אספה, חוק, אוצר, ומקומו של הצבא בחוקה.", "/article/two-alphabets", true],
      ["KNC", "הקונגרס הלאומי של כורדיסטן הוא זירה של כינון מדינה.", "/article/tea-square", false],
      ["מוסדות", "ניהול על אדמה כבושה אינו מדינה. מיסוד הוא החוק של האומה.", "/article/civic-decade", false],
    ] as const;
    for (const [kicker, text, href, urgent] of lines) {
      await sql`insert into wires (lang, kicker, text, href, urgent, active) values ('he', ${kicker}, ${text}, ${href}, ${urgent}, true)`;
    }
  }

  const nav = await sql<{ n: number }>`select count(*)::int as n from nav_items where lang = 'he'`;
  if ((Number(nav[0]?.n) || 0) === 0) {
    let sort = 0;
    for (const item of HEBREW_MENU) {
      sort += 1;
      const inserted = await sql<{ id: number }>`
        insert into nav_items (lang, label, href, parent_id, sort, mega)
        values ('he', ${item.label}, ${item.href}, ${null}, ${sort}, ${item.mega})
        returning id
      `;
      const parent = inserted[0]?.id;
      if (!parent) continue;
      let childSort = 0;
      for (const child of item.children) {
        childSort += 1;
        await sql`
          insert into nav_items (lang, label, href, parent_id, sort, mega)
          values ('he', ${child.label}, ${child.href}, ${parent}, ${childSort}, ${false})
        `;
      }
    }
  }

  const books = await sql<{ n: number }>`select count(*)::int as n from publications where lang = 'he' and kind = 'book'`;
  if ((Number(books[0]?.n) || 0) === 0) {
    const rows = [
      ["כתיבת החוקה", "טקסט יסודי למדינה: אספה, בית משפט, אוצר ומקומו של צבא לאומי.", "2026", "/media/constitution.jpg", "/publications/destur.pdf"],
      ["תבונת המדינה", "מדע המדינה: ריבונות, אזרחות, חוקה ומוסדות.", "2026", "/media/archive.jpg", "/publications/aqil.pdf"],
      ["מוסדות המדינה", "מניהול אל מיסוד. צבא לאומי כמוסד חוקתי.", "2026", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ];
    for (const [title, dek, year, cover, url] of rows) {
      await sql`insert into publications (lang, title, dek, year, cover, url, kind, issue) values ('he', ${title}, ${dek}, ${year}, ${cover}, ${url}, 'book', '')`;
    }
  }
  const issues = await sql<{ n: number }>`select count(*)::int as n from publications where lang = 'he' and kind = 'magazine'`;
  if ((Number(issues[0]?.n) || 0) === 0) {
    const rows = [
      ["1", "קונגרה", "גיליון ראשון. מאמרים על שחרור, כינון מדינה ואומה.", "/media/congress.jpg", "/publications/destur.pdf"],
      ["2", "קונגרה", "גיליון שני. מוסדות, חוקה וצבא לאומי.", "/media/institutions.jpg", "/publications/sazi.pdf"],
      ["3", "קונגרה", "גיליון שלישי. תבונת המדינה וארץ אחת.", "/media/one-country.jpg", "/publications/aqil.pdf"],
    ];
    for (const [issue, title, dek, cover, url] of rows) {
      await sql`insert into publications (lang, title, dek, year, cover, url, kind, issue) values ('he', ${title}, ${dek}, '2026', ${cover}, ${url}, 'magazine', ${issue})`;
    }
  }

  const people = [
    ["staff:ava", "אווה חמה", "כותבת על תבונת המדינה", "אווה חמה כותבת על תבונת המדינה. היא קשורה לקונגרס הלאומי של כורדיסטן."],
    ["staff:diyar", "דיאר עוסמאן", "כותב על מוסדות", "דיאר עוסמאן כותב על מיסוד: בתי משפט, אוצר, מרשמים."],
    ["staff:rojin", "רוז׳ין באראן", "כותבת על החוקה", "רוז׳ין באראן כותבת על כתיבת חוקה ועל ההבדל בין ניהול למיסוד."],
    ["staff:sherko", "שרקו מיראן", "בעל טור על כינון מדינה", "שרקו מיראן כותב על כינון מדינה. הוא רואה בכורדיסטן ארץ כבושה, ובקונגרס את זירת העבודה."],
  ];
  for (const [id, display, title, bio] of people) {
    const rows = await sql<{ title: string; bio: string; display_name: string }>`select title, bio, display_name from profiles where user_id = ${id}`;
    const row = rows[0];
    if (!row) continue;
    const titles = asRecord(row.title);
    const bios = asRecord(row.bio);
    const names = asRecord(row.display_name);
    titles.he = title;
    bios.he = bio;
    names.he = display;
    await sql`update profiles set title = ${JSON.stringify(titles)}, bio = ${JSON.stringify(bios)}, display_name = ${JSON.stringify(names)} where user_id = ${id}`;
  }
  const tagHe: Record<string, string> = {
    "hewlêr": "הוליר",
    language: "שפה",
    city: "עיר",
    music: "מוזיקה",
    water: "מים",
    archive: "ארכיון",
    schools: "בתי ספר",
    food: "מזון",
  };
  const tags = await sql<{ slug: string; name: string }>`select slug, name from tags`;
  for (const tag of tags) {
    const he = tagHe[tag.slug];
    if (!he) continue;
    const name = asRecord(tag.name);
    name.he = he;
    await sql`update tags set name = ${JSON.stringify(name)} where slug = ${tag.slug}`;
  }
}

function asRecord(value: unknown): Record<string, string> {
  let current = value;
  for (let i = 0; i < 2 && typeof current === "string"; i += 1) {
    try { current = JSON.parse(current) as unknown; } catch { break; }
  }
  if (current && typeof current === "object" && !Array.isArray(current)) {
    return { ...(current as Record<string, string>) };
  }
  return { ckb: typeof value === "string" ? value : "" };
}
