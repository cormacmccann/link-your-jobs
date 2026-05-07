import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const PROJECTS = [
  { title: "Automotive Motion", category: "Brand Film", year: "2026", img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1400&q=80", span: "md:col-span-7", aspect: "aspect-[16/10]" },
  { title: "Urban Architecture", category: "Editorial", year: "2026", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80", span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { title: "Human Perspective", category: "Portrait Series", year: "2025", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80", span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { title: "Brand Identity", category: "Design System", year: "2025", img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1400&q=80", span: "md:col-span-7", aspect: "aspect-[16/10]" },
  { title: "Studio Sessions", category: "Photography", year: "2025", img: "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=1400&q=80", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { title: "Quiet Type", category: "Type Study", year: "2025", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&q=80", span: "md:col-span-6", aspect: "aspect-[4/3]" },
  { title: "Northern Light", category: "Travel", year: "2024", img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1200&q=80", span: "md:col-span-4", aspect: "aspect-square" },
  { title: "Workshop", category: "Process", year: "2024", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", span: "md:col-span-4", aspect: "aspect-square" },
  { title: "Field Notes", category: "Editorial", year: "2024", img: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1200&q=80", span: "md:col-span-4", aspect: "aspect-square" },
  { title: "Interface Studies", category: "Product Design", year: "2024", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1400&q=80", span: "md:col-span-7", aspect: "aspect-[16/10]" },
  { title: "Quiet Architecture", category: "Editorial", year: "2024", img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1200&q=80", span: "md:col-span-5", aspect: "aspect-[4/5]" },
  { title: "Coastal Drift", category: "Photography", year: "2023", img: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1200&q=80", span: "md:col-span-12", aspect: "aspect-[21/9]" },
];

const FILTERS = ["All", "Brand", "Editorial", "Photography", "Product"];

const halftone = {
  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
  backgroundSize: "4px 4px",
};

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PortfolioLandingWork() {
  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      <Navbar />

      <section className="pt-40 pb-16 md:pt-48 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">All Work · 2023 → 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight">
              The <span className="text-pl-muted">archive</span>
            </h1>
            <p className="mt-8 max-w-xl text-pl-muted text-base md:text-lg">
              Selected commissions, side projects, and experiments. Browse the full body of work or filter by discipline.
            </p>

            <div className="mt-10 flex flex-wrap gap-2">
              {FILTERS.map((f, i) => (
                <button
                  key={f}
                  className={`text-xs uppercase tracking-[0.2em] rounded-full px-4 py-2 border transition-colors ${
                    i === 0
                      ? "bg-text-primary text-bg border-text-primary"
                      : "border-stroke text-pl-muted hover:text-text-primary hover:border-text-primary/40"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
            {PROJECTS.map((p, i) => (
              <motion.a
                key={p.title}
                href="#"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: (i % 4) * 0.05 }}
                viewport={{ once: true, margin: "-80px" }}
                className={`group relative bg-surface border border-stroke rounded-3xl overflow-hidden ${p.span} ${p.aspect}`}
              >
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={halftone} />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.25em] text-pl-muted">{p.category} · {p.year}</div>
                      <div className="mt-1 text-xl md:text-2xl font-display text-text-primary">{p.title}</div>
                    </div>
                    <span className="shrink-0 text-text-primary text-2xl group-hover:translate-x-1 transition-transform" aria-hidden>↗</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-pl-muted hover:text-text-primary transition-colors"
            >
              <span aria-hidden>←</span> Back to home
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
