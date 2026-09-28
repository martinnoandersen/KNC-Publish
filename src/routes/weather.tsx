import { createFileRoute, Link } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";

export const Route = createFileRoute("/weather")({
  component: function RedirectPolitics() {
    const { lang } = useBoot();
    const title = lang === "en" ? "State reason" : lang === "kmr" ? "Aqilê dewletê" : "ئەقڵی دەوڵەت";
    return (
      <Site>
        <main className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-4xl">{title}</h1>
          <p className="mt-4 text-muted">{lang === "en" ? "The political work is state reason, a constitution, and institutions." : lang === "kmr" ? "Karê siyasî aqilê dewletê, destûr û sazî ne." : "کاری سیاسی ئەقڵی دەوڵەت و دەستوور و دامەزراوەیە."}</p>
          <Link to="/section/$slug" params={{ slug: "politics" }} className="mt-6 inline-block underline">{title}</Link>
        </main>
      </Site>
    );
  },
});
