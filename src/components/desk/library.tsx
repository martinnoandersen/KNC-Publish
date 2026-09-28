import { useEffect, useState } from "react";
import { deleteLibrary, listLibrary, saveLibrary, uploadAsset } from "@/lib/content/desk-api";
import { LANGS } from "@/lib/i18n";
import { useDesk } from "./ui";

type Row = Awaited<ReturnType<typeof listLibrary>>[number];

const empty = (kind: "book" | "magazine"): Row => ({
  id: 0, kind, lang: "ckb", title: "", dek: "", year: "2026", cover: "", url: "", issue: "",
});

async function sendFile(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return uploadAsset({ data: { name: file.name, mime: file.type || "application/pdf", data: btoa(binary) } });
}

export function LibraryScreen({ kind }: { kind: "book" | "magazine" }) {
  const { boot, lang } = useDesk();
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>(empty(kind));
  const [error, setError] = useState("");
  const magazine = kind === "magazine";
  const title = magazine
    ? (lang === "ckb" ? "گۆڤاری کۆنگرە" : lang === "kmr" ? "Kovara Kongre" : "Kongre magazine")
    : (lang === "ckb" ? "پەرتووک" : lang === "kmr" ? "Pirtûk" : lang === "he" ? "ספרים" : "Books");

  function load() {
    listLibrary({ data: kind }).then(setRows).catch((err: Error) => setError(err.message));
  }
  useEffect(load, [kind]);

  if (!boot || (boot.role !== "editor" && boot.role !== "superadmin")) return <p>…</p>;

  return (
    <section className="grid gap-8 xl:grid-cols-12">
      <div className="xl:col-span-7">
        <h1 className="font-serif text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-muted">
          {magazine
            ? (lang === "ckb" ? "ناوی گۆڤارەکە کۆنگرەیە. هەر ژمارەیەک لێرە دەخرێتەوە." : "The magazine is named Kongre. Each issue is entered here.")
            : (lang === "ckb" ? "پەرتووکی کۆنگرە: ناونیشان، پوختە، ساڵ، بەرگ و PDF." : "Congress books: title, summary, year, cover and PDF.")}
        </p>
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {rows.map((row) => (
            <li key={row.id} className="flex items-center justify-between gap-3 py-3">
              <button type="button" className="text-start" onClick={() => setForm(row)}>
                <span className="block font-serif text-xl">{magazine ? `${row.issue} · ${row.title}` : row.title}</span>
                <span className="text-sm text-muted">{row.lang} · {row.year}</span>
              </button>
              <button type="button" className="text-sm text-crimson" onClick={() => {
                void deleteLibrary({ data: row.id }).then(load).catch((err: Error) => setError(err.message));
              }}>{lang === "ckb" ? "سڕینەوە" : "Delete"}</button>
            </li>
          ))}
        </ul>
      </div>
      <form className="space-y-3 border border-rule bg-sheet p-4 xl:col-span-5" onSubmit={(event) => event.preventDefault()}>
        <h2 className="font-serif text-2xl">{form.id ? form.title : (lang === "ckb" ? "نوێ" : "New")}</h2>
        {magazine ? (
          <label className="block text-sm">{lang === "ckb" ? "ژمارە" : "Issue"}
            <input value={form.issue} onChange={(event) => setForm({ ...form, issue: event.target.value })} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
          </label>
        ) : null}
        <label className="block text-sm">{lang === "ckb" ? "ناونیشان" : "Title"}
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
        </label>
        <label className="block text-sm">{lang === "ckb" ? "پوختە" : "Summary"}
          <textarea value={form.dek} onChange={(event) => setForm({ ...form, dek: event.target.value })} className="mt-1 h-24 w-full border border-rule bg-paper px-3 py-2" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">{lang === "ckb" ? "ساڵ" : "Year"}
            <input value={form.year} onChange={(event) => setForm({ ...form, year: event.target.value })} className="mt-1 h-11 w-full border border-rule bg-paper px-3" />
          </label>
          <label className="text-sm">{lang === "ckb" ? "زمان" : "Language"}
            <select value={form.lang} onChange={(event) => setForm({ ...form, lang: event.target.value })} className="mt-1 h-11 w-full border border-rule bg-paper px-2">
              {LANGS.filter((item) => boot.enabledLangs.includes(item.id) || item.id === form.lang).map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block text-sm">PDF
          <input type="file" accept="application/pdf" className="mt-1 block w-full text-sm" onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void sendFile(file).then((saved) => setForm((current) => ({ ...current, url: saved.url }))).catch((err: Error) => setError(err.message));
          }} />
          <input value={form.url} onChange={(event) => setForm({ ...form, url: event.target.value })} className="mt-2 h-11 w-full border border-rule bg-paper px-3 text-sm" />
        </label>
        <label className="block text-sm">{lang === "ckb" ? "بەرگ" : "Cover"}
          <input type="file" accept="image/jpeg,image/png,image/webp" className="mt-1 block w-full text-sm" onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void sendFile(file).then((saved) => setForm((current) => ({ ...current, cover: saved.url }))).catch((err: Error) => setError(err.message));
          }} />
          <input value={form.cover} onChange={(event) => setForm({ ...form, cover: event.target.value })} className="mt-2 h-11 w-full border border-rule bg-paper px-3 text-sm" />
        </label>
        {error ? <p className="text-sm text-crimson">{error}</p> : null}
        <div className="flex gap-2">
          <button type="button" className="h-11 bg-ink px-4 text-sm text-paper" onClick={() => {
            setError("");
            void saveLibrary({ data: { ...form, kind } }).then(() => { setForm(empty(kind)); load(); }).catch((err: Error) => setError(err.message));
          }}>{lang === "ckb" ? "پاشەکەوت" : "Save"}</button>
          <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => setForm(empty(kind))}>{lang === "ckb" ? "پاککردنەوە" : "Clear"}</button>
        </div>
      </form>
    </section>
  );
}
