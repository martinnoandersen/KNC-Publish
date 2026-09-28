import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Route$25 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { c as MastheadView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/masthead-DHYS6Zk0.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function MastheadPage() {
	const people = Route$25.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MastheadView, { people }) });
};
//#endregion
export { SplitComponent as component };
