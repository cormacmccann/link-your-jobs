import { Link } from "@/lib/router-compat";
import { Lightbulb, FileText } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import ResponsiveImage from "@/components/kamrok/ResponsiveImage";
import { ownershipImages } from "@/assets/blog/website-ownership/images";
import "@/styles/blog-notes.css";
import KamrokLayout from "@/components/kamrok/KamrokLayout";

const NOTES = [
  {
    date: "22 OCT 2026",
    title: "Your website. Your business. Your keys.",
    body: "Buy your own domain, understand your hosting and keep control of your website or app. My take on ownership, fair payment, useful feedback and a proper handover — with examples, a cost calculator and questions to copy.",
    to: "/blog/own-your-website",
  },
  {
    date: "OCT 2026",
    title: "How to get found on Google in Dundalk",
    body: "Six practical steps to help nearby customers find your business. Follow the click paths, see real examples, adapt a review-request message and work through the local search checklist.",
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
      description="Practical guides and notes from the KAMROK studio — websites, ownership, design and the work behind them."
    >
      <div className="kk-eyebrow">FROM THE STUDIO</div>
      <h1>Field notes.</h1>
      <p className="kk-lead-text">
        Practical guides, studio notes and a few opinions from experience. The
        design, the build and the things worth knowing before you begin.
      </p>

      <div className="kk-notes">
        {NOTES.map((n) => (
          <article
            className={`kk-note${n.to === "/blog/own-your-website" ? " kk-note--illustrated" : ""}`}
            key={n.title}
          >
            {n.to === "/blog/own-your-website" && (
              <Link
                className="blog-note-art"
                to={n.to}
                aria-label="Read Your website. Your business. Your keys."
              >
                <ResponsiveImage
                  variants={ownershipImages.keys}
                  mobileMax={480}
                  sizes="(max-width: 760px) 92vw, 35vw"
                  width={1536}
                  height={1024}
                  loading="lazy"
                  decoding="async"
                  alt="The KAMROK astronaut chimp holding a silver key beside floating website panels"
                />
              </Link>
            )}
            <div>
              <div className="kk-note__date">{n.date}</div>
              <h2>{n.title}</h2>
              <p>{n.body}</p>
              {n.to && (
                <Link
                  className="kk-visit kk-visit--solid cinematic-action"
                  to={n.to}
                >
                  {n.to.startsWith("/work/")
                    ? "Read the case study"
                    : "Read the guide"}{" "}
                  <ActionFeedback icon={FileText} />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>

      <Link className="kk-cta cinematic-action" to="/contact">
        Start a project <ActionFeedback icon={Lightbulb} />
      </Link>
    </KamrokLayout>
  );
}
