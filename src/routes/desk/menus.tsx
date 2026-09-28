import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LANGS } from "@/lib/i18n";
import { deleteMenuItem, listMenu, saveMenuItem } from "@/lib/content/desk-api";
import { useDesk } from "@/components/desk/ui";

export const Route = createFileRoute("/desk/menus")({
  component: MenuScreen,
});

function MenuScreen() {
  const { boot, lang } = useDesk();
  const [menuLang, setMenuLang] = useState(lang);
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listMenu>>>([]);
  const [form, setForm] = useState({ id: 0, label: "", href: "/", parentId: 0, sort: 10, mega: false });
  const [error, setError] = useState("");
  const choices = boot?.enabledLangs?.length ? LANGS.filter((item) => boot.enabledLangs.includes(item.id)) : LANGS;

  function load(next = menuLang) {
    listMenu({ data: next }).then(setRows).catch(() => setRows([]));
  }
  useEffect(() => { load(menuLang); }, [menuLang]);

  if (!boot || (boot.role !== "editor" && boot.role !== "superadmin")) return <p>…</p>;
  const tops = rows.filter((row) => !row.parent_id);
  return (
    <section className="grid gap-8 lg:grid-cols-2">
      <div>
        <h1 className="font-serif text-4xl">{lang === "ckb" ? "مێنوو" : "Menus"}</h1>
        <p className="mt-2 text-sm text-muted">
          {lang === "ckb"
            ? "هەر زمانێک مێنووی خۆی هەیە. ئەگەر منداڵی هەبێت، دەبێتە مێگا مێنوو."
            : "Each language has its own menu. An item with children becomes a mega menu."}
        </p>
        <label className="mt-4 block text-sm">
          <select value={menuLang} onChange={(event) => setMenuLang(event.target.value)} className="mt-1 h-11 border border-rule bg-sheet px-2">
            {choices.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {rows.map((row) => (
            <li key={row.id} className="flex flex-wrap items-center gap-2 py-3">
              <button type="button" className="text-start" onClick={() => setForm({ id: row.id, label: row.label, href: row.href, parentId: row.parent_id ?? 0, sort: row.sort, mega: Boolean(row.mega) })}>
                <span className="font-serif text-xl">{row.parent_id ? "— " : ""}{row.label}</span>
                <span className="mt-1 block text-xs text-muted">{row.href}{row.mega ? " · mega" : ""}</span>
              </button>
              <button type="button" className="ms-auto h-9 border border-rule px-3 text-sm text-crimson" onClick={async () => { await deleteMenuItem({ data: row.id }); load(); }}>
                {lang === "ckb" ? "سڕینەوە" : "Delete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form className="space-y-3" onSubmit={async (event) => {
        event.preventDefault();
        setError("");
        try {
          await saveMenuItem({ data: { ...form, lang: menuLang } });
          setForm({ id: 0, label: "", href: "/", parentId: 0, sort: form.sort + 1, mega: false });
          load();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Error");
        }
      }}>
        <h2 className="font-serif text-2xl">{form.id ? form.label : (lang === "ckb" ? "بەندی نوێ" : "New item")}</h2>
        <input value={form.label} onChange={(event) => setForm({ ...form, label: event.target.value })} placeholder={lang === "ckb" ? "ناو" : "Label"} className="h-11 w-full border border-rule bg-sheet px-3" />
        <input value={form.href} onChange={(event) => setForm({ ...form, href: event.target.value })} placeholder="/section/politics" className="h-11 w-full border border-rule bg-sheet px-3" />
        <label className="block text-sm">{lang === "ckb" ? "سەرەوە" : "Parent"}
          <select value={form.parentId} onChange={(event) => setForm({ ...form, parentId: Number(event.target.value) })} className="mt-1 h-11 w-full border border-rule bg-sheet px-2">
            <option value={0}>{lang === "ckb" ? "بەندێکی سەرەکی" : "Top level"}</option>
            {tops.filter((row) => row.id !== form.id).map((row) => <option key={row.id} value={row.id}>{row.label}</option>)}
          </select>
        </label>
        <label className="block text-sm">{lang === "ckb" ? "ڕیز" : "Order"}
          <input type="number" value={form.sort} onChange={(event) => setForm({ ...form, sort: Number(event.target.value) })} className="mt-1 h-11 w-full border border-rule bg-sheet px-3" />
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={form.mega} onChange={(event) => setForm({ ...form, mega: event.target.checked })} />
          {lang === "ckb" ? "مێگا مێنوو" : "Mega menu"}
        </label>
        {error ? <p className="text-sm text-crimson">{error}</p> : null}
        <div className="flex gap-2">
          <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{lang === "ckb" ? "پاشەکەوت" : "Save"}</button>
          <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => setForm({ id: 0, label: "", href: "/", parentId: 0, sort: 10, mega: false })}>
            {lang === "ckb" ? "نوێ" : "New"}
          </button>
        </div>
      </form>
    </section>
  );
}
