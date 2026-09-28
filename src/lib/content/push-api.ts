import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "@/lib/auth/middleware";

export const pushKey = createServerFn({ method: "GET" }).handler(async () => {
  const { publicVapid } = await import("./push.server");
  return publicVapid();
});

export const savePush = createServerFn({ method: "POST" })
  .validator((input: { endpoint?: string; p256dh?: string; auth?: string }) => ({
    endpoint: String(input?.endpoint ?? "").slice(0, 800),
    p256dh: String(input?.p256dh ?? "").slice(0, 200),
    auth: String(input?.auth ?? "").slice(0, 200),
  }))
  .handler(async ({ data }) => {
    if (!data.endpoint.startsWith("https://") || !data.p256dh || !data.auth) return { ok: false };
    const { saveSubscription } = await import("./push.server");
    await saveSubscription(data);
    return { ok: true };
  });

export const broadcastNotice = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((input: { title?: string; body?: string; url?: string }) => ({
    title: String(input?.title ?? "").trim().slice(0, 120),
    body: String(input?.body ?? "").trim().slice(0, 240),
    url: String(input?.url ?? "/").trim().slice(0, 200) || "/",
  }))
  .handler(async ({ context, data }) => {
    const { roleOf } = await import("./desk-api");
    const role = await roleOf(context.userId);
    if (role !== "editor" && role !== "superadmin") throw new Error("Editors send notices");
    if (!data.title) throw new Error("Title required");
    const { notifyEveryone } = await import("./push.server");
    const sent = await notifyEveryone(data);
    return { sent };
  });
