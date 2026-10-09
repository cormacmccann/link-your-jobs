import { groupPages, type SitemapAudit } from "./model";

export function publicSiteUrl(input: string) {
  const raw = input.trim();
  if (!raw || raw.length > 2048)
    throw new Error("Enter a public website address.");
  const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  if (url.protocol !== "https:" || url.port || url.username || url.password)
    throw new Error(
      "Use a public HTTPS website with no login details or custom port.",
    );
  // Hostnames only, no IP literals, single-label hosts or local/reserved suffixes.
  if (
    !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/i.test(
      url.hostname,
    ) ||
    /\.(localhost|local|internal|lan|home|test|invalid|example|onion)$/i.test(
      url.hostname,
    )
  )
    throw new Error("Use a public domain name, such as yourbusiness.ie.");
  url.hash = "";
  url.search = "";
  return url;
}
export function isPublicIPv4(ip: string) {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255))
    return false;
  const a = p[0]!;
  const b = p[1]!;
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 0 || b === 168)) ||
    (a === 198 && (b === 18 || b === 19 || b === 51)) ||
    (a === 203 && b === 0)
  );
}
export function sameSite(a: URL, b: URL) {
  return a.hostname.replace(/^www\./, "") === b.hostname.replace(/^www\./, "");
}
function xmlText(s: string) {
  return s
    .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}
export function parseSitemap(xml: string) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml))
    throw new Error("Unsupported sitemap format.");
  const clean = xml.replace(/<!--[\s\S]*?-->/g, "");
  const index = /<(?:\w+:)?sitemapindex\b/i.test(clean);
  if (!index && !/<(?:\w+:)?urlset\b/i.test(clean))
    throw new Error("No XML sitemap found here.");
  const tag = index ? "sitemap" : "url";
  const entries = [
    ...clean.matchAll(
      new RegExp(
        `<(?:(?:\\w+):)?${tag}\\b[^>]*>([\\s\\S]*?)<\\/(?:(?:\\w+):)?${tag}>`,
        "gi",
      ),
    ),
  ];
  const urls = entries.flatMap((entry) => {
    // Unprefixed/default-namespace loc only: exclude image:loc and video URLs.
    const loc = entry[1]!.match(/<loc\b[^>]*>([\s\S]*?)<\/loc>/i);
    return loc ? [xmlText(loc[1]!)] : [];
  });
  return { index, urls };
}
export type ReadPublicText = (
  url: URL,
  site: URL,
  signal: AbortSignal,
) => Promise<string>;
export async function auditSitemap(
  input: string,
  read: ReadPublicText,
  signal: AbortSignal,
): Promise<SitemapAudit> {
  const site = publicSiteUrl(input);
  const sources: string[] = [],
    pages = new Set<string>(),
    seen = new Set<string>();
  const notes: string[] = [];
  const declared = new Set<string>();
  let partial = false,
    failures = 0;
  const queue: string[] = [];
  if (/\.xml$/i.test(site.pathname)) queue.push(site.href);
  try {
    const robots = await read(new URL("/robots.txt", site), site, signal);
    for (const match of robots.matchAll(/^\s*Sitemap:\s*(\S+)/gim)) {
      queue.push(match[1]!);
      declared.add(match[1]!);
      if (queue.length >= 30) {
        partial = true;
        break;
      }
    }
  } catch {
    /* Conventional sitemap locations are the fallback. */
  }
  queue.push(
    new URL("/sitemap.xml", site).href,
    new URL("/sitemap_index.xml", site).href,
    new URL("/wp-sitemap.xml", site).href,
  );
  while (
    queue.length &&
    seen.size < 10 &&
    pages.size < 300 &&
    !signal.aborted
  ) {
    const candidate = queue.shift()!;
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    try {
      const url = publicSiteUrl(candidate);
      if (!sameSite(site, url)) {
        partial = true;
        continue;
      }
      const parsed = parseSitemap(await read(url, site, signal));
      sources.push(url.href);
      if (parsed.index) {
        parsed.urls.slice(0, 30).forEach((url) => declared.add(url));
        queue.unshift(...parsed.urls.slice(0, 30));
        if (parsed.urls.length > 30) partial = true;
      } else {
        for (const item of parsed.urls) {
          try {
            const page = publicSiteUrl(item);
            if (!sameSite(site, page)) continue;
            if (
              /\.(jpg|jpeg|png|gif|webp|pdf|mp4|svg|xml)$/i.test(page.pathname)
            )
              continue;
            pages.add(page.href.replace(/\/$/, ""));
            if (pages.size >= 300) {
              partial = true;
              break;
            }
          } catch {
            /* Ignore invalid sitemap entries. */
          }
        }
      }
    } catch {
      failures++;
      if (declared.has(candidate)) partial = true;
    }
  }
  if (!pages.size)
    throw new Error(
      "We couldn’t read a public sitemap. The site may block scanners or use a different sitemap address. Try its sitemap URL, or enter a page count below.",
    );
  if (queue.length || signal.aborted || failures > 3) partial = true;
  if (partial)
    notes.push(
      "Limited inventory: the scan reached a limit or some sitemap files could not be read. Confirm the page count before budgeting.",
    );
  notes.push(
    "Sitemap URLs only; hidden pages, forms, integrations, content quality and current design were not inspected. Groups are inferred from URL paths.",
  );
  return {
    site: site.origin,
    urls: [...pages],
    sources,
    groups: groupPages([...pages]),
    partial,
    notes,
  };
}
