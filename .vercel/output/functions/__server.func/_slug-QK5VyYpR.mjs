import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as Route$4 } from "./_ssr/router-X6q-UdJH.mjs";
import { l as t } from "./_ssr/i18n-J2xLYLI0.mjs";
import { D as useBoot, n as Site } from "./_ssr/shell-C2oUoShk.mjs";
import { n as RichText } from "./_ssr/render-DO-dxZqt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-QK5VyYpR.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function StaticPage() {
	const page = Route$4.useLoaderData();
	const boot = useBoot();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: page.title
			}),
			page.lang !== boot.lang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 border border-rule bg-soft px-4 py-3 text-sm",
				children: t(boot.lang, "notTranslated")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, { text: page.body })
			})
		]
	}) });
};
//#endregion
export { SplitComponent as component };
