import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Route$21 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { d as SavedView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saved-KPeutbic.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function SavedPage() {
	const stories = Route$21.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavedView, { stories }) });
};
//#endregion
export { SplitComponent as component };
