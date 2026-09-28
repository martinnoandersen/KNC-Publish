import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as Route$33 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { n as BriefingView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/briefing-B_ZrSrd8.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function BriefingPage() {
	const home = Route$33.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingView, { home }) });
};
//#endregion
export { SplitComponent as component };
