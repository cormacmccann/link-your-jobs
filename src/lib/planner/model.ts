export type CareLevel = "supported" | "managed";
export const LOVABLE_PACKAGES = [
  {
    id: "supported",
    name: "Build + lighter care",
    description: "A guided build with a lighter level of ongoing support.",
    cap: 2500,
  },
  {
    id: "managed",
    name: "Build + more managed care",
    description:
      "A more hands-on relationship for a site you want us to help look after.",
    cap: 5000,
  },
] as const;
export const FEATURES = [
  {
    id: "blog",
    name: "Stories & articles",
    detail: "News, guides and an easy publishing routine.",
    wp: 6,
    lovable: 10,
  },
  {
    id: "shop",
    name: "Sell online",
    detail: "Products, checkout and order management.",
    wp: 22,
    lovable: 32,
  },
  {
    id: "booking",
    name: "Take bookings",
    detail: "Appointments, availability and confirmations.",
    wp: 10,
    lovable: 14,
  },
  {
    id: "members",
    name: "Customer accounts",
    detail: "Sign-in, profiles and private areas.",
    wp: 20,
    lovable: 16,
  },
  {
    id: "portal",
    name: "A dashboard or portal",
    detail: "A useful workspace for customers or your team.",
    wp: 36,
    lovable: 24,
  },
  {
    id: "automation",
    name: "Connect my tools",
    detail: "Forms, email, CRM and joined-up workflows.",
    wp: 16,
    lovable: 14,
  },
  {
    id: "languages",
    name: "More than one language",
    detail: "Localised navigation, content and search basics.",
    wp: 12,
    lovable: 18,
  },
] as const;
export type Feature = (typeof FEATURES)[number]["id"];
export type ProjectInput = {
  kind: "new" | "redesign";
  pages: number;
  features: Feature[];
  content: "ready" | "refresh" | "new";
  design: "starter" | "bespoke";
  rate: number;
  care: CareLevel;
};
export const DEFAULT_PROJECT: ProjectInput = {
  kind: "new",
  pages: 5,
  features: [],
  content: "ready",
  design: "starter",
  rate: 65,
  care: "supported",
};
export const money = (n: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
export const bounded = (value: number, min: number, max: number) =>
  Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
export function estimateProject(input: ProjectInput) {
  const pages = bounded(Math.round(input.pages), 1, 5000);
  const rate = bounded(input.rate, 1, 500);
  // Repeated content shares templates: a product/article is not priced as a bespoke page.
  const layoutUnits = Math.min(pages, 12) + Math.max(0, pages - 12) * 0.15;
  const migration = input.kind === "redesign" ? 5 + pages * 0.2 : 0;
  const content =
    input.content === "ready"
      ? 0
      : pages * (input.content === "refresh" ? 0.5 : 1.5);
  const make = (platform: "wp" | "lovable") => {
    const rows = [
      { name: "Discovery & structure", hours: 5 },
      {
        name: "Design & page templates",
        hours:
          (input.design === "bespoke" ? 18 : 7) +
          layoutUnits * (platform === "wp" ? 1.6 : 1.1),
      },
      ...FEATURES.filter((f) => input.features.includes(f.id)).map((f) => ({
        name: f.name,
        hours: f[platform],
      })),
      { name: "Content preparation", hours: content },
      { name: "Migration & redirect mapping", hours: migration },
    ].filter((r) => r.hours > 0);
    const buildHours = rows.reduce((n, r) => n + r.hours, 0);
    rows.push({
      name: "Testing, accessibility & launch",
      hours: Math.max(6, buildHours * 0.2),
    });
    const hours = Math.ceil(rows.reduce((n, r) => n + r.hours, 0));
    return {
      rows,
      hours,
      low: Math.round((hours * rate) / 50) * 50,
      high: Math.ceil((hours * 1.5 * rate) / 50) * 50,
    };
  };
  const custom =
    input.features.includes("portal") || input.features.includes("members");
  const editorial =
    input.features.includes("blog") ||
    input.features.includes("shop") ||
    input.features.includes("languages") ||
    pages > 40;
  const recommendation = custom
    ? "Lovable"
    : editorial
      ? "WordPress"
      : "Either fits";
  const reason = custom
    ? "Your accounts or dashboard point towards an app-style experience. Lovable is a useful starting point; permissions, data and integrations still need careful testing."
    : editorial
      ? "Your publishing, catalogue or localisation needs favour an established content workflow. WordPress is the first option to explore."
      : "A focused business website can work well on either. Choose WordPress for a familiar content editor, or Lovable if you want to build and evolve it yourself.";
  const score =
    pages +
    input.features.reduce(
      (n, id) => n + (id === "portal" || id === "shop" ? 30 : 12),
      0,
    );
  const grade =
    score <= 10 ? "A" : score <= 40 ? "B" : score <= 120 ? "C" : "D";
  const gradeName = {
    A: "A focused launch",
    B: "A growing website",
    C: "A substantial rebuild",
    D: "Discovery first",
  }[grade];
  const lovable = make("lovable");
  const cap = input.care === "managed" ? 5000 : 2500;
  return {
    wordpress: make("wp"),
    lovable: { ...lovable, low: Math.min(lovable.low, cap), high: cap },
    recommendation,
    reason,
    grade,
    gradeName,
    pages,
  };
}
export type SavingsInput = {
  months: number;
  currentBuild: number;
  currentMonthly: number;
  currentExtras: number;
  lovableBuild: number;
  lovableMonthly: number;
  lovableExtras: number;
  currentHours: number;
  lovableHours: number;
  hourlyValue: number;
  includeTime: boolean;
};
export const DEFAULT_SAVINGS: SavingsInput = {
  months: 12,
  currentBuild: 2500,
  currentMonthly: 75,
  currentExtras: 100,
  lovableBuild: 0,
  lovableMonthly: 25,
  lovableExtras: 300,
  currentHours: 8,
  lovableHours: 40,
  hourlyValue: 25,
  includeTime: false,
};
export function calculateSavings(input: SavingsInput) {
  const months = bounded(input.months, 1, 60);
  const cost = (build: number, monthly: number, annual: number) =>
    bounded(build, 0, 1000000) +
    bounded(monthly, 0, 100000) * months +
    (bounded(annual, 0, 1000000) * months) / 12;
  const currentCash = cost(
    input.currentBuild,
    input.currentMonthly,
    input.currentExtras,
  );
  const lovableCash = cost(
    input.lovableBuild,
    input.lovableMonthly,
    input.lovableExtras,
  );
  const current =
    currentCash +
    (input.includeTime
      ? bounded(input.currentHours, 0, 10000) *
        bounded(input.hourlyValue, 0, 1000)
      : 0);
  const lovable =
    lovableCash +
    (input.includeTime
      ? bounded(input.lovableHours, 0, 10000) *
        bounded(input.hourlyValue, 0, 1000)
      : 0);
  return {
    currentCash,
    lovableCash,
    current,
    lovable,
    difference: current - lovable,
    percent: current > 0 ? ((current - lovable) / current) * 100 : null,
  };
}
export type SitemapAudit = {
  site: string;
  urls: string[];
  sources: string[];
  groups: { name: string; count: number }[];
  partial: boolean;
  notes: string[];
};
export function groupPages(urls: string[]) {
  const counts: Record<string, number> = {};
  urls.forEach((url) => {
    const path = new URL(url).pathname;
    const name = /\/(product|products|shop|collections)(\/|$)/i.test(path)
      ? "Shop & catalogue"
      : /\/(blog|news|articles|posts)(\/|$)/i.test(path)
        ? "Articles & news"
        : /\/(category|tag|author)(\/|$)/i.test(path)
          ? "Archives & categories"
          : /\/(privacy|terms|cookies)/i.test(path)
            ? "Policies"
            : "Core pages & other content";
    counts[name] = (counts[name] || 0) + 1;
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}

// TanStack serialises string search values as JSON; accept those and plain URL values.
export function queryAmount(raw: string | null, fallback: number) {
  if (raw === null || raw.trim() === "") return fallback;
  let value: unknown = raw;
  try {
    value = JSON.parse(raw);
  } catch {
    /* A plain numeric query value is also valid. */
  }
  if (typeof value !== "number" && typeof value !== "string") return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? bounded(number, 0, 1000000) : fallback;
}
