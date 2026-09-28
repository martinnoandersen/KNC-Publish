import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { isLang, LANGS as LANG_META, parseEnabledLangs } from "@/lib/i18n";
import { asJson, cleanKey, slugify } from "./text";
import { parseLayout, type SiteLayout, type CvLine, type RefItem } from "./types";

type Role = "superadmin" | "editor" | "writer" | "pending" | "reader";

const LANGS = ["ckb", "kmr", "en", "he", "ar", "fa", "tr", "de", "fr", "es"];
const ZONES = new Set(["hero", "lead", "latest", "sidebar", "readers"]);

async function db() {
  const { getSql } = await import("@/lib/db");
  const { ensureSeed } = await import("./seed.server");
  await ensureSeed();
  return getSql();
}

async function uiLang(): Promise<string> {
  const { getCookie, getRequestHeader } = await import("@tanstack/react-start/server");
  const header = getRequestHeader("x-knc-lang");
  if (isLang(header)) return header;
  const raw = getCookie("knc_lang");
  return isLang(raw) ? raw : "ckb";
}

export async function roleOf(userId: string): Promise<Role> {
  const sql = await db();
  const rows = await sql<{ role: string }>`select role from profiles where user_id = ${userId}`;
  const role = rows[0]?.role;
  if (role === "superadmin" || role === "editor" || role === "writer" || role === "pending" || role === "reader") return role;
  return "reader";
}

function canEdit(role: Role) {
  return role === "writer" || role === "editor" || role === "superadmin";
}
function canPublish(role: Role) {
  return role === "editor" || role === "superadmin";
}
function canManage(role: Role) {
  return role === "superadmin";
}

function tagSlug(label: string): string {
  const latin = slugify(label);
  if (latin) return latin;
  let hash = 0;
  for (const ch of label.trim()) hash = (hash * 33 + (ch.codePointAt(0) ?? 0)) >>> 0;
  return `t${hash.toString(36)}`;
}

function safeImage(url: string): string {
  const value = url.trim().slice(0, 400);
  if (!value) return "";
  if (value.startsWith("/media/") || value.startsWith("/uploads/") || value.startsWith("/publications/")) return value;
  if (/^https:\/\/[^\s]+$/.test(value)) return value;
  return "";
}

function parseLines(text: string): CvLine[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 12)
    .map((line) => {
      const [years, place, detail] = line.split("|").map((part) => part.trim());
      return { years: years ?? "", place: place ?? "", detail: detail ?? "" };
    });
}

async function ensureProfile(userId: string, name: string) {
  const sql = await db();
  const existing = await sql<{ user_id: string }>`select user_id from profiles where user_id = ${userId}`;
  if (existing.length === 0) {
    const base = slugify(name) || "writer";
    const slug = `${base}-${userId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase() || "user"}`;
    await sql`
      insert into profiles (user_id, slug, display_name, role, is_staff)
      values (${userId}, ${slug}, ${name || "Writer"}, 'reader', false)
      on conflict (user_id) do nothing
    `;
    await sql`
      update profiles set role = 'superadmin'
      where user_id = ${userId}
        and role <> 'superadmin'
        and not exists (select 1 from profiles where role = 'superadmin')
    `;
  }
  return roleOf(userId);
}

export const syncProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string }) => ({ name: String(input?.name ?? "").trim().slice(0, 80) }))
  .handler(async ({ context, data }) => {
    const role = await ensureProfile(context.userId, data.name);
    return { role };
  });

export const deskBoot = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await ensureProfile(context.userId, "");
    const sql = await db();
    const [cats, tagRows, groups, articles, plugins, settings] = await Promise.all([
      sql<{ slug: string; name: string }>`select slug, name from categories order by sort, slug`,
      sql<{ slug: string; name: string }>`select slug, name from tags order by slug`,
      sql<{ group_key: string; title: string; lang: string }>`
        select group_key, title, lang from articles order by group_key, lang
      `,
      sql<{ status: string; author_id: string }>`select status, author_id from articles`,
      sql<{ slug: string; enabled: boolean }>`select slug, enabled from plugins order by slug`,
      sql<{ key: string; value: string }>`select key, value from settings`,
    ]);
    const mine = articles.filter((row) => row.author_id === context.userId);
    const visible = canPublish(role) ? articles : mine;
    const bag = new Map(settings.map((row) => [row.key, row.value]));
    const byGroup = new Map<string, { key: string; title: string; langs: string[] }>();
    for (const row of groups) {
      const cur = byGroup.get(row.group_key) ?? { key: row.group_key, title: row.title, langs: [] };
      cur.langs.push(row.lang);
      if (row.lang === "ckb" || !cur.title) cur.title = row.title;
      byGroup.set(row.group_key, cur);
    }
    return {
      role,
      categories: cats.map((cat) => ({ slug: cat.slug, name: cat.name })),
      tags: tagRows.map((tag) => ({ slug: tag.slug, name: tag.name })),
      groups: [...byGroup.values()],
      plugins: plugins.map((row) => ({ slug: row.slug, enabled: Boolean(row.enabled) })),
      theme: bag.get("theme") || "classic",
      logo: bag.get("logo") || "",
      layout: parseLayout(bag.get("layout")),
      counts: {
        published: visible.filter((row) => row.status === "published").length,
        review: visible.filter((row) => row.status === "review").length,
        drafts: visible.filter((row) => row.status === "draft" || row.status === "rejected").length,
      },
      enabledLangs: parseEnabledLangs(bag.get("enabled_langs")),
    };
  });

