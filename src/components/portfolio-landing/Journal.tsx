import { motion } from "framer-motion";

const ENTRIES = [
  { title: "On the rhythm of interfaces", img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80", read: "5 min read", date: "Mar 2026" },
  { title: "Why systems beat one-offs", img: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=400&q=80", read: "7 min read", date: "Feb 2026" },
  { title: "The quiet power of motion", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80", read: "4 min read", date: "Jan 2026" },
  { title: "Designing for trust", img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80", read: "6 min read", date: "Dec 2025" },
];

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Journal() {
  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex items-end justify-between flex-wrap gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-light">
              Recent <span className="font-display">thoughts</span>
            </h2>
            <p className="mt-4 text-pl-muted max-w-md">
              Notes from the studio — process, observations, and detours.
            </p>
          </div>
          <a
            href="#"
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-3 border border-stroke text-text-primary"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 1 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative inline-flex items-center gap-2">View all <span aria-hidden>→</span></span>
          </a>
        </motion.div>

        <div className="space-y-4">
          {ENTRIES.map((e, i) => (
            <motion.a
              key={e.title}
              href="#"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              viewport={{ once: true, margin: "-50px" }}
              className="flex items-center gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors"
            >
              <img src={e.img} alt={e.title} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-text-primary text-base sm:text-lg truncate">{e.title}</div>
              </div>
              <div className="hidden sm:flex items-center gap-6 text-xs text-pl-muted shrink-0 pr-4">
                <span>{e.read}</span>
                <span>{e.date}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
