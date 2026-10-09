import { useEffect, useId, useRef, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Orbit,
  X,
  Minus,
  Plus,
  WandSparkles,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import { money } from "@/lib/planner/model";
import "@/styles/planning.css";

export function WizardFrame({
  title,
  description,
  mode,
  steps,
  step,
  setStep,
  children,
  aside,
  canContinue = true,
  conversational = false,
  finalAction,
}: {
  title: string;
  description: string;
  mode: "project" | "savings";
  steps: string[];
  step: number;
  setStep: (step: number) => void;
  children: ReactNode;
  aside: ReactNode;
  canContinue?: boolean;
  conversational?: boolean;
  finalAction?: ReactNode;
}) {
  const focus = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  useEffect(() => {
    document.title = title;
  }, [title]);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    scroller.current?.scrollTo({ top: 0, behavior: "instant" });
    focus.current?.focus({ preventScroll: true });
  }, [step]);
  return (
    <div
      className={`mission mission-fullscreen ${conversational ? "mission-conversation" : ""}`}
      onKeyDown={(event) => {
        if (
          !conversational ||
          event.key !== "Enter" ||
          event.repeat ||
          !canContinue ||
          step >= steps.length - 1
        )
          return;
        const target = event.target as HTMLElement;
        if (
          target.closest("button, a, summary, textarea, select") ||
          (target.tagName === "INPUT" &&
            target.getAttribute("type") !== "range")
        )
          return;
        event.preventDefault();
        setStep(step + 1);
      }}
    >
      <header className="mission-topbar">
        <Link className="mission-brand" to="/" aria-label="KAMROK home">
          <Orbit size={26} />
          <span>
            KAMROK<span>PROJECT STUDIO</span>
          </span>
        </Link>
        <nav className="mission-mode" aria-label="Planning tools">
          <Link
            to="/project-planner"
            aria-current={mode === "project" ? "page" : undefined}
          >
            <span className="mission-mode-icon" aria-hidden="true">
              <WandSparkles size={25} strokeWidth={1.6} />
            </span>
            <span className="mission-mode-copy">
              <strong>Plan your project</strong>
              <small>Turn your idea into a quote.</small>
            </span>
          </Link>
          <Link
            to="/lovable-savings"
            aria-current={mode === "savings" ? "page" : undefined}
          >
            <span
              className="mission-mode-icon mission-mode-icon--lovable"
              aria-hidden="true"
            >
              <img
                src="/certifications/lovable-mark.svg"
                alt=""
                width="30"
                height="30"
              />
            </span>
            <span className="mission-mode-copy">
              <strong>Switch to Lovable</strong>
              <small>See how much you could save.</small>
            </span>
          </Link>
        </nav>
        <Link
          to="/work"
          className="mission-exit"
          aria-label="Exit planner and return to the portfolio"
        >
          <X size={20} />
          <span>Back to the site</span>
        </Link>
      </header>
      <div className="mission-workspace" ref={scroller}>
        <section
          className="mission-panel"
          ref={focus}
          tabIndex={-1}
          aria-label={steps[step]}
        >
          <h1 className="sr-only">{title}</h1>
          <p className="sr-only">{description}</p>
          <div
            key={conversational ? step : "question"}
            className="mission-question"
          >
            {children}
          </div>
        </section>
        <aside className="mission-aside">
          <div className="mission-orbit" aria-hidden="true">
            <Orbit />
            <span>YOUR NEXT CHAPTER STARTS HERE.</span>
          </div>
          {aside}
          <details className="mission-privacy">
            <summary>Private by design</summary>
            <p className="mission-small">
              No account or email gate. Answers stay on this page. A sitemap
              scan sends only the website address to our server.
            </p>
          </details>
        </aside>
      </div>
      <footer className="mission-dock">
        <button
          className="mission-secondary"
          type="button"
          disabled={step === 0}
          onClick={() => setStep(step - 1)}
        >
          <ArrowLeft size={17} />
          <span>Back</span>
        </button>
        <div className="mission-progress">
          <span>
            Step {step + 1} of {steps.length} <strong>{steps[step]}</strong>
          </span>
          <ol aria-label="Your progress">
            {steps.map((label, i) => (
              <li key={label}>
                <button
                  type="button"
                  aria-label={`Step ${i + 1}: ${label}`}
                  aria-current={i === step ? "step" : undefined}
                  disabled={i > step}
                  onClick={() => setStep(i)}
                  className={i <= step ? "is-complete" : ""}
                />
              </li>
            ))}
          </ol>
        </div>
        {step < steps.length - 1 ? (
          <button
            className="mission-primary"
            type="button"
            disabled={!canContinue}
            onClick={() => setStep(step + 1)}
          >
            {step === steps.length - 2
              ? conversational
                ? "Reveal my result"
                : "See my plan"
              : conversational
                ? "OK, next"
                : "Continue"}
            <ArrowRight size={17} />
          </button>
        ) : (
          (finalAction ?? (
            <Link className="mission-primary" to="/contact">
              Let’s talk
              <ArrowRight size={17} />
            </Link>
          ))
        )}
      </footer>
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  min = 0,
  max = 10000,
  hint,
  presets,
  unit = "money",
  increment = 50,
  unanswered = false,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  hint?: string;
  presets?: number[];
  unit?: "money" | "number";
  increment?: number;
  unanswered?: boolean;
}) {
  const id = useId();
  const options = presets ?? [0, 500, 1500, 2500, 5000];
  const ceiling = Math.max(max, value);
  const format = (n: number) =>
    unit === "money" ? money(n) : n.toLocaleString("en-IE");
  return (
    <fieldset className="mission-picker">
      <legend>{label}</legend>
      <div className="mission-picker-value">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - increment))}
        >
          <Minus size={18} />
        </button>
        <output htmlFor={id}>{unanswered ? "—" : format(value)}</output>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= ceiling}
          onClick={() => onChange(Math.min(ceiling, value + increment))}
        >
          <Plus size={18} />
        </button>
      </div>
      <input
        id={id}
        type="range"
        aria-label={label}
        aria-valuetext={unanswered ? "Not entered yet" : format(value)}
        min={min}
        max={ceiling}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="mission-presets">
        {options
          .filter((n) => n >= min && n <= ceiling)
          .map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={!unanswered && value === n}
              onClick={() => onChange(n)}
            >
              {format(n)}
            </button>
          ))}
      </div>
      {hint && <p className="mission-small">{hint}</p>}
    </fieldset>
  );
}

export function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string; description?: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <fieldset className="mission-choice-group">
      <legend>{label}</legend>
      <div>
        {options.map((option) => (
          <button
            type="button"
            key={option.value}
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
          >
            <strong>{option.label}</strong>
            {option.description && <span>{option.description}</span>}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
