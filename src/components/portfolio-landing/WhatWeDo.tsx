import { motion } from "framer-motion";

const ease = [0.25, 0.1, 0.25, 1] as const;

const halftone = {
  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
  backgroundSize: "4px 4px",
};

function HoverRing() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute rounded-3xl accent-gradient animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity"
      style={{ inset: -2, zIndex: 0 }}
    />
  );
}

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between flex-wrap gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">What We Do</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.05] tracking-tight mb-6 font-light">
              Five disciplines. One <span className="font-display">standard.</span>
            </h2>
            <p className="text-sm md:text-base text-pl-muted max-w-md">
              Websites, web apps, brand systems, marketing and AI implementation — same team, same standard, fifteen years deep.
            </p>
          </div>
          <a
            href="mailto:cormac@kamrok.com"
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-7 py-3.5 border-2 border-stroke text-text-primary hover:border-transparent transition-all"
          >
            <span
              aria-hidden
              className="absolute rounded-full accent-gradient animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ inset: -2, zIndex: 0 }}
            />
            <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-bg px-2 py-0">
              Start a project <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Card 1 — Web Design */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative md:col-span-7 bg-surface border border-stroke rounded-3xl overflow-hidden transition-all hover:border-transparent"
          >
            <HoverRing />
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=80"
                alt="Websites that work"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 mix-blend-multiply opacity-20" style={halftone} />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent" />
              <div className="relative z-10 p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
                <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">01 / Discipline</span>
                <div>
                  <h3 className="text-3xl md:text-4xl text-text-primary tracking-tight leading-tight mb-3">
                    Websites that <em className="font-display not-italic">work.</em>
                  </h3>
                  <p className="text-sm md:text-base text-pl-muted max-w-md">
                    Built fast, built clean, built to convert. Fifteen years of shipping the kind of websites a serious business deserves.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2 — AI Implementation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="group relative md:col-span-5 bg-surface border border-stroke rounded-3xl overflow-hidden transition-all hover:border-transparent"
          >
            <HoverRing />
            <div
              className="relative rounded-3xl"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 85% 15%, rgba(137, 170, 204, 0.08), transparent 55%)",
              }}
            >
              <div className="relative z-10 p-8 md:p-10 min-h-[320px] flex flex-col justify-between">
                <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">02 / Discipline</span>
                <div>
                  <h3 className="text-3xl md:text-4xl text-text-primary tracking-tight leading-tight mb-3">
                    AI, <em className="font-display not-italic">properly.</em>
                  </h3>
                  <p className="text-sm md:text-base text-pl-muted">
                    Real workflows, not demos. Clean data, clear prompts, structure that pays back. The work most clients didn't know AI could do.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards 3–5 */}
          {[
            {
              num: "03",
              title: "Apps &",
              italic: "SaaS.",
              body:
                "Custom platforms, internal tools and SaaS. We've built and shipped our own — so we know what production looks like.",
            },
            {
              num: "04",
              title: "Brand &",
              italic: "identity.",
              body:
                "Brand systems, identities, print and digital. The visual standard a serious business deserves.",
            },
            {
              num: "05",
              title: "Marketing &",
              italic: "growth.",
              body:
                "Campaigns, content, SEO and the data behind them. Strategy you can measure. Execution that lands.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative md:col-span-4 bg-surface border border-stroke rounded-3xl overflow-hidden transition-all hover:border-transparent"
            >
              <HoverRing />
              <div className="relative z-10 p-8 md:p-10 min-h-[320px] flex flex-col justify-between rounded-3xl bg-surface">
                <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">{c.num} / Discipline</span>
                <div>
                  <h3 className="text-2xl md:text-3xl text-text-primary tracking-tight leading-tight mb-3">
                    {c.title} <em className="font-display not-italic">{c.italic}</em>
                  </h3>
                  <p className="text-sm text-pl-muted">{c.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
