import "@/styles/brand-stories.css";
import { Link } from "@/lib/router-compat";
import { Orbit } from "lucide-react";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";
import KamrokLayout from "@/components/kamrok/KamrokLayout";

const PRINCIPLES = [
  { h: "Clarity over decoration", p: "Every element earns its place. If it doesn't help the visitor, it goes." },
  { h: "Performance is a feature", p: "Fast is a design decision — Core Web Vitals budgeted from day one." },
  { h: "Accessible by default", p: "Semantics, contrast and keyboard paths are the baseline, not an upgrade." },
  { h: "Built to last", p: "Work that still looks considered, and runs clean, five years from now." },
];

const TEAM = [
  {
    id: "cormac", name: "Cormac McCann", role: "Founder · Design & development",
    bio: "Cormac designs and builds our sites from first sketch to launch. His background in hospitality, sales and marketing brings a practical understanding of what a business needs from its website.",
  },
  {
    id: "kayla", name: "Kayla Minto", role: "Creative & client projects",
    bio: "A Creative Media graduate from DKIT, Kayla brings experience across sales, hardware and software. She keeps projects and clients moving, with a fresh creative eye on everything we make.",
  },
];

export default function About() {
  const { theme } = useStudioTheme();
  return (
    <KamrokLayout
      title="About KAMROK — Design Studio in Dundalk"
      description="Meet Cormac McCann and Kayla Minto, the small, hands-on team behind KAMROK. Design and development from Dundalk, Ireland."
    >
      <div className="studio-about-intro"><div><div className="kk-eyebrow">THE STUDIO</div>
      <h1>A curious mind.<br />A changing world.</h1>
      <p className="kk-lead-text">I’m Cormac: designer, illustrator, marketer and the curious mind behind KAMROK. A certified Lovable expert and award-winning WordPress designer, I love finding what new technology makes possible — then making something useful, distinctive and full of personality.</p>
      </div><figure className="orbit-profile orbit-profile--studio"><img src={`/people/cormac-mccann-${theme}.webp`} alt="Cormac McCann in an astronaut helmet, lit in ruby and cyan" width="720" height="956" decoding="async" /><figcaption><strong>Cormac McCann</strong><span>Designer. Illustrator. Marketer.</span></figcaption></figure></div>
      <div className="kk-body"><p>Based in Dundalk, Ireland, we work directly with you from first conversation to launch. KAMROK is part of Candy Shop Digital Ltd, with a small team and a trusted circle of specialists for bigger projects.</p></div>
      <div className="orbit-about-cert"><a className="orbit-lovable-link" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" aria-label="Explore Lovable — affiliate link"><img src="/certifications/lovable-certified-full-on-dark.svg" alt="Lovable certified" width="522" height="176" /></a><div><span className="orbit-eyebrow">RECOGNISED FOR THE WORK</span><p>Best Use of Internet Technology<br /><small>Business Awards</small></p></div></div>
      <h2 className="kk-sub">The people behind it</h2>
      <div className="studio-team">
        {TEAM.map((member) => (
          <article key={member.id} id={member.id}>
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
      <section className="brand-world" aria-labelledby="brand-world-title"><div className="brand-world-heading"><h2 id="brand-world-title">A curious studio.<br />A world of its own.</h2><p>The chimp, the moon and a little space to imagine. KAMROK’s visual world carries the same curiosity we bring to the work: familiar ideas, unexpected directions and plenty of character.</p></div><div className="brand-world-images"><figure><img src="/art/brand/chimp-moon.webp" alt="KAMROK’s astronaut chimp exploring a moon landscape with Earth on the horizon" loading="lazy" width="1672" height="941" /><figcaption>ROOM TO EXPLORE.</figcaption></figure><figure><img src="/art/brand/chimp-cockpit.webp" alt="KAMROK’s chimp astronaut looking towards Earth from a spacecraft" loading="lazy" width="1672" height="941" /><figcaption>A DIFFERENT PERSPECTIVE.</figcaption></figure></div></section>
      <h2 className="kk-sub">And the moon?</h2>
      <div className="kk-body"><p>A little room to play. Our explorable world brings together the design, code and interaction we love working on.</p></div>
      <Link className="kk-cta cinematic-action" to="/fun">Explore the moon <ActionFeedback icon={Orbit} /></Link>
    </KamrokLayout>
  );
}
