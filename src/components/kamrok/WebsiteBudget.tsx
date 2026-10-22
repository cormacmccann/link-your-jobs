import { useId, useState } from "react";
import {
  websiteBudget,
  type WebsiteBudget as Budget,
} from "@/lib/website-ownership";
const FIELDS = [
  ["build", "Website build", "once"],
  ["domain", "Domain renewal", "per year"],
  ["hosting", "Hosting", "per month"],
  ["email", "Hosted email — all users", "per month"],
  ["care", "Support & maintenance", "per month"],
  ["licences", "Theme & plugin licences", "per year"],
  ["usage", "App usage & other services", "per month"],
] as const;
const euro = (value: number) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
export default function WebsiteBudget() {
  const id = useId();
  const [values, setValues] = useState({
    build: "2400",
    domain: "35",
    hosting: "30",
    email: "10",
    care: "50",
    licences: "180",
    usage: "0",
  });
  const result = websiteBudget(
    Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, Number(value)]),
    ) as Budget,
  );
  return (
    <div className="ownership-budget">
      <div className="ownership-budget-heading">
        <span className="ownership-label">TRY YOUR OWN FIGURES</span>
        <h3>What does the whole thing cost?</h3>
        <p>
          Illustrative figures to start with. Replace them with the amounts in
          your actual quote. Enter the total email bill for all users. If
          hosting or email is billed annually, divide that bill by 12 for this
          tool.
        </p>
      </div>
      <div className="ownership-budget-inputs">
        {FIELDS.map(([key, label, period]) => (
          <label key={key} htmlFor={`${id}-${key}`}>
            <span>
              {label}
              <small>€ / {period}</small>
            </span>
            <input
              id={`${id}-${key}`}
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              value={values[key]}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [key]: event.target.value,
                }))
              }
            />
          </label>
        ))}
      </div>
      <div
        className="ownership-budget-output"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <span>Running costs / year</span>
          <strong>{euro(result.annual)}</strong>
        </div>
        <div>
          <span>Build + first year</span>
          <strong>{euro(result.firstYear)}</strong>
        </div>
        <div>
          <span>Build + three years</span>
          <strong>{euro(result.threeYears)}</strong>
        </div>
      </div>
      <p className="ownership-fine">
        This is a comparison tool, not a KAMROK or provider quote. Use the same
        tax basis throughout. Avoid counting bundled services twice. It assumes
        unchanged rates and excludes future redesigns, extra work and unexpected
        usage.
      </p>
    </div>
  );
}
