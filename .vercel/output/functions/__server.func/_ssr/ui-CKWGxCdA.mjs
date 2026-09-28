import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as statusLabel, l as t, n as LANGS, s as roleLabel, u as typeLabel } from "./i18n-J2xLYLI0.mjs";
import { i as loc } from "./text-CidIKiEz.mjs";
import { D as useBoot, O as useCurrentUserState, S as setRole, _ as saveArticle, a as listDeskStories, b as saveTaxon, c as myProfile, g as saveAppearance, i as getEditable, l as n, o as listPages, r as deskBoot, s as listPeople, t as RedirectToSignIn, v as savePage, x as setPlugin, y as saveProfile } from "./shell-C2oUoShk.mjs";
import { t as PLUGIN_CATALOG } from "./seed-data-CqXKpiXQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-CKWGxCdA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MEDIA = [
	{
		src: "/media/citadel.jpg",
		label: "Citadel"
	},
	{
		src: "/media/civic.jpg",
		label: "Chamber"
	},
	{
		src: "/media/corpus.jpg",
		label: "Archive"
	},
	{
		src: "/media/tea.jpg",
		label: "Tea"
	},
	{
		src: "/media/tembur.jpg",
		label: "Tembûr"
	},
	{
		src: "/media/water.jpg",
		label: "Highlands"
	},
	{
		src: "/media/harvest.jpg",
		label: "Harvest"
	},
	{
		src: "/media/alphabet.jpg",
		label: "Alphabets"
	},
	{
		src: "/media/newsroom.jpg",
		label: "Newsroom"
	}
];
var Ctx = (0, import_react.createContext)({
	boot: null,
	reload: () => void 0,
	lang: "ckb"
});
function useDesk() {
	return (0, import_react.useContext)(Ctx);
}
function DeskLayout({ children }) {
	const { user, isPending } = useCurrentUserState();
	const site = useBoot();
	const [boot, setBoot] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	function reload() {
		deskBoot().then(setBoot).catch((err) => setError(err.message));
	}
	(0, import_react.useEffect)(() => {
		if (user) reload();
	}, [user]);
	if (isPending || user && !boot && !error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-paper p-10 text-muted",
		children: [t(site.lang, "desk"), "…"]
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RedirectToSignIn, {});
	const lang = site.lang;
	const role = boot?.role ?? "reader";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			boot,
			reload,
			lang
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-paper lg:grid lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "bg-mast text-on-mast lg:col-span-3 xl:col-span-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-serif text-2xl",
							children: "KNC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs tracking-widest uppercase",
							children: t(lang, "desk")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-on-mast/70",
							children: roleLabel(lang, role)
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex gap-2 overflow-x-auto px-3 pb-4 text-sm lg:block lg:space-y-1 lg:px-3",
					children: [
						[
							["/desk", "dashboard"],
							["/desk/new", "newStory"],
							["/desk/profile", "profile"]
						].map(([to, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
							children: t(lang, key)
						}, to)),
						(role === "editor" || role === "superadmin") && [
							["/desk/review", "reviewQueue"],
							["/desk/pages", "pages"],
							["/desk/taxonomy", "taxonomy"]
						].map(([to, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
							children: t(lang, key)
						}, to)),
						role === "superadmin" && [
							["/desk/people", "people"],
							["/desk/appearance", "appearance"],
							["/desk/plugins", "plugins"]
						].map(([to, key]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to,
							className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
							children: t(lang, key)
						}, to)),
						role === "editor" || role === "superadmin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk/wire",
								className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
								children: n(lang, "wireDesk")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk/comments",
								className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
								children: n(lang, "commentDesk")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk/stats",
								className: "block shrink-0 px-2 py-2 hover:bg-on-mast/10",
								children: n(lang, "statsDesk")
							})
						] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "block shrink-0 px-2 py-2 text-on-mast/70",
							children: t(lang, "viewSite")
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-6 lg:col-span-9 xl:col-span-10 lg:px-8",
				children: [error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-4 text-sm text-crimson",
					children: error
				}) : null, children]
			})]
		})
	});
}
function DeskHome() {
	const { boot, lang } = useDesk();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [filter, setFilter] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		listDeskStories().then(setRows).catch(() => setRows([]));
	}, []);
	if (!boot) return null;
	if (boot.role === "reader") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: t(lang, "desk")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4",
				children: t(lang, "noAccess")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t(lang, "promoteHint")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/profile",
				className: "mt-6 inline-block border border-ink px-4 py-2 text-sm",
				children: t(lang, "profile")
			})
		]
	});
	const shown = rows.filter((row) => filter === "all" || row.status === filter || filter === "draft" && row.status === "rejected");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: t(lang, "dashboard")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-3",
			children: [
				[t(lang, "published"), boot.counts.published],
				[t(lang, "inReview"), boot.counts.review],
				[t(lang, "draft"), boot.counts.drafts]
			].map(([label, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-rule bg-sheet p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-widest text-muted uppercase",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-serif text-4xl tabular-nums",
					children: n
				})]
			}, String(label)))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 flex flex-wrap gap-2",
			children: [[
				"all",
				"draft",
				"review",
				"published",
				"rejected"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(item),
				className: filter === item ? "h-10 bg-ink px-3 text-sm text-paper" : "h-10 border border-rule px-3 text-sm",
				children: item === "all" ? t(lang, "all") : statusLabel(lang, item)
			}, item)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/new",
				className: "ms-auto grid h-10 place-items-center bg-crimson px-4 text-sm font-semibold text-on-mast",
				children: t(lang, "newStory")
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-rule border-y border-rule",
			children: shown.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-1 py-3 sm:grid-cols-12 sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/desk/edit/$id",
						params: { id: String(row.id) },
						className: "font-serif text-xl hover:text-crimson sm:col-span-6",
						children: row.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted sm:col-span-2",
						children: row.lang
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm sm:col-span-2",
						children: statusLabel(lang, row.status)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted sm:col-span-2",
						children: typeLabel(lang, row.type)
					})
				]
			}, row.id))
		})
	] });
}
var emptyRef = () => ({
	authors: "",
	year: "",
	title: "",
	source: ""
});
function StoryEditor({ id }) {
	const { boot, lang, reload } = useDesk();
	const router = useRouter();
	const [form, setForm] = (0, import_react.useState)({
		groupKey: "",
		lang,
		kind: "article",
		type: "standard",
		title: "",
		dek: "",
		body: "",
		image: "/media/citadel.jpg",
		imageCaption: "",
		category: "culture",
		tags: "",
		zones: [],
		refs: [emptyRef()],
		reviewNote: "",
		status: "draft",
		locked: false
	});
	const [message, setMessage] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!id) return;
		getEditable({ data: id }).then((row) => {
			if (!row) return;
			setForm({
				groupKey: row.groupKey,
				lang: row.lang,
				kind: row.kind,
				type: row.type,
				title: row.title,
				dek: row.dek,
				body: row.body,
				image: row.image,
				imageCaption: row.imageCaption,
				category: row.category,
				tags: row.tags,
				zones: row.zones,
				refs: row.refs.length ? row.refs : [emptyRef()],
				reviewNote: row.reviewNote,
				status: row.status,
				locked: row.locked
			});
		}).catch((err) => setError(err.message));
	}, [id]);
	if (!boot) return null;
	if (boot.role === "reader") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	const canPublish = boot.role === "editor" || boot.role === "superadmin";
	function toggle(zone) {
		setForm((current) => ({
			...current,
			zones: current.zones.includes(zone) ? current.zones.filter((item) => item !== zone) : [...current.zones, zone]
		}));
	}
	async function submit(action) {
		setError("");
		setMessage("");
		try {
			const saved = await saveArticle({ data: {
				...form,
				id: id ?? 0,
				action,
				refs: form.refs.filter((ref) => ref.title || ref.authors)
			} });
			setMessage(t(lang, "saved"));
			reload();
			if (!id) router.navigate({
				to: "/desk/edit/$id",
				params: { id: String(saved.id) }
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Error");
		}
	}
	const categories = boot.categories.map((cat) => {
		const name = loc(cat.name, lang);
		return {
			slug: cat.slug,
			name
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mx-auto max-w-3xl space-y-4",
		onSubmit: (event) => event.preventDefault(),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif text-4xl",
					children: id ? t(lang, "title") : t(lang, "newStory")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: statusLabel(lang, form.status)
				})]
			}),
			form.locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-crimson",
				children: t(lang, "published")
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "title"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.title,
					onChange: (e) => setForm({
						...form,
						title: e.target.value
					}),
					className: "mt-1 h-11 w-full border border-rule bg-sheet px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "dek"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.dek,
					onChange: (e) => setForm({
						...form,
						dek: e.target.value
					}),
					className: "mt-1 h-20 w-full border border-rule bg-sheet px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [t(lang, "language"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.lang,
							onChange: (e) => setForm({
								...form,
								lang: e.target.value
							}),
							className: "mt-1 h-11 w-full border border-rule bg-sheet px-2",
							children: LANGS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: item.id,
								children: item.label
							}, item.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [t(lang, "kind"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.kind,
							onChange: (e) => setForm({
								...form,
								kind: e.target.value
							}),
							className: "mt-1 h-11 w-full border border-rule bg-sheet px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "article",
								children: t(lang, "article")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "post",
								children: t(lang, "post")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [t(lang, "type"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: form.type,
							onChange: (e) => setForm({
								...form,
								type: e.target.value
							}),
							className: "mt-1 h-11 w-full border border-rule bg-sheet px-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "standard",
									children: t(lang, "standard")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "premium",
									children: t(lang, "premium")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "scientific",
									children: t(lang, "scientific")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "text-sm",
						children: [t(lang, "category"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: form.category,
							onChange: (e) => setForm({
								...form,
								category: e.target.value
							}),
							className: "mt-1 h-11 w-full border border-rule bg-sheet px-2",
							children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: cat.slug,
								children: cat.name
							}, cat.slug))
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [
					t(lang, "group"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: form.groupKey,
						onChange: (e) => setForm({
							...form,
							groupKey: e.target.value
						}),
						className: "mt-1 h-11 w-full border border-rule bg-sheet px-3",
						list: "groups"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-muted",
						children: t(lang, "groupHint")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("datalist", {
				id: "groups",
				children: boot.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: group.key,
					children: group.title
				}, group.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm",
					children: t(lang, "image")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5",
					children: MEDIA.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setForm({
							...form,
							image: item.src
						}),
						className: form.image === item.src ? "border-2 border-crimson" : "border border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.src,
							alt: item.label,
							className: "aspect-news w-full object-cover"
						})
					}, item.src))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.image,
					onChange: (e) => setForm({
						...form,
						image: e.target.value
					}),
					className: "mt-2 h-11 w-full border border-rule bg-sheet px-3 text-sm"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "caption"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.imageCaption,
					onChange: (e) => setForm({
						...form,
						imageCaption: e.target.value
					}),
					className: "mt-1 h-11 w-full border border-rule bg-sheet px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "tagsHint"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.tags,
					onChange: (e) => setForm({
						...form,
						tags: e.target.value
					}),
					className: "mt-1 h-11 w-full border border-rule bg-sheet px-3"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "mb-2 text-sm font-semibold",
						children: t(lang, "onHome")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						label: t(lang, "onHero"),
						on: form.zones.includes("hero"),
						toggle: () => toggle("hero")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						label: t(lang, "onLead"),
						on: form.zones.includes("lead"),
						toggle: () => toggle("lead")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						label: t(lang, "onHome"),
						on: form.zones.includes("latest"),
						toggle: () => toggle("latest")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						label: t(lang, "onSidebar"),
						on: form.zones.includes("sidebar"),
						toggle: () => toggle("sidebar")
					}),
					categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						label: `${t(lang, "sectionPlace")}: ${cat.name}`,
						on: form.zones.includes(`section:${cat.slug}`),
						toggle: () => toggle(`section:${cat.slug}`)
					}, cat.slug))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [
					t(lang, "body"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: form.body,
						onChange: (e) => setForm({
							...form,
							body: e.target.value
						}),
						className: "mt-1 h-72 w-full border border-rule bg-sheet px-3 py-2 font-serif text-lg"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-muted",
						children: t(lang, "bodyHint")
					})
				]
			}),
			form.type === "scientific" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
						className: "text-sm",
						children: t(lang, "references")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: t(lang, "refsHint")
					}),
					form.refs.map((ref, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-4",
						children: [
							"authors",
							"year",
							"title",
							"source"
						].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ref[key],
							placeholder: key,
							onChange: (e) => {
								const refs = form.refs.slice();
								refs[index] = {
									...ref,
									[key]: e.target.value
								};
								setForm({
									...form,
									refs
								});
							},
							className: "h-10 border border-rule bg-sheet px-2 text-sm"
						}, key))
					}, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm underline",
						onClick: () => setForm({
							...form,
							refs: [...form.refs, emptyRef()]
						}),
						children: "+"
					})
				]
			}) : null,
			canPublish ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "note"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.reviewNote,
					onChange: (e) => setForm({
						...form,
						reviewNote: e.target.value
					}),
					className: "mt-1 h-20 w-full border border-rule bg-sheet px-3 py-2"
				})]
			}) : null,
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: message
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-crimson",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: form.locked,
						className: "h-11 border border-ink px-4 text-sm",
						onClick: () => submit("draft"),
						children: t(lang, "saveDraft")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: form.locked,
						className: "h-11 border border-ink px-4 text-sm",
						onClick: () => submit("review"),
						children: t(lang, "submitReview")
					}),
					canPublish ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 bg-crimson px-4 text-sm font-semibold text-on-mast",
						onClick: () => submit("publish"),
						children: t(lang, "publish")
					}) : null,
					canPublish ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-11 border border-rule px-4 text-sm",
						onClick: () => submit("reject"),
						children: t(lang, "reject")
					}) : null
				]
			})
		]
	});
}
function Check({ label, on, toggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "flex min-h-11 items-center gap-2 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "checkbox",
			checked: on,
			onChange: toggle,
			className: "size-4"
		}), label]
	});
}
function ReviewScreen() {
	const { boot, lang } = useDesk();
	const [rows, setRows] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		listDeskStories().then(setRows).catch(() => void 0);
	}, []);
	if (!boot || boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	const queue = rows.filter((row) => row.status === "review");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-serif text-4xl",
		children: t(lang, "reviewQueue")
	}), queue.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-6 text-muted",
		children: t(lang, "empty")
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-6 divide-y divide-rule",
		children: queue.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex flex-wrap items-center justify-between gap-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/edit/$id",
				params: { id: String(row.id) },
				className: "font-serif text-2xl hover:text-crimson",
				children: row.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					row.lang,
					" · ",
					row.authorName
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/desk/edit/$id",
				params: { id: String(row.id) },
				className: "inline-flex h-11 items-center border border-ink px-4 text-sm",
				children: t(lang, "reviewQueue")
			})]
		}, row.id))
	})] });
}
function ProfileScreen() {
	const { lang, reload } = useDesk();
	const [form, setForm] = (0, import_react.useState)({
		displayName: "",
		title: "",
		location: "",
		languages: "",
		email: "",
		bio: "",
		education: "",
		experience: "",
		slug: ""
	});
	const [message, setMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		myProfile({ data: lang }).then((row) => {
			if (row) setForm(row);
		}).catch(() => void 0);
	}, [lang]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mx-auto max-w-2xl space-y-3",
		onSubmit: async (event) => {
			event.preventDefault();
			const saved = await saveProfile({ data: {
				...form,
				lang
			} });
			setForm({
				...form,
				slug: saved.slug
			});
			setMessage(t(lang, "saved"));
			reload();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: t(lang, "profile")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t(lang, "lineHint")
			}),
			[
				"displayName",
				"title",
				"location",
				"languages",
				"email"
			].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, key === "displayName" ? "name" : key === "title" ? "title" : key === "email" ? "email" : key === "location" ? "location" : "spoken"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form[key],
					onChange: (e) => setForm({
						...form,
						[key]: e.target.value
					}),
					className: "mt-1 h-11 w-full border border-rule bg-sheet px-3"
				})]
			}, key)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "bio"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.bio,
					onChange: (e) => setForm({
						...form,
						bio: e.target.value
					}),
					className: "mt-1 h-28 w-full border border-rule bg-sheet px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "education"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.education,
					onChange: (e) => setForm({
						...form,
						education: e.target.value
					}),
					className: "mt-1 h-24 w-full border border-rule bg-sheet px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [t(lang, "experience"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.experience,
					onChange: (e) => setForm({
						...form,
						experience: e.target.value
					}),
					className: "mt-1 h-24 w-full border border-rule bg-sheet px-3 py-2"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "h-11 bg-ink px-4 text-sm text-paper",
				children: t(lang, "save")
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: message
			}) : null,
			form.slug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/author/$slug",
				params: { slug: form.slug },
				className: "block text-sm underline",
				children: t(lang, "viewSite")
			}) : null
		]
	});
}
function PeopleScreen() {
	const { boot, lang, reload } = useDesk();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listPeople().then(setRows).catch((err) => setError(err.message));
	}, []);
	if (!boot || boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: t(lang, "people")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: t(lang, "firstAdmin")
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-sm text-crimson",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-rule",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex flex-wrap items-center justify-between gap-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: loc(row.name, lang)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: row.staff ? t(lang, "staff") : row.slug
				})] }), row.staff ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm",
					children: roleLabel(lang, row.role)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: row.role,
					className: "h-11 border border-rule bg-sheet px-2",
					onChange: async (event) => {
						setError("");
						try {
							await setRole({ data: {
								id: row.id,
								role: event.target.value
							} });
							reload();
							setRows(await listPeople());
						} catch (err) {
							setError(err instanceof Error ? err.message : "Error");
						}
					},
					children: [
						"reader",
						"writer",
						"editor",
						"superadmin"
					].map((role) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: role,
						children: roleLabel(lang, role)
					}, role))
				})]
			}, row.id))
		})
	] });
}
function TaxonomyScreen() {
	const { boot, lang, reload } = useDesk();
	const [kind, setKind] = (0, import_react.useState)("category");
	const [slug, setSlug] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [message, setMessage] = (0, import_react.useState)("");
	if (!boot || boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: t(lang, "taxonomy")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3",
				onSubmit: async (event) => {
					event.preventDefault();
					await saveTaxon({ data: {
						kind,
						slug,
						name,
						lang
					} });
					setMessage(t(lang, "saved"));
					setSlug("");
					setName("");
					reload();
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: kind,
						onChange: (e) => setKind(e.target.value),
						className: "h-11 w-full border border-rule bg-sheet px-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "category",
							children: t(lang, "category")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "tag",
							children: t(lang, "hashtags")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: slug,
						onChange: (e) => setSlug(e.target.value),
						placeholder: t(lang, "slug"),
						className: "h-11 w-full border border-rule bg-sheet px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: t(lang, "name"),
						className: "h-11 w-full border border-rule bg-sheet px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "h-11 bg-ink px-4 text-sm text-paper",
						children: t(lang, "save")
					}),
					message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: message
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-8 space-y-2 text-sm",
				children: [boot.categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					cat.slug,
					" — ",
					loc(cat.name, lang)
				] }, cat.slug)), boot.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					"#",
					tag.slug,
					" — ",
					loc(tag.name, lang)
				] }, tag.slug))]
			})
		]
	});
}
function AppearanceScreen() {
	const { boot, lang, reload } = useDesk();
	const [theme, setTheme] = (0, import_react.useState)(boot?.theme ?? "classic");
	const [logo, setLogo] = (0, import_react.useState)(boot?.logo ?? "");
	const [message, setMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (boot) {
			setTheme(boot.theme);
			setLogo(boot.logo);
		}
	}, [boot]);
	if (!boot || boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "max-w-xl space-y-4",
		onSubmit: async (event) => {
			event.preventDefault();
			await saveAppearance({ data: {
				theme,
				logo
			} });
			setMessage(t(lang, "saved"));
			reload();
			window.location.reload();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: t(lang, "appearance")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					"classic",
					"night",
					"warm"
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setTheme(item),
					className: theme === item ? "border-2 border-crimson bg-sheet p-4 text-start" : "border border-rule bg-sheet p-4 text-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-serif text-2xl",
						children: "Aa"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: t(lang, item === "classic" ? "classic" : item === "night" ? "night" : "warm")
					})]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm",
				children: [
					t(lang, "logo"),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: logo,
						onChange: (e) => setLogo(e.target.value),
						className: "mt-1 h-11 w-full border border-rule bg-sheet px-3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-xs text-muted",
						children: t(lang, "logoHint")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "h-11 bg-ink px-4 text-sm text-paper",
				children: t(lang, "save")
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				children: message
			}) : null
		]
	});
}
function PluginScreen() {
	const { boot, lang, reload } = useDesk();
	if (!boot || boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: t(lang, "plugins")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-rule",
			children: PLUGIN_CATALOG.map((plugin) => {
				const on = boot.plugins.find((item) => item.slug === plugin.slug)?.enabled ?? false;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-4 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						children: plugin.slug
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t(lang, plugin.key)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: on ? "h-11 bg-ink px-4 text-sm text-paper" : "h-11 border border-rule px-4 text-sm",
						onClick: async () => {
							await setPlugin({ data: {
								slug: plugin.slug,
								enabled: !on
							} });
							reload();
						},
						children: on ? t(lang, "enabled") : t(lang, "close")
					})]
				}, plugin.slug);
			})
		})]
	});
}
function PagesScreen() {
	const { boot, lang } = useDesk();
	const [rows, setRows] = (0, import_react.useState)([]);
	const [form, setForm] = (0, import_react.useState)({
		id: 0,
		slug: "",
		lang,
		title: "",
		body: "",
		status: "published"
	});
	const [message, setMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		listPages().then(setRows).catch(() => void 0);
	}, []);
	if (!boot || boot.role !== "editor" && boot.role !== "superadmin") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t(lang, "noAccess") });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-8 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl",
			children: t(lang, "pages")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-rule",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "w-full py-3 text-start",
				onClick: () => setForm(row),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-serif text-xl",
					children: row.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 block text-sm text-muted",
					children: [
						"/",
						row.slug,
						" · ",
						row.lang
					]
				})]
			}) }, row.id))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3",
			onSubmit: async (event) => {
				event.preventDefault();
				await savePage({ data: form });
				setMessage(t(lang, "saved"));
				setRows(await listPages());
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: form.id ? form.title : t(lang, "pages")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.slug,
					onChange: (e) => setForm({
						...form,
						slug: e.target.value
					}),
					placeholder: t(lang, "slug"),
					className: "h-11 w-full border border-rule bg-sheet px-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: form.title,
					onChange: (e) => setForm({
						...form,
						title: e.target.value
					}),
					placeholder: t(lang, "title"),
					className: "h-11 w-full border border-rule bg-sheet px-3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					value: form.lang,
					onChange: (e) => setForm({
						...form,
						lang: e.target.value
					}),
					className: "h-11 w-full border border-rule bg-sheet px-2",
					children: LANGS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: item.id,
						children: item.label
					}, item.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: form.body,
					onChange: (e) => setForm({
						...form,
						body: e.target.value
					}),
					className: "h-64 w-full border border-rule bg-sheet px-3 py-2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 bg-ink px-4 text-sm text-paper",
					children: t(lang, "save")
				}),
				message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					children: message
				}) : null
			]
		})]
	});
}
//#endregion
export { PeopleScreen as a, ReviewScreen as c, useDesk as d, PagesScreen as i, StoryEditor as l, DeskHome as n, PluginScreen as o, DeskLayout as r, ProfileScreen as s, AppearanceScreen as t, TaxonomyScreen as u };
