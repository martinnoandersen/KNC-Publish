import { getSql, type Sql } from "@/lib/db";
import { FALLBACK_LANGS, formatWhen, isLang, langMeta, minutesOf, parseEnabledLangs, t } from "@/lib/i18n";
import type { AuthorProfile, HomePayload, PageDoc, SearchPayload, StoryCard, StoryFull } from "./types";
import { parseLayout } from "./types";
import { asRefs, asJson, loc, locList } from "./text";
import { nestMenu } from "./line";

type Raw = {
  id: number;
  group_key: string;
  lang: string;
  kind: string;
  type: string;
  status: string;
  title: string;
  subtitle: string;
  dek: string;
  body: string;
  image: string;
  image_caption: string;
  category_slug: string;
  author_id: string;
  refs: string;
  files: string;
  views: number;
  review_note: string;
  published_at: string | null;
  display_name: string;
  author_slug: string;
  author_title: string;
};

const SELECT = `
  select a.id, a.group_key, a.lang, a.kind, a.type, a.status, a.title, a.dek, a.body,
    a.image, a.image_caption, a.category_slug, a.author_id, a.refs, a.files, a.subtitle, a.views, a.review_note,
    to_char(a.published_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as published_at,
    p.display_name, p.slug as author_slug, p.title as author_title
  from articles a
  join profiles p on p.user_id = a.author_id
`;

async function loadRows(sql: Sql, status: string | null): Promise<Raw[]> {
  if (status) {
    return sql.query<Raw>(`${SELECT} where a.status = $1`, [status]);
  }
  return sql.query<Raw>(SELECT);
}

async function maps(sql: Sql) {
  const [cats, places, links, tagRows] = await Promise.all([
    sql<{ slug: string; name: string; sort: number }>`select slug, name, sort from categories order by sort, slug`,
    sql<{ article_id: number; zone: string }>`select article_id, zone from placements`,
    sql<{ article_id: number; slug: string; name: string }>`
      select at.article_id, t.slug, t.name
      from article_tags at join tags t on t.id = at.tag_id
    `,
    sql<{ slug: string; name: string }>`select slug, name from tags order by slug`,
  ]);
  const zones = new Map<number, string[]>();
  for (const row of places) {
    const list = zones.get(row.article_id) ?? [];
    list.push(row.zone);
    zones.set(row.article_id, list);
  }
  const tags = new Map<number, { slug: string; name: string }[]>();
  for (const row of links) {
    const list = tags.get(row.article_id) ?? [];
    list.push({ slug: row.slug, name: row.name });
    tags.set(row.article_id, list);
  }
  return { cats, zones, tags, tagRows };
}

function pick(rows: Raw[], lang: string): Raw | undefined {
  return (
    rows.find((row) => row.lang === lang) ??
    FALLBACK_LANGS.map((id) => rows.find((row) => row.lang === id)).find(Boolean) ??
    rows[0]
  );
}

function groupOf(rows: Raw[]): Map<string, Raw[]> {
  const map = new Map<string, Raw[]>();
  for (const row of rows) {
    const list = map.get(row.group_key) ?? [];
    list.push(row);
    map.set(row.group_key, list);
  }
  return map;
}

function toCard(
  row: Raw,
  siblings: Raw[],
  lang: string,
  zones: Map<number, string[]>,
  tags: Map<number, { slug: string; name: string }[]>,
  catName: Map<string, string>,
): StoryCard {
  const tagList = (tags.get(row.id) ?? []).map((tag) => ({
    slug: tag.slug,
    name: loc(tag.name, lang) || tag.slug,
  }));
  return {
    id: row.id,
    groupKey: row.group_key,
    lang: row.lang,
    availableLangs: siblings.map((item) => item.lang),
    kind: row.kind,
    type: row.type,
    title: row.title,
    dek: row.dek,
    image: row.image,
    imageCaption: row.image_caption,
    category: row.category_slug,
    categoryName: catName.get(row.category_slug) ?? row.category_slug,
    authorName: loc(row.display_name, lang),
    authorSlug: row.author_slug,
    authorTitle: loc(row.author_title, lang),
    tags: tagList,
    views: Number(row.views) || 0,
    publishedAt: row.published_at,
    minutes: minutesOf(`${row.title} ${row.dek} ${row.body}`),
    zones: zones.get(row.id) ?? [],
    status: row.status,
  };
}

