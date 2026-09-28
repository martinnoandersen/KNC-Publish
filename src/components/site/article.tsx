import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { LANGS, formatWhen, t, typeLabel } from "@/lib/i18n";
import type { StoryCard, StoryFull } from "@/lib/content/types";
import { bumpView } from "@/lib/content/public-api";
import { Comments, FollowButton, SaveButton, trackRead } from "./reader";
import { n } from "@/lib/newsroom/copy";
import { Kicker, RichText } from "./render";
import { setSiteLang, useBoot } from "./shell";

export function ArticleView({ story, related }: { story: StoryFull; related: StoryCard[] }) {
  const boot = useBoot();
  const router = useRouter();
  const lang = boot.lang;
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    bumpView({ data: story.id }).catch(() => undefined);
    trackRead(story.groupKey);
  }, [story.id, story.groupKey]);

  useEffect(() => {
    if (!boot.plugins.includes("reading-progress")) return;
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [boot.plugins, story.id]);

  function choose(next: string) {
    setSiteLang(next);
    void router.invalidate();
  }

  return (
    <article className="mx-auto max-w-6xl px-4 py-8">
      {boot.plugins.includes("reading-progress") ? (
        <div className="fixed inset-x-0 top-0 z-40 h-1 bg-rule">
          <div className="h-full bg-crimson" style={{ width: `${progress}%` }} />
        </div>
      ) : null}
      <div className="mx-auto max-w-3xl">
        <Kicker>
          <Link to="/section/$slug" params={{ slug: story.category }} className="hover:underline">{story.categoryName}</Link>
          {" · "}{typeLabel(lang, story.type)}
          {story.kind === "post" ? ` · ${t(lang, "post")}` : ""}
        </Kicker>
        <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">{story.title}</h1>
        {story.subtitle ? <p className="mt-3 font-serif text-2xl leading-snug">{story.subtitle}</p> : null}
        <p className="mt-4 text-xl text-muted">{story.dek}</p>
        <p className="mt-4 text-sm">
          {t(lang, "by")}{" "}
          <Link to="/author/$slug" params={{ slug: story.authorSlug }} className="font-semibold hover:text-crimson">
            {story.authorName}
          </Link>
          {story.authorTitle ? <span className="text-muted">, {story.authorTitle}</span> : null}
          {story.publishedAt ? <span className="text-muted"> · {formatWhen(lang, story.publishedAt)}</span> : null}
          <span className="text-muted"> · {story.minutes} {t(lang, "minRead")}</span>
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted uppercase">{t(lang, "alsoIn")}</span>
          {story.availableLangs.filter((id) => boot.langs.some((item) => item.id === id)).map((id) => {
            const meta = LANGS.find((item) => item.id === id);
            const active = story.lang === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => choose(id)}
                className={active ? "h-9 border border-ink bg-ink px-3 text-sm text-paper" : "h-9 border border-rule px-3 text-sm hover:border-ink"}
              >
                {meta?.short ?? id}
              </button>
            );
          })}
        </div>
        {story.lang !== lang ? (
          <p className="mt-4 border border-rule bg-soft px-4 py-3 text-sm">{t(lang, "notTranslated")}</p>
        ) : null}
      </div>
      {story.image ? (
        <figure className="mx-auto mt-8 max-w-4xl">
          <img src={story.image} alt="" className="aspect-news w-full object-cover" />
          {story.imageCaption ? <figcaption className="mt-2 text-sm text-muted">{story.imageCaption}</figcaption> : null}
        </figure>
      ) : null}
      <div className="mx-auto mt-8 grid max-w-6xl gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mx-auto max-w-3xl">
            <RichText text={story.body} drop={story.type === "premium" || story.type === "scientific"} />
            {story.files.length > 0 ? (
              <ul className="mt-6 space-y-2 border-t border-rule pt-4">
                {story.files.map((file) => (
                  <li key={file.url}>
                    <a href={file.url} className="text-sm font-semibold underline" download>{file.name}</a>
                  </li>
                ))}
              </ul>
            ) : null}
            {story.tags.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {story.tags.map((tag) => (
                  <li key={tag.slug}>
                    <Link to="/tag/$slug" params={{ slug: tag.slug }} className="inline-block border border-rule px-2 py-1 text-sm hover:border-ink">
                      #{tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            {boot.plugins.includes("share") ? (
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-4">
                <span className="text-xs font-semibold tracking-widest uppercase">{t(lang, "share")}</span>
                <button
                  type="button"
                  className="h-11 border border-rule px-4 text-sm"
                  onClick={() => {
                    const url = window.location.href;
                    if (navigator.share) {
                      navigator.share({ title: story.title, url }).catch(() => undefined);
                      return;
                    }
                    void navigator.clipboard.writeText(url).then(() => {
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1600);
                    });
                  }}
                >
                  {copied ? t(lang, "copied") : t(lang, "copyLink")}
                </button>
                <SaveButton groupKey={story.groupKey} />
                <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => window.print()}>{n(lang, "print")}</button>
              </div>
            ) : (
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-rule pt-4">
                <SaveButton groupKey={story.groupKey} />
                <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => window.print()}>{n(lang, "print")}</button>
              </div>
            )}
            {boot.plugins.includes("citations") && story.type === "scientific" && story.refs.length > 0 ? (
              <section className="mt-10 border-t border-ink pt-4">
                <h2 className="font-serif text-2xl">{t(lang, "references")}</h2>
                <ol className="mt-4 list-decimal space-y-3 ps-5 text-sm">
                  {story.refs.map((ref) => (
                    <li key={`${ref.year}-${ref.title}`}>
                      {ref.authors} ({ref.year}). {ref.title}. <span className="text-muted">{ref.source}</span>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
            <Comments groupKey={story.groupKey} />
          </div>
        </div>
        <aside className="lg:col-span-4">
          {boot.plugins.includes("related") && related.length > 0 ? (
            <section>
              <h2 className="border-t-2 border-ink pt-2 font-serif text-xl">{t(lang, "related")}</h2>
              <ul className="mt-3 space-y-4">
                {related.map((item) => (
                  <li key={item.id}>
                    <p className="text-xs font-semibold tracking-widest text-crimson uppercase">{item.categoryName}</p>
                    <Link to="/article/$slug" params={{ slug: item.groupKey }} className="font-serif text-xl leading-snug hover:text-crimson">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </article>
  );
}

export function AuthorView({
  profile,
}: {
  profile: {
    slug: string;
    name: string;
    title: string;
    location: string;
    languages: string;
    email: string;
    bio: string;
    education: { years: string; place: string; detail: string }[];
    experience: { years: string; place: string; detail: string }[];
    count: number;
    groups: { category: string; categoryName: string; stories: StoryCard[] }[];
    tags: { slug: string; name: string }[];
  };
}) {
  const lang = useBoot().lang;
  const initial = profile.name.trim().charAt(0) || "K";
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-12">
      <aside className="lg:col-span-4">
        <div className="border border-ink bg-sheet p-6">
          <div className="grid h-24 w-24 place-items-center bg-mast font-serif text-4xl text-on-mast">{initial}</div>
          <h1 className="mt-4 font-serif text-4xl">{profile.name}</h1>
          <div className="mt-4"><FollowButton kind="author" target={profile.slug} /></div>
          {profile.title ? <p className="mt-2 text-sm font-semibold tracking-wide text-crimson uppercase">{profile.title}</p> : null}
          <dl className="mt-6 space-y-3 text-sm">
            {profile.location ? <div><dt className="text-muted">{t(lang, "location")}</dt><dd>{profile.location}</dd></div> : null}
            {profile.languages ? <div><dt className="text-muted">{t(lang, "spoken")}</dt><dd>{profile.languages}</dd></div> : null}
            {profile.email ? <div><dt className="text-muted">{t(lang, "email")}</dt><dd>{profile.email}</dd></div> : null}
            <div><dt className="text-muted">{t(lang, "articles")}</dt><dd className="font-serif text-3xl tabular-nums">{profile.count}</dd></div>
          </dl>
        </div>
      </aside>
      <div className="lg:col-span-8">
        {profile.bio ? (
          <section>
            <h2 className="font-serif text-2xl">{t(lang, "bio")}</h2>
            <p className="mt-3 text-lg leading-relaxed">{profile.bio}</p>
          </section>
        ) : null}
        {profile.education.length > 0 ? (
          <section className="mt-8">
            <h2 className="font-serif text-2xl">{t(lang, "education")}</h2>
            <ol className="mt-3 border-s border-rule ps-4">
              {profile.education.map((item) => (
                <li key={`${item.years}-${item.place}`} className="mb-4">
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">{item.years}</p>
                  <p className="font-semibold">{item.place}</p>
                  <p className="text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        {profile.experience.length > 0 ? (
          <section className="mt-8">
            <h2 className="font-serif text-2xl">{t(lang, "experience")}</h2>
            <ol className="mt-3 border-s border-rule ps-4">
              {profile.experience.map((item) => (
                <li key={`${item.years}-${item.place}`} className="mb-4">
                  <p className="text-xs font-semibold tracking-widest text-muted uppercase">{item.years}</p>
                  <p className="font-semibold">{item.place}</p>
                  <p className="text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
        <section className="mt-10">
          <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{t(lang, "authorArticles")}</h2>
          {profile.groups.map((group) => (
            <div key={group.category} className="mt-6">
              <h3 className="text-xs font-semibold tracking-widest text-crimson uppercase">{group.categoryName}</h3>
              <ul className="mt-2 divide-y divide-rule">
                {group.stories.map((story) => (
                  <li key={story.id} className="py-3">
                    <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-xl hover:text-crimson">
                      {story.title}
                    </Link>
                    <p className="text-sm text-muted">{typeLabel(lang, story.type)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
        {profile.tags.length > 0 ? (
          <section className="mt-8">
            <h2 className="font-serif text-2xl">{t(lang, "hashtags")}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {profile.tags.map((tag) => (
                <li key={tag.slug}>
                  <Link to="/tag/$slug" params={{ slug: tag.slug }} className="inline-block border border-rule px-2 py-1 text-sm">#{tag.name}</Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
