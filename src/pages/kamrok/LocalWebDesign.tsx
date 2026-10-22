import WebsiteQuality from "@/components/kamrok/WebsiteQuality";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import { CONTACT_TEL, LOVABLE_PARTNER_URL } from "@/lib/brand";
import {
  LOCAL_PROJECTS,
  WEB_DESIGN_LOCATIONS,
  type WebDesignLocation,
} from "@/data/localWebDesign";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import "@/styles/local-web-design.css";

const FOUNDATIONS = [
  {
    n: "01",
    title: "Designed for your customers.",
    text: "A clear structure, considered copy and a mobile experience that helps people find the right service, make an enquiry or buy.",
  },
  {
    n: "02",
    title: "Built to be found.",
    text: "Search-friendly page titles, crawlable content, descriptive links, sensible image sizes and a sitemap. A useful foundation for ongoing SEO.",
  },
  {
    n: "03",
    title: "Ready for everyday life.",
    text: "The right editing tools, tested forms and an agreed handover. Hosting, maintenance and ongoing support are discussed before the build.",
  },
];
const PRACTICAL_FAQS = [
  {
    q: "WordPress, Shopify or Lovable?",
    a: "We choose around the job. WordPress suits many content-led business sites; Shopify is an option for a dedicated online shop; Lovable suits custom apps, portals and interactive products. I explain the editing experience, integrations and ongoing costs before we decide.",
  },
  {
    q: "How much does a website cost, and how long does it take?",
    a: "That depends on the pages, content, functionality and integrations. After a first conversation, you receive a scoped proposal with a project price, review stages and a realistic timeline. Domain, hosting, platform and third-party costs are identified separately.",
  },
  {
    q: "Can you help after launch?",
    a: "Yes. We can agree support for updates, technical maintenance, content or new features. You receive a handover for the agreed editing tasks, and we discuss the support arrangement that fits your team.",
  },
];

