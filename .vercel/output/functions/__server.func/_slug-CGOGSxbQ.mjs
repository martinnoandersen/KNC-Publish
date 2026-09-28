import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as Route$17 } from "./_ssr/router-X6q-UdJH.mjs";
import { n as Site } from "./_ssr/shell-C2oUoShk.mjs";
import { n as AuthorView } from "./_ssr/article-_ZIEWXbf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-CGOGSxbQ.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function AuthorPage() {
	const profile = Route$17.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthorView, { profile }) });
};
//#endregion
export { SplitComponent as component };