export const listDeskStories = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role)) return [];
    const sql = await db();
    const rows = await sql<{
      id: number;
      group_key: string;
      lang: string;
      kind: string;
      type: string;
      status: string;
      title: string;
      author_id: string;
      display_name: string;
    }>`
      select a.id, a.group_key, a.lang, a.kind, a.type, a.status, a.title, a.author_id, p.display_name
      from articles a join profiles p on p.user_id = a.author_id
      order by a.updated_at desc
    `;
    const lang = await uiLang();
    const { loc } = await import("./text");
    const visible = canPublish(role) ? rows : rows.filter((row) => row.author_id === context.userId);
    return visible.map((row) => ({
      id: row.id,
      groupKey: row.group_key,
      lang: row.lang,
      kind: row.kind,
      type: row.type,
      status: row.status,
      title: row.title,
      authorName: loc(row.display_name, lang),
      mine: row.author_id === context.userId,
    }));
  });

export const getEditable = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role) || !data) return null;
    const sql = await db();
    const rows = await sql<{
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
      review_note: string;
    }>`
      select id, group_key, lang, kind, type, status, title, subtitle, dek, body, image, image_caption,
        category_slug, author_id, refs, files, review_note
      from articles where id = ${data}
    `;
    const row = rows[0];
    if (!row) return null;
    if (!canPublish(role) && row.author_id !== context.userId) return null;
    const [zones, tagRows] = await Promise.all([
      sql<{ zone: string }>`select zone from placements where article_id = ${row.id}`,
      sql<{ name: string; slug: string }>`
        select t.name, t.slug from article_tags at join tags t on t.id = at.tag_id where at.article_id = ${row.id}
      `,
    ]);
    return {
      id: row.id,
      groupKey: row.group_key,
      lang: row.lang,
      kind: row.kind,
      type: row.type,
      status: row.status,
      title: row.title,
      subtitle: row.subtitle ?? "",
      dek: row.dek,
      body: row.body,
      image: row.image,
      imageCaption: row.image_caption,
      category: row.category_slug,
      refs: asJson<RefItem[]>(row.refs, []),
      files: asJson<{ name: string; url: string }[]>(row.files, []),
      reviewNote: row.review_note,
      zones: zones.map((zone) => zone.zone),
      tags: tagRows.map((tag) => tag.slug).join(", "),
      locked: !canPublish(role) && row.status === "published",
    };
  });

type ArticleInput = {
  id: number;
  groupKey: string;
  lang: string;
  kind: string;
  type: string;
  title: string;
  subtitle: string;
  dek: string;
  body: string;
  image: string;
  imageCaption: string;
  category: string;
  tags: string;
  zones: string[];
  refs: RefItem[];
  files: { name: string; url: string }[];
  action: string;
  reviewNote: string;
};

