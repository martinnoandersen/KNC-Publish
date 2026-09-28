import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";
import { isLang } from "@/lib/i18n";

async function requestLang(): Promise<string> {
  const { getCookie, getRequestHeader } = await import("@tanstack/react-start/server");
  const header = getRequestHeader("x-knc-lang");
  if (isLang(header)) return header;
  const raw = getCookie("knc_lang");
  return isLang(raw) ? raw : "ckb";
}

export const getWires = createServerFn({ method: "GET" }).handler(async () => {
  const { listWires } = await import("./query.server");
  return listWires(await requestLang());
});

export const getAgenda = createServerFn({ method: "GET" }).handler(async () => {
  const { listEvents } = await import("./query.server");
  return listEvents(await requestLang());
});

export const getCorrections = createServerFn({ method: "GET" }).handler(async () => {
  const { listCorrections } = await import("./query.server");
  return listCorrections(await requestLang());
});

export const getMasthead = createServerFn({ method: "GET" }).handler(async () => {
  const { masthead } = await import("./query.server");
  return masthead(await requestLang());
});

export const getPulse = createServerFn({ method: "GET" }).handler(async () => {
  const { pulse } = await import("./query.server");
  return pulse(await requestLang());
});

export const listComments = createServerFn({ method: "GET" })
  .validator((groupKey: string) => String(groupKey ?? "").slice(0, 80))
  .handler(async ({ data }) => {
    const { listComments: load } = await import("./query.server");
    return load(data, await requestLang());
  });

export const postComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { groupKey?: string; body?: string }) => ({
    groupKey: String(input?.groupKey ?? "").slice(0, 80),
    body: String(input?.body ?? "").slice(0, 1200),
  }))
  .handler(async ({ data, context }) => {
    const { addComment } = await import("./query.server");
    return addComment(context.userId, data.groupKey, data.body, await requestLang());
  });

export const toggleSave = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((groupKey: string) => String(groupKey ?? "").slice(0, 80))
  .handler(async ({ data, context }) => {
    const { toggleSave: run } = await import("./query.server");
    return run(context.userId, data);
  });

export const toggleFollow = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { kind?: string; target?: string }) => ({
    kind: String(input?.kind ?? ""),
    target: String(input?.target ?? "").slice(0, 80),
  }))
  .handler(async ({ data, context }) => {
    const { toggleFollow: run } = await import("./query.server");
    return run(context.userId, data.kind, data.target);
  });

export const toggleLetter = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((slug: string) => String(slug ?? "").slice(0, 24))
  .handler(async ({ data, context }) => {
    const { toggleLetter: run } = await import("./query.server");
    return run(context.userId, data);
  });

export const myShelf = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { shelf } = await import("./query.server");
    return shelf(context.userId);
  });
