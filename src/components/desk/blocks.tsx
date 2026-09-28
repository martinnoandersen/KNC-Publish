import { useEffect, useRef, useState } from "react";
import { emptyBlock, parseBlocks, serializeBlocks, type Block } from "@/lib/content/blocks";

const TYPES: { id: Block["type"]; ckb: string; en: string; kmr: string }[] = [
  { id: "p", ckb: "پەرەگراف", en: "Paragraph", kmr: "Paragraf" },
  { id: "h", ckb: "سەردێڕ", en: "Heading", kmr: "Sernav" },
  { id: "quote", ckb: "دەقە بەرز", en: "Quote", kmr: "Gotin" },
  { id: "list", ckb: "لیست", en: "List", kmr: "Lîste" },
  { id: "image", ckb: "وێنە", en: "Image", kmr: "Wêne" },
  { id: "hr", ckb: "هێڵ", en: "Divider", kmr: "Xêz" },
];

function label(lang: string, id: Block["type"]) {
  const row = TYPES.find((item) => item.id === id);
  if (!row) return id;
  if (lang === "ckb") return row.ckb;
  if (lang === "kmr") return row.kmr;
  return row.en;
}

export function BlockEditor({
  lang,
  value,
  onChange,
}: {
  lang: string;
  value: string;
  onChange: (next: string) => void;
}) {
  const [blocks, setBlocks] = useState<Block[]>(() => parseBlocks(value));
  const [source, setSource] = useState(false);
  const [raw, setRaw] = useState(value);
  const synced = useRef(value);

  useEffect(() => {
    if (value === synced.current) return;
    synced.current = value;
    setBlocks(parseBlocks(value));
    setRaw(value);
  }, [value]);

  function commit(next: Block[]) {
    setBlocks(next);
    const text = serializeBlocks(next);
    synced.current = text;
    setRaw(text);
    onChange(text);
  }

  function update(id: string, patch: Partial<Block>) {
    commit(blocks.map((block) => (block.id === id ? ({ ...block, ...patch } as Block) : block)));
  }

  function insert(index: number, type: Block["type"]) {
    const next = blocks.slice();
    next.splice(index, 0, emptyBlock(type));
    commit(next);
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = blocks.slice();
    const [item] = next.splice(index, 1);
    if (!item) return;
    next.splice(target, 0, item);
    commit(next);
  }

  function remove(id: string) {
    const next = blocks.filter((block) => block.id !== id);
    commit(next.length ? next : [emptyBlock("p")]);
  }

  if (source) {
    return (
      <div className="border border-rule bg-sheet">
        <div className="flex items-center justify-between border-b border-rule px-3 py-2">
          <span className="text-xs font-semibold tracking-widest uppercase">{lang === "ckb" ? "سەرچاوە" : "Source"}</span>
          <button type="button" className="text-sm underline" onClick={() => { setSource(false); setBlocks(parseBlocks(raw)); }}>
            {lang === "ckb" ? "بلۆک" : "Blocks"}
          </button>
        </div>
        <textarea
          value={raw}
          onChange={(event) => {
            const text = event.target.value;
            synced.current = text;
            setRaw(text);
            onChange(text);
          }}
          className="h-96 w-full bg-sheet px-3 py-2 font-serif text-lg outline-none"
        />
      </div>
    );
  }

  return (
    <div className="border border-rule bg-paper">
      <div className="flex flex-wrap items-center gap-2 border-b border-rule bg-sheet px-3 py-2">
        <span className="text-xs font-semibold tracking-widest uppercase">{lang === "ckb" ? "دەستکاریکەری بلۆک" : "Block editor"}</span>
        <button type="button" className="ms-auto text-sm underline" onClick={() => setSource(true)}>
          {lang === "ckb" ? "سەرچاوە" : "Source"}
        </button>
      </div>
      <div className="space-y-3 p-3">
        <Inserter lang={lang} onPick={(type) => insert(0, type)} />
        {blocks.map((block, index) => (
          <div key={block.id}>
            <article className="border border-rule bg-sheet">
              <header className="flex flex-wrap items-center gap-2 border-b border-rule px-2 py-2">
                <select
                  value={block.type}
                  onChange={(event) => {
                    const type = event.target.value as Block["type"];
                    const fresh = emptyBlock(type);
                    if (type !== "hr" && type !== "image" && block.type !== "hr" && block.type !== "image" && "text" in block) {
                      commit(blocks.map((item) => (item.id === block.id ? { ...fresh, id: block.id, text: block.text } as Block : item)));
                    } else {
                      commit(blocks.map((item) => (item.id === block.id ? { ...fresh, id: block.id } : item)));
                    }
                  }}
                  className="h-9 border border-rule bg-paper px-2 text-sm"
                >
                  {TYPES.map((item) => <option key={item.id} value={item.id}>{label(lang, item.id)}</option>)}
                </select>
                <span className="text-xs text-muted">{index + 1}</span>
                <span className="ms-auto flex gap-1">
                  <button type="button" className="h-9 border border-rule px-2 text-sm" onClick={() => move(index, -1)} aria-label="up">↑</button>
                  <button type="button" className="h-9 border border-rule px-2 text-sm" onClick={() => move(index, 1)} aria-label="down">↓</button>
                  <button type="button" className="h-9 border border-rule px-2 text-sm text-crimson" onClick={() => remove(block.id)}>
                    {lang === "ckb" ? "سڕینەوە" : "Delete"}
                  </button>
                </span>
              </header>
              <div className="p-3">
                {block.type === "hr" ? <hr className="border-ink" /> : null}
                {block.type === "p" || block.type === "quote" || block.type === "list" ? (
                  <textarea
                    value={block.text}
                    rows={block.type === "p" ? 8 : 4}
                    onChange={(event) => update(block.id, { text: event.target.value })}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey && block.type === "p") {
                        event.preventDefault();
                        const el = event.currentTarget;
                        const at = el.selectionStart;
                        const before = block.text.slice(0, at);
                        const after = block.text.slice(at);
                        const fresh = emptyBlock("p");
                        if (fresh.type !== "p") return;
                        fresh.text = after.replace(/^\n/, "");
                        const next = blocks.slice();
                        next[index] = { ...block, text: before.replace(/\n$/, "") };
                        next.splice(index + 1, 0, fresh);
                        commit(next);
                      }
                    }}
                    placeholder={block.type === "list" ? (lang === "ckb" ? "هەر دێڕێک خاڵێکە" : "One item per line") : ""}
                    className="w-full border border-rule bg-paper px-3 py-2 font-serif text-lg outline-none"
                  />
                ) : null}
                {block.type === "h" ? (
                  <input
                    value={block.text}
                    onChange={(event) => update(block.id, { text: event.target.value })}
                    className="h-12 w-full border border-rule bg-paper px-3 font-serif text-2xl outline-none"
                  />
                ) : null}
                {block.type === "image" ? (
                  <div className="grid gap-2">
                    <input value={block.src} onChange={(event) => update(block.id, { src: event.target.value })} placeholder="/media/citadel.jpg" className="h-10 border border-rule bg-paper px-3 text-sm" />
                    <input value={block.alt} onChange={(event) => update(block.id, { alt: event.target.value })} placeholder={lang === "ckb" ? "ژێرنووس" : "Caption"} className="h-10 border border-rule bg-paper px-3 text-sm" />
                    {block.src.startsWith("/media/") || block.src.startsWith("https://") ? <img src={block.src} alt="" className="max-h-48 object-cover" /> : null}
                  </div>
                ) : null}
              </div>
            </article>
            <Inserter lang={lang} onPick={(type) => insert(index + 1, type)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Inserter({ lang, onPick }: { lang: string; onPick: (type: Block["type"]) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      <button type="button" className="h-8 border border-dashed border-rule px-3 text-sm" onClick={() => setOpen((value) => !value)}>
        + {lang === "ckb" ? "بلۆکی نوێ" : "New block"}
      </button>
      {open ? TYPES.map((item) => (
        <button
          key={item.id}
          type="button"
          className="h-8 border border-rule bg-sheet px-2 text-sm"
          onClick={() => { onPick(item.id); setOpen(false); }}
        >
          {label(lang, item.id)}
        </button>
      )) : null}
    </div>
  );
}