function cleanArticle(input: unknown): ArticleInput {
  const raw = (input ?? {}) as Record<string, unknown>;
  const title = String(raw.title ?? "").trim().slice(0, 200);
  if (!title) throw new Error("Title is required");
  const lang = LANGS.includes(String(raw.lang)) ? String(raw.lang) : "ckb";
  const kind = raw.kind === "post" ? "post" : "article";
  const type = raw.type === "premium" || raw.type === "scientific" ? raw.type : "standard";
  const action = ["draft", "review", "publish", "reject"].includes(String(raw.action))
    ? String(raw.action)
    : "draft";
  const zones = Array.isArray(raw.zones) ? raw.zones.map((zone) => String(zone)).slice(0, 24) : [];
  const refs = Array.isArray(raw.refs)
    ? raw.refs.slice(0, 16).map((item) => {
        const ref = (item ?? {}) as Record<string, unknown>;
        return {
          authors: String(ref.authors ?? "").slice(0, 160),
          year: String(ref.year ?? "").slice(0, 12),
          title: String(ref.title ?? "").slice(0, 220),
          source: String(ref.source ?? "").slice(0, 180),
        };
      }).filter((ref) => ref.title || ref.authors)
    : [];
  return {
    id: Number(raw.id) || 0,
    groupKey: cleanKey(String(raw.groupKey ?? "")),
    lang,
    kind,
    type,
    title,
    subtitle: String(raw.subtitle ?? "").trim().slice(0, 240),
    dek: String(raw.dek ?? "").trim().slice(0, 400),
    body: String(raw.body ?? "").slice(0, 80000),
    image: safeImage(String(raw.image ?? "")),
    imageCaption: String(raw.imageCaption ?? "").trim().slice(0, 240),
    category: cleanKey(String(raw.category ?? "")),
    tags: String(raw.tags ?? "").slice(0, 400),
    zones,
    refs,
    action,
    reviewNote: String(raw.reviewNote ?? "").trim().slice(0, 800),
    files: Array.isArray(raw.files)
      ? raw.files.slice(0, 12).map((item) => {
          const file = (item ?? {}) as Record<string, unknown>;
          const url = safeImage(String(file.url ?? ""));
          return { name: String(file.name ?? "file").slice(0, 120), url };
        }).filter((file) => file.url)
      : [],
  };
}

export const saveArticle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator(cleanArticle)
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role)) throw new Error("You cannot edit stories");
    const sql = await db();
    let status = data.action === "review" ? "review" : "draft";
    if (data.action === "publish") status = canPublish(role) ? "published" : "review";
    if (data.action === "reject") status = canPublish(role) ? "rejected" : "draft";
    let id = data.id;
    let authorId = context.userId;
    let wasPublished = false;
    if (id) {
      const current = await sql<{ author_id: string; status: string; published_at: string | null }>`
        select author_id, status, published_at::text as published_at from articles where id = ${id}
      `;
      const row = current[0];
      if (!row) throw new Error("Story not found");
      wasPublished = row.status === "published";
      if (!canPublish(role) && row.author_id !== context.userId) throw new Error("Not your story");
      if (!canPublish(role) && row.status === "published") throw new Error("Published stories are locked");
      authorId = row.author_id;
    }
    const groupKey = data.groupKey || slugify(data.title) || `story-${Date.now().toString(36)}`;
    const clash = await sql<{ id: number }>`
      select id from articles where group_key = ${groupKey} and lang = ${data.lang} and id <> ${id || 0}
    `;
    if (clash.length > 0) throw new Error("This language already exists for that story");
    const authorRole = await roleOf(authorId);
    let allowedZones = data.zones.filter((zone) => ZONES.has(zone) || zone.startsWith("section:"));
    if (authorRole === "reader" || allowedZones.includes("readers")) allowedZones = ["readers"];
    if (id) {
      await sql`
        update articles set
          group_key = ${groupKey},
          lang = ${data.lang},
          kind = ${data.kind},
          type = ${data.type},
          status = ${status},
          title = ${data.title},
          subtitle = ${data.subtitle},
          dek = ${data.dek},
          body = ${data.body},
          image = ${data.image},
          image_caption = ${data.imageCaption},
          category_slug = ${data.category},
          refs = ${JSON.stringify(data.refs)},
          files = ${JSON.stringify(data.files)},
          review_note = ${data.reviewNote},
          reviewed_by = ${data.action === "publish" || data.action === "reject" ? context.userId : ""},
          published_at = case
            when ${status} = 'published' then coalesce(published_at, now())
            else published_at
          end,
          updated_at = now()
        where id = ${id}
      `;
    } else {
      const inserted = await sql<{ id: number }>`
        insert into articles (
          group_key, lang, kind, type, status, title, subtitle, dek, body, image, image_caption,
          category_slug, author_id, refs, files, review_note, reviewed_by, published_at
        ) values (
          ${groupKey}, ${data.lang}, ${data.kind}, ${data.type}, ${status}, ${data.title}, ${data.subtitle}, ${data.dek},
          ${data.body}, ${data.image}, ${data.imageCaption}, ${data.category}, ${authorId},
          ${JSON.stringify(data.refs)}, ${JSON.stringify(data.files)}, ${data.reviewNote},
          ${data.action === "publish" || data.action === "reject" ? context.userId : ""},
          ${status === "published" ? new Date().toISOString() : null}
        )
        returning id
      `;
      id = inserted[0]?.id ?? 0;
    }
    await sql`delete from placements where article_id = ${id}`;
    for (const zone of allowedZones) {
      await sql`insert into placements (article_id, zone) values (${id}, ${zone}) on conflict do nothing`;
    }
    await sql`delete from article_tags where article_id = ${id}`;
    for (const label of data.tags.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 12)) {
      const slug = tagSlug(label);
      const existing = await sql<{ id: number; name: string }>`select id, name from tags where slug = ${slug}`;
      let tagId = existing[0]?.id;
      if (!tagId) {
        const created = await sql<{ id: number }>`
          insert into tags (slug, name) values (${slug}, ${JSON.stringify({ [data.lang]: label })})
          on conflict (slug) do nothing
          returning id
        `;
        tagId = created[0]?.id;
        if (!tagId) {
          const again = await sql<{ id: number }>`select id from tags where slug = ${slug}`;
          tagId = again[0]?.id;
        }
      } else {
        const names = asJson<Record<string, string>>(existing[0]?.name, {});
        if (!names[data.lang]) {
          names[data.lang] = label;
          await sql`update tags set name = ${JSON.stringify(names)} where id = ${tagId}`;
        }
      }
      if (tagId) {
        await sql`insert into article_tags (article_id, tag_id) values (${id}, ${tagId}) on conflict do nothing`;
      }
    }
    if (status === "published" && !wasPublished) {
      const { notifyEveryone } = await import("./push.server");
      const kind = data.kind === "post" ? "پۆست" : "وتار";
      await notifyEveryone({
        title: data.title,
        body: data.dek || kind,
        url: `/article/${groupKey}`,
      });
    }
    return { id, groupKey };
  });

