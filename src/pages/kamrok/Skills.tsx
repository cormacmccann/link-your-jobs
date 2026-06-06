import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const SKILLS = [
  { k: "CORE", h: "UI / UX Design", p: "Interface design, flows, hierarchy and design systems that scale." },
  { k: "CORE", h: "Web Design", p: "Marketing sites and product surfaces with rhythm and restraint." },
  { k: "HTML · CSS · JS", h: "Front-end", p: "Hand-built, performant, accessible front-ends — including playful WebGL." },
  { k: "IDENTITY", h: "Branding", p: "Wordmarks, type systems and the visual language that ties it together." },
  { k: "INTERACTION", h: "Motion", p: "Micro-interactions that guide attention without showing off." },
  { k: "FIGMA · CODE", h: "Prototyping", p: "From clickable flows to coded prototypes that feel like the real thing." },
];

export default function Skills() {
  return (
    <KamrokLayout
      title="Skills & Services — UI, Web Design, Front-end | KAMROK"
      description="Cormac's skills and services: UI/UX design, web design, front-end development, branding, motion and prototyping. Elegant interfaces, built well."
    >
      <Emblem />
      <div className="kk-eyebrow">INSTRUMENTS · 03</div>
      <h1>What I Do</h1>
      <Divider />
      <p className="kk-lead-text">A full-stack design toolkit — from first concept to shipped, accessible front-end.</p>
      <div className="kk-grid">
        {SKILLS.map((s) => (
          <section key={s.h}>
            <div className="kk-k">{s.k}</div>
            <h2>{s.h}</h2>
            <p>{s.p}</p>
          </section>
        ))}
      </div>
      <Link className="kk-cta" to="/contact">WORK WITH ME →</Link>
    </KamrokLayout>
  );
}
