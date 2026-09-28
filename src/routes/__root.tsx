import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { getBoot } from "@/lib/content/public-api";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => ({ boot: await getBoot() }),
  head: ({ match }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: match.context.boot.lang === "he"
        ? "הקונגרס הלאומי של כורדיסטן (KNC)"
        : match.context.boot.lang === "en"
        ? "Kurdistan National Congress (KNC)"
        : match.context.boot.lang === "kmr"
          ? "Kongreya Niştimanî ya Kurdistanê (KNC)"
          : "کۆنگرەی نیشتمانیی کوردستان (KNC)" },
      { name: "description", content: match.context.boot.tagline },
      { name: "theme-color", content: "#12110f" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,650;0,6..72,700;1,6..72,500&family=Source+Sans+3:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: () => (
    <main className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-serif text-5xl">404</p>
      <a href="/" className="mt-6 inline-block text-sm underline">KNC</a>
    </main>
  ),
});

function RootComponent() {
  const { boot } = Route.useRouteContext();
  return (
    <html lang={boot.lang} dir={boot.dir} data-theme={boot.theme} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var q=new URLSearchParams(location.search);var auto=q.get("knc_install")==="1";window.__kncInstall=null;window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();window.__kncInstall=e;window.dispatchEvent(new Event("knc-can-install"));if(auto){auto=false;q.delete("knc_install");var rest=q.toString();history.replaceState(null,"",location.pathname+(rest?"?"+rest:"")+location.hash);e.prompt();}});if("serviceWorker"in navigator){navigator.serviceWorker.register("/sw.js");}})();`,
          }}
        />
        <PreviewHostBridge />
        <AuthProvider>
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

