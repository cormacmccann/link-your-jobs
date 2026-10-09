import { ArrowUpRight, WandSparkles } from "lucide-react";
import { Link } from "@/lib/router-compat";
import "@/styles/project-quote-link.css";

export default function ProjectQuoteLink({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <section
      className={`project-quote-link${compact ? " project-quote-link--compact" : ""}`}
      aria-label="Get a working quote"
    >
      <span className="project-quote-icon" aria-hidden="true">
        <WandSparkles size={28} strokeWidth={1.5} />
      </span>
      <div className="project-quote-copy">
        <span className="kk-eyebrow">
          LET’S GIVE YOUR IDEA A STARTING POINT
        </span>
        <h2>
          {compact
            ? "Want a price to start with?"
            : "Your idea. Let’s make a plan."}
        </h2>
        <p>
          A few quick questions to shape your website, compare WordPress and
          Lovable, and explore what it could cost.
        </p>
      </div>
      <div className="project-quote-action">
        <Link className="orbit-button" to="/project-planner">
          Get a working quote <ArrowUpRight size={19} aria-hidden="true" />
        </Link>
        <small>No commitment. An estimate to discuss together.</small>
      </div>
    </section>
  );
}
