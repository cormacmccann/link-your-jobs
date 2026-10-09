import { type CSSProperties } from "react";
import { Link, useParams } from "@/lib/router-compat";
import { FileText, Globe, LayoutGrid } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import "@/styles/case-study.css";
import { PROJECT_CASES as CASES } from "@/data/projects";

export default function CaseStudy() {
  const { slug } = useParams();
  const data =
    slug && Object.prototype.hasOwnProperty.call(CASES, slug)
      ? CASES[slug]
      : undefined;
  const next = data ? CASES[data.next] : undefined;

  return (
    <div
      className={`case-page${data?.presentation ? ` case-page--${data.presentation}` : ""}`}
      style={{ "--case-surface": data?.surface } as CSSProperties}
    >
      <div className="case-container">
        {data ? (
          <article>
            <header className="case-intro">
              <Link to="/work" className="case-back cinematic-action">
                <ActionFeedback icon={LayoutGrid} size={16} direction="left" />{" "}
                All projects
              </Link>
              <p className="case-category">{data.category}</p>
              <h1>{data.name}</h1>
              <div className="case-intro-bottom">
                <p className="case-deck">{data.intro}</p>
                {data.url && (
                  <a
                    className="case-visit cinematic-action"
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {slug === "old-carrick-mill"
                      ? "Client website"
                      : "Visit website"}{" "}
                    <ActionFeedback icon={Globe} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </header>

            <figure className="case-hero">
              <div className="case-image-surface">
                <img
                  src={data.hero.src}
                  alt={data.hero.alt}
                  width={data.hero.width}
                  height={data.hero.height}
                  loading="eager"
                />
              </div>
              <figcaption>{data.hero.caption}</figcaption>
            </figure>

            <section className="case-details" aria-labelledby="case-about">
              <div className="case-description">
                <h2 id="case-about">About the project</h2>
                {data.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl className="case-facts">
                <div>
                  <dt>What we did</dt>
                  <dd>
                    {data.services.map((service) => (
                      <span key={service}>{service}</span>
                    ))}
                  </dd>
                </div>
                {!!data.tools?.length && (
                  <div>
                    <dt>Tools & platforms</dt>
                    <dd>
                      {data.tools.map((tool) => (
                        <span key={tool}>{tool}</span>
                      ))}
                    </dd>
                  </div>
                )}
                {data.collection && (
                  <div>
                    <dt>Collection</dt>
                    <dd>
                      <Link to={`/work?collection=${data.collection}`}>
                        {data.collection === "platforms"
                          ? "Platforms & growth"
                          : "Identity & campaign"}
                      </Link>
                    </dd>
                  </div>
                )}
                {data.year && (
                  <div>
                    <dt>Year</dt>
                    <dd>{data.year}</dd>
                  </div>
                )}
              </dl>
            </section>

            {data.outcomes && (
              <section
                className="case-outcomes"
                aria-labelledby="case-outcomes-title"
              >
                <h2 id="case-outcomes-title">Project outcomes</h2>
                <dl>
                  {data.outcomes.map((outcome) => (
                    <div key={outcome.label}>
                      <dt>{outcome.label}</dt>
                      <dd>{outcome.value}</dd>
                    </div>
                  ))}
                </dl>
                <p>
                  {[
                    ...new Set(data.outcomes.map((outcome) => outcome.source)),
                  ].join(". ")}
                  .
                </p>
              </section>
            )}

            {!!data.designNotes?.length && (
              <section className="case-design-notes" aria-labelledby="case-design-title">
                <div className="case-gallery-heading">
                  <h2 id="case-design-title">One mark. Three stories.</h2>
                  <p>The thinking behind the identity.</p>
                </div>
                <div className="case-design-notes-grid">
                  {data.designNotes.map((note, index) => (
                    <article key={note.title}>
                      <span className="case-design-number" aria-hidden="true">0{index + 1}</span>
                      <h3 lang="ga">{note.title}</h3>
                      <span className="case-design-subtitle">{note.subtitle}</span>
                      <p>{note.text}</p>
                      <details>
                        <summary lang="ga">Léigh as Gaeilge <span aria-hidden="true">+</span></summary>
                        <p lang="ga">{note.irish}</p>
                      </details>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {!!data.films?.length && (
              <section className="case-films" aria-labelledby="case-films-title">
                <div className="case-gallery-heading">
                  <h2 id="case-films-title">The identity in motion</h2>
                  <p>Press play to see the mark come to life.</p>
                </div>
                {data.films.map((film) => (
                  <figure key={film.src}>
                    <video controls playsInline preload="none" poster={film.poster} aria-label={film.caption}>
                      <source src={film.src} type="video/mp4" />
                      <a href={film.src}>Watch {film.caption}</a>
                    </video>
                    <figcaption>{film.caption}</figcaption>
                  </figure>
                ))}
              </section>
            )}

            {!!data.gallery?.length && (
              <section
                className="case-gallery-section"
                aria-labelledby="case-gallery-title"
              >
                <div className="case-gallery-heading">
                  <h2 id="case-gallery-title">A closer look</h2>
                  <p>
                    Explore the details. Open any image to view it at full size.
                  </p>
                </div>
                <div
                  className={`case-gallery${data.gallery.length === 1 ? " case-gallery--single" : ""}${data.gallery.length === 2 ? " case-gallery--pair" : ""}`}
                >
                  {data.gallery.map((shot) => (
                    <figure key={shot.src}>
                      <a
                        className="case-image-surface case-image-link"
                        href={shot.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open image: ${shot.caption} (opens in a new tab)`}
                      >
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          width={shot.width}
                          height={shot.height}
                          loading="lazy"
                          decoding="async"
                        />
                      </a>
                      <figcaption>{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            )}

            {next && (
              <nav className="case-next" aria-label="Next project">
                <Link className="action-trigger" to={`/work/${data.next}`}>
                  <div>
                    <span className="case-label">Next project</span>
                    <h2>{next.name}</h2>
                    <span className="case-next-category">{next.category}</span>
                  </div>
                  <div
                    className="case-next-image"
                    style={{ backgroundColor: next.surface }}
                  >
                    <img src={next.hero.src} alt="" loading="lazy" style={next.presentation === "identity" || next.hero.fit === "contain" ? { objectFit: "contain" } : undefined} />
                  </div>
                  <span className="case-next-arrow cinematic-action">
                    <ActionFeedback
                      icon={FileText}
                      size={26}
                      direction="right"
                    />
                  </span>
                </Link>
              </nav>
            )}
          </article>
        ) : (
          <section className="case-empty">
            <h1>Project not found.</h1>
            <p>There’s plenty more to see.</p>
            <Link className="case-visit cinematic-action" to="/work">
              View all projects{" "}
              <ActionFeedback icon={LayoutGrid} direction="right" />
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}
