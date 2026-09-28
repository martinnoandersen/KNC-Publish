import { createFileRoute } from "@tanstack/react-router";
import { Site, useBoot } from "@/components/site/shell";
import { getMagazine } from "@/lib/content/public-api";

export const Route = createFileRoute("/kongre")({
  loader: () => getMagazine(),
  component: function KongrePage() {
    const issues = Route.useLoaderData();
    const { lang } = useBoot();
    const title = lang === "en" ? "Kongre" : lang === "kmr" ? "Kongre" : lang === "he" ? "קונגרה" : "کۆنگرە";
    const lede = lang === "en"
      ? "The magazine of the Kurdistan National Congress. Each issue is a national text: liberation, the state, and the nation."
      : lang === "kmr"
        ? "Kovara Kongreya Niştimanî ya Kurdistanê. Her hejmar nivîseke neteweyî ye."
        : "گۆڤاری کۆنگرەی نیشتمانیی کوردستان. هەر ژمارەیەک دەقێکی نەتەوەییە: ڕزگاری، دەوڵەت و نەتەوە.";
    return (
      <Site>
        <main className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-xs font-semibold tracking-widest text-crimson uppercase">KNC</p>
          <h1 className="mt-2 font-serif text-5xl">{title}</h1>
          <p className="mt-3 max-w-2xl text-muted">{lede}</p>
          <ol className="mt-8 divide-y divide-ink border-y border-ink">
            {issues.map((issue) => (
              <li key={issue.url + issue.issue + issue.title} className="grid gap-4 py-6 sm:grid-cols-12">
                {issue.cover ? <img src={issue.cover} alt="" className="aspect-news w-full object-cover sm:col-span-4" /> : null}
                <div className="sm:col-span-8">
                  <p className="text-xs font-semibold tracking-widest text-crimson uppercase">{lang === "ckb" ? "ژمارە" : "Issue"} {issue.issue}</p>
                  <h2 className="mt-2 font-serif text-3xl">{issue.title}</h2>
                  <p className="mt-2 text-muted">{issue.dek}</p>
                  <p className="mt-2 text-sm text-muted">{issue.year}</p>
                  <a href={issue.url} className="mt-4 inline-flex h-11 items-center border border-ink px-4 text-sm font-semibold" download>PDF</a>
                </div>
              </li>
            ))}
          </ol>
        </main>
      </Site>
    );
  },
});
