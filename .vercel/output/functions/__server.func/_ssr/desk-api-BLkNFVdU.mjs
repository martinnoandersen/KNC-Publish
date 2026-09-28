import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { i as isLang } from "./i18n-J2xLYLI0.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/desk-api-BLkNFVdU.js
async function requestLang() {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.s).then((n) => n.t);
	const raw = getCookie("knc_lang");
	return isLang(raw) ? raw : "ckb";
}
var deskWireList_createServerFn_handler = createServerRpc({
	id: "5a7ca84dbdba9e32424a2b3b870241cdabecd7e7cb819f3c5e3ca0bad798d5f9",
	name: "deskWireList",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskWireList.__executeServer(opts));
var deskWireList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskWireList_createServerFn_handler, async ({ context }) => {
	const { assertEditor, listWires } = await import("./query.server-DKmViCdI.mjs");
	await assertEditor(context.userId);
	return listWires(await requestLang(), true);
});
var deskSaveWire_createServerFn_handler = createServerRpc({
	id: "e7a65ab65b22e8eedb3ddeba85e91832588119bf37bc84c61b0275f8cea556bc",
	name: "deskSaveWire",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskSaveWire.__executeServer(opts));
var deskSaveWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	lang: String(input?.lang ?? "ckb").slice(0, 8),
	kicker: String(input?.kicker ?? "").slice(0, 40),
	text: String(input?.text ?? "").slice(0, 280),
	href: String(input?.href ?? "").slice(0, 200),
	urgent: Boolean(input?.urgent)
})).handler(deskSaveWire_createServerFn_handler, async ({ data, context }) => {
	const { saveWire } = await import("./query.server-DKmViCdI.mjs");
	return saveWire(context.userId, data);
});
var deskSetWire_createServerFn_handler = createServerRpc({
	id: "0ddd0fe3c25cc538f947aa6c4798bd8898c0a844c25a8aad604ef70aa39d0fdc",
	name: "deskSetWire",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskSetWire.__executeServer(opts));
var deskSetWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	active: Boolean(input?.active)
})).handler(deskSetWire_createServerFn_handler, async ({ data, context }) => {
	const { setWireActive } = await import("./query.server-DKmViCdI.mjs");
	await setWireActive(context.userId, data.id, data.active);
	return { ok: true };
});
var deskRemoveWire_createServerFn_handler = createServerRpc({
	id: "ac1d66e13719331677644f51c2acde4ea1b40e413a02b47cbfa1a8f17b2154d8",
	name: "deskRemoveWire",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskRemoveWire.__executeServer(opts));
var deskRemoveWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(deskRemoveWire_createServerFn_handler, async ({ data, context }) => {
	const { removeWire } = await import("./query.server-DKmViCdI.mjs");
	await removeWire(context.userId, data);
	return { ok: true };
});
var deskEventList_createServerFn_handler = createServerRpc({
	id: "dc5785015b9316ea8d80d0cbd7f061e7b5f3be526642b4feed741b992e3fd92d",
	name: "deskEventList",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskEventList.__executeServer(opts));
var deskEventList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskEventList_createServerFn_handler, async ({ context }) => {
	const { assertEditor, listEvents } = await import("./query.server-DKmViCdI.mjs");
	await assertEditor(context.userId);
	return listEvents(await requestLang());
});
var deskSaveEvent_createServerFn_handler = createServerRpc({
	id: "adb328837b4edfe6aa34f006c554534af1c0a4c82b81ddf9f253d2a34ffce678",
	name: "deskSaveEvent",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskSaveEvent.__executeServer(opts));
var deskSaveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: String(input?.title ?? "").slice(0, 140),
	place: String(input?.place ?? "").slice(0, 80),
	detail: String(input?.detail ?? "").slice(0, 400),
	startsOn: String(input?.startsOn ?? "").slice(0, 10),
	lang: String(input?.lang ?? "ckb").slice(0, 8)
})).handler(deskSaveEvent_createServerFn_handler, async ({ data, context }) => {
	const { saveEvent } = await import("./query.server-DKmViCdI.mjs");
	return saveEvent(context.userId, data);
});
var deskRemoveEvent_createServerFn_handler = createServerRpc({
	id: "c5b9a8bc594da4adebfca4fd1d3181748a4e3ed538fd04b35919cc25dde5be7c",
	name: "deskRemoveEvent",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskRemoveEvent.__executeServer(opts));
var deskRemoveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(deskRemoveEvent_createServerFn_handler, async ({ data, context }) => {
	const { removeEvent } = await import("./query.server-DKmViCdI.mjs");
	await removeEvent(context.userId, data);
	return { ok: true };
});
var deskFixList_createServerFn_handler = createServerRpc({
	id: "1d6cae4a3091a7076bf1914fd26dabadffdf504074f9652fd5983a3c460b3d82",
	name: "deskFixList",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskFixList.__executeServer(opts));
var deskFixList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskFixList_createServerFn_handler, async ({ context }) => {
	const { assertEditor, listCorrections } = await import("./query.server-DKmViCdI.mjs");
	await assertEditor(context.userId);
	return listCorrections(await requestLang());
});
var deskSaveFix_createServerFn_handler = createServerRpc({
	id: "eb018834ce663cd948560f9306e02ebaf68b8dd6d160d9f9088f03f59dd7566d",
	name: "deskSaveFix",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskSaveFix.__executeServer(opts));
var deskSaveFix = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	groupKey: String(input?.groupKey ?? "").slice(0, 80),
	note: String(input?.note ?? "").slice(0, 600),
	lang: String(input?.lang ?? "ckb").slice(0, 8)
})).handler(deskSaveFix_createServerFn_handler, async ({ data, context }) => {
	const { saveCorrection } = await import("./query.server-DKmViCdI.mjs");
	return saveCorrection(context.userId, data);
});
var deskRemoveFix_createServerFn_handler = createServerRpc({
	id: "0adf5f0593baf094f72d41651ebd5ede5f153f328f9cac4c434980fe21f06906",
	name: "deskRemoveFix",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskRemoveFix.__executeServer(opts));
var deskRemoveFix = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(deskRemoveFix_createServerFn_handler, async ({ data, context }) => {
	const { removeCorrection } = await import("./query.server-DKmViCdI.mjs");
	await removeCorrection(context.userId, data);
	return { ok: true };
});
var deskCommentList_createServerFn_handler = createServerRpc({
	id: "1251ab2529d87121c43a3c75cc0d43836ed286b7a4c73ac4b20826c9ee970b47",
	name: "deskCommentList",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskCommentList.__executeServer(opts));
var deskCommentList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskCommentList_createServerFn_handler, async ({ context }) => {
	const { deskComments } = await import("./query.server-DKmViCdI.mjs");
	return deskComments(context.userId);
});
var deskSetComment_createServerFn_handler = createServerRpc({
	id: "cc58c45852806090d2c1f39b8d564a14b1b4c8e62c6104bf73466e38bf23e223",
	name: "deskSetComment",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskSetComment.__executeServer(opts));
var deskSetComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	status: String(input?.status ?? "")
})).handler(deskSetComment_createServerFn_handler, async ({ data, context }) => {
	const { setCommentStatus } = await import("./query.server-DKmViCdI.mjs");
	await setCommentStatus(context.userId, data.id, data.status);
	return { ok: true };
});
var deskPulse_createServerFn_handler = createServerRpc({
	id: "aab5534b1a3cac6e2bb48e01d3a4f39c53242d37d97f0e26fb38483ff7ae09df",
	name: "deskPulse",
	filename: "src/lib/newsroom/desk-api.ts"
}, (opts) => deskPulse.__executeServer(opts));
var deskPulse = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(deskPulse_createServerFn_handler, async ({ context }) => {
	const { assertEditor, pulse } = await import("./query.server-DKmViCdI.mjs");
	await assertEditor(context.userId);
	return pulse(await requestLang());
});
//#endregion
export { deskCommentList_createServerFn_handler, deskEventList_createServerFn_handler, deskFixList_createServerFn_handler, deskPulse_createServerFn_handler, deskRemoveEvent_createServerFn_handler, deskRemoveFix_createServerFn_handler, deskRemoveWire_createServerFn_handler, deskSaveEvent_createServerFn_handler, deskSaveFix_createServerFn_handler, deskSaveWire_createServerFn_handler, deskSetComment_createServerFn_handler, deskSetWire_createServerFn_handler, deskWireList_createServerFn_handler };
