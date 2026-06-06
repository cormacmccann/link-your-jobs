import { useState } from "react";
import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";
import SkillsShowcase, { SKILL_ICONS } from "@/components/kamrok/SkillsShowcase";

type Detail = {
  tagline: string;
  body: string;
  tools: string[];
};

const DETAILS: Record<string, Detail> = {
  react: {
    tagline: "Component-driven interfaces that feel instant.",
    body: "I build front-ends in React + TypeScript — clean component architecture, sensible state, and the kind of buttery client-side interaction this very site is made of (the moon homepage is react-three-fiber). Strongly-typed, tested where it counts, and tuned for Core Web Vitals.",
    tools: ["React", "TypeScript", "Vite", "react-three-fiber", "Tailwind", "React Router"],
  },
  wordpress: {
    tagline: "Editorial sites clients can actually run.",
    body: "Custom WordPress builds — bespoke themes and Gutenberg blocks (no page-builder bloat), Advanced Custom Fields for clean editing, and headless WordPress when a project wants a React front-end with a familiar CMS behind it. Fast, secure, and handed over with documentation.",
    tools: ["WordPress", "Gutenberg blocks", "ACF", "Headless / REST", "WooCommerce", "PHP"],
  },
  google: {
    tagline: "Built to be found, measured, and to rank.",
    body: "Technical SEO baked in from the first commit: semantic markup, structured data, clean information architecture, sitemaps and Core Web Vitals budgets. Plus the measurement to prove it — GA4, Search Console and event tracking so you can see what's actually working.",
    tools: ["Technical SEO", "Core Web Vitals", "GA4", "Search Console", "Schema.org", "Lighthouse"],
  },
  starburst: {
    tagline: "Motion that guides the eye — never shows off.",
    body: "Interaction and motion design: micro-interactions that make an interface feel alive, scroll-driven storytelling, and real-time 3D with WebGL when a project calls for spectacle. Always performance-first and respectful of reduced-motion preferences.",
    tools: ["Framer Motion", "GSAP", "Lenis", "Three.js / WebGL", "Reduced-motion aware"],
  },
  heart: {
    tagline: "The craft and care that ties it together.",
    body: "The human layer: brand systems and wordmarks, scalable design systems, and UX grounded in real user intent. Accessibility is a baseline, not an afterthought — WCAG-minded contrast, keyboard paths and semantics throughout.",
    tools: ["Brand systems", "Design systems", "Figma", "Accessibility (WCAG)", "UX research"],
  },
};

const CORE = [
  { k: "CORE", h: "UI / UX Design", p: "Interface design, flows, hierarchy and design systems that scale." },
  { k: "CORE", h: "Web Design", p: "Marketing sites and product surfaces with rhythm and restraint." },
  { k: "HTML · CSS · JS", h: "Front-end", p: "Hand-built, performant, accessible front-ends — including playful WebGL." },
  { k: "IDENTITY", h: "Branding", p: "Wordmarks, type systems and the visual language that ties it together." },
  { k: "INTERACTION", h: "Motion", p: "Micro-interactions that guide attention without showing off." },
  { k: "FIGMA · CODE", h: "Prototyping", p: "From clickable flows to coded prototypes that feel like the real thing." },
];

const PROCESS = [
  { n: "01", h: "Discover", p: "Goals, audience and constraints. What does success actually look like?" },
  { n: "02", h: "Design", p: "Structure first, then surface — wireframes into a considered visual system." },
  { n: "03", h: "Build", p: "Accessible, fast, hand-built front-end. No bloat, no surprises." },
  { n: "04", h: "Ship & measure", p: "Launch, instrument, and iterate on what the data shows." },
];

export default function Skills() {
  const [active, setActive] = useState<string | null>(null);

  const select = (k: string) => {
    setActive(k);
    document.getElementById(`skill-${k}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <KamrokLayout
      title="Skills & Services — React, WordPress, SEO, Motion | KAMROK"
      description="Cormac's skills: React front-end, WordPress, technical SEO, motion & WebGL, brand and UX. The stack behind elegant, fast, accessible websites."
    >
      <Emblem />
      <div className="kk-eyebrow">INSTRUMENTS · 03</div>
      <h1>What I Do</h1>
      <Divider />
      <p className="kk-lead-text">
        A full-stack design toolkit — from first concept to a shipped, accessible front-end. These are
        the same icons you can knock off their pedestals out on the moon.
      </p>

      <SkillsShowcase active={active} onSelect={select} />

      <div className="kk-stack">
        {SKILL_ICONS.map((ic) => {
          const d = DETAILS[ic.key];
          return (
            <section
              id={`skill-${ic.key}`}
              key={ic.key}
              className={`kk-skill${active === ic.key ? " is-active" : ""}`}
              style={{ ["--accent" as string]: ic.color }}
              onMouseEnter={() => setActive(ic.key)}
            >
              <div className="kk-skill__dot" />
              <div className="kk-skill__main">
                <div className="kk-skill__head">
                  <h2>{ic.name}</h2>
                  <span className="kk-skill__k">{ic.kicker}</span>
                </div>
                <p className="kk-skill__tag">{d.tagline}</p>
                <p>{d.body}</p>
                <ul className="kk-tags">
                  {d.tools.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      <h2 className="kk-sub">Core disciplines</h2>
      <div className="kk-grid">
        {CORE.map((s) => (
          <section key={s.h}>
            <div className="kk-k">{s.k}</div>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>

      <h2 className="kk-sub">How a project runs</h2>
      <div className="kk-process">
        {PROCESS.map((s) => (
          <div className="kk-step" key={s.n}>
            <span className="kk-step__n">{s.n}</span>
            <div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          </div>
        ))}
      </div>

      <Link className="kk-cta" to="/contact">
        WORK WITH ME →
      </Link>
    </KamrokLayout>
  );
}
