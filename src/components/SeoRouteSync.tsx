import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/KnBgXC3z6yOmdJhNt3Y9tVDEzJY2/social-images/social-1781019774308-KAMROK-NEW.webp";
const BASE = "https://kamrok.com";
const ROUTE_PREVIEWS: Record<string, { title: string; description: string }> = {
  "/": { title: "KAMROK · Lovable Expert & Award-Winning WordPress Designer", description: "Certified Lovable expert and award-winning WordPress designer in Dundalk, Ireland. Thoughtful websites, custom apps, branding and practical AI." },
  "/about": { title: "About KAMROK — Design Studio in Dundalk", description: "Meet Cormac McCann and Kayla Minto, the small, hands-on team behind KAMROK. Design and development from Dundalk, Ireland." },
  "/work": { title: "Selected Work — Web Design Portfolio | KAMROK", description: "Explore KAMROK’s websites, brands and digital products. Take a closer look at our client projects and case studies." },
  "/tools": { title: "Free Business, Design & Marketing Tools | KAMROK", description: "Create invoices, generate QR codes, calculate VAT and more. Explore KAMROK’s free tools for everyday business, design and marketing tasks." },
};

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
}

/** Keeps canonical, og:url, og:title and og:description in sync with the current route. */
export default function SeoRouteSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const sync = () => {
      const url = BASE + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
      upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
      const meta = (p: string) => () => { const m = document.createElement("meta"); m.setAttribute("property", p); return m; };
      upsert('meta[property="og:url"]', meta("og:url"), "content", url);
      const image = pathname === "/templates/takeaway-hub" ? `${BASE}/templates/takeaway-hub/website.webp` : DEFAULT_IMAGE;
      upsert('meta[property="og:image"]', meta("og:image"), "content", image);
      upsert('meta[name="twitter:image"]', () => { const m = document.createElement("meta"); m.name = "twitter:image"; return m; }, "content", image);
      const preview = ROUTE_PREVIEWS[pathname.replace(/\/$/, "") || "/"];
      const title = preview?.title || document.title;
      let desc = preview?.description || document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      upsert('meta[property="og:title"]' , meta("og:title"), "content", title);
      upsert('meta[name="twitter:title"]', () => Object.assign(document.createElement("meta"), { name: "twitter:title" }), "content", title);
      if (pathname.startsWith("/tools/")) {
        const lead = document.querySelector("main h1")?.parentElement?.querySelector("p")?.textContent?.trim();
        const name = document.querySelector("main h1")?.textContent?.trim();
        if (lead && name) desc = `${name}: ${lead.replace(/[.!?]$/, "")}. A free tool from KAMROK.`;
      }
      if (desc) upsert('meta[property="og:description"]', meta("og:description"), "content", desc);
      if (desc) upsert('meta[name="twitter:description"]', () => Object.assign(document.createElement("meta"), { name: "twitter:description" }), "content", desc);
      const d = desc;
      const headline = title.replace(/\s*[|—].*$/, "");
      let ld: Record<string, unknown> | null = null;
      if (pathname === "/work") ld = { "@type": "CollectionPage", name: document.title, description: d, url };
      else if (pathname.startsWith("/work/") || pathname.startsWith("/blog/")) ld = { "@type": "Article", headline, description: d, url, author: { "@id": `${BASE}/#org` }, publisher: { "@id": `${BASE}/#org` } };
      else if (pathname.startsWith("/tools/")) ld = { "@type": "WebApplication", name: headline, description: d, url, applicationCategory: "BusinessApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" }, provider: { "@id": `${BASE}/#org` } };
      document.getElementById("route-ld")?.remove();
      if (ld) {
        const s = document.createElement("script");
        s.type = "application/ld+json"; s.id = "route-ld";
        s.text = JSON.stringify({ "@context": "https://schema.org", ...ld });
        document.head.appendChild(s);
      }
    };
    let timer = window.setTimeout(sync, 400);
    // Lazy routes can set their head tags after the initial timer has fired.
    const observer = new MutationObserver((changes) => {
      const isPageMetadata = (node: Node) => {
        const el = node instanceof Element ? node : node.parentElement;
        return !!el?.closest('title, meta[name="description"]');
      };
      if (!changes.some(change => isPageMetadata(change.target) || Array.from(change.addedNodes).some(isPageMetadata))) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(sync, 50);
    });
    observer.observe(document.head, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["content"] });
    return () => { window.clearTimeout(timer); observer.disconnect(); };
  }, [pathname]);
  return null;
}
