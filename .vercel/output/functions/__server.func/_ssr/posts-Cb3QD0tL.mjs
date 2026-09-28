import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as Route$23 } from "./router-X6q-UdJH.mjs";
import { l as t } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, n as Site } from "./shell-C2oUoShk.mjs";
import { i as StoryList } from "./home-C4yRY3Rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/posts-Cb3QD0tL.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function PostsPage() {
	const stories = Route$23.useLoaderData();
	const boot = useBoot();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryList, {
		stories,
		title: t(boot.lang, "posts")
	}) });
};
//#endregion
export { SplitComponent as component };
