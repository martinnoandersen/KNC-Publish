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

export const deskWireList = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { assertEditor, listWires } = await import("./query.server");
    await assertEditor(context.userId);
    return listWires(await requestLang(), true);
  });

export const deskSaveWire = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: number; lang?: string; kicker?: string; text?: string; href?: string; urgent?: boolean }) => ({
    id: Number(input?.id) || 0,
    lang: String(input?.lang ?? "ckb").slice(0, 8),
    kicker: String(input?.kicker ?? "").slice(0, 40),
    text: String(input?.text ?? "").slice(0, 280),
    href: String(input?.href ?? "").slice(0, 200),
    urgent: Boolean(input?.urgent),
  }))
  .handler(async ({ data, context }) => {
    const { saveWire } = await import("./query.server");
    return saveWire(context.userId, data);
  });

export const deskSetWire = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: number; active?: boolean }) => ({
    id: Number(input?.id) || 0,
    active: Boolean(input?.active),
  }))
  .handler(async ({ data, context }) => {
    const { setWireActive } = await import("./query.server");
    await setWireActive(context.userId, data.id, data.active);
    return { ok: true };
  });

export const deskRemoveWire = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ data, context }) => {
    const { removeWire } = await import("./query.server");
    await removeWire(context.userId, data);
    return { ok: true };
  });

export const deskEventList = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { assertEditor, listEvents } = await import("./query.server");
    await assertEditor(context.userId);
    return listEvents(await requestLang());
  });

export const deskSaveEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title?: string; place?: string; detail?: string; startsOn?: string; lang?: string }) => ({
    title: String(input?.title ?? "").slice(0, 140),
    place: String(input?.place ?? "").slice(0, 80),
    detail: String(input?.detail ?? "").slice(0, 400),
    startsOn: String(input?.startsOn ?? "").slice(0, 10),
    lang: String(input?.lang ?? "ckb").slice(0, 8),
  }))
  .handler(async ({ data, context }) => {
    const { saveEvent } = await import("./query.server");
    return saveEvent(context.userId, data);
  });

export const deskRemoveEvent = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ data, context }) => {
    const { removeEvent } = await import("./query.server");
    await removeEvent(context.userId, data);
    return { ok: true };
  });

export const deskFixList = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { assertEditor, listCorrections } = await import("./query.server");
    await assertEditor(context.userId);
    return listCorrections(await requestLang());
  });

export const deskSaveFix = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { groupKey?: string; note?: string; lang?: string }) => ({
    groupKey: String(input?.groupKey ?? "").slice(0, 80),
    note: String(input?.note ?? "").slice(0, 600),
    lang: String(input?.lang ?? "ckb").slice(0, 8),
  }))
  .handler(async ({ data, context }) => {
    const { saveCorrection } = await import("./query.server");
    return saveCorrection(context.userId, data);
  });

export const deskRemoveFix = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ data, context }) => {
    const { removeCorrection } = await import("./query.server");
    await removeCorrection(context.userId, data);
    return { ok: true };
  });

export const deskCommentList = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { deskComments } = await import("./query.server");
    return deskComments(context.userId);
  });

export const deskSetComment = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { id?: number; status?: string }) => ({
    id: Number(input?.id) || 0,
    status: String(input?.status ?? ""),
  }))
  .handler(async ({ data, context }) => {
    const { setCommentStatus } = await import("./query.server");
    await setCommentStatus(context.userId, data.id, data.status);
    return { ok: true };
  });

export const deskPulse = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { assertEditor, pulse } = await import("./query.server");
    await assertEditor(context.userId);
    return pulse(await requestLang());
  });
