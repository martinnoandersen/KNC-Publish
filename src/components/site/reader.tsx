import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { formatWhen } from "@/lib/i18n";
import { n } from "@/lib/newsroom/copy";
import {
  readFollows,
  readLetters,
  readSaves,
  remember,
  toggleLocalFollow,
  toggleLocalLetter,
  toggleLocalSave,
  type Follow,
} from "@/lib/newsroom/local";
import { listComments, myShelf, postComment, toggleFollow, toggleLetter, toggleSave } from "@/lib/newsroom/public-api";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useBoot } from "./shell";

type Shelf = { saves: string[]; follows: Follow[]; letters: string[] };

function useFlag(dep: string, load: (shelf: Shelf) => boolean, local: () => boolean) {
  const { user, isPending } = useCurrentUserState();
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (isPending) return;
    let stop = false;
    if (user) {
      myShelf()
        .then((shelf) => {
          if (!stop) setOn(load(shelf));
        })
        .catch(() => {
          if (!stop) setOn(false);
        });
    } else {
      setOn(local());
    }
    return () => {
      stop = true;
    };
    // load/local close over dep, which is listed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isPending, dep]);
  return { user, on, setOn };
}

export function SaveButton({ groupKey }: { groupKey: string }) {
  const lang = useBoot().lang;
  const flag = useFlag(
    groupKey,
    (shelf) => shelf.saves.includes(groupKey),
    () => readSaves().includes(groupKey),
  );
  async function press() {
    if (flag.user) {
      const res = await toggleSave({ data: groupKey });
      flag.setOn(res.on);
      return;
    }
    flag.setOn(toggleLocalSave(groupKey));
  }
  return (
    <button type="button" onClick={() => void press()} className={flag.on ? "h-11 border border-ink bg-ink px-4 text-sm text-paper" : "h-11 border border-rule px-4 text-sm"}>
      {flag.on ? n(lang, "savedStory") : n(lang, "saveStory")}
      <span className="ms-2 text-xs text-muted">{flag.user ? n(lang, "account") : n(lang, "device")}</span>
    </button>
  );
}

export function FollowButton({ kind, target }: { kind: Follow["kind"]; target: string }) {
  const lang = useBoot().lang;
  const flag = useFlag(
    `${kind}:${target}`,
    (shelf) => shelf.follows.some((item) => item.kind === kind && item.target === target),
    () => readFollows().some((item) => item.kind === kind && item.target === target),
  );
  async function press() {
    if (flag.user) {
      const res = await toggleFollow({ data: { kind, target } });
      flag.setOn(res.on);
      return;
    }
    flag.setOn(toggleLocalFollow(kind, target));
  }
  return (
    <button type="button" onClick={() => void press()} className={flag.on ? "h-11 shrink-0 border border-ink bg-ink px-4 text-sm text-paper" : "h-11 shrink-0 border border-ink px-4 text-sm"}>
      {flag.on ? n(lang, "following") : n(lang, "follow")}
    </button>
  );
}

export function LetterButton({ slug }: { slug: string }) {
  const lang = useBoot().lang;
  const flag = useFlag(
    slug,
    (shelf) => shelf.letters.includes(slug),
    () => readLetters().includes(slug),
  );
  async function press() {
    if (flag.user) {
      const res = await toggleLetter({ data: slug });
      flag.setOn(res.on);
      return;
    }
    flag.setOn(toggleLocalLetter(slug));
  }
  return (
    <button type="button" onClick={() => void press()} className={flag.on ? "h-11 bg-ink px-4 text-sm font-semibold text-paper" : "h-11 bg-crimson px-4 text-sm font-semibold text-on-mast"}>
      {flag.on ? n(lang, "onList") : n(lang, "offList")}
    </button>
  );
}

type Comment = { id: number; name: string; body: string; createdAt: string };

export function Comments({ groupKey }: { groupKey: string }) {
  const lang = useBoot().lang;
  const { user, isPending } = useCurrentUserState();
  const [rows, setRows] = useState<Comment[]>([]);
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  function reload() {
    listComments({ data: groupKey })
      .then(setRows)
      .catch(() => setRows([]));
  }

  useEffect(() => {
    reload();
  }, [groupKey]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setSending(true);
    try {
      const row = await postComment({ data: { groupKey, body } });
      setRows((cur) => [...cur, row]);
      setBody("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="no-print mt-12 border-t border-ink pt-6">
      <h2 className="font-serif text-3xl">{n(lang, "comments")}</h2>
      <p className="mt-2 text-sm text-muted">{n(lang, "commentHint")}</p>
      {rows.length === 0 ? <p className="mt-6 text-muted">{n(lang, "noComments")}</p> : (
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {rows.map((row) => (
            <li key={row.id} className="py-4">
              <p className="text-sm font-semibold">
                {row.name}
                <span className="ms-2 font-normal text-muted">{formatWhen(lang, row.createdAt)}</span>
              </p>
              <p className="mt-2 whitespace-pre-wrap leading-relaxed">{row.body}</p>
            </li>
          ))}
        </ol>
      )}
      {isPending ? null : user ? (
        <form onSubmit={(event) => void submit(event)} className="mt-6 grid gap-3">
          <label className="text-sm font-semibold" htmlFor="comment-body">{n(lang, "comments")}</label>
          <textarea
            id="comment-body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            minLength={2}
            maxLength={1200}
            rows={4}
            className="border border-rule bg-sheet px-3 py-3 text-base outline-none focus:border-ink"
          />
          {error ? <p className="text-sm text-crimson">{error}</p> : null}
          <button type="submit" disabled={sending} className="h-11 w-fit bg-crimson px-5 text-sm font-semibold text-on-mast disabled:opacity-60">
            {n(lang, "send")}
          </button>
        </form>
      ) : (
        <p className="mt-6">
          <Link to="/login" className="font-semibold text-crimson underline">{n(lang, "commentNeed")}</Link>
        </p>
      )}
    </section>
  );
}

export function trackRead(groupKey: string) {
  remember(groupKey);
}
