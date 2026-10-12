import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "@/lib/router-compat";
import {
  getProjectCover,
  PORTFOLIO_PROJECTS,
  type PortfolioProject,
} from "@/data/projects";
import { ILLUSTRATIONS } from "@/data/illustrations";
import Illustrations from "@/pages/kamrok/Illustrations";

const websites = PORTFOLIO_PROJECTS.filter((project) =>
  project.categories.some((category) =>
    ["websites", "apps", "commerce"].includes(category),
  ),
);
const designs = PORTFOLIO_PROJECTS.filter((project) =>
  project.categories.some((category) =>
    ["branding", "print"].includes(category),
  ),
);
type DigitalFilter = {
  id: string;
  label: string;
  match: (project: PortfolioProject) => boolean;
};
const digitalFilters = (
  [
    { id: "all", label: "All websites & apps", match: () => true },
    {
      id: "websites",
      label: "Websites",
      match: (project) => project.categories.includes("websites"),
    },
    {
      id: "apps",
      label: "Web apps",
      match: (project) => project.categories.includes("apps"),
    },
    {
      id: "commerce",
      label: "Ecommerce",
      match: (project) => project.categories.includes("commerce"),
    },
    {
      id: "wordpress",
      label: "WordPress",
      match: (project) => project.platforms.includes("WordPress"),
    },
    {
      id: "lovable",
      label: "Lovable",
      match: (project) => project.platforms.includes("Lovable"),
    },
    {
      id: "shopify",
      label: "Shopify",
      match: (project) => project.platforms.includes("Shopify"),
    },
  ] satisfies DigitalFilter[]
).filter((item) => websites.some(item.match));
const filters = [
  { id: "all", label: "All work", count: PORTFOLIO_PROJECTS.length },
  { id: "websites", label: "Websites & apps", count: websites.length },
  { id: "designs", label: "Brands & design", count: designs.length },
  { id: "illustrations", label: "Illustrations", count: ILLUSTRATIONS.length },
] as const;
const categories = [
  {
    id: "websites",
    label: "Websites & apps",
    description:
      "Digital experiences with a purpose. Websites, shops, platforms and the tools that keep a business moving.",
    images: ["clubrovia", "carlichauns", "26-events"].map(
      (slug) =>
        PORTFOLIO_PROJECTS.find((project) => project.slug === slug)!.hero.src,
    ),
    count: websites.length,
  },
  {
    id: "designs",
    label: "Brands & design",
    description:
      "An identity to build on. Logos, packaging, print and campaigns that give a business its own voice.",
    images: ["airnean", "old-carrick-mill", "guinness"].map(
      (slug) =>
        PORTFOLIO_PROJECTS.find((project) => project.slug === slug)!.hero.src,
    ),
    count: designs.length,
  },
  {
    id: "illustrations",
    label: "Illustrations",
    description:
      "A little imagination, off the clock. Characters, sketches and worlds made for the joy of drawing.",
    images: [
      ILLUSTRATIONS[0]!.src,
      ILLUSTRATIONS[2]!.src,
      ILLUSTRATIONS[3]!.src,
    ],
    count: ILLUSTRATIONS.length,
  },
] as const;