export const saveProfile = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Record<string, string>) => ({
    lang: isLang(input?.lang) ? input.lang : "ckb",
    displayName: String(input?.displayName ?? "").trim().slice(0, 80),
    title: String(input?.title ?? "").trim().slice(0, 120),
    location: String(input?.location ?? "").trim().slice(0, 80),
    languages: String(input?.languages ?? "").trim().slice(0, 120),
    email: String(input?.email ?? "").trim().slice(0, 120),
    bio: String(input?.bio ?? "").trim().slice(0, 2000),
    education: String(input?.education ?? "").slice(0, 2000),
    experience: String(input?.experience ?? "").slice(0, 2000),
  }))
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId, data.displayName);
    const sql = await db();
    const rows = await sql<{
      display_name: string;
      title: string;
      location: string;
      bio: string;
      education: string;
      experience: string;
    }>`select display_name, title, location, bio, education, experience from profiles where user_id = ${context.userId}`;
    const row = rows[0];
    if (!row) throw new Error("Profile missing");
    const mergeText = (current: string, value: string) => {
      const obj = current.trim().startsWith("{")
        ? asJson<Record<string, string>>(current, {})
        : current.trim()
          ? { ckb: current }
          : {};
      obj[data.lang] = value;
      return JSON.stringify(obj);
    };
    const edu = asJson<Record<string, CvLine[]>>(row.education, {});
    const exp = asJson<Record<string, CvLine[]>>(row.experience, {});
    edu[data.lang] = parseLines(data.education);
    exp[data.lang] = parseLines(data.experience);
    const bio = asJson<Record<string, string>>(row.bio, {});
    bio[data.lang] = data.bio;
    await sql`
      update profiles set
        display_name = ${mergeText(row.display_name, data.displayName)},
        title = ${mergeText(row.title, data.title)},
        location = ${mergeText(row.location, data.location)},
        languages = ${data.languages},
        email_public = ${data.email},
        bio = ${JSON.stringify(bio)},
        education = ${JSON.stringify(edu)},
        experience = ${JSON.stringify(exp)}
      where user_id = ${context.userId}
    `;
    const slug = await sql<{ slug: string }>`select slug from profiles where user_id = ${context.userId}`;
    return { slug: slug[0]?.slug ?? "" };
  });

