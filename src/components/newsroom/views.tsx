import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatWhen } from "@/lib/i18n";
import { n, type CopyKey } from "@/lib/newsroom/copy";
import { readBest, readFollows, readHistory, readSaves, writeBest } from "@/lib/newsroom/local";
import { formatNum, INSTRUMENTS, label, RANGES, series, summarize, type RangeId } from "@/lib/newsroom/markets";
import { CLUES, clueText, lettersOf, shuffle } from "@/lib/newsroom/puzzle";
import { CITIES, forecast, type Condition } from "@/lib/newsroom/weather";
import { myShelf } from "@/lib/newsroom/public-api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import type { HomePayload, StoryCard } from "@/lib/content/types";
import { StoryTease } from "@/components/site/home";
import { LetterButton } from "@/components/site/reader";
import { useBoot } from "@/components/site/shell";
import type { Wire } from "@/components/site/tape";

function useOn() {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  return on;
}

export function PageHead({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <header className="border-b border-ink pb-4">
      <p className="text-xs font-semibold text-crimson">{kicker}</p>
      <h1 className="mt-2 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
      {lede ? <p className="mt-3 max-w-3xl text-lg text-muted">{lede}</p> : null}
    </header>
  );
}

function Frame({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>;
}

export function MarketsView({ id }: { id: string }) {
  const lang = useBoot().lang;
  const navigate = useNavigate();
  const on = useOn();
  const [range, setRange] = useState<RangeId>("1m");
  const item = INSTRUMENTS.find((entry) => entry.id === id) ?? INSTRUMENTS[0];
  const points = on ? series(item.id, range).points : [];
  const stats = points.length ? summarize(points) : null;
  const down = (stats?.pct ?? 0) < 0;
  return (
    <Frame>
      <PageHead kicker={n(lang, "markets")} title={label(lang, item.name)} lede={n(lang, "method")} />
      <div className="mt-5 flex flex-wrap gap-2">
        {INSTRUMENTS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => void navigate({ to: "/markets", search: { id: entry.id } })}
            className={entry.id === item.id ? "h-11 bg-ink px-3 text-sm text-paper" : "h-11 border border-rule px-3 text-sm"}
          >
            {label(lang, entry.name)}
          </button>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        {RANGES.map((entry) => (
          <button key={entry.id} type="button" onClick={() => setRange(entry.id)} className={range === entry.id ? "h-11 border border-ink px-3 text-sm font-semibold" : "h-11 border border-rule px-3 text-sm"}>
            {entry.id === "1w" ? n(lang, "week") : entry.id === "1m" ? n(lang, "month") : n(lang, "quarter")}
          </button>
        ))}
      </div>
      <div dir="ltr" className="mt-6 h-72 border border-rule bg-sheet p-2">
        {on && points.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points}>
              <XAxis dataKey="day" tick={{ fill: "var(--color-muted)", fontSize: 11 }} interval={range === "3m" ? 14 : range === "1m" ? 5 : 0} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "var(--color-muted)", fontSize: 11 }} width={56} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="var(--color-crimson)" fill="var(--color-soft)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      {stats ? (
        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            [n(lang, "last"), `${formatNum(stats.last, item.digits)} ${item.unit}`],
            [n(lang, "change"), `${stats.pct > 0 ? "+" : ""}${stats.pct.toFixed(2)}%`],
            [n(lang, "high"), formatNum(stats.high, item.digits)],
            [n(lang, "low"), formatNum(stats.low, item.digits)],
          ].map(([name, value]) => (
            <div key={name} className="border border-rule bg-sheet p-3">
              <dt className="text-xs text-muted">{name}</dt>
              <dd className={name === n(lang, "change") && down ? "mt-1 font-serif text-2xl text-crimson tabular-nums" : "mt-1 font-serif text-2xl tabular-nums"}>{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </Frame>
  );
}

const COND_KEY: Record<Condition, CopyKey> = { sun: "sun", cloud: "cloud", rain: "rain", wind: "wind", mist: "mist" };

export function WeatherView() {
  const lang = useBoot().lang;
  const on = useOn();
  const [cityId, setCityId] = useState("hewler");
  const cast = on ? forecast(cityId) : null;
  const advice = !cast ? "" : cast.cond === "rain" ? n(lang, "adviceWet") : cast.nowTemp >= 30 ? n(lang, "adviceHot") : cast.nowTemp <= 16 ? n(lang, "adviceCool") : n(lang, "adviceMild");
  return (
    <Frame>
      <PageHead kicker={n(lang, "weather")} title={cast ? label(lang, cast.city.name) : n(lang, "weather")} lede={n(lang, "weatherHint")} />
      <div className="mt-5 flex gap-2 overflow-x-auto">
        {CITIES.map((city) => (
          <button key={city.id} type="button" onClick={() => setCityId(city.id)} className={city.id === cityId ? "h-11 shrink-0 bg-ink px-3 text-sm text-paper" : "h-11 shrink-0 border border-rule px-3 text-sm"}>
            {label(lang, city.name)}
          </button>
        ))}
      </div>
      {cast ? (
        <>
          <p className="mt-8 font-serif text-7xl tabular-nums">{cast.nowTemp}°</p>
          <p className="mt-2 text-lg">{n(lang, COND_KEY[cast.cond])}</p>
          <p className="mt-2 max-w-xl text-muted">{advice}</p>
          <h2 className="mt-8 border-t border-ink pt-3 font-serif text-2xl">{n(lang, "hourly")}</h2>
          <ul className="mt-3 flex gap-3 overflow-x-auto pb-2">
            {cast.hours.map((hour) => (
              <li key={hour.hour} className="w-16 shrink-0 border border-rule bg-sheet py-3 text-center">
                <p className="text-xs text-muted tabular-nums">{String(hour.hour).padStart(2, "0")}</p>
                <p className="mt-2 font-serif text-2xl tabular-nums">{hour.temp}°</p>
                <p className="mt-1 text-xs">{n(lang, COND_KEY[hour.cond])}</p>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 border-t border-ink pt-3 font-serif text-2xl">{n(lang, "outlook")}</h2>
          <ul className="mt-3 divide-y divide-rule border-y border-rule">
            {cast.days.map((day) => {
              const date = new Date();
              date.setDate(date.getDate() + day.offset);
              return (
                <li key={day.offset} className="flex items-center gap-3 py-3">
                  <span className="w-36 text-sm">{day.offset === 0 ? n(lang, "now") : formatWhen(lang, date.toISOString())}</span>
                  <span className="flex-1 text-sm">{n(lang, COND_KEY[day.cond])}</span>
                  <span className="tabular-nums">{day.low}°</span>
                  <span className="font-semibold tabular-nums">{day.high}°</span>
                </li>
              );
            })}
          </ul>
        </>
      ) : null}
    </Frame>
  );
}

export function LiveView({ wires, stories }: { wires: Wire[]; stories: StoryCard[] }) {
  const lang = useBoot().lang;
  const router = useRouter();
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) void router.invalidate();
    }, 30000);
    return () => window.clearInterval(timer);
  }, [router]);
  return (
    <Frame>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <PageHead kicker={n(lang, "developing")} title={n(lang, "live")} lede={n(lang, "liveHint")} />
        <button type="button" className="h-11 border border-ink px-4 text-sm" onClick={() => void router.invalidate()}>{n(lang, "refresh")}</button>
      </div>
      {wires.length === 0 ? <p className="mt-6 text-muted">{n(lang, "noWire")}</p> : (
        <ol className="mt-6 border-s-2 border-crimson ps-4">
          {wires.map((wire) => (
            <li key={wire.id} className="pb-6">
              <p className="text-xs font-semibold text-crimson">{wire.urgent ? n(lang, "urgent") : wire.kicker || n(lang, "live")}</p>
              <p className="mt-1 font-serif text-2xl leading-snug">{wire.text}</p>
              {wire.href.startsWith("/article/") ? (
                <Link to="/article/$slug" params={{ slug: wire.href.slice("/article/".length) }} className="mt-2 inline-block text-sm font-semibold hover:text-crimson">{n(lang, "open")}</Link>
              ) : null}
            </li>
          ))}
        </ol>
      )}
      <h2 className="mt-4 border-t border-ink pt-3 font-serif text-2xl">{n(lang, "developing")}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {stories.slice(0, 4).map((story) => <StoryTease key={story.id} story={story} lang={lang} deck />)}
      </div>
    </Frame>
  );
}

