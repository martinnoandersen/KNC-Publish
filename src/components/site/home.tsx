import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t, typeLabel, formatWhen } from "@/lib/i18n";
import type { HomePayload, HomeSection, StoryCard } from "@/lib/content/types";
import { Kicker } from "./render";
import { useBoot } from "./shell";
import { ContinueReading, MarketStrip, WireBar, type Wire } from "./tape";

function Byline({ story, lang }: { story: StoryCard; lang: string }) {
  return (
    <p className="mt-3 text-sm text-muted">
      <Link to="/author/$slug" params={{ slug: story.authorSlug }} className="font-semibold text-ink hover:text-crimson">
        {story.authorName}
      </Link>
      {story.publishedAt ? <span> · {formatWhen(lang, story.publishedAt)}</span> : null}
      <span> · {story.minutes} {t(lang, "minRead")}</span>
    </p>
  );
}

export function StoryTease({
  story,
  lang,
  image = false,
  deck = false,
}: {
  story: StoryCard;
  lang: string;
  image?: boolean;
  deck?: boolean;
}) {
  return (
    <article>
      {image && story.image ? (
        <Link to="/article/$slug" params={{ slug: story.groupKey }} className="mb-3 block">
          <img src={story.image} alt="" className="aspect-news w-full object-cover" />
        </Link>
      ) : null}
      <Kicker>
        <Link to="/section/$slug" params={{ slug: story.category }}>{story.categoryName}</Link>
        <span className="text-muted"> · {typeLabel(lang, story.type)}</span>
      </Kicker>
      <h3 className="mt-2 font-serif text-2xl leading-tight">
        <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">
          {story.title}
        </Link>
      </h3>
      {deck ? <p className="mt-2 text-muted">{story.dek}</p> : null}
      <Byline story={story} lang={lang} />
    </article>
  );
}

