import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { n } from "@/lib/newsroom/copy";
import { readHistory } from "@/lib/newsroom/local";
import type { StoryCard } from "@/lib/content/types";
import { useBoot } from "./shell";

export type Wire = { id: number; kicker: string; text: string; href: string; urgent: boolean };

function useOn() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  return on;
}

function WireLink({ href, children }: { href: string; children: ReactNode }) {
  const article = /^\/article\/([a-z0-9-]+)$/.exec(href);
  if (article?.[1]) {
    return (
      <Link to="/article/$slug" params={{ slug: article[1] }} className="min-w-0 flex-1 hover:underline">
        {children}
      </Link>
    );
  }
  if (!href) return <p className="min-w-0 flex-1">{children}</p>;
  return <a href={href} className="min-w-0 flex-1 hover:underline">{children}</a>;
}

export function WireBar({ wires }: { wires: Wire[] }) {
  const { lang } = useBoot();
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (wires.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % wires.length), 6000);
    return () => window.clearInterval(timer);
  }, [wires.length]);
  if (wires.length === 0) return null;
  const wire = wires[index] ?? wires[0];
  if (!wire) return null;
  return (
    <div className={wire.urgent ? "bg-crimson text-on-mast" : "bg-mast text-on-mast"}>
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 text-sm">
        <WireLink href={wire.href}>
          <span className="flex min-w-0 items-baseline gap-3">
            <span className="shrink-0 text-xs font-semibold">{wire.urgent ? n(lang, "urgent") : wire.kicker || n(lang, "live")}</span>
            <span className="truncate">{wire.text}</span>
          </span>
        </WireLink>
        {wires.length > 1 ? (
          <span className="flex shrink-0 gap-1">
            <button type="button" className="grid h-11 w-11 place-items-center border border-on-mast/30" aria-label={n(lang, "earlier")} onClick={() => setIndex((value) => (value - 1 + wires.length) % wires.length)}>‹</button>
            <button type="button" className="grid h-11 w-11 place-items-center border border-on-mast/30" aria-label={n(lang, "upcoming")} onClick={() => setIndex((value) => (value + 1) % wires.length)}>›</button>
          </span>
        ) : null}
      </div>
    </div>
  );
}

const POLITICAL = [
  { href: "/article/two-alphabets", ckb: "دەستوور", kmr: "Destûr", en: "Constitution", he: "חוקה" },
  { href: "/article/civic-decade", ckb: "دامەزراوە", kmr: "Sazî", en: "Institutions", he: "מוסדות" },
  { href: "/article/citadel-memory", ckb: "ئەقڵی دەوڵەت", kmr: "Aqilê dewletê", en: "State reason", he: "תבונת המדינה" },
  { href: "/article/tembur-living", ckb: "سوپای نیشتمانی", kmr: "Artêş", en: "National army", he: "צבא לאומי" },
  { href: "/article/harvest-week", ckb: "خەزێنە", kmr: "Xezîne", en: "Treasury", he: "אוצר" },
  { href: "/books", ckb: "پەرتووک", kmr: "Pirtûk", en: "Books", he: "ספרים" },
];

export function MarketStrip() {
  const lang = useBoot().lang;
  const word = (item: (typeof POLITICAL)[number]) => item[lang === "kmr" || lang === "en" || lang === "he" ? lang : "ckb"];
  return (
    <div className="border-b border-rule bg-sheet">
      <div className="mx-auto flex max-w-6xl items-stretch gap-2 overflow-x-auto px-4">
        {POLITICAL.map((item) => (
          <a key={item.href} href={item.href} className="shrink-0 border-s border-rule px-3 py-3 text-sm font-semibold hover:text-crimson">
            {word(item)}
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContinueReading({ stories }: { stories: StoryCard[] }) {
  const lang = useBoot().lang;
  const on = useOn();
  const [keys, setKeys] = useState<string[]>([]);
  useEffect(() => setKeys(readHistory()), []);
  if (!on || keys.length === 0) return null;
  const picks = keys
    .map((key) => stories.find((story) => story.groupKey === key))
    .filter((story): story is StoryCard => Boolean(story))
    .slice(0, 3);
  if (picks.length === 0) return null;
  return (
    <section className="border-b border-rule py-6">
      <h2 className="font-serif text-2xl">{n(lang, "recent")}</h2>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {picks.map((story) => (
          <li key={story.groupKey}>
            <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-xl leading-snug hover:text-crimson">{story.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
