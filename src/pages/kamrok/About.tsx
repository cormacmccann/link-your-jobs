import { useState } from "react";
import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const PRINCIPLES = [
  { h: "Clarity over decoration", p: "Every element earns its place. If it doesn't help the visitor, it goes." },
  { h: "Performance is a feature", p: "Fast is a design decision. Core Web Vitals are budgeted from day one, not bolted on." },
  { h: "Accessible by default", p: "Semantics, contrast and keyboard paths are the baseline — not an upgrade." },
  { h: "Built to last", p: "Work that still looks considered, and still runs clean, five years from now." },
];

type Member = {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  based: string;
  craft: string;
  bio: string;
  does: string[];
};

const TEAM: Member[] = [
  {
    id: "cormac", name: "Cormac McCann", role: "Founder · Design + Build", initials: "CM", color: "#8b7dff",
    based: "Dundalk, IE", craft: "Web Design & Front-end",
    bio: "Cormac is the studio. He designs the brand and the interface, then builds the hand-coded, fast, accessible front-end himself — no hand-offs lost in translation. The moon you just drove across is his.",
    does: ["Web & UI design", "React front-ends", "Real-time 3D / WebGL", "Brand systems", "WordPress builds"],
  },
  {
    id: "brand", name: "The Brand Hand", role: "Brand & Identity", initials: "BH", color: "#4ea8ff",
    based: "Remote, IE", craft: "Logos & Visual Systems",
    bio: "Wordmarks, type systems and the visual language that ties a project together. When a build needs an identity with real backbone, this is where it starts — marks that work at a favicon and a billboard alike.",
    does: ["Logos & wordmarks", "Type systems", "Brand guidelines", "Art direction"],
  },
  {
    id: "motion", name: "The Motion Smith", role: "Motion & 3D", initials: "MS", color: "#7be7ff",
    based: "Remote, EU", craft: "Animation & WebGL",
    bio: "Brings interfaces to life — scroll-driven stories, micro-interactions and the occasional moonscape. Motion that guides the eye and never shows off, always with a budget for performance and reduced-motion.",
    does: ["Framer Motion / GSAP", "WebGL & shaders", "3D modelling", "Interaction design"],
  },
  {
    id: "build", name: "The Back-end", role: "WordPress & Systems", initials: "WB", color: "#c4a3ff",
    based: "Remote, IE", craft: "CMS & Integrations",
    bio: "The plumbing that keeps it standing: complete WordPress builds, databases, payments, automations and the boring-but-vital security and speed work. Sites clients can actually run, that don't fall over.",
    does: ["WordPress & ACF", "Databases & APIs", "Payments & auth", "Hosting & security"],
  },
];

export default function About() {
  const [openId, setOpenId] = useState<string | null>(null);
  const member = TEAM.find((m) => m.id === openId) || null;

  return (
    <KamrokLayout
      title="About KAMROK — Design Studio & Team in Dundalk | Candy Shop Digital"
      description="KAMROK is the design studio of Candy Shop Digital Ltd in Dundalk — Cormac plus a small circle of specialists in brand, motion, 3D and WordPress. Meet the team."
    >
      <Emblem />
      <div className="kk-eyebrow">THE STUDIO · 01</div>
      <h1>KAMROK</h1>
      <Divider />
      <div className="kk-body">
        <p className="kk-lead">
          KAMROK is the design studio of Candy Shop Digital Ltd — a small, hands-on practice based in
          Dundalk, Ireland, crafting elegant, considered digital products for ambitious people.
        </p>
        <p>
          It's run by Cormac — a web designer and front-end developer who does both halves of the job:
          the brand and interface design, and the hand-built code that ships it. For bigger jobs he pulls
          in a trusted circle of specialists. Same standard, more hands.
        </p>

        <h2>APPROACH</h2>
        <p>
          Good design is mostly subtraction. We start from the content and the user's intent, then strip
          away everything that doesn't serve them — until what's left feels inevitable.
        </p>

        <h2>WHAT WE VALUE</h2>
        {PRINCIPLES.map((pr) => (
          <p key={pr.h}>
            <strong>{pr.h}.</strong> {pr.p}
          </p>
        ))}

        <h2>WHY THE MOON?</h2>
        <p>
          The home page is a portfolio you can drive across. It's the argument, in one interaction: this
          studio can build real-time 3D in the browser, make it run smoothly, and still keep it usable.
        </p>
      </div>

      <h2 className="kk-sub">The Team — open a dossier</h2>
      <p className="kk-lead-text">One studio, a small circle of specialists. Tap a card for the full breakdown.</p>
      <div className="kk-team">
        {TEAM.map((m) => (
          <button
            key={m.id}
            className="kk-team-card"
            style={{ ["--accent" as string]: m.color }}
            onClick={() => setOpenId(m.id)}
          >
            <span className="kk-team-av" aria-hidden>{m.initials}</span>
            <span className="kk-team-name">{m.name}</span>
            <span className="kk-team-role">{m.role}</span>
            <span className="kk-team-open">VIEW DOSSIER →</span>
          </button>
        ))}
      </div>

      <Link className="kk-cta" to="/work">VIEW SELECTED WORK →</Link>

      {/* codex profile */}
      {member && (
        <div className="kk-codex-backdrop" onClick={() => setOpenId(null)}>
          <article
            className="kk-codex"
            style={{ ["--accent" as string]: member.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="kk-codex-x" onClick={() => setOpenId(null)} aria-label="Close">✕</button>
            <div className="kk-codex-portrait"><span>{member.initials}</span></div>
            <div className="kk-codex-sigil">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity=".4" />
                <path d="M22 9 a11 11 0 1 0 0 22 a8.5 8.5 0 1 1 0 -22 z" fill="currentColor" fillOpacity=".85" />
              </svg>
            </div>
            <h2 className="kk-codex-name">{member.name}</h2>
            <div className="kk-codex-stats">
              <div><span>ROLE</span><b>{member.role}</b></div>
              <div><span>BASED</span><b>{member.based}</b></div>
              <div><span>CRAFT</span><b>{member.craft}</b></div>
            </div>
            <div className="kk-codex-rule" />
            <p className="kk-codex-bio">{member.bio}</p>
            <div className="kk-codex-label">DISCIPLINES</div>
            <ul className="kk-tags">
              {member.does.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <Link className="kk-cta" to="/contact" onClick={() => setOpenId(null)}>WORK WITH US →</Link>
          </article>
        </div>
      )}
    </KamrokLayout>
  );
}
