import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { i as isLang } from "./i18n-J2xLYLI0.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-api-DBHPtlt5.js
async function requestLang() {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.s).then((n) => n.t);
	const raw = getCookie("knc_lang");
	return isLang(raw) ? raw : "ckb";
}
var getWires_createServerFn_handler = createServerRpc({
	id: "1956acf9c234a218ed291748011d2f7ff11b5f590781e425131b1b78b7f7ceef",
	name: "getWires",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => getWires.__executeServer(opts));
var getWires = createServerFn({ method: "GET" }).handler(getWires_createServerFn_handler, async () => {
	const { listWires } = await import("./query.server-DKmViCdI.mjs");
	return listWires(await requestLang());
});
var getAgenda_createServerFn_handler = createServerRpc({
	id: "d37930d29bd3113e36baafdccf150b0b92fe5d7e4834cb305d383d3a80c93a9c",
	name: "getAgenda",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => getAgenda.__executeServer(opts));
var getAgenda = createServerFn({ method: "GET" }).handler(getAgenda_createServerFn_handler, async () => {
	const { listEvents } = await import("./query.server-DKmViCdI.mjs");
	return listEvents(await requestLang());
});
var getCorrections_createServerFn_handler = createServerRpc({
	id: "8d9acbcd57f3c67cbfae4ea7fbb964239dc8a626b04d54b0807dffbe4c1b9422",
	name: "getCorrections",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => getCorrections.__executeServer(opts));
var getCorrections = createServerFn({ method: "GET" }).handler(getCorrections_createServerFn_handler, async () => {
	const { listCorrections } = await import("./query.server-DKmViCdI.mjs");
	return listCorrections(await requestLang());
});
var getMasthead_createServerFn_handler = createServerRpc({
	id: "464b9ad4dd72d014b1c55aea6d18daf6ed834f5b4cbc4a1ab6eea43b2b8dfaeb",
	name: "getMasthead",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => getMasthead.__executeServer(opts));
var getMasthead = createServerFn({ method: "GET" }).handler(getMasthead_createServerFn_handler, async () => {
	const { masthead } = await import("./query.server-DKmViCdI.mjs");
	return masthead(await requestLang());
});
var getPulse_createServerFn_handler = createServerRpc({
	id: "5fe52a6aa1fa027ad02e8f696e8c5dd179c7909b88d95e7e43288ff633c6f637",
	name: "getPulse",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => getPulse.__executeServer(opts));
var getPulse = createServerFn({ method: "GET" }).handler(getPulse_createServerFn_handler, async () => {
	const { pulse } = await import("./query.server-DKmViCdI.mjs");
	return pulse(await requestLang());
});
var listComments_createServerFn_handler = createServerRpc({
	id: "63c9f37385c66f4a8f333b5b9d1d70c663fb02be0915723cc2eecff54b41c707",
	name: "listComments",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => listComments.__executeServer(opts));
var listComments = createServerFn({ method: "GET" }).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(listComments_createServerFn_handler, async ({ data }) => {
	const { listComments: load } = await import("./query.server-DKmViCdI.mjs");
	return load(data, await requestLang());
});
var postComment_createServerFn_handler = createServerRpc({
	id: "3fd1bf9051c66b2e4bf9a9e53b9aa10fc22922515076f2d0e6e2db9fe9630eae",
	name: "postComment",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => postComment.__executeServer(opts));
var postComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	groupKey: String(input?.groupKey ?? "").slice(0, 80),
	body: String(input?.body ?? "").slice(0, 1200)
})).handler(postComment_createServerFn_handler, async ({ data, context }) => {
	const { addComment } = await import("./query.server-DKmViCdI.mjs");
	return addComment(context.userId, data.groupKey, data.body, await requestLang());
});
var toggleSave_createServerFn_handler = createServerRpc({
	id: "b2f73f33da8de36a1e25a6baa9e69417ac4c5024f1c87a919c310834f09ac824",
	name: "toggleSave",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => toggleSave.__executeServer(opts));
var toggleSave = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(toggleSave_createServerFn_handler, async ({ data, context }) => {
	const { toggleSave: run } = await import("./query.server-DKmViCdI.mjs");
	return run(context.userId, data);
});
var toggleFollow_createServerFn_handler = createServerRpc({
	id: "390d17c9c9c740cf9ecd82296f4b9c625d90d9a5c97005b800bee40054b18c52",
	name: "toggleFollow",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => toggleFollow.__executeServer(opts));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	kind: String(input?.kind ?? ""),
	target: String(input?.target ?? "").slice(0, 80)
})).handler(toggleFollow_createServerFn_handler, async ({ data, context }) => {
	const { toggleFollow: run } = await import("./query.server-DKmViCdI.mjs");
	return run(context.userId, data.kind, data.target);
});
var toggleLetter_createServerFn_handler = createServerRpc({
	id: "48db9fcbf82c3e18fe98ee71e4d3248e542f6f132b6467daa93e905efe9ee63b",
	name: "toggleLetter",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => toggleLetter.__executeServer(opts));
var toggleLetter = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((slug) => String(slug ?? "").slice(0, 24)).handler(toggleLetter_createServerFn_handler, async ({ data, context }) => {
	const { toggleLetter: run } = await import("./query.server-DKmViCdI.mjs");
	return run(context.userId, data);
});
var myShelf_createServerFn_handler = createServerRpc({
	id: "14f79826ac2c1e9fe66859a87a802cba9afd589b92904d56e3674c4084aeedb3",
	name: "myShelf",
	filename: "src/lib/newsroom/public-api.ts"
}, (opts) => myShelf.__executeServer(opts));
var myShelf = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(myShelf_createServerFn_handler, async ({ context }) => {
	const { shelf } = await import("./query.server-DKmViCdI.mjs");
	return shelf(context.userId);
});
//#endregion
export { getAgenda_createServerFn_handler, getCorrections_createServerFn_handler, getMasthead_createServerFn_handler, getPulse_createServerFn_handler, getWires_createServerFn_handler, listComments_createServerFn_handler, myShelf_createServerFn_handler, postComment_createServerFn_handler, toggleFollow_createServerFn_handler, toggleLetter_createServerFn_handler, toggleSave_createServerFn_handler };
