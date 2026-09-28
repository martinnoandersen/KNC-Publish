import { getSql, type Sql } from "@/lib/db";
import { applyEditorial, ensureMenus, ensureNavTable } from "./line";
import { authors, categories, pages, PLUGIN_CATALOG, stories, tags } from "./seed-data";

function dayOffset(offset: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}

async function seedNewsroom(sql: Sql) {
  const wires = await sql<{ id: number }>`select id from wires limit 1`;
  if (wires.length > 0) return;
  const lines: { lang: string; kicker: string; text: string; href: string; urgent: boolean }[] = [
    { lang: "ckb", kicker: "هەواڵی خێرا", text: "قەڵای هەولێر: گفتوگۆی نۆژەنکردنەوە دەگەڕێتەوە بۆ دانیشتووانی گردەکە، نەک تەنها بۆ میوان.", href: "/article/citadel-memory", urgent: true },
    { lang: "ckb", kicker: "ئاو", text: "ڕاپۆرتێکی نوێ لەسەر کانی و بەنداو لە ناوچە شاخاوییەکان، لە کۆڵانەوە تا دەشت.", href: "/article/highland-water", urgent: false },
    { lang: "ckb", kicker: "مۆسیقا", text: "تەمبوور لە ستۆدیۆکانی شار: چەند خێزانێک ئامێرەکە وەک بیرەوەری دەپارێزن.", href: "/article/tembur-living", urgent: false },
    { lang: "ckb", kicker: "کتێب", text: "کتێبخانەی شەو کاتژمێرەکانی خوێندنەوە درێژتر دەکاتەوە.", href: "/article/library-hour", urgent: false },
    { lang: "en", kicker: "Developing", text: "The Hewlêr citadel debate returns to the people who live on the mound, not only to visitors.", href: "/article/citadel-memory", urgent: true },
    { lang: "en", kicker: "Water", text: "A new report follows springs and dams from the highland lane down to the plain.", href: "/article/highland-water", urgent: false },
    { lang: "en", kicker: "Music", text: "In city workshops, a few families still keep the tembûr as memory, not souvenir.", href: "/article/tembur-living", urgent: false },
    { lang: "kmr", kicker: "Lezgîn", text: "Gotûbêja nûjenkirina Kela Hewlêrê vedigere ba nişteciyên gir, ne tenê ba mêvanan.", href: "/article/citadel-memory", urgent: true },
  ];
  for (const line of lines) {
    await sql`
      insert into wires (lang, kicker, text, href, urgent, active)
      values (${line.lang}, ${line.kicker}, ${line.text}, ${line.href}, ${line.urgent}, true)
    `;
  }
  const events = [
    { offset: 2, lang: "ckb", title: "گفتوگۆی ئاو", place: "دهۆک", detail: "سەرنووسەران و ئەندازیارێک لەسەر کانی و بەنداو دادەنیشن." },
    { offset: 6, lang: "ckb", title: "شەوی تەمبوور", place: "سلێمانی", detail: "سێ خێزان ئامێرەکە دەژەنن و باس لە وەرشەکە دەکەن." },
    { offset: 11, lang: "ckb", title: "گەڕان بە قەڵادا", place: "هەولێر", detail: "گەڕانێکی ئێوارە بۆ دانیشتوو و میوان، بە ژمارەیەکی سنووردار." },
    { offset: 3, lang: "en", title: "A conversation on water", place: "Dihok", detail: "Editors sit with an engineer on springs and dams." },
    { offset: 8, lang: "en", title: "Tembûr night", place: "Silêmanî", detail: "Three families play, then talk about the workshop." },
  ];
  for (const event of events) {
    await sql`
      insert into events (lang, title, place, starts_on, detail)
      values (${event.lang}, ${event.title}, ${event.place}, ${dayOffset(event.offset)}, ${event.detail})
    `;
  }
  const notes = [
    { lang: "ckb", group: "citadel-memory", note: "ژمارەی «حەوت هەزار ساڵ» لە سەرچاوەی شوێنەوارناسییەوە هاتووە و وەک خەمڵاندن نووسراوە، نەک وەک ڕۆژێکی تۆمارکراو." },
    { lang: "en", group: "citadel-memory", note: "“Seven thousand years” is an archaeological estimate, not a recorded founding day. The sentence has been left as an estimate." },
  ];
  for (const note of notes) {
    await sql`
      insert into corrections (group_key, lang, note) values (${note.group}, ${note.lang}, ${note.note})
    `;
  }
}

