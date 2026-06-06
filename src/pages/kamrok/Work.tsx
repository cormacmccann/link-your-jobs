import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const PROJECTS = [
  { n: "PROJECT 01", title: "Orbit — SaaS dashboard", body: "A data-dense analytics product rebuilt around clarity and rhythm. Re-thought the hierarchy and cut time-to-insight for daily users.", meta: "UI/UX · DESIGN SYSTEM · FRONT-END" },
  { n: "PROJECT 02", title: "Lume — brand & site", body: "Identity and marketing site for a lighting studio. A warm, minimal system with considered motion.", meta: "BRANDING · WEB DESIGN · MOTION" },
  { n: "PROJECT 03", title: "Field — editorial", body: "A long-form reading experience with motion typography, built for speed and accessibility on every device.", meta: "EDITORIAL · TYPOGRAPHY · FRONT-END" },
];

export default function Work() {
  return (
    <KamrokLayout
      title="Selected Work — Web Design Projects | KAMROK"
      description="Selected web design and front-end work by Cormac — SaaS dashboards, brand sites and editorial experiences. Case studies in clarity, craft and motion."
    >
      <Emblem />
      <div className="kk-eyebrow">SELECTED WORK · 02</div>
      <h1>The Work</h1>
      <Divider />
      <div className="kk-work">
        {PROJECTS.map((p) => (
          <div className="kk-proj" key={p.n}>
            <div className="kk-n">{p.n}</div>
            <div>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <div className="kk-meta">{p.meta}</div>
            </div>
          </div>
        ))}
        <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
      </div>
    </KamrokLayout>
  );
}
