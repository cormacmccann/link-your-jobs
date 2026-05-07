import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const EXPERIENCE = [
  { role: "Independent Designer", org: "Studio Smith", period: "2022 — Now", desc: "Brand systems, digital products, and editorial work for founders and studios across the US and EU." },
  { role: "Design Lead", org: "Northwind Labs", period: "2019 — 2022", desc: "Led product design for a 40-person fintech, shipping the v3 platform and the design system that powered it." },
  { role: "Senior Product Designer", org: "Foldable Co.", period: "2016 — 2019", desc: "Owned end-to-end flows for a creator-economy app used by 1M+ monthly users." },
  { role: "Designer", org: "Field & Form", period: "2013 — 2016", desc: "Branding, identity, and packaging for restaurants, hospitality, and lifestyle brands." },
];

const EDUCATION = [
  { school: "Rhode Island School of Design", period: "2011 — 2013", desc: "MFA, Graphic Design" },
  { school: "University of Illinois", period: "2007 — 2011", desc: "BFA, Visual Communication" },
];

const SKILLS = ["Brand Systems", "Product Design", "Design Systems", "Type & Editorial", "Motion", "Art Direction", "Front-end (React, Tailwind)", "Workshops"];
const RECOGNITION = ["Awwwards SOTD ×6", "FWA ×3", "CSSDA Best UI 2024", "Brand New Noted 2023"];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PortfolioLandingResume() {
  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Résumé · Updated 2026</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight">
              Michael <span className="text-pl-muted">Smith</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pl-muted text-base md:text-lg">
              Designer, fullstack engineer and founder based in Chicago. Twenty years of building seamless digital interactions for brands, products and the people behind them.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="mailto:hello@michaelsmith.com" className="rounded-full text-sm px-6 py-3 bg-text-primary text-bg hover:opacity-90 transition-opacity">
                hello@michaelsmith.com
              </a>
              <a href="#" className="rounded-full text-sm px-6 py-3 border border-stroke text-text-primary hover:border-text-primary/40 transition-colors">
                Download PDF ↓
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em] text-pl-muted">Experience</div>
            </div>
            <div className="md:col-span-9 space-y-10">
              {EXPERIENCE.map((e, i) => (
                <motion.div
                  key={e.role + e.org}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="border-t border-stroke pt-6 grid grid-cols-1 md:grid-cols-12 gap-4"
                >
                  <div className="md:col-span-3 text-pl-muted text-sm">{e.period}</div>
                  <div className="md:col-span-9">
                    <div className="text-2xl md:text-3xl font-display text-text-primary">{e.role}</div>
                    <div className="text-sm text-pl-muted mt-1">{e.org}</div>
                    <p className="mt-3 text-text-primary/80">{e.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-3">
              <div className="text-xs uppercase tracking-[0.3em] text-pl-muted">Education</div>
            </div>
            <div className="md:col-span-9 space-y-10">
              {EDUCATION.map((e) => (
                <div key={e.school} className="border-t border-stroke pt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3 text-pl-muted text-sm">{e.period}</div>
                  <div className="md:col-span-9">
                    <div className="text-2xl md:text-3xl font-display text-text-primary">{e.school}</div>
                    <p className="mt-2 text-text-primary/80">{e.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills + Recognition */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-pl-muted mb-6">Skills</div>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <span key={s} className="text-sm rounded-full px-4 py-2 border border-stroke text-text-primary/90">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-pl-muted mb-6">Recognition</div>
            <ul className="space-y-3 text-text-primary/90">
              {RECOGNITION.map((r) => (
                <li key={r} className="border-t border-stroke pt-3 text-base md:text-lg">{r}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-pl-muted hover:text-text-primary transition-colors">
            <span aria-hidden>←</span> Back to home
          </Link>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
