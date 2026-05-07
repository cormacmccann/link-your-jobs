import { motion } from "framer-motion";

const PROJECTS = [
  {
    title: "Automotive Motion",
    img: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Urban Architecture",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Human Perspective",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&q=80",
    span: "md:col-span-5",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Brand Identity",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80",
    span: "md:col-span-7",
    aspect: "aspect-[16/10]",
  },
];

const halftone = {
  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
  backgroundSize: "4px 4px",
};

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function SelectedWorks() {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
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
              <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-light">
              Featured <span className="font-display">projects</span>
            </h2>
            <p className="mt-4 text-pl-muted max-w-md">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>
          <a
            href="#work"
            className="group relative hidden md:inline-flex items-center gap-2 rounded-full text-sm px-5 py-3 border border-stroke text-text-primary"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 1 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative inline-flex items-center gap-2">
              View all work <span aria-hidden>→</span>
            </span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.title}
              href="#"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`group relative bg-surface border border-stroke rounded-3xl overflow-hidden ${p.span} ${p.aspect}`}
            >
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 opacity-20 mix-blend-multiply" style={halftone} />
              <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-lg flex items-center justify-center">
                <div className="relative rounded-full p-[1.5px] accent-gradient animate-gradient-shift">
                  <div className="rounded-full bg-white text-bg px-5 py-2 text-sm">
                    View — <span className="font-display">{p.title}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
