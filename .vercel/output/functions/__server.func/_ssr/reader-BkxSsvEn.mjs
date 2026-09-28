import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as postComment, E as toggleSave, S as myShelf, T as toggleLetter, w as toggleFollow, x as listComments } from "./router-X6q-UdJH.mjs";
import { r as formatWhen } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, E as toggleLocalSave, O as useCurrentUserState, T as toggleLocalLetter, d as readFollows, h as remember, l as n, m as readSaves, p as readLetters, w as toggleLocalFollow } from "./shell-C2oUoShk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reader-BkxSsvEn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useFlag(dep, load, local) {
	const { user, isPending } = useCurrentUserState();
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isPending) return;
		let stop = false;
		if (user) myShelf().then((shelf) => {
			if (!stop) setOn(load(shelf));
		}).catch(() => {
			if (!stop) setOn(false);
		});
		else setOn(local());
		return () => {
			stop = true;
		};
	}, [
		user,
		isPending,
		dep
	]);
	return {
		user,
		on,
		setOn
	};
}
function SaveButton({ groupKey }) {
	const lang = useBoot().lang;
	const flag = useFlag(groupKey, (shelf) => shelf.saves.includes(groupKey), () => readSaves().includes(groupKey));
	async function press() {
		if (flag.user) {
			const res = await toggleSave({ data: groupKey });
			flag.setOn(res.on);
			return;
		}
		flag.setOn(toggleLocalSave(groupKey));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => void press(),
		className: flag.on ? "h-11 border border-ink bg-ink px-4 text-sm text-paper" : "h-11 border border-rule px-4 text-sm",
		children: [flag.on ? n(lang, "savedStory") : n(lang, "saveStory"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ms-2 text-xs text-muted",
			children: flag.user ? n(lang, "account") : n(lang, "device")
		})]
	});
}
function FollowButton({ kind, target }) {
	const lang = useBoot().lang;
	const flag = useFlag(`${kind}:${target}`, (shelf) => shelf.follows.some((item) => item.kind === kind && item.target === target), () => readFollows().some((item) => item.kind === kind && item.target === target));
	async function press() {
		if (flag.user) {
			const res = await toggleFollow({ data: {
				kind,
				target
			} });
			flag.setOn(res.on);
			return;
		}
		flag.setOn(toggleLocalFollow(kind, target));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => void press(),
		className: flag.on ? "h-11 shrink-0 border border-ink bg-ink px-4 text-sm text-paper" : "h-11 shrink-0 border border-ink px-4 text-sm",
		children: flag.on ? n(lang, "following") : n(lang, "follow")
	});
}
function LetterButton({ slug }) {
	const lang = useBoot().lang;
	const flag = useFlag(slug, (shelf) => shelf.letters.includes(slug), () => readLetters().includes(slug));
	async function press() {
		if (flag.user) {
			const res = await toggleLetter({ data: slug });
			flag.setOn(res.on);
			return;
		}
		flag.setOn(toggleLocalLetter(slug));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => void press(),
		className: flag.on ? "h-11 bg-ink px-4 text-sm font-semibold text-paper" : "h-11 bg-crimson px-4 text-sm font-semibold text-on-mast",
		children: flag.on ? n(lang, "onList") : n(lang, "offList")
	});
}
function Comments({ groupKey }) {
	const lang = useBoot().lang;
	const { user, isPending } = useCurrentUserState();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [body, setBody] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	function reload() {
		listComments({ data: groupKey }).then(setRows).catch(() => setRows([]));
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, [groupKey]);
	async function submit(event) {
		event.preventDefault();
		setError("");
		setSending(true);
		try {
			const row = await postComment({ data: {
				groupKey,
				body
			} });
			setRows((cur) => [...cur, row]);
			setBody("");
		} catch (err) {
			setError(err instanceof Error ? err.message : "error");
		} finally {
			setSending(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "no-print mt-12 border-t border-ink pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-3xl",
				children: n(lang, "comments")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: n(lang, "commentHint")
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-muted",
				children: n(lang, "noComments")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 divide-y divide-rule border-y border-rule",
				children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-semibold",
						children: [row.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ms-2 font-normal text-muted",
							children: formatWhen(lang, row.createdAt)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-wrap leading-relaxed",
						children: row.body
					})]
				}, row.id))
			}),
			isPending ? null : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (event) => void submit(event),
				className: "mt-6 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-semibold",
						htmlFor: "comment-body",
						children: n(lang, "comments")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "comment-body",
						value: body,
						onChange: (event) => setBody(event.target.value),
						required: true,
						minLength: 2,
						maxLength: 1200,
						rows: 4,
						className: "border border-rule bg-sheet px-3 py-3 text-base outline-none focus:border-ink"
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-crimson",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: sending,
						className: "h-11 w-fit bg-crimson px-5 text-sm font-semibold text-on-mast disabled:opacity-60",
						children: n(lang, "send")
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					className: "font-semibold text-crimson underline",
					children: n(lang, "commentNeed")
				})
			})
		]
	});
}
function trackRead(groupKey) {
	remember(groupKey);
}
//#endregion
export { trackRead as a, SaveButton as i, FollowButton as n, LetterButton as r, Comments as t };
