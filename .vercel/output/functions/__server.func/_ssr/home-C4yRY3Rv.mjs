import { o as __toESM } from "../_runtime.mjs";
import { Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ChevronRight, o as ChevronLeft } from "../_libs/lucide-react.mjs";
import { l as t, r as formatWhen, u as typeLabel } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, f as readHistory, l as n } from "./shell-C2oUoShk.mjs";
import { t as Kicker } from "./render-DO-dxZqt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-C4yRY3Rv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var INSTRUMENTS = [
	{
		id: "brent",
		seed: 11,
		start: 79,
		vol: .012,
		digits: 2,
		unit: "$",
		name: {
			ckb: "نەوتی برێنت",
			en: "Brent crude",
			kmr: "Nefta Brent",
			ar: "خام برنت"
		}
	},
	{
		id: "gold",
		seed: 23,
		start: 2330,
		vol: .008,
		digits: 0,
		unit: "$",
		name: {
			ckb: "زێڕ",
			en: "Gold",
			kmr: "Zêr",
			ar: "الذهب"
		}
	},
	{
		id: "usd",
		seed: 41,
		start: 1310,
		vol: .002,
		digits: 0,
		unit: "IQD",
		name: {
			ckb: "دۆلار / دینار",
			en: "Dollar / dinar",
			kmr: "Dolar / dînar",
			ar: "دولار / دينار"
		}
	},
	{
		id: "eur",
		seed: 57,
		start: 1425,
		vol: .003,
		digits: 0,
		unit: "IQD",
		name: {
			ckb: "یۆرۆ / دینار",
			en: "Euro / dinar",
			kmr: "Euro / dînar",
			ar: "يورو / دينار"
		}
	},
	{
		id: "wheat",
		seed: 73,
		start: 248,
		vol: .01,
		digits: 1,
		unit: "$",
		name: {
			ckb: "گەنم",
			en: "Wheat",
			kmr: "Genim",
			ar: "القمح"
		}
	}
];
var RANGES = [
	{
		id: "1w",
		days: 7
	},
	{
		id: "1m",
		days: 30
	},
	{
		id: "3m",
		days: 90
	}
];
function instrument(id) {
	return INSTRUMENTS.find((item) => item.id === id) ?? INSTRUMENTS[0];
}
function label(lang, name) {
	return name[lang] || name.en || name.ckb || "";
}
function series(id, range) {
	const item = instrument(id);
	const days = RANGES.find((itemRange) => itemRange.id === range)?.days ?? 30;
	const today = Math.floor(Date.now() / 864e5);
	let value = item.start;
	const points = [];
	const origin = today - 420;
	for (let day = origin; day <= today; day += 1) {
		const n = (item.seed * (day + 17) * 9301 + 49297) % 233280 / 233280;
		value = Math.max(.5, value * (1 + (n - .49) * item.vol));
		if (day >= today - (days - 1)) points.push({
			day: (/* @__PURE__ */ new Date(day * 864e5)).toISOString().slice(0, 10),
			value: Number(value.toFixed(item.digits))
		});
	}
	return {
		item,
		points
	};
}
function summarize(points) {
	const last = points.at(-1)?.value ?? 0;
	const first = points[0]?.value ?? last;
	const high = points.reduce((max, point) => Math.max(max, point.value), last);
	const low = points.reduce((min, point) => Math.min(min, point.value), last);
	const change = last - first;
	return {
		last,
		first,
		high,
		low,
		change,
		pct: first ? change / first * 100 : 0
	};
}
function formatNum(value, digits) {
	return value.toLocaleString("en-US", {
		minimumFractionDigits: digits,
		maximumFractionDigits: digits
	});
}
function useOn() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	return on;
}
function WireLink({ href, children }) {
	const article = /^\/article\/([a-z0-9-]+)$/.exec(href);
	if (article?.[1]) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/article/$slug",
		params: { slug: article[1] },
		className: "min-w-0 flex-1 hover:underline",
		children
	});
	if (!href) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "min-w-0 flex-1",
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: "min-w-0 flex-1 hover:underline",
		children
	});
}
function WireBar({ wires }) {
	const { lang } = useBoot();
	const [index, setIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (wires.length < 2) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const timer = window.setInterval(() => setIndex((value) => (value + 1) % wires.length), 6e3);
		return () => window.clearInterval(timer);
	}, [wires.length]);
	if (wires.length === 0) return null;
	const wire = wires[index] ?? wires[0];
	if (!wire) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: wire.urgent ? "bg-crimson text-on-mast" : "bg-mast text-on-mast",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireLink, {
				href: wire.href,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex min-w-0 items-baseline gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-xs font-semibold",
						children: wire.urgent ? n(lang, "urgent") : wire.kicker || n(lang, "live")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: wire.text
					})]
				})
			}), wires.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex shrink-0 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid h-11 w-11 place-items-center border border-on-mast/30",
					"aria-label": n(lang, "earlier"),
					onClick: () => setIndex((value) => (value - 1 + wires.length) % wires.length),
					children: "‹"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid h-11 w-11 place-items-center border border-on-mast/30",
					"aria-label": n(lang, "upcoming"),
					onClick: () => setIndex((value) => (value + 1) % wires.length),
					children: "›"
				})]
			}) : null]
		})
	});
}
function MarketStrip() {
	const lang = useBoot().lang;
	const on = useOn();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "border-b border-rule bg-sheet",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-stretch gap-2 overflow-x-auto px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/markets",
				search: { id: "brent" },
				className: "grid shrink-0 place-items-center py-3 text-xs font-semibold text-crimson",
				children: n(lang, "markets")
			}), INSTRUMENTS.map((item) => {
				const tape = on ? summarize(series(item.id, "1m").points) : null;
				const down = (tape?.pct ?? 0) < 0;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/markets",
					search: { id: item.id },
					className: "flex shrink-0 items-baseline gap-2 border-s border-rule px-3 py-3 text-sm hover:text-crimson",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label(lang, item.name) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold tabular-nums",
							children: tape ? formatNum(tape.last, item.digits) : "–"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: down ? "text-crimson tabular-nums" : "tabular-nums",
							children: tape ? `${tape.pct > 0 ? "+" : ""}${tape.pct.toFixed(1)}%` : ""
						})
					]
				}, item.id);
			})]
		})
	});
}
function ContinueReading({ stories }) {
	const lang = useBoot().lang;
	const on = useOn();
	const [keys, setKeys] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => setKeys(readHistory()), []);
	if (!on || keys.length === 0) return null;
	const picks = keys.map((key) => stories.find((story) => story.groupKey === key)).filter((story) => Boolean(story)).slice(0, 3);
	if (picks.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-rule py-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-serif text-2xl",
			children: n(lang, "recent")
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 grid gap-3 md:grid-cols-3",
			children: picks.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/article/$slug",
				params: { slug: story.groupKey },
				className: "font-serif text-xl leading-snug hover:text-crimson",
				children: story.title
			}) }, story.groupKey))
		})]
	});
}
function Byline({ story, lang }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-3 text-sm text-muted",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/author/$slug",
				params: { slug: story.authorSlug },
				className: "font-semibold text-ink hover:text-crimson",
				children: story.authorName
			}),
			story.publishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [" · ", formatWhen(lang, story.publishedAt)] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				" · ",
				story.minutes,
				" ",
				t(lang, "minRead")
			] })
		]
	});
}
function StoryTease({ story, lang, image = false, deck = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
		image && story.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/article/$slug",
			params: { slug: story.groupKey },
			className: "mb-3 block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: story.image,
				alt: "",
				className: "aspect-news w-full object-cover"
			})
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Kicker, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/section/$slug",
			params: { slug: story.category },
			children: story.categoryName
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-muted",
			children: [" · ", typeLabel(lang, story.type)]
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 font-serif text-2xl leading-tight",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/article/$slug",
				params: { slug: story.groupKey },
				className: "hover:text-crimson",
				children: story.title
			})
		}),
		deck ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: story.dek
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Byline, {
			story,
			lang
		})
	] });
}
function Hero({ stories }) {
	const { lang, dir } = useBoot();
	const [index, setIndex] = (0, import_react.useState)(0);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const count = stories.length;
	(0, import_react.useEffect)(() => {
		if (count < 2 || paused) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), 7e3);
		return () => window.clearInterval(timer);
	}, [count, paused]);
	if (count === 0) return null;
	const story = stories[index] ?? stories[0];
	if (!story) return null;
	const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
	const Next = dir === "rtl" ? ChevronLeft : ChevronRight;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-b border-rule",
		"aria-roledescription": "carousel",
		onMouseEnter: () => setPaused(true),
		onMouseLeave: () => setPaused(false),
		onFocus: () => setPaused(true),
		onBlur: () => setPaused(false),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "story-in grid lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/article/$slug",
				params: { slug: story.groupKey },
				className: "block lg:col-span-7",
				children: story.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: story.image,
					alt: "",
					className: "aspect-news h-full w-full object-cover"
				}) : null
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-center bg-sheet px-5 py-8 lg:col-span-5 lg:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Kicker, { children: [
						story.categoryName,
						" · ",
						typeLabel(lang, story.type)
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-serif text-4xl leading-tight sm:text-5xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/article/$slug",
							params: { slug: story.groupKey },
							className: "hover:text-crimson",
							children: story.title
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-lg text-muted",
						children: story.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Byline, {
						story,
						lang
					}),
					story.imageCaption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted",
						children: story.imageCaption
					}) : null
				]
			})]
		}, story.id), count > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid h-11 w-11 place-items-center border border-rule",
					"aria-label": t(lang, "prev"),
					onClick: () => setIndex((value) => (value - 1 + count) % count),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Prev, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "grid h-11 w-11 place-items-center border border-rule",
					"aria-label": t(lang, "next"),
					onClick: () => setIndex((value) => (value + 1) % count),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Next, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 px-2",
					children: stories.map((item, dot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": item.title,
						className: dot === index ? "h-2.5 w-6 bg-crimson" : "h-2.5 w-2.5 bg-rule",
						onClick: () => setIndex(dot)
					}, item.id))
				})
			]
		}) : null]
	});
}
function Newsletter() {
	const lang = useBoot().lang;
	const [email, setEmail] = (0, import_react.useState)("");
	const [done, setDone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (localStorage.getItem("knc-note") === "1") setDone(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "border border-rule bg-sheet p-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (!email.includes("@")) return;
			localStorage.setItem("knc-note", "1");
			setDone(true);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: t(lang, "newsletterTitle") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t(lang, "newsletterBody")
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-semibold",
				children: t(lang, "subscribed")
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					required: true,
					value: email,
					onChange: (event) => setEmail(event.target.value),
					placeholder: t(lang, "email"),
					"aria-label": t(lang, "email"),
					suppressHydrationWarning: true,
					className: "h-11 border border-rule bg-paper px-3 text-sm outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-11 bg-crimson px-4 text-sm font-semibold text-on-mast",
					children: t(lang, "subscribe")
				})]
			})
		]
	});
}
function Sidebar({ home }) {
	const boot = useBoot();
	const lang = boot.lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "space-y-8",
		children: [
			boot.plugins.includes("newsletter") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Newsletter, {}) : null,
			boot.plugins.includes("most-read") && home.mostRead.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-t-2 border-ink pt-2 font-serif text-xl",
				children: t(lang, "mostRead")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-3",
				children: home.mostRead.map((story, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 border-b border-rule py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-crimson tabular-nums",
						children: index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: story.groupKey },
						className: "font-serif text-lg leading-snug hover:text-crimson",
						children: story.title
					})]
				}, story.id))
			})] }) : null,
			home.sidebar.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-t-2 border-ink pt-2 font-serif text-xl",
				children: t(lang, "editorsChoice")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-6",
				children: home.sidebar.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
					story,
					lang
				}, story.id))
			})] }) : null,
			home.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "border-t-2 border-ink pt-2 font-serif text-xl",
				children: t(lang, "hashtags")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: home.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tag/$slug",
					params: { slug: tag.slug },
					className: "inline-block border border-rule px-2 py-1 text-sm hover:border-ink",
					children: ["#", tag.name]
				}) }, tag.slug))
			})] }) : null
		]
	});
}
function HomeView({ home, wires }) {
	const lang = useBoot().lang;
	const flat = [
		...home.hero,
		...home.lead,
		...home.latest,
		...home.sidebar,
		...home.mostRead,
		...home.sections.flatMap((section) => section.stories)
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WireBar, { wires }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketStrip, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, { stories: home.hero }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContinueReading, { stories: flat }),
				home.lead.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-8 border-b border-rule py-8 md:grid-cols-2",
					children: home.lead.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
						story,
						lang,
						image: true,
						deck: true
					}, story.id))
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-10 py-10 lg:grid-cols-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-12 lg:col-span-8",
						children: [home.sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-end justify-between border-t-2 border-ink pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-serif text-2xl",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/section/$slug",
									params: { slug: section.slug },
									className: "hover:text-crimson",
									children: section.name
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/section/$slug",
								params: { slug: section.slug },
								className: "text-xs font-semibold tracking-widest uppercase text-muted",
								children: t(lang, "allStories")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [section.stories[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
								story: section.stories[0],
								lang,
								image: true,
								deck: true
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: section.stories.slice(1).map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "border-b border-rule pb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: typeLabel(lang, story.type) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-serif text-xl leading-snug",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/article/$slug",
											params: { slug: story.groupKey },
											className: "hover:text-crimson",
											children: story.title
										})
									})]
								}, story.id))
							})]
						})] }, section.slug)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "border-t-2 border-ink pt-2 font-serif text-2xl",
							children: t(lang, "latest")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 divide-y divide-rule",
							children: home.latest.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "grid gap-4 py-5 sm:grid-cols-12",
								children: [story.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/article/$slug",
									params: { slug: story.groupKey },
									className: "sm:col-span-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: story.image,
										alt: "",
										className: "aspect-news w-full object-cover"
									})
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: story.image ? "sm:col-span-8" : "sm:col-span-12",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kicker, { children: story.categoryName }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-1 font-serif text-2xl leading-snug",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/article/$slug",
												params: { slug: story.groupKey },
												className: "hover:text-crimson",
												children: story.title
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-muted",
											children: story.dek
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Byline, {
											story,
											lang
										})
									]
								})]
							}, story.id))
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, { home })
					})]
				})
			]
		})
	] });
}
function StoryList({ stories, title, toolbar }) {
	const lang = useBoot().lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-4xl",
				children: title
			}), toolbar]
		}), stories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-muted",
			children: t(lang, "empty")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
			children: stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
				story,
				lang,
				image: true,
				deck: true
			}, story.id))
		})]
	});
}
//#endregion
export { StoryTease as a, series as c, StoryList as i, summarize as l, INSTRUMENTS as n, formatNum as o, RANGES as r, label as s, HomeView as t };
