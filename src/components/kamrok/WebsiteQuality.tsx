import { useEffect, useId, useRef, type CSSProperties } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/lib/router-compat";
import "@/styles/website-quality.css";

const RESULTS = [
  {
    label: "Performance",
    benefit: "Fast loading. Less waiting.",
    detail: "Optimised images and lean delivery keep the experience moving.",
  },
  {
    label: "Accessibility",
    benefit: "A clearer way through.",
    detail: "Readable content, labelled controls and thoughtful navigation.",
  },
  {
    label: "Best Practices",
    benefit: "Care in the details.",
    detail: "Modern web standards and a build checked before launch.",
  },
  {
    label: "SEO",
    benefit: "Ready to be discovered.",
    detail: "Search-friendly structure, metadata and crawlable content.",
  },
];

const CONFETTI = Array.from({ length: 12 }, (_, index) => {
  const angle = ((200 + (index / 11) * 140) * Math.PI) / 180;
  const radius = 72 + (index % 3) * 9;
  const y = Math.round(Math.sin(angle) * radius);
  return {
    "--confetti-x": `${Math.round(Math.cos(angle) * radius)}px`,
    "--confetti-apex-y": `${y}px`,
    "--confetti-end-y": `${y + 45}px`,
    "--confetti-spin": `${(index % 2 ? 1 : -1) * (160 + index * 35)}deg`,
    "--confetti-delay": `${(index % 3) * 25}ms`,
    "--confetti-color": [
      "var(--quality-green)",
      "var(--studio-mint)",
      "var(--studio-purple)",
      "var(--studio-text)",
    ][index % 4],
  } as CSSProperties;
});

/** Static scores survive SSR/no-JS; each gauge replays after leaving the viewport. */
export default function WebsiteQuality({
  className = "",
  contact = "/contact?service=Website%20design",
}: {
  className?: string;
  contact?: string;
}) {
  const titleId = useId();
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".quality-result"),
    );
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    const states = new Map(
      cards.map((card) => [
        card.querySelector(".quality-gauge")!,
        {
          card,
          visible: false,
          active: false,
          start: undefined as number | undefined,
          delay: 0,
        },
      ]),
    );
    const paint = (card: HTMLElement, progress: number) => {
      card.style.setProperty("--quality-progress", String(progress));
      const number = card.querySelector("[data-quality-number]");
      // Keep 100 for the actual finish, so the number and celebration coincide.
      if (number)
        number.textContent = String(
          progress === 1 ? 100 : Math.min(99, Math.floor(progress * 100)),
        );
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      states.forEach((state) => {
        state.active = false;
        state.visible = false;
        state.card.classList.remove("quality-celebrate");
      });
    };
    if (!("IntersectionObserver" in window)) return;
    const tick = (time: number) => {
      frame = 0;
      states.forEach((state) => {
        if (!state.active) return;
        state.start ??= time;
        const progress = Math.max(
          0,
          Math.min(1, (time - state.start - state.delay) / 1250),
        );
        paint(state.card, 1 - Math.pow(1 - progress, 3));
        if (progress === 1) {
          state.active = false;
          state.card.classList.add("quality-celebrate");
        }
      });
      if ([...states.values()].some((state) => state.active))
        frame = requestAnimationFrame(tick);
    };
    observer = new IntersectionObserver(
      (entries) => {
        if (preference.matches) return;
        let stagger = 0;
        entries.forEach((entry) => {
          const state = states.get(entry.target);
          if (!state) return;
          if (!entry.isIntersecting) {
            state.active = false;
            state.visible = false;
            state.card.classList.remove("quality-celebrate");
            paint(state.card, 0);
          } else if (entry.intersectionRatio >= 0.45 && !state.visible) {
            state.visible = true;
            state.active = true;
            state.start = undefined;
            state.delay = stagger++ * 130;
          }
        });
        if ([...states.values()].some((state) => state.active)) {
          if (!frame) frame = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      // Observe the rings individually so the second row on mobile gets its own entrance.
      { threshold: [0, 0.45], rootMargin: "-88px 0px -24px 0px" },
    );
    const syncPreference = () => {
      stop();
      observer?.disconnect();
      cards.forEach((card) => paint(card, preference.matches ? 1 : 0));
      if (!preference.matches)
        states.forEach((_state, gauge) => observer?.observe(gauge));
    };
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => {
      stop();
      observer?.disconnect();
      cards.forEach((card) => paint(card, 1));
      preference.removeEventListener("change", syncPreference);
    };
  }, []);

  return (
    <section
      id="website-quality"
      className={`website-quality ${className}`}
      aria-labelledby={titleId}
    >
      <div className="quality-heading">
        <div>
          <p className="quality-eyebrow">
            <span aria-hidden="true" /> WEBSITE DESIGN / MEASURABLE QUALITY
          </p>
          <h2 id={titleId}>
            Looks sharp.
            <br />
            <em>Runs beautifully.</em>
          </h2>
        </div>
        <div className="quality-intro">
          <p>
            Recent website builds have achieved{" "}
            <strong>100/100 in all four Lighthouse categories.</strong> For your
            business, that means a focus on speed, usability and the foundations
            that help people find you.
          </p>
          <Link className="quality-cta" to={contact}>
            Let’s talk about your website{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="quality-report">
        <div className="quality-report-heading">
          <span>Diagnose performance issues</span>
          <span>LIGHTHOUSE / OUT OF 100</span>
        </div>
        <div className="quality-results" ref={grid}>
          {RESULTS.map((result) => (
            <div className="quality-result" key={result.label}>
              <div
                className="quality-gauge"
                role="img"
                aria-label={`${result.label}: 100 out of 100`}
              >
                <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
                  <circle
                    className="quality-ring-track"
                    cx="60"
                    cy="60"
                    r="52"
                  />
                  <circle
                    className="quality-ring-fill"
                    cx="60"
                    cy="60"
                    r="52"
                    pathLength="100"
                  />
                </svg>
                <span
                  className="quality-score"
                  aria-hidden="true"
                  data-quality-number
                >
                  100
                </span>
                <span className="quality-confetti" aria-hidden="true">
                  {CONFETTI.map((style, index) => (
                    <i key={index} style={style} />
                  ))}
                </span>
              </div>
              <h3>{result.label}</h3>
              <p className="quality-benefit">{result.benefit}</p>
              <p className="quality-detail">{result.detail}</p>
            </div>
          ))}
        </div>
        <div className="quality-report-foot">
          <span>
            <Check size={14} aria-hidden="true" /> Design with substance. Tested
            before launch.
          </span>
          <span>Recent website build results</span>
        </div>
      </div>
      <div className="quality-context">
        <p>
          Lighthouse lab scores from recent builds. Results vary by page,
          device, content and test conditions.
        </p>
        <details>
          <summary>What do these scores mean?</summary>
          <p>
            These are automated checks, alongside our wider testing.
            Accessibility also needs manual review, and an SEO score is not a
            search ranking.{" "}
            <a
              href="https://developers.google.com/speed/docs/insights/v5/about"
              target="_blank"
              rel="noopener noreferrer"
            >
              How PageSpeed Insights measures quality ↗
            </a>
          </p>
        </details>
      </div>
    </section>
  );
}
