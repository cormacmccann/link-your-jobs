import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

export default function About() {
  return (
    <KamrokLayout
      title="About KAMROK — Design Studio in Dundalk | Candy Shop Digital"
      description="KAMROK is the design studio of Candy Shop Digital Ltd, based in Dundalk, Ireland — crafting elegant, considered websites and digital products."
    >
      <Emblem />
      <div className="kk-eyebrow">THE STUDIO · 01</div>
      <h1>KAMROK</h1>
      <Divider />
      <div className="kk-body">
        <p className="kk-lead">
          KAMROK is the design studio of Candy Shop Digital Ltd — a small team based in Dundalk, Ireland, crafting elegant, considered digital products.
        </p>
        <h2>APPROACH</h2>
        <p>Good design is mostly subtraction. We start from the content and the user's intent, then strip away everything that doesn't serve them — until what's left feels inevitable.</p>
        <h2>WHAT WE VALUE</h2>
        <p>Clarity over decoration. Performance as a feature. Accessibility as a baseline. And work that still looks considered five years from now. The interactive moonscape on the home page is proof a portfolio can be a place, not just a page.</p>
        <Link className="kk-cta" to="/work">VIEW SELECTED WORK →</Link>
      </div>
    </KamrokLayout>
  );
}
