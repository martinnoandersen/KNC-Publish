import { getSql } from "@/lib/db";
import { getListingData } from "@/lib/content/query.server";
import { loc } from "@/lib/content/text";
import { isLang } from "@/lib/i18n";

export type WireRow = {
  id: number;
  lang: string;
  kicker: string;
  text: string;
  href: string;
  urgent: boolean;
  active: boolean;
  createdAt: string;
};

export type CommentRow = {
  id: number;
  groupKey: string;
  body: string;
  status: string;
  createdAt: string;
  name: string;
};

export type EventRow = {
  id: number;
  lang: string;
  title: string;
  place: string;
  startsOn: string;
  detail: string;
  fixed: boolean;
};

export type CorrectionRow = {
  id: number;
  groupKey: string;
  lang: string;
  note: string;
  createdAt: string;
};

export type Shelf = {
  saves: string[];
  follows: { kind: "section" | "author"; target: string }[];
  letters: string[];
};

const STAMP = `to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;

function preferLang<T extends { lang: string }>(rows: T[], lang: string): T[] {
  const exact = rows.filter((row) => row.lang === lang);
  if (exact.length) return exact;
  const ckb = rows.filter((row) => row.lang === "ckb");
  if (ckb.length) return ckb;
  const en = rows.filter((row) => row.lang === "en");
  return en.length ? en : rows;
}

async function ready() {
  const { ensureSeed } = await import("@/lib/content/seed.server");
  await ensureSeed();
  return getSql();
}

function safeHref(value: string): string {
  const v = value.trim().slice(0, 200);
  if (!v) return "";
  if (v.startsWith("/") && !v.startsWith("//") && !v.includes("\\")) return v;
  if (/^https:\/\/[^\s]+$/.test(v)) return v;
  return "";
}

function langOf(value: string): string {
  return isLang(value) ? value : "ckb";
}

export async function roleOf(userId: string): Promise<string> {
  const sql = await ready();
  const rows = await sql<{ role: string }>`select role from profiles where user_id = ${userId}`;
  return rows[0]?.role ?? "reader";
}

export async function assertEditor(userId: string) {
  const role = await roleOf(userId);
  if (role !== "editor" && role !== "superadmin") throw new Error("forbidden");
  return role;
}

async function ensureReader(userId: string) {
  const sql = await ready();
  const existing = await sql<{ user_id: string }>`select user_id from profiles where user_id = ${userId}`;
  if (existing.length === 0) {
    const slug = `reader-${userId.replace(/[^a-z0-9]/gi, "").slice(0, 10).toLowerCase() || "user"}`;
    await sql`
      insert into profiles (user_id, slug, display_name, role, is_staff)
      values (${userId}, ${slug}, ${"Reader"}, 'reader', false)
      on conflict (user_id) do nothing
    `;
  }
}

export async function listWires(lang: string, all = false): Promise<WireRow[]> {
  const sql = await ready();
  const found = await sql.query<{
    id: number;
    lang: string;
    kicker: string;
    text: string;
    href: string;
    urgent: boolean;
    active: boolean;
    created_at: string;
  }>(
    `select id, lang, kicker, text, href, urgent, active,
      ${STAMP} as created_at
     from wires
     ${all ? "" : "where active = true"}
     order by urgent desc, created_at desc
     limit 40`,
  );
  const mapped = found.map((row) => ({
    id: Number(row.id),
    lang: row.lang,
    kicker: row.kicker,
    text: row.text,
    href: row.href,
    urgent: Boolean(row.urgent),
    active: Boolean(row.active),
    createdAt: row.created_at,
  }));
  return all ? mapped : preferLang(mapped, lang);
}

export async function saveWire(
  userId: string,
  input: { id: number; lang: string; kicker: string; text: string; href: string; urgent: boolean },
) {
  await assertEditor(userId);
  const text = input.text.trim();
  if (text.length < 3) throw new Error("empty");
  const sql = await ready();
  const lang = langOf(input.lang);
  const href = safeHref(input.href);
  const kicker = input.kicker.trim().slice(0, 40);
  if (input.id) {
    await sql`
      update wires set lang = ${lang}, kicker = ${kicker}, text = ${text}, href = ${href}, urgent = ${input.urgent}
      where id = ${input.id}
    `;
    return { id: input.id };
  }
  const rows = await sql<{ id: number }>`
    insert into wires (lang, kicker, text, href, urgent, active)
    values (${lang}, ${kicker}, ${text}, ${href}, ${input.urgent}, true)
    returning id
  `;
  return { id: Number(rows[0]?.id ?? 0) };
}

export async function setWireActive(userId: string, id: number, active: boolean) {
  await assertEditor(userId);
  const sql = await ready();
  await sql`update wires set active = ${active} where id = ${id}`;
}

export async function removeWire(userId: string, id: number) {
  await assertEditor(userId);
  const sql = await ready();
  await sql`delete from wires where id = ${id}`;
}

function say(map: object, lang: string): string {
  const bag = map as Record<string, string>;
  return bag[lang] || bag.en || bag.ckb || "";
}

function cultural(lang: string, year: number): EventRow[] {
  const pack = [
    {
      m: 3,
      d: 21,
      title: { ckb: "نەورۆز", en: "Newroz", kmr: "Newroz", ar: "نوروز" },
      place: { ckb: "هەموو کوردستان", en: "Across Kurdistan", kmr: "Li Kurdistanê", ar: "في كردستان" },
      detail: {
        ckb: "سەری ساڵ، ئاگر و کۆبوونەوەی دەرەوە. ڕۆژژمێری ساڵانە.",
        en: "The new year, fire, and gatherings outdoors. An annual mark on the calendar.",
        kmr: "Sersal, agir û civînên derve.",
        ar: "رأس السنة والنار واللقاء في العراء.",
      },
    },
    {
      m: 2,
      d: 21,
      title: { ckb: "ڕۆژی جیهانیی زمانی دایک", en: "Mother Language Day", kmr: "Roja zimanê dayikê", ar: "يوم اللغة الأم" },
      place: { ckb: "قوتابخانە و پەرتووکخانە", en: "Schools and libraries", kmr: "Dibistan û pirtûkgeh", ar: "المدارس والمكتبات" },
      detail: {
        ckb: "ڕۆژێک بۆ خوێندن و نووسین بەو زمانەی ماڵەوە.",
        en: "A day for reading and writing in the language of home.",
        kmr: "Rojek ji bo xwendin û nivîsandinê.",
        ar: "يوم للقراءة والكتابة بلغة البيت.",
      },
    },
    {
      m: 5,
      d: 3,
      title: { ckb: "ئازادیی ڕۆژنامەگەری", en: "Press freedom", kmr: "Azadiya çapemeniyê", ar: "حرية الصحافة" },
      place: { ckb: "هەواڵنگە", en: "The newsroom", kmr: "Jûrnal", ar: "غرفة الأخبار" },
      detail: {
        ckb: "ڕۆژێک بۆ سەرچاوە، ڕاستکردنەوە و ئەو وتارەی کە دەبێت بمێنێت.",
        en: "A day for sources, corrections, and the story that has to stand.",
        kmr: "Rojek ji bo çavkanî û rastkirinê.",
        ar: "يوم للمصادر والتصحيحات.",
      },
    },
    {
      m: 9,
      d: 8,
      title: { ckb: "خوێندنەوەی گشتی", en: "Literacy day", kmr: "Roja xwendinê", ar: "يوم القراءة" },
      place: { ckb: "پەرتووکخانەکان", en: "Libraries", kmr: "Pirtûkgeh", ar: "المكتبات" },
      detail: {
        ckb: "دەرگاکان درەنگتر دەکرێنەوە و خوێندنەوە بە دەنگ بەڕێوە دەچێت.",
        en: "Doors stay open later, and reading aloud is the program.",
        kmr: "Derî dirêjtir vekirî ne.",
        ar: "تبقى الأبواب مفتوحة حتى وقت متأخر.",
      },
    },
  ];
  return pack.map((item, index) => {
    const startsOn = `${year}-${String(item.m).padStart(2, "0")}-${String(item.d).padStart(2, "0")}`;
    return {
      id: -1 - index,
      lang,
      title: say(item.title, lang),
      place: say(item.place, lang),
      startsOn,
      detail: say(item.detail, lang),
      fixed: true,
    };
  });
}

export async function listEvents(lang: string): Promise<EventRow[]> {
  const sql = await ready();
  const rows = await sql.query<{
    id: number;
    lang: string;
    title: string;
    place: string;
    starts_on: string;
    detail: string;
  }>(
    `select id, lang, title, place, starts_on::text as starts_on, detail
     from events order by starts_on asc, id asc`,
  );
  const mine = preferLang(
    rows.map((row) => ({
      id: Number(row.id),
      lang: row.lang,
      title: row.title,
      place: row.place,
      startsOn: String(row.starts_on).slice(0, 10),
      detail: row.detail,
      fixed: false,
    })),
    lang,
  );
  const year = new Date().getUTCFullYear();
  return [...cultural(lang, year), ...mine].sort((a, b) => a.startsOn.localeCompare(b.startsOn));
}

export async function saveEvent(
  userId: string,
  input: { title: string; place: string; detail: string; startsOn: string; lang: string },
) {
  await assertEditor(userId);
  const title = input.title.trim().slice(0, 140);
  if (title.length < 2) throw new Error("empty");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.startsOn)) throw new Error("date");
  const sql = await ready();
  const rows = await sql<{ id: number }>`
    insert into events (lang, title, place, starts_on, detail)
    values (${langOf(input.lang)}, ${title}, ${input.place.trim().slice(0, 80)}, ${input.startsOn}, ${input.detail.trim().slice(0, 400)})
    returning id
  `;
  return { id: Number(rows[0]?.id ?? 0) };
}

export async function removeEvent(userId: string, id: number) {
  await assertEditor(userId);
  if (id < 1) return;
  const sql = await ready();
  await sql`delete from events where id = ${id}`;
}

export async function listCorrections(lang: string): Promise<CorrectionRow[]> {
  const sql = await ready();
  const rows = await sql.query<{
    id: number;
    group_key: string;
    lang: string;
    note: string;
    created_at: string;
  }>(
    `select id, group_key, lang, note, ${STAMP} as created_at
     from corrections order by created_at desc limit 40`,
  );
  const mapped = rows.map((row) => ({
    id: Number(row.id),
    groupKey: row.group_key,
    lang: row.lang,
    note: row.note,
    createdAt: row.created_at,
  }));
  return preferLang(mapped, lang);
}

export async function saveCorrection(userId: string, input: { groupKey: string; note: string; lang: string }) {
  await assertEditor(userId);
  const note = input.note.trim().slice(0, 600);
  if (note.length < 4) throw new Error("empty");
  const sql = await ready();
  const rows = await sql<{ id: number }>`
    insert into corrections (group_key, lang, note)
    values (${input.groupKey.trim().slice(0, 80)}, ${langOf(input.lang)}, ${note})
    returning id
  `;
  return { id: Number(rows[0]?.id ?? 0) };
}

export async function removeCorrection(userId: string, id: number) {
  await assertEditor(userId);
  const sql = await ready();
  await sql`delete from corrections where id = ${id}`;
}

export async function listComments(groupKey: string, lang: string): Promise<CommentRow[]> {
  const sql = await ready();
  const key = groupKey.slice(0, 80);
  const rows = await sql.query<{
    id: number;
    group_key: string;
    body: string;
    status: string;
    created_at: string;
    display_name: string | null;
  }>(
    `select c.id, c.group_key, c.body, c.status, ${STAMP.replaceAll("created_at", "c.created_at")} as created_at,
      p.display_name
     from comments c
     left join profiles p on p.user_id = c.user_id
     where c.group_key = $1 and c.status = 'visible'
     order by c.created_at asc
     limit 80`,
    [key],
  );
  return rows.map((row) => ({
    id: Number(row.id),
    groupKey: row.group_key,
    body: row.body,
    status: row.status,
    createdAt: row.created_at,
    name: loc(row.display_name, lang) || "Reader",
  }));
}

export async function deskComments(userId: string): Promise<CommentRow[]> {
  await assertEditor(userId);
  const sql = await ready();
  const rows = await sql.query<{
    id: number;
    group_key: string;
    body: string;
    status: string;
    created_at: string;
    display_name: string | null;
  }>(
    `select c.id, c.group_key, c.body, c.status, ${STAMP.replaceAll("created_at", "c.created_at")} as created_at,
      p.display_name
     from comments c
     left join profiles p on p.user_id = c.user_id
     order by c.created_at desc
     limit 80`,
  );
  return rows.map((row) => ({
    id: Number(row.id),
    groupKey: row.group_key,
    body: row.body,
    status: row.status,
    createdAt: row.created_at,
    name: loc(row.display_name, "ckb") || loc(row.display_name, "en") || "Reader",
  }));
}

export async function addComment(userId: string, groupKey: string, body: string, lang: string) {
  const text = body.trim().slice(0, 1200);
  if (text.length < 2) throw new Error("empty");
  const key = groupKey.trim().slice(0, 80);
  if (!key) throw new Error("empty");
  await ensureReader(userId);
  const sql = await ready();
  const known = await sql<{ group_key: string }>`
    select group_key from articles where group_key = ${key} and status = 'published' limit 1
  `;
  if (!known.length) throw new Error("missing");
  const rows = await sql<{ id: number }>`
    insert into comments (group_key, user_id, body, status)
    values (${key}, ${userId}, ${text}, 'visible')
    returning id
  `;
  const nameRow = await sql<{ display_name: string }>`select display_name from profiles where user_id = ${userId}`;
  return {
    id: Number(rows[0]?.id ?? 0),
    groupKey: key,
    body: text,
    status: "visible",
    createdAt: new Date().toISOString(),
    name: loc(nameRow[0]?.display_name, lang) || "Reader",
  };
}

export async function setCommentStatus(userId: string, id: number, status: string) {
  await assertEditor(userId);
  const next = status === "hidden" ? "hidden" : "visible";
  const sql = await ready();
  await sql`update comments set status = ${next} where id = ${id}`;
}

export async function toggleSave(userId: string, groupKey: string) {
  await ensureReader(userId);
  const key = groupKey.trim().slice(0, 80);
  const sql = await ready();
  const existing = await sql`select group_key from saves where user_id = ${userId} and group_key = ${key}`;
  if (existing.length) {
    await sql`delete from saves where user_id = ${userId} and group_key = ${key}`;
    return { on: false };
  }
  await sql`insert into saves (user_id, group_key) values (${userId}, ${key})`;
  return { on: true };
}

export async function toggleFollow(userId: string, kind: string, target: string) {
  if (kind !== "section" && kind !== "author") throw new Error("kind");
  const clean = target.trim().slice(0, 80);
  if (!clean) throw new Error("empty");
  await ensureReader(userId);
  const sql = await ready();
  const existing = await sql`
    select target from follows where user_id = ${userId} and kind = ${kind} and target = ${clean}
  `;
  if (existing.length) {
    await sql`delete from follows where user_id = ${userId} and kind = ${kind} and target = ${clean}`;
    return { on: false };
  }
  await sql`insert into follows (user_id, kind, target) values (${userId}, ${kind}, ${clean})`;
  return { on: true };
}

const LETTERS = new Set(["morning", "culture", "weekend"]);

export async function toggleLetter(userId: string, slug: string) {
  if (!LETTERS.has(slug)) throw new Error("slug");
  await ensureReader(userId);
  const sql = await ready();
  const existing = await sql`select slug from subscriptions where user_id = ${userId} and slug = ${slug}`;
  if (existing.length) {
    await sql`delete from subscriptions where user_id = ${userId} and slug = ${slug}`;
    return { on: false };
  }
  await sql`insert into subscriptions (user_id, slug) values (${userId}, ${slug})`;
  return { on: true };
}

export async function shelf(userId: string): Promise<Shelf> {
  const sql = await ready();
  const [saves, follows, letters] = await Promise.all([
    sql<{ group_key: string }>`select group_key from saves where user_id = ${userId} order by created_at desc`,
    sql<{ kind: string; target: string }>`select kind, target from follows where user_id = ${userId}`,
    sql<{ slug: string }>`select slug from subscriptions where user_id = ${userId}`,
  ]);
  return {
    saves: saves.map((row) => row.group_key),
    follows: follows
      .filter((row) => row.kind === "section" || row.kind === "author")
      .map((row) => ({ kind: row.kind as "section" | "author", target: row.target })),
    letters: letters.map((row) => row.slug),
  };
}

export async function masthead(lang: string) {
  const sql = await ready();
  const rows = await sql<{
    slug: string;
    display_name: string;
    title: string;
    location: string;
    role: string;
    bio: string;
  }>`
    select slug, display_name, title, location, role, bio
    from profiles where is_staff = true
    order by slug
  `;
  return rows.map((row) => ({
    slug: row.slug,
    name: loc(row.display_name, lang),
    title: loc(row.title, lang),
    location: loc(row.location, lang),
    role: row.role,
    bio: loc(row.bio, lang),
  }));
}

export async function pulse(lang: string) {
  const stories = await getListingData({ lang });
  const map = new Map<string, { slug: string; name: string; stories: number; views: number }>();
  for (const story of stories) {
    const cur = map.get(story.category) ?? { slug: story.category, name: story.categoryName, stories: 0, views: 0 };
    cur.stories += 1;
    cur.views += story.views;
    map.set(story.category, cur);
  }
  const sections = [...map.values()].sort((a, b) => b.views - a.views);
  const totalViews = sections.reduce((sum, row) => sum + row.views, 0);
  const top = [...stories].sort((a, b) => b.views - a.views).slice(0, 6);
  return { sections, totalViews, totalStories: stories.length, top };
}
