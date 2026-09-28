import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouteContext, useRouter } from "@tanstack/react-router";
import { Menu, Search, X, Languages, LogIn, PenLine, UserRound } from "lucide-react";
import { InstallGate } from "@/components/site/install-gate";
import { useCurrentUser, useCurrentUserState } from "@/lib/auth/use-current-user";
import { t, type DictKey } from "@/lib/i18n";
import { syncProfile } from "@/lib/content/desk-api";
import { n } from "@/lib/newsroom/copy";
import { readType, writeType, type TypeSize } from "@/lib/newsroom/local";

export function useBoot() {
  return useRouteContext({ from: "__root__" }).boot;
}

export function useLang() {
  return useBoot().lang;
}

export function setSiteLang(lang: string) {
  try {
    localStorage.setItem("knc_lang", lang);
  } catch {
    /* private mode */
  }
  const secure = location.protocol === "https:" ? "; Secure; SameSite=None; Partitioned" : "; SameSite=Lax";
  document.cookie = `knc_lang=${encodeURIComponent(lang)}; Path=/; Max-Age=31536000${secure}`;
}

function LogoMark({ src }: { src: string }) {
  if (src) {
    return <img src={src} alt="" width={80} height={80} className="h-20 w-20 shrink-0 object-contain" />;
  }
  return (
    <span className="latin-face grid h-20 w-20 shrink-0 place-items-center border border-ink text-sm">
      KNC
    </span>
  );
}

