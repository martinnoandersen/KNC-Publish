import { createFileRoute } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { getBooks } from "@/lib/content/public-api";

export const Route = createFileRoute("/books")({
  loader: () => getBooks(),
  component: function BooksPage() {
    const books = Route.useLoaderData();
    return (
      <Site>
        <main className="mx-auto max-w-6xl px-4 py-10">
          <BooksHead />
          <BookGrid books={books} />
        </main>
      </Site>
    );
  },
});

function BooksHead() {
  const { lang } = useBoot();
  const title = lang === "en" ? "Books" : lang === "kmr" ? "Pirtûk" : lang === "he" ? "ספרים" : "پەرتووک";
  const lede = lang === "en"
    ? "Publications on the constitution, state reason, and institutions."
    : lang === "kmr"
      ? "Weşan li ser destûrê, aqilê dewletê û saziyan."
      : "بڵاوکراوە لەسەر دەستوور، ئەقڵی دەوڵەت و دامەزراوە.";
  return (
    <>
      <p className="text-xs font-semibold tracking-widest text-crimson uppercase">KNC</p>
      <h1 className="mt-2 font-serif text-5xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-muted">{lede}</p>
    </>
  );
}

function BookGrid({ books }: { books: { title: string; dek: string; year: string; cover: string; url: string }[] }) {
  return (
    <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <li key={book.url + book.title} className="border border-rule bg-sheet">
          <img src={book.cover} alt="" className="aspect-news w-full object-cover" />
          <div className="p-4">
            <p className="text-xs text-muted">{book.year} · PDF</p>
            <h2 className="mt-2 font-serif text-2xl">{book.title}</h2>
            <p className="mt-2 text-sm text-muted">{book.dek}</p>
            <a href={book.url} className="mt-4 inline-flex h-11 items-center border border-ink px-4 text-sm font-semibold" download>
              PDF
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
}
