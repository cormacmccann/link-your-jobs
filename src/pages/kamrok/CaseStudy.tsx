import { useEffect, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { FileText, Globe, LayoutGrid } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import "@/styles/case-study.css";
import { PROJECT_CASES as CASES } from "@/data/projects";


export default function CaseStudy() {
  const { slug } = useParams();
  const data = slug && Object.prototype.hasOwnProperty.call(CASES, slug) ? CASES[slug] : undefined;
  const next = data ? CASES[data.next] : undefined;

  useEffect(() => {
    document.title = data ? `${data.name} — Case Study | KAMROK` : "Project not found | KAMROK";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", data ? `${data.name}. ${data.description[0]} A project by KAMROK.` : "Explore selected projects by KAMROK.");
  }, [data]);

  return (
    <div className={`case-page${data?.presentation === "screens" ? " case-page--screens" : ""}`} style={{ "--case-surface": data?.surface } as CSSProperties}>
      <div className="case-container">
        {data ? (
          <article>
            <header className="case-intro">
              <Link to="/work" className="case-back cinematic-action"><ActionFeedback icon={LayoutGrid} size={16} direction="left" /> All projects</Link>
              <p className="case-category">{data.category}</p>
              <h1>{data.name}</h1>
              <div className="case-intro-bottom">
                <p className="case-deck">{data.intro}</p>
                {data.url && <a className="case-visit cinematic-action" href={data.url} target="_blank" rel="noopener noreferrer">
                  Visit website <ActionFeedback icon={Globe} /><span className="sr-only"> (opens in a new tab)</span>
                </a>}
              </div>
            </header>

            <figure className="case-hero">
              <div className="case-image-surface"><img src={data.hero.src} alt={data.hero.alt} loading="eager" /></div>
              <figcaption>{data.hero.caption}</figcaption>
            </figure>

            <section className="case-details" aria-labelledby="case-about">
              <div className="case-description">
                <h2 id="case-about">About the project</h2>
                {data.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <dl className="case-facts">
                <div><dt>What we did</dt><dd>{data.services.map((service) => <span key={service}>{service}</span>)}</dd></div>
                {data.year && <div><dt>Year</dt><dd>{data.year}</dd></div>}
              </dl>
            </section>

            {data.outcomes && <section className="case-outcomes" aria-labelledby="case-outcomes-title">
              <h2 id="case-outcomes-title">Project outcomes</h2>
              <dl>{data.outcomes.map(outcome => <div key={outcome.label}><dt>{outcome.label}</dt><dd>{outcome.value}</dd></div>)}</dl>
              <p>{[...new Set(data.outcomes.map(outcome => outcome.source))].join(". ")}.</p>
            </section>}

            {data.gallery && (
              <div className={`case-gallery${data.gallery.length === 1 ? " case-gallery--single" : ""}`}>
                {data.gallery.map((shot) => (
                  <figure key={shot.src}>
                    <div className="case-image-surface"><img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" /></div>
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {next && (
              <nav className="case-next" aria-label="Next project">
                <Link className="action-trigger" to={`/work/${data.next}`}>
                  <div><span className="case-label">Next project</span><h2>{next.name}</h2><span className="case-next-category">{next.category}</span></div>
                  <div className="case-next-image" style={{ backgroundColor: next.surface }}><img src={next.hero.src} alt="" loading="lazy" /></div>
                  <span className="case-next-arrow cinematic-action"><ActionFeedback icon={FileText} size={26} direction="right" /></span>
                </Link>
              </nav>
            )}
          </article>
        ) : (
          <section className="case-empty"><h1>Project not found.</h1><p>There’s plenty more to see.</p><Link className="case-visit cinematic-action" to="/work">View all projects <ActionFeedback icon={LayoutGrid} direction="right" /></Link></section>
        )}
      </div>
    </div>
  );
}