export function Site({ children }: { children: ReactNode }) {
  const boot = useBoot();
  const router = useRouter();
  const lang = boot.lang;
  const tr = (key: DictKey) => t(lang, key);
  const { user, isPending } = useCurrentUserState();
  const current = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [seek, setSeek] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (!current) return;
    syncProfile({ data: { name: current.displayName ?? "" } }).catch(() => undefined);
  }, [current]);

  useEffect(() => {
    writeType(readType());
  }, []);

  function chooseLang(next: string) {
    setSiteLang(next);
    window.location.reload();
  }

  useEffect(() => {
    let stored = "";
    try {
      stored = localStorage.getItem("knc_lang") ?? "";
    } catch {
      stored = "";
    }
    if (!stored || stored === lang) return;
    void router.invalidate();
  }, [lang, router]);

  function stepType(dir: -1 | 1) {
    const order: TypeSize[] = ["s", "m", "l"];
    const cur = (document.documentElement.dataset.type as TypeSize) || "m";
    const index = Math.max(0, order.indexOf(cur));
    writeType(order[Math.min(order.length - 1, Math.max(0, index + dir))] ?? "m");
  }

  return (
    <div className="min-h-screen">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-sheet focus:p-3">
        {tr("home")}
      </a>
      {boot.layout?.topbar ? (
      <div className="relative z-50 bg-mast text-on-mast">
        <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-1.5 text-xs">
          <span className="truncate">{boot.today}</span>
          <span className="text-on-mast/60">·</span>
          <span className="hidden truncate sm:inline">{tr("edition")}</span>
          <div className="ms-auto flex items-center gap-1">
            {[
              ["facebook", "Facebook", "https://kncsite.com/"],
              ["x", "X", "https://kncsite.com/"],
              ["youtube", "YouTube", "https://kncsite.com/"],
              ["instagram", "Instagram", "https://kncsite.com/"],
              ["telegram", "Telegram", "https://kncsite.com/"],
              ["whatsapp", "WhatsApp", "https://kncsite.com/"],
              ["tiktok", "TikTok", "https://kncsite.com/"],
            ].map(([id, label, href]) => (
              <a key={id} href={href} aria-label={label} title={label} className="grid h-7 w-7 place-items-center" target="_blank" rel="noreferrer">
                <img src={`/social/${id}.svg`} alt="" className="h-4 w-4" />
              </a>
            ))}
            <span className="mx-1 h-4 w-px bg-on-mast/30" />
            <button type="button" className="grid h-8 w-8 place-items-center" aria-label={tr("search")} onClick={() => { setSeek((value) => !value); setLangOpen(false); }}>
              <Search className="size-4" />
            </button>
            <div className="relative">
              <button type="button" className="grid h-8 w-8 place-items-center" aria-label={tr("languages")} onClick={() => { setLangOpen((value) => !value); setSeek(false); }}>
                <Languages className="size-4" />
              </button>
              {langOpen ? (
                <div className="absolute end-0 z-50 mt-1 min-w-44 border border-rule bg-sheet py-1 text-ink shadow-lg">
                  {boot.langs.map((item) => (
                    <button key={item.id} type="button" className="block w-full px-3 py-2 text-start text-sm hover:bg-soft" onClick={() => { chooseLang(item.id); setLangOpen(false); }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            {user ? (
              <Link to="/desk/profile" className="grid h-8 w-8 place-items-center" aria-label={tr("profile")}>
                <UserRound className="size-4" />
              </Link>
            ) : null}
            {!isPending && !user ? (
              <Link to="/login" className="grid h-8 w-8 place-items-center" aria-label={tr("signIn")}>
                <LogIn className="size-4" />
              </Link>
            ) : null}
            {user ? (
              <Link to="/desk" className="grid h-8 w-8 place-items-center" aria-label={tr("desk")}>
                <PenLine className="size-4" />
              </Link>
            ) : null}
          </div>
        </div>
        {seek ? (
          <form
            className="mx-auto flex max-w-6xl gap-2 px-4 pb-2"
            onSubmit={(event) => {
              event.preventDefault();
              setSeek(false);
              void router.navigate({ to: "/search", search: { q: query, section: "", scope: "all" } });
            }}
          >
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={tr("searchPlaceholder")}
              aria-label={tr("search")}
              autoFocus
              className="h-9 min-w-0 flex-1 border border-rule bg-sheet px-3 text-sm text-ink outline-none"
            />
          </form>
        ) : null}
      </div>
      ) : null}
      <header className="border-b border-rule bg-paper">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="KNC">
            <LogoMark src={boot.logo} />
            <span className="flex h-20 items-center border-s-2 border-crimson ps-2">
              <img src="/brand/knc-mark.svg" alt="KNC" className="h-16 w-auto shrink-0" width={22} height={64} />
            </span>
          </Link>
          <div className="min-w-0 flex-1 text-center">
            <p className="font-serif text-3xl leading-tight sm:text-4xl">
              {lang === "he"
                ? "הקונגרס הלאומי של כורדיסטן"
                : lang === "en"
                ? "Kurdistan National Congress"
                : lang === "kmr"
                  ? "Kongreya Niştimanî ya Kurdistanê"
                  : "کۆنگرەی نیشتمانیی کوردستان"}
            </p>
            {boot.layout?.tagline ? <p className="mt-2 text-sm leading-snug text-muted">{boot.tagline}</p> : null}
          </div>
          <div className="hidden w-24 sm:block" aria-hidden />
        </div>
        <div className="border-t border-ink">
          <div className="mx-auto flex max-w-6xl items-center gap-2 px-4">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center lg:hidden"
              aria-label={open ? tr("close") : tr("menu")}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
            <nav className="hidden flex-1 items-center gap-1 overflow-x-auto py-1 text-sm font-semibold lg:flex">
              <Link to="/" className="shrink-0 px-2 py-3 hover:text-crimson">{tr("home")}</Link>
              {(boot.menu.length ? boot.menu : boot.categories.map((category) => ({ id: category.slug, label: category.name, href: `/section/${category.slug}`, mega: false, children: [] as { id: number; label: string; href: string }[] }))).map((item) => (
                <div key={item.id} className="mega-item shrink-0">
                  <a href={item.href} className="inline-flex items-center px-2 py-3 hover:text-crimson">{item.label}</a>
                  {item.children.length > 0 ? (
                    <div className="mega-panel">
                      {item.children.map((child) => (
                        <a key={child.id} href={child.href} className="block px-3 py-2 text-base hover:bg-soft hover:text-crimson">{child.label}</a>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <Link to="/posts" className="shrink-0 px-2 py-3 hover:text-crimson">{tr("posts")}</Link>
            </nav>
            <span className="ms-auto hidden sm:flex">
              <button type="button" className="grid h-11 w-11 place-items-center text-sm" aria-label={n(lang, "smaller")} onClick={() => stepType(-1)}>A</button>
              <button type="button" className="grid h-11 w-11 place-items-center font-serif text-lg" aria-label={n(lang, "larger")} onClick={() => stepType(1)}>A</button>
            </span>
          </div>
        </div>
        {open ? (
          <div className="border-t border-rule px-4 py-3 lg:hidden">
            <div className="grid gap-1 text-base font-semibold">
              <Link to="/" className="py-2" onClick={() => setOpen(false)}>{tr("home")}</Link>
              {(boot.menu.length ? boot.menu : []).map((item) => (
                <div key={item.id}>
                  <a href={item.href} className="block py-2" onClick={() => setOpen(false)}>{item.label}</a>
                  {item.children.map((child) => (
                    <a key={child.id} href={child.href} className="block py-1 ps-4 text-sm font-normal" onClick={() => setOpen(false)}>{child.label}</a>
                  ))}
                </div>
              ))}
              {!boot.menu.length ? boot.categories.map((category) => (
                <Link
                  key={category.slug}
                  to="/section/$slug"
                  params={{ slug: category.slug }}
                  className="py-2"
                  onClick={() => setOpen(false)}
                >
                  {category.name}
                </Link>
              )) : null}
              <Link to="/posts" className="py-2" onClick={() => setOpen(false)}>{tr("posts")}</Link>
            </div>
          </div>
        ) : null}
        <div className="border-t border-rule">
          <nav aria-label={n(lang, "index")} className="mx-auto flex max-w-6xl gap-4 overflow-x-auto px-4 py-1 text-sm font-semibold">
            <Link to="/books" className="shrink-0 py-2 hover:text-crimson">{t(lang, "books")}</Link>
            <Link to="/section/$slug" params={{ slug: "politics" }} className="shrink-0 py-2 hover:text-crimson">{boot.categories.find((item) => item.slug === "politics")?.name}</Link>
            <Link to="/live" className="shrink-0 py-2 hover:text-crimson">{n(lang, "live")}</Link>
            <Link to="/briefing" className="shrink-0 py-2 hover:text-crimson">{n(lang, "briefing")}</Link>
            <Link to="/section/$slug" params={{ slug: "opinion" }} className="shrink-0 py-2 hover:text-crimson">{n(lang, "opinion")}</Link>
            <Link to="/newsletters" className="shrink-0 py-2 hover:text-crimson">{n(lang, "letters")}</Link>
            <Link to="/archive" search={{ m: "" }} className="shrink-0 py-2 hover:text-crimson">{n(lang, "archive")}</Link>
            <Link to="/data" className="shrink-0 py-2 hover:text-crimson">{n(lang, "numbers")}</Link>
            <Link to="/events" className="shrink-0 py-2 hover:text-crimson">{n(lang, "calendar")}</Link>
            <Link to="/section/$slug" params={{ slug: "society" }} className="shrink-0 py-2 hover:text-crimson">{boot.categories.find((item) => item.slug === "society")?.name}</Link>
            <Link to="/saved" className="shrink-0 py-2 hover:text-crimson">{n(lang, "saved")}</Link>
            <Link to="/corrections" className="shrink-0 py-2 hover:text-crimson">{n(lang, "fixes")}</Link>
            <Link to="/masthead" className="shrink-0 py-2 hover:text-crimson">{n(lang, "people")}</Link>
          </nav>
        </div>
      </header>
      <main id="content">{children}</main>
      <InstallGate />
      <footer className="mt-16 border-t border-ink bg-paper">
        {boot.layout?.footer ? (
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl">
              {lang === "he"
                ? "הקונגרס הלאומי של כורדיסטן"
                : lang === "en"
                  ? "Kurdistan National Congress"
                  : lang === "kmr"
                    ? "Kongreya Niştimanî ya Kurdistanê"
                    : "کۆنگرەی نیشتمانیی کوردستان"}
            </p>
            <p className="latin-face mt-1 text-xs tracking-widest">KNC</p>
            <p className="mt-2 text-sm text-muted">{boot.tagline}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/page/$slug" params={{ slug: "about" }} className="hover:text-crimson">{tr("about")}</Link></li>
              <li><Link to="/page/$slug" params={{ slug: "ethics" }} className="hover:text-crimson">{tr("ethics")}</Link></li>
              <li><Link to="/page/$slug" params={{ slug: "contact" }} className="hover:text-crimson">{tr("contact")}</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase">{tr("sections")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {boot.categories.map((category) => (
                <li key={category.slug}>
                  <Link to="/section/$slug" params={{ slug: category.slug }} className="hover:text-crimson">{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase">KNC</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/books" className="hover:text-crimson">{lang === "ckb" ? "پەرتووک" : lang === "kmr" ? "Pirtûk" : lang === "he" ? "ספרים" : "Books"}</Link></li>
              <li><Link to="/kongre" className="hover:text-crimson">{lang === "ckb" ? "گۆڤاری کۆنگرە" : lang === "he" ? "קונגרה" : "Kongre"}</Link></li>
              <li><a href="https://kncsite.com" className="hover:text-crimson">kncsite.com</a></li>
              <li><a href="https://kurdistankongress.com" className="hover:text-crimson">kurdistankongress.com</a></li>
              <li><a href="https://kurdistankongress.net" className="hover:text-crimson">kurdistankongress.net</a></li>
              <li><a href="https://kurdistankongress.org" className="hover:text-crimson">kurdistankongress.org</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase">{tr("languages")}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
              {boot.langs.map((item) => (
                <li key={item.id}>
                  <button type="button" className="hover:text-crimson" onClick={() => chooseLang(item.id)}>{item.label}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        ) : null}
        <div className="border-t border-rule py-4 text-center text-xs text-muted">
          © {new Date().getFullYear()} KNC · {tr("rights")}
        </div>
      </footer>
    </div>
  );
}
