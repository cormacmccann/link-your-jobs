import { Link } from "react-router-dom";
import { Lightbulb, FileText } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import KamrokLayout from "@/components/kamrok/KamrokLayout";

const NOTES = [
  {
    date: "OCT 2026",
    title: "How to get found on Google in Dundalk (I only copped this myself)",
    body: "I build websites for a living and I still only fixed my own Google listing a couple of weeks ago. Referrals have been kind to me, but that's luck, not a plan. Here's the step-by-step guide I wish someone had handed me — Google Business Profile, reviews, local keywords, the lot.",
    to: "/blog/dundalk-seo-guide",
  },
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
      <div className="kk-eyebrow">FROM THE STUDIO</div>
      <h1>Field notes.</h1>
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
              <Link className="kk-visit kk-visit--solid cinematic-action" to={n.to}>
                {n.to.startsWith("/work/") ? "Read the case study" : "Read the guide"} <ActionFeedback icon={FileText} />
              </Link>
            )}
          </article>
        ))}
      </div>

      <Link className="kk-cta cinematic-action" to="/contact">Start a project <ActionFeedback icon={Lightbulb} /></Link>
    </KamrokLayout>
  );
}
