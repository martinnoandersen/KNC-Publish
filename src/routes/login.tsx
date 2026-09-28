import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Site, useBoot } from "@/components/site/shell";
import { requestWriter } from "@/lib/content/desk-api";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const boot = useBoot();
  const lang = boot.lang;
  const { user, isPending } = useCurrentUserState();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [asWriter, setAsWriter] = useState(true);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      if (mode === "up") {
        const result = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/desk",
        });
        if (result.error) throw new Error(result.error.message || "Error");
        if (asWriter) await requestWriter({ data: { name } });
      } else {
        const result = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/desk",
        });
        if (result.error) throw new Error(result.error.message || "Error");
      }
      window.location.href = "/desk";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setPending(false);
    }
  }

  return (
    <Site>
      <main className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-serif text-4xl">{t(lang, "signIn")}</h1>
        <p className="mt-3 text-sm text-muted">{t(lang, "firstAdmin")}</p>
        {isPending ? <div className="mt-8 h-40 animate-pulse bg-soft" /> : null}
        {!isPending && user ? (
          <div className="mt-8 border border-rule bg-sheet p-5">
            <p>{t(lang, "signedInAs")} {user.displayName || user.primaryEmail}</p>
            <Link to="/desk" className="mt-4 inline-flex h-11 items-center bg-ink px-4 text-sm text-paper">{t(lang, "openDesk")}</Link>
          </div>
        ) : null}
        {!isPending && !user && authEnabled ? (
          <div className="mt-8 space-y-3">
            {GROK_PROVIDERS.map((provider) => (
              <button
                key={provider.providerId}
                type="button"
                className="h-11 w-full border border-ink text-sm font-semibold"
                onClick={() => signIn(provider.providerId, { callbackURL: "/desk" })}
              >
                {t(lang, "continueWith")} {provider.label}
              </button>
            ))}
            <p className="text-center text-xs tracking-widest text-muted uppercase">{t(lang, "or")}</p>
            <form className="space-y-3" onSubmit={submit}>
              {mode === "up" ? (
                <>
                  <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t(lang, "name")} aria-label={t(lang, "name")} className="h-11 w-full border border-rule bg-sheet px-3" />
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={asWriter} onChange={(e) => setAsWriter(e.target.checked)} />
                    {t(lang, "writerApply")}
                  </label>
                </>
              ) : null}
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t(lang, "email")} aria-label={t(lang, "email")} className="h-11 w-full border border-rule bg-sheet px-3" />
              <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t(lang, "password")} aria-label={t(lang, "password")} className="h-11 w-full border border-rule bg-sheet px-3" />
              {error ? <p className="text-sm text-crimson">{error}</p> : null}
              <button type="submit" disabled={pending} className="h-11 w-full bg-crimson text-sm font-semibold text-on-mast">
                {mode === "up" ? t(lang, "createAccount") : t(lang, "signIn")}
              </button>
            </form>
            <button type="button" className="text-sm underline" onClick={() => setMode(mode === "in" ? "up" : "in")}>
              {mode === "in" ? t(lang, "needAccount") : t(lang, "haveAccount")}
            </button>
          </div>
        ) : null}
      </main>
    </Site>
  );
}
