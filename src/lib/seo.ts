/**
 * Server-rendered page metadata. Every route's `head()` calls `pageHead()` so
 * crawlers (Facebook, LinkedIn, WhatsApp, Google) get the real title,
 * description, canonical URL, share image and structured data in the HTML.
 */
export const SITE_URL = "https://kamrok.com";
export const DEFAULT_SHARE_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/KnBgXC3z6yOmdJhNt3Y9tVDEzJY2/social-images/social-1781019774308-KAMROK-NEW.webp";
const DEFAULT_SHARE_ALT = "KAMROK logo with our astronaut chimp in space";

type JsonLd = Record<string, unknown>;

export type PageSeo = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  jsonLd?: JsonLd;
};

const absolute = (src: string) => (/^https?:\/\//.test(src) ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`);

export function canonicalUrl(path: string) {
  return SITE_URL + (path === "/" ? "/" : path.replace(/\/$/, ""));
}

export function pageHead({ path, title, description, image, imageAlt, type = "website", jsonLd }: PageSeo) {
  const url = canonicalUrl(path);
  const shareImage = image ? absolute(image) : DEFAULT_SHARE_IMAGE;
  const shareAlt = imageAlt ?? DEFAULT_SHARE_ALT;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: shareImage },
    { property: "og:image:alt", content: shareAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: shareImage },
    { name: "twitter:image:alt", content: shareAlt },
  ];
  if (!image) {
    meta.push({ property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    scripts: jsonLd
      ? [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", ...jsonLd }) }]
      : [],
  };
}

const ORG = { "@id": `${SITE_URL}/#org` };

export const articleLd = (headline: string, description: string, path: string): JsonLd => ({
  "@type": "Article",
  headline,
  description,
  url: canonicalUrl(path),
  author: ORG,
  publisher: ORG,
});

export const collectionLd = (name: string, description: string, path: string): JsonLd => ({
  "@type": "CollectionPage",
  name,
  description,
  url: canonicalUrl(path),
});

/** Free tools: one place for the name + lead line used in titles, descriptions and JSON-LD. */
export const TOOLS: Record<string, { name: string; lead: string }> = {
  "qr-code-generator": { name: "QR Code Generator", lead: "Create custom QR codes for your links, WiFi, or text" },
  "password-generator": { name: "Password Generator", lead: "Generate secure, random passwords instantly" },
  "utm-builder": { name: "UTM Builder", lead: "Create trackable campaign URLs for Google Analytics" },
  "vat-calculator": { name: "VAT Calculator", lead: "Calculate VAT for Ireland & UK rates instantly" },
  "email-signature": { name: "Email Signature Generator", lead: "Create a professional email signature in seconds" },
  "invoice-creator": { name: "Invoice Creator", lead: "Create professional invoices for free" },
  "quotation-maker": { name: "Quotation Maker", lead: "Create professional quotes and estimates" },
  "business-name-generator": { name: "Business Name Generator", lead: "Get creative name ideas for your new venture" },
  "social-post-sizes": { name: "Social Media Size Checker", lead: "Quick reference for image and video dimensions" },
  "opengraph-preview": { name: "OpenGraph Preview", lead: "See how your links will appear on social media" },
  "hashtag-suggester": { name: "Hashtag Suggester", lead: "Generate relevant hashtags for your social media posts" },
  "privacy-policy-builder": { name: "Privacy Policy Builder", lead: "Generate GDPR, CCPA and region-specific privacy policies in minutes, not hours" },
  "terms-generator": { name: "Terms & Conditions Generator", lead: "Create professional Terms & Conditions for your business in minutes" },
  "cookie-consent-manager": { name: "Cookie Consent Manager", lead: "GDPR & CCPA compliant cookie consent banners with automated script blocking" },
  "chat-lead-capture": { name: "Chat & Lead Capture", lead: "Turn website visitors into customers with chat and automated lead capture" },
  "popup-offer-engine": { name: "Popup & Offer Engine", lead: "Convert more visitors with perfectly-timed popups, slide-ins and bars" },
  "bookings-demos": { name: "Bookings & Demos", lead: "Schedule meetings, demos and consultations with calendar sync and payments" },
  "review-widget": { name: "Review Widget", lead: "Showcase your best reviews from Google, Facebook and Trustpilot" },
  "social-wall": { name: "Social Wall", lead: "Display live social media posts on your website" },
  "trustpilot-integration": { name: "Trustpilot Integration", lead: "Display verified Trustpilot reviews and ratings on your website" },
};

export function toolHead(slug: keyof typeof TOOLS & string) {
  const tool = TOOLS[slug];
  const name = tool?.name ?? "Free Tool";
  const description = `${name}: ${tool?.lead ?? "A practical everyday business tool"}. A free tool from KAMROK.`;
  const path = `/tools/${slug}`;
  return pageHead({
    path,
    title: `${name} — Free Tool | KAMROK`,
    description,
    jsonLd: {
      "@type": "WebApplication",
      name,
      description,
      url: canonicalUrl(path),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
      provider: ORG,
    },
  });
}
