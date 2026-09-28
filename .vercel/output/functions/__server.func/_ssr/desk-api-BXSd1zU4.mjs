import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { i as isLang } from "./i18n-J2xLYLI0.mjs";
import { o as slugify, r as cleanKey, t as asJson } from "./text-CidIKiEz.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-api-BXSd1zU4.js
var LANGS = [
	"ckb",
	"kmr",
	"en",
	"ar",
	"fa",
	"tr",
	"de",
	"fr",
	"es"
];
var ZONES = /* @__PURE__ */ new Set([
	"hero",
	"lead",
	"latest",
	"sidebar"
]);
async function db() {
	const { getSql } = await import("./db-DeokRw6q.mjs").then((n) => n.t).then((n) => n.t);
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	return getSql();
}
async function roleOf(userId) {
	const role = (await (await db())`select role from profiles where user_id = ${userId}`)[0]?.role;
	if (role === "superadmin" || role === "editor" || role === "writer" || role === "reader") return role;
	return "reader";
}
function canEdit(role) {
	return role === "writer" || role === "editor" || role === "superadmin";
}
function canPublish(role) {
	return role === "editor" || role === "superadmin";
}
function canManage(role) {
	return role === "superadmin";
}
function tagSlug(label) {
	const latin = slugify(label);
	if (latin) return latin;
	let hash = 0;
	for (const ch of label.trim()) hash = hash * 33 + (ch.codePointAt(0) ?? 0) >>> 0;
	return `t${hash.toString(36)}`;
}
function safeImage(url) {
	const value = url.trim().slice(0, 400);
	if (!value) return "";
	if (value.startsWith("/media/")) return value;
	if (/^https:\/\/[^\s]+$/.test(value)) return value;
	return "";
}
function parseLines(text) {
	return text.split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 12).map((line) => {
		const [years, place, detail] = line.split("|").map((part) => part.trim());
		return {
			years: years ?? "",
			place: place ?? "",
			detail: detail ?? ""
		};
	});
}
async function ensureProfile(userId, name) {
	const sql = await db();
	if ((await sql`select user_id from profiles where user_id = ${userId}`).length === 0) {
		await sql`
      insert into profiles (user_id, slug, display_name, role, is_staff)
      values (${userId}, ${`${slugify(name) || "writer"}-${userId.replace(/[^a-z0-9]/gi, "").slice(0, 8).toLowerCase() || "user"}`}, ${name || "Writer"}, 'reader', false)
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
var syncProfile_createServerFn_handler = createServerRpc({
	id: "7181df4825593b158894f0898f7081cf8139a9b4db11c180323f4e8dd04df704",
	name: "syncProfile",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => syncProfile.__executeServer(opts));
var syncProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ name: String(input?.name ?? "").trim().slice(0, 80) })).handler(syncProfile_createServerFn_handler, async ({ context, data }) => {
	return { role: await ensureProfile(context.userId, data.name) };
});
var deskBoot_createServerFn_handler = createServerRpc({
	id: "4dd6676db5a92d3ff531f11538c70b1b16a93e97ffb10ca3d594aa7758f557a8",
	name: "deskBoot",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => deskBoot.__executeServer(opts));
var deskBoot = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskBoot_createServerFn_handler, async ({ context }) => {
	const role = await ensureProfile(context.userId, "");
	const sql = await db();
	const [cats, tagRows, groups, articles, plugins, settings] = await Promise.all([
		sql`select slug, name from categories order by sort, slug`,
		sql`select slug, name from tags order by slug`,
		sql`
        select group_key, title, lang from articles order by group_key, lang
      `,
		sql`select status, author_id from articles`,
		sql`select slug, enabled from plugins order by slug`,
		sql`select key, value from settings`
	]);
	const mine = articles.filter((row) => row.author_id === context.userId);
	const visible = canPublish(role) ? articles : mine;
	const bag = new Map(settings.map((row) => [row.key, row.value]));
	const byGroup = /* @__PURE__ */ new Map();
	for (const row of groups) {
		const cur = byGroup.get(row.group_key) ?? {
			key: row.group_key,
			title: row.title,
			langs: []
		};
		cur.langs.push(row.lang);
		if (row.lang === "ckb" || !cur.title) cur.title = row.title;
		byGroup.set(row.group_key, cur);
	}
	return {
		role,
		categories: cats.map((cat) => ({
			slug: cat.slug,
			name: cat.name
		})),
		tags: tagRows.map((tag) => ({
			slug: tag.slug,
			name: tag.name
		})),
		groups: [...byGroup.values()],
		plugins: plugins.map((row) => ({
			slug: row.slug,
			enabled: Boolean(row.enabled)
		})),
		theme: bag.get("theme") || "classic",
		logo: bag.get("logo") || "",
		counts: {
			published: visible.filter((row) => row.status === "published").length,
			review: visible.filter((row) => row.status === "review").length,
			drafts: visible.filter((row) => row.status === "draft" || row.status === "rejected").length
		}
	};
});
var listDeskStories_createServerFn_handler = createServerRpc({
	id: "4dcaf2ead8261a18d41e8c12cc3b772fe9c904a9c88a6eb817af26e0510771ec",
	name: "listDeskStories",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => listDeskStories.__executeServer(opts));
var listDeskStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listDeskStories_createServerFn_handler, async ({ context }) => {
	const role = await roleOf(context.userId);
	if (!canEdit(role)) return [];
	const rows = await (await db())`
      select a.id, a.group_key, a.lang, a.kind, a.type, a.status, a.title, a.author_id, p.display_name
      from articles a join profiles p on p.user_id = a.author_id
      order by a.updated_at desc
    `;
	return (canPublish(role) ? rows : rows.filter((row) => row.author_id === context.userId)).map((row) => ({
		id: row.id,
		groupKey: row.group_key,
		lang: row.lang,
		kind: row.kind,
		type: row.type,
		status: row.status,
		title: row.title,
		authorName: row.display_name,
		mine: row.author_id === context.userId
	}));
});
var getEditable_createServerFn_handler = createServerRpc({
	id: "c8d75e7b19e0821154de7e8b1350563bce296e532458a26952005fb29d0f4563",
	name: "getEditable",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => getEditable.__executeServer(opts));
var getEditable = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(getEditable_createServerFn_handler, async ({ context, data }) => {
	const role = await roleOf(context.userId);
	if (!canEdit(role) || !data) return null;
	const sql = await db();
	const row = (await sql`
      select id, group_key, lang, kind, type, status, title, dek, body, image, image_caption,
        category_slug, author_id, refs, review_note
      from articles where id = ${data}
    `)[0];
	if (!row) return null;
	if (!canPublish(role) && row.author_id !== context.userId) return null;
	const [zones, tagRows] = await Promise.all([sql`select zone from placements where article_id = ${row.id}`, sql`
        select t.name, t.slug from article_tags at join tags t on t.id = at.tag_id where at.article_id = ${row.id}
      `]);
	return {
		id: row.id,
		groupKey: row.group_key,
		lang: row.lang,
		kind: row.kind,
		type: row.type,
		status: row.status,
		title: row.title,
		dek: row.dek,
		body: row.body,
		image: row.image,
		imageCaption: row.image_caption,
		category: row.category_slug,
		refs: asJson(row.refs, []),
		reviewNote: row.review_note,
		zones: zones.map((zone) => zone.zone),
		tags: tagRows.map((tag) => tag.slug).join(", "),
		locked: !canPublish(role) && row.status === "published"
	};
});
function cleanArticle(input) {
	const raw = input ?? {};
	const title = String(raw.title ?? "").trim().slice(0, 200);
	if (!title) throw new Error("Title is required");
	const lang = LANGS.includes(String(raw.lang)) ? String(raw.lang) : "ckb";
	const kind = raw.kind === "post" ? "post" : "article";
	const type = raw.type === "premium" || raw.type === "scientific" ? raw.type : "standard";
	const action = [
		"draft",
		"review",
		"publish",
		"reject"
	].includes(String(raw.action)) ? String(raw.action) : "draft";
	const zones = Array.isArray(raw.zones) ? raw.zones.map((zone) => String(zone)).slice(0, 24) : [];
	const refs = Array.isArray(raw.refs) ? raw.refs.slice(0, 16).map((item) => {
		const ref = item ?? {};
		return {
			authors: String(ref.authors ?? "").slice(0, 160),
			year: String(ref.year ?? "").slice(0, 12),
			title: String(ref.title ?? "").slice(0, 220),
			source: String(ref.source ?? "").slice(0, 180)
		};
	}).filter((ref) => ref.title || ref.authors) : [];
	return {
		id: Number(raw.id) || 0,
		groupKey: cleanKey(String(raw.groupKey ?? "")),
		lang,
		kind,
		type,
		title,
		dek: String(raw.dek ?? "").trim().slice(0, 400),
		body: String(raw.body ?? "").slice(0, 2e4),
		image: safeImage(String(raw.image ?? "")),
		imageCaption: String(raw.imageCaption ?? "").trim().slice(0, 240),
		category: cleanKey(String(raw.category ?? "")),
		tags: String(raw.tags ?? "").slice(0, 400),
		zones,
		refs,
		action,
		reviewNote: String(raw.reviewNote ?? "").trim().slice(0, 800)
	};
}
var saveArticle_createServerFn_handler = createServerRpc({
	id: "95f4ac970eeed06b1d95bd74c9900b60bbc1ea295e60586f3759f32e0ff32ce6",
	name: "saveArticle",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => saveArticle.__executeServer(opts));
var saveArticle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(cleanArticle).handler(saveArticle_createServerFn_handler, async ({ context, data }) => {
	const role = await roleOf(context.userId);
	if (!canEdit(role)) throw new Error("You cannot edit stories");
	const sql = await db();
	let status = data.action === "review" ? "review" : "draft";
	if (data.action === "publish") status = canPublish(role) ? "published" : "review";
	if (data.action === "reject") status = canPublish(role) ? "rejected" : "draft";
	let id = data.id;
	let authorId = context.userId;
	if (id) {
		const row = (await sql`
        select author_id, status, published_at::text as published_at from articles where id = ${id}
      `)[0];
		if (!row) throw new Error("Story not found");
		if (!canPublish(role) && row.author_id !== context.userId) throw new Error("Not your story");
		if (!canPublish(role) && row.status === "published") throw new Error("Published stories are locked");
		authorId = row.author_id;
	}
	const groupKey = data.groupKey || slugify(data.title) || `story-${Date.now().toString(36)}`;
	if ((await sql`
      select id from articles where group_key = ${groupKey} and lang = ${data.lang} and id <> ${id || 0}
    `).length > 0) throw new Error("This language already exists for that story");
	const allowedZones = data.zones.filter((zone) => ZONES.has(zone) || zone.startsWith("section:"));
	if (id) await sql`
        update articles set
          group_key = ${groupKey},
          lang = ${data.lang},
          kind = ${data.kind},
          type = ${data.type},
          status = ${status},
          title = ${data.title},
          dek = ${data.dek},
          body = ${data.body},
          image = ${data.image},
          image_caption = ${data.imageCaption},
          category_slug = ${data.category},
          refs = ${JSON.stringify(data.refs)},
          review_note = ${data.reviewNote},
          reviewed_by = ${data.action === "publish" || data.action === "reject" ? context.userId : ""},
          published_at = case
            when ${status} = 'published' then coalesce(published_at, now())
            else published_at
          end,
          updated_at = now()
        where id = ${id}
      `;
	else id = (await sql`
        insert into articles (
          group_key, lang, kind, type, status, title, dek, body, image, image_caption,
          category_slug, author_id, refs, review_note, reviewed_by, published_at
        ) values (
          ${groupKey}, ${data.lang}, ${data.kind}, ${data.type}, ${status}, ${data.title}, ${data.dek},
          ${data.body}, ${data.image}, ${data.imageCaption}, ${data.category}, ${authorId},
          ${JSON.stringify(data.refs)}, ${data.reviewNote},
          ${data.action === "publish" || data.action === "reject" ? context.userId : ""},
          ${status === "published" ? (/* @__PURE__ */ new Date()).toISOString() : null}
        )
        returning id
      `)[0]?.id ?? 0;
	await sql`delete from placements where article_id = ${id}`;
	for (const zone of allowedZones) await sql`insert into placements (article_id, zone) values (${id}, ${zone}) on conflict do nothing`;
	await sql`delete from article_tags where article_id = ${id}`;
	for (const label of data.tags.split(",").map((part) => part.trim()).filter(Boolean).slice(0, 12)) {
		const slug = tagSlug(label);
		const existing = await sql`select id, name from tags where slug = ${slug}`;
		let tagId = existing[0]?.id;
		if (!tagId) {
			tagId = (await sql`
          insert into tags (slug, name) values (${slug}, ${JSON.stringify({ [data.lang]: label })})
          on conflict (slug) do nothing
          returning id
        `)[0]?.id;
			if (!tagId) tagId = (await sql`select id from tags where slug = ${slug}`)[0]?.id;
		} else {
			const names = asJson(existing[0]?.name, {});
			if (!names[data.lang]) {
				names[data.lang] = label;
				await sql`update tags set name = ${JSON.stringify(names)} where id = ${tagId}`;
			}
		}
		if (tagId) await sql`insert into article_tags (article_id, tag_id) values (${id}, ${tagId}) on conflict do nothing`;
	}
	return {
		id,
		groupKey
	};
});
var saveProfile_createServerFn_handler = createServerRpc({
	id: "df64f2e343a0b5d8148804f1e199411c47633e327b3f263d8fd9a17b235ece9f",
	name: "saveProfile",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	lang: isLang(input?.lang) ? input.lang : "ckb",
	displayName: String(input?.displayName ?? "").trim().slice(0, 80),
	title: String(input?.title ?? "").trim().slice(0, 120),
	location: String(input?.location ?? "").trim().slice(0, 80),
	languages: String(input?.languages ?? "").trim().slice(0, 120),
	email: String(input?.email ?? "").trim().slice(0, 120),
	bio: String(input?.bio ?? "").trim().slice(0, 2e3),
	education: String(input?.education ?? "").slice(0, 2e3),
	experience: String(input?.experience ?? "").slice(0, 2e3)
})).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId, data.displayName);
	const sql = await db();
	const row = (await sql`select display_name, title, location, bio, education, experience from profiles where user_id = ${context.userId}`)[0];
	if (!row) throw new Error("Profile missing");
	const mergeText = (current, value) => {
		if (current.trim().startsWith("{")) {
			const obj = asJson(current, {});
			obj[data.lang] = value;
			return JSON.stringify(obj);
		}
		return value || current;
	};
	const edu = asJson(row.education, {});
	const exp = asJson(row.experience, {});
	edu[data.lang] = parseLines(data.education);
	exp[data.lang] = parseLines(data.experience);
	const bio = asJson(row.bio, {});
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
	return { slug: (await sql`select slug from profiles where user_id = ${context.userId}`)[0]?.slug ?? "" };
});
var myProfile_createServerFn_handler = createServerRpc({
	id: "f72e71168631dfb68c36097f427c67ef105967b5702625717d9fcb8aa7df66b5",
	name: "myProfile",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => myProfile.__executeServer(opts));
var myProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((lang) => isLang(lang) ? lang : "ckb").handler(myProfile_createServerFn_handler, async ({ context, data }) => {
	await ensureProfile(context.userId, "");
	const row = (await (await db())`
      select slug, display_name, title, location, languages, email_public, bio, education, experience, role
      from profiles where user_id = ${context.userId}
    `)[0];
	if (!row) return null;
	const { loc, locList } = await import("./text-CidIKiEz.mjs").then((n) => n.s).then((n) => n.s);
	const edu = locList(row.education, data);
	const exp = locList(row.experience, data);
	const line = (list) => list.map((item) => [
		item.years,
		item.place,
		item.detail
	].filter(Boolean).join(" | ")).join("\n");
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
		experience: line(exp)
	};
});
var listPeople_createServerFn_handler = createServerRpc({
	id: "9f63d15048f9dadbc5fd9cd58b4a3bdd39030f8a413dbddcb7317d963225ad97",
	name: "listPeople",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => listPeople.__executeServer(opts));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPeople_createServerFn_handler, async ({ context }) => {
	if (!canManage(await roleOf(context.userId))) return [];
	return (await (await db())`select user_id, slug, display_name, role, is_staff from profiles order by is_staff desc, display_name`).map((row) => ({
		id: row.user_id,
		slug: row.slug,
		name: row.display_name,
		role: row.role,
		staff: Boolean(row.is_staff)
	}));
});
var setRole_createServerFn_handler = createServerRpc({
	id: "f12501bafeb5886aedf02023c529440cddb68939790b2c3dafd1fedad002e2d1",
	name: "setRole",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => setRole.__executeServer(opts));
var setRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: String(input?.id ?? "").slice(0, 80),
	role: [
		"reader",
		"writer",
		"editor",
		"superadmin"
	].includes(String(input?.role)) ? String(input.role) : "reader"
})).handler(setRole_createServerFn_handler, async ({ context, data }) => {
	if (!canManage(await roleOf(context.userId))) throw new Error("Only a superadmin can change roles");
	if (!data.id || data.id === context.userId) throw new Error("You cannot change your own role here");
	const sql = await db();
	const target = await sql`
      select role, is_staff from profiles where user_id = ${data.id}
    `;
	if (!target[0] || target[0].is_staff) throw new Error("Staff bylines are not accounts");
	if (target[0].role === "superadmin" && data.role !== "superadmin") {
		const admins = await sql`select count(*)::int as n from profiles where role = 'superadmin'`;
		if ((Number(admins[0]?.n) || 0) <= 1) throw new Error("Keep at least one superadmin");
	}
	await sql`update profiles set role = ${data.role} where user_id = ${data.id}`;
	return { ok: true };
});
var saveTaxon_createServerFn_handler = createServerRpc({
	id: "cb57189453d60ce1686ab237c0ce17f5460d6414027163f93e2d93a9511e531c",
	name: "saveTaxon",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => saveTaxon.__executeServer(opts));
var saveTaxon = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	kind: input?.kind === "tag" ? "tag" : "category",
	slug: cleanKey(String(input?.slug ?? "")),
	name: String(input?.name ?? "").trim().slice(0, 80),
	lang: isLang(input?.lang) ? input.lang : "ckb"
})).handler(saveTaxon_createServerFn_handler, async ({ context, data }) => {
	if (!canPublish(await roleOf(context.userId))) throw new Error("Editors manage categories");
	if (!data.slug || !data.name) throw new Error("Name and slug are required");
	const sql = await db();
	if (data.kind === "category") {
		const existing = await sql`select name from categories where slug = ${data.slug}`;
		const names = asJson(existing[0]?.name, {});
		names[data.lang] = data.name;
		if (existing.length === 0) await sql`insert into categories (slug, name, sort) values (${data.slug}, ${JSON.stringify(names)}, 50)`;
		else await sql`update categories set name = ${JSON.stringify(names)} where slug = ${data.slug}`;
	} else {
		const existing = await sql`select name from tags where slug = ${data.slug}`;
		const names = asJson(existing[0]?.name, {});
		names[data.lang] = data.name;
		if (existing.length === 0) await sql`insert into tags (slug, name) values (${data.slug}, ${JSON.stringify(names)})`;
		else await sql`update tags set name = ${JSON.stringify(names)} where slug = ${data.slug}`;
	}
	return { ok: true };
});
var saveAppearance_createServerFn_handler = createServerRpc({
	id: "ae56abab7fad1d2e1ce0497f90184beb94d29c6ad2a636541457fb75e5b1568a",
	name: "saveAppearance",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => saveAppearance.__executeServer(opts));
var saveAppearance = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	theme: [
		"classic",
		"night",
		"warm"
	].includes(String(input?.theme)) ? String(input.theme) : "classic",
	logo: safeImage(String(input?.logo ?? ""))
})).handler(saveAppearance_createServerFn_handler, async ({ context, data }) => {
	if (!canManage(await roleOf(context.userId))) throw new Error("Only a superadmin changes the theme");
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
var setPlugin_createServerFn_handler = createServerRpc({
	id: "12a1407eb2fa28283b9adfc3557d03f1badefb41629217b63272a3d20eebbbb5",
	name: "setPlugin",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => setPlugin.__executeServer(opts));
var setPlugin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	slug: cleanKey(String(input?.slug ?? "")),
	enabled: Boolean(input?.enabled)
})).handler(setPlugin_createServerFn_handler, async ({ context, data }) => {
	if (!canManage(await roleOf(context.userId))) throw new Error("Only a superadmin changes plugins");
	if (![
		"weather",
		"newsletter",
		"most-read",
		"share",
		"reading-progress",
		"related",
		"citations"
	].includes(data.slug)) throw new Error("Unknown plugin");
	await (await db())`
      insert into plugins (slug, enabled) values (${data.slug}, ${data.enabled})
      on conflict (slug) do update set enabled = ${data.enabled}
    `;
	return { ok: true };
});
var listPages_createServerFn_handler = createServerRpc({
	id: "92021bf7adc3d84168bd94d705b9c2220a5b493a913ae33f8eaed8cc8d7ea9de",
	name: "listPages",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => listPages.__executeServer(opts));
var listPages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listPages_createServerFn_handler, async ({ context }) => {
	if (!canPublish(await roleOf(context.userId))) return [];
	return (await db())`
      select id, slug, lang, title, status, body from pages order by slug, lang
    `;
});
var savePage_createServerFn_handler = createServerRpc({
	id: "b3fac2c0b3b48fde2d820803956834cb072d942ce9a3d80ea2d286877d90db42",
	name: "savePage",
	filename: "src/lib/content/desk-api.ts"
}, (opts) => savePage.__executeServer(opts));
var savePage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	slug: cleanKey(String(input?.slug ?? "")),
	lang: LANGS.includes(String(input?.lang)) ? String(input?.lang) : "ckb",
	title: String(input?.title ?? "").trim().slice(0, 160),
	body: String(input?.body ?? "").slice(0, 2e4),
	status: input?.status === "draft" ? "draft" : "published"
})).handler(savePage_createServerFn_handler, async ({ context, data }) => {
	if (!canPublish(await roleOf(context.userId))) throw new Error("Editors manage pages");
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
	return { id: (await sql`
      insert into pages (slug, lang, title, body, status)
      values (${data.slug}, ${data.lang}, ${data.title}, ${data.body}, ${data.status})
      on conflict (slug, lang) do update set title = excluded.title, body = excluded.body, status = excluded.status, updated_at = now()
      returning id
    `)[0]?.id ?? 0 };
});
//#endregion
export { deskBoot_createServerFn_handler, getEditable_createServerFn_handler, listDeskStories_createServerFn_handler, listPages_createServerFn_handler, listPeople_createServerFn_handler, myProfile_createServerFn_handler, saveAppearance_createServerFn_handler, saveArticle_createServerFn_handler, savePage_createServerFn_handler, saveProfile_createServerFn_handler, saveTaxon_createServerFn_handler, setPlugin_createServerFn_handler, setRole_createServerFn_handler, syncProfile_createServerFn_handler };
