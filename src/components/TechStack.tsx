import { GlowCard } from "@/components/ui/GlowCard";
import { motion } from "framer-motion";

type Tool = {
  name: string;
  category: string;
  description: string;
  wordmark: string; // short display text
  color: "blue" | "purple" | "green" | "red" | "orange";
  accent: string; // tailwind text color class
};

const tools: Tool[] = [
  {
    name: "WordPress",
    category: "CMS",
    description: "The world's most flexible CMS — powering content-rich sites, blogs and WooCommerce stores we build for clients.",
    wordmark: "WP",
    color: "blue",
    accent: "text-acc-cyan",
  },
  {
    name: "PHP",
    category: "Backend",
    description: "Battle-tested server language behind WordPress, Laravel and most of our custom CMS integrations.",
    wordmark: "PHP",
    color: "purple",
    accent: "text-acc-violet",
  },
  {
    name: "Lovable",
    category: "AI App Builder",
    description: "Our go-to AI-native build platform for shipping production React apps and CRMs in days, not months.",
    wordmark: "♥",
    color: "red",
    accent: "text-acc-pink",
  },
  {
    name: "Bolt",
    category: "AI App Builder",
    description: "StackBlitz Bolt for rapid in-browser prototyping when we need to validate an idea fast.",
    wordmark: "⚡",
    color: "orange",
    accent: "text-acc-orange",
  },
  {
    name: "Base44",
    category: "AI App Builder",
    description: "All-in-one app builder we use to spin up internal tools and lightweight client portals.",
    wordmark: "B44",
    color: "green",
    accent: "text-emerald-400",
  },
  {
    name: "Claude",
    category: "AI Assistant",
    description: "Anthropic's Claude is our reasoning engine of choice for code, copy and complex agent workflows.",
    wordmark: "Cl",
    color: "orange",
    accent: "text-acc-orange",
  },
  {
    name: "Anthropic",
    category: "AI Platform",
    description: "Safety-first AI lab behind Claude — we plug their APIs into automations, chatbots and content tools.",
    wordmark: "A",
    color: "orange",
    accent: "text-acc-orange",
  },
  {
    name: "OpenAI",
    category: "AI Platform",
    description: "GPT models powering everything from lead scoring to AI email composition inside our CRM.",
    wordmark: "GPT",
    color: "green",
    accent: "text-emerald-400",
  },
  {
    name: "Shopify",
    category: "eCommerce",
    description: "Headless and themed Shopify builds for brands that need a serious storefront.",
    wordmark: "S",
    color: "green",
    accent: "text-emerald-400",
  },
  {
    name: "Figma",
    category: "Design",
    description: "Where every brand, wireframe and design system lives before it hits production.",
    wordmark: "F",
    color: "purple",
    accent: "text-acc-violet",
  },
  {
    name: "Supabase",
    category: "Backend / DB",
    description: "Postgres, auth, storage and edge functions — the backbone of our custom apps.",
    wordmark: "Sb",
    color: "green",
    accent: "text-emerald-400",
  },
  {
    name: "React",
    category: "Frontend",
    description: "Component-driven UIs with React + Vite + Tailwind for everything we ship.",
    wordmark: "⚛",
    color: "blue",
    accent: "text-acc-cyan",
  },
];

interface TechStackProps {
  variant?: "full" | "marquee";
  title?: string;
  eyebrow?: string;
  description?: string;
}

export default function TechStack({
  variant = "full",
  title = "The Stack We Build With",
  eyebrow = "Tools & Tech",
  description = "We pair best-in-class platforms with the latest AI to ship faster, smarter, better.",
}: TechStackProps) {
  if (variant === "marquee") {
    const loop = [...tools, ...tools];
    return (
      <section className="relative py-16 md:py-20 overflow-hidden bg-bg-0 border-y border-white/5">
        <div className="container mx-auto px-6 mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-text-2 mb-3">{eyebrow}</p>
          <h3 className="text-2xl md:text-3xl font-gobold uppercase tracking-tight text-text-1">
            Powered by the tools we love
          </h3>
        </div>
        <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {loop.map((t, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-white/10 bg-bg-1/60 backdrop-blur min-w-[180px]"
              >
                <div className={`w-10 h-10 rounded-xl bg-bg-0 border border-white/10 flex items-center justify-center font-gobold text-lg ${t.accent}`}>
                  {t.wordmark}
                </div>
                <div>
                  <div className="font-gobold uppercase text-text-1 text-sm tracking-wide">{t.name}</div>
                  <div className="text-[10px] uppercase tracking-wider text-text-2">{t.category}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 md:py-32 px-6 bg-bg-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,92,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-acc-violet mb-4">{eyebrow}</p>
          <h2 className="text-4xl md:text-6xl font-gobold uppercase tracking-tight text-text-1 mb-6">
            {title}
          </h2>
          <p className="text-lg text-text-2">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((t) => (
            <GlowCard key={t.name} glowColor={t.color} customSize className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-bg-0 border border-white/10 flex items-center justify-center font-gobold text-2xl ${t.accent}`}>
                  {t.wordmark}
                </div>
                <div>
                  <h3 className="font-gobold uppercase text-text-1 text-lg leading-tight">{t.name}</h3>
                  <p className="text-[11px] uppercase tracking-wider text-text-2 mt-1">{t.category}</p>
                </div>
              </div>
              <p className="text-text-2 text-sm leading-relaxed">{t.description}</p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