export function ArchiveView({ stories, month }: { stories: StoryCard[]; month: string }) {
  const lang = useBoot().lang;
  const navigate = useNavigate();
  const months = useMemo(() => {
    const set = new Set<string>();
    for (const story of stories) if (story.publishedAt) set.add(story.publishedAt.slice(0, 7));
    return [...set].sort().reverse();
  }, [stories]);
  const active = months.includes(month) ? month : (months[0] ?? "");
  const shown = stories.filter((story) => story.publishedAt?.startsWith(active));
  return (
    <Frame>
      <PageHead kicker={n(lang, "archive")} title={active || n(lang, "archive")} />
      <div className="mt-5 flex gap-2 overflow-x-auto">
        {months.map((item) => (
          <button key={item} type="button" onClick={() => void navigate({ to: "/archive", search: { m: item } })} className={item === active ? "h-11 shrink-0 bg-ink px-3 text-sm text-paper" : "h-11 shrink-0 border border-rule px-3 text-sm"}>
            {item}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((story) => <StoryTease key={story.id} story={story} lang={lang} image deck />)}
      </div>
      {shown.length === 0 ? <p className="mt-6 text-muted">{n(lang, "emptyDesk")}</p> : null}
    </Frame>
  );
}

export function BriefingView({ home }: { home: HomePayload }) {
  const lang = useBoot().lang;
  const lead = [...home.hero, ...home.lead, ...home.latest].filter((story, index, list) => list.findIndex((item) => item.groupKey === story.groupKey) === index).slice(0, 6);
  return (
    <Frame>
      <PageHead kicker={n(lang, "editionOf")} title={n(lang, "briefing")} lede={n(lang, "morningBody")} />
      <ol className="mt-8 divide-y divide-rule border-y border-rule">
        {lead.map((story, index) => (
          <li key={story.groupKey} className="grid gap-2 py-5 sm:grid-cols-12">
            <span className="font-serif text-3xl text-crimson tabular-nums sm:col-span-1">{index + 1}</span>
            <div className="sm:col-span-11">
              <p className="text-xs font-semibold text-crimson">{story.categoryName}</p>
              <h2 className="mt-1 font-serif text-3xl leading-snug">
                <Link to="/article/$slug" params={{ slug: story.groupKey }} className="hover:text-crimson">{story.title}</Link>
              </h2>
              <p className="mt-2 text-muted">{story.dek}</p>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function LettersView({ stories }: { stories: StoryCard[] }) {
  const lang = useBoot().lang;
  const packs = [
    { slug: "morning", title: n(lang, "morning"), body: n(lang, "morningBody"), items: stories.slice(0, 5) },
    { slug: "culture", title: n(lang, "cultureNote"), body: n(lang, "cultureBody"), items: stories.filter((story) => story.category === "culture").slice(0, 4) },
    { slug: "weekend", title: n(lang, "weekend"), body: n(lang, "weekendBody"), items: stories.filter((story) => story.category === "opinion").slice(0, 4) },
  ];
  return (
    <Frame>
      <PageHead kicker={n(lang, "letters")} title={n(lang, "letters")} />
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {packs.map((pack) => (
          <section key={pack.slug} className="border border-rule bg-sheet p-4">
            <h2 className="font-serif text-2xl">{pack.title}</h2>
            <p className="mt-2 text-sm text-muted">{pack.body}</p>
            <div className="mt-4"><LetterButton slug={pack.slug} /></div>
            <ul className="mt-4 space-y-3 border-t border-rule pt-3">
              {pack.items.map((story) => (
                <li key={story.groupKey}>
                  <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-lg leading-snug hover:text-crimson">{story.title}</Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Frame>
  );
}

export function PuzzleView() {
  const lang = useBoot().lang;
  const on = useOn();
  const [index, setIndex] = useState(0);
  const [pool, setPool] = useState<string[]>([]);
  const [built, setBuilt] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const clue = CLUES[index % CLUES.length];
  useEffect(() => {
    const item = CLUES[0];
    if (!item) return;
    setPool(shuffle(item.answer, 3));
    setBest(readBest());
  }, []);
  function load(next: number, salt: number) {
    const item = CLUES[next % CLUES.length];
    if (!item) return;
    setIndex(next % CLUES.length);
    setPool(shuffle(item.answer, salt));
    setBuilt([]);
    setNote("");
  }
  function take(letter: string, from: number) {
    setPool((cur) => cur.filter((_, i) => i !== from));
    setBuilt((cur) => [...cur, letter]);
    setNote("");
  }
  function back(letter: string, from: number) {
    setBuilt((cur) => cur.filter((_, i) => i !== from));
    setPool((cur) => [...cur, letter]);
  }
  function check() {
    if (!clue) return;
    if (built.join("") === clue.answer) {
      const next = score + 1;
      setScore(next);
      writeBest(next);
      setBest(readBest());
      setNote(n(lang, "right"));
    } else {
      setNote(n(lang, "wrong"));
    }
  }
  if (!on || !clue) return <Frame><PageHead kicker={n(lang, "puzzle")} title={n(lang, "puzzle")} /></Frame>;
  return (
    <Frame>
      <PageHead kicker={n(lang, "puzzle")} title={clueText(lang, clue.clue)} lede={n(lang, "puzzleHint")} />
      <p className="mt-4 text-sm text-muted">{n(lang, "score")}: {score} · {n(lang, "best")}: {best}</p>
      <div className="mt-6 flex min-h-14 flex-wrap gap-2 border border-ink bg-sheet p-3">
        {built.map((letter, i) => (
          <button key={`${letter}-${i}`} type="button" onClick={() => back(letter, i)} className="grid h-12 w-12 place-items-center border border-ink font-serif text-2xl">{letter}</button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {pool.map((letter, i) => (
          <button key={`${letter}-${i}`} type="button" onClick={() => take(letter, i)} className="grid h-12 w-12 place-items-center border border-rule bg-paper font-serif text-2xl">{letter}</button>
        ))}
      </div>
      <p className="mt-4 text-sm">{note}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="h-11 bg-crimson px-4 text-sm font-semibold text-on-mast" onClick={check} disabled={built.length !== lettersOf(clue.answer).length}>{n(lang, "check")}</button>
        <button type="button" className="h-11 border border-rule px-4 text-sm" onClick={() => load(index, Date.now() % 97)}>{n(lang, "again")}</button>
        <button type="button" className="h-11 border border-ink px-4 text-sm" onClick={() => load(index + 1, index + 5)}>{n(lang, "nextWord")}</button>
      </div>
    </Frame>
  );
}

export function SavedView({ stories }: { stories: StoryCard[] }) {
  const boot = useBoot();
  const lang = boot.lang;
  const { user, isPending } = useCurrentUserState();
  const on = useOn();
  const [saves, setSaves] = useState<string[]>([]);
  const [follows, setFollows] = useState<{ kind: string; target: string }[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    if (!on || isPending) return;
    setHistory(readHistory());
    if (!user) {
      setSaves(readSaves());
      setFollows(readFollows());
      return;
    }
    myShelf()
      .then((shelf) => {
        setSaves(shelf.saves);
        setFollows(shelf.follows);
      })
      .catch(() => {
        setSaves(readSaves());
        setFollows(readFollows());
      });
  }, [on, user, isPending]);
  const savedStories = saves.map((key) => stories.find((story) => story.groupKey === key)).filter((story): story is StoryCard => Boolean(story));
  const recent = history.map((key) => stories.find((story) => story.groupKey === key)).filter((story): story is StoryCard => Boolean(story)).slice(0, 6);
  return (
    <Frame>
      <PageHead kicker={user ? n(lang, "account") : n(lang, "device")} title={n(lang, "saved")} />
      <h2 className="mt-8 font-serif text-2xl">{n(lang, "saved")}</h2>
      {savedStories.length === 0 ? <p className="mt-3 text-muted">{n(lang, "nothingSaved")}</p> : (
        <div className="mt-4 grid gap-6 md:grid-cols-2">{savedStories.map((story) => <StoryTease key={story.groupKey} story={story} lang={lang} deck />)}</div>
      )}
      <h2 className="mt-10 font-serif text-2xl">{n(lang, "followed")}</h2>
      {follows.length === 0 ? <p className="mt-3 text-muted">{n(lang, "emptyDesk")}</p> : (
        <ul className="mt-3 flex flex-wrap gap-2">
          {follows.map((item) => item.kind === "section" ? (
            <li key={`${item.kind}-${item.target}`}>
              <Link to="/section/$slug" params={{ slug: item.target }} className="inline-block border border-rule px-3 py-2 text-sm hover:border-ink">
                {boot.categories.find((category) => category.slug === item.target)?.name ?? item.target}
              </Link>
            </li>
          ) : (
            <li key={`${item.kind}-${item.target}`}>
              <Link to="/author/$slug" params={{ slug: item.target }} className="inline-block border border-rule px-3 py-2 text-sm hover:border-ink">{item.target}</Link>
            </li>
          ))}
        </ul>
      )}
      <h2 className="mt-10 font-serif text-2xl">{n(lang, "recent")}</h2>
      <ul className="mt-3 divide-y divide-rule">
        {recent.map((story) => (
          <li key={story.groupKey} className="py-3">
            <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-xl hover:text-crimson">{story.title}</Link>
          </li>
        ))}
      </ul>
    </Frame>
  );
}

type Pulse = {
  sections: { slug: string; name: string; stories: number; views: number }[];
  totalViews: number;
  totalStories: number;
  top: StoryCard[];
};

export function NumbersView({ pulse }: { pulse: Pulse }) {
  const lang = useBoot().lang;
  const on = useOn();
  return (
    <Frame>
      <PageHead kicker={n(lang, "numbers")} title={n(lang, "bySection")} />
      <dl className="mt-6 grid grid-cols-2 gap-3">
        <div className="border border-rule bg-sheet p-4">
          <dt className="text-xs text-muted">{n(lang, "stories")}</dt>
          <dd className="mt-1 font-serif text-4xl tabular-nums">{pulse.totalStories}</dd>
        </div>
        <div className="border border-rule bg-sheet p-4">
          <dt className="text-xs text-muted">{n(lang, "reads")}</dt>
          <dd className="mt-1 font-serif text-4xl tabular-nums">{pulse.totalViews}</dd>
        </div>
      </dl>
      <div dir="ltr" className="mt-6 h-72 border border-rule bg-sheet p-2">
        {on ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pulse.sections} layout="vertical" margin={{ left: 16, right: 12 }}>
              <XAxis type="number" tick={{ fill: "var(--color-muted)", fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={110} tick={{ fill: "var(--color-ink)", fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="views" fill="var(--color-crimson)" />
            </BarChart>
          </ResponsiveContainer>
        ) : null}
      </div>
      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-ink text-start">
            <th className="py-2 font-semibold">{n(lang, "bySection")}</th>
            <th className="py-2 font-semibold">{n(lang, "stories")}</th>
            <th className="py-2 font-semibold">{n(lang, "reads")}</th>
          </tr>
        </thead>
        <tbody>
          {pulse.sections.map((row) => (
            <tr key={row.slug} className="border-b border-rule">
              <td className="py-2"><Link to="/section/$slug" params={{ slug: row.slug }} className="hover:text-crimson">{row.name}</Link></td>
              <td className="py-2 tabular-nums">{row.stories}</td>
              <td className="py-2 tabular-nums">{row.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mt-8 font-serif text-2xl">{n(lang, "reads")}</h2>
      <ol className="mt-3">
        {pulse.top.map((story, index) => (
          <li key={story.groupKey} className="flex gap-3 border-b border-rule py-3">
            <span className="font-serif text-2xl text-crimson tabular-nums">{index + 1}</span>
            <Link to="/article/$slug" params={{ slug: story.groupKey }} className="font-serif text-xl hover:text-crimson">{story.title}</Link>
            <span className="ms-auto tabular-nums text-muted">{story.views}</span>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export function CalendarView({ events }: { events: { id: number; title: string; place: string; startsOn: string; detail: string; fixed: boolean }[] }) {
  const lang = useBoot().lang;
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((event) => event.startsOn >= today);
  const earlier = events.filter((event) => event.startsOn < today).reverse();
  function List({ rows }: { rows: typeof events }) {
    return (
      <ul className="mt-3 divide-y divide-rule border-y border-rule">
        {rows.map((event) => (
          <li key={`${event.id}-${event.startsOn}-${event.title}`} className="grid gap-1 py-4 sm:grid-cols-12">
            <time className="text-sm font-semibold sm:col-span-3" dateTime={event.startsOn}>{formatWhen(lang, `${event.startsOn}T12:00:00Z`)}</time>
            <div className="sm:col-span-9">
              <h2 className="font-serif text-2xl">{event.title}</h2>
              <p className="text-sm text-muted">{event.place}</p>
              <p className="mt-1">{event.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <Frame>
      <PageHead kicker={n(lang, "calendar")} title={n(lang, "upcoming")} />
      {upcoming.length === 0 ? <p className="mt-4 text-muted">{n(lang, "emptyDesk")}</p> : <List rows={upcoming} />}
      <h2 className="mt-10 font-serif text-2xl">{n(lang, "earlier")}</h2>
      <List rows={earlier} />
    </Frame>
  );
}

export function CorrectionsView({ rows }: { rows: { id: number; groupKey: string; note: string; createdAt: string }[] }) {
  const lang = useBoot().lang;
  return (
    <Frame>
      <PageHead kicker={n(lang, "fixes")} title={n(lang, "fixes")} />
      <ul className="mt-6 divide-y divide-rule border-y border-rule">
        {rows.map((row) => (
          <li key={row.id} className="py-4">
            <p className="text-xs text-muted">{formatWhen(lang, row.createdAt)}</p>
            <p className="mt-2 leading-relaxed">{row.note}</p>
            {row.groupKey ? (
              <Link to="/article/$slug" params={{ slug: row.groupKey }} className="mt-2 inline-block text-sm font-semibold hover:text-crimson">{n(lang, "open")}</Link>
            ) : null}
          </li>
        ))}
      </ul>
      {rows.length === 0 ? <p className="mt-4 text-muted">{n(lang, "emptyDesk")}</p> : null}
    </Frame>
  );
}

export function MastheadView({ people }: { people: { slug: string; name: string; title: string; location: string; bio: string; role: string }[] }) {
  const lang = useBoot().lang;
  return (
    <Frame>
      <PageHead kicker="KNC" title={n(lang, "people")} />
      <ul className="mt-8 divide-y divide-rule border-y border-rule">
        {people.map((person) => (
          <li key={person.slug} className="grid gap-2 py-5 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <Link to="/author/$slug" params={{ slug: person.slug }} className="font-serif text-2xl hover:text-crimson">{person.name}</Link>
              <p className="text-sm text-crimson">{person.title}</p>
            </div>
            <p className="text-sm leading-relaxed sm:col-span-8">{person.bio}</p>
          </li>
        ))}
      </ul>
    </Frame>
  );
}
