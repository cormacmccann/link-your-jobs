import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const PRINCIPLES = [
  { h: "Clarity over decoration", p: "Every element earns its place. If it doesn't help the visitor, it goes." },
  { h: "Performance is a feature", p: "Fast is a design decision. Core Web Vitals are budgeted from day one, not bolted on." },
  { h: "Accessible by default", p: "Semantics, contrast and keyboard paths are the baseline — not an upgrade." },
  { h: "Built to last", p: "Work that still looks considered, and still runs clean, five years from now." },
];

export default function About() {
  return (
    <KamrokLayout
      title="About KAMROK — Design Studio in Dundalk | Candy Shop Digital"
      description="KAMROK is the design studio of Candy Shop Digital Ltd, based in Dundalk, Ireland — crafting elegant, considered, fast and accessible websites and digital products."
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
          the brand and interface design, and the hand-built code that ships it. No hand-offs lost in
          translation, no template bloat. One person who's accountable for how it looks <em>and</em> how
          it performs.
        </p>

        <h2>APPROACH</h2>
        <p>
          Good design is mostly subtraction. We start from the content and the user's intent, then strip
          away everything that doesn't serve them — until what's left feels inevitable. Structure first,
          then surface; substance before polish.
        </p>

        <h2>WHAT WE VALUE</h2>
        {PRINCIPLES.map((pr) => (
          <p key={pr.h}>
            <strong>{pr.h}.</strong> {pr.p}
          </p>
        ))}

        <h2>WHY THE MOON?</h2>
        <p>
          The home page is a portfolio you can drive across. It's not a gimmick — it's the argument. It
          says, in one interaction, that this studio can build real-time 3D in the browser, make it run
          smoothly, and still keep it usable. A portfolio can be a place, not just a page.
        </p>

        <h2>DETAILS</h2>
        <p>
          Based in Dundalk · working with clients across Ireland, the UK and remotely · open to select
          projects. Trading as Candy Shop Digital Ltd.
        </p>

        <Link className="kk-cta" to="/work">VIEW SELECTED WORK →</Link>
      </div>
    </KamrokLayout>
  );
}
