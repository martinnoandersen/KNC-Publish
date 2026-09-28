import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { LANGS, roleLabel, statusLabel, t, typeLabel } from "@/lib/i18n";
import { loc } from "@/lib/content/text";
import { MEDIA, type RefItem } from "@/lib/content/types";
import { BlockEditor } from "@/components/desk/blocks";
import { broadcastNotice } from "@/lib/content/push-api";
import {
  deleteArticle,
  deleteMenuItem,
  deskBoot,
  getEditable,
  listDeskStories,
  listMenu,
  listPages,
  listPeople,
  myProfile,
  saveAppearance,
  saveArticle,
  saveEnabledLangs,
  saveMenuItem,
  savePage,
  savePerson,
  saveProfile,
  deletePerson,
  saveLayout,
  saveTaxon,
  setArticleStatus,
  setPlugin,
  setRole,
  uploadAsset,
} from "@/lib/content/desk-api";
import { PLUGIN_CATALOG } from "@/lib/content/seed-data";
import { n } from "@/lib/newsroom/copy";
import { useBoot } from "@/components/site/shell";

type Boot = Awaited<ReturnType<typeof deskBoot>>;

const Ctx = createContext<{ boot: Boot | null; reload: () => void; lang: string }>({
  boot: null,
  reload: () => undefined,
  lang: "ckb",
});

export function useDesk() {
  return useContext(Ctx);
}

