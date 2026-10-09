import { bounded, type Feature } from "./model";

export type DiyCosts = {
  situation: "existing" | "new";
  studio: number | null;
  theme: number | null;
  hosting: number | null;
  hostingPeriod: "monthly" | "yearly";
  domain: number | null;
  support: number | null;
  supportPeriod: "monthly" | "yearly";
  tools: number | null;
};
export const DEFAULT_DIY_COSTS: DiyCosts = {
  situation: "existing",
  studio: null,
  theme: null,
  hosting: null,
  hostingPeriod: "monthly",
  domain: null,
  support: null,
  supportPeriod: "monthly",
  tools: null,
};
export function totalDiyCosts(input: DiyCosts) {
  const value = (n: number | null) => bounded(n ?? 0, 0, 1000000);
  const launch = value(input.studio) + value(input.theme);
  const hosting =
    value(input.hosting) * (input.hostingPeriod === "monthly" ? 12 : 1);
  const support =
    value(input.support) * (input.supportPeriod === "monthly" ? 12 : 1);
  const domain = value(input.domain);
  const tools = value(input.tools);
  const annual = hosting + support + domain + tools;
  return {
    launch,
    hosting,
    support,
    domain,
    tools,
    annual,
    // Historical launch invoices are never future savings.
    futureBuildFees: input.situation === "new" ? launch : 0,
    firstYear: input.situation === "new" ? launch + annual : annual,
    reviewableAnnual: hosting + support + tools,
    missing: [
      input.studio,
      input.theme,
      input.hosting,
      input.domain,
      input.support,
      input.tools,
    ].filter((n) => n === null).length,
    runningMissing: [
      input.hosting,
      input.domain,
      input.support,
      input.tools,
    ].some((n) => n === null),
  };
}
export const LOVABLE_CAPABILITIES: Record<
  Feature,
  { title: string; detail: string; setup: string; source: string }
> = {
  blog: {
    title: "Stories & articles",
    detail:
      "Build article pages and an editing area that fits the way you publish.",
    setup: "Set up the content store, permissions and publishing workflow.",
    source: "https://docs.lovable.dev/features/cloud",
  },
  shop: {
    title: "Ecommerce",
    detail:
      "Build a storefront and connect checkout, with Stripe or a Shopify integration.",
    setup:
      "Connect your provider, configure products, delivery and tax, then test checkout. Provider fees still apply.",
    source: "https://docs.lovable.dev/integrations/shopify",
  },
  booking: {
    title: "Bookings & appointments",
    detail:
      "Build booking forms, availability screens and a customer booking journey.",
    setup:
      "Configure availability and confirmations; connect a calendar or booking service where needed. Test double-booking rules.",
    source: "https://docs.lovable.dev/integrations/introduction",
  },
  members: {
    title: "Customer accounts",
    detail:
      "Build sign-in, profiles and private customer areas using the app backend.",
    setup:
      "Configure authentication and test who can see and change each customer’s data.",
    source: "https://docs.lovable.dev/features/cloud",
  },
  portal: {
    title: "Dashboards & portals",
    detail: "Create a workspace around your own data, team and customers.",
    setup:
      "Set up the data, user roles and permissions, then test the important workflows.",
    source: "https://docs.lovable.dev/features/cloud",
  },
  automation: {
    title: "Connected tools",
    detail:
      "Connect services and APIs so the website can work with your other tools.",
    setup:
      "Authorise each service and configure the workflow. Third-party subscriptions or API usage can add cost.",
    source: "https://docs.lovable.dev/integrations/introduction",
  },
  languages: {
    title: "Multiple languages",
    detail:
      "Build language switching and translated page layouts into your site.",
    setup:
      "Provide or review translations and test localised links, content and search metadata.",
    source: "https://docs.lovable.dev/",
  },
};
