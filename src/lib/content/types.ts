export type RefItem = {
  authors: string;
  year: string;
  title: string;
  source: string;
};

export type CvLine = { years: string; place: string; detail: string };

export type StoryCard = {
  id: number;
  groupKey: string;
  lang: string;
  availableLangs: string[];
  kind: string;
  type: string;
  title: string;
  dek: string;
  image: string;
  imageCaption: string;
  category: string;
  categoryName: string;
  authorName: string;
  authorSlug: string;
  authorTitle: string;
  tags: { slug: string; name: string }[];
  views: number;
  publishedAt: string | null;
  minutes: number;
  zones: string[];
  status: string;
};

export type FileItem = { name: string; url: string };

export type StoryFull = StoryCard & {
  body: string;
  subtitle: string;
  refs: RefItem[];
  files: FileItem[];
  reviewNote: string;
  authorId: string;
};

export type SearchPayload = {
  stories: (StoryCard & { snippet: string; refs: RefItem[]; files: FileItem[] })[];
  pages: { slug: string; title: string; snippet: string }[];
  people: { slug: string; name: string; title: string }[];
  books: { title: string; dek: string; year: string; url: string; kind: string; issue: string; cover: string }[];
};

export type Publication = {
  id: number;
  kind: string;
  lang: string;
  title: string;
  dek: string;
  year: string;
  cover: string;
  url: string;
  issue: string;
};

export type HomeSection = {
  slug: string;
  name: string;
  stories: StoryCard[];
};

export type HomePayload = {
  hero: StoryCard[];
  lead: StoryCard[];
  sections: HomeSection[];
  latest: StoryCard[];
  sidebar: StoryCard[];
  readers: StoryCard[];
  mostRead: StoryCard[];
  tags: { slug: string; name: string }[];
};

export type AuthorProfile = {
  slug: string;
  name: string;
  title: string;
  location: string;
  languages: string;
  email: string;
  avatar: string;
  bio: string;
  education: CvLine[];
  experience: CvLine[];
  count: number;
  groups: { category: string; categoryName: string; stories: StoryCard[] }[];
  tags: { slug: string; name: string }[];
  staff: boolean;
  role: string;
};

export type PageDoc = {
  slug: string;
  lang: string;
  title: string;
  body: string;
  availableLangs: string[];
};

export type SiteLayout = {
  topbar: boolean;
  tagline: boolean;
  wire: boolean;
  political: boolean;
  hero: boolean;
  lead: boolean;
  latest: boolean;
  sidebar: boolean;
  footer: boolean;
  sections: string[];
  styles: Record<string, string>;
};

export function defaultLayout(): SiteLayout {
  return {
    topbar: true,
    tagline: true,
    wire: true,
    political: true,
    hero: true,
    lead: true,
    latest: true,
    sidebar: true,
    footer: true,
    sections: [],
    styles: {},
  };
}

export function parseLayout(raw: string | undefined | null): SiteLayout {
  const base = defaultLayout();
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw) as Partial<SiteLayout>;
    return {
      ...base,
      ...parsed,
      sections: Array.isArray(parsed.sections) ? parsed.sections.map((item) => String(item)).slice(0, 24) : [],
      styles: parsed.styles && typeof parsed.styles === "object"
        ? Object.fromEntries(Object.entries(parsed.styles).map(([key, value]) => [String(key).slice(0, 48), String(value).slice(0, 16)]))
        : {},
    };
  } catch {
    return base;
  }
}
export type Boot = {
  lang: string;
  dir: "rtl" | "ltr";
  theme: string;
  logo: string;
  layout: SiteLayout;
  plugins: string[];
  categories: { slug: string; name: string }[];
  tagline: string;
  today: string;
};

export const MEDIA = [
  { src: "/media/state-reason.jpg", label: "State reason" },
  { src: "/media/constitution.jpg", label: "Constitution" },
  { src: "/media/institutions.jpg", label: "Institutions" },
  { src: "/media/archive.jpg", label: "Archive" },
  { src: "/media/congress.jpg", label: "Congress" },
  { src: "/media/institution-flag.jpg", label: "Institution" },
  { src: "/media/territory.jpg", label: "Territory" },
  { src: "/media/treasury.jpg", label: "Treasury" },
  { src: "/media/customs.jpg", label: "Customs" },
  { src: "/media/one-country.jpg", label: "One country" },
  { src: "/media/books.jpg", label: "Books" },
] as const;
