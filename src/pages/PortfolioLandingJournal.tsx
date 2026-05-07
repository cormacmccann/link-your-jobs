import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const FEATURED = {
  title: "On the rhythm of interfaces",
  excerpt: "How cadence — not color — is the most underrated tool in product design.",
  img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1800&q=80",
  read: "5 min read",
  date: "March 2026",
};

const ENTRIES = [
  { title: "Why systems beat one-offs", excerpt: "On scaling design without losing soul.", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&q=80", read: "7 min read", date: "Feb 2026", tag: "Process" },
  { title: "The quiet power of motion", excerpt: "Easing curves as language.", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", read: "4 min read", date: "Jan 2026", tag: "Motion" },
  { title: "Designing for trust", excerpt: "What banks, doctors and weather apps share.", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", read: "6 min read", date: "Dec 2025", tag: "UX" },
  { title: "Notes from a small studio", excerpt: "Three years, two people, one ethos.", img: "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=600&q=80", read: "8 min read", date: "Nov 2025", tag: "Studio" },
  { title: "Type as architecture", excerpt: "Building rooms with letterforms.", img: "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=600&q=80", read: "5 min read", date: "Oct 2025", tag: "Type" },
  { title: "On long-form deliverables", excerpt: "Why the deck still matters.", img: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&q=80", read: "6 min read", date: "Sep 2025", tag: "Process" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function PortfolioLandingJournal() {
  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      <Navbar />

      <section className="pt-40 pb-12 md:pt-48 md:pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight">
              Field <span className="text-pl-muted">notes</span>
            </h1>
            <p className="mt-8 max-w-xl text-pl-muted text-base md:text-lg">
              Essays, observations, and detours from the studio. Updated whenever something is worth saying.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      <section className="pb-16">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            viewport={{ once: true, margin: "-100px" }}
            className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center"
          >
            <div className="md:col-span-7 relative rounded-3xl overflow-hidden border border-stroke aspect-[16/10]">
              <img src={FEATURED.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="md:col-span-5">
              <div className="text-[11px] uppercase tracking-[0.3em] text-pl-muted">Featured · {FEATURED.date}</div>
              <h2 className="mt-4 text-3xl md:text-5xl font-display leading-tight">{FEATURED.title}</h2>
              <p className="mt-4 text-pl-muted">{FEATURED.excerpt}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm text-text-primary group-hover:gap-3 transition-all">
                Read essay <span aria-hidden>→</span>
              </div>
            </div>
          </motion.a>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ENTRIES.map((e, i) => (
              <motion.a
                key={e.title}
                href="#"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: (i % 3) * 0.07 }}
                viewport={{ once: true, margin: "-50px" }}
                className="group block"
              >
                <div className="relative rounded-2xl overflow-hidden border border-stroke aspect-[4/3]">
                  <img src={e.img} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-pl-muted">
                  <span>{e.tag}</span><span>·</span><span>{e.date}</span><span>·</span><span>{e.read}</span>
                </div>
                <h3 className="mt-2 text-xl md:text-2xl font-display text-text-primary group-hover:text-text-primary/90">{e.title}</h3>
                <p className="mt-2 text-sm text-pl-muted">{e.excerpt}</p>
              </motion.a>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-pl-muted hover:text-text-primary transition-colors">
              <span aria-hidden>←</span> Back to home
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