function toFull(
  row: Raw,
  siblings: Raw[],
  lang: string,
  zones: Map<number, string[]>,
  tags: Map<number, { slug: string; name: string }[]>,
  catName: Map<string, string>,
): StoryFull {
  return {
    ...toCard(row, siblings, lang, zones, tags, catName),
    body: row.body,
    subtitle: row.subtitle ?? "",
    refs: asRefs(row.refs),
    files: asJson<{ name: string; url: string }[]>(row.files, []).filter((file) => file.url.startsWith("/")),
    reviewNote: row.review_note ?? "",
    authorId: row.author_id,
  };
}

function picked(rows: Raw[], lang: string, pack: Awaited<ReturnType<typeof maps>>) {
  const catName = new Map(pack.cats.map((cat) => [cat.slug, loc(cat.name, lang)]));
  const stories: StoryFull[] = [];
  for (const siblings of groupOf(rows).values()) {
    const row = pick(siblings, lang);
    if (!row) continue;
    stories.push(toFull(row, siblings, lang, pack.zones, pack.tags, catName));
  }
  stories.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
  return { stories, catName, cats: pack.cats };
}

export async function getBootData(langInput: string) {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const lang = isLang(langInput) ? langInput : "ckb";
  const [settings, plugins, cats] = await Promise.all([
    sql<{ key: string; value: string }>`select key, value from settings`,
    sql<{ slug: string }>`select slug from plugins where enabled = true order by slug`,
    sql<{ slug: string; name: string; sort: number }>`select slug, name, sort from categories order by sort, slug`,
  ]);
  const bag = new Map(settings.map((row) => [row.key, row.value]));
  const enabled = parseEnabledLangs(bag.get("enabled_langs"));
  const langOk = enabled.includes(lang as typeof enabled[number]) ? lang : (enabled[0] ?? "ckb");
  const menuRows = await sql<{
    id: number;
    label: string;
    href: string;
    parent_id: number | null;
    sort: number;
    mega: boolean;
  }>`
    select id, label, href, parent_id, sort, mega from nav_items
    where lang = ${langOk}
    order by sort, id
  `;
  const fallbackMenu = menuRows.length
    ? menuRows
    : await sql<{
        id: number;
        label: string;
        href: string;
        parent_id: number | null;
        sort: number;
        mega: boolean;
      }>`
        select id, label, href, parent_id, sort, mega from nav_items
        where lang = 'ckb'
        order by sort, id
      `;
  return {
    lang: langOk,
    dir: langMeta(langOk).dir,
    theme: bag.get("theme") || "classic",
    logo: bag.get("logo") || "",
    layout: parseLayout(bag.get("layout")),
    plugins: plugins.map((row) => row.slug),
    categories: cats.map((cat) => ({ slug: cat.slug, name: loc(cat.name, langOk) || cat.slug })),
    tagline: t(langOk, "tagline"),
    today: formatWhen(langOk, new Date().toISOString(), true),
    langs: enabled.map((id) => ({ id, label: langMeta(id).label, short: langMeta(id).short, dir: langMeta(id).dir })),
    menu: nestMenu(fallbackMenu),
  };
}

export async function getHomeData(lang: string): Promise<HomePayload> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
  const { stories, cats } = picked(rows, lang, pack);
  const inZone = (zone: string) => stories.filter((story) => story.zones.includes(zone) && !story.zones.includes("readers"));
  const hero = inZone("hero").slice(0, 5);
  const lead = inZone("lead").slice(0, 3);
  const latest = inZone("latest");
  const sidebar = inZone("sidebar");
  const readers = stories.filter((story) => story.zones.includes("readers")).slice(0, 10);
  const sections = cats
    .map((cat) => ({
      slug: cat.slug,
      name: loc(cat.name, lang) || cat.slug,
      stories: inZone(`section:${cat.slug}`).slice(0, 4),
    }))
    .filter((section) => section.stories.length > 0);
  const used = new Set<number>();
  for (const story of [...hero, ...lead, ...latest, ...sidebar, ...sections.flatMap((s) => s.stories)]) {
    used.add(story.id);
  }
  const mostRead = [...stories]
    .filter((story) => !used.has(story.id) && !story.zones.includes("readers"))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);
  const counts = new Map<string, { slug: string; name: string; n: number }>();
  for (const story of stories) {
    for (const tag of story.tags) {
      const cur = counts.get(tag.slug) ?? { ...tag, n: 0 };
      cur.n += 1;
      counts.set(tag.slug, cur);
    }
  }
  const tags = [...counts.values()]
    .sort((a, b) => b.n - a.n)
    .slice(0, 8)
    .map(({ slug, name }) => ({ slug, name }));
  const strip = ({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }: StoryFull): StoryCard => card;
  return {
    hero: hero.map(strip),
    lead: lead.map(strip),
    sections: sections.map((section) => ({ ...section, stories: section.stories.map(strip) })),
    latest: latest.map(strip),
    sidebar: sidebar.map(strip),
    readers: readers.map(strip),
    mostRead: mostRead.map(strip),
    tags,
  };
}

