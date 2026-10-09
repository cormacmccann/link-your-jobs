import { describe, expect, it } from "vitest";
import {
  calculateSavings,
  DEFAULT_SAVINGS,
  DEFAULT_PROJECT,
  estimateProject,
  queryAmount,
} from "./model";
import {
  auditSitemap,
  isPublicIPv4,
  parseSitemap,
  publicSiteUrl,
} from "./sitemap";

describe("cost planning", () => {
  it("includes all upfront, monthly and annual costs over multiple years", () => {
    const result = calculateSavings({ ...DEFAULT_SAVINGS, months: 24 });
    expect(result.current).toBe(4500);
    expect(result.lovable).toBe(1200);
    expect(result.difference).toBe(3300);
  });
  it("counts time on both sides and can show a loss", () => {
    const result = calculateSavings({
      ...DEFAULT_SAVINGS,
      currentBuild: 0,
      currentMonthly: 0,
      currentExtras: 0,
      includeTime: true,
    });
    expect(result.current).toBe(200);
    expect(result.lovable).toBe(1600);
    expect(result.difference).toBe(-1400);
  });
  it("handles zero and non-finite inputs without inventing a percentage", () => {
    const result = calculateSavings({
      ...DEFAULT_SAVINGS,
      currentBuild: 0,
      currentMonthly: 0,
      currentExtras: 0,
      lovableBuild: NaN,
    });
    expect(result.percent).toBeNull();
    expect(Number.isFinite(result.difference)).toBe(true);
  });
  it("reflects migration and functionality in costs and recommendations", () => {
    const simple = estimateProject(DEFAULT_PROJECT);
    const complex = estimateProject({
      ...DEFAULT_PROJECT,
      kind: "redesign",
      pages: 100,
      features: ["portal", "shop"],
    });
    expect(complex.lovable.high).toBe(2500);
    expect(complex.lovable.low).toBeLessThanOrEqual(2500);
    expect(complex.wordpress.low).toBeGreaterThan(simple.wordpress.high);
    expect(complex.recommendation).toBe("Lovable");
    expect(complex.grade).toBe("D");
    expect(
      estimateProject({ ...DEFAULT_PROJECT, features: ["blog"] })
        .recommendation,
    ).toBe("WordPress");
    expect(
      complex.wordpress.rows.some((r) => r.name.includes("Migration")),
    ).toBe(true);
  });
});
describe("public sitemap inventory", () => {
  it.each([
    "http://business.ie",
    "https://localhost",
    "https://127.0.0.1",
    "https://2130706433",
    "https://[::1]",
    "https://user:pass@business.ie",
    "https://business.ie:444",
    "file:///etc/passwd",
    "https://app.internal",
  ])("rejects unsafe target %s", (url) =>
    expect(() => publicSiteUrl(url)).toThrow(),
  );
  it.each([
    "127.0.0.1",
    "10.2.3.4",
    "169.254.169.254",
    "172.31.0.1",
    "192.168.1.1",
    "100.64.0.1",
    "0.0.0.0",
    "224.0.0.1",
    "198.18.0.1",
  ])("blocks non-public IP %s", (ip) => expect(isPublicIPv4(ip)).toBe(false));
  it("accepts an ordinary domain and public IP", () => {
    expect(publicSiteUrl("business.ie").href).toBe("https://business.ie/");
    expect(isPublicIPv4("1.1.1.1")).toBe(true);
  });
  it("excludes image locations, comments and XML entities", () => {
    expect(
      parseSitemap(
        "<urlset><!-- <url><loc>bad</loc></url> --><url><loc><![CDATA[https://business.ie/]]></loc><image:image><image:loc>image.jpg</image:loc></image:image></url></urlset>",
      ).urls,
    ).toEqual(["https://business.ie/"]);
    expect(() =>
      parseSitemap(
        '<!DOCTYPE x [<!ENTITY x SYSTEM "file:///etc/passwd">]><urlset/>',
      ),
    ).toThrow();
  });
  it("follows sitemap indexes, deduplicates pages and flags failed children", async () => {
    const fixtures: Record<string, string> = {
      "/robots.txt": "Sitemap: https://business.ie/index.xml",
      "/index.xml":
        "<sitemapindex><sitemap><loc>https://business.ie/pages.xml</loc></sitemap><sitemap><loc>https://business.ie/missing.xml</loc></sitemap></sitemapindex>",
      "/pages.xml":
        "<urlset><url><loc>https://business.ie/about</loc></url><url><loc>https://business.ie/about/</loc></url><url><loc>https://business.ie/blog/story</loc></url><url><loc>https://external.ie/page</loc></url></urlset>",
    };
    const result = await auditSitemap(
      "business.ie",
      async (url) => {
        const body = fixtures[url.pathname];
        if (!body) throw new Error("404");
        return body;
      },
      new AbortController().signal,
    );
    expect(result.urls).toHaveLength(2);
    expect(result.partial).toBe(true);
    expect(result.groups.find((g) => g.name === "Articles & news")?.count).toBe(
      1,
    );
  });
  it("caps large inventories and distinguishes missing maps from an empty site", async () => {
    const xml =
      "<urlset>" +
      Array.from(
        { length: 350 },
        (_, i) => `<url><loc>https://business.ie/page-${i}</loc></url>`,
      ).join("") +
      "</urlset>";
    const result = await auditSitemap(
      "business.ie",
      async (url) => (url.pathname === "/robots.txt" ? "" : xml),
      new AbortController().signal,
    );
    expect(result.urls).toHaveLength(300);
    expect(result.partial).toBe(true);
    await expect(
      auditSitemap(
        "business.ie",
        async () => {
          throw new Error("blocked");
        },
        new AbortController().signal,
      ),
    ).rejects.toThrow("couldn’t read");
  });
});

it("preserves planner estimates through TanStack search serialisation", () => {
  expect(queryAmount('"5775"', 0)).toBe(5775);
  expect(queryAmount("5375", 0)).toBe(5375);
  expect(queryAmount("not-a-price", 2500)).toBe(2500);
});

it("caps every Lovable scope at the selected care ceiling", () => {
  for (const care of ["supported", "managed"] as const) {
    for (const pages of [1, 10, 300, 5000]) {
      const result = estimateProject({
        ...DEFAULT_PROJECT,
        care,
        pages,
        features: ["shop", "portal", "languages"],
        content: "new",
      });
      expect(result.lovable.high).toBe(care === "managed" ? 5000 : 2500);
      expect(result.lovable.low).toBeLessThanOrEqual(result.lovable.high);
    }
  }
});
