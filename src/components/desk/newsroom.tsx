import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { n } from "@/lib/newsroom/copy";
import {
  deskCommentList,
  deskEventList,
  deskFixList,
  deskPulse,
  deskRemoveEvent,
  deskRemoveFix,
  deskRemoveWire,
  deskSaveEvent,
  deskSaveFix,
  deskSaveWire,
  deskSetComment,
  deskSetWire,
  deskWireList,
} from "@/lib/newsroom/desk-api";
import { useDesk } from "./ui";

function useLoad<T>(load: () => Promise<T>, empty: T) {
  const [rows, setRows] = useState<T>(empty);
  const [error, setError] = useState("");
  function reload() {
    load().then(setRows).catch((err: Error) => setError(err.message));
  }
  useEffect(() => {
    reload();
  }, []);
  return { rows, setRows, error, setError, reload };
}

export function WireScreen() {
  const { boot, lang } = useDesk();
  const [tab, setTab] = useState<"wire" | "events" | "fixes">("wire");
  if (!boot) return null;
  if (boot.role !== "editor" && boot.role !== "superadmin") return <p>{n(lang, "editorsOnly")}</p>;
  return (
    <section>
      <h1 className="font-serif text-4xl">{n(lang, "wireDesk")}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {(["wire", "events", "fixes"] as const).map((item) => (
          <button key={item} type="button" onClick={() => setTab(item)} className={tab === item ? "h-11 bg-ink px-3 text-sm text-paper" : "h-11 border border-rule px-3 text-sm"}>
            {item === "wire" ? n(lang, "wireDesk") : item === "events" ? n(lang, "eventsDesk") : n(lang, "fixesDesk")}
          </button>
        ))}
      </div>
      {tab === "wire" ? <WirePane lang={lang} /> : null}
      {tab === "events" ? <EventPane lang={lang} /> : null}
      {tab === "fixes" ? <FixPane lang={lang} /> : null}
    </section>
  );
}