export const myProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((lang: string) => (isLang(lang) ? lang : "ckb"))
  .handler(async ({ context, data }) => {
    await ensureProfile(context.userId, "");
    const sql = await db();
    const rows = await sql<{
      slug: string;
      display_name: string;
      title: string;
      location: string;
      languages: string;
      email_public: string;
      bio: string;
      education: string;
      experience: string;
      role: string;
    }>`
      select slug, display_name, title, location, languages, email_public, bio, education, experience, role
      from profiles where user_id = ${context.userId}
    `;
    const row = rows[0];
    if (!row) return null;
    const { loc, locList } = await import("./text");
    const edu = locList(row.education, data);
    const exp = locList(row.experience, data);
    const line = (list: CvLine[]) => list.map((item) => [item.years, item.place, item.detail].filter(Boolean).join(" | ")).join("\n");
    return {
      slug: row.slug,
      role: row.role,
      displayName: loc(row.display_name, data),
      title: loc(row.title, data),
      location: loc(row.location, data),
      languages: row.languages,
      email: row.email_public,
      bio: loc(row.bio, data),
      education: line(edu),
      experience: line(exp),
    };
  });

export const listPeople = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) return [];
    const sql = await db();
    const rows = await sql<{
      user_id: string;
      slug: string;
      display_name: string;
      role: string;
      is_staff: boolean;
    }>`select user_id, slug, display_name, role, is_staff from profiles order by is_staff desc, display_name`;
    return rows.map((row) => ({
      id: row.user_id,
      slug: row.slug,
      name: row.display_name,
      role: row.role,
      staff: Boolean(row.is_staff),
    }));
  });

export const setRole = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: string; role?: string }) => ({
    id: String(input?.id ?? "").slice(0, 80),
    role: ["reader", "pending", "writer", "editor", "superadmin"].includes(String(input?.role))
      ? String(input.role)
      : "reader",
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin can change roles");
    if (!data.id || data.id === context.userId) throw new Error("You cannot change your own role here");
    const sql = await db();
    const target = await sql<{ role: string; is_staff: boolean }>`
      select role, is_staff from profiles where user_id = ${data.id}
    `;
    if (!target[0] || target[0].is_staff) throw new Error("Staff bylines are not accounts");
    if (target[0].role === "superadmin" && data.role !== "superadmin") {
      const admins = await sql<{ n: number }>`select count(*)::int as n from profiles where role = 'superadmin'`;
      if ((Number(admins[0]?.n) || 0) <= 1) throw new Error("Keep at least one superadmin");
    }
    await sql`update profiles set role = ${data.role} where user_id = ${data.id}`;
    return { ok: true };
  });

export const savePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: string; name?: string; names?: Record<string, string>; role?: string }) => {
    const names = input?.names && typeof input.names === "object" ? input.names : {};
    return {
      id: String(input?.id ?? "").slice(0, 80),
      name: String(input?.name ?? "").trim().slice(0, 120),
      names: {
        ckb: String(names.ckb ?? "").trim().slice(0, 120),
        kmr: String(names.kmr ?? "").trim().slice(0, 120),
        en: String(names.en ?? "").trim().slice(0, 120),
        he: String(names.he ?? "").trim().slice(0, 120),
      },
      role: ["reader", "pending", "writer", "editor", "superadmin"].includes(String(input?.role))
        ? String(input.role)
        : "reader",
    };
  })
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin can change people");
    const anyName = data.names.ckb || data.names.kmr || data.names.en || data.names.he || data.name;
    if (!data.id || !anyName) throw new Error("Name is required");
    if (data.id === context.userId && data.role !== "superadmin") throw new Error("You cannot change your own role here");
    const sql = await db();
    const target = await sql<{ role: string; display_name: string }>`select role, display_name from profiles where user_id = ${data.id}`;
    if (!target[0]) throw new Error("Person not found");
    if (target[0].role === "superadmin" && data.role !== "superadmin") {
      const admins = await sql<{ n: number }>`select count(*)::int as n from profiles where role = 'superadmin'`;
      if ((Number(admins[0]?.n) || 0) <= 1) throw new Error("Keep at least one superadmin");
    }
    const current = String(target[0].display_name ?? "");
    const obj: Record<string, string> = current.trim().startsWith("{")
      ? asJson<Record<string, string>>(current, {})
      : current.trim()
        ? { ckb: current }
        : {};
    for (const key of ["ckb", "kmr", "en", "he"] as const) {
      if (data.names[key]) obj[key] = data.names[key];
    }
    if (!data.names.ckb && !data.names.kmr && !data.names.en && !data.names.he && data.name) obj.ckb = data.name;
    await sql`update profiles set display_name = ${JSON.stringify(obj)}, role = ${data.role} where user_id = ${data.id}`;
    return { ok: true };
  });