export function DeskLayout({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const site = useBoot();
  const [boot, setBoot] = useState<Boot | null>(null);
  const [error, setError] = useState("");
  function reload() {
    deskBoot().then(setBoot).catch((err: Error) => setError(err.message));
  }
  useEffect(() => {
    if (user) reload();
  }, [user]);
  if (isPending || (user && !boot && !error)) {
    return <div className="min-h-screen bg-paper p-10 text-muted">{t(site.lang, "desk")}…</div>;
  }
  if (!user) return <RedirectToSignIn />;
  const lang = site.lang;
  const role = boot?.role ?? "reader";
  const links = [
    ["/desk", "dashboard"],
    ["/desk/new", "newStory"],
    ["/desk/profile", "profile"],
  ] as const;
  const editorLinks = [
    ["/desk/review", "reviewQueue"],
    ["/desk/pages", "pages"],
    ["/desk/taxonomy", "taxonomy"],
  ] as const;
  const adminLinks = [
    ["/desk/people", "people"],
    ["/desk/layout", "layout"],
    ["/desk/appearance", "appearance"],
    ["/desk/plugins", "plugins"],
  ] as const;
  return (
    <Ctx.Provider value={{ boot, reload, lang }}>
      <div className="min-h-screen bg-paper lg:grid lg:grid-cols-12">
        <aside className="bg-mast text-on-mast lg:col-span-3 xl:col-span-2">
          <div className="px-4 py-5">
            <Link to="/" className="latin-face text-2xl">KNC</Link>
            <p className="mt-1 text-xs tracking-widest uppercase">{t(lang, "desk")}</p>
            <p className="mt-3 text-sm text-on-mast/70">{roleLabel(lang, role)}</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-3 pb-4 text-sm lg:block lg:space-y-1 lg:px-3">
            {links.filter(([to]) => role === "pending" ? to !== "/desk/new" : true).map(([to, key]) => (
              <Link key={to} to={to} className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{t(lang, key)}</Link>
            ))}
            {(role === "editor" || role === "superadmin") && editorLinks.map(([to, key]) => (
              <Link key={to} to={to} className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{t(lang, key)}</Link>
            ))}
            {(role === "editor" || role === "superadmin") ? (
              <a href="/desk/menus" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{lang === "ckb" ? "مێنوو" : lang === "kmr" ? "Menu" : "Menus"}</a>
            ) : null}
            {role === "superadmin" && adminLinks.map(([to, key]) => (
              <Link key={to} to={to} className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{t(lang, key)}</Link>
            ))}
            {(role === "editor" || role === "superadmin") ? (
              <>
                <Link to="/desk/books" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{lang === "ckb" ? "پەرتووک" : lang === "kmr" ? "Pirtûk" : lang === "he" ? "ספרים" : "Books"}</Link>
                <Link to="/desk/kongre" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{lang === "ckb" ? "گۆڤاری کۆنگرە" : "Kongre"}</Link>
                <Link to="/desk/wire" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{n(lang, "wireDesk")}</Link>
                <Link to="/desk/comments" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{n(lang, "commentDesk")}</Link>
                <Link to="/desk/stats" className="block shrink-0 px-2 py-2 hover:bg-on-mast/10">{n(lang, "statsDesk")}</Link>
              </>
            ) : null}
            <Link to="/" className="block shrink-0 px-2 py-2 text-on-mast/70">{t(lang, "viewSite")}</Link>
          </nav>
        </aside>
        <div className="px-4 py-6 lg:col-span-9 xl:col-span-10 lg:px-8">
          {error ? <p className="mb-4 text-sm text-crimson">{error}</p> : null}
          {children}
        </div>
      </div>
    </Ctx.Provider>
  );
}

export function DeskHome() {
  const { boot, lang } = useDesk();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDeskStories>>>([]);
  const [filter, setFilter] = useState("all");
  const [kind, setKind] = useState("all");
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [sent, setSent] = useState("");
  function load() {
    listDeskStories().then(setRows).catch(() => setRows([]));
  }
  useEffect(() => { load(); }, []);
  if (!boot) return null;
  if (boot.role === "reader" || boot.role === "pending") {
    return (
      <section className="max-w-xl">
        <h1 className="font-serif text-4xl">{t(lang, "desk")}</h1>
        <p className="mt-4">{boot.role === "pending" ? t(lang, "awaiting") : t(lang, "noAccess")}</p>
        <Link to="/desk/profile" className="mt-6 inline-block border border-ink px-4 py-2 text-sm">{t(lang, "profile")}</Link>
      </section>
    );
  }
  const canPublish = boot.role === "editor" || boot.role === "superadmin";
  const shown = rows.filter((row) => {
    const statusOk = filter === "all" || row.status === filter || (filter === "draft" && row.status === "rejected");
    const kindOk = kind === "all" || row.kind === kind;
    return statusOk && kindOk;
  });
  const pages = Math.max(1, Math.ceil(shown.length / pageSize));
  const safePage = Math.min(page, pages);
  const slice = shown.slice((safePage - 1) * pageSize, safePage * pageSize);
  async function changeStatus(id: number, status: string) {
    setError("");
    try {
      await setArticleStatus({ data: { id, status } });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  }
  async function remove(id: number, title: string) {
    if (!window.confirm(title)) return;
    setError("");
    try {
      await deleteArticle({ data: id });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  }
  return (
    <section>
      <h1 className="font-serif text-4xl">{t(lang, "dashboard")}</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          [t(lang, "published"), boot.counts.published],
          [t(lang, "inReview"), boot.counts.review],
          [t(lang, "draft"), boot.counts.drafts],
        ].map(([label, n]) => (
          <div key={String(label)} className="border border-rule bg-sheet p-4">
            <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
            <p className="mt-2 font-serif text-4xl tabular-nums">{n}</p>
          </div>
        ))}
      </div>
      {canPublish ? (
        <form
          className="mt-6 grid gap-2 border border-rule bg-sheet p-4 sm:grid-cols-[1fr_1fr_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setSent("");
            void broadcastNotice({
              data: { title: String(data.get("title") ?? ""), body: String(data.get("body") ?? ""), url: "/" },
            }).then((result) => {
              setSent(lang === "ckb" ? `${result.sent} نۆتیفیکەیشن نێردرا` : `${result.sent} notices sent`);
              setNoteTitle("");
            }).catch((err: unknown) => setError(err instanceof Error ? err.message : "Error"));
          }}
        >
          <input name="title" value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)} placeholder={lang === "ckb" ? "پەیام بۆ هەمووان" : "Message to everyone"} className="h-11 border border-rule bg-paper px-3" />
          <input name="body" placeholder={lang === "ckb" ? "دەقی نۆتیفیکەیشن" : "Notice text"} className="h-11 border border-rule bg-paper px-3" />
          <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{lang === "ckb" ? "ناردن" : "Send"}</button>
          {sent ? <p className="text-sm text-crimson sm:col-span-3">{sent}</p> : null}
        </form>
      ) : null}
      <div className="mt-8 flex flex-wrap items-center gap-2">
        {["all", "draft", "review", "published", "rejected"].map((item) => (
          <button key={item} type="button" onClick={() => { setFilter(item); setPage(1); }} className={filter === item ? "h-10 bg-ink px-3 text-sm text-paper" : "h-10 border border-rule px-3 text-sm"}>
            {item === "all" ? t(lang, "all") : statusLabel(lang, item)}
          </button>
        ))}
        {["all", "article", "post"].map((item) => (
          <button key={item} type="button" onClick={() => { setKind(item); setPage(1); }} className={kind === item ? "h-10 border border-ink px-3 text-sm" : "h-10 border border-rule px-3 text-sm text-muted"}>
            {item === "all" ? t(lang, "all") : item === "article" ? t(lang, "article") : t(lang, "post")}
          </button>
        ))}
        <label className="ms-auto flex items-center gap-2 text-sm">
          <span>{lang === "ckb" ? "لە هەر پەڕە" : lang === "kmr" ? "Di her rûpelê" : "Per page"}</span>
          <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }} className="h-10 border border-rule bg-sheet px-2">
            {[10, 20, 50, 100].map((size) => <option key={size} value={size}>{size}</option>)}
          </select>
        </label>
        <Link to="/desk/new" className="grid h-10 place-items-center bg-crimson px-4 text-sm font-semibold text-on-mast">{t(lang, "newStory")}</Link>
      </div>
      {error ? <p className="mt-3 text-sm text-crimson">{error}</p> : null}
      <p className="mt-3 text-sm text-muted">{shown.length}</p>
      <ul className="mt-2 divide-y divide-rule border-y border-rule">
        {slice.map((row) => (
          <li key={row.id} className="grid gap-2 py-3 sm:grid-cols-12 sm:items-center">
            <Link to="/desk/edit/$id" params={{ id: String(row.id) }} className="font-serif text-xl hover:text-crimson sm:col-span-5">{row.title}</Link>
            <span className="text-sm text-muted sm:col-span-1">{row.lang}</span>
            <span className="text-sm text-muted sm:col-span-1">{row.kind === "post" ? t(lang, "post") : t(lang, "article")}</span>
            <label className="sm:col-span-2">
              <span className="sr-only">{statusLabel(lang, row.status)}</span>
              <select
                value={row.status}
                onChange={(event) => changeStatus(row.id, event.target.value)}
                className="h-10 w-full border border-rule bg-sheet px-2 text-sm"
              >
                {["draft", "review", "published", "rejected"].map((status) => (
                  <option key={status} value={status} disabled={!canPublish && (status === "published" || status === "rejected")}>
                    {statusLabel(lang, status)}
                  </option>
                ))}
              </select>
            </label>
            <span className="flex gap-2 sm:col-span-3">
              <Link to="/desk/edit/$id" params={{ id: String(row.id) }} className="inline-flex h-10 items-center border border-ink px-3 text-sm">{lang === "ckb" ? "دەستکاری" : lang === "kmr" ? "Biguherîne" : "Edit"}</Link>
              <button type="button" className="h-10 border border-rule px-3 text-sm text-crimson" onClick={() => remove(row.id, row.title)}>
                {lang === "ckb" ? "سڕینەوە" : lang === "kmr" ? "Jê bibe" : "Delete"}
              </button>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center gap-2">
        <button type="button" className="h-10 border border-rule px-3 text-sm" disabled={safePage <= 1} onClick={() => setPage(safePage - 1)}>{lang === "ckb" ? "پێشوو" : "Prev"}</button>
        <span className="text-sm tabular-nums">{safePage} / {pages}</span>
        <button type="button" className="h-10 border border-rule px-3 text-sm" disabled={safePage >= pages} onClick={() => setPage(safePage + 1)}>{lang === "ckb" ? "دواتر" : "Next"}</button>
      </div>
    </section>
  );
}

const emptyRef = (): RefItem => ({ authors: "", year: "", title: "", source: "" });

async function sendFile(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return uploadAsset({ data: { name: file.name, mime: file.type || "application/octet-stream", data: btoa(binary) } });
}

export function StoryEditor({ id }: { id?: number }) {
  const { boot, lang, reload } = useDesk();
  const router = useRouter();
  const [form, setForm] = useState({
    groupKey: "",
    lang,
    kind: "article",
    type: "standard",
    title: "",
    subtitle: "",
    dek: "",
    body: "",
    image: "/media/state-reason.jpg",
    imageCaption: "",
    files: [] as { name: string; url: string }[],
    category: "culture",
    tags: "",
    zones: [] as string[],
    refs: [emptyRef()] as RefItem[],
    reviewNote: "",
    status: "draft",
    locked: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if (!id) return;
    getEditable({ data: id }).then((row) => {
      if (!row) return;
      setForm({
        groupKey: row.groupKey,
        lang: row.lang,
        kind: row.kind,
        type: row.type,
        title: row.title,
        subtitle: row.subtitle ?? "",
        dek: row.dek,
        body: row.body,
        image: row.image,
        imageCaption: row.imageCaption,
        files: row.files ?? [],
        category: row.category,
        tags: row.tags,
        zones: row.zones,
        refs: row.refs.length ? row.refs : [emptyRef()],
        reviewNote: row.reviewNote,
        status: row.status,
        locked: row.locked,
      });
    }).catch((err: Error) => setError(err.message));
  }, [id]);
  if (!boot) return null;
  if (boot.role === "reader" || boot.role === "pending") return <p>{boot.role === "pending" ? t(lang, "awaiting") : t(lang, "noAccess")}</p>;
  const canPublish = boot.role === "editor" || boot.role === "superadmin";
  function toggle(zone: string) {
    setForm((current) => {
      const withoutReaders = current.zones.filter((item) => item !== "readers");
      const has = withoutReaders.includes(zone);
      return { ...current, zones: has ? withoutReaders.filter((item) => item !== zone) : [...withoutReaders, zone] };
    });
  }
  async function submit(action: string) {
    setError("");
    setMessage("");
    try {
      const saved = await saveArticle({
        data: { ...form, id: id ?? 0, action, refs: form.refs.filter((ref) => ref.title || ref.authors) },
      });
      setMessage(t(lang, "saved"));
      reload();
      if (!id) void router.navigate({ to: "/desk/edit/$id", params: { id: String(saved.id) } });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    }
  }
  const categories = boot.categories.map((cat) => {
    const name = loc(cat.name, lang);
    return { slug: cat.slug, name };
  });
  return (
    <form className="mx-auto max-w-6xl space-y-4" onSubmit={(event) => event.preventDefault()}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-serif text-4xl">{id ? t(lang, "title") : t(lang, "newStory")}</h1>
        <span className="text-sm text-muted">{statusLabel(lang, form.status)}</span>
      </div>
      {form.locked ? <p className="text-sm text-crimson">{t(lang, "published")}</p> : null}
      <label className="block text-sm">{t(lang, "title")}
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 h-12 w-full border border-rule bg-sheet px-3 text-lg" />
      </label>
      <label className="block text-sm">{t(lang, "subtitle")}
        <input value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
      </label>
      <label className="block text-sm">{t(lang, "dek")}
        <textarea value={form.dek} onChange={(e) => setForm({ ...form, dek: e.target.value })} className="mt-1 h-20 w-full border border-rule bg-sheet px-3 py-2" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">{t(lang, "language")}
          <select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-2">
            {(boot.enabledLangs.length ? LANGS.filter((item) => boot.enabledLangs.includes(item.id)) : LANGS).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label className="text-sm">{t(lang, "kind")}
          <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-2">
            <option value="article">{t(lang, "article")}</option>
            <option value="post">{t(lang, "post")}</option>
          </select>
        </label>
        <label className="text-sm">{t(lang, "type")}
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-2">
            <option value="standard">{t(lang, "standard")}</option>
            <option value="premium">{t(lang, "premium")}</option>
            <option value="scientific">{t(lang, "scientific")}</option>
          </select>
        </label>
        <label className="text-sm">{t(lang, "category")}
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-2">
            {categories.map((cat) => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
          </select>
        </label>
      </div>
      <label className="block text-sm">{t(lang, "group")}
        <input value={form.groupKey} onChange={(e) => setForm({ ...form, groupKey: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" list="groups" />
        <span className="mt-1 block text-xs text-muted">{t(lang, "groupHint")}</span>
      </label>
      <datalist id="groups">
        {boot.groups.map((group) => <option key={group.key} value={group.key}>{group.title}</option>)}
      </datalist>
      <fieldset>
        <legend className="text-sm">{t(lang, "image")}</legend>
        <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {MEDIA.map((item) => (
            <button type="button" key={item.src} onClick={() => setForm({ ...form, image: item.src })} className={form.image === item.src ? "border-2 border-crimson" : "border border-rule"}>
              <img src={item.src} alt={item.label} className="aspect-news w-full object-cover" />
            </button>
          ))}
        </div>
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="mt-2 h-11 w-full border border-rule bg-sheet px-3 text-sm" />
      </fieldset>
      <label className="block text-sm">{t(lang, "caption")}
        <input value={form.imageCaption} onChange={(e) => setForm({ ...form, imageCaption: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm">{t(lang, "upload")}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-1 block w-full text-sm" onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void sendFile(file).then((saved) => setForm((current) => ({ ...current, image: saved.url }))).catch((err: Error) => setError(err.message));
          }} />
        </label>
        <label className="text-sm">PDF
          <input type="file" accept="application/pdf" className="mt-1 block w-full text-sm" onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void sendFile(file).then((saved) => setForm((current) => ({ ...current, files: [...current.files, saved] }))).catch((err: Error) => setError(err.message));
          }} />
        </label>
      </div>
      {form.files.length > 0 ? (
        <ul className="space-y-1 text-sm">
          {form.files.map((file) => (
            <li key={file.url} className="flex items-center justify-between gap-3">
              <a href={file.url} className="underline">{file.name}</a>
              <button type="button" className="text-crimson" onClick={() => setForm((current) => ({ ...current, files: current.files.filter((item) => item.url !== file.url) }))}>×</button>
            </li>
          ))}
        </ul>
      ) : null}
      <label className="block text-sm">{t(lang, "tagsHint")}
        <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
      </label>
      <fieldset className="border border-rule bg-sheet p-3">
        <Check
          label={t(lang, "onReaders")}
          on={form.zones.includes("readers")}
          toggle={() => setForm((current) => ({ ...current, zones: current.zones.includes("readers") ? [] : ["readers"] }))}
        />
        <p className="mt-2 text-xs text-muted">{t(lang, "readerArticles")}</p>
      </fieldset>
      <fieldset className="grid gap-2 sm:grid-cols-2">
        <legend className="mb-2 text-sm font-semibold">{t(lang, "onHome")}</legend>
        <Check label={t(lang, "onHero")} on={form.zones.includes("hero")} toggle={() => toggle("hero")} />
        <Check label={t(lang, "onLead")} on={form.zones.includes("lead")} toggle={() => toggle("lead")} />
        <Check label={t(lang, "onHome")} on={form.zones.includes("latest")} toggle={() => toggle("latest")} />
        <Check label={t(lang, "onSidebar")} on={form.zones.includes("sidebar")} toggle={() => toggle("sidebar")} />
        {categories.map((cat) => (
          <Check key={cat.slug} label={`${t(lang, "sectionPlace")}: ${cat.name}`} on={form.zones.includes(`section:${cat.slug}`)} toggle={() => toggle(`section:${cat.slug}`)} />
        ))}
      </fieldset>
      <BlockEditor lang={form.lang} value={form.body} onChange={(body) => setForm({ ...form, body })} />
      <fieldset className="space-y-2">
        <legend className="text-sm">{t(lang, "references")}</legend>
          <p className="text-xs text-muted">{t(lang, "refsHint")}</p>
          {form.refs.map((ref, index) => (
            <div key={index} className="grid gap-2 sm:grid-cols-4">
              {(["authors", "year", "title", "source"] as const).map((key) => (
                <input key={key} value={ref[key]} placeholder={key} onChange={(e) => {
                  const refs = form.refs.slice();
                  refs[index] = { ...ref, [key]: e.target.value };
                  setForm({ ...form, refs });
                }} className="h-10 border border-rule bg-sheet px-2 text-sm" />
              ))}
            </div>
          ))}
          <button type="button" className="text-sm underline" onClick={() => setForm({ ...form, refs: [...form.refs, emptyRef()] })}>+</button>
        </fieldset>
      {canPublish ? (
        <label className="block text-sm">{t(lang, "note")}
          <textarea value={form.reviewNote} onChange={(e) => setForm({ ...form, reviewNote: e.target.value })} className="mt-1 h-20 w-full border border-rule bg-sheet px-3 py-2" />
        </label>
      ) : null}
      {message ? <p className="text-sm">{message}</p> : null}
      {error ? <p className="text-sm text-crimson">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <button type="button" disabled={form.locked} className="h-11 border border-ink px-4 text-sm" onClick={() => submit("draft")}>{t(lang, "saveDraft")}</button>
        <button type="button" disabled={form.locked} className="h-11 border border-ink px-4 text-sm" onClick={() => submit("review")}>{t(lang, "submitReview")}</button>
        {canPublish ? <button type="button" className="h-11 bg-crimson px-4 text-sm font-semibold text-on-mast" onClick={() => submit("publish")}>{t(lang, "publish")}</button> : null}
        {canPublish ? <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => submit("reject")}>{t(lang, "reject")}</button> : null}
      </div>
    </form>
  );
}

function Check({ label, on, toggle }: { label: string; on: boolean; toggle: () => void }) {
  return (
    <label className="flex min-h-11 items-center gap-2 text-sm">
      <input type="checkbox" checked={on} onChange={toggle} className="size-4" />
      {label}
    </label>
  );
}

export function ReviewScreen() {
  const { boot, lang } = useDesk();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listDeskStories>>>([]);
  useEffect(() => { listDeskStories().then(setRows).catch(() => undefined); }, []);
  if (!boot || (boot.role !== "editor" && boot.role !== "superadmin")) return <p>{t(lang, "noAccess")}</p>;
  const queue = rows.filter((row) => row.status === "review");
  return (
    <section>
      <h1 className="font-serif text-4xl">{t(lang, "reviewQueue")}</h1>
      {queue.length === 0 ? <p className="mt-6 text-muted">{t(lang, "empty")}</p> : (
        <ul className="mt-6 divide-y divide-rule">
          {queue.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <Link to="/desk/edit/$id" params={{ id: String(row.id) }} className="font-serif text-2xl hover:text-crimson">{row.title}</Link>
                <p className="text-sm text-muted">{row.lang} · {row.authorName}</p>
              </div>
              <Link to="/desk/edit/$id" params={{ id: String(row.id) }} className="inline-flex h-11 items-center border border-ink px-4 text-sm">{t(lang, "reviewQueue")}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export function ProfileScreen() {
  const { lang, reload } = useDesk();
  const [form, setForm] = useState({ displayName: "", title: "", location: "", languages: "", email: "", bio: "", education: "", experience: "", slug: "" });
  const [message, setMessage] = useState("");
  useEffect(() => {
    myProfile({ data: lang }).then((row) => { if (row) setForm(row); }).catch(() => undefined);
  }, [lang]);
  return (
    <form className="mx-auto max-w-2xl space-y-3" onSubmit={async (event) => {
      event.preventDefault();
      const saved = await saveProfile({ data: { ...form, lang } });
      setForm({ ...form, slug: saved.slug });
      setMessage(t(lang, "saved"));
      reload();
    }}>
      <h1 className="font-serif text-4xl">{t(lang, "profile")}</h1>
      <p className="text-sm text-muted">{t(lang, "lineHint")}</p>
      {(["displayName", "title", "location", "languages", "email"] as const).map((key) => (
        <label key={key} className="block text-sm">{t(lang, key === "displayName" ? "name" : key === "title" ? "title" : key === "email" ? "email" : key === "location" ? "location" : "spoken")}
          <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
        </label>
      ))}
      <label className="block text-sm">{t(lang, "bio")}
        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-1 h-28 w-full border border-rule bg-sheet px-3 py-2" />
      </label>
      <label className="block text-sm">{t(lang, "education")}
        <textarea value={form.education} onChange={(e) => setForm({ ...form, education: e.target.value })} className="mt-1 h-24 w-full border border-rule bg-sheet px-3 py-2" />
      </label>
      <label className="block text-sm">{t(lang, "experience")}
        <textarea value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="mt-1 h-24 w-full border border-rule bg-sheet px-3 py-2" />
      </label>
      <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{t(lang, "save")}</button>
      {message ? <p className="text-sm">{message}</p> : null}
      {form.slug ? <Link to="/author/$slug" params={{ slug: form.slug }} className="block text-sm underline">{t(lang, "viewSite")}</Link> : null}
    </form>
  );
}

export function PeopleScreen() {
  const { boot, lang, reload } = useDesk();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listPeople>>>([]);
  const [error, setError] = useState("");
  useEffect(() => { listPeople().then(setRows).catch((err: Error) => setError(err.message)); }, []);
  if (!boot || boot.role !== "superadmin") return <p>{t(lang, "noAccess")}</p>;
  return (
    <section>
      <h1 className="font-serif text-4xl">{t(lang, "people")}</h1>
      <p className="mt-2 text-sm text-muted">{t(lang, "firstAdmin")}</p>
      {error ? <p className="mt-3 text-sm text-crimson">{error}</p> : null}
      <ul className="mt-6 divide-y divide-rule">
        {rows.map((row) => (
          <PersonRow key={row.id} row={row} lang={lang} onDone={async () => { reload(); setRows(await listPeople()); }} onError={setError} />
        ))}
      </ul>
    </section>
  );
}

function PersonRow({
  row,
  lang,
  onDone,
  onError,
}: {
  row: { id: string; name: string; role: string; slug: string; staff: boolean };
  lang: string;
  onDone: () => Promise<void>;
  onError: (message: string) => void;
}) {
  const [names, setNames] = useState(() => {
    let obj: Record<string, string> = {};
    const raw = row.name.trim();
    if (raw.startsWith("{")) {
      try { obj = JSON.parse(raw) as Record<string, string>; } catch { obj = { ckb: row.name }; }
    } else if (raw) obj = { ckb: raw };
    return { ckb: obj.ckb || "", kmr: obj.kmr || "", en: obj.en || "", he: obj.he || "" };
  });
  const [role, setRole] = useState(row.role);
  const fields = [
    ["ckb", "کوردی ناوین"],
    ["kmr", "Kurdî Jorîn"],
    ["en", "English"],
    ["he", "עברית"],
  ] as const;
  return (
    <li className="grid gap-3 py-4">
      <div className="grid gap-2 sm:grid-cols-2">
        {fields.map(([key, label]) => (
          <label key={key} className="text-sm">
            {label}
            <input
              value={names[key]}
              dir={key === "ckb" || key === "he" ? "rtl" : "ltr"}
              onChange={(event) => setNames({ ...names, [key]: event.target.value })}
              className="mt-1 h-11 w-full border border-rule bg-sheet px-3"
            />
          </label>
        ))}
      </div>
      <div className="flex flex-wrap items-end gap-2">
        <label className="text-sm">
          {t(lang, "role")}
          <select value={role} onChange={(event) => setRole(event.target.value)} className="mt-1 h-11 border border-rule bg-sheet px-2">
            {["pending", "reader", "writer", "editor", "superadmin"].map((item) => (
              <option key={item} value={item}>{roleLabel(lang, item)}</option>
            ))}
          </select>
        </label>
        <button type="button" className="h-11 border border-ink px-4 text-sm" onClick={() => {
          onError("");
          void savePerson({ data: { id: row.id, names, role } }).then(onDone).catch((err: Error) => onError(err.message));
        }}>{t(lang, "save")}</button>
        <button type="button" className="h-11 border border-crimson px-4 text-sm text-crimson" onClick={() => {
          if (!window.confirm(names.ckb || names.en)) return;
          onError("");
          void deletePerson({ data: row.id }).then(onDone).catch((err: Error) => onError(err.message));
        }}>{lang === "ckb" ? "سڕینەوە" : lang === "kmr" ? "Jê bibe" : "Delete"}</button>
      </div>
    </li>
  );
}

export function LayoutScreen() {
  const { boot, lang, reload } = useDesk();
  const [form, setForm] = useState(boot?.layout);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => { if (boot?.layout) setForm(boot.layout); }, [boot]);
  if (!boot || boot.role !== "superadmin" || !form) return <p>{t(lang, "noAccess")}</p>;
  const order = form.sections.length ? form.sections : boot.categories.map((cat) => cat.slug);
  function move(slug: string, dir: -1 | 1) {
    const next = order.slice();
    const index = next.indexOf(slug);
    const target = index + dir;
    if (index < 0 || target < 0 || target >= next.length) return;
    const [item] = next.splice(index, 1);
    if (!item) return;
    next.splice(target, 0, item);
    setForm({ ...form!, sections: next });
  }
  const toggles = [
    ["topbar", "topbar"],
    ["tagline", "tagline"],
    ["wire", "wire"],
    ["political", "political"],
    ["hero", "hero"],
    ["lead", "lead"],
    ["latest", "latest"],
    ["sidebar", "sidebar"],
    ["footer", "footer"],
  ] as const;
  const labels: Record<string, string> = {
    topbar: lang === "ckb" ? "توپبار" : "Top bar",
    tagline: lang === "ckb" ? "هێڵی ژێر ناو" : "Tagline",
    wire: lang === "ckb" ? "ویجێتی هەواڵ" : "Wire widget",
    political: lang === "ckb" ? "ویجێتی سیاسی" : "Political strip",
    hero: lang === "ckb" ? "هێرۆ" : "Hero",
    lead: lang === "ckb" ? "سەرەکی" : "Lead",
    latest: lang === "ckb" ? "دوایین" : "Latest",
    sidebar: lang === "ckb" ? "سایدبار" : "Sidebar",
    footer: lang === "ckb" ? "فووتەر" : "Footer",
  };
  return (
    <section className="max-w-3xl">
      <h1 className="font-serif text-4xl">{t(lang, "layout")}</h1>
      <p className="mt-2 text-sm text-muted">{lang === "ckb" ? "توپبار، هێدەر، ویجێت، هێرۆ، سێکشن و فووتەر." : "Top bar, header, widgets, hero, sections and footer."}</p>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">
        {toggles.map(([key]) => (
          <label key={key} className="flex min-h-11 items-center gap-2 border border-rule bg-sheet px-3 text-sm">
            <input type="checkbox" checked={Boolean(form[key])} onChange={() => setForm({ ...form, [key]: !form[key] })} />
            {labels[key]}
          </label>
        ))}
      </div>
      <h2 className="mt-8 font-serif text-2xl">{t(lang, "sections")}</h2>
      <ol className="mt-3 divide-y divide-rule border border-rule">
        {order.map((slug) => {
          const cat = boot.categories.find((item) => item.slug === slug);
          const style = (form.styles ?? {})[slug] ?? "";
          return (
            <li key={slug} className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
              <span>{cat ? loc(cat.name, lang) : slug}</span>
              <span className="flex flex-wrap gap-2">
                <select value={style} className="h-10 border border-rule bg-paper px-2 text-sm" onChange={(event) => setForm({ ...form, styles: { ...(form.styles ?? {}), [slug]: event.target.value } })}>
                  <option value="">{lang === "ckb" ? "خۆکار" : "Automatic"}</option>
                  <option value="national">{lang === "ckb" ? "نەتەوەیی" : "National"}</option>
                  <option value="lead">{lang === "ckb" ? "سەرەکی" : "Lead"}</option>
                  <option value="opinion">{lang === "ckb" ? "بۆچوون" : "Opinion"}</option>
                  <option value="grid">{lang === "ckb" ? "تۆڕ" : "Grid"}</option>
                  <option value="brief">{lang === "ckb" ? "کورت" : "Briefs"}</option>
                </select>
                <button type="button" className="h-10 border border-rule px-3" onClick={() => move(slug, -1)}>↑</button>
                <button type="button" className="h-10 border border-rule px-3" onClick={() => move(slug, 1)}>↓</button>
              </span>
            </li>
          );
        })}
      </ol>
      <button type="button" className="mt-6 h-11 bg-ink px-4 text-sm text-paper" onClick={() => {
        setError("");
        void saveLayout({ data: { ...form, sections: order } }).then(() => { setMessage(t(lang, "saved")); reload(); }).catch((err: Error) => setError(err.message));
      }}>{t(lang, "save")}</button>
      {message ? <p className="mt-3 text-sm">{message}</p> : null}
      {error ? <p className="mt-3 text-sm text-crimson">{error}</p> : null}
    </section>
  );
}

export function TaxonomyScreen() {
  const { boot, lang, reload } = useDesk();
  const [kind, setKind] = useState("category");
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  if (!boot || (boot.role !== "editor" && boot.role !== "superadmin")) return <p>{t(lang, "noAccess")}</p>;
  return (
    <section className="max-w-2xl">
      <h1 className="font-serif text-4xl">{t(lang, "taxonomy")}</h1>
      <form className="mt-6 space-y-3" onSubmit={async (event) => {
        event.preventDefault();
        await saveTaxon({ data: { kind, slug, name, lang } });
        setMessage(t(lang, "saved"));
        setSlug("");
        setName("");
        reload();
      }}>
        <select value={kind} onChange={(e) => setKind(e.target.value)} className="h-11 w-full border border-rule bg-sheet px-2">
          <option value="category">{t(lang, "category")}</option>
          <option value="tag">{t(lang, "hashtags")}</option>
        </select>
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder={t(lang, "slug")} className="h-11 w-full border border-rule bg-sheet px-3" />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t(lang, "name")} className="h-11 w-full border border-rule bg-sheet px-3" />
        <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{t(lang, "save")}</button>
        {message ? <p className="text-sm">{message}</p> : null}
      </form>
      <ul className="mt-8 space-y-2 text-sm">
        {boot.categories.map((cat) => <li key={cat.slug}>{cat.slug} — {loc(cat.name, lang)}</li>)}
        {boot.tags.map((tag) => <li key={tag.slug}>#{tag.slug} — {loc(tag.name, lang)}</li>)}
      </ul>
    </section>
  );
}

export function AppearanceScreen() {
  const { boot, lang, reload } = useDesk();
  const [theme, setTheme] = useState(boot?.theme ?? "classic");
  const [logo, setLogo] = useState(boot?.logo ?? "");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (boot) {
      setTheme(boot.theme);
      setLogo(boot.logo);
    }
  }, [boot]);
  if (!boot || boot.role !== "superadmin") return <p>{t(lang, "noAccess")}</p>;
  return (
    <form className="max-w-xl space-y-4" onSubmit={async (event) => {
      event.preventDefault();
      await saveAppearance({ data: { theme, logo } });
      setMessage(t(lang, "saved"));
      reload();
      window.location.reload();
    }}>
      <h1 className="font-serif text-4xl">{t(lang, "appearance")}</h1>
      <div className="grid gap-3 sm:grid-cols-3">
        {(["classic", "night", "warm"] as const).map((item) => (
          <button type="button" key={item} onClick={() => setTheme(item)} className={theme === item ? "border-2 border-crimson bg-sheet p-4 text-start" : "border border-rule bg-sheet p-4 text-start"}>
            <span className="block font-serif text-2xl">Aa</span>
            <span className="text-sm">{t(lang, item === "classic" ? "classic" : item === "night" ? "night" : "warm")}</span>
          </button>
        ))}
      </div>
      <label className="block text-sm">{t(lang, "logo")}
        <input value={logo} onChange={(e) => setLogo(e.target.value)} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
        <span className="mt-1 block text-xs text-muted">{t(lang, "logoHint")}</span>
      </label>
      <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{t(lang, "save")}</button>
      {message ? <p className="text-sm">{message}</p> : null}
      <fieldset className="border border-rule p-4">
        <legend className="px-2 text-sm font-semibold">{lang === "ckb" ? "زمانەکان" : lang === "kmr" ? "Ziman" : "Languages"}</legend>
        <p className="mb-3 text-sm text-muted">
          {lang === "ckb" ? "عەرەبی، فارسی و تورکی لە سەرەتادا ناچالاکن. دەتوانیت دواتر چالاکیان بکەیت." : "Arabic, Persian and Turkish start off. Turn them on here when you want them."}
        </p>
        <LangToggles lang={lang} enabled={boot.enabledLangs} onSave={async (ids) => { await saveEnabledLangs({ data: ids }); reload(); window.location.reload(); }} />
      </fieldset>
    </form>
  );
}

function LangToggles({
  enabled,
  onSave,
}: {
  lang: string;
  enabled: string[];
  onSave: (ids: string[]) => Promise<void>;
}) {
  const [ids, setIds] = useState(enabled);
  useEffect(() => { setIds(enabled); }, [enabled]);
  return (
    <div className="space-y-2">
      {LANGS.map((item) => (
        <label key={item.id} className="flex min-h-10 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={ids.includes(item.id)}
            disabled={item.id === "ckb"}
            onChange={() => {
              setIds((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id]);
            }}
          />
          {item.label}
        </label>
      ))}
      <button type="button" className="h-10 border border-ink px-3 text-sm" onClick={() => onSave(ids.includes("ckb") ? ids : ["ckb", ...ids])}>
        OK
      </button>
    </div>
  );
}

export function PluginScreen() {
  const { boot, lang, reload } = useDesk();
  if (!boot || boot.role !== "superadmin") return <p>{t(lang, "noAccess")}</p>;
  return (
    <section className="max-w-2xl">
      <h1 className="font-serif text-4xl">{t(lang, "plugins")}</h1>
      <ul className="mt-6 divide-y divide-rule">
        {PLUGIN_CATALOG.map((plugin) => {
          const on = boot.plugins.find((item) => item.slug === plugin.slug)?.enabled ?? false;
          return (
            <li key={plugin.slug} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-semibold">{plugin.slug}</p>
                <p className="text-sm text-muted">{t(lang, plugin.key)}</p>
              </div>
              <button
                type="button"
                className={on ? "h-11 bg-ink px-4 text-sm text-paper" : "h-11 border border-rule px-4 text-sm"}
                onClick={async () => {
                  await setPlugin({ data: { slug: plugin.slug, enabled: !on } });
                  reload();
                }}
              >
                {on ? t(lang, "enabled") : t(lang, "close")}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function PagesScreen() {
  const { boot, lang } = useDesk();
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listPages>>>([]);
  const [form, setForm] = useState({ id: 0, slug: "", lang, title: "", body: "", status: "published" });
  const [message, setMessage] = useState("");
  useEffect(() => { listPages().then(setRows).catch(() => undefined); }, []);
  if (!boot || (boot.role !== "editor" && boot.role !== "superadmin")) return <p>{t(lang, "noAccess")}</p>;
  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl">{t(lang, "pages")}</h1>
        <ul className="mt-4 divide-y divide-rule">
          {rows.map((row) => (
            <li key={row.id}>
              <button type="button" className="w-full py-3 text-start" onClick={() => setForm(row)}>
                <span className="font-serif text-xl">{row.title}</span>
                <span className="mt-1 block text-sm text-muted">/{row.slug} · {row.lang}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form className="space-y-3" onSubmit={async (event) => {
        event.preventDefault();
        await savePage({ data: form });
        setMessage(t(lang, "saved"));
        setRows(await listPages());
      }}>
        <h2 className="font-serif text-2xl">{form.id ? form.title : t(lang, "pages")}</h2>
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder={t(lang, "slug")} className="h-11 w-full border border-rule bg-sheet px-3" />
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t(lang, "title")} className="h-11 w-full border border-rule bg-sheet px-3" />
        <select value={form.lang} onChange={(e) => setForm({ ...form, lang: e.target.value })} className="h-11 w-full border border-rule bg-sheet px-2">
          {(boot.enabledLangs.length ? LANGS.filter((item) => boot.enabledLangs.includes(item.id)) : LANGS).map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <BlockEditor lang={form.lang} value={form.body} onChange={(body) => setForm({ ...form, body })} />
        <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{t(lang, "save")}</button>
        {message ? <p className="text-sm">{message}</p> : null}
      </form>
    </section>
  );
}
