import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, Q as require_react, S as useNavigate, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as myShelf } from "./router-X6q-UdJH.mjs";
import { r as formatWhen } from "./i18n-J2xLYLI0.mjs";
import { D as useBoot, O as useCurrentUserState, d as readFollows, f as readHistory, k as writeBest, l as n, m as readSaves, u as readBest } from "./shell-C2oUoShk.mjs";
import { r as LetterButton } from "./reader-BkxSsvEn.mjs";
import { a as StoryTease, c as series, l as summarize, n as INSTRUMENTS, o as formatNum, r as RANGES, s as label } from "./home-C4yRY3Rv.mjs";
import { a as Area, c as Tooltip, i as XAxis, n as BarChart, o as Bar, r as YAxis, s as ResponsiveContainer, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/views-CxK0ccho.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CLUES = [
	{
		answer: "چیا",
		clue: {
			ckb: "بەرزایییەکی گەورەی بەرد و سەوزایی",
			en: "A great rise of rock and green",
			kmr: "Bilindahiyeke mezin",
			ar: "مرتفع صخري كبير"
		}
	},
	{
		answer: "چای",
		clue: {
			ckb: "خواردنەوەی هەموو کۆڕ و میواندارییەک",
			en: "The drink of every gathering",
			kmr: "Vexwarina her civînê",
			ar: "شراب كل مجلس"
		}
	},
	{
		answer: "دەف",
		clue: {
			ckb: "ئامێرێکی کوردی لە پێست و دار",
			en: "A Kurdish frame drum of skin and wood",
			kmr: "Amûrekî çerm û dar",
			ar: "دف من جلد وخشب"
		}
	},
	{
		answer: "نەورۆز",
		clue: {
			ckb: "سەری ساڵ و ئاگر و دەرەوە",
			en: "The new year, fire, and the open air",
			kmr: "Sersala agir",
			ar: "رأس السنة والنار"
		}
	},
	{
		answer: "گەنم",
		clue: {
			ckb: "دانەوێڵەی نان و لەپی نانەوا",
			en: "The grain of bread and the baker’s tray",
			kmr: "Genimê nan",
			ar: "حبّة الخبز"
		}
	},
	{
		answer: "کتێب",
		clue: {
			ckb: "دەقێکی بەستراو کە دەستی لێ دەدەیت",
			en: "A bound text you hold in the hand",
			kmr: "Nivîseke girêdayî",
			ar: "نص مجلد"
		}
	},
	{
		answer: "هەور",
		clue: {
			ckb: "ئەوەی ئاسمان دادەپۆشێت و باران دەهێنێت",
			en: "What covers the sky and brings rain",
			kmr: "Ya ku baranê tîne",
			ar: "ما يغطي السماء"
		}
	},
	{
		answer: "قەڵا",
		clue: {
			ckb: "گردێکی نیشتمانی لە ناوەڕاستی هەولێر",
			en: "The inhabited mound at the heart of Hewlêr",
			kmr: "Girê Hewlêrê",
			ar: "تل في قلب أربيل"
		}
	},
	{
		answer: "زمان",
		clue: {
			ckb: "ئەوەی پێی دەنووسین و پێی دەژین",
			en: "What we write with and live in",
			kmr: "Ya ku em pê dijîn",
			ar: "ما نكتب به ونحيا فيه"
		}
	},
	{
		answer: "بازاڕ",
		clue: {
			ckb: "شوێنی نرخ و قوماش و دەنگ",
			en: "A place of price, cloth, and noise",
			kmr: "Cihê biha û qumaşê",
			ar: "مكان السعر والقماش"
		}
	}
];
function clueText(lang, clue) {
	return clue[lang] || clue.en || clue.ckb || "";
}
function lettersOf(word) {
	return Array.from(word);
}
function shuffle(word, salt) {
	const arr = [...lettersOf(word)];
	for (let i = arr.length - 1; i > 0; i -= 1) {
		const j = Math.abs((salt * (i + 3) * 17 + i * 13) % (i + 1));
		const a = arr[i];
		const b = arr[j];
		if (a !== void 0 && b !== void 0) {
			arr[i] = b;
			arr[j] = a;
		}
	}
	if (arr.join("") === word && arr.length > 1) {
		const first = arr[0];
		const second = arr[1];
		if (first !== void 0 && second !== void 0) {
			arr[0] = second;
			arr[1] = first;
		}
	}
	return arr;
}
var CITIES = [
	{
		id: "hewler",
		base: 24,
		name: {
			ckb: "هەولێر",
			en: "Hewlêr",
			kmr: "Hewlêr",
			ar: "أربيل"
		}
	},
	{
		id: "slemani",
		base: 22,
		name: {
			ckb: "سلێمانی",
			en: "Silêmanî",
			kmr: "Silêmanî",
			ar: "السليمانية"
		}
	},
	{
		id: "duhok",
		base: 20,
		name: {
			ckb: "دهۆک",
			en: "Dihok",
			kmr: "Dihok",
			ar: "دهوك"
		}
	},
	{
		id: "kerkuk",
		base: 27,
		name: {
			ckb: "کەرکوک",
			en: "Kerkûk",
			kmr: "Kerkûk",
			ar: "كركوك"
		}
	},
	{
		id: "helebce",
		base: 23,
		name: {
			ckb: "هەڵەبجە",
			en: "Helebce",
			kmr: "Helebce",
			ar: "حلبجة"
		}
	},
	{
		id: "amedi",
		base: 18,
		name: {
			ckb: "ئامێدی",
			en: "Amedî",
			kmr: "Amedî",
			ar: "العمادية"
		}
	}
];
function unit(seed) {
	const x = Math.sin(seed) * 1e4;
	return x - Math.floor(x);
}
var ORDER = [
	"sun",
	"cloud",
	"mist",
	"wind",
	"rain",
	"cloud",
	"sun"
];
function cityOf(id) {
	return CITIES.find((city) => city.id === id) ?? CITIES[0];
}
function forecast(cityId, now = /* @__PURE__ */ new Date()) {
	const city = cityOf(cityId);
	const today = Math.floor(now.getTime() / 864e5);
	const days = Array.from({ length: 7 }, (_, offset) => {
		const u = unit(today + offset * 13 + city.base * 3);
		const high = Math.round(city.base + (u - .45) * 10 - offset * .15);
		return {
			offset,
			high,
			low: high - 7 - Math.round(u * 3),
			cond: ORDER[Math.floor(u * ORDER.length) % ORDER.length] ?? "cloud"
		};
	});
	const todayCast = days[0] ?? {
		offset: 0,
		high: city.base,
		low: city.base - 8,
		cond: "sun"
	};
	const hour = now.getHours();
	const hours = Array.from({ length: 12 }, (_, index) => {
		const h = (hour + index) % 24;
		const swing = Math.sin((h - 4) / 24 * Math.PI * 2);
		const temp = Math.round(todayCast.low + (todayCast.high - todayCast.low) * (.5 + swing * .5));
		const u = unit(today * 20 + h + city.base);
		return {
			hour: h,
			temp,
			cond: ORDER[Math.floor(u * ORDER.length) % ORDER.length] ?? todayCast.cond
		};
	});
	return {
		city,
		days,
		hours,
		nowTemp: hours[0]?.temp ?? todayCast.high,
		cond: todayCast.cond
	};
}
function useOn() {
	const [on, setOn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setOn(true), []);
	return on;
}
function PageHead({ kicker, title, lede }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "border-b border-ink pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold text-crimson",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-serif text-4xl leading-tight sm:text-5xl",
				children: title
			}),
			lede ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-3xl text-lg text-muted",
				children: lede
			}) : null
		]
	});
}
function Frame({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children
	});
}
function MarketsView({ id }) {
	const lang = useBoot().lang;
	const navigate = useNavigate();
	const on = useOn();
	const [range, setRange] = (0, import_react.useState)("1m");
	const item = INSTRUMENTS.find((entry) => entry.id === id) ?? INSTRUMENTS[0];
	const points = on ? series(item.id, range).points : [];
	const stats = points.length ? summarize(points) : null;
	const down = (stats?.pct ?? 0) < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "markets"),
			title: label(lang, item.name),
			lede: n(lang, "method")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: INSTRUMENTS.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void navigate({
					to: "/markets",
					search: { id: entry.id }
				}),
				className: entry.id === item.id ? "h-11 bg-ink px-3 text-sm text-paper" : "h-11 border border-rule px-3 text-sm",
				children: label(lang, entry.name)
			}, entry.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2",
			children: RANGES.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setRange(entry.id),
				className: range === entry.id ? "h-11 border border-ink px-3 text-sm font-semibold" : "h-11 border border-rule px-3 text-sm",
				children: entry.id === "1w" ? n(lang, "week") : entry.id === "1m" ? n(lang, "month") : n(lang, "quarter")
			}, entry.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			dir: "ltr",
			className: "mt-6 h-72 border border-rule bg-sheet p-2",
			children: on && points.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
					data: points,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							dataKey: "day",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							interval: range === "3m" ? 14 : range === "1m" ? 5 : 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							domain: ["auto", "auto"],
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							},
							width: 56
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
							type: "monotone",
							dataKey: "value",
							stroke: "var(--color-crimson)",
							fill: "var(--color-soft)",
							strokeWidth: 2
						})
					]
				})
			}) : null
		}),
		stats ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
			className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
			children: [
				[n(lang, "last"), `${formatNum(stats.last, item.digits)} ${item.unit}`],
				[n(lang, "change"), `${stats.pct > 0 ? "+" : ""}${stats.pct.toFixed(2)}%`],
				[n(lang, "high"), formatNum(stats.high, item.digits)],
				[n(lang, "low"), formatNum(stats.low, item.digits)]
			].map(([name, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-rule bg-sheet p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted",
					children: name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: name === n(lang, "change") && down ? "mt-1 font-serif text-2xl text-crimson tabular-nums" : "mt-1 font-serif text-2xl tabular-nums",
					children: value
				})]
			}, name))
		}) : null
	] });
}
var COND_KEY = {
	sun: "sun",
	cloud: "cloud",
	rain: "rain",
	wind: "wind",
	mist: "mist"
};
function WeatherView() {
	const lang = useBoot().lang;
	const on = useOn();
	const [cityId, setCityId] = (0, import_react.useState)("hewler");
	const cast = on ? forecast(cityId) : null;
	const advice = !cast ? "" : cast.cond === "rain" ? n(lang, "adviceWet") : cast.nowTemp >= 30 ? n(lang, "adviceHot") : cast.nowTemp <= 16 ? n(lang, "adviceCool") : n(lang, "adviceMild");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "weather"),
			title: cast ? label(lang, cast.city.name) : n(lang, "weather"),
			lede: n(lang, "weatherHint")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex gap-2 overflow-x-auto",
			children: CITIES.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setCityId(city.id),
				className: city.id === cityId ? "h-11 shrink-0 bg-ink px-3 text-sm text-paper" : "h-11 shrink-0 border border-rule px-3 text-sm",
				children: label(lang, city.name)
			}, city.id))
		}),
		cast ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 font-serif text-7xl tabular-nums",
				children: [cast.nowTemp, "°"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-lg",
				children: n(lang, COND_KEY[cast.cond])
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: advice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 border-t border-ink pt-3 font-serif text-2xl",
				children: n(lang, "hourly")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex gap-3 overflow-x-auto pb-2",
				children: cast.hours.map((hour) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "w-16 shrink-0 border border-rule bg-sheet py-3 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted tabular-nums",
							children: String(hour.hour).padStart(2, "0")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 font-serif text-2xl tabular-nums",
							children: [hour.temp, "°"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs",
							children: n(lang, COND_KEY[hour.cond])
						})
					]
				}, hour.hour))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 border-t border-ink pt-3 font-serif text-2xl",
				children: n(lang, "outlook")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-rule border-y border-rule",
				children: cast.days.map((day) => {
					const date = /* @__PURE__ */ new Date();
					date.setDate(date.getDate() + day.offset);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-36 text-sm",
								children: day.offset === 0 ? n(lang, "now") : formatWhen(lang, date.toISOString())
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 text-sm",
								children: n(lang, COND_KEY[day.cond])
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular-nums",
								children: [day.low, "°"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold tabular-nums",
								children: [day.high, "°"]
							})
						]
					}, day.offset);
				})
			})
		] }) : null
	] });
}
function LiveView({ wires, stories }) {
	const lang = useBoot().lang;
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const timer = window.setInterval(() => {
			if (!document.hidden) router.invalidate();
		}, 3e4);
		return () => window.clearInterval(timer);
	}, [router]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
				kicker: n(lang, "developing"),
				title: n(lang, "live"),
				lede: n(lang, "liveHint")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "h-11 border border-ink px-4 text-sm",
				onClick: () => void router.invalidate(),
				children: n(lang, "refresh")
			})]
		}),
		wires.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-muted",
			children: n(lang, "noWire")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-6 border-s-2 border-crimson ps-4",
			children: wires.map((wire) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-crimson",
						children: wire.urgent ? n(lang, "urgent") : wire.kicker || n(lang, "live")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-serif text-2xl leading-snug",
						children: wire.text
					}),
					wire.href.startsWith("/article/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: wire.href.slice(9) },
						className: "mt-2 inline-block text-sm font-semibold hover:text-crimson",
						children: n(lang, "open")
					}) : null
				]
			}, wire.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-4 border-t border-ink pt-3 font-serif text-2xl",
			children: n(lang, "developing")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-6 md:grid-cols-2",
			children: stories.slice(0, 4).map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
				story,
				lang,
				deck: true
			}, story.id))
		})
	] });
}
function ArchiveView({ stories, month }) {
	const lang = useBoot().lang;
	const navigate = useNavigate();
	const months = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		for (const story of stories) if (story.publishedAt) set.add(story.publishedAt.slice(0, 7));
		return [...set].sort().reverse();
	}, [stories]);
	const active = months.includes(month) ? month : months[0] ?? "";
	const shown = stories.filter((story) => story.publishedAt?.startsWith(active));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "archive"),
			title: active || n(lang, "archive")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex gap-2 overflow-x-auto",
			children: months.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void navigate({
					to: "/archive",
					search: { m: item }
				}),
				className: item === active ? "h-11 shrink-0 bg-ink px-3 text-sm text-paper" : "h-11 shrink-0 border border-rule px-3 text-sm",
				children: item
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3",
			children: shown.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
				story,
				lang,
				image: true,
				deck: true
			}, story.id))
		}),
		shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-muted",
			children: n(lang, "emptyDesk")
		}) : null
	] });
}
function BriefingView({ home }) {
	const lang = useBoot().lang;
	const lead = [
		...home.hero,
		...home.lead,
		...home.latest
	].filter((story, index, list) => list.findIndex((item) => item.groupKey === story.groupKey) === index).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		kicker: n(lang, "editionOf"),
		title: n(lang, "briefing"),
		lede: n(lang, "morningBody")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "mt-8 divide-y divide-rule border-y border-rule",
		children: lead.map((story, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid gap-2 py-5 sm:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-3xl text-crimson tabular-nums sm:col-span-1",
				children: index + 1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-11",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-crimson",
						children: story.categoryName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-serif text-3xl leading-snug",
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
					})
				]
			})]
		}, story.groupKey))
	})] });
}
function LettersView({ stories }) {
	const lang = useBoot().lang;
	const packs = [
		{
			slug: "morning",
			title: n(lang, "morning"),
			body: n(lang, "morningBody"),
			items: stories.slice(0, 5)
		},
		{
			slug: "culture",
			title: n(lang, "cultureNote"),
			body: n(lang, "cultureBody"),
			items: stories.filter((story) => story.category === "culture").slice(0, 4)
		},
		{
			slug: "weekend",
			title: n(lang, "weekend"),
			body: n(lang, "weekendBody"),
			items: stories.filter((story) => story.category === "opinion").slice(0, 4)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		kicker: n(lang, "letters"),
		title: n(lang, "letters")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-8 grid gap-8 lg:grid-cols-3",
		children: packs.map((pack) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "border border-rule bg-sheet p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: pack.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: pack.body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LetterButton, { slug: pack.slug })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3 border-t border-rule pt-3",
					children: pack.items.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: story.groupKey },
						className: "font-serif text-lg leading-snug hover:text-crimson",
						children: story.title
					}) }, story.groupKey))
				})
			]
		}, pack.slug))
	})] });
}
function PuzzleView() {
	const lang = useBoot().lang;
	const on = useOn();
	const [index, setIndex] = (0, import_react.useState)(0);
	const [pool, setPool] = (0, import_react.useState)([]);
	const [built, setBuilt] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const [score, setScore] = (0, import_react.useState)(0);
	const [best, setBest] = (0, import_react.useState)(0);
	const clue = CLUES[index % CLUES.length];
	(0, import_react.useEffect)(() => {
		const item = CLUES[0];
		if (!item) return;
		setPool(shuffle(item.answer, 3));
		setBest(readBest());
	}, []);
	function load(next, salt) {
		const item = CLUES[next % CLUES.length];
		if (!item) return;
		setIndex(next % CLUES.length);
		setPool(shuffle(item.answer, salt));
		setBuilt([]);
		setNote("");
	}
	function take(letter, from) {
		setPool((cur) => cur.filter((_, i) => i !== from));
		setBuilt((cur) => [...cur, letter]);
		setNote("");
	}
	function back(letter, from) {
		setBuilt((cur) => cur.filter((_, i) => i !== from));
		setPool((cur) => [...cur, letter]);
	}
	function check() {
		if (!clue) return;
		if (built.join("") === clue.answer) {
			const next = score + 1;
			setScore(next);
			writeBest(next);
			setBest(readBest());
			setNote(n(lang, "right"));
		} else setNote(n(lang, "wrong"));
	}
	if (!on || !clue) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		kicker: n(lang, "puzzle"),
		title: n(lang, "puzzle")
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "puzzle"),
			title: clueText(lang, clue.clue),
			lede: n(lang, "puzzleHint")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-sm text-muted",
			children: [
				n(lang, "score"),
				": ",
				score,
				" · ",
				n(lang, "best"),
				": ",
				best
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex min-h-14 flex-wrap gap-2 border border-ink bg-sheet p-3",
			children: built.map((letter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => back(letter, i),
				className: "grid h-12 w-12 place-items-center border border-ink font-serif text-2xl",
				children: letter
			}, `${letter}-${i}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: pool.map((letter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => take(letter, i),
				className: "grid h-12 w-12 place-items-center border border-rule bg-paper font-serif text-2xl",
				children: letter
			}, `${letter}-${i}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm",
			children: note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 bg-crimson px-4 text-sm font-semibold text-on-mast",
					onClick: check,
					disabled: built.length !== lettersOf(clue.answer).length,
					children: n(lang, "check")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 border border-rule px-4 text-sm",
					onClick: () => load(index, Date.now() % 97),
					children: n(lang, "again")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 border border-ink px-4 text-sm",
					onClick: () => load(index + 1, index + 5),
					children: n(lang, "nextWord")
				})
			]
		})
	] });
}
function SavedView({ stories }) {
	const boot = useBoot();
	const lang = boot.lang;
	const { user, isPending } = useCurrentUserState();
	const on = useOn();
	const [saves, setSaves] = (0, import_react.useState)([]);
	const [follows, setFollows] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		if (!on || isPending) return;
		setHistory(readHistory());
		if (!user) {
			setSaves(readSaves());
			setFollows(readFollows());
			return;
		}
		myShelf().then((shelf) => {
			setSaves(shelf.saves);
			setFollows(shelf.follows);
		}).catch(() => {
			setSaves(readSaves());
			setFollows(readFollows());
		});
	}, [
		on,
		user,
		isPending
	]);
	const savedStories = saves.map((key) => stories.find((story) => story.groupKey === key)).filter((story) => Boolean(story));
	const recent = history.map((key) => stories.find((story) => story.groupKey === key)).filter((story) => Boolean(story)).slice(0, 6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: user ? n(lang, "account") : n(lang, "device"),
			title: n(lang, "saved")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-serif text-2xl",
			children: n(lang, "saved")
		}),
		savedStories.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: n(lang, "nothingSaved")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-6 md:grid-cols-2",
			children: savedStories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoryTease, {
				story,
				lang,
				deck: true
			}, story.groupKey))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-serif text-2xl",
			children: n(lang, "followed")
		}),
		follows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: n(lang, "emptyDesk")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 flex flex-wrap gap-2",
			children: follows.map((item) => item.kind === "section" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/section/$slug",
				params: { slug: item.target },
				className: "inline-block border border-rule px-3 py-2 text-sm hover:border-ink",
				children: boot.categories.find((category) => category.slug === item.target)?.name ?? item.target
			}) }, `${item.kind}-${item.target}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/author/$slug",
				params: { slug: item.target },
				className: "inline-block border border-rule px-3 py-2 text-sm hover:border-ink",
				children: item.target
			}) }, `${item.kind}-${item.target}`))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-serif text-2xl",
			children: n(lang, "recent")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-rule",
			children: recent.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/article/$slug",
					params: { slug: story.groupKey },
					className: "font-serif text-xl hover:text-crimson",
					children: story.title
				})
			}, story.groupKey))
		})
	] });
}
function NumbersView({ pulse }) {
	const lang = useBoot().lang;
	const on = useOn();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "numbers"),
			title: n(lang, "bySection")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-rule bg-sheet p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted",
					children: n(lang, "stories")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 font-serif text-4xl tabular-nums",
					children: pulse.totalStories
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-rule bg-sheet p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "text-xs text-muted",
					children: n(lang, "reads")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "mt-1 font-serif text-4xl tabular-nums",
					children: pulse.totalViews
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			dir: "ltr",
			className: "mt-6 h-72 border border-rule bg-sheet p-2",
			children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
				width: "100%",
				height: "100%",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
					data: pulse.sections,
					layout: "vertical",
					margin: {
						left: 16,
						right: 12
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
							type: "number",
							tick: {
								fill: "var(--color-muted)",
								fontSize: 11
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
							type: "category",
							dataKey: "name",
							width: 110,
							tick: {
								fill: "var(--color-ink)",
								fontSize: 12
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
							dataKey: "views",
							fill: "var(--color-crimson)"
						})
					]
				})
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "mt-6 w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-ink text-start",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-semibold",
						children: n(lang, "bySection")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-semibold",
						children: n(lang, "stories")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2 font-semibold",
						children: n(lang, "reads")
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pulse.sections.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-rule",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/section/$slug",
							params: { slug: row.slug },
							className: "hover:text-crimson",
							children: row.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 tabular-nums",
						children: row.stories
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-2 tabular-nums",
						children: row.views
					})
				]
			}, row.slug)) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-serif text-2xl",
			children: n(lang, "reads")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-3",
			children: pulse.top.map((story, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-3 border-b border-rule py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-2xl text-crimson tabular-nums",
						children: index + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: story.groupKey },
						className: "font-serif text-xl hover:text-crimson",
						children: story.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ms-auto tabular-nums text-muted",
						children: story.views
					})
				]
			}, story.groupKey))
		})
	] });
}
function CalendarView({ events }) {
	const lang = useBoot().lang;
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const upcoming = events.filter((event) => event.startsOn >= today);
	const earlier = events.filter((event) => event.startsOn < today).reverse();
	function List({ rows }) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 divide-y divide-rule border-y border-rule",
			children: rows.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "grid gap-1 py-4 sm:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
					className: "text-sm font-semibold sm:col-span-3",
					dateTime: event.startsOn,
					children: formatWhen(lang, `${event.startsOn}T12:00:00Z`)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sm:col-span-9",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif text-2xl",
							children: event.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: event.place
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: event.detail
						})
					]
				})]
			}, `${event.id}-${event.startsOn}-${event.title}`))
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "calendar"),
			title: n(lang, "upcoming")
		}),
		upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: n(lang, "emptyDesk")
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { rows: upcoming }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 font-serif text-2xl",
			children: n(lang, "earlier")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { rows: earlier })
	] });
}
function CorrectionsView({ rows }) {
	const lang = useBoot().lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
			kicker: n(lang, "fixes"),
			title: n(lang, "fixes")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-6 divide-y divide-rule border-y border-rule",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: formatWhen(lang, row.createdAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-relaxed",
						children: row.note
					}),
					row.groupKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/article/$slug",
						params: { slug: row.groupKey },
						className: "mt-2 inline-block text-sm font-semibold hover:text-crimson",
						children: n(lang, "open")
					}) : null
				]
			}, row.id))
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-muted",
			children: n(lang, "emptyDesk")
		}) : null
	] });
}
function MastheadView({ people }) {
	const lang = useBoot().lang;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Frame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHead, {
		kicker: "KNC",
		title: n(lang, "people")
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "mt-8 divide-y divide-rule border-y border-rule",
		children: people.map((person) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "grid gap-2 py-5 sm:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/author/$slug",
					params: { slug: person.slug },
					className: "font-serif text-2xl hover:text-crimson",
					children: person.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-crimson",
					children: person.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed sm:col-span-8",
				children: person.bio
			})]
		}, person.slug))
	})] });
}
//#endregion
export { LettersView as a, MastheadView as c, SavedView as d, WeatherView as f, CorrectionsView as i, NumbersView as l, BriefingView as n, LiveView as o, CalendarView as r, MarketsView as s, ArchiveView as t, PuzzleView as u };
