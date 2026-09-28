import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { h as Route$29 } from "./router-X6q-UdJH.mjs";
import { n as Site } from "./shell-C2oUoShk.mjs";
import { r as CalendarView } from "./views-CxK0ccho.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/events-BogFmaWO.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function EventsPage() {
	const events = Route$29.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarView, { events }) });
};
//#endregion
export { SplitComponent as component };
