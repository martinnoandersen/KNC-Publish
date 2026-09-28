import { w as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/render-DO-dxZqt.js
var import_jsx_runtime = require_jsx_runtime();
function safeSrc(src) {
	if (src.startsWith("/media/")) return src;
	if (/^https:\/\/[^\s]+$/.test(src)) return src;
	return null;
}
function RichText({ text, drop }) {
	const blocks = text.split(/\n\n+/).map((block) => block.trim()).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: drop ? "drop prose-news" : "prose-news",
		children: blocks.map((block, index) => {
			if (block.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-8 mb-3 font-serif text-2xl",
				children: block.slice(3)
			}, index);
			const image = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
			if (image) {
				const src = safeSrc(image[2] ?? "");
				if (!src) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "my-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src,
						alt: image[1] || "",
						className: "w-full object-cover"
					}), image[1] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
						className: "mt-2 text-sm text-muted",
						children: image[1]
					}) : null]
				}, index);
			}
			if (block.startsWith("> ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
				className: "my-6 border-s-2 border-crimson ps-4 font-serif text-2xl leading-snug",
				children: block.slice(2)
			}, index);
			if (block.split("\n").every((line) => line.startsWith("- "))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "my-4 list-disc ps-5",
				children: block.split("\n").map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "mt-1",
					children: line.slice(2)
				}, line))
			}, index);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg leading-relaxed",
				children: block
			}, index);
		})
	});
}
function Kicker({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs font-semibold tracking-widest text-crimson uppercase",
		children
	});
}
//#endregion
export { RichText as n, Kicker as t };
