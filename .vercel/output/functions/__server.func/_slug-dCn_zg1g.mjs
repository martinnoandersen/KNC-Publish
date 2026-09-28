import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { r as Route$2 } from "./_ssr/router-X6q-UdJH.mjs";
import { n as Site } from "./_ssr/shell-C2oUoShk.mjs";
import { i as StoryList } from "./_ssr/home-C4yRY3Rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-dCn_zg1g.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function TagPage() {
	const stories = Route$2.useLoaderData();
	const { slug } = Route$2.useParams();
	const name = stories[0]?.tags.find((tag) => tag.slug === slug)?.name ?? slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryList, {
		stories,
		title: `#${name}`
	}) });
};
//#endregion
export { SplitComponent as component };