export async function ensureSeed(): Promise<void> {
  const sql = await getSql();
  await ensureNavTable(sql);
  await ensureLibrary(sql);
  const { ensurePush } = await import("./push.server");
  await ensurePush(sql);
  await ensureAuthorNames(sql);
  const { ensureReaderArticles } = await import("./readers");
  await ensureReaderArticles(sql);
  const flag = await sql<{ value: string }>`select value from settings where key = 'seed_version'`;
  const version = flag[0]?.value;
  if (version === "11") {
    await ensureMenus(sql);
    return;
  }
  if (!version) {
    await seedCore(sql);
  }
  if (!version || version < "8") {
    await applyEditorial(sql);
    if (!version || version < "4") {
      await sql`delete from nav_items`;
    }
    await ensureMenus(sql);
  }
  const { defaultEnabledLangs } = await import("@/lib/i18n");
  await sql`
    insert into settings (key, value) values ('logo', '/media/knc-logo.png')
    on conflict (key) do update set value = '/media/knc-logo.png'
  `;
  await sql`
    insert into settings (key, value) values ('enabled_langs', ${JSON.stringify(defaultEnabledLangs())})
    on conflict (key) do update set value = ${JSON.stringify(defaultEnabledLangs())}
  `;
  const { applyHebrew } = await import("./hebrew");
  await applyHebrew(sql);
  await sql`
    insert into settings (key, value) values ('seed_version', '11')
    on conflict (key) do update set value = '11'
  `;
}

async function ensureAuthorNames(sql: Sql): Promise<void> {
  const names: Record<string, Record<string, string>> = {
    "ava-hama": { ckb: "ئاڤا حەمە", kmr: "Ava Heme", en: "Ava Hama", he: "אווה חמה" },
    "diyar-osman": { ckb: "دیار عوسمان", kmr: "Diyar Osman", en: "Diyar Osman", he: "דיאר עוסמאן" },
    "rojin-baran": { ckb: "ڕۆژین بارانی", kmr: "Rojîn Baranî", en: "Rojin Barani", he: "רוז׳ין באראן" },
    "sherko-miran": { ckb: "شێرکۆ میران", kmr: "Şêrko Mîran", en: "Sherko Miran", he: "שרקו מיראן" },
  };
  const rows = await sql<{ slug: string; display_name: string }>`select slug, display_name from profiles`;
  for (const row of rows) {
    const pack = names[row.slug];
    if (!pack) continue;
    let obj: Record<string, string> = {};
    const raw = String(row.display_name ?? "");
    if (raw.trim().startsWith("{")) {
      try {
        const parsed = JSON.parse(raw) as Record<string, string>;
        if (parsed && typeof parsed === "object") obj = parsed;
      } catch {
        obj = { ckb: raw };
      }
    } else if (raw) obj = { ckb: raw };
    let changed = false;
    for (const [key, value] of Object.entries(pack)) {
      if (!obj[key]) {
        obj[key] = value;
        changed = true;
      }
    }
    if (changed) {
      await sql`update profiles set display_name = ${JSON.stringify(obj)} where slug = ${row.slug}`;
    }
  }
}

