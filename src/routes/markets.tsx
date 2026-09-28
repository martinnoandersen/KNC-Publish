import { createFileRoute, Link } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";

export const Route = createFileRoute("/markets")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search.id === "string" ? search.id.slice(0, 24) : "",
  }),
  component: function InstitutionsPage() {
    const { lang } = useBoot();
    const title = lang === "en" ? "Institutions" : lang === "kmr" ? "Sazî" : "دامەزراوە";
    return (
      <Site>
        <main className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-4xl">{title}</h1>
          <p className="mt-4 text-muted">{lang === "en" ? "A treasury, a court, and a national army belong in the constitution. They are institutions of a state, not a price list." : lang === "kmr" ? "Xezîne, dadgeh û artêşa niştimanî cihê wan di destûrê de ye." : "خەزێنە و دادگا و سوپای نیشتمانی شوێنیان لە دەستووردایە."}</p>
          <Link to="/books" className="mt-6 inline-block underline">PDF</Link>
        </main>
      </Site>
    );
  },
});
