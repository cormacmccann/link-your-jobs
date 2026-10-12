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
const previousCompactHeroBytes =
  bytes("art/orbit/chimp-hero-dark-800.webp") +
  bytes("art/orbit/cinematic-moon-480.webp") +
  terrain.reduce((sum, name) => sum + bytes(`art/orbit/${name}-1080.webp`), 0);
const builtBytes = (url) =>
  statSync(`.output/public${new URL(url, "https://kamrok.com").pathname}`).size;
const portrait = doc.querySelector(".space-chimp-art img");
const moon = doc.querySelector(".space-planet-layer img");
const terrainImage = doc.querySelector(".space-moon-plane--back img");
assert.equal(terrainImage.getAttribute("fetchpriority"), "high");
const mobileTerrain = doc
  .querySelector(".space-moon-plane--back source")
  .getAttribute("srcset");
assert.match(mobileTerrain, /^\/assets\/mobile-terrain-[^/]+\.webp$/);
for (const selector of [
  ".space-chimp-art",
  ".space-planet-layer",
  ".orbit-service-art",
  ".orbit-profile",
  ".studio-logo",
]) {
  const image = doc.querySelector(`${selector} img`);
  assert.match(image.src, /\/assets\//);
  assert.ok(
    image
      .closest("picture")
      .querySelector('source[media="(max-width: 760px)"]'),
  );
}
assert.equal(doc.querySelector(".orbit-service-art img").getAttribute("loading"), "lazy");
for (const plane of ["middle", "front"]) {
  assert.match(
    doc
      .querySelector(`.space-moon-plane--${plane} source`)
      .getAttribute("srcset"),
    /^data:image\/svg/,
  );
}
const candidate = (element, width, mobile = false) => {
  const source = mobile
    ? element.closest("picture").querySelector("source")
    : element;
  return source
    .getAttribute("srcset")
    .split(", ")
    .find((value) => value.endsWith(` ${width}w`))
    .split(" ")[0];
};
const mobileBytes =
  builtBytes(candidate(portrait, 640, true)) +
  builtBytes(candidate(moon, 480, true)) +
  builtBytes(mobileTerrain);
const desktopBytes =
  builtBytes(candidate(portrait, 800)) +
  builtBytes(candidate(moon, 850)) +
  terrain.reduce(
    (sum, name) =>
      sum +
      builtBytes(
        candidate(
          doc.querySelector(
            `.space-moon-plane--${name.replace("moon-", "")} img`,
          ),
          1536,
        ),
      ),
    0,
  );
const mckevittsResponse = await worker.fetch(
  new Request("https://kamrok.com/work/mckevitts"),
  {},
  { waitUntil() {} },
);
const mckevitts = new JSDOM(await mckevittsResponse.text()).window.document;
assert.equal(mckevittsResponse.status, 200);
for (const chapter of [
  "website",
  "before",
  "process",
  "identity",
  "applications",
])
  assert.ok(mckevitts.querySelector(`#chapter-${chapter}`));
assert.match(mckevitts.querySelector(".process-hero img").src, /\/assets\//);
assert.ok(mckevitts.querySelector(".case-image-surface picture source"));
writeFileSync(
  "output/performance/assets-audit.json",
  JSON.stringify(
    {
      measurement:
        "Homepage portrait and landscape file bytes only, not page/network timings or a Lighthouse score. Responsive source selection varies with viewport and pixel density.",
      beforeBytes: before,
      previousCompactHeroBytes,
      mobileHeroImageBytes: mobileBytes,
      reductionFromPreviousCompactPercent: +(100 * (1 - mobileBytes / previousCompactHeroBytes)).toFixed(1),
      mobileReductionFromOriginalPercent: +(
        100 *
        (1 - mobileBytes / before)
      ).toFixed(1),
      desktopHeroImageBytes: desktopBytes,
      desktopReductionFromOriginalPercent: +(
        100 *
        (1 - desktopBytes / before)
      ).toFixed(1),
      robotOriginalDeferredBytes: bytes("art/orbit/chimp-hero-robot.webp"),
      mobileArtwork:
        "One terrain plate, hero portrait capped at 640px, decorative moon capped at 480px; services capped at 640px; below-fold artwork lazy-loaded",
      cacheDelivery:
        "Vite content-hashed /assets URLs, the path confirmed to have a one-year immutable cache on the current live host",
      phoneWebGL: "Disabled; CSS starfield remains visible",
      desktopWebGL:
        "Near viewport, after fine-pointer interaction and idle; render surface capped at 640x480; 20fps; paused offscreen",
      googleFontsStylesheet:
        "Removed; original fonts self-hosted, font-display swap, two Latin subsets preloaded",
      livePageSpeed:
        "Latest user-provided live result: mobile 86, LCP 3.6s, TBT 0ms; desktop 98. This follow-up has not been published or measured with live Lighthouse.",
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Passed: 3 production SSR pages, local metadata, light initial bundles, homepage deferred media and file-size audit.",
);
