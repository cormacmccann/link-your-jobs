import PortfolioImage from "@/components/kamrok/PortfolioImage";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import CaseImageGallery from "./CaseImageGallery";
import type { CaseData } from "@/data/projects";
import { Link } from "@/lib/router-compat";

export default function ProcessCaseStudy({ data }: { data: CaseData }) {
  return (
    <div className="process-case">
      <header className="process-intro">
        <div>
          <p className="case-category">{data.category}</p>
          <h1>{data.name}</h1>
          <p className="process-deck">{data.intro}</p>
        </div>
        <div className="process-brief">
          <span className="process-platform">
            {data.tools?.includes("WordPress")
              ? "WordPress website"
              : "Website & identity"}
          </span>
          <p>
            A connected identity and website for a family-run hotel, restaurant
            and bar in the heart of Carlingford.
          </p>
          <dl>
            <div>
              <dt>Our role</dt>
              <dd>{data.services.join(" · ")}</dd>
            </div>
            <div>
              <dt>Platforms & tools</dt>
              <dd>{data.tools?.join(" · ")}</dd>
            </div>
          </dl>
          {data.url && (
            <a
              className="process-visit"
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit the website <ArrowUpRight size={16} />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </header>
      <nav className="process-navigation" aria-label="Project chapters">
        {data.chapters?.map((chapter) => (
          <Link
            key={chapter.id}
            to={`#chapter-${chapter.id}`}
            resetScroll={false}
            hashScrollIntoView={{ block: "start", behavior: "instant" }}
          >
            {chapter.id === "website"
              ? "Website design"
              : chapter.id === "before"
                ? "Earlier logos"
                : chapter.id === "process"
                  ? "Design process"
                  : chapter.id === "identity"
                    ? "Brand identity"
                    : "In the world"}
            <ArrowDown size={13} />
          </Link>
        ))}
      </nav>
      <figure className="process-hero">
        <PortfolioImage
          src={data.hero.src}
          alt={data.hero.alt}
          width={data.hero.width}
          height={data.hero.height}
          loading="eager"
        />
        <figcaption>{data.hero.caption}</figcaption>
      </figure>
      {data.chapters?.map((chapter) => (
        <section
          className="process-chapter"
          key={chapter.id}
          id={`chapter-${chapter.id}`}
          aria-labelledby={`chapter-title-${chapter.id}`}
        >
          <div className="process-chapter-copy">
            <div>
              <span className="process-eyebrow">{chapter.eyebrow}</span>
              <h2 id={`chapter-title-${chapter.id}`}>{chapter.title}</h2>
            </div>
            <div>
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div
            className={
              chapter.paired
                ? "process-images process-images--pair"
                : "process-images"
            }
          >
            <CaseImageGallery
              images={chapter.images}
              name={`${data.name} — ${chapter.title}`}
            />
          </div>
          {!!chapter.supportingImages?.length && (
            <details className="process-supporting">
              <summary>
                {chapter.supportingLabel}{" "}
                <span>
                  {chapter.supportingImages.length}{" "}
                  {chapter.supportingImages.length === 1 ? "image" : "images"} +
                </span>
              </summary>
              <CaseImageGallery
                images={chapter.supportingImages}
                name={`${data.name} — ${chapter.title}`}
              />
            </details>
          )}
        </section>
      ))}
      <details className="process-background">
        <summary>
          Full project background <span>+</span>
        </summary>
        {data.description.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </details>
    </div>
  );
}
