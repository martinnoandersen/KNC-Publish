import type { CvLine, RefItem } from "./types";

export function asJson<T>(value: unknown, fallback: T): T {
  if (value == null || value === "") return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

export function loc(value: unknown, lang: string): string {
  if (typeof value === "string" && value.trim().startsWith("{")) {
    const obj = asJson<Record<string, string>>(value, {});
    return obj[lang] || obj.ckb || obj.en || Object.values(obj)[0] || "";
  }
  if (value && typeof value === "object") {
    const obj = value as Record<string, string>;
    return obj[lang] || obj.ckb || obj.en || Object.values(obj)[0] || "";
  }
  return typeof value === "string" ? value : "";
}

export function locList(value: unknown, lang: string): CvLine[] {
  const obj = asJson<Record<string, CvLine[]>>(value, {});
  const list = obj[lang] ?? obj.ckb ?? obj.en ?? Object.values(obj)[0] ?? [];
  return Array.isArray(list) ? list : [];
}

export function asRefs(value: unknown): RefItem[] {
  const list = asJson<RefItem[]>(value, []);
  return Array.isArray(list) ? list : [];
}

export function slugify(input: string): string {
  const base = input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64);
  return base;
}

export function cleanKey(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}
