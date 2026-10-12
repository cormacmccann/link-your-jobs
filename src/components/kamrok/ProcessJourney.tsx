import { useEffect, useRef, useState } from "react";
import type { ScrollTrigger as ScrollTriggerInstance } from "gsap/ScrollTrigger";
import "@/styles/process-journey.css";

const STEPS = [
  {
    name: "Discover",
    title: "Find the real idea.",
    text: "We talk about your business, the people you want to reach and what a good result looks like. Then I map the way forward.",
    outcome: "Direction & scope",
    shape:
      "M120 35 C89 35 70 58 70 84 C70 106 83 116 94 130 L94 145 Q120 154 146 145 L146 130 C157 116 170 106 170 84 C170 58 151 35 120 35 Z",
    detail:
      "M105 160 H135 M110 171 H130 M120 133 V102 M101 85 L120 102 L139 85 M120 15 V5 M58 34 L48 24 M182 34 L192 24 M45 84 H32 M195 84 H208",
  },
  {
    name: "Create",
    title: "Make it take shape.",
    text: "Design and development happen with you in the loop. You see real progress, try things out and help steer the details.",
    outcome: "Design, build & refine",
    shape:
      "M52 40 H188 Q199 40 199 51 V145 Q199 156 188 156 H52 Q41 156 41 145 V51 Q41 40 52 40 Z",
    detail:
      "M42 66 H198 M56 53 H57 M68 53 H69 M80 53 H81 M61 86 H100 V135 H61 Z M115 86 H177 M115 103 H164 M115 120 H177 M115 135 H146 M94 174 H146 M120 157 V174",
  },
  {
    name: "Launch",
    title: "Put it out into the world.",
    text: "We check the details, launch with care and make sure you know how everything works. There’s room to keep improving, too.",
    outcome: "Test, launch & handover",
    shape:
      "M120 28 C137 40 148 63 148 94 L148 120 L167 143 L167 158 L139 146 L101 146 L73 158 L73 143 L92 120 L92 94 C92 63 103 40 120 28 Z",
    detail:
      "M120 69 A15 15 0 1 1 119.9 69 M105 146 V165 M135 146 V165 M120 159 V185 M67 86 L71 91 L80 78 M177 50 V66 M169 58 H185 M57 139 V151 M51 145 H63",
  },
];
const SEED =
  "M120 38 C143 25 177 48 176 77 C197 101 175 139 148 145 C125 172 86 153 79 132 C49 119 54 78 74 64 C79 40 102 31 120 38 Z";

