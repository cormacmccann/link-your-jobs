import { type CSSProperties } from "react";
import { Link, useParams } from "@/lib/router-compat";
import { ArrowUpRight, FileText, Globe, LayoutGrid } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import CaseImageGallery from "@/components/kamrok/CaseImageGallery";
import ProcessCaseStudy from "@/components/kamrok/ProcessCaseStudy";
import { PROJECT_CASES as CASES, PORTFOLIO_PROJECTS } from "@/data/projects";
import "@/styles/case-study.css";

export default function CaseStudy() {
  const { slug } = useParams();
  const data =
    slug && Object.prototype.hasOwnProperty.call(CASES, slug)
      ? CASES[slug]
      : undefined;
  const next = data ? CASES[data.next] : undefined;
  const related = data
    ? PORTFOLIO_PROJECTS.filter((project) => project.slug !== slug)
        .sort(
          (a, b) =>
            Number(b.collection === data.collection) -
            Number(a.collection === data.collection),
        )
        .slice(0, 3)
    : [];
  const websiteHero =
    data?.presentation !== "identity" && data?.hero.fit !== "contain";
  const images = data
    ? data.gallery?.length
      ? websiteHero
        ? [data.hero, ...data.gallery]
        : data.gallery
      : [data.hero]
    : [];

  return (
    <div
      className={`case-page case-page--editorial${data?.chapters ? " case-page--process" : ""}${data?.presentation ? ` case-page--${data.presentation}` : ""}`}
      style={{ "--case-surface": data?.surface } as CSSProperties}
    >
      <div className="case-container">
        {data ? (
          <article>
            <div className="case-topline">
              <Link to="/work" className="case-back cinematic-action">
                <ActionFeedback icon={LayoutGrid} size={16} direction="left" />{" "}
                All projects
              </Link>
              <span>{data.category}</span>
            </div>
            {data.chapters ? (
              <ProcessCaseStudy data={data} />
            ) : (
              <>
                {!!data.gallery?.length && (
                  <figure
                    className={`case-hero${websiteHero ? " case-hero--website" : ""}`}
                  >
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
                )}
                <div className="case-editorial">
                  <div className="case-visual-story">
                    <CaseImageGallery
                      key={slug}
                      images={images}
                      name={data.name}
                      groupByKind={!!data.groupGallery}
                    />
                    {!!data.designNotes?.length && (
                      <section
                        className="case-design-notes"
                        aria-labelledby="case-design-title"
                      >
                        <div className="case-gallery-heading">
                          <h2 id="case-design-title">
                            One mark. Three stories.
                          </h2>
                          <p>The thinking behind the identity.</p>
                        </div>
                        <div className="case-design-notes-grid">
                          {data.designNotes.map((note, index) => (
                            <article key={note.title}>
                              <span
                                className="case-design-number"
                                aria-hidden="true"
                              >
                                0{index + 1}
                              </span>
                              <h3 lang="ga">{note.title}</h3>
                              <span className="case-design-subtitle">
                                {note.subtitle}
                              </span>
                              <p>{note.text}</p>
                              <details>
                                <summary lang="ga">
                                  Léigh as Gaeilge{" "}
                                  <span aria-hidden="true">+</span>
                                </summary>
                                <p lang="ga">{note.irish}</p>
                              </details>
                            </article>
                          ))}
                        </div>
                      </section>
                    )}

                    {!!data.films?.length && (
                      <section
                        className="case-films"
                        aria-labelledby="case-films-title"
                      >
                        <div className="case-gallery-heading">
                          <h2 id="case-films-title">The identity in motion</h2>
                          <p>Press play to see the mark come to life.</p>
                        </div>
                        {data.films.map((film) => (
                          <figure key={film.src}>
                            <video
                              controls
                              playsInline
                              preload="none"
                              poster={film.poster}
                              aria-label={film.caption}
                            >
                              <source src={film.src} type="video/mp4" />
                              <a href={film.src}>Watch {film.caption}</a>
                            </video>
                            <figcaption>{film.caption}</figcaption>
                          </figure>
                        ))}
                      </section>
                    )}

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
                            ...new Set(
                              data.outcomes.map((outcome) => outcome.source),
                            ),
                          ].join(". ")}
                          .
                        </p>
                      </section>
                    )}
                  </div>
                  <aside
                    className="case-project-story"
                    aria-label="Project story and details"
                  >
                    <header className="case-intro">
                      <p className="case-category">{data.category}</p>
                      <h1>{data.name}</h1>
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
                            : "Visit website"}
                          <ActionFeedback icon={Globe} size={16} />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </header>
                    <dl className="case-facts">
                      <div>
                        <dt>Client / project</dt>
                        <dd>{data.name}</dd>
                      </div>
                      {data.agency && (
                        <div>
                          <dt>Agency</dt>
                          <dd>{data.agency}</dd>
                        </div>
                      )}
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
                          <dd>{data.tools.join(" · ")}</dd>
                        </div>
                      )}
                      {data.year && (
                        <div>
                          <dt>Year</dt>
                          <dd>{data.year}</dd>
                        </div>
                      )}
                      {data.collection && (
                        <div>
                          <dt>Collection</dt>
                          <dd>
                            <Link
                              to={`/work?view=gallery&gallery=${data.collection === "platforms" ? "websites" : "designs"}`}
                            >
                              {data.collection === "platforms"
                                ? "Websites & apps"
                                : "Brands & design"}{" "}
                              <ArrowUpRight size={13} aria-hidden="true" />
                            </Link>
                          </dd>
                        </div>
                      )}
                    </dl>
                    {!!data.description.length && (
                      <section
                        className="case-description"
                        aria-labelledby="case-about"
                      >
                        <h2 id="case-about">The project</h2>
                        {data.description.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </section>
                    )}
                    {!!data.story?.length && (
                      <section
                        className="case-description case-brand-story"
                        aria-labelledby="case-story-title"
                      >
                        <h2 id="case-story-title">
                          The story behind the identity
                        </h2>
                        {data.story.map((chapter) => (
                          <div key={chapter.title}>
                            <h3>{chapter.title}</h3>
                            <p>{chapter.text}</p>
                          </div>
                        ))}
                      </section>
                    )}
                    <Link className="case-story-contact" to="/contact">
                      Have something in mind?{" "}
                      <span>
                        Let’s talk <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    </Link>
                  </aside>
                </div>
              </>
            )}
            <section
              className="case-related"
              aria-labelledby="case-related-heading"
            >
              <div className="case-gallery-heading">
                <div>
                  <span className="case-label">KEEP EXPLORING</span>
                  <h2 id="case-related-heading">
                    More projects. More possibilities.
                  </h2>
                </div>
                <Link to="/work">
                  The full portfolio{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="case-related-grid">
                {related.map((project) => (
                  <Link
                    to={`/work/${project.slug}`}
                    className="case-related-project"
                    key={project.slug}
                  >
                    <div style={{ backgroundColor: project.surface }}>
                      <img
                        src={project.hero.src}
                        alt={project.hero.alt}
                        width={project.hero.width}
                        height={project.hero.height}
                        loading="lazy"
                        style={
                          project.presentation === "identity" ||
                          project.hero.fit === "contain"
                            ? { objectFit: "contain" }
                            : undefined
                        }
                      />
                    </div>
                    <h3>
                      {project.name}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </h3>
                    <p>{project.category}</p>
                  </Link>
                ))}
              </div>
            </section>
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
                    <img
                      src={next.hero.src}
                      alt=""
                      loading="lazy"
                      style={
                        next.presentation === "identity" ||
                        next.hero.fit === "contain"
                          ? { objectFit: "contain" }
                          : undefined
                      }
                    />
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
