import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/KnBgXC3z6yOmdJhNt3Y9tVDEzJY2/social-images/social-1781019774308-KAMROK-NEW.webp";
const BASE = "https://kamrok.com";

function upsert(selector: string, create: () => HTMLElement, attr: string, value: string) {
  let el = document.head.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

/** Keeps canonical, og:url, og:title and og:description in sync with the current route. */
export default function SeoRouteSync() {
  const { pathname } = useLocation();
  useEffect(() => {
    const t = window.setTimeout(() => {
      const url = BASE + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
      upsert('link[rel="canonical"]', () => Object.assign(document.createElement("link"), { rel: "canonical" }), "href", url);
      const meta = (p: string) => () => { const m = document.createElement("meta"); m.setAttribute("property", p); return m; };
      upsert('meta[property="og:url"]', meta("og:url"), "content", url);
      const image = pathname === "/templates/takeaway-hub" ? `${BASE}/templates/takeaway-hub/website.webp` : DEFAULT_IMAGE;
      upsert('meta[property="og:image"]', meta("og:image"), "content", image);
      upsert('meta[name="twitter:image"]', () => { const m = document.createElement("meta"); m.name = "twitter:image"; return m; }, "content", image);
      upsert('meta[property="og:title"]' , meta("og:title"), "content", document.title);
      const desc = document.querySelector('meta[name="description"]')?.getAttribute("content");
      if (desc) upsert('meta[property="og:description"]', meta("og:description"), "content", desc);
    }, 50);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}
