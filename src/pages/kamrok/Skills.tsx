import { useState } from "react";
import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";
import SkillsShowcase, { SKILL_ICONS } from "@/components/kamrok/SkillsShowcase";

type Detail = {
  name: string;
  kicker: string;
  color: string;
  tagline: string;
  body: string;
  services: string[];
  tools: string[];
};

const DETAILS: Record<string, Detail> = {
  react: {
    name: "React",
    kicker: "WEB DESIGN",
    color: "#61dafb",
    tagline: "Web design + animation, built in React.",
    body: "Design and build, by one person. I take a site from first concept through to a fast, hand-built React front-end — with the motion and micro-interactions that make it feel alive. The moon you're standing on is the demo reel.",
    services: ["Web & UI design", "Animation & micro-interactions", "Custom React front-ends", "Real-time 3D / WebGL", "Core Web Vitals & performance"],
    tools: ["React", "TypeScript", "Vite", "Framer Motion", "react-three-fiber", "Tailwind"],
  },
  wordpress: {
    name: "WordPress",
    kicker: "CMS",
    color: "#2aa7d0",
    tagline: "Complete WordPress builds, done properly.",
    body: "Full WordPress sites from scratch — bespoke themes and Gutenberg blocks (no page-builder bloat), clean editing with ACF, migrations and rescues of tangled installs, and a site your team can actually run themselves.",
    services: ["Complete WordPress builds", "Custom themes & blocks", "Migrations & rescues", "WooCommerce", "Speed & security hardening"],
    tools: ["WordPress", "Gutenberg", "ACF", "WooCommerce", "PHP"],
  },
  google: {
    name: "Google",
    kicker: "GROWTH",
    color: "#4285f4",
    tagline: "Found, measured, and running on Google.",
    body: "The Google side of a business, handled: Workspace set up and configured properly, SEO and technical audits that surface what's holding you back, and Search Console / Webmaster set up so you can see exactly how Google sees you.",
    services: ["Google Workspace setup", "SEO & technical audits", "Search Console / Webmaster", "Analytics (GA4)", "Business Profile & local"],
    tools: ["Google Workspace", "Search Console", "GA4", "Lighthouse", "Schema.org"],
  },
  starburst: {
    name: "Claude",
    kicker: "AI DEV",
    color: "#ff8a3c",
    tagline: "Custom software, built with Claude.",
    body: "AI-assisted development with Claude — I build custom tools, automations and full applications fast, without cutting corners on quality. From a script that saves you hours to a complete product, done in a fraction of the time.",
    services: ["Custom tools & automations", "AI-assisted development", "App & API builds", "Workflow automation", "Prototyping at speed"],
    tools: ["Claude", "TypeScript", "Node", "APIs", "Automation"],
  },
  heart: {
    name: "Lovable",
    kicker: "AI APPS",
    color: "#ff4d6d",
    tagline: "Idea to live product, with Lovable.",
    body: "Full-stack sites and apps built with Lovable — auth, database, payments and a polished UI, shipped in a fraction of the usual time. Ideal for MVPs, internal tools, and getting something real in front of users fast.",
    services: ["Full-stack app builds", "MVPs & prototypes", "Auth, database & payments", "Internal tools", "Rapid iteration"],
    tools: ["Lovable", "Supabase", "Stripe", "React", "Tailwind"],
  },
};

const CORE = [
  { k: "CORE", h: "UI / UX Design", p: "Interface design, flows, hierarchy and design systems that scale." },
  { k: "CORE", h: "Web Design", p: "Marketing sites and product surfaces with rhythm and restraint." },
  { k: "HTML · CSS · JS", h: "Front-end", p: "Hand-built, performant, accessible front-ends — including playful WebGL." },
  { k: "IDENTITY", h: "Branding", p: "Wordmarks, type systems and the visual language that ties it together." },
  { k: "INTERACTION", h: "Animation", p: "Motion that guides attention without ever showing off." },
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
  const [shown, setShown] = useState<string>(SKILL_ICONS[0].key);

  const open = (k: string) => {
    setShown(k);
    setActive(k);
  };
  const close = () => setActive(null);
  const d = DETAILS[shown];

  return (
    <KamrokLayout
      title="Skills & Services — Web Design, WordPress, Google, Claude & Lovable | KAMROK"
      description="Cormac's services: web design & animation, complete WordPress builds, Google Workspace/SEO/Webmaster, and AI builds with Claude and Lovable."
    >
      <Emblem />
      <div className="kk-eyebrow">INSTRUMENTS · 03</div>
      <h1>What I Do</h1>
      <Divider />
      <p className="kk-lead-text">
        Tap an icon to open its dossier — the same five you can knock off their pedestals out on the moon.
      </p>

      <SkillsShowcase active={active} onSelect={open} />

      <div className="kk-skillbtns">
        {SKILL_ICONS.map((ic) => (
          <button
            key={ic.key}
            className={`kk-skillbtn${active === ic.key ? " is-active" : ""}`}
            style={{ ["--accent" as string]: ic.color }}
            onClick={() => open(ic.key)}
          >
            <span className="kk-skillbtn__dot" />
            <span className="kk-skillbtn__name">{DETAILS[ic.key].name}</span>
            <span className="kk-skillbtn__k">{DETAILS[ic.key].kicker}</span>
          </button>
        ))}
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

      <Link className="kk-cta" to="/contact">WORK WITH ME →</Link>

      {/* per-skill flyout */}
      <div className={`kk-fly-backdrop${active ? " is-open" : ""}`} onClick={close} />
      <aside className={`kk-flyout${active ? " is-open" : ""}`} style={{ ["--accent" as string]: d.color }} aria-hidden={!active}>
        <button className="kk-flyout__x" onClick={close} aria-label="Close">✕</button>
        <div className="kk-flyout__k">{d.kicker}</div>
        <h2 className="kk-flyout__h">{d.name}</h2>
        <p className="kk-flyout__tag">{d.tagline}</p>
        <p className="kk-flyout__body">{d.body}</p>
        <div className="kk-flyout__label">SERVICES</div>
        <ul className="kk-flyout__list">
          {d.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="kk-flyout__label">TOOLS</div>
        <ul className="kk-tags">
          {d.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <Link className="kk-cta" to="/contact" onClick={close}>WORK WITH ME →</Link>
      </aside>
    </KamrokLayout>
  );
}
