import { r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/text-CidIKiEz.js
var text_CidIKiEz_exports = /* @__PURE__ */ __exportAll({
	a: () => locList,
	i: () => loc,
	n: () => asRefs,
	o: () => slugify,
	r: () => cleanKey,
	s: () => text_exports,
	t: () => asJson
});
var text_exports = /* @__PURE__ */ __exportAll$1({
	asJson: () => asJson,
	asRefs: () => asRefs,
	cleanKey: () => cleanKey,
	loc: () => loc,
	locList: () => locList,
	slugify: () => slugify
});
function asJson(value, fallback) {
	if (value == null || value === "") return fallback;
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return fallback;
	}
	return value;
}
function loc(value, lang) {
	if (typeof value === "string" && value.trim().startsWith("{")) {
		const obj = asJson(value, {});
		return obj[lang] || obj.ckb || obj.en || Object.values(obj)[0] || "";
	}
	if (value && typeof value === "object") {
		const obj = value;
		return obj[lang] || obj.ckb || obj.en || Object.values(obj)[0] || "";
	}
	return typeof value === "string" ? value : "";
}
function locList(value, lang) {
	const obj = asJson(value, {});
	const list = obj[lang] ?? obj.ckb ?? obj.en ?? Object.values(obj)[0] ?? [];
	return Array.isArray(list) ? list : [];
}
function asRefs(value) {
	const list = asJson(value, []);
	return Array.isArray(list) ? list : [];
}
function slugify(input) {
	return input.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 64);
}
function cleanKey(input) {
	return input.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
}
//#endregion
export { locList as a, loc as i, asRefs as n, slugify as o, cleanKey as r, text_CidIKiEz_exports as s, asJson as t };
