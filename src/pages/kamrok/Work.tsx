import { Link, useSearchParams } from "@/lib/router-compat";
import {
  ArrowDownUp,
  Code2,
  FileCode2,
  FileText,
  Grid2X2,
  Grid3X3,
  Layers,
  LayoutList,
  PenTool,
  RotateCcw,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
  type LucideIcon,
} from "lucide-react";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import Testimonials from "@/components/kamrok/Testimonials";
import {
  CLIENT_BRAND_COUNT,
  PORTFOLIO_PROJECTS,
  PORTFOLIO_DESCRIPTION,
  type PortfolioProject,
} from "@/data/projects";
import "@/styles/work.css";

type WorkFilter = {
  id: string;
  label: string;
  icon: LucideIcon;
  match: (project: PortfolioProject) => boolean;
};
const FILTERS: WorkFilter[] = [
  { id: "all", label: "All work", icon: Layers, match: () => true },
  {
    id: "wordpress",
    label: "WordPress",
    icon: FileCode2,
    match: (project) => project.platforms.includes("WordPress"),
  },
  {
    id: "lovable",
    label: "Lovable",
    icon: Code2,
    match: (project) => project.platforms.includes("Lovable"),
  },
  {
    id: "shopify",
    label: "Shopify",
    icon: ShoppingBag,
    match: (project) => project.platforms.includes("Shopify"),
  },
  {
    id: "commerce",
    label: "Commerce",
    icon: ShoppingCart,
    match: (project) => project.categories.includes("commerce"),
  },
  {
    id: "apps",
    label: "Web apps",
    icon: Code2,
    match: (project) => project.categories.includes("apps"),
  },
  {
    id: "branding",
    label: "Branding",
    icon: PenTool,
    match: (project) => project.categories.includes("branding"),
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Layers,
    match: (project) => project.categories.includes("marketing"),
  },
  {
    id: "print",
    label: "Print & packaging",
    icon: FileText,
    match: (project) => project.categories.includes("print"),
  },
];
const COLLECTIONS = [
  {
    id: "all",
    label: "The full portfolio",
    description:
      "Brand thinking, campaigns and the platforms behind them. Explore the complete collection.",
  },
  {
    id: "platforms",
    label: "Platforms & growth",
    description:
      "Where marketing needs a platform underneath it: ecommerce, ERP, portals, apps and custom tooling, built and integrated in-house.",
  },
  {
    id: "identity",
    label: "Identity & campaign",
    description:
      "Identity, packaging, print and campaigns across food and drink, hospitality, retail, construction, technology and sport.",
  },
] as const;
const VIEWS = [
  { id: "grid", label: "Grid", icon: Grid3X3 },
  { id: "large", label: "Large grid", icon: Grid2X2 },
  { id: "list", label: "List", icon: LayoutList },
] as const;
const LOGOS = [
  "tifco",
  "guinness-storehouse",
  "dundalk-stadium",
  "crowne-plaza",
  "coca-cola",
  "centra",
  "boylesports",
];
const latestYear = (project: PortfolioProject) =>
  project.year?.includes("present")
    ? Number.MAX_SAFE_INTEGER
    : Math.max(...(project.year?.match(/\d{4}/g) ?? ["0"]).map(Number));

