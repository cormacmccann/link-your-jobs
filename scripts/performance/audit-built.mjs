// Run after npm run build. Inspects the actual server response without client JS.
import assert from "node:assert/strict";
import { mkdirSync, statSync, writeFileSync } from "node:fs";
import { JSDOM } from "jsdom";
import worker from "../../.output/server/index.mjs";

mkdirSync("output/performance", { recursive: true });
const reports = [];
const titles = new Set();
for (const [slug, town, country] of [
  ["dundalk", "Dundalk", "IE"],
  ["warrenpoint", "Warrenpoint", "GB"],
  ["rostrevor", "Rostrevor", "GB"],
]) {
  const url = `https://kamrok.com/web-design-${slug}`;
  const response = await worker.fetch(new Request(url), {}, { waitUntil() {} });
  assert.equal(response.status, 200);
  const doc = new JSDOM(await response.text()).window.document;
  assert.equal(doc.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(doc.querySelector('link[rel="canonical"]').href, url);
  assert.equal(doc.querySelectorAll('meta[property="og:image"]').length, 1);
  assert.equal(doc.querySelectorAll("h1").length, 1);
  assert.equal(doc.querySelector("h1").textContent, `Web design in ${town}.`);
  titles.add(doc.title);
  const graph = [
    ...doc.querySelectorAll('script[type="application/ld+json"]'),
  ].flatMap((script) => JSON.parse(script.textContent)["@graph"] ?? []);
  const service = graph.find((node) => node["@type"] === "Service");
  assert.equal(service.areaServed.address.addressLocality, town);
  assert.equal(service.areaServed.address.addressCountry, country);
  assert.ok(
    doc.querySelector(
      'a[href="https://lovable-partner-directory.lovable.app/partners/kamrok"]',
    ),
  );
  const hero = doc.querySelector(".local-hero img");
  assert.equal(hero.getAttribute("fetchpriority"), "high");
  assert.ok(hero.getAttribute("srcset"));
  for (const preload of doc.querySelectorAll('link[rel="modulepreload"]')) {
    assert.doesNotMatch(
      preload.href,
      /\/Galaxy-|gsap|ScrollTrigger|three\.module/,
    );
  }
  assert.equal(
    doc.querySelectorAll('link[href*="fonts.googleapis.com"]').length,
    0,
  );
  reports.push({
    page: url,
    title: doc.title,
    h1: doc.querySelector("h1").textContent,
    ogImage: doc.querySelector('meta[property="og:image"]').content,
    serviceArea: service.areaServed,
    status:
      "Built SSR, metadata, profile, hero and initial bundle checks passed",
  });
}
assert.equal(titles.size, 3);
writeFileSync(
  "output/performance/local-seo-audit.json",
  JSON.stringify(reports, null, 2) + "\n",
);

const home = await worker.fetch(
  new Request("https://kamrok.com/"),
  {},
  { waitUntil() {} },
);
const doc = new JSDOM(await home.text()).window.document;
assert.equal(doc.querySelectorAll(".space-chimp-reveal, canvas").length, 0);
assert.equal(doc.querySelector("video")?.getAttribute("src"), null);
const bytes = (path) => statSync(`public/${path}`).size;
const terrain = ["moon-back", "moon-middle", "moon-front"];
const before =
  bytes("art/orbit/chimp-hero-dark.webp") +
  bytes("art/orbit/chimp-hero-robot.webp") +
  bytes("art/orbit/cinematic-moon.webp") +
  terrain.reduce((n, name) => n + bytes(`art/orbit/${name}.webp`), 0);
const after = (size) =>
  bytes(`art/orbit/chimp-hero-dark-${size === "compact" ? 800 : 1200}.webp`) +
  bytes("art/orbit/cinematic-moon-480.webp") +
  terrain.reduce(
    (n, name) =>
      n + bytes(`art/orbit/${name}-${size === "compact" ? 1080 : 1920}.webp`),
    0,
  );
writeFileSync(
  "output/performance/assets-audit.json",
  JSON.stringify(
    {
      measurement:
        "Homepage portrait and landscape file bytes only, not page/network timings or a Lighthouse score. Responsive source selection varies with viewport and pixel density.",
      beforeBytes: before,
      compactResponsiveBytes: after("compact"),
      compactReductionPercent: +(100 * (1 - after("compact") / before)).toFixed(
        1,
      ),
      largeResponsiveBytes: after("large"),
      largeReductionPercent: +(100 * (1 - after("large") / before)).toFixed(1),
      robotOriginalDeferredBytes: bytes("art/orbit/chimp-hero-robot.webp"),
      phoneWebGL: "Disabled; CSS starfield remains visible",
      desktopWebGL:
        "Near viewport, after fine-pointer interaction and idle; render surface capped at 640x480; 20fps; paused offscreen",
      googleFontsStylesheet:
        "Removed; original fonts self-hosted, font-display swap, two Latin subsets preloaded",
      livePageSpeed:
        "User-provided baseline: mobile 31, LCP 8.7s, TBT 34770ms. Changes require publication and a fresh live test.",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Passed: 3 production SSR pages, local metadata, light initial bundles, homepage deferred media and file-size audit.",
);
