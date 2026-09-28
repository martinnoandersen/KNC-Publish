import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Route$28 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { o as LiveView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-CWJ99uy9.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function LivePage() {
	const { wires, stories } = Route$28.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveView, {
		wires,
		stories
	}) });
};
//#endregion
export { SplitComponent as component };
