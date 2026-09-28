import { createFileRoute, notFound } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { RichText } from "@/components/site/render";
import { getPage } from "@/lib/content/public-api";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/page/$slug")({
  loader: async ({ params }) => {
    const page = await getPage({ data: params.slug });
    if (!page) throw notFound();
    return page;
  },
  component: function StaticPage() {
    const page = Route.useLoaderData();
    const boot = useBoot();
    return (
      <Site>
        <article className="mx-auto max-w-3xl px-4 py-10">
          <h1 className="font-serif text-4xl">{page.title}</h1>
          {page.lang !== boot.lang ? (
            <p className="mt-4 border border-rule bg-soft px-4 py-3 text-sm">{t(boot.lang, "notTranslated")}</p>
          ) : null}
          <div className="mt-6">
            <RichText text={page.body} />
          </div>
        </article>
      </Site>
    );
  },
});
