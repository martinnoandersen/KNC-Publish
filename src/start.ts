import { createMiddleware, createStart } from "@tanstack/react-start";

const langMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
  let lang = "";
  try {
    lang = localStorage.getItem("knc_lang") ?? "";
  } catch {
    lang = "";
  }
  return next({ headers: { "x-knc-lang": lang } });
});

export const startInstance = createStart(() => ({
  functionMiddleware: [langMiddleware],
}));