export const deletePerson = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: string) => String(id ?? "").slice(0, 80))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin can delete people");
    if (!data || data === context.userId) throw new Error("You cannot delete your own account here");
    const sql = await db();
    const target = await sql<{ role: string }>`select role from profiles where user_id = ${data}`;
    if (!target[0]) throw new Error("Person not found");
    if (target[0].role === "superadmin") {
      const admins = await sql<{ n: number }>`select count(*)::int as n from profiles where role = 'superadmin'`;
      if ((Number(admins[0]?.n) || 0) <= 1) throw new Error("Keep at least one superadmin");
    }
    const stories = await sql<{ n: number }>`select count(*)::int as n from articles where author_id = ${data}`;
    if ((Number(stories[0]?.n) || 0) > 0) throw new Error("This person still has articles");
    await sql`delete from profiles where user_id = ${data}`;
    return { ok: true };
  });

export const saveLayout = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Partial<SiteLayout>) => parseLayout(JSON.stringify(input ?? {})))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin can change the layout");
    const sql = await db();
    const value = JSON.stringify(data);
    await sql`
      insert into settings (key, value) values ('layout', ${value})
      on conflict (key) do update set value = ${value}
    `;
    return { ok: true };
  });

export const listLibrary = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((kind: string) => (kind === "magazine" ? "magazine" : "book"))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) return [];
    const sql = await db();
    const rows = await sql<{
      id: number; kind: string; lang: string; title: string; dek: string; year: string; cover: string; url: string; issue: string;
    }>`select id, kind, lang, title, dek, year, cover, url, issue from publications where kind = ${data} order by id desc`;
    return rows;
  });

export const saveLibrary = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: number; kind?: string; lang?: string; title?: string; dek?: string; year?: string; cover?: string; url?: string; issue?: string }) => ({
    id: Number(input?.id) || 0,
    kind: input?.kind === "magazine" ? "magazine" : "book",
    lang: LANGS.includes(String(input?.lang)) ? String(input?.lang) : "ckb",
    title: String(input?.title ?? "").trim().slice(0, 180),
    dek: String(input?.dek ?? "").trim().slice(0, 400),
    year: String(input?.year ?? "").trim().slice(0, 12),
    cover: safeImage(String(input?.cover ?? "")),
    url: String(input?.url ?? "").trim().slice(0, 240),
    issue: String(input?.issue ?? "").trim().slice(0, 40),
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) throw new Error("Only an editor can change the library");
    if (!data.title || !data.url.startsWith("/")) throw new Error("Title and a file on this site are required");
    const sql = await db();
    if (data.id) {
      await sql`
        update publications set lang = ${data.lang}, title = ${data.title}, dek = ${data.dek}, year = ${data.year},
          cover = ${data.cover}, url = ${data.url}, issue = ${data.issue}, kind = ${data.kind}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const inserted = await sql<{ id: number }>`
      insert into publications (lang, title, dek, year, cover, url, kind, issue)
      values (${data.lang}, ${data.title}, ${data.dek}, ${data.year}, ${data.cover}, ${data.url}, ${data.kind}, ${data.issue})
      returning id
    `;
    return { id: inserted[0]?.id ?? 0 };
  });

export const deleteLibrary = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role) || !data) throw new Error("Only an editor can delete this");
    const sql = await db();
    await sql`delete from publications where id = ${data}`;
    return { ok: true };
  });

export const saveTaxon = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { kind?: string; slug?: string; name?: string; lang?: string }) => ({
    kind: input?.kind === "tag" ? "tag" : "category",
    slug: cleanKey(String(input?.slug ?? "")),
    name: String(input?.name ?? "").trim().slice(0, 80),
    lang: isLang(input?.lang) ? input.lang : "ckb",
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) throw new Error("Editors manage categories");
    if (!data.slug || !data.name) throw new Error("Name and slug are required");
    const sql = await db();
    if (data.kind === "category") {
      const existing = await sql<{ name: string }>`select name from categories where slug = ${data.slug}`;
      const names = asJson<Record<string, string>>(existing[0]?.name, {});
      names[data.lang] = data.name;
      if (existing.length === 0) {
        await sql`insert into categories (slug, name, sort) values (${data.slug}, ${JSON.stringify(names)}, 50)`;
      } else {
        await sql`update categories set name = ${JSON.stringify(names)} where slug = ${data.slug}`;
      }
    } else {
      const existing = await sql<{ name: string }>`select name from tags where slug = ${data.slug}`;
      const names = asJson<Record<string, string>>(existing[0]?.name, {});
      names[data.lang] = data.name;
      if (existing.length === 0) {
        await sql`insert into tags (slug, name) values (${data.slug}, ${JSON.stringify(names)})`;
      } else {
        await sql`update tags set name = ${JSON.stringify(names)} where slug = ${data.slug}`;
      }
    }
    return { ok: true };
  });

export const saveAppearance = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { theme?: string; logo?: string }) => ({
    theme: ["classic", "night", "warm"].includes(String(input?.theme)) ? String(input.theme) : "classic",
    logo: safeImage(String(input?.logo ?? "")),
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin changes the theme");
    const sql = await db();
    await sql`
      insert into settings (key, value) values ('theme', ${data.theme})
      on conflict (key) do update set value = ${data.theme}
    `;
    await sql`
      insert into settings (key, value) values ('logo', ${data.logo})
      on conflict (key) do update set value = ${data.logo}
    `;
    return { ok: true };
  });

export const setPlugin = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { slug?: string; enabled?: boolean }) => ({
    slug: cleanKey(String(input?.slug ?? "")),
    enabled: Boolean(input?.enabled),
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin changes plugins");
    const allowed = ["weather", "newsletter", "most-read", "share", "reading-progress", "related", "citations"];
    if (!allowed.includes(data.slug)) throw new Error("Unknown plugin");
    const sql = await db();
    await sql`
      insert into plugins (slug, enabled) values (${data.slug}, ${data.enabled})
      on conflict (slug) do update set enabled = ${data.enabled}
    `;
    return { ok: true };
  });

export const listPages = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) return [];
    const sql = await db();
    return sql<{ id: number; slug: string; lang: string; title: string; status: string; body: string }>`
      select id, slug, lang, title, status, body from pages order by slug, lang
    `;
  });

export const savePage = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Record<string, unknown>) => ({
    id: Number(input?.id) || 0,
    slug: cleanKey(String(input?.slug ?? "")),
    lang: LANGS.includes(String(input?.lang)) ? String(input?.lang) : "ckb",
    title: String(input?.title ?? "").trim().slice(0, 160),
    body: String(input?.body ?? "").slice(0, 20000),
    status: input?.status === "draft" ? "draft" : "published",
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) throw new Error("Editors manage pages");
    if (!data.slug || !data.title) throw new Error("Slug and title are required");
    const sql = await db();
    if (data.id) {
      await sql`
        update pages set slug = ${data.slug}, lang = ${data.lang}, title = ${data.title},
          body = ${data.body}, status = ${data.status}, updated_at = now()
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const inserted = await sql<{ id: number }>`
      insert into pages (slug, lang, title, body, status)
      values (${data.slug}, ${data.lang}, ${data.title}, ${data.body}, ${data.status})
      on conflict (slug, lang) do update set title = excluded.title, body = excluded.body, status = excluded.status, updated_at = now()
      returning id
    `;
    return { id: inserted[0]?.id ?? 0 };
  });

