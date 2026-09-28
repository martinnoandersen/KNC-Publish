import { useEffect, useState } from "react";
import { useRouteContext } from "@tanstack/react-router";
import { pushKey, savePush } from "@/lib/content/push-api";

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };

let deferred: InstallPrompt | null = null;

function pendingPrompt() {
  const stored = (window as Window & { __kncInstall?: InstallPrompt | null }).__kncInstall;
  return stored ?? deferred;
}

async function runPrompt(event: InstallPrompt) {
  await event.prompt();
  const choice = await event.userChoice;
  deferred = null;
  (window as Window & { __kncInstall?: InstallPrompt | null }).__kncInstall = null;
  return choice.outcome === "accepted";
}

function keyBytes(value: string) {
  const padded = value + "=".repeat((4 - (value.length % 4)) % 4);
  const raw = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (char) => char.charCodeAt(0));
}

const COPY = {
  ckb: {
    title: "KNC PUBLISH",
    body: "ماڵپەڕەکە وەک ئەپ دابەزێنە. نۆتیفیکەیشنیش بۆ وتاری نوێ، پۆست و پەیام.",
    install: "دابەزاندن",
    notify: "نۆتیفیکەیشنم پێ بگات",
    later: "دواتر",
    installed: "KNC PUBLISH دامەزرا.",
    allowed: "نۆتیفیکەیشن چالاکە.",
    opening: "داواکاریی دامەزراندن خۆی دەکرێتەوە.",
    manual: "ئەگەر دوگمەی دامەزراندن دەرنەکەوت، لە وێبگەڕەکەت Add to Home Screen هەڵبژێرە.",
  },
  kmr: {
    title: "KNC PUBLISH",
    body: "Malperê wek sepanê daxîne. Agahdarî ji bo gotar, nivîs û peyamên nû.",
    install: "Daxistin",
    notify: "Agahdariyan bistîne",
    later: "Paşê",
    installed: "KNC PUBLISH hat daxistin.",
    allowed: "Agahdarî çalak e.",
    opening: "Daxwaza daxistinê bi xwe vedibe.",
    manual: "Heke bişkok derneket, di gerokê de Add to Home Screen hilbijêre.",
  },
  en: {
    title: "KNC PUBLISH",
    body: "Install the site as an app, and receive a notice for every new article, post, and message.",
    install: "Install",
    notify: "Send me notices",
    later: "Later",
    installed: "KNC PUBLISH is installed.",
    allowed: "Notices are on.",
    opening: "The install prompt opens on its own.",
    manual: "If the install button does not appear, choose Add to Home Screen in the browser.",
  },
  he: {
    title: "KNC PUBLISH",
    body: "התקינו את האתר כאפליקציה, וקבלו התראה על מאמר, רשימה או הודעה חדשה.",
    install: "התקנה",
    notify: "לקבל התראות",
    later: "אחר כך",
    installed: "KNC PUBLISH הותקנה.",
    allowed: "ההתראות פעילות.",
    opening: "בקשת ההתקנה נפתחת מעצמה.",
    manual: "אם כפתור ההתקנה לא מופיע, בחרו Add to Home Screen בדפדפן.",
  },
} as const;

export function InstallGate() {
  const lang = useRouteContext({ from: "__root__" }).boot.lang;
  const text = COPY[lang as keyof typeof COPY] ?? COPY.en;
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator) void navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    const onPrompt = (event: Event) => {
      event.preventDefault();
      deferred = event as InstallPrompt;
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    const standalone = window.matchMedia("(display-mode: standalone)").matches
      || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    const asked = sessionStorage.getItem("knc_gate") === "1";
    const allowed = Notification.permission === "granted";
    if (!asked && !(standalone && allowed)) setOpen(true);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  function close() {
    sessionStorage.setItem("knc_gate", "1");
    setOpen(false);
  }

  async function install() {
    const event = pendingPrompt();
    if (event) {
      if (await runPrompt(event)) setNote(text.installed);
      return;
    }
    const framed = window.self !== window.top;
    const url = new URL(window.location.href);
    url.searchParams.set("knc_install", "1");
    if (framed) {
      const opened = window.open(url.toString(), "_blank");
      if (opened) {
        setNote(text.opening);
        return;
      }
    }
    window.addEventListener(
      "knc-can-install",
      () => {
        const next = pendingPrompt();
        if (next) void runPrompt(next).then((ok) => { if (ok) setNote(text.installed); });
      },
      { once: true },
    );
    if (!framed) {
      history.replaceState(null, "", url.pathname + url.search + url.hash);
      setNote(text.opening);
      return;
    }
    setNote(text.manual);
  }

  async function notify() {
    if (!("Notification" in window) || !("serviceWorker" in navigator)) return;
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;
    const registration = await navigator.serviceWorker.ready;
    const key = await pushKey();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: keyBytes(key),
    });
    const json = sub.toJSON();
    await savePush({
      data: {
        endpoint: sub.endpoint,
        p256dh: json.keys?.p256dh ?? "",
        auth: json.keys?.auth ?? "",
      },
    });
    setNote(text.allowed);
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-ink/50 px-4">
      <div className="w-full max-w-md border border-ink bg-paper p-6 shadow-2xl">
        <p className="text-xs tracking-widest text-crimson">KNC PUBLISH</p>
        <h2 className="mt-2 font-serif text-4xl">{text.title}</h2>
        <p className="mt-3 text-base leading-relaxed">{text.body}</p>
        {note ? <p className="mt-3 text-sm text-crimson">{note}</p> : null}
        <div className="mt-6 flex flex-wrap gap-2">
          <button type="button" className="h-11 bg-crimson px-4 text-sm font-semibold text-on-mast" onClick={() => void install()}>
            {text.install}
          </button>
          <button type="button" className="h-11 border border-ink px-4 text-sm font-semibold" onClick={() => void notify()}>
            {text.notify}
          </button>
          <button type="button" className="h-11 px-3 text-sm text-muted" onClick={close}>
            {text.later}
          </button>
        </div>
      </div>
    </div>
  );
}
