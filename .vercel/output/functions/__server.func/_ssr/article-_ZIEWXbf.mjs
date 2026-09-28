import { o as __toESM } from "../_runtime.mjs";
import { C as useRouter, Q as require_react, w as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as bumpView } from "./router-X6q-UdJH.mjs";
import { l as t, n as LANGS, r as formatWhen, u as typeLabel } from "./i18n-J2xLYLI0.mjs";
import { C as setSiteLang, D as useBoot, l as n } from "./shell-C2oUoShk.mjs";
import { n as RichText, t as Kicker } from "./render-DO-dxZqt.mjs";
import { a as trackRead, i as SaveButton, n as FollowButton, t as Comments } from "./reader-BkxSsvEn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/article-_ZIEWXbf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArticleView({ story, related }) {
	const boot = useBoot();
	const router = useRouter();
	const lang = boot.lang;
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		bumpView({ data: story.id }).catch(() => void 0);
		trackRead(story.groupKey);
	}, [story.id, story.groupKey]);
	(0, import_react.useEffect)(() => {
		if (!boot.plugins.includes("reading-progress")) return;
		const onScroll = () => {
			const height = document.documentElement.scrollHeight - window.innerHeight;
			setProgress(height > 0 ? Math.min(100, window.scrollY / height * 100) : 0);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, [boot.plugins, story.id]);
	function choose(next) {
		setSiteLang(next);
		router.invalidate();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			boot.plugins.includes("reading-progress") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 top-0 z-40 h-1 bg-rule",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full bg-crimson",
					style: { width: `${progress}%` }
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Kicker, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/section/$slug",
							params: { slug: story.category },
							className: "hover:underline",
							children: story.categoryName
						}),
						" · ",
						typeLabel(lang, story.type),
						story.kind === "post" ? ` · ${t(lang, "post")}` : ""
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-serif text-4xl leading-tight sm:text-5xl",
						children: story.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xl text-muted",
						children: story.dek
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [
							t(lang, "by"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/author/$slug",
								params: { slug: story.authorSlug },
								className: "font-semibold hover:text-crimson",
								children: story.authorName
							}),
							story.authorTitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [", ", story.authorTitle]
							}) : null,
							story.publishedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", formatWhen(lang, story.publishedAt)]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									" · ",
									story.minutes,
									" ",
									t(lang, "minRead")
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold tracking-widest text-muted uppercase",
							children: t(lang, "alsoIn")
						}), story.availableLangs.map((id) => {
							const meta = LANGS.find((item) => item.id === id);
							const active = story.lang === id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => choose(id),
								className: active ? "h-9 border border-ink bg-ink px-3 text-sm text-paper" : "h-9 border border-rule px-3 text-sm hover:border-ink",
								children: meta?.short ?? id
							}, id);
						})]
					}),
					story.lang !== lang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 border border-rule bg-soft px-4 py-3 text-sm",
						children: t(lang, "notTranslated")
					}) : null
				]
			}),
			story.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mx-auto mt-8 max-w-4xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: story.image,
					alt: "",
					className: "aspect-news w-full object-cover"
				}), story.imageCaption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 text-sm text-muted",
					children: story.imageCaption
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-3xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RichText, {
								text: story.body,
								drop: story.type === "premium" || story.type === "scientific"
							}),
							story.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-8 flex flex-wrap gap-2",
								children: story.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/tag/$slug",
									params: { slug: tag.slug },
									className: "inline-block border border-rule px-2 py-1 text-sm hover:border-ink",
									children: ["#", tag.name]
								}) }, tag.slug))
							}) : null,
							boot.plugins.includes("share") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold tracking-widest uppercase",
										children: t(lang, "share")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 border border-rule px-4 text-sm",
										onClick: () => {
											const url = window.location.href;
											if (navigator.share) {
												navigator.share({
													title: story.title,
													url
												}).catch(() => void 0);
												return;
											}
											navigator.clipboard.writeText(url).then(() => {
												setCopied(true);
												window.setTimeout(() => setCopied(false), 1600);
											});
										},
										children: copied ? t(lang, "copied") : t(lang, "copyLink")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { groupKey: story.groupKey }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "h-11 border border-rule px-4 text-sm",
										onClick: () => window.print(),
										children: n(lang, "print")
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveButton, { groupKey: story.groupKey }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "h-11 border border-rule px-4 text-sm",
									onClick: () => window.print(),
									children: n(lang, "print")
								})]
							}),
							boot.plugins.includes("citations") && story.type === "scientific" && story.refs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "mt-10 border-t border-ink pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif text-2xl",
									children: t(lang, "references")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
									className: "mt-4 list-decimal space-y-3 ps-5 text-sm",
									children: story.refs.map((ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
										ref.authors,
										" (",
										ref.year,
										"). ",
										ref.title,
										". ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted",
											children: ref.source
										})
									] }, `${ref.year}-${ref.title}`))
								})]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comments, { groupKey: story.groupKey })
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:col-span-4",
					children: boot.plugins.includes("related") && related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "border-t-2 border-ink pt-2 font-serif text-xl",
						children: t(lang, "related")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-4",
						children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest text-crimson uppercase",
							children: item.categoryName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/article/$slug",
							params: { slug: item.groupKey },
							className: "font-serif text-xl leading-snug hover:text-crimson",
							children: item.title
						})] }, item.id))
					})] }) : null
				})]
			})
		]
	});
}
function AuthorView({ profile }) {
	const lang = useBoot().lang;
	const initial = profile.name.trim().charAt(0) || "K";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "lg:col-span-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border border-ink bg-sheet p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-24 w-24 place-items-center bg-mast font-serif text-4xl text-on-mast",
						children: initial
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-serif text-4xl",
						children: profile.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FollowButton, {
							kind: "author",
							target: profile.slug
						})
					}),
					profile.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-semibold tracking-wide text-crimson uppercase",
						children: profile.title
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 space-y-3 text-sm",
						children: [
							profile.location ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t(lang, "location")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.location })] }) : null,
							profile.languages ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t(lang, "spoken")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.languages })] }) : null,
							profile.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t(lang, "email")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: profile.email })] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted",
								children: t(lang, "articles")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "font-serif text-3xl tabular-nums",
								children: profile.count
							})] })
						]
					})
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-8",
			children: [
				profile.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-serif text-2xl",
					children: t(lang, "bio")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-lg leading-relaxed",
					children: profile.bio
				})] }) : null,
				profile.education.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: t(lang, "education")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 border-s border-rule ps-4",
						children: profile.education.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-muted uppercase",
									children: item.years
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: item.place
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.detail
								})
							]
						}, `${item.years}-${item.place}`))
					})]
				}) : null,
				profile.experience.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: t(lang, "experience")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 border-s border-rule ps-4",
						children: profile.experience.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold tracking-widest text-muted uppercase",
									children: item.years
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: item.place
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: item.detail
								})
							]
						}, `${item.years}-${item.place}`))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "border-t-2 border-ink pt-2 font-serif text-2xl",
						children: t(lang, "authorArticles")
					}), profile.groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-semibold tracking-widest text-crimson uppercase",
							children: group.categoryName
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 divide-y divide-rule",
							children: group.stories.map((story) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/article/$slug",
									params: { slug: story.groupKey },
									className: "font-serif text-xl hover:text-crimson",
									children: story.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: typeLabel(lang, story.type)
								})]
							}, story.id))
						})]
					}, group.category))]
				}),
				profile.tags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif text-2xl",
						children: t(lang, "hashtags")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: profile.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/tag/$slug",
							params: { slug: tag.slug },
							className: "inline-block border border-rule px-2 py-1 text-sm",
							children: ["#", tag.name]
						}) }, tag.slug))
					})]
				}) : null
			]
		})]
	});
}
//#endregion
export { AuthorView as n, ArticleView as t };
