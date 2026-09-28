import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { y as Route$34 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { t as ArchiveView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/archive-ePMIiDsW.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function ArchivePage() {
	const stories = Route$34.useLoaderData();
	const { m } = Route$34.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveView, {
		stories,
		month: m
	}) });
};
//#endregion
export { SplitComponent as component };
