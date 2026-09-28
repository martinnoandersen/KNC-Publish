import { w as require_jsx_runtime } from "./_libs/@tanstack/react-router+[...].mjs";
import { i as Route$3 } from "./_ssr/router-X6q-UdJH.mjs";
import { D as useBoot, n as Site } from "./_ssr/shell-C2oUoShk.mjs";
import { n as FollowButton } from "./_ssr/reader-BkxSsvEn.mjs";
import { i as StoryList } from "./_ssr/home-C4yRY3Rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-R58TPKww.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function SectionPage() {
	const stories = Route$3.useLoaderData();
	const { slug } = Route$3.useParams();
	const name = useBoot().categories.find((category) => category.slug === slug)?.name ?? slug;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryList, {
		stories,
		title: name,
		toolbar: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
			kind: "section",
			target: slug
		})
	}) });
};
//#endregion
export { SplitComponent as component };
