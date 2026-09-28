import { o as __toESM } from "../_runtime.mjs";
import { a as hasGateSessionMarker } from "./server-BH1E4pS1.mjs";
import { C as useRouter, Q as require_react, b as useRouteContext, w as require_jsx_runtime, x as Navigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as authMiddleware } from "./middleware-Dxfwu2IB.mjs";
import { i as Menu, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { i as signOut, t as authClient } from "./client-IWHfIGH2.mjs";
import { i as isLang, l as t, n as LANGS$1 } from "./i18n-J2xLYLI0.mjs";
import { r as cleanKey } from "./text-CidIKiEz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-C2oUoShk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Auth state components — plain wrappers around `useCurrentUserState()`.
*
* With auth on, visitors are signed out until they authenticate — in the sandbox
* live preview too, which does real sign-in. The shared dev user appears only
* when auth is disabled (`VITE_AUTH_ENABLED=false`, the shipped default).
* While the session is still resolving, gates that care about signed-out state
* render nothing so there's no signed-out flash on hard reload.
*/
/** Where `RedirectToSignIn` sends signed-out visitors. Create this route. */
var SIGN_IN_PATH = "/login";
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Client-side redirect to the sign-in route (TanStack `<Navigate>` — NOT a full
* `window.location` reload). A hard navigation re-bootstraps the SPA and re-runs
* session loading, which feels like a second "Loading…" on /login.
*
* Guard routes by waiting out `isPending` first (see `use-current-user`), then
* render this.
*/
function RedirectToSignIn({ to = SIGN_IN_PATH }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var LANGS = [
	"ckb",
	"kmr",
	"en",
	"ar",
	"fa",
	"tr",
	"de",
	"fr",
	"es"
];
function safeImage(url) {
	const value = url.trim().slice(0, 400);
	if (!value) return "";
	if (value.startsWith("/media/")) return value;
	if (/^https:\/\/[^\s]+$/.test(value)) return value;
	return "";
}
var syncProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({ name: String(input?.name ?? "").trim().slice(0, 80) })).handler(createSsrRpc("7181df4825593b158894f0898f7081cf8139a9b4db11c180323f4e8dd04df704"));
var deskBoot = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4dd6676db5a92d3ff531f11538c70b1b16a93e97ffb10ca3d594aa7758f557a8"));
var listDeskStories = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("4dcaf2ead8261a18d41e8c12cc3b772fe9c904a9c88a6eb817af26e0510771ec"));
var getEditable = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((id) => Number(id) || 0).handler(createSsrRpc("c8d75e7b19e0821154de7e8b1350563bce296e532458a26952005fb29d0f4563"));
function cleanArticle(input) {
	const raw = input ?? {};
	const title = String(raw.title ?? "").trim().slice(0, 200);
	if (!title) throw new Error("Title is required");
	const lang = LANGS.includes(String(raw.lang)) ? String(raw.lang) : "ckb";
	const kind = raw.kind === "post" ? "post" : "article";
	const type = raw.type === "premium" || raw.type === "scientific" ? raw.type : "standard";
	const action = [
		"draft",
		"review",
		"publish",
		"reject"
	].includes(String(raw.action)) ? String(raw.action) : "draft";
	const zones = Array.isArray(raw.zones) ? raw.zones.map((zone) => String(zone)).slice(0, 24) : [];
	const refs = Array.isArray(raw.refs) ? raw.refs.slice(0, 16).map((item) => {
		const ref = item ?? {};
		return {
			authors: String(ref.authors ?? "").slice(0, 160),
			year: String(ref.year ?? "").slice(0, 12),
			title: String(ref.title ?? "").slice(0, 220),
			source: String(ref.source ?? "").slice(0, 180)
		};
	}).filter((ref) => ref.title || ref.authors) : [];
	return {
		id: Number(raw.id) || 0,
		groupKey: cleanKey(String(raw.groupKey ?? "")),
		lang,
		kind,
		type,
		title,
		dek: String(raw.dek ?? "").trim().slice(0, 400),
		body: String(raw.body ?? "").slice(0, 2e4),
		image: safeImage(String(raw.image ?? "")),
		imageCaption: String(raw.imageCaption ?? "").trim().slice(0, 240),
		category: cleanKey(String(raw.category ?? "")),
		tags: String(raw.tags ?? "").slice(0, 400),
		zones,
		refs,
		action,
		reviewNote: String(raw.reviewNote ?? "").trim().slice(0, 800)
	};
}
var saveArticle = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator(cleanArticle).handler(createSsrRpc("95f4ac970eeed06b1d95bd74c9900b60bbc1ea295e60586f3759f32e0ff32ce6"));
var saveProfile = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	lang: isLang(input?.lang) ? input.lang : "ckb",
	displayName: String(input?.displayName ?? "").trim().slice(0, 80),
	title: String(input?.title ?? "").trim().slice(0, 120),
	location: String(input?.location ?? "").trim().slice(0, 80),
	languages: String(input?.languages ?? "").trim().slice(0, 120),
	email: String(input?.email ?? "").trim().slice(0, 120),
	bio: String(input?.bio ?? "").trim().slice(0, 2e3),
	education: String(input?.education ?? "").slice(0, 2e3),
	experience: String(input?.experience ?? "").slice(0, 2e3)
})).handler(createSsrRpc("df64f2e343a0b5d8148804f1e199411c47633e327b3f263d8fd9a17b235ece9f"));
var myProfile = createServerFn({ method: "GET" }).middleware([authMiddleware]).validator((lang) => isLang(lang) ? lang : "ckb").handler(createSsrRpc("f72e71168631dfb68c36097f427c67ef105967b5702625717d9fcb8aa7df66b5"));
var listPeople = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("9f63d15048f9dadbc5fd9cd58b4a3bdd39030f8a413dbddcb7317d963225ad97"));
var setRole = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: String(input?.id ?? "").slice(0, 80),
	role: [
		"reader",
		"writer",
		"editor",
		"superadmin"
	].includes(String(input?.role)) ? String(input.role) : "reader"
})).handler(createSsrRpc("f12501bafeb5886aedf02023c529440cddb68939790b2c3dafd1fedad002e2d1"));
var saveTaxon = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	kind: input?.kind === "tag" ? "tag" : "category",
	slug: cleanKey(String(input?.slug ?? "")),
	name: String(input?.name ?? "").trim().slice(0, 80),
	lang: isLang(input?.lang) ? input.lang : "ckb"
})).handler(createSsrRpc("cb57189453d60ce1686ab237c0ce17f5460d6414027163f93e2d93a9511e531c"));
var saveAppearance = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	theme: [
		"classic",
		"night",
		"warm"
	].includes(String(input?.theme)) ? String(input.theme) : "classic",
	logo: safeImage(String(input?.logo ?? ""))
})).handler(createSsrRpc("ae56abab7fad1d2e1ce0497f90184beb94d29c6ad2a636541457fb75e5b1568a"));
var setPlugin = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	slug: cleanKey(String(input?.slug ?? "")),
	enabled: Boolean(input?.enabled)
})).handler(createSsrRpc("12a1407eb2fa28283b9adfc3557d03f1badefb41629217b63272a3d20eebbbb5"));
var listPages = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("92021bf7adc3d84168bd94d705b9c2220a5b493a913ae33f8eaed8cc8d7ea9de"));
var savePage = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((input) => ({
	id: Number(input?.id) || 0,
	slug: cleanKey(String(input?.slug ?? "")),
	lang: LANGS.includes(String(input?.lang)) ? String(input?.lang) : "ckb",
	title: String(input?.title ?? "").trim().slice(0, 160),
	body: String(input?.body ?? "").slice(0, 2e4),
	status: input?.status === "draft" ? "draft" : "published"
})).handler(createSsrRpc("b3fac2c0b3b48fde2d820803956834cb072d942ce9a3d80ea2d286877d90db42"));
var COPY = {
	index: {
		ckb: "پێڕست",
		en: "Index",
		kmr: "Pêrist",
		ar: "الفهرس"
	},
	markets: {
		ckb: "بازاڕ",
		en: "Markets",
		kmr: "Bazar",
		ar: "الأسواق"
	},
	weather: {
		ckb: "کەش",
		en: "Weather",
		kmr: "Hewa",
		ar: "الطقس"
	},
	live: {
		ckb: "ڕاستەوخۆ",
		en: "Live",
		kmr: "Zindî",
		ar: "مباشر"
	},
	briefing: {
		ckb: "کورتەی بەیانی",
		en: "Briefing",
		kmr: "Kurteya sibehê",
		ar: "الإحاطة"
	},
	letters: {
		ckb: "نامەکان",
		en: "Newsletters",
		kmr: "Name",
		ar: "النشرات"
	},
	archive: {
		ckb: "ئەرشیف",
		en: "Archive",
		kmr: "Arşîv",
		ar: "الأرشيف"
	},
	numbers: {
		ckb: "ژمارەکان",
		en: "The numbers",
		kmr: "Hejmar",
		ar: "الأرقام"
	},
	calendar: {
		ckb: "ڕۆژژمێر",
		en: "Calendar",
		kmr: "Salname",
		ar: "الروزنامة"
	},
	fixes: {
		ckb: "ڕاستکردنەوە",
		en: "Corrections",
		kmr: "Rastkirin",
		ar: "تصحيحات"
	},
	people: {
		ckb: "دەستە",
		en: "Masthead",
		kmr: "Karmend",
		ar: "هيئة التحرير"
	},
	puzzle: {
		ckb: "مەتەڵ",
		en: "Puzzle",
		kmr: "Meteł",
		ar: "لغز"
	},
	saved: {
		ckb: "پاشەکەوت",
		en: "Saved",
		kmr: "Tomarkirî",
		ar: "المحفوظ"
	},
	opinion: {
		ckb: "بۆچوون",
		en: "Opinion",
		kmr: "Raman",
		ar: "رأي"
	},
	follow: {
		ckb: "شوێنکەوتن",
		en: "Follow",
		kmr: "Bişopîne",
		ar: "تابع"
	},
	following: {
		ckb: "دەیکەیتەوە",
		en: "Following",
		kmr: "Tê şopandin",
		ar: "تتابعه"
	},
	saveStory: {
		ckb: "پاشەکەوت",
		en: "Save",
		kmr: "Tomar bike",
		ar: "احفظ"
	},
	savedStory: {
		ckb: "پاشەکەوتکرا",
		en: "Saved",
		kmr: "Hatiye tomarkirin",
		ar: "محفوظ"
	},
	comments: {
		ckb: "لێدوان",
		en: "Comments",
		kmr: "Şîrove",
		ar: "تعليقات"
	},
	commentHint: {
		ckb: "لێدوانەکەت لەگەڵ ناوەکەت بڵاو دەبێتەوە.",
		en: "Your comment publishes with your name.",
		kmr: "Şîroveya te bi navê te diweşe.",
		ar: "يُنشر تعليقك باسمك."
	},
	commentNeed: {
		ckb: "بۆ لێدوان بچۆ ژوورەوە.",
		en: "Sign in to comment.",
		kmr: "Ji bo şîroveyê têkeve.",
		ar: "ادخل لكتابة تعليق."
	},
	send: {
		ckb: "ناردن",
		en: "Send",
		kmr: "Bişîne",
		ar: "إرسال"
	},
	noComments: {
		ckb: "هێشتا لێدوان نییە. یەکەم بە.",
		en: "No comments yet. Be the first.",
		kmr: "Hîn şîrove nîne.",
		ar: "لا تعليقات بعد."
	},
	reader: {
		ckb: "خوێنەر",
		en: "Reader",
		kmr: "Xwîner",
		ar: "قارئ"
	},
	smaller: {
		ckb: "نووسینی بچووکتر",
		en: "Smaller text",
		kmr: "Nivîsa biçûk",
		ar: "نص أصغر"
	},
	larger: {
		ckb: "نووسینی گەورەتر",
		en: "Larger text",
		kmr: "Nivîsa mezin",
		ar: "نص أكبر"
	},
	week: {
		ckb: "هەفتە",
		en: "Week",
		kmr: "Hefte",
		ar: "أسبوع"
	},
	month: {
		ckb: "مانگ",
		en: "Month",
		kmr: "Meh",
		ar: "شهر"
	},
	quarter: {
		ckb: "چارەگ",
		en: "Quarter",
		kmr: "Çarêk",
		ar: "ربع"
	},
	check: {
		ckb: "پشکنین",
		en: "Check",
		kmr: "Kontrol",
		ar: "تحقق"
	},
	again: {
		ckb: "دووبارە",
		en: "Retry",
		kmr: "Dîsa",
		ar: "أعد"
	},
	nextWord: {
		ckb: "وشەی دواتر",
		en: "Next word",
		kmr: "Peyva din",
		ar: "الكلمة التالية"
	},
	score: {
		ckb: "خاڵ",
		en: "Score",
		kmr: "Pûan",
		ar: "النقاط"
	},
	best: {
		ckb: "باشترین",
		en: "Best",
		kmr: "Baştirîn",
		ar: "الأفضل"
	},
	right: {
		ckb: "ڕاستە.",
		en: "Correct.",
		kmr: "Rast e.",
		ar: "صحيح."
	},
	wrong: {
		ckb: "هێشتا نا. پیتەکان بجووڵێنە.",
		en: "Not yet. Move the letters.",
		kmr: "Hîn na.",
		ar: "ليس بعد."
	},
	refresh: {
		ckb: "نوێکردنەوە",
		en: "Refresh",
		kmr: "Nû bike",
		ar: "تحديث"
	},
	developing: {
		ckb: "بەردەوامە",
		en: "Developing",
		kmr: "Berdewam e",
		ar: "مستمر"
	},
	noWire: {
		ckb: "هێڵی ڕاستەوخۆ بەتاڵە.",
		en: "The live wire is quiet.",
		kmr: "Têlê zindî vala ye.",
		ar: "شريط العاجل هادئ."
	},
	add: {
		ckb: "زیادکردن",
		en: "Add",
		kmr: "Zêde bike",
		ar: "أضف"
	},
	remove: {
		ckb: "سڕینەوە",
		en: "Remove",
		kmr: "Jê bibe",
		ar: "احذف"
	},
	hide: {
		ckb: "شاردنەوە",
		en: "Hide",
		kmr: "Veşêre",
		ar: "أخفِ"
	},
	show: {
		ckb: "پیشاندان",
		en: "Show",
		kmr: "Nîşan bide",
		ar: "أظهر"
	},
	active: {
		ckb: "چالاک",
		en: "Active",
		kmr: "Çalak",
		ar: "نشط"
	},
	kicker: {
		ckb: "سەردێڕی بچووک",
		en: "Kicker",
		kmr: "Sernavê biçûk",
		ar: "عنوان فرعي"
	},
	text: {
		ckb: "دەق",
		en: "Text",
		kmr: "Nivîs",
		ar: "النص"
	},
	link: {
		ckb: "بەستەر",
		en: "Link",
		kmr: "Girêdan",
		ar: "رابط"
	},
	date: {
		ckb: "ڕێکەوت",
		en: "Date",
		kmr: "Dîrok",
		ar: "التاريخ"
	},
	place: {
		ckb: "شوێن",
		en: "Place",
		kmr: "Cih",
		ar: "المكان"
	},
	note: {
		ckb: "تێبینی",
		en: "Note",
		kmr: "Nîşe",
		ar: "ملاحظة"
	},
	wireDesk: {
		ckb: "هێڵی هەواڵ",
		en: "Wire desk",
		kmr: "Maseya têlê",
		ar: "شريط الأخبار"
	},
	commentDesk: {
		ckb: "لێدوانەکان",
		en: "Comments",
		kmr: "Şîrove",
		ar: "التعليقات"
	},
	statsDesk: {
		ckb: "ئامار",
		en: "Audience",
		kmr: "Amar",
		ar: "الجمهور"
	},
	morning: {
		ckb: "نامەی بەیانی",
		en: "Morning note",
		kmr: "Nameya sibehê",
		ar: "رسالة الصباح"
	},
	cultureNote: {
		ckb: "نامەی کەلتور",
		en: "Culture note",
		kmr: "Nameya çandê",
		ar: "رسالة الثقافة"
	},
	weekend: {
		ckb: "نامەی کۆتایی هەفتە",
		en: "Weekend note",
		kmr: "Nameya dawiya hefteyê",
		ar: "رسالة الأسبوع"
	},
	morningBody: {
		ckb: "پێنج بابەتی سەرەوەی ڕۆژەکە، بەو ڕیزبەندییەی سەرنووسەر.",
		en: "Five stories leading the day, in the order the desk chose.",
		kmr: "Pênc gotarên sereke yên rojê.",
		ar: "خمس مواد تتصدر اليوم."
	},
	cultureBody: {
		ckb: "شار، زمان، مۆسیقا و ئەو شتانەی کە خەڵک پێی دەژی.",
		en: "City, language, music, and the things people live by.",
		kmr: "Bajar, ziman, muzîk.",
		ar: "المدينة واللغة والموسيقى."
	},
	weekendBody: {
		ckb: "بۆچوون و ئەو وتارانەی کە هەفتووەکە کۆدەکەنەوە.",
		en: "Opinion and the pieces that hold the week together.",
		kmr: "Raman û gotarên hefteyê.",
		ar: "الرأي وما يجمع الأسبوع."
	},
	onList: {
		ckb: "لە لیستەکەتە",
		en: "On your list",
		kmr: "Di lîsteya te de",
		ar: "في قائمتك"
	},
	offList: {
		ckb: "بەشداربوون",
		en: "Subscribe",
		kmr: "Beşdar bibe",
		ar: "اشترك"
	},
	device: {
		ckb: "لەسەر ئەم ئامێرە",
		en: "On this device",
		kmr: "Li ser vê cîhazê",
		ar: "على هذا الجهاز"
	},
	account: {
		ckb: "لە هەژمارەکەت",
		en: "In your account",
		kmr: "Di hesabê te de",
		ar: "في حسابك"
	},
	high: {
		ckb: "بەرزترین",
		en: "High",
		kmr: "Herî bilind",
		ar: "الأعلى"
	},
	low: {
		ckb: "نزمترین",
		en: "Low",
		kmr: "Herî nizm",
		ar: "الأدنى"
	},
	last: {
		ckb: "دوایین",
		en: "Last",
		kmr: "Dawî",
		ar: "الأخير"
	},
	change: {
		ckb: "گۆڕان",
		en: "Change",
		kmr: "Guhertin",
		ar: "التغيّر"
	},
	now: {
		ckb: "ئێستا",
		en: "Now",
		kmr: "Niha",
		ar: "الآن"
	},
	hourly: {
		ckb: "کاتژمێر بە کاتژمێر",
		en: "Hour by hour",
		kmr: "Saet bi saet",
		ar: "ساعة بساعة"
	},
	outlook: {
		ckb: "حەوت ڕۆژ",
		en: "Seven days",
		kmr: "Heft roj",
		ar: "سبعة أيام"
	},
	upcoming: {
		ckb: "داهاتوو",
		en: "Upcoming",
		kmr: "Tê",
		ar: "قادم"
	},
	earlier: {
		ckb: "پێشتر",
		en: "Earlier",
		kmr: "Berê",
		ar: "سابق"
	},
	bySection: {
		ckb: "بەپێی بەش",
		en: "By section",
		kmr: "Li gorî beşê",
		ar: "حسب القسم"
	},
	reads: {
		ckb: "خوێندنەوە",
		en: "Reads",
		kmr: "Xwendin",
		ar: "قراءات"
	},
	recent: {
		ckb: "دوایی خوێندراو",
		en: "Recently read",
		kmr: "Nû xwendî",
		ar: "قُرئ مؤخرًا"
	},
	print: {
		ckb: "چاپ",
		en: "Print",
		kmr: "Çap",
		ar: "طباعة"
	},
	method: {
		ckb: "ئەم زنجیرەیە لە نرخی دەستپێک و هەنگاوێکی جێگیر دروست دەبێت، بۆ ئەوەی هەمان ڕۆژ هەمان خشتە بێت. ئەمە بازاری ڕاستەقینەی بۆرسە نییە؛ ئامرازێکی خوێندنەوەیە بۆ ڕێڕەوی نەوت، زێڕ، دراو و گەنم.",
		en: "Each series is built from a fixed start and a stable daily step, so the same day always draws the same tape. This is not a live exchange feed. It is a reading instrument for the path of oil, gold, currency and wheat.",
		kmr: "Ev rêze ne bazareke zindî ye. Amûrek xwendinê ye ji bo neft, zêr, pere û genim.",
		ar: "هذه ليست بثًا حيًا للبورصة. هي أداة قراءة لمسار النفط والذهب والعملة والقمح."
	},
	weatherHint: {
		ckb: "خەمڵاندنەکە لەسەر بنەمای شار و ڕۆژی ساڵ دەگۆڕێت، هەموو جارێک کە پەڕەکە دەکەیتەوە هەمان ئەنجامە.",
		en: "The outlook shifts with the city and the day of the year, and stays the same each time you reopen the page that day.",
		kmr: "Pêşbînî bi bajar û roja salê diguhere.",
		ar: "التوقع يتبدّل مع المدينة ويوم السنة."
	},
	liveHint: {
		ckb: "هێڵەکە هەر ٣٠ چرکە جارێک خۆی نوێ دەکاتەوە. سەرنووسەر لە مێزەوە دێڕ زیاد دەکات.",
		en: "The wire refreshes every 30 seconds. Editors add lines from the desk.",
		kmr: "Têl her 30 çirkeyan xwe nû dike.",
		ar: "يتجدد الشريط كل ٣٠ ثانية."
	},
	puzzleHint: {
		ckb: "پیتەکان ڕیز بکە تا وشەی سۆرانی دروست ببێت. خاڵەکەت لەسەر ئەم ئامێرە دەمێنێتەوە.",
		en: "Order the letters into the Sorani word. Your score stays on this device.",
		kmr: "Tîpan rêz bike heta peyva soranî çêbibe.",
		ar: "رتّب الحروف حتى تتكون الكلمة."
	},
	nothingSaved: {
		ckb: "هێشتا هیچت پاشەکەوت نەکردووە.",
		en: "Nothing saved yet.",
		kmr: "Hîn tiştek nehatiye tomarkirin.",
		ar: "لم يُحفظ شيء بعد."
	},
	followed: {
		ckb: "شوێنکەوتووەکان",
		en: "Following",
		kmr: "Şopandin",
		ar: "تتابع"
	},
	editionOf: {
		ckb: "ژمارەی ئەمڕۆ",
		en: "Today’s edition",
		kmr: "Hejmara îro",
		ar: "عدد اليوم"
	},
	editorsOnly: {
		ckb: "تەنها سەرنووسەر دەتوانێت ئەم مێزە ببینێت.",
		en: "Only editors can open this desk.",
		kmr: "Tenê edîtor dikare vê maseyê bibîne.",
		ar: "المحررون فقط."
	},
	urgent: {
		ckb: "بەپەلە",
		en: "Urgent",
		kmr: "Lezgîn",
		ar: "عاجل"
	},
	title: {
		ckb: "ناونیشان",
		en: "Title",
		kmr: "Sernav",
		ar: "العنوان"
	},
	detail: {
		ckb: "وردەکاری",
		en: "Detail",
		kmr: "Hûrgulî",
		ar: "التفاصيل"
	},
	group: {
		ckb: "کلیلی وتار",
		en: "Story key",
		kmr: "Kilîta gotarê",
		ar: "مفتاح المادة"
	},
	hidden: {
		ckb: "شاردراو",
		en: "Hidden",
		kmr: "Veşartî",
		ar: "مخفي"
	},
	visible: {
		ckb: "دیار",
		en: "Visible",
		kmr: "Diyar",
		ar: "ظاهر"
	},
	total: {
		ckb: "کۆ",
		en: "Total",
		kmr: "Giştî",
		ar: "المجموع"
	},
	stories: {
		ckb: "بابەت",
		en: "Stories",
		kmr: "Gotar",
		ar: "مواد"
	},
	clear: {
		ckb: "پاککردنەوە",
		en: "Clear",
		kmr: "Paqij bike",
		ar: "امسح"
	},
	sun: {
		ckb: "خۆر",
		en: "Clear",
		kmr: "Roj",
		ar: "صافي"
	},
	cloud: {
		ckb: "هەور",
		en: "Cloud",
		kmr: "Ewr",
		ar: "غائم"
	},
	rain: {
		ckb: "باران",
		en: "Rain",
		kmr: "Baran",
		ar: "مطر"
	},
	wind: {
		ckb: "با",
		en: "Wind",
		kmr: "Ba",
		ar: "ريح"
	},
	mist: {
		ckb: "تەم",
		en: "Mist",
		kmr: "Mij",
		ar: "ضباب"
	},
	adviceHot: {
		ckb: "سێبەر و ئاو. چایەکە بۆ ئێوارە بهێڵە.",
		en: "Shade and water. Leave the tea for evening.",
		kmr: "Sîwan û av.",
		ar: "الظل والماء."
	},
	adviceMild: {
		ckb: "کەشێکی پیاسە. جلێکی سووک بەسە.",
		en: "Walking weather. A light layer is enough.",
		kmr: "Hewaya meşê ye.",
		ar: "جو مناسب للمشي."
	},
	adviceCool: {
		ckb: "بەرگییەک لەگەڵ خۆت بهێنە. ئێوارە فێنک دەبێت.",
		en: "Bring a coat. The evening cools.",
		kmr: "Cilekî bîne.",
		ar: "خذ معطفًا."
	},
	adviceWet: {
		ckb: "باران لە ڕێگادایە. پێڵاوی داخراو باشترە.",
		en: "Rain is in the pattern. Closed shoes are wiser.",
		kmr: "Baran di rê de ye.",
		ar: "المطر في الطريق."
	},
	eventsDesk: {
		ckb: "ڕووداوەکان",
		en: "Events",
		kmr: "Bûyer",
		ar: "الفعاليات"
	},
	fixesDesk: {
		ckb: "ڕاستکردنەوەکان",
		en: "Corrections",
		kmr: "Rastkirin",
		ar: "التصحيحات"
	},
	emptyDesk: {
		ckb: "هیچ نییە.",
		en: "Nothing here.",
		kmr: "Tiştek nîne.",
		ar: "لا شيء."
	},
	open: {
		ckb: "کردنەوە",
		en: "Open",
		kmr: "Veke",
		ar: "افتح"
	},
	all: {
		ckb: "هەموو",
		en: "All",
		kmr: "Hemû",
		ar: "الكل"
	},
	from: {
		ckb: "لە",
		en: "From",
		kmr: "Ji",
		ar: "من"
	},
	language: {
		ckb: "زمان",
		en: "Language",
		kmr: "Ziman",
		ar: "اللغة"
	},
	role: {
		ckb: "ڕۆڵ",
		en: "Role",
		kmr: "Rol",
		ar: "الدور"
	},
	bio: {
		ckb: "کورتە",
		en: "Bio",
		kmr: "Kurt",
		ar: "نبذة"
	}
};
function n(lang, key) {
	const row = COPY[key];
	return row[lang] ?? row.en ?? row.ckb;
}
var SAVES = "knc-saves";
var FOLLOWS = "knc-follows";
var LETTERS = "knc-letters";
var HISTORY = "knc-history";
var TYPE = "knc-type";
var BEST = "knc-puzzle-best";
function readRaw(key) {
	if (typeof window === "undefined") return null;
	try {
		return JSON.parse(localStorage.getItem(key) || "null");
	} catch {
		return null;
	}
}
function readList(key) {
	const value = readRaw(key);
	return Array.isArray(value) ? value.filter((item) => typeof item === "string").slice(0, 80) : [];
}
function writeList(key, values) {
	localStorage.setItem(key, JSON.stringify(values.slice(0, 80)));
}
function readSaves() {
	return readList(SAVES);
}
function toggleLocalSave(groupKey) {
	const cur = readSaves();
	const has = cur.includes(groupKey);
	writeList(SAVES, has ? cur.filter((item) => item !== groupKey) : [groupKey, ...cur]);
	return !has;
}
function readFollows() {
	const value = readRaw(FOLLOWS);
	if (!Array.isArray(value)) return [];
	return value.filter((item) => item && (item.kind === "section" || item.kind === "author") && typeof item.target === "string").slice(0, 80);
}
function toggleLocalFollow(kind, target) {
	const cur = readFollows();
	const has = cur.some((item) => item.kind === kind && item.target === target);
	const next = has ? cur.filter((item) => !(item.kind === kind && item.target === target)) : [...cur, {
		kind,
		target
	}];
	localStorage.setItem(FOLLOWS, JSON.stringify(next));
	return !has;
}
function readLetters() {
	return readList(LETTERS);
}
function toggleLocalLetter(slug) {
	const cur = readLetters();
	const has = cur.includes(slug);
	writeList(LETTERS, has ? cur.filter((item) => item !== slug) : [...cur, slug]);
	return !has;
}
function remember(groupKey) {
	writeList(HISTORY, [groupKey, ...readList(HISTORY).filter((item) => item !== groupKey)].slice(0, 24));
}
function readHistory() {
	return readList(HISTORY);
}
function readType() {
	if (typeof window === "undefined") return "m";
	const value = localStorage.getItem(TYPE);
	return value === "s" || value === "l" ? value : "m";
}
function writeType(size) {
	document.documentElement.dataset.type = size;
	localStorage.setItem(TYPE, size);
}
function readBest() {
	if (typeof window === "undefined") return 0;
	const n = Number(localStorage.getItem(BEST));
	return Number.isFinite(n) ? n : 0;
}
function writeBest(score) {
	if (score > readBest()) localStorage.setItem(BEST, String(score));
}
function useBoot() {
	return useRouteContext({ from: "__root__" }).boot;
}
function setSiteLang(lang) {
	document.cookie = `knc_lang=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}
function LogoMark({ src }) {
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "KNC Publish",
		className: "h-12 w-12 object-contain"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "grid h-12 w-12 place-items-center border border-ink font-serif text-sm tracking-wide",
		children: "KNC"
	});
}
var WEATHER = [
	{
		name: "هەولێر",
		latin: "Hewlêr",
		temp: "24°"
	},
	{
		name: "سلێمانی",
		latin: "Silêmanî",
		temp: "22°"
	},
	{
		name: "دهۆک",
		latin: "Dihok",
		temp: "21°"
	},
	{
		name: "کەرکوک",
		latin: "Kerkûk",
		temp: "26°"
	}
];
function Site({ children }) {
	const boot = useBoot();
	const router = useRouter();
	const lang = boot.lang;
	const tr = (key) => t(lang, key);
	const { user, isPending } = useCurrentUserState();
	const current = useCurrentUser();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const rtl = boot.dir === "rtl";
	(0, import_react.useEffect)(() => {
		if (!current) return;
		syncProfile({ data: { name: current.displayName ?? "" } }).catch(() => void 0);
	}, [current]);
	(0, import_react.useEffect)(() => {
		writeType(readType());
	}, []);
	function chooseLang(next) {
		setSiteLang(next);
		setOpen(false);
		router.invalidate();
	}
	function stepType(dir) {
		const order = [
			"s",
			"m",
			"l"
		];
		const cur = document.documentElement.dataset.type || "m";
		const index = Math.max(0, order.indexOf(cur));
		writeType(order[Math.min(order.length - 1, Math.max(0, index + dir))] ?? "m");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-sheet focus:p-3",
				children: tr("home")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-mast text-on-mast",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 text-xs tracking-wide",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: boot.today
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-on-mast/60",
							children: "·"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: tr("edition")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ms-auto hidden sm:inline",
							children: "kncsite.com"
						}),
						boot.plugins.includes("weather") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/weather",
							className: "hidden truncate hover:underline lg:inline",
							children: WEATHER.map((city) => `${rtl ? city.name : city.latin} ${city.temp}`).join("  ·  ")
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-rule bg-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "shrink-0",
								"aria-label": "KNC Publish",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { src: boot.logo })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-4xl leading-none tracking-tight sm:text-5xl",
									children: "KNC Publish"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: boot.tagline
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden w-12 sm:block",
								"aria-hidden": true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-6xl items-center gap-2 px-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "grid h-11 w-11 place-items-center lg:hidden",
									"aria-label": open ? tr("close") : tr("menu"),
									onClick: () => setOpen((value) => !value),
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "hidden flex-1 items-center gap-5 overflow-x-auto py-3 text-sm font-semibold lg:flex",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/",
											className: "shrink-0 hover:text-crimson",
											children: tr("home")
										}),
										boot.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/section/$slug",
											params: { slug: category.slug },
											className: "shrink-0 hover:text-crimson",
											children: category.name
										}, category.slug)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/posts",
											className: "shrink-0 hover:text-crimson",
											children: tr("posts")
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
									className: "ms-auto hidden items-center lg:flex",
									onSubmit: (event) => {
										event.preventDefault();
										router.navigate({
											to: "/search",
											search: { q: query }
										});
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: query,
										onChange: (event) => setQuery(event.target.value),
										placeholder: tr("searchPlaceholder"),
										"aria-label": tr("search"),
										suppressHydrationWarning: true,
										className: "h-9 w-44 border border-rule bg-sheet px-3 text-sm outline-none focus:border-ink"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "ms-auto flex items-center lg:ms-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: tr("languages")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: lang,
										onChange: (event) => chooseLang(event.target.value),
										className: "h-11 max-w-36 bg-transparent text-sm font-semibold outline-none",
										children: LANGS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: item.id,
											children: item.short
										}, item.id))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden sm:flex",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid h-11 w-11 place-items-center text-sm",
										"aria-label": n(lang, "smaller"),
										onClick: () => stepType(-1),
										children: "A"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "grid h-11 w-11 place-items-center font-serif text-lg",
										"aria-label": n(lang, "larger"),
										onClick: () => stepType(1),
										children: "A"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden items-center gap-3 text-sm font-semibold sm:flex",
									children: [
										isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-8 w-20 animate-pulse bg-soft" }) : null,
										!isPending && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/login",
											className: "hover:text-crimson",
											children: tr("signIn")
										}) : null,
										user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/desk",
												className: "hover:text-crimson",
												children: tr("desk")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) })]
										}) : null
									]
								})
							]
						})
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-rule px-4 py-3 lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mb-3 flex",
							onSubmit: (event) => {
								event.preventDefault();
								setOpen(false);
								router.navigate({
									to: "/search",
									search: { q: query }
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (event) => setQuery(event.target.value),
								placeholder: tr("searchPlaceholder"),
								"aria-label": tr("search"),
								suppressHydrationWarning: true,
								className: "h-11 min-w-0 flex-1 border border-rule bg-sheet px-3 text-sm outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid h-11 w-11 place-items-center border border-s-0 border-rule",
								"aria-label": tr("search"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-1 text-base font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "py-2",
									onClick: () => setOpen(false),
									children: tr("home")
								}),
								boot.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/section/$slug",
									params: { slug: category.slug },
									className: "py-2",
									onClick: () => setOpen(false),
									children: category.name
								}, category.slug)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/posts",
									className: "py-2",
									onClick: () => setOpen(false),
									children: tr("posts")
								}),
								!isPending && !user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									className: "py-2",
									onClick: () => setOpen(false),
									children: tr("signIn")
								}) : null,
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/desk",
									className: "py-2",
									onClick: () => setOpen(false),
									children: tr("desk")
								}) : null
							]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-rule",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							"aria-label": n(lang, "index"),
							className: "mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-1 text-sm font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/markets",
									search: { id: "brent" },
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "markets")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/weather",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "weather")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/live",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "live")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/briefing",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "briefing")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/section/$slug",
									params: { slug: "opinion" },
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "opinion")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/newsletters",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "letters")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/archive",
									search: { m: "" },
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "archive")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/data",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "numbers")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/events",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "calendar")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/puzzle",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "puzzle")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/saved",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "saved")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/corrections",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "fixes")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/masthead",
									className: "shrink-0 py-2 hover:text-crimson",
									children: n(lang, "people")
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-16 border-t border-ink bg-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-serif text-2xl",
								children: "KNC Publish"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: boot.tagline
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: "kncsite.com"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest uppercase",
							children: tr("sections")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: boot.categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/section/$slug",
								params: { slug: category.slug },
								className: "hover:text-crimson",
								children: category.name
							}) }, category.slug))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest uppercase",
							children: tr("pages")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/page/$slug",
									params: { slug: "about" },
									className: "hover:text-crimson",
									children: tr("about")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/page/$slug",
									params: { slug: "ethics" },
									className: "hover:text-crimson",
									children: tr("ethics")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/page/$slug",
									params: { slug: "contact" },
									className: "hover:text-crimson",
									children: tr("contact")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/masthead",
									className: "hover:text-crimson",
									children: n(lang, "people")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/corrections",
									className: "hover:text-crimson",
									children: n(lang, "fixes")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/events",
									className: "hover:text-crimson",
									children: n(lang, "calendar")
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/posts",
									className: "hover:text-crimson",
									children: tr("posts")
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-widest uppercase",
							children: tr("languages")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 grid grid-cols-2 gap-2 text-sm",
							children: LANGS$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "hover:text-crimson",
								onClick: () => chooseLang(item.id),
								children: item.label
							}) }, item.id))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-rule py-4 text-center text-xs text-muted",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" KNC Publish · ",
						tr("rights")
					]
				})]
			})
		]
	});
}
//#endregion
export { setSiteLang as C, useBoot as D, toggleLocalSave as E, useCurrentUserState as O, setRole as S, toggleLocalLetter as T, saveArticle as _, listDeskStories as a, saveTaxon as b, myProfile as c, readFollows as d, readHistory as f, saveAppearance as g, remember as h, getEditable as i, writeBest as k, n as l, readSaves as m, Site as n, listPages as o, readLetters as p, deskBoot as r, listPeople as s, RedirectToSignIn as t, readBest as u, savePage as v, toggleLocalFollow as w, setPlugin as x, saveProfile as y };
