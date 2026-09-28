import { o as __toESM } from "../_runtime.mjs";
import { t as GROK_PROVIDERS } from "./server-BH1E4pS1.mjs";
import { Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { l as t } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, O as useCurrentUserState, n as Site } from "./shell-C2oUoShk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-Cj9JokAI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const lang = useBoot().lang;
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [pending, setPending] = (0, import_react.useState)(false);
	async function submit(event) {
		event.preventDefault();
		setError("");
		setPending(true);
		try {
			if (mode === "up") {
				const result = await authClient.signUp.email({
					email,
					password,
					name,
					callbackURL: "/desk"
				});
				if (result.error) throw new Error(result.error.message || "Error");
			} else {
				const result = await authClient.signIn.email({
					email,
					password,
					callbackURL: "/desk"
				});
				if (result.error) throw new Error(result.error.message || "Error");
			}
			window.location.href = "/desk";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error");
		} finally {
			setPending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Site, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-md px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: t(lang, "signIn")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t(lang, "firstAdmin")
			}),
			isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8 h-40 animate-pulse bg-soft" }) : null,
			!isPending && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 border border-rule bg-sheet p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					t(lang, "signedInAs"),
					" ",
					user.displayName || user.primaryEmail
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/desk",
					className: "mt-4 inline-flex h-11 items-center bg-ink px-4 text-sm text-paper",
					children: t(lang, "openDesk")
				})]
			}) : null,
			!isPending && !user && true ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-3",
				children: [
					GROK_PROVIDERS.map((provider) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "h-11 w-full border border-ink text-sm font-semibold",
						onClick: () => signIn(provider.providerId, { callbackURL: "/desk" }),
						children: [
							t(lang, "continueWith"),
							" ",
							provider.label
						]
					}, provider.providerId)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs tracking-widest text-muted uppercase",
						children: t(lang, "or")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3",
						onSubmit: submit,
						children: [
							mode === "up" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								value: name,
								onChange: (e) => setName(e.target.value),
								placeholder: t(lang, "name"),
								"aria-label": t(lang, "name"),
								className: "h-11 w-full border border-rule bg-sheet px-3"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: t(lang, "email"),
								"aria-label": t(lang, "email"),
								className: "h-11 w-full border border-rule bg-sheet px-3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								required: true,
								type: "password",
								minLength: 8,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								placeholder: t(lang, "password"),
								"aria-label": t(lang, "password"),
								className: "h-11 w-full border border-rule bg-sheet px-3"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-crimson",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: pending,
								className: "h-11 w-full bg-crimson text-sm font-semibold text-on-mast",
								children: mode === "up" ? t(lang, "createAccount") : t(lang, "signIn")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm underline",
						onClick: () => setMode(mode === "in" ? "up" : "in"),
						children: mode === "in" ? t(lang, "needAccount") : t(lang, "haveAccount")
					})
				]
			}) : null
		]
	}) });
}
//#endregion
export { LoginPage as component };
