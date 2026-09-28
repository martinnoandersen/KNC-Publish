import { createServerFn } from "@tanstack/react-start";
import { isLang } from "@/lib/i18n";

async function requestLang(): Promise<string> {
  const { getCookie, getRequestHeader } = await import("@tanstack/react-start/server");
  const header = getRequestHeader("x-knc-lang");
  if (isLang(header)) return header;
  const raw = getCookie("knc_lang");
  return isLang(raw) ? raw : "ckb";
}

export const getBoot = createServerFn({ method: "GET" }).handler(async () => {
  const { getBootData } = await import("./query.server");
  return getBootData(await requestLang());
});

export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  const { getBooksData } = await import("./query.server");
  return getBooksData(await requestLang());
});

export const getHome = createServerFn({ method: "GET" }).handler(async () => {
  const { getHomeData } = await import("./query.server");
  return getHomeData(await requestLang());
});

export const getStory = createServerFn({ method: "GET" })
  .validator((groupKey: string) => String(groupKey ?? "").slice(0, 80))
  .handler(async ({ data }) => {
    const { getStoryData } = await import("./query.server");
    return getStoryData(data, await requestLang());
  });

export const getListing = createServerFn({ method: "GET" })
  .validator((input: { category?: string; tag?: string; kind?: string }) => ({
    category: String(input?.category ?? "").slice(0, 48),
    tag: String(input?.tag ?? "").slice(0, 48),
    kind: String(input?.kind ?? "").slice(0, 16),
  }))
  .handler(async ({ data }) => {
    const { getListingData } = await import("./query.server");
    return getListingData({ ...data, lang: await requestLang() });
  });

export const searchStories = createServerFn({ method: "GET" })
  .validator((input: { q?: string; section?: string } | string) => {
    if (typeof input === "string") return { q: input.slice(0, 120), section: "" };
    return {
      q: String(input?.q ?? "").slice(0, 120),
      section: String(input?.section ?? "").slice(0, 48),
    };
  })
  .handler(async ({ data }) => {
    const { searchData } = await import("./query.server");
    return searchData(data.q, await requestLang(), data.section);
  });

export const getMagazine = createServerFn({ method: "GET" }).handler(async () => {
  const { getMagazineData } = await import("./query.server");
  return getMagazineData(await requestLang());
});

export const getAuthor = createServerFn({ method: "GET" })
  .validator((slug: string) => String(slug ?? "").slice(0, 80))
  .handler(async ({ data }) => {
    const { getAuthorData } = await import("./query.server");
    return getAuthorData(data, await requestLang());
  });

export const getPage = createServerFn({ method: "GET" })
  .validator((slug: string) => String(slug ?? "").slice(0, 80))
  .handler(async ({ data }) => {
    const { getPageData } = await import("./query.server");
    return getPageData(data, await requestLang());
  });

export const bumpView = createServerFn({ method: "POST" })
  .validator((id: number) => Number(id) || 0)
  .handler(async ({ data }) => {
    if (!data) return;
    const { bumpView: bump } = await import("./query.server");
    await bump(data);
  });
