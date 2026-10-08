import { useMemo, useState } from "react";
import { Link } from "@/lib/router-compat";
import {
  QrCode, Key, Link2, Calculator, Mail, FileText, Receipt,
  Sparkles, Image, Palette, Square, Lock, ShieldCheck, Hash,
  Globe, Share2, MessageSquare, Percent, PoundSterling, Clover,
} from "lucide-react";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";

const TOOL_CATEGORIES = [
  {
    name: "Business Essentials",
    category: "business",
    tools: [
      { name: "Email Signature Generator", icon: Mail, href: "/tools/email-signature", status: "live", description: "Professional email signatures in seconds." },
      { name: "Invoice Creator", icon: FileText, href: "/tools/invoice-creator", status: "live", description: "Create and download invoices instantly." },
      { name: "Quotation Maker", icon: Receipt, href: "/tools/quotation-maker", status: "live", description: "Generate professional quotations." },
      { name: "Business Name Generator", icon: Sparkles, href: "/tools/business-name-generator", status: "live", description: "AI-powered business name ideas." },
    ],
  },
  {
    name: "Design & Dev",
    category: "design",
    tools: [
      { name: "QR Code Generator", icon: QrCode, href: "/tools/qr-code-generator", status: "live", description: "Custom QR codes for any URL." },
      { name: "Image Compressor", icon: Image, href: "/tools/image-compressor", status: "coming-soon", description: "Batch compress without losing quality." },
      { name: "Colour Palette Picker", icon: Palette, href: "/tools/colour-palette", status: "coming-soon", description: "Generate harmonic colour schemes." },
      { name: "Favicon Generator", icon: Square, href: "/tools/favicon-generator", status: "coming-soon", description: "Create favicons from any image." },
      { name: "Irish Lorem Ipsum", icon: Clover, href: "/tools/lorem-ipsum", status: "coming-soon", description: "Placeholder text with Irish flair." },
    ],
  },
  {
    name: "Security",
    category: "security",
    tools: [
      { name: "Password Generator", icon: Key, href: "/tools/password-generator", status: "live", description: "Secure random password generation." },
      { name: "Password Strength Checker", icon: ShieldCheck, href: "/tools/password-checker", status: "coming-soon", description: "Test your password security." },
    ],
  },
  {
    name: "Marketing & SEO",
    category: "seo",
    tools: [
      { name: "UTM Builder", icon: Link2, href: "/tools/utm-builder", status: "live", description: "Track campaigns with UTM parameters." },
      { name: "Meta Tag Preview", icon: Globe, href: "/tools/meta-tag-preview", status: "coming-soon", description: "Preview your search snippets." },
      { name: "OpenGraph Preview", icon: Share2, href: "/tools/opengraph-preview", status: "live", description: "Preview social share cards." },
      { name: "Hashtag Suggester", icon: Hash, href: "/tools/hashtag-suggester", status: "live", description: "AI-powered hashtag suggestions." },
      { name: "Email Subject Tester", icon: MessageSquare, href: "/tools/email-subject-tester", status: "coming-soon", description: "Test subject line effectiveness." },
    ],
  },
  {
    name: "Calculators",
    category: "calculators",
    tools: [
      { name: "VAT Calculator", icon: Percent, href: "/tools/vat-calculator", status: "live", description: "Calculate VAT for any amount." },
      { name: "Break-Even Calculator", icon: Calculator, href: "/tools/break-even-calculator", status: "coming-soon", description: "Find your break-even point." },
      { name: "Hourly Rate Calculator", icon: PoundSterling, href: "/tools/hourly-rate-calculator", status: "coming-soon", description: "Calculate your ideal hourly rate." },
    ],
  },
  {
    name: "Legal & Compliance",
    category: "legal",
    tools: [
      { name: "Privacy Policy Generator", icon: Lock, href: "/tools/privacy-policy-builder", status: "live", description: "GDPR-compliant privacy policies." },
      { name: "Terms & Conditions", icon: FileText, href: "/tools/terms-generator", status: "live", description: "Legal terms generator." },
      { name: "Cookie Consent Manager", icon: Square, href: "/tools/cookie-consent-manager", status: "live", description: "Cookie consent solution." },
    ],
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "business", label: "Business" },
  { id: "design", label: "Design" },
  { id: "seo", label: "Marketing" },
  { id: "calculators", label: "Calculators" },
  { id: "security", label: "Security" },
  { id: "legal", label: "Legal" },
];

export default function ToolsHub() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const allTools = useMemo(
    () =>
      TOOL_CATEGORIES.flatMap((c) =>
        c.tools.map((t) => ({ ...t, categoryId: c.category }))
      ),
    []
  );

  const filtered = allTools.filter((t) => {
    const matchesCat = active === "all" || t.categoryId === active;
    const q = query.toLowerCase().trim();
    const matchesSearch =
      !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      {/* Heading */}
      <section className="pt-20 pb-12 px-6">
        <div className="w-full mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-pl-muted">
              Free Toolkit · No login
            </span>
            <span className="h-px w-8 bg-stroke" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-4xl md:text-6xl leading-[0.95] tracking-tight text-text-primary mb-8"
          >
            Small tools. Sharp output.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="max-w-md mx-auto"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools..."
              aria-label="Search tools"
              className="w-full bg-surface border border-stroke rounded-full px-5 py-3 text-sm text-text-primary placeholder:text-pl-muted focus:outline-hidden focus:border-text-primary transition-colors"
            />
          </motion.div>
        </div>
      </section>

      {/* Filter pills */}
      <section className="px-6 mb-10" aria-labelledby="tools-filter-title">
        <h2 id="tools-filter-title" className="sr-only">Filter tools by category</h2>
        <div className="w-full mx-auto flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActive(f.id)}
                aria-pressed={isActive}
                className={`text-xs sm:text-sm rounded-full px-4 py-2 border transition-colors ${
                  isActive
                    ? "border-text-primary bg-text-primary text-bg"
                    : "border-stroke text-pl-muted hover:text-text-primary hover:border-text-primary/50"
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="px-6 pb-24" aria-labelledby="tools-grid-title">
        <h2 id="tools-grid-title" className="sr-only">Free business, design, marketing and legal tools</h2>
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-stroke border border-stroke rounded-2xl overflow-hidden">
          {filtered.map((tool, i) => {
            const Icon = tool.icon;
            const isLive = tool.status === "live";
            const Card = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.5) }}
                className={`group relative bg-bg p-7 md:p-8 h-full flex flex-col transition-colors ${
                  isLive ? "hover:bg-surface" : "opacity-50"
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-10 h-10 rounded-full border border-stroke flex items-center justify-center group-hover:border-text-primary transition-colors">
                    <Icon className="w-4 h-4 text-text-primary" strokeWidth={1.4} />
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-pl-muted">
                    {isLive ? tool.categoryId : "Soon"}
                  </span>
                </div>

                <h3 className="font-display italic text-2xl text-text-primary mb-2 leading-tight">
                  {tool.name}
                </h3>
                <p className="text-sm text-pl-muted font-light leading-relaxed mb-6 flex-grow">
                  {tool.description}
                </p>

                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                  {isLive ? "Open tool" : "Coming soon"}
                  {isLive && (
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </span>
              </motion.div>
            );

            return isLive ? (
              <Link key={tool.name} to={tool.href} className="block">
                {Card}
              </Link>
            ) : (
              <div key={tool.name}>{Card}</div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full bg-bg p-16 text-center text-pl-muted text-sm font-light">
              No tools match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
