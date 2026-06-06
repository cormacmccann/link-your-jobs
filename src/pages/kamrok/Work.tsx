import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const PROJECTS = [
  {
    n: "PROJECT 01",
    title: "Orbit — SaaS dashboard",
    body: "A data-dense analytics product rebuilt around clarity and rhythm. Re-thought the information hierarchy, introduced a proper design system, and cut time-to-insight for daily users.",
    meta: "UI/UX · DESIGN SYSTEM · FRONT-END",
    outcome: "Faster decisions, fewer support tickets, a UI the team can extend.",
  },
  {
    n: "PROJECT 02",
    title: "Lume — brand & site",
    body: "Identity and marketing site for a lighting studio. A warm, minimal system with considered motion that lets the product photography lead.",
    meta: "BRANDING · WEB DESIGN · MOTION",
    outcome: "A brand that finally matched the quality of the work.",
  },
  {
    n: "PROJECT 03",
    title: "Field — editorial",
    body: "A long-form reading experience with motion typography, built for speed and accessibility on every device — from flagship phones to old hardware on slow connections.",
    meta: "EDITORIAL · TYPOGRAPHY · FRONT-END",
    outcome: "Perfect Lighthouse scores without sacrificing the art direction.",
  },
  {
    n: "PROJECT 04",
    title: "KAMROK — interactive moonscape",
    body: "This very site. A real-time 3D portfolio you drive through — built with react-three-fiber, an isometric WebGL world, physics, and a full HUD, all streaming its assets from a CDN.",
    meta: "WEBGL · REACT-THREE-FIBER · INTERACTION",
    outcome: "Proof that immersive can still be fast and usable.",
  },
];

const CAPABILITIES = ["Web design", "Front-end build", "Design systems", "WordPress", "WebGL / 3D", "SEO & performance", "Brand & identity", "Motion"];

export default function Work() {
  return (
    <KamrokLayout
      title="Selected Work — Web Design & Front-end Projects | KAMROK"
      description="Selected web design and front-end work by Cormac — SaaS dashboards, brand sites, editorial experiences and real-time WebGL. Case studies in clarity, craft and motion."
    >
      <Emblem />
      <div className="kk-eyebrow">SELECTED WORK · 02</div>
      <h1>The Work</h1>
      <Divider />
      <p className="kk-lead-text">
        A few representative projects — across product UI, brand, editorial and real-time 3D. Each one
        designed and built end to end.
      </p>
      <div className="kk-work">
        {PROJECTS.map((p) => (
          <div className="kk-proj" key={p.n}>
            <div className="kk-n">{p.n}</div>
            <div>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <p style={{ color: "#6a5f4a", fontStyle: "italic" }}>{p.outcome}</p>
              <div className="kk-meta">{p.meta}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="kk-sub">What we bring to a project</h2>
      <ul className="kk-tags" style={{ justifyContent: "center", maxWidth: "60ch", margin: "0 auto" }}>
        {CAPABILITIES.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
    </KamrokLayout>
  );
}