export default function ProcessJourney() {
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTriggerInstance | null>(null);
  const previewRef = useRef<((index: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;
    let dispose: (() => void) | undefined;

    // Load animation code on the client; the server renders the complete process.
    void Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/MorphSVGPlugin"),
    ])
      .then(([{ gsap }, { ScrollTrigger }, { MorphSVGPlugin }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin);
        const media = gsap.matchMedia();
        media.add(
          {
            all: "all",
            desktop: "(min-width: 901px) and (min-height: 650px)",
            reduce: "(prefers-reduced-motion: reduce)",
          },
          (context) => {
            const { desktop, reduce } = context.conditions!;
            const cards = Array.from(
              root.querySelectorAll<HTMLElement>(".process-card"),
            );
            const select = (index: number) => {
              setActive(index);
              root.dataset["active"] = String(index);
            };
            select(0);
            root.dataset["motion"] = reduce
              ? "still"
              : desktop
                ? "pinned"
                : "flow";
            if (reduce) {
              previewRef.current = select;
              return () => {
                previewRef.current = null;
              };
            }

            const makeStage = (card: HTMLElement, index: number) => {
              const shape = card.querySelector(".process-morph");
              const detail = card.querySelector(".process-detail");
              gsap.set(shape, { attr: { d: SEED } });
              gsap.set(detail, { strokeDashoffset: 1 });
              gsap.set(card.querySelector(".process-card-progress"), {
                scaleX: 0,
              });
              return gsap
                .timeline()
                .to(
                  shape,
                  {
                    morphSVG: STEPS[index]!.shape,
                    duration: 0.65,
                    ease: "power2.inOut",
                  },
                  0,
                )
                .to(
                  detail,
                  {
                    strokeDashoffset: 0,
                    duration: 0.6,
                    ease: "none",
                    autoRound: false,
                  },
                  0.3,
                )
                .to(
                  card.querySelector(".process-card-progress"),
                  { scaleX: 1, duration: 0.9, ease: "none" },
                  0,
                );
            };

            if (desktop) {
              const stage = root.querySelector<HTMLElement>(
                ".process-journey-stage",
              )!;
              const rail = root.querySelector(".process-rail-draw");
              gsap.set(rail, { strokeDashoffset: 1 });
              const timeline = gsap.timeline({
                scrollTrigger: {
                  trigger: stage,
                  start: "top 110px",
                  end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
                  pin: true,
                  scrub: 0.45,
                  invalidateOnRefresh: true,
                },
                onUpdate: () =>
                  select(Math.min(2, Math.floor(timeline.progress() * 3))),
              });
              cards.forEach((card, index) =>
                timeline.add(makeStage(card, index), index),
              );
              timeline.to(
                rail,
                {
                  strokeDashoffset: 0,
                  duration: 2.4,
                  ease: "none",
                  autoRound: false,
                },
                0.3,
              );
              // Keep the final, fully drawn stage visible before releasing the pin.
              timeline.to({}, { duration: 0.3 }, 2.7);
              triggerRef.current = timeline.scrollTrigger!;
              previewRef.current = (index) => {
                const trigger = triggerRef.current;
                if (trigger)
                  window.scrollTo({
                    top:
                      trigger.start +
                      ((index + 0.95) / 3) * (trigger.end - trigger.start),
                    behavior: "smooth",
                  });
              };
            } else {
              const stages = cards.map((card, index) => {
                const timeline = makeStage(card, index);
                const trigger = ScrollTrigger.create({
                  trigger: card,
                  start: "top 78%",
                  end: "center 45%",
                  animation: timeline,
                  scrub: 0.35,
                  onEnter: () => select(index),
                  onEnterBack: () => select(index),
                });
                return { timeline, trigger };
              });
              previewRef.current = (index) => {
                select(index);
                const stage = stages[index];
                stage?.trigger.getTween()?.pause();
                stage?.timeline.progress(1);
              };
            }
            return () => {
              triggerRef.current = null;
              previewRef.current = null;
              delete root.dataset["motion"];
            };
          },
          root,
        );
        dispose = () => media.revert();
      })
      .catch(() => {
        // The static SVGs and all three descriptions remain usable if loading fails.
      });
    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="process"
      className="orbit-section orbit-process process-journey studio-container"
      aria-labelledby="process-title"
      data-active={active}
    >
      <div className="orbit-section-heading">
        <div>
          <span className="orbit-eyebrow">03 / HOW WE WORK</span>
          <h2 id="process-title">
            A clear process.
            <br />
            <em>Room to explore.</em>
          </h2>
        </div>
        <p>
          From the first conversation
          <br />
          to something out in the world.
        </p>
      </div>
      <div className="process-journey-stage">
        <div className="process-status" aria-hidden="true">
          <span>
            <i /> {String(active + 1).padStart(2, "0")} / {STEPS[active]!.name}
          </span>
          <span className="process-scroll-hint">
            Scroll or choose a stage <span>↓</span>
          </span>
          <span className="process-flow-hint">
            Three stages. One connected process.
          </span>
        </div>
        <div className="process-cards">
          <svg
            className="process-rail"
            viewBox="0 0 900 40"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M150 20 H750" className="process-rail-track" />
            <path
              d="M150 20 H750"
              className="process-rail-draw"
              pathLength="1"
            />
          </svg>
          {STEPS.map((step, index) => (
            <button
              type="button"
              className="process-card"
              key={step.name}
              aria-pressed={active === index}
              onClick={() => {
                setActive(index);
                previewRef.current?.(index);
              }}
            >
              <span className="process-card-top">
                <span>
                  {String(index + 1).padStart(2, "0")} / {step.name}
                </span>
                <span className="process-card-indicator" />
              </span>
              <svg
                className="process-art"
                viewBox="0 0 240 200"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="process-orbit"
                  cx="120"
                  cy="100"
                  r="82"
                  strokeDasharray="2 10"
                />
                <circle
                  className="process-orbit-inner"
                  cx="120"
                  cy="100"
                  r="66"
                />
                <path className="process-morph" d={step.shape} />
                <path
                  className="process-detail"
                  d={step.detail}
                  pathLength="1"
                />
              </svg>
              <span className="process-card-title">{step.title}</span>
              <span className="process-card-copy">{step.text}</span>
              <span className="process-outcome">
                {step.outcome}
                <span aria-hidden="true">↗</span>
              </span>
              <span className="process-card-progress" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