async function ensureLibrary(sql: Sql): Promise<void> {
  await sql`alter table articles add column if not exists files text not null default '[]'`;
  await sql`alter table articles add column if not exists subtitle text not null default ''`;
  await sql`
    create table if not exists publications (
      id serial primary key,
      lang text not null,
      title text not null,
      dek text not null default '',
      year text not null default '',
      cover text not null default '',
      url text not null
    )
  `;
  await sql`alter table publications add column if not exists kind text not null default 'book'`;
  await sql`alter table publications add column if not exists issue text not null default ''`;
  const books = await sql<{ n: number }>`select count(*)::int as n from publications where kind = 'book'`;
  if ((Number(books[0]?.n) || 0) === 0) {
  const rows = [
    ["ckb", "نووسینی دەستوور", "دەقێکی بنەڕەتی بۆ دەوڵەت: ئەنجومەن، دادگا، خەزێنە و شوێنی سوپای نیشتمانی.", "2026", "/media/constitution.jpg", "/publications/destur.pdf"],
    ["kmr", "Nivîsandina destûrê", "Nivîseke bingehîn ji bo dewletê.", "2026", "/media/constitution.jpg", "/publications/destur.pdf"],
    ["en", "Writing the constitution", "A basic text for a state: assembly, court, treasury, and the place of a national army.", "2026", "/media/constitution.jpg", "/publications/destur.pdf"],
    ["ckb", "ئەقڵی دەوڵەت", "زانستی دەوڵەت: سەروەری، هاوڵاتی، دەستوور و دامەزراوە.", "2026", "/media/archive.jpg", "/publications/aqil.pdf"],
    ["kmr", "Aqilê dewletê", "Zanista dewletê: serwerî, hemwelatî, destûr û sazî.", "2026", "/media/archive.jpg", "/publications/aqil.pdf"],
    ["en", "State reason", "The science of the state: sovereignty, citizenship, constitution and institutions.", "2026", "/media/archive.jpg", "/publications/aqil.pdf"],
    ["ckb", "دامەزراوەکانی دەوڵەت", "لە بەڕێوەبردنەوە بۆ دامەزراندن. سوپای نیشتمانی وەک دامەزراوەی دەستووری.", "2026", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ["kmr", "Saziyên dewletê", "Ji birêvebirinê ber bi avakirinê.", "2026", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ["en", "Institutions of the state", "From administration to institutionalization. A national army as a constitutional institution.", "2026", "/media/institutions.jpg", "/publications/sazi.pdf"],
  ];
  for (const [lang, title, dek, year, cover, url] of rows) {
    await sql`
      insert into publications (lang, title, dek, year, cover, url, kind, issue)
      values (${lang}, ${title}, ${dek}, ${year}, ${cover}, ${url}, 'book', '')
    `;
  }
  }
  const issues = await sql<{ n: number }>`select count(*)::int as n from publications where kind = 'magazine'`;
  if ((Number(issues[0]?.n) || 0) > 0) return;
  const magazine = [
    ["ckb", "کۆنگرە", "ژمارەی یەکەم. وتار لەسەر ڕزگاری، دەوڵەتسازی و نەتەوە.", "2026", "١", "/media/congress.jpg", "/publications/destur.pdf"],
    ["kmr", "Kongre", "Hejmara yekem. Gotar li ser rizgarî, avakirina dewletê û netewê.", "2026", "1", "/media/congress.jpg", "/publications/destur.pdf"],
    ["en", "Kongre", "Issue one. Essays on liberation, state formation, and the nation.", "2026", "1", "/media/congress.jpg", "/publications/destur.pdf"],
    ["ckb", "کۆنگرە", "ژمارەی دووەم. دامەزراوە، دەستوور و سوپای نیشتمانی.", "2026", "٢", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ["kmr", "Kongre", "Hejmara duyem. Sazî, destûr û artêşa niştimanî.", "2026", "2", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ["en", "Kongre", "Issue two. Institutions, the constitution, and a national army.", "2026", "2", "/media/institutions.jpg", "/publications/sazi.pdf"],
    ["ckb", "کۆنگرە", "ژمارەی سێیەم. ئەقڵی دەوڵەت و یەک وڵات.", "2026", "٣", "/media/one-country.jpg", "/publications/aqil.pdf"],
    ["kmr", "Kongre", "Hejmara sêyem. Aqilê dewletê û yek welat.", "2026", "3", "/media/one-country.jpg", "/publications/aqil.pdf"],
    ["en", "Kongre", "Issue three. State reason, and one country.", "2026", "3", "/media/one-country.jpg", "/publications/aqil.pdf"],
  ];
  for (const [lang, title, dek, year, issue, cover, url] of magazine) {
    await sql`
      insert into publications (lang, title, dek, year, cover, url, kind, issue)
      values (${lang}, ${title}, ${dek}, ${year}, ${cover}, ${url}, 'magazine', ${issue})
    `;
  }
}

async function seedCore(sql: Sql): Promise<void> {

  for (const author of authors) {
    await sql`
      insert into profiles (
        user_id, slug, display_name, role, title, location, languages, email_public,
        bio, education, experience, is_staff
      ) values (
        ${author.id},
        ${author.slug},
        ${JSON.stringify(author.name)},
        'writer',
        ${JSON.stringify(author.title)},
        ${JSON.stringify(author.location)},
        ${author.languages},
        ${author.email},
        ${JSON.stringify(author.bio)},
        ${JSON.stringify(author.education)},
        ${JSON.stringify(author.experience)},
        true
      )
      on conflict (user_id) do nothing
    `;
  }

  for (const category of categories) {
    await sql`
      insert into categories (slug, name, sort)
      values (${category.slug}, ${JSON.stringify(category.name)}, ${category.sort})
      on conflict (slug) do nothing
    `;
  }

  for (const tag of tags) {
    await sql`
      insert into tags (slug, name) values (${tag.slug}, ${JSON.stringify(tag.name)})
      on conflict (slug) do nothing
    `;
  }

  const tagRows = await sql<{ id: number; slug: string }>`select id, slug from tags`;
  const tagId = new Map(tagRows.map((row) => [row.slug, row.id]));

  for (const story of stories) {
    for (const [lang, copy] of Object.entries(story.copy)) {
      const publishedAt =
        story.status === "published"
          ? new Date(Date.now() - story.daysAgo * 86400000).toISOString()
          : null;
      await sql`
        insert into articles (
          group_key, lang, kind, type, status, title, dek, body, image, image_caption,
          category_slug, author_id, refs, views, published_at
        ) values (
          ${story.group},
          ${lang},
          ${story.kind},
          ${story.type},
          ${story.status},
          ${copy.title},
          ${copy.dek},
          ${copy.body},
          ${story.image},
          ${story.caption[lang] ?? story.caption.en ?? story.caption.ckb ?? ""},
          ${story.category},
          ${story.author},
          ${JSON.stringify(story.refs)},
          ${story.views},
          ${publishedAt}
        )
        on conflict (group_key, lang) do nothing
      `;
      const found = await sql<{ id: number }>`
        select id from articles where group_key = ${story.group} and lang = ${lang}
      `;
      const id = found[0]?.id;
      if (!id) continue;
      for (const zone of story.zones) {
        await sql`
          insert into placements (article_id, zone) values (${id}, ${zone})
          on conflict do nothing
        `;
      }
      for (const slug of story.tags) {
        const tid = tagId.get(slug);
        if (!tid) continue;
        await sql`
          insert into article_tags (article_id, tag_id) values (${id}, ${tid})
          on conflict do nothing
        `;
      }
    }
  }

  for (const page of pages) {
    for (const [lang, copy] of Object.entries(page.copy)) {
      await sql`
        insert into pages (slug, lang, title, body, status)
        values (${page.slug}, ${lang}, ${copy.title}, ${copy.body}, 'published')
        on conflict (slug, lang) do nothing
      `;
    }
  }

  await sql`
    insert into settings (key, value) values ('theme', 'classic')
    on conflict (key) do nothing
  `;
  await sql`
    insert into settings (key, value) values ('logo', '')
    on conflict (key) do nothing
  `;
  for (const plugin of PLUGIN_CATALOG) {
    await sql`
      insert into plugins (slug, enabled) values (${plugin.slug}, true)
      on conflict (slug) do nothing
    `;
  }
  await seedNewsroom(sql);
}