export async function getStoryData(groupKey: string, lang: string): Promise<{ story: StoryFull; related: StoryCard[] } | null> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
  const { stories } = picked(rows, lang, pack);
  const story = stories.find((item) => item.groupKey === groupKey);
  if (!story) return null;
  const related = stories
    .filter((item) => item.groupKey !== groupKey && item.category === story.category)
    .slice(0, 3)
    .map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
  return { story, related };
}

export async function getListingData(opts: { lang: string; category?: string; tag?: string; kind?: string }): Promise<StoryCard[]> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
  let { stories } = picked(rows, opts.lang, pack);
  if (opts.category) stories = stories.filter((story) => story.category === opts.category);
  if (opts.kind) stories = stories.filter((story) => story.kind === opts.kind);
  if (opts.tag) stories = stories.filter((story) => story.tags.some((tag) => tag.slug === opts.tag));
  return stories.map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
}

function wordsOf(query: string): string[] {
  return query.toLowerCase().split(/\s+/).map((word) => word.trim()).filter((word) => word.length > 1);
}

function hits(text: string, phrase: string, words: string[]): number {
  const hay = text.toLowerCase();
  let score = 0;
  if (phrase && hay.includes(phrase)) score += 4;
  for (const word of words) if (hay.includes(word)) score += 1;
  return score;
}

function clip(text: string, phrase: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "";
  const at = phrase ? clean.toLowerCase().indexOf(phrase) : 0;
  const start = Math.max(0, (at < 0 ? 0 : at) - 40);
  const slice = clean.slice(start, start + 180);
  return (start > 0 ? "…" : "") + slice + (start + 180 < clean.length ? "…" : "");
}

export async function searchData(query: string, lang: string, section = ""): Promise<SearchPayload> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const phrase = query.trim().toLowerCase();
  const words = wordsOf(phrase);
  const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
  const { stories } = picked(rows, lang, pack);
  const ranked = stories
    .map((story) => {
      const score =
        hits(story.title, phrase, words) * 5 +
        hits(story.subtitle, phrase, words) * 3 +
        hits(story.dek, phrase, words) * 3 +
        hits(story.body, phrase, words) +
        hits(story.authorName, phrase, words) * 2 +
        hits(story.categoryName, phrase, words) * 2 +
        hits(story.tags.map((tag) => tag.name).join(" "), phrase, words) * 2;
      return { story, score };
    })
    .filter((item) => (!phrase || item.score > 0) && (!section || item.story.category === section))
    .sort((a, b) => b.score - a.score || (b.story.publishedAt ?? "").localeCompare(a.story.publishedAt ?? ""))
    .slice(0, phrase ? 30 : 8);
  const pages = phrase ? await sql<{ slug: string; title: string; body: string }>`
    select slug, title, body from pages where status = 'published' and lang = ${lang}
  ` : [];
  const people = phrase ? await sql<{ slug: string; display_name: string; title: string; bio: string }>`
    select slug, display_name, title, bio from profiles
  ` : [];
  const books = phrase ? await sql<{ title: string; dek: string; year: string; url: string; kind: string; issue: string; cover: string; lang: string }>`
    select title, dek, year, url, kind, issue, cover, lang from publications
  ` : [];
  return {
    stories: ranked.map(({ story }) => {
      const { body, reviewNote: _n, authorId: _a, subtitle: _s, ...card } = story;
      return { ...card, snippet: clip(story.dek || body, phrase), refs: story.refs, files: story.files };
    }),
    pages: pages
      .filter((page) => !phrase || hits(`${page.title} ${page.body}`, phrase, words) > 0)
      .slice(0, 12)
      .map((page) => ({ slug: page.slug, title: page.title, snippet: clip(page.body, phrase) })),
    people: people
      .map((person) => ({ slug: person.slug, name: loc(person.display_name, lang), title: loc(person.title, lang), bio: loc(person.bio, lang) }))
      .filter((person) => !phrase || hits(`${person.name} ${person.title} ${person.bio}`, phrase, words) > 0)
      .slice(0, 12)
      .map(({ bio: _b, ...person }) => person),
    books: books
      .filter((book) => (book.lang === lang || book.lang === "ckb") && (!phrase || hits(`${book.title} ${book.dek} ${book.issue}`, phrase, words) > 0))
      .slice(0, 12),
  };
}

