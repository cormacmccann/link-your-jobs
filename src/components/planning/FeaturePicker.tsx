import type { CSSProperties } from "react";
import {
  BookOpen,
  ShoppingBag,
  CalendarDays,
  UsersRound,
  PanelsTopLeft,
  Workflow,
  Languages,
  Check,
  Plus,
  Smartphone,
  MessageCircle,
  Search,
  Sparkles,
} from "lucide-react";
import { FEATURES, type Feature } from "@/lib/planner/model";

const personality = {
  blog: { Icon: BookOpen, colour: "#a6c5f2", line: "Give your ideas a home." },
  shop: {
    Icon: ShoppingBag,
    colour: "#edbf91",
    line: "Turn browsing into buying.",
  },
  booking: {
    Icon: CalendarDays,
    colour: "#b9b0ef",
    line: "Fill your diary. Cut the back-and-forth.",
  },
  members: {
    Icon: UsersRound,
    colour: "#e8adc7",
    line: "Make people feel they belong.",
  },
  portal: {
    Icon: PanelsTopLeft,
    colour: "#8ed3c5",
    line: "A little less admin. A lot more clarity.",
  },
  automation: {
    Icon: Workflow,
    colour: "#ddcc8d",
    line: "Let your tools talk to each other.",
  },
  languages: {
    Icon: Languages,
    colour: "#9bcbb1",
    line: "Say hello to a wider world.",
  },
} as const;

export function FeaturePicker({
  value,
  onChange,
  purpose = "quote",
}: {
  value: Feature[];
  purpose?: "quote" | "diy";
  onChange: (value: Feature[]) => void;
}) {
  const selected = FEATURES.filter((feature) => value.includes(feature.id));
  return (
    <div className="project-powers">
      <div className="power-baseline">
        <span>
          <Check size={15} aria-hidden="true" /> Already in your corner
        </span>
        <ul aria-label="Included in every project">
          <li>
            <Smartphone size={17} aria-hidden="true" /> Mobile layouts
          </li>
          <li>
            <MessageCircle size={17} aria-hidden="true" /> Contact form
          </li>
          <li>
            <Search size={17} aria-hidden="true" /> Search-friendly structure
          </li>
        </ul>
      </div>
      <div
        className="power-grid"
        role="group"
        aria-label="Choose extra website features"
      >
        {FEATURES.map((feature, index) => {
          const { Icon, colour, line } = personality[feature.id];
          const active = value.includes(feature.id);
          return (
            <button
              type="button"
              key={feature.id}
              className="power-card"
              aria-pressed={active}
              aria-label={feature.name}
              aria-describedby={`power-detail-${feature.id}`}
              style={
                {
                  "--power-colour": colour,
                  "--power-order": index,
                } as CSSProperties
              }
              onClick={() =>
                onChange(
                  active
                    ? value.filter((id) => id !== feature.id)
                    : [...value, feature.id],
                )
              }
            >
              <span className="power-card-top">
                <span className="power-icon">
                  <Icon size={27} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="power-toggle" aria-hidden="true">
                  {active ? <Check size={17} /> : <Plus size={17} />}
                </span>
              </span>
              <strong>{feature.name}</strong>
              <span className="power-feeling">{line}</span>
              <span id={`power-detail-${feature.id}`} className="power-detail">
                {feature.detail}
              </span>
              <span className="power-status" aria-hidden="true">
                {active ? "Added to your project" : "Add this capability"}
                <span>{active ? "✓" : "+"}</span>
              </span>
            </button>
          );
        })}
        <div className="power-mix">
          <span className="power-mix-label">
            <Sparkles size={18} aria-hidden="true" /> YOUR PROJECT, TAKING SHAPE
          </span>
          <div className="power-constellation" aria-hidden="true">
            {FEATURES.map((feature) => {
              const { Icon, colour } = personality[feature.id];
              return (
                <span
                  key={feature.id}
                  className={value.includes(feature.id) ? "is-on" : ""}
                  style={{ "--power-colour": colour } as CSSProperties}
                >
                  <Icon size={20} />
                </span>
              );
            })}
          </div>
          <strong aria-live="polite" aria-atomic="true">
            {selected.length === 0
              ? "Start with the essentials."
              : `${selected.length} ${selected.length === 1 ? "extra capability" : "extra capabilities"}. One connected idea.`}
          </strong>
          <p>
            {selected.length === 0
              ? "A focused website can do a lot. Add only what earns its place."
              : "A mix built around what you need. Tap any selected card to take it out again."}
          </p>
        </div>
      </div>
      <p className="power-footnote">
        {purpose === "diy"
          ? "Pick only what matters. Your choices become a personalised Lovable checklist and starter prompt."
          : "No need to pick everything. Your choices help shape the scope and estimate — you can refine them together later."}
      </p>
    </div>
  );
}
