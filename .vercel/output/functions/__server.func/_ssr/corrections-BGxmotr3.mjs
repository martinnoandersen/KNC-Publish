import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Route$32 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { i as CorrectionsView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/corrections-BGxmotr3.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function CorrectionsPage() {
	const rows = Route$32.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CorrectionsView, { rows }) });
};
//#endregion
export { SplitComponent as component };