export async function getAuthorData(slug: string, lang: string): Promise<AuthorProfile | null> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const people = await sql<{
    user_id: string;
    slug: string;
    display_name: string;
    role: string;
    title: string;
    location: string;
    languages: string;
    avatar_url: string;
    email_public: string;
    bio: string;
    education: string;
    experience: string;
    is_staff: boolean;
  }>`select * from profiles where slug = ${slug}`;
  const person = people[0];
  if (!person) return null;
  const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
  const { stories, cats } = picked(
    rows.filter((row) => row.author_id === person.user_id),
    lang,
    pack,
  );
  const cards = stories.map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
  const groups = cats
    .map((cat) => ({
      category: cat.slug,
      categoryName: loc(cat.name, lang) || cat.slug,
      stories: cards.filter((story) => story.category === cat.slug),
    }))
    .filter((group) => group.stories.length > 0);
  const tagMap = new Map<string, { slug: string; name: string }>();
  for (const story of cards) for (const tag of story.tags) tagMap.set(tag.slug, tag);
  return {
    slug: person.slug,
    name: loc(person.display_name, lang),
    title: loc(person.title, lang),
    location: loc(person.location, lang),
    languages: person.languages,
    email: person.email_public,
    avatar: person.avatar_url,
    bio: loc(person.bio, lang),
    education: locList(person.education, lang),
    experience: locList(person.experience, lang),
    count: cards.length,
    groups,
    tags: [...tagMap.values()],
    staff: Boolean(person.is_staff),
    role: person.role,
  };
}

export async function getPageData(slug: string, lang: string): Promise<PageDoc | null> {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const rows = await sql<{ slug: string; lang: string; title: string; body: string }>`
    select slug, lang, title, body from pages where slug = ${slug} and status = 'published'
  `;
  if (rows.length === 0) return null;
  const row =
    rows.find((item) => item.lang === lang) ??
    FALLBACK_LANGS.map((id) => rows.find((item) => item.lang === id)).find(Boolean) ??
    rows[0];
  if (!row) return null;
  return {
    slug: row.slug,
    lang: row.lang,
    title: row.title,
    body: row.body,
    availableLangs: rows.map((item) => item.lang),
  };
}

export async function bumpView(id: number): Promise<void> {
  const sql = await getSql();
  await sql`update articles set views = views + 1 where id = ${id} and status = 'published'`;
}

export async function getBooksData(langInput: string) {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const lang = isLang(langInput) ? langInput : "ckb";
  const rows = await sql<{ title: string; dek: string; year: string; cover: string; url: string; lang: string; kind: string }>`
    select title, dek, year, cover, url, lang, kind from publications where kind = 'book' and (lang = ${lang} or lang = 'ckb') order by id
  `;
  const mine = rows.filter((row) => row.lang === lang);
  const list = mine.length ? mine : rows.filter((row) => row.lang === "ckb");
  return list.map((row) => ({ title: row.title, dek: row.dek, year: row.year, cover: row.cover, url: row.url }));
}

export async function getMagazineData(langInput: string) {
  const sql = await getSql();
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  const lang = isLang(langInput) ? langInput : "ckb";
  const rows = await sql<{ title: string; dek: string; year: string; cover: string; url: string; lang: string; issue: string }>`
    select title, dek, year, cover, url, lang, issue from publications where kind = 'magazine' and (lang = ${lang} or lang = 'ckb') order by id desc
  `;
  const mine = rows.filter((row) => row.lang === lang);
  const list = mine.length ? mine : rows.filter((row) => row.lang === "ckb");
  return list.map((row) => ({ title: row.title, dek: row.dek, year: row.year, cover: row.cover, url: row.url, issue: row.issue }));
}