export default function LocalWebDesign({
  slug,
}: {
  slug: WebDesignLocation["slug"];
}) {
  const location = WEB_DESIGN_LOCATIONS[slug];
  const { theme } = useStudioTheme();
  const contact = `/contact?service=${encodeURIComponent(`Web design ${location.name}`)}`;
  return (
    <div className={`local-design local-design--${location.slug}`}>
      <section
        className="local-hero studio-container"
        aria-labelledby="local-title"
      >
        <div className="local-hero-copy">
          <nav className="local-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Web design {location.name}</span>
          </nav>
          <p className="orbit-eyebrow">
            <MapPin size={13} aria-hidden="true" />
            {location.positioning}
          </p>
          <h1 id="local-title">
            Web design in <br />
            <em>{location.name}.</em>
          </h1>
          <p className="local-intro">{location.introduction}</p>
          <div className="local-actions">
            <Link className="orbit-button" to={contact}>
              Let’s talk about your website{" "}
              <ArrowUpRight size={19} aria-hidden="true" />
            </Link>
            <a className="orbit-text-link" href="#local-work">
              See the work <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="local-direct">
            <span className="orbit-status-dot" />
            Independent studio. Work directly with Cormac.
          </p>
        </div>
        <figure className="local-hero-feature">
          <div className="local-feature-top">
            <span>{location.feature.label}</span>
            <span>01 / SELECTED WORK</span>
          </div>
          <Link
            to={`/work/${location.feature.slug}`}
            aria-label={`Explore ${location.feature.name}`}
          >
            <img
              src={`/projects/local/${location.feature.image}-840.webp`}
              srcSet={`/projects/local/${location.feature.image}-480.webp 480w, /projects/local/${location.feature.image}-840.webp 840w, /projects/local/${location.feature.image}-1200.webp 1200w`}
              sizes="(max-width: 800px) calc(100vw - 48px), 48vw"
              alt={location.feature.alt}
              width="1200"
              height="800"
              fetchPriority="high"
              decoding="async"
            />
          </Link>
          <figcaption>
            <div>
              <h2>{location.feature.name}</h2>
              <p>{location.feature.caption}</p>
            </div>
            <Link
              to={`/work/${location.feature.slug}`}
              aria-label={`Read the ${location.feature.name} case study`}
            >
              <ArrowUpRight size={26} aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </section>
      <div className="local-credentials studio-container">
        <span>WORDPRESS · SHOPIFY · LOVABLE</span>
        <a
          href={LOVABLE_PARTNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View KAMROK in the Lovable partner directory"
        >
          <img
            src={`/certifications/lovable-expert-app-builder-full-on-${theme}.svg`}
            alt="Lovable certified expert app builder"
            width="534"
            height="176"
          />
        </a>
        <span>AWARD-WINNING WORDPRESS DESIGN</span>
      </div>
      <WebsiteQuality className="studio-container" contact={contact} />
      <section
        className="local-context studio-container"
        aria-labelledby="local-context-title"
      >
        <div>
          <span className="orbit-eyebrow">
            YOUR BUSINESS. YOUR NEXT CHAPTER.
          </span>
          <h2 id="local-context-title">{location.lead}</h2>
        </div>
        <div>
          <p>{location.context}</p>
          <Link className="orbit-text-link" to="/about">
            Meet the studio <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      {location.localEvidence && (
        <section className="local-context studio-container" aria-label="Local project evidence">
          <h2>{location.localEvidence.title}</h2>
          <div>
            <p>{location.localEvidence.text}</p>
            {location.localEvidence.url && (
              <a className="orbit-text-link" href={location.localEvidence.url} target="_blank" rel="noopener noreferrer">
                {location.localEvidence.linkLabel} <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
          </div>
        </section>
      )}
      <section
        className="local-priorities studio-container"
        aria-labelledby="local-priorities-title"
      >
        <div className="local-section-heading">
          <span className="orbit-eyebrow">
            WEB DESIGN FOR {location.name.toUpperCase()}
          </span>
          <h2 id="local-priorities-title">
            What does your
            <br />
            <em>website need to do?</em>
          </h2>
        </div>
        <div className="local-priority-grid">
          {location.priorities.map((item, index) => (
            <article key={item.title}>
              <span className="local-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section
        id="local-work"
        className="local-work studio-container"
        aria-labelledby="local-work-title"
      >
        <div className="local-section-heading">
          <div>
            <span className="orbit-eyebrow">REAL PROJECTS. A CLOSER LOOK.</span>
            <h2 id="local-work-title">
              See the thinking.
              <br />
              <em>Explore the work.</em>
            </h2>
          </div>
          <Link
            className="orbit-text-link"
            to="/work?view=gallery&gallery=websites"
          >
            All websites & apps <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="local-work-grid">
          {location.projects.map((slug) => {
            const project = LOCAL_PROJECTS[slug];
            if (!project) return null;
            return (
              <Link key={slug} to={`/work/${slug}`} className="local-project">
                <div className="local-project-image">
                  <img
                    src={`/projects/local/${project.image}-840.webp`}
                    srcSet={`/projects/local/${project.image}-480.webp 480w, /projects/local/${project.image}-840.webp 840w`}
                    sizes="(max-width: 700px) calc(100vw - 48px), 30vw"
                    alt={project.alt}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="orbit-eyebrow">{project.label}</span>
                <h3>
                  {project.name}
                  <ArrowUpRight size={20} aria-hidden="true" />
                </h3>
                <p>{project.text}</p>
              </Link>
            );
          })}
        </div>
        <p className="local-work-note">
          {location.workNote ?? "Selected work from the studio, including projects in Carlingford and across the wider region. Each case study shows the actual scope."}
        </p>
      </section>
      {location.projectOptions && (
        <>
        {location.testimonial && (
          <section className="local-context studio-container" aria-label="Client feedback">
            <div>
              <span className="orbit-eyebrow">IN OUR CLIENT’S WORDS</span>
              <h2>A little adventure.<br /><em>A lot of practical thinking.</em></h2>
            </div>
            <figure>
              <blockquote><p>“{location.testimonial.quote}”</p></blockquote>
              <figcaption>
                <strong>{location.testimonial.author}</strong>
                <p>{location.testimonial.context}</p>
              </figcaption>
            </figure>
          </section>
        )}
        <section className="local-context studio-container" aria-label="Project prices and retainers">
          <div>
            <span className="orbit-eyebrow">ONE-OFF PROJECTS & ONGOING WORK</span>
            <h2>A clear scope.<br /><em>A price you can plan around.</em></h2>
          </div>
          <div>
            <h3>One-off website or app project</h3>
            <p>A defined build with an agreed project price, review stages and handover. You do not need a retainer to commission a website.</p>
            <ul>
              <li>Business website: guide starting budget €3,500 / approximately £2,975.</li>
              <li>WordPress ecommerce website: guide starting budget €4,500 / approximately £3,825.</li>
              <li>Custom website or app: guide starting budget €5,500 / approximately £4,675.</li>
            </ul>
            <p>Every website is completely different. Pages, content, design, payments and integrations all change the work involved. These are starting-budget guides, not a fixed package or a promise that your build will cost exactly this.</p>
            <h3>Basic WordPress maintenance</h3>
            <p>€190 per month / approximately £162 per month. We agree the maintenance tasks, access and any exclusions before starting. New features, redesigns and wider development are quoted separately.</p>
            <h3>Monthly retainer</h3>
            <p>For an ongoing programme of development, maintenance or content work. We agree the work and monthly fee before starting.</p>
            <p>Pound figures are illustrative comparisons at €1 = £0.85, rounded where needed; they are not live exchange rates or fixed sterling offers. Request a scoped quote in euros (€) or pounds (£). VAT treatment and any hosting, platform or third-party costs are confirmed separately in your proposal.</p>
            <Link className="orbit-text-link" to={contact}>Discuss your project price <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>
        </>
      )}
      <section
        className="local-foundations"
        aria-labelledby="local-foundations-title"
      >
        <div className="studio-container">
          <div className="local-section-heading">
            <span className="orbit-eyebrow">
              THE DETAILS THAT MAKE A DIFFERENCE
            </span>
            <h2 id="local-foundations-title">
              Good looking.
              <br />
              <em>Hard working.</em>
            </h2>
          </div>
          <div className="local-priority-grid">
            {FOUNDATIONS.map((item) => (
              <article key={item.n}>
                <Check size={24} strokeWidth={1.4} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="local-foundation-links">
            <Link
              className="orbit-text-link"
              to="/services/websites-landing-pages"
            >
              Explore website design{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link className="orbit-text-link" to="/blog/dundalk-seo-guide">
              Read the local SEO guide{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a
              className="orbit-text-link"
              href={LOVABLE_PARTNER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              My Lovable partner profile{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <section
        className="local-faq studio-container"
        aria-labelledby="local-faq-title"
      >
        <div>
          <span className="orbit-eyebrow">BEFORE WE BEGIN</span>
          <h2 id="local-faq-title">
            A few good
            <br />
            <em>questions.</em>
          </h2>
        </div>
        <div>
          {[...location.faqs, ...PRACTICAL_FAQS].map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="local-close studio-container">
        <span className="orbit-eyebrow">LET’S MAKE YOUR NEXT MOVE COUNT</span>
        <h2>
          A better website
          <br />
          <em>starts with a conversation.</em>
        </h2>
        <p>
          Tell me about your business in {location.name}, share your current
          website or bring the idea you keep thinking about.
        </p>
        <div className="local-actions">
          <Link className="orbit-button" to={contact}>
            Talk to Cormac <MessageCircle size={18} aria-hidden="true" />
          </Link>
          <a className="orbit-text-link" href={CONTACT_TEL}>
            Call +353 86 028 5904 <Phone size={16} aria-hidden="true" />
          </a>
        </div>
        <nav className="local-neighbours" aria-label="Web design service areas">
          {Object.values(WEB_DESIGN_LOCATIONS)
            .filter((item) => item.slug !== location.slug)
            .map((item) => (
              <Link key={item.slug} to={`/web-design-${item.slug}`}>
                Web design {item.name}{" "}
                <ArrowUpRight size={14} aria-hidden="true" />
              </Link>
            ))}
        </nav>
      </section>
    </div>
  );
}
