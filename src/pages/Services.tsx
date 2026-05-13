import { Monitor, Smartphone, Palette, Video, Megaphone, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "@/styles/portfolio-landing.css";
import Navbar from "@/components/portfolio-landing/Navbar";
import ContactFooter from "@/components/portfolio-landing/ContactFooter";

const SERVICES = [
  {
    title: "Web Design",
    description:
      "High-performance, bespoke websites built for conversion. Pixel-perfect aesthetics that elevate your professional presence.",
    icon: Monitor,
    path: "/services/web-design",
    features: ["Custom UI / UX", "Responsive build", "CMS integration"],
  },
  {
    title: "App Development",
    description:
      "Native and cross-platform mobile products for startups and enterprises. Intuitive journeys that keep audiences engaged.",
    icon: Smartphone,
    path: "/services/app-development",
    features: ["iOS & Android", "Product prototyping", "API architecture"],
  },
  {
    title: "Digital Marketing",
    description:
      "Performance marketing that scales. From paid social to automated funnels — built to dominate your category.",
    icon: Megaphone,
    path: "/services/branding",
    features: ["Paid media strategy", "Content strategy", "ROI analytics"],
  },
  {
    title: "SEO Excellence",
    description:
      "Technical SEO, authority building and local visibility for competitive markets. Built to compound month over month.",
    icon: Search,
    path: "/services/web-design",
    features: ["Local SEO", "Technical audits", "Backlink strategy"],
  },
  {
    title: "Graphic Design",
    description:
      "Brand systems and marketing collateral that make you unforgettable. From logo to launch.",
    icon: Palette,
    path: "/services/graphic-design",
    features: ["Brand identity", "Marketing collateral", "Social assets"],
  },
  {
    title: "Video Design",
    description:
      "Motion graphics, animation and short-form video that tells your story and stops the scroll.",
    icon: Video,
    path: "/services/video-design",
    features: ["Motion graphics", "Production", "Animation & FX"],
  },
];

const STATS = [
  { value: "150+", label: "Projects shipped" },
  { value: "98%", label: "Client retention" },
  { value: "15yrs", label: "In the craft" },
];

export default function Services() {
  const navigate = useNavigate();

  return (
    <div className="portfolio-landing-root font-body bg-bg text-text-primary min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-[10px] uppercase tracking-[0.3em] text-pl-muted">
              What we do
            </span>
            <span className="h-px w-8 bg-stroke" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-text-primary mb-6"
          >
            Services for the
            <br />
            AI-Native Web
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-base md:text-lg text-pl-muted max-w-xl mx-auto font-light"
          >
            Six disciplines, one studio. Researched deeper, shipped faster.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-stroke border border-stroke rounded-2xl overflow-hidden">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button
                key={s.title}
                onClick={() => navigate(s.path)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="group relative bg-bg p-8 md:p-10 text-left hover:bg-surface transition-colors min-h-[340px] flex flex-col"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-11 h-11 rounded-full border border-stroke flex items-center justify-center group-hover:border-text-primary transition-colors">
                    <Icon className="w-5 h-5 text-text-primary" strokeWidth={1.4} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-pl-muted">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-display italic text-3xl md:text-4xl text-text-primary mb-4 leading-tight">
                  {s.title}
                </h3>
                <p className="text-sm text-pl-muted font-light leading-relaxed mb-6 flex-grow">
                  {s.description}
                </p>

                <ul className="space-y-1.5 mb-6">
                  {s.features.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-pl-muted uppercase tracking-[0.15em]"
                    >
                      — {f}
                    </li>
                  ))}
                </ul>

                <span className="inline-flex items-center gap-2 text-sm text-text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 py-24 border-t border-stroke">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-8 bg-stroke" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-pl-muted">
                By the numbers
              </span>
              <span className="h-px w-8 bg-stroke" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              Quietly outperforming
              <br />
              studios twice our size.
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-6 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center border-t border-stroke pt-6"
              >
                <div className="font-display text-5xl md:text-7xl text-text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-pl-muted">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl text-text-primary mb-8 leading-[1]">
            Let's build
            <br />
            something worth shipping.
          </h2>
          <Link
            to="/contact"
            className="group relative inline-flex rounded-full text-sm px-8 py-4 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all hover:scale-105"
          >
            <span
              className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ padding: 2 }}
            >
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative">Grow Your Business →</span>
          </Link>
        </div>
      </section>

      <ContactFooter />
    </div>
  );
}
