import type { Sql } from "@/lib/db";
import { getSql } from "@/lib/db";

type Keys = { publicKey: string; privateKey: string };

export async function ensurePush(sql: Sql): Promise<void> {
  await sql`
    create table if not exists push_subs (
      endpoint text primary key,
      p256dh text not null,
      auth text not null,
      created_at timestamptz not null default now()
    )
  `;
}

async function vapid(sql: Sql): Promise<Keys> {
  const rows = await sql<{ key: string; value: string }>`
    select key, value from settings where key in ('vapid_public', 'vapid_private')
  `;
  const bag = new Map(rows.map((row) => [row.key, row.value]));
  const publicKey = bag.get("vapid_public");
  const privateKey = bag.get("vapid_private");
  if (publicKey && privateKey) return { publicKey, privateKey };
  const webpush = (await import("web-push")).default;
  const made = webpush.generateVAPIDKeys();
  await sql`insert into settings (key, value) values ('vapid_public', ${made.publicKey}) on conflict (key) do update set value = ${made.publicKey}`;
  await sql`insert into settings (key, value) values ('vapid_private', ${made.privateKey}) on conflict (key) do update set value = ${made.privateKey}`;
  return { publicKey: made.publicKey, privateKey: made.privateKey };
}

export async function publicVapid(): Promise<string> {
  const sql = await getSql();
  await ensurePush(sql);
  return (await vapid(sql)).publicKey;
}

export async function saveSubscription(input: { endpoint: string; p256dh: string; auth: string }): Promise<void> {
  const sql = await getSql();
  await ensurePush(sql);
  await sql`
    insert into push_subs (endpoint, p256dh, auth)
    values (${input.endpoint}, ${input.p256dh}, ${input.auth})
    on conflict (endpoint) do update set p256dh = excluded.p256dh, auth = excluded.auth
  `;
}

export async function notifyEveryone(note: { title: string; body: string; url: string }): Promise<number> {
  const sql = await getSql();
  await ensurePush(sql);
  const keys = await vapid(sql);
  const subs = await sql<{ endpoint: string; p256dh: string; auth: string }>`
    select endpoint, p256dh, auth from push_subs
  `;
  if (!subs.length) return 0;
  const webpush = (await import("web-push")).default;
  webpush.setVapidDetails("mailto:desk@kncsite.com", keys.publicKey, keys.privateKey);
  const payload = JSON.stringify(note);
  let sent = 0;
  await Promise.all(
    subs.map(async (sub) => {
      try {
        await webpush.sendNotification(
          { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
          payload,
        );
        sent += 1;
      } catch (error) {
        const status = (error as { statusCode?: number }).statusCode;
        if (status === 404 || status === 410) {
          await sql`delete from push_subs where endpoint = ${sub.endpoint}`;
        }
      }
    }),
  );
  return sent;
}
