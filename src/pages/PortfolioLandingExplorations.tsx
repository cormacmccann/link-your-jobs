import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const SHOTS = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=1000&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1000&q=80",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1000&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1000&q=80",
  "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=1000&q=80",
  "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1000&q=80",
  "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1000&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&q=80",
  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=80",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1000&q=80",
  "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1000&q=80",
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PortfolioLandingExplorations() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      <Navbar />

      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Explorations</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight">
              Visual <span className="text-pl-muted">playground</span>
            </h1>
            <p className="mt-8 max-w-xl text-pl-muted text-base md:text-lg">
              Loose experiments, side quests, and process work. Click any frame to expand.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-5">
            {SHOTS.map((src, i) => (
              <motion.button
                key={src}
                onClick={() => setLightbox(src)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: (i % 4) * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className="block w-full mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-stroke bg-surface group"
              >
                <img src={src} alt="" className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
              </motion.button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-pl-muted hover:text-text-primary transition-colors">
              <span aria-hidden>←</span> Back to home
            </Link>
          </div>
        </div>
      </section>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out">
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
        </div>
      )}

      <ContactFooter />
    </div>
  );
}
