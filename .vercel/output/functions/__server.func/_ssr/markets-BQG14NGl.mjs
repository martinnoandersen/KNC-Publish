import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as Route$26 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { s as MarketsView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-BQG14NGl.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function MarketsPage() {
	const { id } = Route$26.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketsView, { id }) });
};
//#endregion
export { SplitComponent as component };
