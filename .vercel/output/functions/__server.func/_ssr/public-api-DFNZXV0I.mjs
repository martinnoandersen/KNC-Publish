import { r as createServerFn } from "./ssr.mjs";
import { i as isLang } from "./i18n-J2xLYLI0.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-api-DFNZXV0I.js
async function requestLang() {
	const { getCookie } = await import("./ssr.mjs").then((n) => n.s).then((n) => n.t);
	const raw = getCookie("knc_lang");
	return isLang(raw) ? raw : "ckb";
}
var getBoot_createServerFn_handler = createServerRpc({
	id: "d8d35fba1bf24f90503e1494014c3c285f132581464604d322beb806e7ed4231",
	name: "getBoot",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getBoot.__executeServer(opts));
var getBoot = createServerFn({ method: "GET" }).handler(getBoot_createServerFn_handler, async () => {
	const { getBootData } = await import("./query.server-Duv5dvr2.mjs");
	return getBootData(await requestLang());
});
var getHome_createServerFn_handler = createServerRpc({
	id: "19388c1f50b59799014f29caba7c14661565785d134a8f168654fb3790d1cfe6",
	name: "getHome",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getHome.__executeServer(opts));
var getHome = createServerFn({ method: "GET" }).handler(getHome_createServerFn_handler, async () => {
	const { getHomeData } = await import("./query.server-Duv5dvr2.mjs");
	return getHomeData(await requestLang());
});
var getStory_createServerFn_handler = createServerRpc({
	id: "2750581e6315217a02c2be9a4222bd33d4ff0c2fbbd82e0a4427c81327837e5b",
	name: "getStory",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getStory.__executeServer(opts));
var getStory = createServerFn({ method: "GET" }).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(getStory_createServerFn_handler, async ({ data }) => {
	const { getStoryData } = await import("./query.server-Duv5dvr2.mjs");
	return getStoryData(data, await requestLang());
});
var getListing_createServerFn_handler = createServerRpc({
	id: "337c3b0a8fc39116eb7d3605357e3fbde5d5cc03d7ec2ae549fc754b2845a39b",
	name: "getListing",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getListing.__executeServer(opts));
var getListing = createServerFn({ method: "GET" }).validator((input) => ({
	category: String(input?.category ?? "").slice(0, 48),
	tag: String(input?.tag ?? "").slice(0, 48),
	kind: String(input?.kind ?? "").slice(0, 16)
})).handler(getListing_createServerFn_handler, async ({ data }) => {
	const { getListingData } = await import("./query.server-Duv5dvr2.mjs");
	return getListingData({
		...data,
		lang: await requestLang()
	});
});
var searchStories_createServerFn_handler = createServerRpc({
	id: "f8d1137aaacd9ff37bb10a85eac1895f60372d817657118570081193db6dcdff",
	name: "searchStories",
	filename: "src/lib/content/public-api.ts"
}, (opts) => searchStories.__executeServer(opts));
var searchStories = createServerFn({ method: "GET" }).validator((query) => String(query ?? "").slice(0, 120)).handler(searchStories_createServerFn_handler, async ({ data }) => {
	const { searchData } = await import("./query.server-Duv5dvr2.mjs");
	return searchData(data, await requestLang());
});
var getAuthor_createServerFn_handler = createServerRpc({
	id: "7389bc154db30f0acbc72517193ad6d824d36a480e649061be5103af56eb936f",
	name: "getAuthor",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getAuthor.__executeServer(opts));
var getAuthor = createServerFn({ method: "GET" }).validator((slug) => String(slug ?? "").slice(0, 80)).handler(getAuthor_createServerFn_handler, async ({ data }) => {
	const { getAuthorData } = await import("./query.server-Duv5dvr2.mjs");
	return getAuthorData(data, await requestLang());
});
var getPage_createServerFn_handler = createServerRpc({
	id: "adf81f8aef73bce12385d2dfe8717734f61a7dcaba17d6e10558d9b3e3f84155",
	name: "getPage",
	filename: "src/lib/content/public-api.ts"
}, (opts) => getPage.__executeServer(opts));
var getPage = createServerFn({ method: "GET" }).validator((slug) => String(slug ?? "").slice(0, 80)).handler(getPage_createServerFn_handler, async ({ data }) => {
	const { getPageData } = await import("./query.server-Duv5dvr2.mjs");
	return getPageData(data, await requestLang());
});
var bumpView_createServerFn_handler = createServerRpc({
	id: "74bf340964b6e0697699106732b93df46c5476c423217636778717626e466991",
	name: "bumpView",
	filename: "src/lib/content/public-api.ts"
}, (opts) => bumpView.__executeServer(opts));
var bumpView = createServerFn({ method: "POST" }).validator((id) => Number(id) || 0).handler(bumpView_createServerFn_handler, async ({ data }) => {
	if (!data) return;
	const { bumpView: bump } = await import("./query.server-Duv5dvr2.mjs");
	await bump(data);
});
//#endregion
export { bumpView_createServerFn_handler, getAuthor_createServerFn_handler, getBoot_createServerFn_handler, getHome_createServerFn_handler, getListing_createServerFn_handler, getPage_createServerFn_handler, getStory_createServerFn_handler, searchStories_createServerFn_handler };