export default function ClassicPortfolio() {
  const [params, setParams] = useSearchParams();
  const heading = useRef<HTMLHeadingElement>(null);
  const moveToResults = useRef(false);
  const filter =
    filters.find((item) => item.id === params.get("gallery")) ?? filters[0];
  const digitalFilter =
    digitalFilters.find((item) => item.id === params.get("digital")) ??
    digitalFilters[0]!;
  const projects =
    filter.id === "websites"
      ? websites.filter(digitalFilter.match)
      : filter.id === "designs"
        ? designs
        : PORTFOLIO_PROJECTS;
  useEffect(() => {
    if (!moveToResults.current) return;
    moveToResults.current = false;
    heading.current?.scrollIntoView({ block: "start", behavior: "instant" });
    heading.current?.focus({ preventScroll: true });
  }, [filter.id]);
  const selectCategory = (id: string, scroll = false) => {
    moveToResults.current = scroll;
    const next = new URLSearchParams(params);
    if (id !== filter.id) next.delete("digital");
    next.set("view", "gallery");
    if (id === "all") next.delete("gallery");
    else next.set("gallery", id);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const selectDigitalFilter = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "all") next.delete("digital");
    else next.set("digital", id);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <section className="classic-portfolio" aria-label="Visual portfolio">
      {filter.id === "all" && (
        <div className="portfolio-category-section">
          <div className="portfolio-section-label">
            <span>Find your direction</span>
            <span>
              Choose a collection <ArrowDown size={14} aria-hidden="true" />
            </span>
          </div>
          <div className="portfolio-category-panels">
            {categories.map((category, index) => (
              <button
                type="button"
                className={`portfolio-category-panel portfolio-category-panel--${category.id}`}
                key={category.id}
                onClick={() => selectCategory(category.id, true)}
                aria-label={`Explore ${category.label}`}
                aria-controls="classic-results"
              >
                <span className="portfolio-category-art" aria-hidden="true">
                  {category.images.map((src) => (
                    <img
                      src={src}
                      alt=""
                      key={src}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ))}
                </span>
                <span className="portfolio-category-copy">
                  <span className="portfolio-category-number">
                    0{index + 1} / {category.count}{" "}
                    {category.id === "illustrations" ? "pieces" : "projects"}
                  </span>
                  <span className="portfolio-category-title">
                    {category.label}
                  </span>
                  <span className="portfolio-category-description">
                    {category.description}
                  </span>
                  <span className="portfolio-category-cta">
                    Explore the collection{" "}
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="classic-heading">
        <div>
          <span className="kk-eyebrow">
            {filter.id === "all" ? "A LITTLE OF EVERYTHING" : "THE COLLECTION"}
          </span>
          <h2 ref={heading} tabIndex={-1}>
            {filter.id === "illustrations"
              ? "Illustrations, just for fun."
              : filter.id === "designs"
                ? "Brands, identities & design."
                : filter.id === "websites"
                  ? "Websites, apps & experiences."
                  : "Or explore a mixed selection."}
          </h2>
          <p>
            {filter.id === "illustrations"
              ? "Personal sketches, characters and imaginary worlds. Open any piece to see it in full."
              : "A collection of ideas made real. Open a project to explore the design and the thinking behind it."}
          </p>
        </div>
        <span role="status" aria-live="polite">
          {filter.id === "illustrations" ? filter.count : projects.length}{" "}
          {filter.id === "illustrations" ? "pieces" : "projects"}
        </span>
      </div>
      <div
        className="classic-filters"
        role="group"
        aria-label="Portfolio categories"
      >
        {filters.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={filter.id === item.id}
            aria-controls="classic-results"
            onClick={() => selectCategory(item.id)}
          >
            {item.label}
            <span>{item.count}</span>
          </button>
        ))}
      </div>
      {filter.id === "websites" && (
        <div className="classic-digital-filters">
          <span className="classic-digital-label">Filter websites & apps</span>
          <div
            className="classic-filters classic-subfilters"
            role="group"
            aria-label="Website and app filters"
          >
            {digitalFilters.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={digitalFilter.id === item.id}
                aria-controls="classic-results"
                onClick={() => selectDigitalFilter(item.id)}
              >
                {item.label}
                <span>{websites.filter(item.match).length}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      <div id="classic-results">
        {filter.id !== "illustrations" && (
          <div className="classic-project-grid">
            {projects.map((project, index) => {
              const cover = getProjectCover(
                project,
                filter.id === "websites" || filter.id === "designs"
                  ? filter.id
                  : undefined,
              );
              return (
                <Link
                  className={`classic-project${cover.fit === "contain" || (cover === project.hero && project.presentation === "identity") ? " classic-project--identity" : ""}`}
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  aria-label={`Explore ${project.name}`}
                >
                  <div style={{ backgroundColor: project.surface }}>
                    <img
                      src={cover.src}
                      alt={cover.alt}
                      width={cover.width}
                      height={cover.height}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                    />
                    <span className="classic-project-caption">
                      <h3>{project.name}</h3>
                      <span>{project.category}</span>
                      {filter.id === "websites" &&
                        !!project.platforms.length && (
                          <span className="classic-project-platform">
                            {project.platforms.join(" · ")}
                          </span>
                        )}
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {filter.id === "illustrations" && (
          <section
            className="classic-artwork"
            aria-label="Personal illustrations"
          >
            <Illustrations embedded />
          </section>
        )}
        {filter.id === "all" && (
          <Link
            className="portfolio-sketchbook-link"
            to="/work?view=gallery&gallery=illustrations"
          >
            There’s a sketchbook here, too.{" "}
            <span>
              Explore the illustrations{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        )}
      </div>
    </section>
  );
}
