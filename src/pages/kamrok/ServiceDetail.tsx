import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  MessageCircle,
  Plus,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import { SERVICES, type ServiceDefinition } from "@/data/services";
import { PROJECT_CASES } from "@/data/projects";
import { PORTFOLIO_CAPTURES } from "@/data/portfolioCaptures";
import "@/styles/service-detail.css";

export default function ServiceDetail({
  service,
}: {
  service: ServiceDefinition;
}) {
  const firstSlug = service.examples[0]!.slug;
  const featured = PROJECT_CASES[firstSlug]!;
  const useBrandArtwork = service.slug === "brand-creative-direction";
  const imageFor = (slug: string) =>
    (useBrandArtwork ? undefined : PORTFOLIO_CAPTURES[slug]?.hero) ??
    PROJECT_CASES[slug]!.hero;
  const hero = imageFor(firstSlug);
  const contact = `/contact?service=${encodeURIComponent(service.name)}`;
  return (
    <article className="service-detail studio-container">
      <Link className="service-back" to="/skills">
        <ArrowLeft size={16} /> All services
      </Link>
      <header className="service-detail-hero">
        <div className="service-detail-copy">
          <p className="orbit-eyebrow">
            <service.icon size={20} aria-hidden="true" /> {service.number} /
            WHAT I DO
          </p>
          <h1>{service.name}</h1>
          <p className="service-detail-line">{service.line}</p>
          <p className="service-detail-body">{service.body}</p>
          <div className="service-detail-actions">
            <Link className="orbit-button" to={contact}>
              Let’s talk about your project <MessageCircle size={18} />
            </Link>
            <a href="#service-examples">
              See it in the work <ArrowRight size={17} />
            </a>
          </div>
        </div>
        <figure
          className={`service-feature${useBrandArtwork ? " service-feature--brand" : ""}`}
        >
          <Link
            to={`/work/${firstSlug}`}
            aria-label={`Explore ${featured.name}`}
          >
            <img
              src={hero.src}
              alt={hero.alt}
              width={hero.width}
              height={hero.height}
              fetchPriority="high"
            />
          </Link>
          <figcaption>
            <span>FROM THE PORTFOLIO</span>
            <Link to={`/work/${firstSlug}`}>
              {featured.name} <ArrowUpRight size={18} />
            </Link>
          </figcaption>
        </figure>
      </header>
      <section className="service-fit" aria-label="Who this is for">
        <span>A GOOD FIT</span>
        <p>{service.fit}</p>
      </section>
      <section
        className="service-detail-section"
        aria-labelledby="service-includes"
      >
        <div className="service-detail-heading">
          <div>
            <p className="orbit-eyebrow">THE SCOPE, MADE CLEAR</p>
            <h2 id="service-includes">What’s included</h2>
          </div>
          <p>
            These are the building blocks. We agree the pages, features, content
            and connections your project needs before the work begins.
          </p>
        </div>
        <div className="service-inclusions">
          {service.includes.map(([title, text], index) => (
            <div key={title}>
              <span>
                <Check size={20} aria-hidden="true" />{" "}
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section
        className="service-journey"
        aria-labelledby="service-journey-title"
      >
        <p id="service-journey-title">THE EXPERIENCE WE’RE DESIGNING</p>
        <ol>
          {service.journey.map((step, index) => (
            <li key={step}>
              <span>{index + 1}</span>
              {step}
              {index < service.journey.length - 1 && (
                <ArrowRight aria-hidden="true" size={20} />
              )}
            </li>
          ))}
        </ol>
      </section>
      <section
        id="service-examples"
        className="service-detail-section"
        aria-labelledby="service-examples-title"
      >
        <div className="service-detail-heading">
          <div>
            <p className="orbit-eyebrow">IDEAS YOU CAN SEE</p>
            <h2 id="service-examples-title">
              How it shows up
              <br />
              in the work.
            </h2>
          </div>
          <p>
            Each example highlights a different part of the service. Open the
            project to explore its scope and the design in more detail.
          </p>
        </div>
        <div className="service-examples">
          {service.examples.map((example) => {
            const project = PROJECT_CASES[example.slug]!;
            const image = imageFor(example.slug);
            return (
              <section className="service-example" key={example.slug}>
                <Link
                  className={`service-example-image${useBrandArtwork ? " service-example-image--brand" : ""}`}
                  to={`/work/${example.slug}`}
                  aria-label={`View ${project.name} case study`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                </Link>
                <div>
                  <p className="orbit-eyebrow">{project.name}</p>
                  <h3>{example.heading}</h3>
                  <p>{example.text}</p>
                  <Link
                    className="service-case-link"
                    to={`/work/${example.slug}`}
                  >
                    Explore {project.name} <ArrowUpRight size={18} />
                  </Link>
                </div>
              </section>
            );
          })}
        </div>
      </section>
      <section
        className="service-detail-section service-detail-faq"
        aria-labelledby="service-questions"
      >
        <div>
          <p className="orbit-eyebrow">BEFORE WE START</p>
          <h2 id="service-questions">A little clarity.</h2>
        </div>
        <div>
          {service.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="service-detail-cta">
        <div>
          <p className="orbit-eyebrow">LET’S FIND YOUR STARTING POINT</p>
          <h2>
            What would you
            <br />
            like to make possible?
          </h2>
          <p>
            Bring the idea, the current website or the thing that keeps getting
            in the way. We’ll work out the next step together.
          </p>
        </div>
        <div>
          <Link className="orbit-button" to={contact}>
            Discuss {service.name.toLowerCase()} <ArrowUpRight size={18} />
          </Link>
          <Link className="service-case-link" to="/project-planner">
            Start with the project planner <ArrowRight size={16} />
          </Link>
          <small>Scope, timeline and ongoing costs agreed upfront.</small>
        </div>
      </section>
      <nav className="service-siblings" aria-label="Explore other services">
        <p className="orbit-eyebrow">EXPLORE THE OTHER SERVICES</p>
        <div>
          {SERVICES.filter((item) => item.slug !== service.slug).map((item) => (
            <Link key={item.slug} to={`/services/${item.slug}`}>
              <span>{item.number}</span>
              {item.name}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}
