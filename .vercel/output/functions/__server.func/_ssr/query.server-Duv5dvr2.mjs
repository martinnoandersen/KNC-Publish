import { i as getSql } from "./db-DeokRw6q.mjs";
import { a as langMeta, i as isLang, l as t, o as minutesOf, r as formatWhen, t as FALLBACK_LANGS } from "./i18n-J2xLYLI0.mjs";
import { a as locList, i as loc, n as asRefs } from "./text-CidIKiEz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/query.server-Duv5dvr2.js
var SELECT = `
  select a.id, a.group_key, a.lang, a.kind, a.type, a.status, a.title, a.dek, a.body,
    a.image, a.image_caption, a.category_slug, a.author_id, a.refs, a.views, a.review_note,
    to_char(a.published_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"') as published_at,
    p.display_name, p.slug as author_slug, p.title as author_title
  from articles a
  join profiles p on p.user_id = a.author_id
`;
async function loadRows(sql, status) {
	if (status) return sql.query(`${SELECT} where a.status = $1`, [status]);
	return sql.query(SELECT);
}
async function maps(sql) {
	const [cats, places, links, tagRows] = await Promise.all([
		sql`select slug, name, sort from categories order by sort, slug`,
		sql`select article_id, zone from placements`,
		sql`
      select at.article_id, t.slug, t.name
      from article_tags at join tags t on t.id = at.tag_id
    `,
		sql`select slug, name from tags order by slug`
	]);
	const zones = /* @__PURE__ */ new Map();
	for (const row of places) {
		const list = zones.get(row.article_id) ?? [];
		list.push(row.zone);
		zones.set(row.article_id, list);
	}
	const tags = /* @__PURE__ */ new Map();
	for (const row of links) {
		const list = tags.get(row.article_id) ?? [];
		list.push({
			slug: row.slug,
			name: row.name
		});
		tags.set(row.article_id, list);
	}
	return {
		cats,
		zones,
		tags,
		tagRows
	};
}
function pick(rows, lang) {
	return rows.find((row) => row.lang === lang) ?? FALLBACK_LANGS.map((id) => rows.find((row) => row.lang === id)).find(Boolean) ?? rows[0];
}
function groupOf(rows) {
	const map = /* @__PURE__ */ new Map();
	for (const row of rows) {
		const list = map.get(row.group_key) ?? [];
		list.push(row);
		map.set(row.group_key, list);
	}
	return map;
}
function toCard(row, siblings, lang, zones, tags, catName) {
	const tagList = (tags.get(row.id) ?? []).map((tag) => ({
		slug: tag.slug,
		name: loc(tag.name, lang) || tag.slug
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
		status: row.status
	};
}
function toFull(row, siblings, lang, zones, tags, catName) {
	return {
		...toCard(row, siblings, lang, zones, tags, catName),
		body: row.body,
		refs: asRefs(row.refs),
		reviewNote: row.review_note ?? "",
		authorId: row.author_id
	};
}
function picked(rows, lang, pack) {
	const catName = new Map(pack.cats.map((cat) => [cat.slug, loc(cat.name, lang)]));
	const stories = [];
	for (const siblings of groupOf(rows).values()) {
		const row = pick(siblings, lang);
		if (!row) continue;
		stories.push(toFull(row, siblings, lang, pack.zones, pack.tags, catName));
	}
	stories.sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
	return {
		stories,
		catName,
		cats: pack.cats
	};
}
async function getBootData(langInput) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const lang = isLang(langInput) ? langInput : "ckb";
	const [settings, plugins, cats] = await Promise.all([
		sql`select key, value from settings`,
		sql`select slug from plugins where enabled = true order by slug`,
		sql`select slug, name, sort from categories order by sort, slug`
	]);
	const bag = new Map(settings.map((row) => [row.key, row.value]));
	return {
		lang,
		dir: langMeta(lang).dir,
		theme: bag.get("theme") || "classic",
		logo: bag.get("logo") || "",
		plugins: plugins.map((row) => row.slug),
		categories: cats.map((cat) => ({
			slug: cat.slug,
			name: loc(cat.name, lang) || cat.slug
		})),
		tagline: t(lang, "tagline"),
		today: formatWhen(lang, (/* @__PURE__ */ new Date()).toISOString(), true)
	};
}
async function getHomeData(lang) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
	const { stories, cats } = picked(rows, lang, pack);
	const inZone = (zone) => stories.filter((story) => story.zones.includes(zone));
	const hero = inZone("hero").slice(0, 5);
	const lead = inZone("lead").slice(0, 3);
	const latest = inZone("latest");
	const sidebar = inZone("sidebar");
	const sections = cats.map((cat) => ({
		slug: cat.slug,
		name: loc(cat.name, lang) || cat.slug,
		stories: inZone(`section:${cat.slug}`).slice(0, 4)
	})).filter((section) => section.stories.length > 0);
	const used = /* @__PURE__ */ new Set();
	for (const story of [
		...hero,
		...lead,
		...latest,
		...sidebar,
		...sections.flatMap((s) => s.stories)
	]) used.add(story.id);
	const mostRead = [...stories].filter((story) => !used.has(story.id)).sort((a, b) => b.views - a.views).slice(0, 5);
	const counts = /* @__PURE__ */ new Map();
	for (const story of stories) for (const tag of story.tags) {
		const cur = counts.get(tag.slug) ?? {
			...tag,
			n: 0
		};
		cur.n += 1;
		counts.set(tag.slug, cur);
	}
	const tags = [...counts.values()].sort((a, b) => b.n - a.n).slice(0, 8).map(({ slug, name }) => ({
		slug,
		name
	}));
	const strip = ({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card;
	return {
		hero: hero.map(strip),
		lead: lead.map(strip),
		sections: sections.map((section) => ({
			...section,
			stories: section.stories.map(strip)
		})),
		latest: latest.map(strip),
		sidebar: sidebar.map(strip),
		mostRead: mostRead.map(strip),
		tags
	};
}
async function getStoryData(groupKey, lang) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
	const { stories } = picked(rows, lang, pack);
	const story = stories.find((item) => item.groupKey === groupKey);
	if (!story) return null;
	return {
		story,
		related: stories.filter((item) => item.groupKey !== groupKey && item.category === story.category).slice(0, 3).map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card)
	};
}
async function getListingData(opts) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
	let { stories } = picked(rows, opts.lang, pack);
	if (opts.category) stories = stories.filter((story) => story.category === opts.category);
	if (opts.kind) stories = stories.filter((story) => story.kind === opts.kind);
	if (opts.tag) stories = stories.filter((story) => story.tags.some((tag) => tag.slug === opts.tag));
	return stories.map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
}
async function searchData(query, lang) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
	const q = query.trim().toLowerCase();
	const grouped = groupOf(rows);
	const keys = /* @__PURE__ */ new Set();
	if (!q) for (const key of grouped.keys()) keys.add(key);
	else for (const [key, siblings] of grouped) if (siblings.some((row) => `${row.title} ${row.dek} ${row.body}`.toLowerCase().includes(q))) keys.add(key);
	const { stories } = picked(rows.filter((row) => keys.has(row.group_key)), lang, pack);
	return stories.slice(0, 24).map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
}
async function getAuthorData(slug, lang) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const person = (await sql`select * from profiles where slug = ${slug}`)[0];
	if (!person) return null;
	const [rows, pack] = await Promise.all([loadRows(sql, "published"), maps(sql)]);
	const { stories, cats } = picked(rows.filter((row) => row.author_id === person.user_id), lang, pack);
	const cards = stories.map(({ body: _b, refs: _r, reviewNote: _n, authorId: _a, ...card }) => card);
	const groups = cats.map((cat) => ({
		category: cat.slug,
		categoryName: loc(cat.name, lang) || cat.slug,
		stories: cards.filter((story) => story.category === cat.slug)
	})).filter((group) => group.stories.length > 0);
	const tagMap = /* @__PURE__ */ new Map();
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
		role: person.role
	};
}
async function getPageData(slug, lang) {
	const sql = await getSql();
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	const rows = await sql`
    select slug, lang, title, body from pages where slug = ${slug} and status = 'published'
  `;
	if (rows.length === 0) return null;
	const row = rows.find((item) => item.lang === lang) ?? FALLBACK_LANGS.map((id) => rows.find((item) => item.lang === id)).find(Boolean) ?? rows[0];
	if (!row) return null;
	return {
		slug: row.slug,
		lang: row.lang,
		title: row.title,
		body: row.body,
		availableLangs: rows.map((item) => item.lang)
	};
}
async function bumpView(id) {
	await (await getSql())`update articles set views = views + 1 where id = ${id} and status = 'published'`;
}
//#endregion
export { bumpView, getAuthorData, getBootData, getHomeData, getListingData, getPageData, getStoryData, searchData };
