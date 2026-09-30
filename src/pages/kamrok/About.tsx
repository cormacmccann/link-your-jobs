import { Link } from "react-router-dom";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import cormacPhoto from "@/assets/team/cormac.png.asset.json";
import kaylaPhoto from "@/assets/team/kayla.png.asset.json";

const PRINCIPLES = [
  { h: "Clarity over decoration", p: "Every element earns its place. If it doesn't help the visitor, it goes." },
  { h: "Performance is a feature", p: "Fast is a design decision — Core Web Vitals budgeted from day one." },
  { h: "Accessible by default", p: "Semantics, contrast and keyboard paths are the baseline, not an upgrade." },
  { h: "Built to last", p: "Work that still looks considered, and runs clean, five years from now." },
];

const TEAM = [
  {
    id: "cormac", name: "Cormac McCann", role: "Founder · Design & development", photo: cormacPhoto.url,
    bio: "Cormac designs and builds our sites from first sketch to launch. His background in hospitality, sales and marketing brings a practical understanding of what a business needs from its website.",
  },
  {
    id: "kayla", name: "Kayla Minto", role: "Creative & client projects", photo: kaylaPhoto.url,
    bio: "A Creative Media graduate from DKIT, Kayla brings experience across sales, hardware and software. She keeps projects and clients moving, with a fresh creative eye on everything we make.",
  },
];

export default function About() {
  return (
    <KamrokLayout
      title="About KAMROK — Design Studio in Dundalk"
      description="Meet Cormac McCann and Kayla Minto, the small, hands-on team behind KAMROK. Design and development from Dundalk, Ireland."
    >
      <div className="kk-eyebrow">THE STUDIO</div>
      <h1>Small team.<br />Considered work.</h1>
      <p className="kk-lead-text">We’re KAMROK, the design studio of Candy Shop Digital Ltd. Based in Dundalk, Ireland, we bring brands, websites and digital products to life.</p>
      <div className="kk-body"><p>We work with you from the first conversation to launch. For bigger projects, we bring in a trusted circle of specialists — with the same care throughout.</p></div>
      <h2 className="kk-sub">The people behind it</h2>
      <div className="studio-team">
        {TEAM.map((member) => (
          <article key={member.id} id={member.id}>
            <img src={member.photo} alt={member.name} width="100" height="110" loading="lazy" />
            <h3>{member.name}</h3>
            <p className="studio-team-role">{member.role}</p>
            <p>{member.bio}</p>
          </article>
        ))}
      </div>
      <h2 className="kk-sub">How we approach the work</h2>
      <div className="studio-principles">
        {PRINCIPLES.map((principle) => <section key={principle.h}><h3>{principle.h}</h3><p>{principle.p}</p></section>)}
      </div>
      <h2 className="kk-sub">And the moon?</h2>
      <div className="kk-body"><p>A little room to play. Our explorable world brings together the design, code and interaction we love working on.</p></div>
      <Link className="kk-cta" to="/">Explore the moon ↗</Link>
    </KamrokLayout>
  );
}
