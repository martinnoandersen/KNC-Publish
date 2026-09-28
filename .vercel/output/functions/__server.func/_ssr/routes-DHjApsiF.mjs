import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Route$35 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { t as HomeView } from "./home-C4yRY3Rv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DHjApsiF.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function Home() {
	const { home, wires } = Route$35.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeView, {
		home,
		wires
	}) });
};
//#endregion
export { SplitComponent as component };
