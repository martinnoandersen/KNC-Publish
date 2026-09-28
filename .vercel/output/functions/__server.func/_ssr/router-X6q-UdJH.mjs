import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { L as string, N as number, P as object, R as union, j as literal } from "../_libs/@better-auth/core+[...].mjs";
import { n as auth } from "./server-BH1E4pS1.mjs";
import { C as useRouter, Q as require_react, Z as notFound, _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { n as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/public-api-D215BvzQ.js
var getBoot = createServerFn({ method: "GET" }).handler(createSsrRpc("d8d35fba1bf24f90503e1494014c3c285f132581464604d322beb806e7ed4231"));
var getHome = createServerFn({ method: "GET" }).handler(createSsrRpc("19388c1f50b59799014f29caba7c14661565785d134a8f168654fb3790d1cfe6"));
var getStory = createServerFn({ method: "GET" }).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(createSsrRpc("2750581e6315217a02c2be9a4222bd33d4ff0c2fbbd82e0a4427c81327837e5b"));
var getListing = createServerFn({ method: "GET" }).validator((input) => ({
	category: String(input?.category ?? "").slice(0, 48),
	tag: String(input?.tag ?? "").slice(0, 48),
	kind: String(input?.kind ?? "").slice(0, 16)
})).handler(createSsrRpc("337c3b0a8fc39116eb7d3605357e3fbde5d5cc03d7ec2ae549fc754b2845a39b"));
var searchStories = createServerFn({ method: "GET" }).validator((query) => String(query ?? "").slice(0, 120)).handler(createSsrRpc("f8d1137aaacd9ff37bb10a85eac1895f60372d817657118570081193db6dcdff"));
var getAuthor = createServerFn({ method: "GET" }).validator((slug) => String(slug ?? "").slice(0, 80)).handler(createSsrRpc("7389bc154db30f0acbc72517193ad6d824d36a480e649061be5103af56eb936f"));
var getPage = createServerFn({ method: "GET" }).validator((slug) => String(slug ?? "").slice(0, 80)).handler(createSsrRpc("adf81f8aef73bce12385d2dfe8717734f61a7dcaba17d6e10558d9b3e3f84155"));
var bumpView = createServerFn({ method: "POST" }).validator((id) => Number(id) || 0).handler(createSsrRpc("74bf340964b6e0697699106732b93df46c5476c423217636778717626e466991"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/public-api-DewzP6Qn.js
var getWires = createServerFn({ method: "GET" }).handler(createSsrRpc("1956acf9c234a218ed291748011d2f7ff11b5f590781e425131b1b78b7f7ceef"));
var getAgenda = createServerFn({ method: "GET" }).handler(createSsrRpc("d37930d29bd3113e36baafdccf150b0b92fe5d7e4834cb305d383d3a80c93a9c"));
var getCorrections = createServerFn({ method: "GET" }).handler(createSsrRpc("8d9acbcd57f3c67cbfae4ea7fbb964239dc8a626b04d54b0807dffbe4c1b9422"));
var getMasthead = createServerFn({ method: "GET" }).handler(createSsrRpc("464b9ad4dd72d014b1c55aea6d18daf6ed834f5b4cbc4a1ab6eea43b2b8dfaeb"));
var getPulse = createServerFn({ method: "GET" }).handler(createSsrRpc("5fe52a6aa1fa027ad02e8f696e8c5dd179c7909b88d95e7e43288ff633c6f637"));
var listComments = createServerFn({ method: "GET" }).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(createSsrRpc("63c9f37385c66f4a8f333b5b9d1d70c663fb02be0915723cc2eecff54b41c707"));
var postComment = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	groupKey: String(input?.groupKey ?? "").slice(0, 80),
	body: String(input?.body ?? "").slice(0, 1200)
})).handler(createSsrRpc("3fd1bf9051c66b2e4bf9a9e53b9aa10fc22922515076f2d0e6e2db9fe9630eae"));
var toggleSave = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((groupKey) => String(groupKey ?? "").slice(0, 80)).handler(createSsrRpc("b2f73f33da8de36a1e25a6baa9e69417ac4c5024f1c87a919c310834f09ac824"));
var toggleFollow = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	kind: String(input?.kind ?? ""),
	target: String(input?.target ?? "").slice(0, 80)
})).handler(createSsrRpc("390d17c9c9c740cf9ecd82296f4b9c625d90d9a5c97005b800bee40054b18c52"));
var toggleLetter = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((slug) => String(slug ?? "").slice(0, 24)).handler(createSsrRpc("48db9fcbf82c3e18fe98ee71e4d3248e542f6f132b6467daa93e905efe9ee63b"));
var myShelf = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("14f79826ac2c1e9fe66859a87a802cba9afd589b92904d56e3674c4084aeedb3"));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-X6q-UdJH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var styles_default = "/assets/styles-qkEFQEVx.css";
var Route$36 = createRootRoute({
	beforeLoad: async () => ({ boot: await getBoot() }),
	head: ({ match }) => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "KNC Publish" },
			{
				name: "description",
				content: match.context.boot.tagline
			},
			{
				name: "theme-color",
				content: "#12110f"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,650;0,6..72,700;1,6..72,500&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootComponent,
	notFoundComponent: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl px-6 py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-serif text-5xl",
			children: "404"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "/",
			className: "mt-6 inline-block text-sm underline",
			children: "KNC Publish"
		})]
	})
});
function RootComponent() {
	const { boot } = Route$36.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: boot.lang,
		dir: boot.dir,
		"data-theme": boot.theme,
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$34 = () => import("./routes-DHjApsiF.mjs");
var Route$35 = createFileRoute("/")({
	loader: async () => {
		const [home, wires] = await Promise.all([getHome(), getWires()]);
		return {
			home,
			wires
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./archive-ePMIiDsW.mjs");
var Route$34 = createFileRoute("/archive")({
	validateSearch: (search) => ({ m: typeof search.m === "string" && /^\d{4}-\d{2}$/.test(search.m) ? search.m : "" }),
	loader: () => getListing({ data: {} }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./briefing-B_ZrSrd8.mjs");
var Route$33 = createFileRoute("/briefing")({
	loader: () => getHome(),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./corrections-BGxmotr3.mjs");
var Route$32 = createFileRoute("/corrections")({
	loader: () => getCorrections(),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./data-B6HXM8Ak.mjs");
var Route$31 = createFileRoute("/data")({
	loader: () => getPulse(),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./desk-DRRZ1SfI.mjs");
var Route$30 = createFileRoute("/desk")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./events-BogFmaWO.mjs");
var Route$29 = createFileRoute("/events")({
	loader: () => getAgenda(),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./live-CWJ99uy9.mjs");
var Route$28 = createFileRoute("/live")({
	loader: async () => {
		const [wires, stories] = await Promise.all([getWires(), getListing({ data: {} })]);
		return {
			wires,
			stories
		};
	},
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./login-Cj9JokAI.mjs");
var Route$27 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./markets-BQG14NGl.mjs");
var Route$26 = createFileRoute("/markets")({
	validateSearch: (search) => ({ id: typeof search.id === "string" ? search.id.slice(0, 24) : "brent" }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./masthead-DHYS6Zk0.mjs");
var Route$25 = createFileRoute("/masthead")({
	loader: () => getMasthead(),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./newsletters-WIpwH7XG.mjs");
var Route$24 = createFileRoute("/newsletters")({
	loader: () => getListing({ data: {} }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./posts-Cb3QD0tL.mjs");
var Route$23 = createFileRoute("/posts")({
	loader: () => getListing({ data: { kind: "post" } }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./puzzle-BFQuebFh.mjs");
var Route$22 = createFileRoute("/puzzle")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./saved-KPeutbic.mjs");
var Route$21 = createFileRoute("/saved")({
	loader: () => getListing({ data: {} }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./search-CGprKNAR.mjs");
var Route$20 = createFileRoute("/search")({
	validateSearch: (search) => ({ q: typeof search.q === "string" ? search.q : "" }),
	loaderDeps: ({ search }) => ({ q: search.q }),
	loader: ({ deps }) => searchStories({ data: deps.q }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./weather-BHWZAuja.mjs");
var Route$19 = createFileRoute("/weather")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("../_slug-CxfR_JA1.mjs");
var Route$18 = createFileRoute("/article/$slug")({
	loader: async ({ params }) => {
		const data = await getStory({ data: params.slug });
		if (!data) throw notFound();
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_slug-CGOGSxbQ.mjs");
var Route$17 = createFileRoute("/author/$slug")({
	loader: async ({ params }) => {
		const profile = await getAuthor({ data: params.slug });
		if (!profile) throw notFound();
		return profile;
	},
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./desk-CiC3X_gA.mjs");
var Route$16 = createFileRoute("/desk/")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./appearance-Dp3-fp-Z.mjs");
var Route$15 = createFileRoute("/desk/appearance")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./comments-DK7eHbOe.mjs");
var Route$14 = createFileRoute("/desk/comments")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./new-Dk5pRiKj.mjs");
var Route$13 = createFileRoute("/desk/new")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./pages-Bez0Af8o.mjs");
var Route$12 = createFileRoute("/desk/pages")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./people-eauipdtM.mjs");
var Route$11 = createFileRoute("/desk/people")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./plugins-338aMbLH.mjs");
var Route$10 = createFileRoute("/desk/plugins")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./profile-BbNV3wYr.mjs");
var Route$9 = createFileRoute("/desk/profile")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./review-BIV257Gh.mjs");
var Route$8 = createFileRoute("/desk/review")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./stats-BCrQoJHM.mjs");
var Route$7 = createFileRoute("/desk/stats")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./taxonomy-DA_qiRK6.mjs");
var Route$6 = createFileRoute("/desk/taxonomy")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./wire-Brgn_yaJ.mjs");
var Route$5 = createFileRoute("/desk/wire")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("../_slug-QK5VyYpR.mjs");
var Route$4 = createFileRoute("/page/$slug")({
	loader: async ({ params }) => {
		const page = await getPage({ data: params.slug });
		if (!page) throw notFound();
		return page;
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_slug-R58TPKww.mjs");
var Route$3 = createFileRoute("/section/$slug")({
	loader: ({ params }) => getListing({ data: { category: params.slug } }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_slug-dCn_zg1g.mjs");
var Route$2 = createFileRoute("/tag/$slug")({
	loader: ({ params }) => getListing({ data: { tag: params.slug } }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$1 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter = () => import("./edit._id-CzGZBNql.mjs");
var Route = createFileRoute("/desk/edit/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$35.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$36
});
var ArchiveRoute = Route$34.update({
	id: "/archive",
	path: "/archive",
	getParentRoute: () => Route$36
});
var BriefingRoute = Route$33.update({
	id: "/briefing",
	path: "/briefing",
	getParentRoute: () => Route$36
});
var CorrectionsRoute = Route$32.update({
	id: "/corrections",
	path: "/corrections",
	getParentRoute: () => Route$36
});
var DataRoute = Route$31.update({
	id: "/data",
	path: "/data",
	getParentRoute: () => Route$36
});
var DeskRoute = Route$30.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => Route$36
});
var EventsRoute = Route$29.update({
	id: "/events",
	path: "/events",
	getParentRoute: () => Route$36
});
var LiveRoute = Route$28.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$36
});
var LoginRoute = Route$27.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$36
});
var MarketsRoute = Route$26.update({
	id: "/markets",
	path: "/markets",
	getParentRoute: () => Route$36
});
var MastheadRoute = Route$25.update({
	id: "/masthead",
	path: "/masthead",
	getParentRoute: () => Route$36
});
var NewslettersRoute = Route$24.update({
	id: "/newsletters",
	path: "/newsletters",
	getParentRoute: () => Route$36
});
var PostsRoute = Route$23.update({
	id: "/posts",
	path: "/posts",
	getParentRoute: () => Route$36
});
var PuzzleRoute = Route$22.update({
	id: "/puzzle",
	path: "/puzzle",
	getParentRoute: () => Route$36
});
var SavedRoute = Route$21.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => Route$36
});
var SearchRoute = Route$20.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$36
});
var WeatherRoute = Route$19.update({
	id: "/weather",
	path: "/weather",
	getParentRoute: () => Route$36
});
var ArticleSlugRoute = Route$18.update({
	id: "/article/$slug",
	path: "/article/$slug",
	getParentRoute: () => Route$36
});
var AuthorSlugRoute = Route$17.update({
	id: "/author/$slug",
	path: "/author/$slug",
	getParentRoute: () => Route$36
});
var DeskIndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => DeskRoute
});
var DeskAppearanceRoute = Route$15.update({
	id: "/appearance",
	path: "/appearance",
	getParentRoute: () => DeskRoute
});
var DeskCommentsRoute = Route$14.update({
	id: "/comments",
	path: "/comments",
	getParentRoute: () => DeskRoute
});
var DeskNewRoute = Route$13.update({
	id: "/new",
	path: "/new",
	getParentRoute: () => DeskRoute
});
var DeskPagesRoute = Route$12.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => DeskRoute
});
var DeskPeopleRoute = Route$11.update({
	id: "/people",
	path: "/people",
	getParentRoute: () => DeskRoute
});
var DeskPluginsRoute = Route$10.update({
	id: "/plugins",
	path: "/plugins",
	getParentRoute: () => DeskRoute
});
var DeskProfileRoute = Route$9.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => DeskRoute
});
var DeskReviewRoute = Route$8.update({
	id: "/review",
	path: "/review",
	getParentRoute: () => DeskRoute
});
var DeskStatsRoute = Route$7.update({
	id: "/stats",
	path: "/stats",
	getParentRoute: () => DeskRoute
});
var DeskTaxonomyRoute = Route$6.update({
	id: "/taxonomy",
	path: "/taxonomy",
	getParentRoute: () => DeskRoute
});
var DeskWireRoute = Route$5.update({
	id: "/wire",
	path: "/wire",
	getParentRoute: () => DeskRoute
});
var PageSlugRoute = Route$4.update({
	id: "/page/$slug",
	path: "/page/$slug",
	getParentRoute: () => Route$36
});
var SectionSlugRoute = Route$3.update({
	id: "/section/$slug",
	path: "/section/$slug",
	getParentRoute: () => Route$36
});
var TagSlugRoute = Route$2.update({
	id: "/tag/$slug",
	path: "/tag/$slug",
	getParentRoute: () => Route$36
});
var ApiAuthSplatRoute = Route$1.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$36
});
var DeskRouteChildren = {
	DeskAppearanceRoute,
	DeskCommentsRoute,
	DeskNewRoute,
	DeskPagesRoute,
	DeskPeopleRoute,
	DeskPluginsRoute,
	DeskProfileRoute,
	DeskReviewRoute,
	DeskStatsRoute,
	DeskTaxonomyRoute,
	DeskWireRoute,
	DeskIndexRoute,
	DeskEditIdRoute: Route.update({
		id: "/edit/$id",
		path: "/edit/$id",
		getParentRoute: () => DeskRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	ArchiveRoute,
	BriefingRoute,
	CorrectionsRoute,
	DataRoute,
	DeskRoute: DeskRoute._addFileChildren(DeskRouteChildren),
	EventsRoute,
	LiveRoute,
	LoginRoute,
	MarketsRoute,
	MastheadRoute,
	NewslettersRoute,
	PostsRoute,
	PuzzleRoute,
	SavedRoute,
	SearchRoute,
	WeatherRoute,
	ArticleSlugRoute,
	AuthorSlugRoute,
	PageSlugRoute,
	SectionSlugRoute,
	TagSlugRoute,
	ApiAuthSplatRoute
};
var routeTree = Route$36._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { postComment as C, bumpView as D, toggleSave as E, myShelf as S, toggleLetter as T, Route$32 as _, Route$4 as a, Route$35 as b, Route$20 as c, Route$24 as d, Route$25 as f, Route$31 as g, Route$29 as h, Route$3 as i, Route$21 as l, Route$28 as m, Route as n, Route$17 as o, Route$26 as p, Route$2 as r, Route$18 as s, router_exports as t, Route$23 as u, Route$33 as v, toggleFollow as w, listComments as x, Route$34 as y };
