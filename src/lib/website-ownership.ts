export const OWNERSHIP_GUIDE = {
  path: "/blog/own-your-website",
  title: "Own Your Website: Domains, Hosting & a Fair Handover | KAMROK",
  headline: "Your website. Your business. Your keys.",
  description:
    "Understand website costs, branded email and downtime. Cormac’s practical guide to domains, hosting, access, fair payment and keeping control of your website.",
  image: "/blog/website-ownership/website-keys-chimp-social.webp",
  date: "2026-10-22",
};
export const OWNERSHIP_CHAPTERS = [
  ["customers", "Start with the customer"],
  ["domain", "Buy your own domain"],
  ["access", "Know who has the keys"],
  ["hosting", "Choose hosting carefully"],
  ["apps", "Keep control of your app"],
  ["fairness", "Be fair to your designer"],
  ["feedback", "Give useful feedback"],
  ["running-costs", "Budget beyond launch"],
  ["handover", "Plan a proper handover"],
] as const;
export const HANDOVER_QUESTIONS = `Before we start, could you confirm the following in the proposal?

1. Which business accounts will I control, and which access will you need?
2. Will the domain be registered to my business in an account I can recover?
3. What bespoke work transfers after the agreed payments, and what stays licensed?
4. Where will the website, code and customer data live?
5. What are the build, hosting, domain renewal, email, licence, maintenance and usage costs, and when are they billed?
6. Who handles updates, backups, restore tests and urgent problems?
7. How will we protect existing URLs, email and important customer journeys?
8. What are the payment milestones, feedback rounds and change-request process?
9. What would a handover to me or another developer include, cost and require?

I want a clear arrangement that works fairly for both of us.`;
export type WebsiteBudget = {
  build: number;
  domain: number;
  hosting: number;
  email: number;
  care: number;
  licences: number;
  usage: number;
};
/** Annual domain/licences; monthly hosting/email/care/usage. Same currency and tax basis. */
export function websiteBudget(input: WebsiteBudget) {
  const clean = (amount: number) =>
    Number.isFinite(amount) ? Math.max(0, amount) : 0;
  const annual =
    clean(input.domain) +
    clean(input.licences) +
    12 *
      (clean(input.hosting) +
        clean(input.email) +
        clean(input.care) +
        clean(input.usage));
  return {
    annual,
    firstYear: clean(input.build) + annual,
    threeYears: clean(input.build) + annual * 3,
  };
}

/** Annual equivalent, rounded to a second; not a provider's monthly SLA calculation. */
export function annualDowntime(availability: number) {
  const percent = Number.isFinite(availability)
    ? Math.min(100, Math.max(0, availability))
    : 100;
  const seconds = Math.round(365 * 24 * 60 * 60 * (1 - percent / 100));
  return {
    seconds,
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    remainingSeconds: seconds % 60,
  };
}
