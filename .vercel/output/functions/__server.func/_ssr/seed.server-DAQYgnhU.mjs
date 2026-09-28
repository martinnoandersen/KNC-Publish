import { i as getSql } from "./db-DeokRw6q.mjs";
import { a as stories, i as pages, n as authors, o as tags, r as categories, t as PLUGIN_CATALOG } from "./seed-data-CqXKpiXQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seed.server-DAQYgnhU.js
function dayOffset(offset) {
	const date = /* @__PURE__ */ new Date();
	date.setUTCDate(date.getUTCDate() + offset);
	return date.toISOString().slice(0, 10);
}
async function seedNewsroom(sql) {
	if ((await sql`select id from wires limit 1`).length > 0) return;
	for (const line of [
		{
			lang: "ckb",
			kicker: "هەواڵی خێرا",
			text: "قەڵای هەولێر: گفتوگۆی نۆژەنکردنەوە دەگەڕێتەوە بۆ دانیشتووانی گردەکە، نەک تەنها بۆ میوان.",
			href: "/article/citadel-memory",
			urgent: true
		},
		{
			lang: "ckb",
			kicker: "ئاو",
			text: "ڕاپۆرتێکی نوێ لەسەر کانی و بەنداو لە ناوچە شاخاوییەکان، لە کۆڵانەوە تا دەشت.",
			href: "/article/highland-water",
			urgent: false
		},
		{
			lang: "ckb",
			kicker: "مۆسیقا",
			text: "تەمبوور لە ستۆدیۆکانی شار: چەند خێزانێک ئامێرەکە وەک بیرەوەری دەپارێزن.",
			href: "/article/tembur-living",
			urgent: false
		},
		{
			lang: "ckb",
			kicker: "کتێب",
			text: "کتێبخانەی شەو کاتژمێرەکانی خوێندنەوە درێژتر دەکاتەوە.",
			href: "/article/library-hour",
			urgent: false
		},
		{
			lang: "en",
			kicker: "Developing",
			text: "The Hewlêr citadel debate returns to the people who live on the mound, not only to visitors.",
			href: "/article/citadel-memory",
			urgent: true
		},
		{
			lang: "en",
			kicker: "Water",
			text: "A new report follows springs and dams from the highland lane down to the plain.",
			href: "/article/highland-water",
			urgent: false
		},
		{
			lang: "en",
			kicker: "Music",
			text: "In city workshops, a few families still keep the tembûr as memory, not souvenir.",
			href: "/article/tembur-living",
			urgent: false
		},
		{
			lang: "kmr",
			kicker: "Lezgîn",
			text: "Gotûbêja nûjenkirina Kela Hewlêrê vedigere ba nişteciyên gir, ne tenê ba mêvanan.",
			href: "/article/citadel-memory",
			urgent: true
		}
	]) await sql`
      insert into wires (lang, kicker, text, href, urgent, active)
      values (${line.lang}, ${line.kicker}, ${line.text}, ${line.href}, ${line.urgent}, true)
    `;
	for (const event of [
		{
			offset: 2,
			lang: "ckb",
			title: "گفتوگۆی ئاو",
			place: "دهۆک",
			detail: "سەرنووسەران و ئەندازیارێک لەسەر کانی و بەنداو دادەنیشن."
		},
		{
			offset: 6,
			lang: "ckb",
			title: "شەوی تەمبوور",
			place: "سلێمانی",
			detail: "سێ خێزان ئامێرەکە دەژەنن و باس لە وەرشەکە دەکەن."
		},
		{
			offset: 11,
			lang: "ckb",
			title: "گەڕان بە قەڵادا",
			place: "هەولێر",
			detail: "گەڕانێکی ئێوارە بۆ دانیشتوو و میوان، بە ژمارەیەکی سنووردار."
		},
		{
			offset: 3,
			lang: "en",
			title: "A conversation on water",
			place: "Dihok",
			detail: "Editors sit with an engineer on springs and dams."
		},
		{
			offset: 8,
			lang: "en",
			title: "Tembûr night",
			place: "Silêmanî",
			detail: "Three families play, then talk about the workshop."
		}
	]) await sql`
      insert into events (lang, title, place, starts_on, detail)
      values (${event.lang}, ${event.title}, ${event.place}, ${dayOffset(event.offset)}, ${event.detail})
    `;
	for (const note of [{
		lang: "ckb",
		group: "citadel-memory",
		note: "ژمارەی «حەوت هەزار ساڵ» لە سەرچاوەی شوێنەوارناسییەوە هاتووە و وەک خەمڵاندن نووسراوە، نەک وەک ڕۆژێکی تۆمارکراو."
	}, {
		lang: "en",
		group: "citadel-memory",
		note: "“Seven thousand years” is an archaeological estimate, not a recorded founding day. The sentence has been left as an estimate."
	}]) await sql`
      insert into corrections (group_key, lang, note) values (${note.group}, ${note.lang}, ${note.note})
    `;
}
async function ensureSeed() {
	const sql = await getSql();
	if ((await sql`select value from settings where key = 'seed_version'`)[0]?.value === "3") return;
	for (const author of authors) await sql`
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
	for (const category of categories) await sql`
      insert into categories (slug, name, sort)
      values (${category.slug}, ${JSON.stringify(category.name)}, ${category.sort})
      on conflict (slug) do nothing
    `;
	for (const tag of tags) await sql`
      insert into tags (slug, name) values (${tag.slug}, ${JSON.stringify(tag.name)})
      on conflict (slug) do nothing
    `;
	const tagRows = await sql`select id, slug from tags`;
	const tagId = new Map(tagRows.map((row) => [row.slug, row.id]));
	for (const story of stories) for (const [lang, copy] of Object.entries(story.copy)) {
		const publishedAt = story.status === "published" ? (/* @__PURE__ */ new Date(Date.now() - story.daysAgo * 864e5)).toISOString() : null;
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
		const id = (await sql`
        select id from articles where group_key = ${story.group} and lang = ${lang}
      `)[0]?.id;
		if (!id) continue;
		for (const zone of story.zones) await sql`
          insert into placements (article_id, zone) values (${id}, ${zone})
          on conflict do nothing
        `;
		for (const slug of story.tags) {
			const tid = tagId.get(slug);
			if (!tid) continue;
			await sql`
          insert into article_tags (article_id, tag_id) values (${id}, ${tid})
          on conflict do nothing
        `;
		}
	}
	for (const page of pages) for (const [lang, copy] of Object.entries(page.copy)) await sql`
        insert into pages (slug, lang, title, body, status)
        values (${page.slug}, ${lang}, ${copy.title}, ${copy.body}, 'published')
        on conflict (slug, lang) do nothing
      `;
	await sql`
    insert into settings (key, value) values ('theme', 'classic')
    on conflict (key) do nothing
  `;
	await sql`
    insert into settings (key, value) values ('logo', '')
    on conflict (key) do nothing
  `;
	for (const plugin of PLUGIN_CATALOG) await sql`
      insert into plugins (slug, enabled) values (${plugin.slug}, true)
      on conflict (slug) do nothing
    `;
	await seedNewsroom(sql);
	await sql`
    insert into settings (key, value) values ('seed_version', '3')
    on conflict (key) do update set value = '3'
  `;
}
//#endregion
export { ensureSeed };