export default function Work() {
  const [params, setParams] = useSearchParams();
  const filter =
    FILTERS.find((item) => item.id === params.get("filter")) ?? FILTERS[0]!;
  const view =
    VIEWS.find((item) => item.id === params.get("view"))?.id ?? "large";
  const sort = ["featured", "latest", "az", "za"].includes(
    params.get("sort") ?? "",
  )
    ? params.get("sort")!
    : "featured";
  const search = params.get("q") ?? "";
  const collection =
    COLLECTIONS.find((item) => item.id === params.get("collection")) ??
    COLLECTIONS[0];
  const update = (key: string, value: string, defaultValue = "") => {
    const next = new URLSearchParams(params);
    if (value === defaultValue) next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const reset = () => {
    const next = new URLSearchParams(params);
    next.delete("filter");
    next.delete("q");
    next.delete("collection");
    setParams(next, { replace: true, preventScrollReset: true });
  };
  const collectionProjects = PORTFOLIO_PROJECTS.filter(
    (project) =>
      collection.id === "all" || project.collection === collection.id,
  );
  const projects = collectionProjects.filter(
    (project) =>
      filter.match(project) &&
      [
        project.name,
        project.category,
        project.intro,
        project.url,
        ...project.services,
        ...project.platforms,
        ...(project.tools ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.trim().toLowerCase()),
  );
  if (sort === "az") projects.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "za") projects.sort((a, b) => b.name.localeCompare(a.name));
  if (sort === "latest") projects.sort((a, b) => latestYear(b) - latestYear(a));

  return (
    <KamrokLayout
      fullWidth
      title="Selected Work — Web Design Portfolio | KAMROK"
      description={PORTFOLIO_DESCRIPTION}
    >
      <div className="work-index">
        <header className="work-intro">
          <div>
            <span className="kk-eyebrow">DESIGN THAT GOES SOMEWHERE</span>
            <h1>
              Ideas. Identity.
              <br />
              <em>Impact.</em>
            </h1>
            <p className="kk-lead-text">
              Brand and marketing thinking, with the websites, apps and tools to
              carry it further.
            </p>
          </div>
          <p className="work-intro-note">
            <span>
              {CLIENT_BRAND_COUNT} CLIENT BRANDS · {PORTFOLIO_PROJECTS.length}{" "}
              PROJECTS
            </span>
            From the first impression
            <br />
            to the platform behind it.
          </p>
        </header>

        <div
          className="work-collections"
          role="group"
          aria-label="Portfolio collections"
        >
          {COLLECTIONS.map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={item.id === collection.id}
              aria-controls="work-results"
              onClick={() => {
                const next = new URLSearchParams(params);
                if (item.id === "all") next.delete("collection");
                else next.set("collection", item.id);
                next.delete("filter");
                setParams(next, { replace: true, preventScrollReset: true });
              }}
            >
              <span>{item.label}</span>
              <small>
                {item.id === "all"
                  ? PORTFOLIO_PROJECTS.length
                  : PORTFOLIO_PROJECTS.filter(
                      (project) => project.collection === item.id,
                    ).length}
              </small>
            </button>
          ))}
        </div>
        <p className="work-collection-intro">{collection.description}</p>

        <section className="work-controls" aria-label="Browse the portfolio">
          <div
            className="work-filter-row"
            role="group"
            aria-label="Filter projects"
          >
            {FILTERS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="work-filter cinematic-action"
                aria-pressed={filter.id === item.id}
                aria-controls="work-results"
                onClick={() => update("filter", item.id, "all")}
              >
                <ActionFeedback icon={item.icon} size={15} direction="down" />
                <span>{item.label}</span>
                <small
                  aria-label={`${collectionProjects.filter(item.match).length} projects`}
                >
                  {collectionProjects.filter(item.match).length}
                </small>
              </button>
            ))}
          </div>
          <div className="work-toolbar">
            <div className="work-search">
              <Search size={16} aria-hidden="true" />
              <input
                type="search"
                aria-label="Search projects"
                placeholder="Find a project…"
                value={search}
                onChange={(event) => update("q", event.target.value)}
              />
              {search && (
                <button
                  className="work-search-clear cinematic-action"
                  type="button"
                  aria-label="Clear search"
                  onClick={() => update("q", "")}
                >
                  <ActionFeedback icon={X} size={15} />
                </button>
              )}
            </div>
            <div className="work-sort">
              <ArrowDownUp size={15} aria-hidden="true" />
              <label htmlFor="work-sort">Sort by</label>
              <select
                id="work-sort"
                value={sort}
                onChange={(event) =>
                  update("sort", event.target.value, "featured")
                }
              >
                <option value="featured">Featured</option>
                <option value="latest">Latest</option>
                <option value="az">Name A–Z</option>
                <option value="za">Name Z–A</option>
              </select>
            </div>
            <div
              className="work-view-switch"
              role="group"
              aria-label="Portfolio layout"
            >
              {VIEWS.map((item) => (
                <button
                  className="cinematic-action"
                  type="button"
                  key={item.id}
                  aria-label={`${item.label} view`}
                  aria-pressed={view === item.id}
                  aria-controls="work-results"
                  onClick={() => update("view", item.id, "large")}
                >
                  <ActionFeedback
                    icon={item.icon}
                    size={16}
                    direction="right"
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="work-results-heading">
          <p id="work-results-label" role="status" aria-live="polite">
            {String(projects.length).padStart(2, "0")}{" "}
            {projects.length === 1 ? "PROJECT" : "PROJECTS"}
            <span>
              {filter.id === "all"
                ? ` / ${collection.label.toUpperCase()}`
                : ` / ${filter.label.toUpperCase()}`}
            </span>
          </p>
          {(filter.id !== "all" || collection.id !== "all" || search) && (
            <button
              className="work-reset cinematic-action"
              type="button"
              onClick={reset}
            >
              Clear filters <ActionFeedback icon={RotateCcw} size={14} />
            </button>
          )}
        </div>

        <div
          id="work-results"
          className={`work-results work-results--${view}`}
          aria-labelledby="work-results-label"
        >
          {projects.map((project, index) => (
            <article className="work-project" key={project.slug}>
              <Link
                className="work-project-link action-trigger"
                to={`/work/${project.slug}`}
                aria-label={`View ${project.name} case study`}
              >
                <div
                  className="work-project-image"
                  style={{ backgroundColor: project.surface }}
                >
                  <img
                    src={project.hero.src}
                    width={project.hero.width}
                    height={project.hero.height}
                    alt={project.hero.alt}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <span className="work-project-number">
                    {String(PORTFOLIO_PROJECTS.indexOf(project) + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>
                  <span className="work-project-open cinematic-action">
                    <ActionFeedback icon={FileText} size={20} />
                  </span>
                </div>
                <div className="work-project-copy">
                  <span className="work-project-category">
                    {project.category}
                  </span>
                  <h2>{project.name}</h2>
                  <p className="work-project-intro">{project.intro}</p>
                  <p className="work-project-description">
                    {project.description[0]}
                  </p>
                  <div className="work-project-tags">
                    {(project.platforms.length
                      ? project.platforms
                      : [
                          project.tools?.includes("Adobe")
                            ? "Adobe"
                            : project.categories.includes("apps")
                              ? project.categories.includes("websites")
                                ? "Website & app"
                                : "Web app"
                              : "Web design",
                        ]
                    ).map((platform) => (
                      <span key={platform}>{platform}</span>
                    ))}
                    {project.year && (
                      <span className="work-project-year">{project.year}</span>
                    )}
                  </div>
                </div>
                <div className="work-project-details">
                  <span className="work-detail-label">WHAT WE DID</span>
                  <ul>
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  {!!project.tools?.length && (
                    <div className="work-project-tools">
                      <span className="work-detail-label">
                        TOOLS & PLATFORMS
                      </span>
                      <p>{project.tools.join(" · ")}</p>
                    </div>
                  )}
                  {project.results.length > 0 && (
                    <dl className="work-project-results">
                      {project.results.map((result) => (
                        <div key={result.label}>
                          <dt>{result.label}</dt>
                          <dd>{result.value}</dd>
                          <span>{result.source}</span>
                        </div>
                      ))}
                    </dl>
                  )}
                  <span className="work-read-case cinematic-action">
                    View case study <ActionFeedback icon={FileText} size={14} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        {!projects.length && (
          <div className="work-empty">
            <Search size={28} strokeWidth={1.2} aria-hidden="true" />
            <h2>A different direction?</h2>
            <p>
              {search
                ? `No projects match “${search}” in this selection.`
                : "No published projects in this selection yet."}
            </p>
            <button
              type="button"
              className="orbit-button cinematic-action"
              onClick={reset}
            >
              Explore all work <ActionFeedback icon={Layers} />
            </button>
          </div>
        )}

        <div className="work-afterword">
          <h2 className="kk-sub">In good company</h2>
          <div className="kk-logos">
            {LOGOS.map((logo) => (
              <img
                key={logo}
                src={`/clients/${logo}.${["coca-cola", "boylesports"].includes(logo) ? "png" : "webp"}`}
                alt={`${logo.replace(/-/g, " ")} client logo`}
                loading="lazy"
              />
            ))}
          </div>
          <Testimonials limit={2} />
        </div>

        <section className="work-contact" aria-label="Contact KAMROK">
          <div className="work-contact-inner">
            <span className="kk-eyebrow">
              BASED IN DUNDALK, WORKING EVERYWHERE
            </span>
            <h2 className="kk-sub">Talk to the studio.</h2>
            <address className="work-contact-details">
              <strong>KAMROK — Candy Shop Digital Ltd</strong>
              <span>
                Glenmore, Riverstown, Dundalk, Co. Louth, A91 VW95, Ireland
              </span>
              <a href="tel:+353860285904">086 028 5904</a>
              <a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a>
            </address>
            <p className="work-contact-note">
              Web design, app development and branding for businesses across
              Louth, Ireland and the UK.
            </p>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": "https://kamrok.com/#org",
                name: "KAMROK",
                legalName: "Candy Shop Digital Ltd",
                url: "https://kamrok.com/",
                telephone: "+353860285904",
                email: "cormac@kamrok.com",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Glenmore, Riverstown",
                  addressLocality: "Dundalk",
                  addressRegion: "Co. Louth",
                  postalCode: "A91 VW95",
                  addressCountry: "IE",
                },
                areaServed: [
                  "Dundalk",
                  "Co. Louth",
                  "Ireland",
                  "United Kingdom",
                ],
              }),
            }}
          />
        </section>
      </div>
    </KamrokLayout>
  );
}
