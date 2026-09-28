import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { l as n } from "./shell-C2oUoShk.mjs";
import { d as useDesk } from "./ui-CKWGxCdA.mjs";
import { c as Tooltip, i as XAxis, n as BarChart, o as Bar, r as YAxis, s as ResponsiveContainer } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/newsroom-Db1Jz6vj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var deskWireList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("5a7ca84dbdba9e32424a2b3b870241cdabecd7e7cb819f3c5e3ca0bad798d5f9"));
var deskSaveWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	lang: String(input?.lang ?? "ckb").slice(0, 8),
	kicker: String(input?.kicker ?? "").slice(0, 40),
	text: String(input?.text ?? "").slice(0, 280),
	href: String(input?.href ?? "").slice(0, 200),
	urgent: Boolean(input?.urgent)
})).handler(createSsrRpc("e7a65ab65b22e8eedb3ddeba85e91832588119bf37bc84c61b0275f8cea556bc"));
var deskSetWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	active: Boolean(input?.active)
})).handler(createSsrRpc("0ddd0fe3c25cc538f947aa6c4798bd8898c0a844c25a8aad604ef70aa39d0fdc"));
var deskRemoveWire = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(createSsrRpc("ac1d66e13719331677644f51c2acde4ea1b40e413a02b47cbfa1a8f17b2154d8"));
var deskEventList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("dc5785015b9316ea8d80d0cbd7f061e7b5f3be526642b4feed741b992e3fd92d"));
var deskSaveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	title: String(input?.title ?? "").slice(0, 140),
	place: String(input?.place ?? "").slice(0, 80),
	detail: String(input?.detail ?? "").slice(0, 400),
	startsOn: String(input?.startsOn ?? "").slice(0, 10),
	lang: String(input?.lang ?? "ckb").slice(0, 8)
})).handler(createSsrRpc("adb328837b4edfe6aa34f006c554534af1c0a4c82b81ddf9f253d2a34ffce678"));
var deskRemoveEvent = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(createSsrRpc("c5b9a8bc594da4adebfca4fd1d3181748a4e3ed538fd04b35919cc25dde5be7c"));
var deskFixList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1d6cae4a3091a7076bf1914fd26dabadffdf504074f9652fd5983a3c460b3d82"));
var deskSaveFix = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	groupKey: String(input?.groupKey ?? "").slice(0, 80),
	note: String(input?.note ?? "").slice(0, 600),
	lang: String(input?.lang ?? "ckb").slice(0, 8)
})).handler(createSsrRpc("eb018834ce663cd948560f9306e02ebaf68b8dd6d160d9f9088f03f59dd7566d"));
var deskRemoveFix = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(createSsrRpc("0adf5f0593baf094f72d41651ebd5ede5f153f328f9cac4c434980fe21f06906"));
var deskCommentList = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("1251ab2529d87121c43a3c75cc0d43836ed286b7a4c73ac4b20826c9ee970b47"));
var deskSetComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	status: String(input?.status ?? "")
})).handler(createSsrRpc("cc58c45852806090d2c1f39b8d564a14b1b4c8e62c6104bf73466e38bf23e223"));
var deskPulse = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("aab5534b1a3cac6e2bb48e01d3a4f39c53242d37d97f0e26fb38483ff7ae09df"));
function useLoad(load, empty) {
	const [rows, setRows] = (0, import_react.useState)(empty);
	const [error, setError] = (0, import_react.useState)("");
	function reload() {
		load().then(setRows).catch((err) => setError(err.message));
	}
	(0, import_react.useEffect)(() => {
		reload();
	}, []);
	return {
		rows,
		setRows,
		error,
		setError,
		reload
	};
}
function WireScreen() {
	const { boot, lang } = useDesk();
	const [tab, setTab] = (0, import_react.useState)("wire");
	if (!boot) return null;
	if (boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n(lang, "editorsOnly") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: n(lang, "wireDesk")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				"wire",
				"events",
				"fixes"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setTab(item),
				className: tab === item ? "h-11 bg-ink px-3 text-sm text-paper" : "h-11 border border-rule px-3 text-sm",
				children: item === "wire" ? n(lang, "wireDesk") : item === "events" ? n(lang, "eventsDesk") : n(lang, "fixesDesk")
			}, item))
		}),
		tab === "wire" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WirePane, { lang }) : null,
		tab === "events" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventPane, { lang }) : null,
		tab === "fixes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixPane, { lang }) : null
	] });
}
function WirePane({ lang }) {
	const data = useLoad(deskWireList, []);
	const [text, setText] = (0, import_react.useState)("");
	const [kicker, setKicker] = (0, import_react.useState)("");
	const [href, setHref] = (0, import_react.useState)("/article/");
	const [urgent, setUrgent] = (0, import_react.useState)(false);
	async function add(event) {
		event.preventDefault();
		data.setError("");
		try {
			await deskSaveWire({ data: {
				lang,
				kicker,
				text,
				href,
				urgent
			} });
			setText("");
			data.reload();
		} catch (err) {
			data.setError(err instanceof Error ? err.message : "error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void add(event),
			className: "grid gap-3 border border-rule bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "kicker"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: kicker,
						onChange: (event) => setKicker(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "text"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: text,
						onChange: (event) => setText(event.target.value),
						rows: 3,
						className: "mt-1 w-full border border-rule bg-paper px-3 py-2"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "link"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: href,
						onChange: (event) => setHref(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: urgent,
						onChange: (event) => setUrgent(event.target.checked)
					}), n(lang, "urgent")]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast",
					children: n(lang, "add")
				}),
				data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-crimson",
					children: data.error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-rule border-y border-rule",
			children: data.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center gap-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "min-w-0 flex-1",
						children: [row.urgent ? "● " : "", row.text]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-muted",
						children: row.lang
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 border border-rule px-3 text-sm",
						onClick: () => void deskSetWire({ data: {
							id: row.id,
							active: !row.active
						} }).then(data.reload),
						children: row.active ? n(lang, "hide") : n(lang, "show")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 border border-rule px-3 text-sm",
						onClick: () => void deskRemoveWire({ data: row.id }).then(data.reload),
						children: n(lang, "remove")
					})
				]
			}, row.id))
		})]
	});
}
function EventPane({ lang }) {
	const data = useLoad(deskEventList, []);
	const [title, setTitle] = (0, import_react.useState)("");
	const [place, setPlace] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)("");
	const [startsOn, setStartsOn] = (0, import_react.useState)("");
	async function add(event) {
		event.preventDefault();
		try {
			await deskSaveEvent({ data: {
				title,
				place,
				detail,
				startsOn,
				lang
			} });
			setTitle("");
			setDetail("");
			data.reload();
		} catch (err) {
			data.setError(err instanceof Error ? err.message : "error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void add(event),
			className: "grid gap-3 border border-rule bg-sheet p-4 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold sm:col-span-2",
					children: [n(lang, "title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						value: title,
						onChange: (event) => setTitle(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "place"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: place,
						onChange: (event) => setPlace(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "date"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						type: "date",
						value: startsOn,
						onChange: (event) => setStartsOn(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold sm:col-span-2",
					children: [n(lang, "detail"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: detail,
						onChange: (event) => setDetail(event.target.value),
						rows: 2,
						className: "mt-1 w-full border border-rule bg-paper px-3 py-2"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast",
					children: n(lang, "add")
				}),
				data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-crimson sm:col-span-2",
					children: data.error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-rule",
			children: data.rows.filter((row) => !row.fixed).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center gap-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm tabular-nums",
						children: row.startsOn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1",
						children: row.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 border border-rule px-3 text-sm",
						onClick: () => void deskRemoveEvent({ data: row.id }).then(data.reload),
						children: n(lang, "remove")
					})
				]
			}, row.id))
		})]
	});
}
function FixPane({ lang }) {
	const data = useLoad(deskFixList, []);
	const [groupKey, setGroupKey] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	async function add(event) {
		event.preventDefault();
		try {
			await deskSaveFix({ data: {
				groupKey,
				note,
				lang
			} });
			setNote("");
			data.reload();
		} catch (err) {
			data.setError(err instanceof Error ? err.message : "error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (event) => void add(event),
			className: "grid gap-3 border border-rule bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "group"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: groupKey,
						onChange: (event) => setGroupKey(event.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-paper px-3",
						placeholder: "citadel-memory"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "text-sm font-semibold",
					children: [n(lang, "note"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						required: true,
						value: note,
						onChange: (event) => setNote(event.target.value),
						rows: 3,
						className: "mt-1 w-full border border-rule bg-paper px-3 py-2"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast",
					children: n(lang, "add")
				}),
				data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-crimson",
					children: data.error
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-rule",
			children: data.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.note }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-2 h-11 border border-rule px-3 text-sm",
					onClick: () => void deskRemoveFix({ data: row.id }).then(data.reload),
					children: n(lang, "remove")
				})]
			}, row.id))
		})]
	});
}
function CommentScreen() {
	const { boot, lang } = useDesk();
	const data = useLoad(deskCommentList, []);
	if (!boot) return null;
	if (boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n(lang, "editorsOnly") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: n(lang, "commentDesk")
		}),
		data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-crimson",
			children: data.error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-rule border-y border-rule",
			children: data.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-2 py-3 sm:grid-cols-12 sm:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold",
							children: [
								row.name,
								" · ",
								row.status
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: row.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/article/$slug",
							params: { slug: row.groupKey },
							className: "text-sm text-crimson",
							children: row.groupKey
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 border border-rule px-3 text-sm sm:col-span-4",
					onClick: () => void deskSetComment({ data: {
						id: row.id,
						status: row.status === "hidden" ? "visible" : "hidden"
					} }).then(data.reload),
					children: row.status === "hidden" ? n(lang, "show") : n(lang, "hide")
				})]
			}, row.id))
		}),
		data.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: n(lang, "emptyDesk")
		}) : null
	] });
}
function StatsScreen() {
	const { boot, lang } = useDesk();
	const data = useLoad(deskPulse, null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setReady(true), []);
	if (!boot) return null;
	if (boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: n(lang, "editorsOnly") });
	const pulse = data.rows;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: n(lang, "statsDesk")
		}),
		data.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-crimson",
			children: data.error
		}) : null,
		pulse ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-muted",
			children: [
				n(lang, "total"),
				": ",
				pulse.totalStories,
				" ",
				n(lang, "stories"),
				" · ",
				pulse.totalViews,
				" ",
				n(lang, "reads")
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			dir: "ltr",
			className: "mt-6 h-72 border border-rule bg-sheet p-2",
			children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: pulse.sections,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "name",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { tick: {
							fill: "var(--color-muted)",
							fontSize: 11
						} }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "views",
							fill: "var(--color-crimson)"
						})
					]
				})
			}) : null
		})] }) : null
	] });
}
//#endregion
export { StatsScreen as n, WireScreen as r, CommentScreen as t };
