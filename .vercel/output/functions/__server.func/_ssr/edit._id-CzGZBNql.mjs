import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-X6q-UdJH.mjs";
import { l as StoryEditor } from "./ui-CKWGxCdA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/edit._id-CzGZBNql.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = function EditStory() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryEditor, { id: Number(id) });
};
//#endregion
export { SplitComponent as component };
