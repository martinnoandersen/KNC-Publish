import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { s as Route$18 } from "./_ssr/router-X6q-UdJH.mjs";
import { n as Site } from "./_ssr/shell-C2oUoShk.mjs";
import { t as ArticleView } from "./_ssr/article-_ZIEWXbf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CxfR_JA1.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function ArticlePage() {
	const data = Route$18.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleView, {
		story: data.story,
		related: data.related
	}) });
};
//#endregion
export { SplitComponent as component };
