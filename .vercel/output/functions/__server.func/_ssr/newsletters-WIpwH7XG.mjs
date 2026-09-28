import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Route$24 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { a as LettersView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newsletters-WIpwH7XG.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function LettersPage() {
	const stories = Route$24.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LettersView, { stories }) });
};
//#endregion
export { SplitComponent as component };
