import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const NOTES = [
  {
    date: "JUN 2026",
    title: "Why we built a moon",
    body: "Most portfolios are a grid of screenshots and a contact form. Ours is a place you drive through. We think the work should feel like the thing it's selling — so we built a moon, put a buggy on it, and hid our projects out in the dark. If a portfolio can be an experience, it should be.",
  },
  {
    date: "MAY 2026",
    title: "Brand is Lovable, motion is Claude",
    body: "People ask how a small team ships this much. Honestly? We pair with the best tools going. Brand and UX we shape in Lovable; motion and interaction we build with Claude. The taste is ours — the leverage is theirs. That's the whole trick, and we're not precious about saying so.",
  },
  {
    date: "APR 2026",
    title: "Clubrovia: shipping our own product",
    body: "We don't only build for clients — we build for ourselves too. Clubrovia is our club operating system: registration, finances, fundraising and a generated website, multi-tenant across many clubs. Owning a product keeps us honest about what 'done' really means.",
    to: "/work/clubrovia",
  },
];

export default function Blog() {
  return (
    <KamrokLayout
      title="Field Notes — KAMROK"
      description="Short notes from the KAMROK studio — what we're building, what we're learning, and the occasional opinion."
    >
      <Emblem />
      <div className="kk-eyebrow">FIELD NOTES · THE LOG</div>
      <h1>The Log</h1>
      <Divider />
      <p className="kk-lead-text">
        Short notes from the studio — what we're building, what we're learning, and the occasional
        opinion. New entries as they happen.
      </p>

      <div className="kk-notes">
        {NOTES.map((n) => (
          <article className="kk-note" key={n.title}>
            <div className="kk-note__date">{n.date}</div>
            <h2>{n.title}</h2>
            <p>{n.body}</p>
            {n.to && (
              <Link className="kk-visit kk-visit--solid" to={n.to}>
                READ THE CASE STUDY →
              </Link>
            )}
          </article>
        ))}
      </div>

      <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
    </KamrokLayout>
  );
}
