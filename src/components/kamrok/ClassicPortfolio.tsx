import { ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "@/lib/router-compat";
import { PORTFOLIO_PROJECTS } from "@/data/projects";
import { ILLUSTRATIONS } from "@/data/illustrations";
import Illustrations from "@/pages/kamrok/Illustrations";

const designs = PORTFOLIO_PROJECTS.filter(
  (project) => project.collection === "identity",
);
const filters = [
  {
    id: "all",
    label: "All work",
    count: PORTFOLIO_PROJECTS.length + ILLUSTRATIONS.length,
  },
  { id: "designs", label: "Brands & design", count: designs.length },
  { id: "illustrations", label: "Illustrations", count: ILLUSTRATIONS.length },
] as const;

export default function ClassicPortfolio() {
  const [params, setParams] = useSearchParams();
  const filter =
    filters.find((item) => item.id === params.get("gallery")) ?? filters[0];
  const projects = filter.id === "designs" ? designs : PORTFOLIO_PROJECTS;
  return (
    <section className="classic-portfolio" aria-label="Classic portfolio">
      <div
        className="classic-filters"
        role="group"
        aria-label="Classic portfolio categories"
      >
        {filters.map((item) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={filter.id === item.id}
            aria-controls="classic-results"
            onClick={() => {
              const next = new URLSearchParams(params);
              next.set("gallery", item.id);
              setParams(next, { replace: true, preventScrollReset: true });
            }}
          >
            {item.label}
            <span>{item.count}</span>
          </button>
        ))}
      </div>
      <div className="classic-heading">
        <div>
          <h2>
            {filter.id === "illustrations"
              ? "Illustrations, just for fun."
              : filter.id === "designs"
                ? "Brands, identities & design."
                : "The work, at a glance."}
          </h2>
          <p>
            {filter.id === "illustrations"
              ? "Personal sketches, characters and imaginary worlds. Open any piece to see it in full."
              : "Explore the designs in a simple visual grid. Open a project for the story behind it."}
          </p>
        </div>
        <span role="status">
          {filter.count} {filter.id === "illustrations" ? "pieces" : "works"}
        </span>
      </div>
      <div id="classic-results">
        {filter.id !== "illustrations" && (
          <div className="classic-project-grid">
            {projects.map((project, index) => (
              <Link
                className="classic-project"
                key={project.slug}
                to={`/work/${project.slug}`}
                aria-label={`Explore ${project.name}`}
              >
                <div style={{ backgroundColor: project.surface }}>
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    width={project.hero.width}
                    height={project.hero.height}
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                <h3>{project.name}</h3>
                <p>{project.category}</p>
              </Link>
            ))}
          </div>
        )}
        {filter.id !== "designs" && (
          <section
            className="classic-artwork"
            aria-label="Personal illustrations"
          >
            {filter.id === "all" && (
              <div className="classic-heading">
                <div>
                  <h2>Illustrations, just for fun.</h2>
                  <p>The personal sketchbook — art made for the joy of it.</p>
                </div>
              </div>
            )}
            <Illustrations embedded />
          </section>
        )}
      </div>
    </section>
  );
}
