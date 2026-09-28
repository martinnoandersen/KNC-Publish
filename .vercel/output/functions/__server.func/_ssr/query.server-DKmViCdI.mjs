import { i as getSql } from "./db-DeokRw6q.mjs";
import { i as isLang } from "./i18n-J2xLYLI0.mjs";
import { i as loc } from "./text-CidIKiEz.mjs";
import { getListingData } from "./query.server-Duv5dvr2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/query.server-DKmViCdI.js
var STAMP = `to_char(created_at at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')`;
function preferLang(rows, lang) {
	const exact = rows.filter((row) => row.lang === lang);
	if (exact.length) return exact;
	const ckb = rows.filter((row) => row.lang === "ckb");
	if (ckb.length) return ckb;
	const en = rows.filter((row) => row.lang === "en");
	return en.length ? en : rows;
}
async function ready() {
	const { ensureSeed } = await import("./seed.server-DAQYgnhU.mjs");
	await ensureSeed();
	return getSql();
}
function safeHref(value) {
	const v = value.trim().slice(0, 200);
	if (!v) return "";
	if (v.startsWith("/") && !v.startsWith("//") && !v.includes("\\")) return v;
	if (/^https:\/\/[^\s]+$/.test(v)) return v;
	return "";
}
function langOf(value) {
	return isLang(value) ? value : "ckb";
}
async function roleOf(userId) {
	return (await (await ready())`select role from profiles where user_id = ${userId}`)[0]?.role ?? "reader";
}
async function assertEditor(userId) {
	const role = await roleOf(userId);
	if (role !== "editor" && role !== "superadmin") throw new Error("forbidden");
	return role;
}
async function ensureReader(userId) {
	const sql = await ready();
	if ((await sql`select user_id from profiles where user_id = ${userId}`).length === 0) await sql`
      insert into profiles (user_id, slug, display_name, role, is_staff)
      values (${userId}, ${`reader-${userId.replace(/[^a-z0-9]/gi, "").slice(0, 10).toLowerCase() || "user"}`}, ${"Reader"}, 'reader', false)
      on conflict (user_id) do nothing
    `;
}
async function listWires(lang, all = false) {
	const mapped = (await (await ready()).query(`select id, lang, kicker, text, href, urgent, active,
      ${STAMP} as created_at
     from wires
     ${all ? "" : "where active = true"}
     order by urgent desc, created_at desc
     limit 40`)).map((row) => ({
		id: Number(row.id),
		lang: row.lang,
		kicker: row.kicker,
		text: row.text,
		href: row.href,
		urgent: Boolean(row.urgent),
		active: Boolean(row.active),
		createdAt: row.created_at
	}));
	return all ? mapped : preferLang(mapped, lang);
}
async function saveWire(userId, input) {
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
	const rows = await sql`
    insert into wires (lang, kicker, text, href, urgent, active)
    values (${lang}, ${kicker}, ${text}, ${href}, ${input.urgent}, true)
    returning id
  `;
	return { id: Number(rows[0]?.id ?? 0) };
}
async function setWireActive(userId, id, active) {
	await assertEditor(userId);
	await (await ready())`update wires set active = ${active} where id = ${id}`;
}
async function removeWire(userId, id) {
	await assertEditor(userId);
	await (await ready())`delete from wires where id = ${id}`;
}
function say(map, lang) {
	const bag = map;
	return bag[lang] || bag.en || bag.ckb || "";
}
function cultural(lang, year) {
	return [
		{
			m: 3,
			d: 21,
			title: {
				ckb: "نەورۆز",
				en: "Newroz",
				kmr: "Newroz",
				ar: "نوروز"
			},
			place: {
				ckb: "هەموو کوردستان",
				en: "Across Kurdistan",
				kmr: "Li Kurdistanê",
				ar: "في كردستان"
			},
			detail: {
				ckb: "سەری ساڵ، ئاگر و کۆبوونەوەی دەرەوە. ڕۆژژمێری ساڵانە.",
				en: "The new year, fire, and gatherings outdoors. An annual mark on the calendar.",
				kmr: "Sersal, agir û civînên derve.",
				ar: "رأس السنة والنار واللقاء في العراء."
			}
		},
		{
			m: 2,
			d: 21,
			title: {
				ckb: "ڕۆژی جیهانیی زمانی دایک",
				en: "Mother Language Day",
				kmr: "Roja zimanê dayikê",
				ar: "يوم اللغة الأم"
			},
			place: {
				ckb: "قوتابخانە و کتێبخانە",
				en: "Schools and libraries",
				kmr: "Dibistan û pirtûkgeh",
				ar: "المدارس والمكتبات"
			},
			detail: {
				ckb: "ڕۆژێک بۆ خوێندن و نووسین بەو زمانەی ماڵەوە.",
				en: "A day for reading and writing in the language of home.",
				kmr: "Rojek ji bo xwendin û nivîsandinê.",
				ar: "يوم للقراءة والكتابة بلغة البيت."
			}
		},
		{
			m: 5,
			d: 3,
			title: {
				ckb: "ئازادیی ڕۆژنامەگەری",
				en: "Press freedom",
				kmr: "Azadiya çapemeniyê",
				ar: "حرية الصحافة"
			},
			place: {
				ckb: "هەواڵنگە",
				en: "The newsroom",
				kmr: "Jûrnal",
				ar: "غرفة الأخبار"
			},
			detail: {
				ckb: "ڕۆژێک بۆ سەرچاوە، ڕاستکردنەوە و ئەو وتارەی کە دەبێت بمێنێت.",
				en: "A day for sources, corrections, and the story that has to stand.",
				kmr: "Rojek ji bo çavkanî û rastkirinê.",
				ar: "يوم للمصادر والتصحيحات."
			}
		},
		{
			m: 9,
			d: 8,
			title: {
				ckb: "خوێندنەوەی گشتی",
				en: "Literacy day",
				kmr: "Roja xwendinê",
				ar: "يوم القراءة"
			},
			place: {
				ckb: "کتێبخانەکان",
				en: "Libraries",
				kmr: "Pirtûkgeh",
				ar: "المكتبات"
			},
			detail: {
				ckb: "دەرگاکان درەنگتر دەکرێنەوە و خوێندنەوە بە دەنگ بەڕێوە دەچێت.",
				en: "Doors stay open later, and reading aloud is the program.",
				kmr: "Derî dirêjtir vekirî ne.",
				ar: "تبقى الأبواب مفتوحة حتى وقت متأخر."
			}
		}
	].map((item, index) => {
		const startsOn = `${year}-${String(item.m).padStart(2, "0")}-${String(item.d).padStart(2, "0")}`;
		return {
			id: -1 - index,
			lang,
			title: say(item.title, lang),
			place: say(item.place, lang),
			startsOn,
			detail: say(item.detail, lang),
			fixed: true
		};
	});
}
async function listEvents(lang) {
	const mine = preferLang((await (await ready()).query(`select id, lang, title, place, starts_on::text as starts_on, detail
     from events order by starts_on asc, id asc`)).map((row) => ({
		id: Number(row.id),
		lang: row.lang,
		title: row.title,
		place: row.place,
		startsOn: String(row.starts_on).slice(0, 10),
		detail: row.detail,
		fixed: false
	})), lang);
	return [...cultural(lang, (/* @__PURE__ */ new Date()).getUTCFullYear()), ...mine].sort((a, b) => a.startsOn.localeCompare(b.startsOn));
}
async function saveEvent(userId, input) {
	await assertEditor(userId);
	const title = input.title.trim().slice(0, 140);
	if (title.length < 2) throw new Error("empty");
	if (!/^\d{4}-\d{2}-\d{2}$/.test(input.startsOn)) throw new Error("date");
	const rows = await (await ready())`
    insert into events (lang, title, place, starts_on, detail)
    values (${langOf(input.lang)}, ${title}, ${input.place.trim().slice(0, 80)}, ${input.startsOn}, ${input.detail.trim().slice(0, 400)})
    returning id
  `;
	return { id: Number(rows[0]?.id ?? 0) };
}
async function removeEvent(userId, id) {
	await assertEditor(userId);
	if (id < 1) return;
	await (await ready())`delete from events where id = ${id}`;
}
async function listCorrections(lang) {
	return preferLang((await (await ready()).query(`select id, group_key, lang, note, ${STAMP} as created_at
     from corrections order by created_at desc limit 40`)).map((row) => ({
		id: Number(row.id),
		groupKey: row.group_key,
		lang: row.lang,
		note: row.note,
		createdAt: row.created_at
	})), lang);
}
async function saveCorrection(userId, input) {
	await assertEditor(userId);
	const note = input.note.trim().slice(0, 600);
	if (note.length < 4) throw new Error("empty");
	const rows = await (await ready())`
    insert into corrections (group_key, lang, note)
    values (${input.groupKey.trim().slice(0, 80)}, ${langOf(input.lang)}, ${note})
    returning id
  `;
	return { id: Number(rows[0]?.id ?? 0) };
}
async function removeCorrection(userId, id) {
	await assertEditor(userId);
	await (await ready())`delete from corrections where id = ${id}`;
}
async function listComments(groupKey, lang) {
	const sql = await ready();
	const key = groupKey.slice(0, 80);
	return (await sql.query(`select c.id, c.group_key, c.body, c.status, ${STAMP.replaceAll("created_at", "c.created_at")} as created_at,
      p.display_name
     from comments c
     left join profiles p on p.user_id = c.user_id
     where c.group_key = $1 and c.status = 'visible'
     order by c.created_at asc
     limit 80`, [key])).map((row) => ({
		id: Number(row.id),
		groupKey: row.group_key,
		body: row.body,
		status: row.status,
		createdAt: row.created_at,
		name: loc(row.display_name, lang) || "Reader"
	}));
}
async function deskComments(userId) {
	await assertEditor(userId);
	return (await (await ready()).query(`select c.id, c.group_key, c.body, c.status, ${STAMP.replaceAll("created_at", "c.created_at")} as created_at,
      p.display_name
     from comments c
     left join profiles p on p.user_id = c.user_id
     order by c.created_at desc
     limit 80`)).map((row) => ({
		id: Number(row.id),
		groupKey: row.group_key,
		body: row.body,
		status: row.status,
		createdAt: row.created_at,
		name: loc(row.display_name, "ckb") || loc(row.display_name, "en") || "Reader"
	}));
}
async function addComment(userId, groupKey, body, lang) {
	const text = body.trim().slice(0, 1200);
	if (text.length < 2) throw new Error("empty");
	const key = groupKey.trim().slice(0, 80);
	if (!key) throw new Error("empty");
	await ensureReader(userId);
	const sql = await ready();
	if (!(await sql`
    select group_key from articles where group_key = ${key} and status = 'published' limit 1
  `).length) throw new Error("missing");
	const rows = await sql`
    insert into comments (group_key, user_id, body, status)
    values (${key}, ${userId}, ${text}, 'visible')
    returning id
  `;
	const nameRow = await sql`select display_name from profiles where user_id = ${userId}`;
	return {
		id: Number(rows[0]?.id ?? 0),
		groupKey: key,
		body: text,
		status: "visible",
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		name: loc(nameRow[0]?.display_name, lang) || "Reader"
	};
}
async function setCommentStatus(userId, id, status) {
	await assertEditor(userId);
	const next = status === "hidden" ? "hidden" : "visible";
	await (await ready())`update comments set status = ${next} where id = ${id}`;
}
async function toggleSave(userId, groupKey) {
	await ensureReader(userId);
	const key = groupKey.trim().slice(0, 80);
	const sql = await ready();
	if ((await sql`select group_key from saves where user_id = ${userId} and group_key = ${key}`).length) {
		await sql`delete from saves where user_id = ${userId} and group_key = ${key}`;
		return { on: false };
	}
	await sql`insert into saves (user_id, group_key) values (${userId}, ${key})`;
	return { on: true };
}
async function toggleFollow(userId, kind, target) {
	if (kind !== "section" && kind !== "author") throw new Error("kind");
	const clean = target.trim().slice(0, 80);
	if (!clean) throw new Error("empty");
	await ensureReader(userId);
	const sql = await ready();
	if ((await sql`
    select target from follows where user_id = ${userId} and kind = ${kind} and target = ${clean}
  `).length) {
		await sql`delete from follows where user_id = ${userId} and kind = ${kind} and target = ${clean}`;
		return { on: false };
	}
	await sql`insert into follows (user_id, kind, target) values (${userId}, ${kind}, ${clean})`;
	return { on: true };
}
var LETTERS = /* @__PURE__ */ new Set([
	"morning",
	"culture",
	"weekend"
]);
async function toggleLetter(userId, slug) {
	if (!LETTERS.has(slug)) throw new Error("slug");
	await ensureReader(userId);
	const sql = await ready();
	if ((await sql`select slug from subscriptions where user_id = ${userId} and slug = ${slug}`).length) {
		await sql`delete from subscriptions where user_id = ${userId} and slug = ${slug}`;
		return { on: false };
	}
	await sql`insert into subscriptions (user_id, slug) values (${userId}, ${slug})`;
	return { on: true };
}
async function shelf(userId) {
	const sql = await ready();
	const [saves, follows, letters] = await Promise.all([
		sql`select group_key from saves where user_id = ${userId} order by created_at desc`,
		sql`select kind, target from follows where user_id = ${userId}`,
		sql`select slug from subscriptions where user_id = ${userId}`
	]);
	return {
		saves: saves.map((row) => row.group_key),
		follows: follows.filter((row) => row.kind === "section" || row.kind === "author").map((row) => ({
			kind: row.kind,
			target: row.target
		})),
		letters: letters.map((row) => row.slug)
	};
}
async function masthead(lang) {
	return (await (await ready())`
    select slug, display_name, title, location, role, bio
    from profiles where is_staff = true
    order by slug
  `).map((row) => ({
		slug: row.slug,
		name: loc(row.display_name, lang),
		title: loc(row.title, lang),
		location: loc(row.location, lang),
		role: row.role,
		bio: loc(row.bio, lang)
	}));
}
async function pulse(lang) {
	const stories = await getListingData({ lang });
	const map = /* @__PURE__ */ new Map();
	for (const story of stories) {
		const cur = map.get(story.category) ?? {
			slug: story.category,
			name: story.categoryName,
			stories: 0,
			views: 0
		};
		cur.stories += 1;
		cur.views += story.views;
		map.set(story.category, cur);
	}
	const sections = [...map.values()].sort((a, b) => b.views - a.views);
	const totalViews = sections.reduce((sum, row) => sum + row.views, 0);
	const top = [...stories].sort((a, b) => b.views - a.views).slice(0, 6);
	return {
		sections,
		totalViews,
		totalStories: stories.length,
		top
	};
}
//#endregion
export { addComment, assertEditor, deskComments, listComments, listCorrections, listEvents, listWires, masthead, pulse, removeCorrection, removeEvent, removeWire, saveCorrection, saveEvent, saveWire, setCommentStatus, setWireActive, shelf, toggleFollow, toggleLetter, toggleSave };
