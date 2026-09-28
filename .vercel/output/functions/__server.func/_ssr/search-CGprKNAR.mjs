import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Route$20 } from "./router-X6q-UdJH.mjs";
import { l as t } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, n as Site } from "./shell-C2oUoShk.mjs";
import { i as StoryList } from "./home-C4yRY3Rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-CGprKNAR.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function SearchPage() {
	const stories = Route$20.useLoaderData();
	const { q } = Route$20.useSearch();
	const boot = useBoot();
	const title = q ? `${t(boot.lang, "resultsFor")} “${q}”` : t(boot.lang, "search");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryList, {
		stories,
		title
	}) });
};
//#endregion
export { SplitComponent as component };