const STATUSES = ["draft", "review", "published", "rejected"];

export const setArticleStatus = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: number; status?: string }) => ({
    id: Number(input?.id) || 0,
    status: STATUSES.includes(String(input?.status)) ? String(input?.status) : "draft",
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role) || !data.id) throw new Error("You cannot change this story");
    const sql = await db();
    const rows = await sql<{ author_id: string; status: string; title: string; dek: string; group_key: string; kind: string }>`
      select author_id, status, title, dek, group_key, kind from articles where id = ${data.id}
    `;
    const row = rows[0];
    if (!row) throw new Error("Story not found");
    if (!canPublish(role) && row.author_id !== context.userId) throw new Error("Not your story");
    if (!canPublish(role) && (data.status === "published" || data.status === "rejected")) {
      throw new Error("Editors publish and reject");
    }
    await sql`
      update articles set
        status = ${data.status},
        published_at = case
          when ${data.status} = 'published' then coalesce(published_at, now())
          else published_at
        end,
        updated_at = now()
      where id = ${data.id}
    `;
    if (data.status === "published" && row.status !== "published") {
      const { notifyEveryone } = await import("./push.server");
      await notifyEveryone({
        title: row.title,
        body: row.dek || (row.kind === "post" ? "پۆست" : "وتار"),
        url: `/article/${row.group_key}`,
      });
    }
    return { ok: true };
  });

export const deleteArticle = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role) || !data) throw new Error("You cannot delete this story");
    const sql = await db();
    const rows = await sql<{ author_id: string; status: string }>`
      select author_id, status from articles where id = ${data}
    `;
    const row = rows[0];
    if (!row) throw new Error("Story not found");
    if (!canPublish(role) && (row.author_id !== context.userId || row.status === "published")) {
      throw new Error("You cannot delete this story");
    }
    await sql`delete from articles where id = ${data}`;
    return { ok: true };
  });

