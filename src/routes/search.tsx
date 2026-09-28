import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { searchStories } from "@/lib/content/public-api";
import { t } from "@/lib/i18n";
import type { FileItem, RefItem, StoryCard } from "@/lib/content/types";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 120) : "",
    section: typeof search.section === "string" ? search.section.slice(0, 48) : "",
    scope: typeof search.scope === "string" ? search.scope : "all",
  }),
  loaderDeps: ({ search }) => ({ q: search.q, section: search.section }),
  loader: ({ deps }) => searchStories({ data: deps }),
  component: function SearchPage() {
    const result = Route.useLoaderData();
    const { q, section, scope } = Route.useSearch();
    const boot = useBoot();
    const lang = boot.lang;
    const show = (name: string) => scope === "all" || scope === name;
    const total = result.stories.length + result.pages.length + result.people.length + result.books.length;
    return (
      <Site>
        <main className="mx-auto max-w-6xl px-4 py-8">
          <h1 className="font-serif text-4xl">{q ? `${t(lang, "resultsFor")} “${q}”` : t(lang, "search")}</h1>
          <p className="mt-2 text-sm text-muted">
            {q
              ? (lang === "ckb" ? `${total} ئەنجام لە وتار، لاپەڕە، خەڵک، پەرتووک و گۆڤار.` : `${total} results across articles, pages, people, books and the magazine.`)
              : (lang === "ckb" ? "لە ناو وتار، پوختە، دەق، سەرچاوە، خەڵک، پەرتووک و گۆڤاری کۆنگرە بگەڕێ." : "Search articles, summaries, text, people, books and the Kongre magazine.")}
          </p>
          <form className="mt-4 flex flex-wrap gap-2" onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const next = String(data.get("q") ?? "");
            const nextSection = String(data.get("section") ?? "");
            const nextScope = String(data.get("scope") ?? "all");
            window.location.assign(`/search?q=${encodeURIComponent(next)}&section=${encodeURIComponent(nextSection)}&scope=${encodeURIComponent(nextScope)}`);
          }}>
            <input name="q" defaultValue={q} className="h-11 min-w-64 flex-1 border border-ink bg-sheet px-3" />
            <select name="section" defaultValue={section} className="h-11 border border-rule bg-sheet px-2">
              <option value="">{lang === "ckb" ? "هەموو سێکشنەکان" : "All sections"}</option>
              {boot.categories.map((cat) => <option key={cat.slug} value={cat.slug}>{cat.name}</option>)}
            </select>
            <select name="scope" defaultValue={scope} className="h-11 border border-rule bg-sheet px-2">
              <option value="all">{lang === "ckb" ? "هەموو" : "All"}</option>
              <option value="stories">{lang === "ckb" ? "وتار" : "Articles"}</option>
              <option value="pages">{lang === "ckb" ? "لاپەڕە" : "Pages"}</option>
              <option value="people">{lang === "ckb" ? "خەڵک" : "People"}</option>
              <option value="books">{lang === "ckb" ? "پەرتووک" : "Books"}</option>
              <option value="magazine">{lang === "ckb" ? "کۆنگرە" : "Kongre"}</option>
            </select>
            <button type="submit" className="h-11 bg-ink px-4 text-sm text-paper">{t(lang, "search")}</button>
          </form>
          {show("stories") && result.stories.length > 0 ? (
            <section className="mt-8">
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{lang === "ckb" ? "وتار" : "Articles"}</h2>
              <ul className="mt-4 divide-y divide-rule">
                {result.stories.map((story) => (
                  <li key={story.id} className="py-4">
                    <p className="text-xs font-semibold text-crimson">{story.categoryName}</p>
                    <h3 className="mt-1 font-serif text-2xl">
                      <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{story.snippet}</p>
                    <ScholarTools story={story} lang={lang} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {show("pages") && result.pages.length > 0 ? (
            <section className="mt-8">
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{lang === "ckb" ? "لاپەڕە" : "Pages"}</h2>
              <ul className="mt-3 divide-y divide-rule">
                {result.pages.map((page) => (
                  <li key={page.slug} className="py-3">
                    <Link to="/page/$slug" params={{ slug: page.slug }} className="font-serif text-xl hover:text-crimson">{page.title}</Link>
                    <p className="text-sm text-muted">{page.snippet}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {show("people") && result.people.length > 0 ? (
            <section className="mt-8">
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{lang === "ckb" ? "خەڵک" : "People"}</h2>
              <ul className="mt-3 divide-y divide-rule">
                {result.people.map((person) => (
                  <li key={person.slug} className="py-3">
                    <Link to="/author/$slug" params={{ slug: person.slug }} className="font-serif text-xl hover:text-crimson">{person.name}</Link>
                    <p className="text-sm text-muted">{person.title}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {show("books") && result.books.some((book) => book.kind !== "magazine") ? (
            <section className="mt-8">
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{lang === "ckb" ? "پەرتووک" : "Books"}</h2>
              <ul className="mt-3 divide-y divide-rule">
                {result.books.filter((book) => book.kind !== "magazine").map((book) => (
                  <li key={book.url + book.title} className="py-3">
                    <a href={book.url} className="font-serif text-xl hover:text-crimson">{book.title}</a>
                    <p className="text-sm text-muted">{book.dek}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {show("magazine") && result.books.some((book) => book.kind === "magazine") ? (
            <section className="mt-8">
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{lang === "ckb" ? "گۆڤاری کۆنگرە" : "Kongre"}</h2>
              <ul className="mt-3 divide-y divide-rule">
                {result.books.filter((book) => book.kind === "magazine").map((book) => (
                  <li key={book.url + book.issue} className="py-3">
                    <a href={book.url} className="font-serif text-xl hover:text-crimson">{book.issue} · {book.title}</a>
                    <p className="text-sm text-muted">{book.dek}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {q && total === 0 ? <p className="mt-8 text-muted">{t(lang, "empty")}</p> : null}
        </main>
      </Site>
    );
  },
});

function word(lang: string, ckb: string, kmr: string, en: string, he: string) {
  if (lang === "ckb") return ckb;
  if (lang === "kmr") return kmr;
  if (lang === "he") return he;
  return en;
}

function ScholarTools({ story, lang }: { story: StoryCard & { refs: RefItem[]; files: FileItem[] }; lang: string }) {
  const [panel, setPanel] = useState<"" | "cite" | "refs">("");
  const [note, setNote] = useState("");
  const year = story.publishedAt?.slice(0, 4) ?? "";
  const url = `/article/${story.groupKey}`;
  const full = `https://kncsite.com${url}`;
  const apa = `${story.authorName}. (${year}). ${story.title}. KNC. ${full}`;
  const chicago = `${story.authorName}. “${story.title}.” KNC, ${year}. ${full}.`;
  const mla = `${story.authorName}. “${story.title}.” KNC, ${year}, ${full}.`;
  const query = encodeURIComponent(`${story.title} ${story.authorName}`);

  function copy(text: string, name: string) {
    void navigator.clipboard?.writeText(text).then(() => {
      setNote(name);
      window.setTimeout(() => setNote(""), 1600);
    });
  }

  const tools = [
    { href: url, label: word(lang, "وتار", "Gotar", "Article", "מאמר") },
    { href: `/author/${story.authorSlug}`, label: word(lang, "نووسەر", "Nivîskar", "Author", "מחבר") },
    { href: `/section/${story.category}`, label: word(lang, "بەش", "Beş", "Section", "מדור") },
    { href: `https://scholar.google.com/scholar?q=${query}`, label: "Google Scholar", out: true },
    { href: `https://www.semanticscholar.org/search?q=${query}`, label: "Semantic Scholar", out: true },
    { href: `https://search.crossref.org/?q=${query}`, label: "Crossref", out: true },
  ];

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {tools.map((tool) => (
          <a key={tool.label} href={tool.href} className="border border-rule px-2 py-1 hover:border-ink hover:text-crimson" {...(tool.out ? { target: "_blank", rel: "noreferrer" } : {})}>
            {tool.label}
          </a>
        ))}
        <button type="button" className="border border-rule px-2 py-1 hover:border-ink" onClick={() => setPanel(panel === "refs" ? "" : "refs")}>
          {word(lang, "سەرچاوە", "Çavkanî", "Sources", "מקורות")}{story.refs.length ? ` ${story.refs.length}` : ""}
        </button>
        <button type="button" className="border border-rule px-2 py-1 hover:border-ink" onClick={() => setPanel(panel === "cite" ? "" : "cite")}>
          {word(lang, "سایتەیشن", "Sitasyon", "Citation", "ציטוט")}
        </button>
        {story.files.map((file) => (
          <a key={file.url} href={file.url} className="border border-rule px-2 py-1 hover:border-ink" download>
            PDF
          </a>
        ))}
        <button type="button" className="border border-rule px-2 py-1 hover:border-ink" onClick={() => copy(full, "link")}>
          {word(lang, "لینک", "Girêdan", "Permalink", "קישור")}
        </button>
      </div>
      {note ? <p className="mt-2 text-xs text-crimson">{word(lang, "کۆپی کرا", "Hat kopîkirin", "Copied", "הועתק")}</p> : null}
      {panel === "refs" ? (
        <ul className="mt-3 space-y-1 text-sm text-muted">
          {story.refs.length === 0 ? <li>{word(lang, "ئەم وتارە سەرچاوەی زانستی نییە.", "Çavkaniya zanistî tune ye.", "This article has no scholarly sources.", "אין מקורות מדעיים.")}</li> : null}
          {story.refs.map((ref) => (
            <li key={`${ref.authors}-${ref.year}-${ref.title}`}>
              {ref.authors} ({ref.year}). {ref.title}. {ref.source}.
            </li>
          ))}
        </ul>
      ) : null}
      {panel === "cite" ? (
        <div className="mt-3 space-y-2 text-sm">
          {[["APA", apa], ["Chicago", chicago], ["MLA", mla]].map(([name, text]) => (
            <p key={name} className="border border-rule bg-soft p-2">
              <button type="button" className="mb-1 text-xs font-semibold text-crimson" onClick={() => copy(text ?? "", name ?? "")}>{name}</button>
              <span className="block">{text}</span>
            </p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