export function Hero({ stories }: { stories: StoryCard[] }) {
  const { lang, dir } = useBoot();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = stories.length;
  useEffect(() => {
    if (count < 2 || paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), 7000);
    return () => window.clearInterval(timer);
  }, [count, paused]);
  if (count === 0) return null;
  const story = stories[index] ?? stories[0];
  if (!story) return null;
  const Prev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const Next = dir === "rtl" ? ChevronLeft : ChevronRight;
  return (
    <section
      className="border-b border-rule"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={story.id} className="story-in grid lg:grid-cols-12">
        <Link to="/article/$slug" params={{ slug: story.groupKey }} className="block lg:col-span-7">
          {story.image ? <img src={story.image} alt="" className="aspect-news h-full w-full object-cover" /> : null}
        </Link>
        <div className="flex flex-col justify-center bg-sheet px-5 py-8 lg:col-span-5 lg:px-8">
          <Kicker>{story.categoryName} · {typeLabel(lang, story.type)}</Kicker>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
          </h2>
          <p className="mt-4 text-lg text-muted">{story.dek}</p>
          <Byline story={story} lang={lang} />
          {story.imageCaption ? <p className="mt-4 text-xs text-muted">{story.imageCaption}</p> : null}
        </div>
      </div>
      {count > 1 ? (
        <div className="flex items-center gap-2 px-4 py-3">
          <button type="button" className="grid h-11 w-11 place-items-center border border-rule" aria-label={t(lang, "prev")} onClick={() => setIndex((value) => (value - 1 + count) % count)}>
            <Prev className="size-4" />
          </button>
          <button type="button" className="grid h-11 w-11 place-items-center border border-rule" aria-label={t(lang, "next")} onClick={() => setIndex((value) => (value + 1) % count)}>
            <Next className="size-4" />
          </button>
          <div className="flex gap-2 px-2">
            {stories.map((item, dot) => (
              <button
                key={item.id}
                type="button"
                aria-label={item.title}
                className={dot === index ? "h-2.5 w-6 bg-crimson" : "h-2.5 w-2.5 bg-rule"}
                onClick={() => setIndex(dot)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function Newsletter() {
  const lang = useBoot().lang;
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("knc-note") === "1") setDone(true);
  }, []);
  return (
    <form
      className="border border-rule bg-sheet p-4"
      onSubmit={(event) => {
        event.preventDefault();
        if (!email.includes("@")) return;
        localStorage.setItem("knc-note", "1");
        setDone(true);
      }}
    >
      <Kicker>{t(lang, "newsletterTitle")}</Kicker>
      <p className="mt-2 text-sm text-muted">{t(lang, "newsletterBody")}</p>
      {done ? <p className="mt-3 text-sm font-semibold">{t(lang, "subscribed")}</p> : (
        <div className="mt-3 flex flex-col gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t(lang, "email")}
            aria-label={t(lang, "email")}
            suppressHydrationWarning
            className="h-11 border border-rule bg-paper px-3 text-sm outline-none"
          />
          <button type="submit" className="h-11 bg-crimson px-4 text-sm font-semibold text-on-mast">{t(lang, "subscribe")}</button>
        </div>
      )}
    </form>
  );
}

export function Sidebar({ home }: { home: HomePayload }) {
  const boot = useBoot();
  const lang = boot.lang;
  return (
    <aside className="space-y-8">
      {boot.plugins.includes("newsletter") ? <Newsletter /> : null}
      {boot.plugins.includes("most-read") && home.mostRead.length > 0 ? (
        <section>
          <h2 className="border-t-2 border-ink pt-2 font-serif text-xl">{t(lang, "mostRead")}</h2>
          <ol className="mt-3">
            {home.mostRead.map((story, index) => (
              <li key={story.id} className="flex gap-3 border-b border-rule py-3">
                <span className="font-serif text-2xl text-crimson tabular-nums">{index + 1}</span>
                <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-lg leading-snug hover:text-crimson">
                  {story.title}
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
      {home.sidebar.length > 0 ? (
        <section>
          <h2 className="border-t-2 border-ink pt-2 font-serif text-xl">{t(lang, "editorsChoice")}</h2>
          <div className="mt-4 space-y-6">
            {home.sidebar.map((story) => <StoryTease key={story.id} story={story} lang={lang} />)}
          </div>
        </section>
      ) : null}
      {home.tags.length > 0 ? (
        <section>
          <h2 className="border-t-2 border-ink pt-2 font-serif text-xl">{t(lang, "hashtags")}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {home.tags.map((tag) => (
              <li key={tag.slug}>
                <Link to="/tag/$slug" params={{ slug: tag.slug }} className="inline-block border border-rule px-2 py-1 text-sm hover:border-ink">
                  #{tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <section>
        <h2 className="border-t-2 border-ink pt-2 font-serif text-xl">{t(lang, "readerArticles")}</h2>
        {home.readers.length > 0 ? (
          <ul className="mt-3 divide-y divide-rule">
            {home.readers.map((story) => (
              <li key={story.id} className="py-3">
                <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-lg leading-snug hover:text-crimson">
                  {story.title}
                </Link>
                <p className="mt-1 text-sm text-muted">{story.authorName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-muted">{t(lang, "readerEmpty")}</p>
        )}
      </section>
    </aside>
  );
}

function nationWord(lang: string) {
  if (lang === "en") return "The nation";
  if (lang === "kmr") return "Netew";
  if (lang === "he") return "האומה";
  return "نەتەوە";
}

function sectionStyle(slug: string, styles: Record<string, string> | undefined) {
  const chosen = styles?.[slug];
  if (chosen === "national" || chosen === "opinion" || chosen === "grid" || chosen === "brief" || chosen === "lead") return chosen;
  if (slug === "opinion") return "opinion";
  if (slug === "culture") return "grid";
  if (slug === "science") return "brief";
  if (slug === "kurdistan" || slug === "politics") return "national";
  return "lead";
}

export function SectionBand({ section, lang, style }: { section: HomeSection; lang: string; style?: string }) {
  const mode = sectionStyle(section.slug, style ? { [section.slug]: style } : undefined);
  const [lead, ...rest] = section.stories;
  return (
    <section className={mode === "opinion" ? "bg-soft px-4 py-8" : ""}>
      <div className={mode === "opinion" ? "" : ""}>
        <div className="mb-4 flex items-end justify-between border-t-2 border-ink pt-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-crimson uppercase">{nationWord(lang)}</p>
            <h2 className="font-serif text-3xl">
              <Link to="/section/$slug" params={{ slug: section.slug }} className="hover:text-crimson">{section.name}</Link>
            </h2>
          </div>
          <Link to="/section/$slug" params={{ slug: section.slug }} className="text-xs font-semibold tracking-widest uppercase text-muted">
            {t(lang, "allStories")}
          </Link>
        </div>
        {mode === "national" && lead ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <article className="lg:col-span-7">
              {lead.image ? <Link to="/article/$slug" params={{ slug: lead.groupKey }}><img src={lead.image} alt="" className="aspect-news w-full object-cover" /></Link> : null}
              <h3 className="mt-3 font-serif text-4xl leading-tight">
                <Link to="/article/$slug" params={{ slug: lead.groupKey }} className="hover:text-crimson">{lead.title}</Link>
              </h3>
              <p className="mt-2 text-lg text-muted">{lead.dek}</p>
              <Byline story={lead} lang={lang} />
            </article>
            <div className="divide-y divide-rule border-t border-ink lg:col-span-5">
              {rest.slice(0, 4).map((story) => (
                <article key={story.id} className="py-3">
                  <h3 className="font-serif text-xl leading-snug">
                    <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{story.dek}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
        {mode === "opinion" ? (
          <div className="grid gap-6 md:grid-cols-3">
            {section.stories.slice(0, 3).map((story) => (
              <article key={story.id}>
                <p className="text-sm font-semibold">{story.authorName}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug">
                  <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-muted">{story.dek}</p>
              </article>
            ))}
          </div>
        ) : null}
        {mode === "grid" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.stories.slice(0, 4).map((story) => (
              <article key={story.id}>
                {story.image ? <Link to="/article/$slug" params={{ slug: story.groupKey }}><img src={story.image} alt="" className="aspect-news w-full object-cover" /></Link> : null}
                <h3 className="mt-2 font-serif text-lg leading-snug">
                  <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                </h3>
              </article>
            ))}
          </div>
        ) : null}
        {mode === "brief" ? (
          <ol className="grid gap-4 md:grid-cols-2">
            {section.stories.slice(0, 6).map((story, index) => (
              <li key={story.id} className="grid grid-cols-12 gap-3 border-b border-rule pb-3">
                <span className="col-span-2 font-serif text-3xl text-crimson tabular-nums">{index + 1}</span>
                <div className="col-span-10">
                  <h3 className="font-serif text-xl">
                    <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{story.dek}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        {mode === "lead" && lead ? (
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7"><StoryTease story={lead} lang={lang} image deck /></div>
            <div className="space-y-4 lg:col-span-5">
              {rest.slice(0, 5).map((story) => (
                <article key={story.id} className="border-b border-rule pb-3">
                  <h3 className="font-serif text-xl leading-snug">
                    <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{story.dek}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function HomeView({ home, wires }: { home: HomePayload; wires: Wire[] }) {
  const boot = useBoot();
  const lang = boot.lang;
  const layout = boot.layout;
  const sections = layout.sections.length
    ? layout.sections
        .map((slug) => home.sections.find((section) => section.slug === slug))
        .filter((section): section is HomePayload["sections"][number] => Boolean(section))
    : home.sections;
  const flat = [...home.hero, ...home.lead, ...home.latest, ...home.sidebar, ...home.mostRead, ...home.sections.flatMap((section) => section.stories)];
  return (
    <div>
      {layout.wire ? <WireBar wires={wires} /> : null}
      {layout.political ? <MarketStrip /> : null}
      {layout.hero ? <Hero stories={home.hero} /> : null}
      <div className="mx-auto max-w-6xl px-4">
        <ContinueReading stories={flat} />
        {layout.lead && home.lead.length > 0 ? (
          <div className="grid gap-8 border-b border-rule py-8 md:grid-cols-2">
            {home.lead.map((story) => <StoryTease key={story.id} story={story} lang={lang} image deck />)}
          </div>
        ) : null}
        <div className={layout.sidebar ? "grid gap-10 py-10 lg:grid-cols-12" : "py-10"}>
          <div className={layout.sidebar ? "space-y-12 lg:col-span-8" : "space-y-12"}>
            {sections.map((section) => (
              <SectionBand key={section.slug} section={section} lang={lang} style={sectionStyle(section.slug, layout.styles)} />
            ))}
            {layout.latest ? (
            <section>
              <h2 className="border-t-2 border-ink pt-2 font-serif text-2xl">{t(lang, "latest")}</h2>
              <div className="mt-4 divide-y divide-rule">
                {home.latest.map((story) => (
                  <article key={story.id} className="grid gap-4 py-5 sm:grid-cols-12">
                    {story.image ? (
                      <Link to="/article/$slug" params={{ slug: story.groupKey }} className="sm:col-span-4">
                        <img src={story.image} alt="" className="aspect-news w-full object-cover" />
                      </Link>
                    ) : null}
                    <div className={story.image ? "sm:col-span-8" : "sm:col-span-12"}>
                      <Kicker>{story.categoryName}</Kicker>
                      <h3 className="mt-1 font-serif text-2xl leading-snug">
                        <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
                      </h3>
                      <p className="mt-2 text-muted">{story.dek}</p>
                      <Byline story={story} lang={lang} />
                    </div>
                  </article>
                ))}
              </div>
            </section>
            ) : null}
          </div>
          {layout.sidebar ? (
          <div className="lg:col-span-4">
            <Sidebar home={home} />
          </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function StoryList({ stories, title, toolbar }: { stories: StoryCard[]; title: string; toolbar?: ReactNode }) {
  const lang = useBoot().lang;
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink pb-3">
        <h1 className="font-serif text-4xl">{title}</h1>
        {toolbar}
      </div>
      {stories.length === 0 ? <p className="mt-8 text-muted">{t(lang, "empty")}</p> : (
        <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => <StoryTease key={story.id} story={story} lang={lang} image deck />)}
        </div>
      )}
    </div>
  );
}