export const uploadAsset = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string; mime?: string; data?: string }) => ({
    name: String(input?.name ?? "file").replace(/[^\w.\- \u0600-\u06FF]+/g, "").slice(0, 80) || "file",
    mime: String(input?.mime ?? ""),
    data: String(input?.data ?? ""),
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canEdit(role)) throw new Error("You cannot upload");
    const ext = data.mime === "application/pdf" ? "pdf"
      : data.mime === "image/png" ? "png"
      : data.mime === "image/webp" ? "webp"
      : data.mime === "image/jpeg" ? "jpg"
      : "";
    if (!ext) throw new Error("Use a JPG, PNG, WEBP or PDF");
    if (data.data.length > 12_000_000) throw new Error("File is too large");
    const buf = Buffer.from(data.data, "base64");
    if (buf.length < 32 || buf.length > 8_000_000) throw new Error("File is too large");
    const { mkdir, writeFile } = await import("node:fs/promises");
    const { randomBytes } = await import("node:crypto");
    await mkdir("/workspace/public/uploads", { recursive: true });
    const stored = `${randomBytes(8).toString("hex")}.${ext}`;
    await writeFile(`/workspace/public/uploads/${stored}`, buf);
    return { url: `/uploads/${stored}`, name: data.name };
  });

export const requestWriter = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { name?: string }) => ({ name: String(input?.name ?? "").trim().slice(0, 80) }))
  .handler(async ({ context, data }) => {
    const role = await ensureProfile(context.userId, data.name);
    if (role !== "reader") return { role };
    const sql = await db();
    await sql`update profiles set role = 'pending' where user_id = ${context.userId} and role = 'reader'`;
    return { role: "pending" };
  });

export const listMenu = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .validator((lang: string) => (isLang(lang) ? lang : "ckb"))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) return [];
    const sql = await db();
    return sql<{ id: number; lang: string; label: string; href: string; parent_id: number | null; sort: number; mega: boolean }>`
      select id, lang, label, href, parent_id, sort, mega
      from nav_items where lang = ${data}
      order by sort, id
    `;
  });

export const saveMenuItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: Record<string, unknown>) => ({
    id: Number(input?.id) || 0,
    lang: isLang(input?.lang) ? String(input.lang) : "ckb",
    label: String(input?.label ?? "").trim().slice(0, 80),
    href: String(input?.href ?? "").trim().slice(0, 200),
    parentId: Number(input?.parentId) || 0,
    sort: Math.max(0, Math.min(999, Number(input?.sort) || 0)),
    mega: Boolean(input?.mega),
  }))
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role)) throw new Error("Editors manage menus");
    if (!data.label) throw new Error("Label is required");
    const href = data.href.startsWith("/") ? data.href : `/${data.href}`;
    const sql = await db();
    const parent = data.parentId || null;
    if (data.id) {
      await sql`
        update nav_items set
          lang = ${data.lang}, label = ${data.label}, href = ${href},
          parent_id = ${parent}, sort = ${data.sort}, mega = ${data.mega}
        where id = ${data.id}
      `;
      return { id: data.id };
    }
    const inserted = await sql<{ id: number }>`
      insert into nav_items (lang, label, href, parent_id, sort, mega)
      values (${data.lang}, ${data.label}, ${href}, ${parent}, ${data.sort}, ${data.mega})
      returning id
    `;
    return { id: inserted[0]?.id ?? 0 };
  });

export const deleteMenuItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canPublish(role) || !data) throw new Error("Editors manage menus");
    const sql = await db();
    await sql`delete from nav_items where parent_id = ${data}`;
    await sql`delete from nav_items where id = ${data}`;
    return { ok: true };
  });

export const saveEnabledLangs = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((ids: string[]) => {
    const list = (Array.isArray(ids) ? ids : []).filter((id) => isLang(id));
    if (!list.includes("ckb")) list.unshift("ckb");
    return list;
  })
  .handler(async ({ context, data }) => {
    const role = await roleOf(context.userId);
    if (!canManage(role)) throw new Error("Only a superadmin changes languages");
    const sql = await db();
    const value = JSON.stringify(data);
    await sql`
      insert into settings (key, value) values ('enabled_langs', ${value})
      on conflict (key) do update set value = ${value}
    `;
    return { ok: true };
  });

export const ALL_LANG_META = LANG_META;