function WirePane({ lang }: { lang: string }) {
  const data = useLoad(deskWireList, [] as Awaited<ReturnType<typeof deskWireList>>);
  const [text, setText] = useState("");
  const [kicker, setKicker] = useState("");
  const [href, setHref] = useState("/article/");
  const [urgent, setUrgent] = useState(false);
  async function add(event: FormEvent) {
    event.preventDefault();
    data.setError("");
    try {
      await deskSaveWire({ data: { lang, kicker, text, href, urgent } });
      setText("");
      data.reload();
    } catch (err) {
      data.setError(err instanceof Error ? err.message : "error");
    }
  }
  return (
    <div className="mt-6">
      <form onSubmit={(event) => void add(event)} className="grid gap-3 border border-rule bg-sheet p-4">
        <label className="text-sm font-semibold">{n(lang, "kicker")}
          <input value={kicker} onChange={(event) => setKicker(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="text-sm font-semibold">{n(lang, "text")}
          <textarea required value={text} onChange={(event) => setText(event.target.value)} rows={3} className="mt-1 w-full border border-rule bg-paper px-3 py-2" />
        </label>
        <label className="text-sm font-semibold">{n(lang, "link")}
          <input value={href} onChange={(event) => setHref(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={urgent} onChange={(event) => setUrgent(event.target.checked)} />
          {n(lang, "urgent")}
        </label>
        <button type="submit" className="h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast">{n(lang, "add")}</button>
        {data.error ? <p className="text-sm text-crimson">{data.error}</p> : null}
      </form>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {data.rows.map((row) => (
          <li key={row.id} className="flex flex-wrap items-center gap-3 py-3">
            <p className="min-w-0 flex-1">{row.urgent ? "● " : ""}{row.text}</p>
            <span className="text-xs text-muted">{row.lang}</span>
            <button type="button" className="h-11 border border-rule px-3 text-sm" onClick={() => void deskSetWire({ data: { id: row.id, active: !row.active } }).then(data.reload)}>
              {row.active ? n(lang, "hide") : n(lang, "show")}
            </button>
            <button type="button" className="h-11 border border-rule px-3 text-sm" onClick={() => void deskRemoveWire({ data: row.id }).then(data.reload)}>{n(lang, "remove")}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventPane({ lang }: { lang: string }) {
  const data = useLoad(deskEventList, [] as Awaited<ReturnType<typeof deskEventList>>);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [detail, setDetail] = useState("");
  const [startsOn, setStartsOn] = useState("");
  async function add(event: FormEvent) {
    event.preventDefault();
    try {
      await deskSaveEvent({ data: { title, place, detail, startsOn, lang } });
      setTitle("");
      setDetail("");
      data.reload();
    } catch (err) {
      data.setError(err instanceof Error ? err.message : "error");
    }
  }
  return (
    <div className="mt-6">
      <form onSubmit={(event) => void add(event)} className="grid gap-3 border border-rule bg-sheet p-4 sm:grid-cols-2">
        <label className="text-sm font-semibold sm:col-span-2">{n(lang, "title")}
          <input required value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="text-sm font-semibold">{n(lang, "place")}
          <input value={place} onChange={(event) => setPlace(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="text-sm font-semibold">{n(lang, "date")}
          <input required type="date" value={startsOn} onChange={(event) => setStartsOn(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="text-sm font-semibold sm:col-span-2">{n(lang, "detail")}
          <textarea value={detail} onChange={(event) => setDetail(event.target.value)} rows={2} className="mt-1 w-full border border-rule bg-paper px-3 py-2" />
        </label>
        <button type="submit" className="h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast">{n(lang, "add")}</button>
        {data.error ? <p className="text-sm text-crimson sm:col-span-2">{data.error}</p> : null}
      </form>
      <ul className="mt-4 divide-y divide-rule">
        {data.rows.filter((row) => !row.fixed).map((row) => (
          <li key={row.id} className="flex flex-wrap items-center gap-3 py-3">
            <span className="text-sm tabular-nums">{row.startsOn}</span>
            <span className="flex-1">{row.title}</span>
            <button type="button" className="h-11 border border-rule px-3 text-sm" onClick={() => void deskRemoveEvent({ data: row.id }).then(data.reload)}>{n(lang, "remove")}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FixPane({ lang }: { lang: string }) {
  const data = useLoad(deskFixList, [] as Awaited<ReturnType<typeof deskFixList>>);
  const [groupKey, setGroupKey] = useState("");
  const [note, setNote] = useState("");
  async function add(event: FormEvent) {
    event.preventDefault();
    try {
      await deskSaveFix({ data: { groupKey, note, lang } });
      setNote("");
      data.reload();
    } catch (err) {
      data.setError(err instanceof Error ? err.message : "error");
    }
  }
  return (
    <div className="mt-6">
      <form onSubmit={(event) => void add(event)} className="grid gap-3 border border-rule bg-sheet p-4">
        <label className="text-sm font-semibold">{n(lang, "group")}
          <input value={groupKey} onChange={(event) => setGroupKey(event.target.value)} className="mt-1 h-11 w-full border border-rule bg-paper px-3" placeholder="citadel-memory" />
        </label>
        <label className="text-sm font-semibold">{n(lang, "note")}
          <textarea required value={note} onChange={(event) => setNote(event.target.value)} rows={3} className="mt-1 w-full border border-rule bg-paper px-3 py-2" />
        </label>
        <button type="submit" className="h-11 w-fit bg-crimson px-4 text-sm font-semibold text-on-mast">{n(lang, "add")}</button>
        {data.error ? <p className="text-sm text-crimson">{data.error}</p> : null}
      </form>
      <ul className="mt-4 divide-y divide-rule">
        {data.rows.map((row) => (
          <li key={row.id} className="py-3">
            <p>{row.note}</p>
            <button type="button" className="mt-2 h-11 border border-rule px-3 text-sm" onClick={() => void deskRemoveFix({ data: row.id }).then(data.reload)}>{n(lang, "remove")}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommentScreen() {
  const { boot, lang } = useDesk();
  const data = useLoad(deskCommentList, [] as Awaited<ReturnType<typeof deskCommentList>>);
  if (!boot) return null;
  if (boot.role !== "editor" && boot.role !== "superadmin") return <p>{n(lang, "editorsOnly")}</p>;
  return (
    <section>
      <h1 className="font-serif text-4xl">{n(lang, "commentDesk")}</h1>
      {data.error ? <p className="mt-3 text-sm text-crimson">{data.error}</p> : null}
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        {data.rows.map((row) => (
          <li key={row.id} className="grid gap-2 py-3 sm:grid-cols-12 sm:items-center">
            <div className="sm:col-span-8">
              <p className="text-sm font-semibold">{row.name} · {row.status}</p>
              <p className="mt-1">{row.body}</p>
              <Link to="/article/$slug" params={{ slug: row.groupKey }} className="text-sm text-crimson">{row.groupKey}</Link>
            </div>
            <button
              type="button"
              className="h-11 border border-rule px-3 text-sm sm:col-span-4"
              onClick={() => void deskSetComment({ data: { id: row.id, status: row.status === "hidden" ? "visible" : "hidden" } }).then(data.reload)}
            >
              {row.status === "hidden" ? n(lang, "show") : n(lang, "hide")}
            </button>
          </li>
        ))}
      </ul>
      {data.rows.length === 0 ? <p className="mt-4 text-muted">{n(lang, "emptyDesk")}</p> : null}
    </section>
  );
}

export function StatsScreen() {
  const { boot, lang } = useDesk();
  const data = useLoad(deskPulse, null as Awaited<ReturnType<typeof deskPulse>> | null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!boot) return null;
  if (boot.role !== "editor" && boot.role !== "superadmin") return <p>{n(lang, "editorsOnly")}</p>;
  const pulse = data.rows;
  return (
    <section>
      <h1 className="font-serif text-4xl">{n(lang, "statsDesk")}</h1>
      {data.error ? <p className="mt-3 text-sm text-crimson">{data.error}</p> : null}
      {pulse ? (
        <>
          <p className="mt-4 text-muted">{n(lang, "total")}: {pulse.totalStories} {n(lang, "stories")} · {pulse.totalViews} {n(lang, "reads")}</p>
          <div dir="ltr" className="mt-6 h-72 border border-rule bg-sheet p-2">
            {ready ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pulse.sections}>
                  <XAxis dataKey="name" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="views" fill="var(--color-crimson)" />
                </BarChart>
              </ResponsiveContainer>
            ) : null}
          </div>
        </>
      ) : null}
    </section>
  );
}
