export type Follow = { kind: "section" | "author"; target: string };

const SAVES = "knc-saves";
const FOLLOWS = "knc-follows";
const LETTERS = "knc-letters";
const HISTORY = "knc-history";
const TYPE = "knc-type";
const BEST = "knc-puzzle-best";

function readRaw(key: string): unknown {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(key) || "null");
  } catch {
    return null;
  }
}

export function readList(key: string): string[] {
  const value = readRaw(key);
  return Array.isArray(value) ? value.filter((item) => typeof item === "string").slice(0, 80) : [];
}

function writeList(key: string, values: string[]) {
  localStorage.setItem(key, JSON.stringify(values.slice(0, 80)));
}

export function readSaves() {
  return readList(SAVES);
}

export function toggleLocalSave(groupKey: string): boolean {
  const cur = readSaves();
  const has = cur.includes(groupKey);
  writeList(SAVES, has ? cur.filter((item) => item !== groupKey) : [groupKey, ...cur]);
  return !has;
}

export function readFollows(): Follow[] {
  const value = readRaw(FOLLOWS);
  if (!Array.isArray(value)) return [];
  return value
    .filter((item) => item && (item.kind === "section" || item.kind === "author") && typeof item.target === "string")
    .slice(0, 80);
}

export function toggleLocalFollow(kind: Follow["kind"], target: string): boolean {
  const cur = readFollows();
  const has = cur.some((item) => item.kind === kind && item.target === target);
  const next = has ? cur.filter((item) => !(item.kind === kind && item.target === target)) : [...cur, { kind, target }];
  localStorage.setItem(FOLLOWS, JSON.stringify(next));
  return !has;
}

export function readLetters() {
  return readList(LETTERS);
}

export function toggleLocalLetter(slug: string): boolean {
  const cur = readLetters();
  const has = cur.includes(slug);
  writeList(LETTERS, has ? cur.filter((item) => item !== slug) : [...cur, slug]);
  return !has;
}

export function remember(groupKey: string) {
  const cur = readList(HISTORY).filter((item) => item !== groupKey);
  writeList(HISTORY, [groupKey, ...cur].slice(0, 24));
}

export function readHistory() {
  return readList(HISTORY);
}

export type TypeSize = "s" | "m" | "l";

export function readType(): TypeSize {
  if (typeof window === "undefined") return "m";
  const value = localStorage.getItem(TYPE);
  return value === "s" || value === "l" ? value : "m";
}

export function writeType(size: TypeSize) {
  document.documentElement.dataset.type = size;
  localStorage.setItem(TYPE, size);
}

export function readBest(): number {
  if (typeof window === "undefined") return 0;
  const n = Number(localStorage.getItem(BEST));
  return Number.isFinite(n) ? n : 0;
}

export function writeBest(score: number) {
  const prev = readBest();
  if (score > prev) localStorage.setItem(BEST, String(score));
}
