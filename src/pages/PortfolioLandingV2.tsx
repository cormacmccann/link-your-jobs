import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "@/styles/portfolio-landing-v2.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const TRUST_LOGOS = ["Dundalk FC", "Clubrovia", "Kodiak", "Northern Forge", "Silvermoor"];

const FEATURES = [
  {
    icon: "▣",
    title: "Websites That Convert",
    body: "Custom builds on Shopify, WordPress and headless stacks — engineered for speed, SEO and revenue, not just pretty screenshots.",
  },
  {
    icon: "✦",
    title: "Brand & Marketing",
    body: "Identity systems, paid media and content strategy that compound. We obsess over the metric that matters: qualified pipeline.",
  },
  {
    icon: "◈",
    title: "Always-On Studio",
    body: "Embedded design and dev support, no agency theatre. Async updates, weekly demos, real shipping cadence.",
  },
];

export default function PortfolioLandingV2() {
  return (
    <div className="pl-v2 portfolio-landing-root font-sans bg-bg text-text-primary min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 md:pt-56 pb-24 px-6">
        {/* radial glow backdrop */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 30%, rgba(255,140,60,0.10), transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="pl-v2-display text-[15vw] md:text-[9vw] lg:text-[8.5rem] leading-[0.92] tracking-[-0.04em] text-text-primary max-w-5xl"
          >
            The Studio<br />Behind the Brands
          </motion.h1>

          <div className="mt-10 md:mt-14 grid md:grid-cols-2 gap-8 md:gap-16 items-end">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base md:text-lg text-pl-muted font-light max-w-md"
            >
              Kamrok unifies web design, Shopify, WordPress, brand and marketing — built by a studio that researches deeper and ships faster than anyone our size should.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex md:justify-end"
            >
              <Link to="/contact" className="pl-v2-cta group">
                <span className="pl-v2-cta-glow" aria-hidden />
                <span className="pl-v2-cta-inner">
                  Grow Your Business
                  <span className="pl-v2-cta-arrow" aria-hidden>→</span>
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-24 md:mt-32"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-pl-muted mb-6">
              Trusted by ambitious brands
            </div>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {TRUST_LOGOS.map((name) => (
                <span
                  key={name}
                  className="pl-v2-logo text-xl md:text-2xl text-pl-muted/80 hover:text-text-primary transition-colors"
                >
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features row */}
      <section className="px-6 py-24 border-t border-stroke">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="w-10 h-10 rounded-md border border-stroke flex items-center justify-center mb-5 text-text-primary">
                {f.icon}
              </div>
              <h3 className="pl-v2-display text-2xl md:text-3xl tracking-[-0.02em] mb-3">
                {f.title}
              </h3>
              <p className="text-sm text-pl-muted font-light leading-relaxed max-w-sm">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
