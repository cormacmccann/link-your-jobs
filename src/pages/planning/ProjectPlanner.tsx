import { FeaturePicker } from "@/components/planning/FeaturePicker";
import {
  WebsiteHomeChoices,
  LovableCareChoices,
  LovableBenefits,
} from "@/components/planning/ServiceChoices";
import { downloadBrief } from "@/lib/planner/download";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  Globe,
  RefreshCw,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import {
  WizardFrame,
  NumberField,
  ChoiceGroup,
} from "@/components/planning/WizardFrame";
import {
  DEFAULT_PROJECT,
  FEATURES,
  estimateProject,
  money,
  type ProjectInput,
  type SitemapAudit,
} from "@/lib/planner/model";

export default function ProjectPlanner() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<ProjectInput>(DEFAULT_PROJECT);
  const [site, setSite] = useState("");
  const [audit, setAudit] = useState<SitemapAudit | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState("");
  const [hosting, setHosting] = useState("unsure");
  const [domain, setDomain] = useState("unsure");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const change = <K extends keyof ProjectInput>(
    key: K,
    value: ProjectInput[K],
  ) => setInput((current) => ({ ...current, [key]: value }));
  const estimate = estimateProject(input);
  const scan = async () => {
    controller.current?.abort();
    const pending = new AbortController();
    controller.current = pending;
    setBusy(true);
    setError("");
    setAudit(null);
    try {
      const res = await fetch("/api/sitemap-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: site }),
        signal: pending.signal,
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.error || "Scan unavailable. Please use a manual page count.",
        );
      if (!Array.isArray(data.urls) || !data.urls.length)
        throw new Error("No pages found. Enter your page count instead.");
      setAudit(data);
      change("pages", data.urls.length);
    } catch (e) {
      if (!pending.signal.aborted)
        setError(e instanceof Error ? e.message : "Scan unavailable.");
    } finally {
      if (controller.current === pending) setBusy(false);
    }
  };
  const clearScan = () => {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setAudit(null);
    setError("");
  };
  const brief = [
    "KAMROK — My project flight plan",
    `Project: ${input.kind === "new" ? "New website" : "Redesign"}`,
    `Goal: ${goal || "To discuss"}`,
    input.kind === "redesign" ? `Website: ${site || "Not supplied"}` : "",
    `Planned pages: ${input.pages}${audit ? ` (${audit.urls.length} sitemap URLs found${audit.partial ? ", partial scan" : ""})` : " (manual estimate)"}`,
    `Features: ${
      FEATURES.filter((f) => input.features.includes(f.id))
        .map((f) => f.name)
        .join(", ") || "Business website with contact form"
    }`,
    `Design: ${input.design}. Content: ${input.content}.`,
    `Workload ${estimate.grade}: ${estimate.gradeName}`,
    `First option: ${estimate.recommendation}`,
    estimate.reason,
    `Hosting: ${hosting}. Domain: ${domain}. Care level: ${input.care}.`,
    `Lovable service ceiling: ${money(estimate.lovable.high)}. Maintenance scope and duration to be agreed.`,
    `WordPress uses an illustrative planning rate of ${money(input.rate)}/hour; not a KAMROK quote.`,
    ...(["wordpress", "lovable"] as const).flatMap((platform) => [
      platform === "wordpress"
        ? `WordPress planning estimate: ${money(estimate.wordpress.low)}–${money(estimate.wordpress.high)}`
        : `Lovable project ceiling: ${money(estimate.lovable.high)}`,
      ...estimate[platform].rows.map((r) =>
        platform === "wordpress"
          ? `  ${r.name}: ${Math.ceil(r.hours)} baseline hours`
          : `  ${r.name}`,
      ),
    ]),
    "WordPress range includes up to 50% contingency. Lovable is capped at the selected service ceiling; scope and support duration agreed before booking. Third-party subscriptions, domains, usage and taxes are confirmed separately.",
    "Sitemap review is an inventory, not a design, security or SEO audit.",
    ...(audit
      ? [`Sitemaps read: ${audit.sources.join(", ")}`, ...audit.notes]
      : []),
    "Get ready: logo and brand files; content and photography; domain/hosting access; must-have integrations; launch date; existing analytics and redirect list for a redesign.",
  ]
    .filter(Boolean)
    .join("\n");
  return (
    <WizardFrame
      title="Website Project Planner & Cost Estimator | KAMROK"
      description="Build from scratch or give your website a fresh start. Find your scope, compare WordPress and Lovable, and leave with a useful project brief."
      mode="project"
      steps={[
        "Your idea",
        "Your pages",
        "Your features",
        "Hosting & care",
        "Your plan",
      ]}
      step={step}
      setStep={setStep}
      canContinue={!busy}
      aside={
        <>
          <span className="mission-kicker">YOUR MISSION CONTROL</span>
          <h2>
            {step === 4
              ? "Ready to talk specifics."
              : "Good projects start with good questions."}
          </h2>
          <div className="mission-metric">
            <strong>{input.pages}</strong>
            <span>pages in your plan</span>
          </div>
          <div className="mission-metric">
            <strong>{input.features.length}</strong>
            <span>extra capabilities</span>
          </div>
          <p>
            Estimates are a starting conversation, not a binding quote. You can
            change every choice.
          </p>
          <Link className="mission-text-link" to="/lovable-savings">
            Just here for the savings? <ArrowUpRight size={16} />
          </Link>
        </>
      }
    >
      {step === 0 && (
        <>
          <span className="mission-kicker">01 / CHOOSE YOUR ADVENTURE</span>
          <h2>What are we making?</h2>
          <p>A blank canvas or a well-earned fresh start?</p>
          <div className="mission-choices">
            {(
              [
                {
                  kind: "new",
                  Icon: Rocket,
                  title: "Something new",
                  text: "An idea, a business or a product that needs its own home.",
                },
                {
                  kind: "redesign",
                  Icon: RefreshCw,
                  title: "A fresh start",
                  text: "Keep the good bits. Rethink the site. Plan the move.",
                },
              ] as const
            ).map(({ kind, Icon, title, text }) => (
              <button
                key={kind}
                type="button"
                className="mission-choice"
                aria-pressed={input.kind === kind}
                onClick={() => {
                  change("kind", kind);
                  clearScan();
                }}
              >
                <Icon />
                <strong>{title}</strong>
                <span>{text}</span>
                <span className="mission-choice-status">
                  {input.kind === kind ? "✓ Selected" : "Choose this path"}
                </span>
              </button>
            ))}
          </div>
          <label className="mission-field">
            <span>What should your website do better?</span>
            <textarea
              rows={3}
              maxLength={1200}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="More enquiries, easier bookings, a shop of my own…"
            />
            <small>Optional. This becomes part of your project brief.</small>
          </label>
        </>
      )}
      {step === 1 && (
        <>
          <span className="mission-kicker">02 / GET THE LAY OF THE LAND</span>
          <h2>
            {input.kind === "redesign"
              ? "Let’s explore your existing site."
              : "How much space does your idea need?"}
          </h2>
          {input.kind === "redesign" && (
            <>
              <p>
                We’ll look for your public sitemap and group the pages into a
                rebuild inventory. No login or access to your admin is needed.
              </p>
              <form
                className="mission-scan"
                onSubmit={(e) => {
                  e.preventDefault();
                  void scan();
                }}
              >
                <label className="mission-field">
                  <span>Your website or sitemap address</span>
                  <input
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="yourbusiness.ie"
                    required
                    value={site}
                    onChange={(e) => {
                      clearScan();
                      setSite(e.target.value);
                    }}
                  />
                </label>
                <button
                  className="mission-primary"
                  disabled={busy || !site.trim()}
                  type="submit"
                >
                  <Search size={17} />
                  {busy ? "Exploring the sitemap…" : "Explore my site"}
                </button>
              </form>
              <p className="mission-small">
                Checks robots.txt and common sitemap locations. Up to 10 sitemap
                files / 300 pages, on the same website. Usually under 20
                seconds.
              </p>
              {busy && (
                <p role="status" className="mission-notice">
                  Following the map. Larger sites may produce a partial
                  inventory.
                </p>
              )}
              {error && (
                <p role="alert" className="mission-notice">
                  {error}
                </p>
              )}
              {audit && (
                <div className="mission-scan-result" role="status">
                  <div className="mission-kicker">
                    {audit.partial
                      ? "PARTIAL SITEMAP INVENTORY"
                      : "SITEMAP INVENTORY FOUND"}
                  </div>
                  <h3>{audit.urls.length} public page URLs found.</h3>
                  <ul>
                    {audit.groups.map((g) => (
                      <li key={g.name}>
                        <span>{g.name}</span>
                        <strong>{g.count}</strong>
                      </li>
                    ))}
                  </ul>
                  {audit.notes.map((n) => (
                    <p className="mission-small" key={n}>
                      {n}
                    </p>
                  ))}
                  <details>
                    <summary>See the sitemap evidence</summary>
                    {audit.sources.map((s) => (
                      <p key={s} className="mission-small">
                        {s}
                      </p>
                    ))}
                    <ul>
                      {audit.urls.slice(0, 20).map((u) => (
                        <li key={u}>{new URL(u).pathname || "/"}</li>
                      ))}
                    </ul>
                    {audit.urls.length > 20 && (
                      <p className="mission-small">First 20 URLs shown.</p>
                    )}
                  </details>
                </div>
              )}
            </>
          )}
          <NumberField
            label={
              audit
                ? "Pages to include in the new site"
                : "Estimated number of pages"
            }
            value={input.pages}
            min={1}
            max={500}
            unit="number"
            increment={1}
            presets={[5, 10, 25, 50, 100, 300]}
            onChange={(n) => change("pages", Math.round(n))}
            hint="Adjust this to your intended scope. Count products and articles too; repeated content shares templates in the estimate."
          />
          <div className="mission-note">
            <Globe size={20} />
            <p>
              {input.kind === "new"
                ? "A simple five-page start: Home, About, Services, Work and Contact. You can always grow later."
                : "No sitemap? No problem. Tap a page count below and continue. You can refine the plan together later."}
            </p>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <span className="mission-kicker">03 / PICK YOUR SUPERPOWERS</span>
          <h2>What should it do?</h2>
          <p>
            Pick the possibilities that make your idea yours. A shop, a
            community, a smoother working day — what would make the difference?
          </p>
          <FeaturePicker
            value={input.features}
            onChange={(features) => change("features", features)}
          />
          <ChoiceGroup
            label="What sort of design feels right?"
            value={input.design}
            onChange={(value) =>
              change("design", value as ProjectInput["design"])
            }
            options={[
              {
                value: "starter",
                label: "A strong starting design",
                description: "Make an existing direction feel like my brand.",
              },
              {
                value: "bespoke",
                label: "Something completely bespoke",
                description: "Create a fresh visual direction from scratch.",
              },
            ]}
          />
          <ChoiceGroup
            label="How ready are your words and pictures?"
            value={input.content}
            onChange={(value) =>
              change("content", value as ProjectInput["content"])
            }
            options={[
              { value: "ready", label: "Ready to go" },
              { value: "refresh", label: "Need a tidy-up" },
              { value: "new", label: "Help me create them" },
            ]}
          />
        </>
      )}
      {step === 3 && (
        <>
          <span className="mission-kicker">04 / YOUR WEBSITE’S HOME</span>
          <h2>We’ll make the technical bits simple.</h2>
          <p>Choose what you already have and where you’d like a hand.</p>
          <WebsiteHomeChoices
            hosting={hosting}
            domain={domain}
            onHosting={setHosting}
            onDomain={setDomain}
          />
          <LovableCareChoices
            value={input.care}
            onChange={(value) => {
              if (value !== "diy") change("care", value);
            }}
          />
        </>
      )}
      {step === 4 && (
        <>
          <span className="mission-kicker">05 / YOUR FLIGHT PLAN</span>
          <div className="mission-grade">
            <strong>{estimate.grade}</strong>
            <div>
              <span>REBUILD WORKLOAD</span>
              <h2>{estimate.gradeName}</h2>
              <p>
                A = focused · B = growing · C = substantial · D = discovery
                first
              </p>
            </div>
          </div>
          <p className="mission-small">
            A workload guide based on page count and your selected features, not
            a grade for the quality of your current website.
            {audit?.partial
              ? " Your sitemap scan was partial; confirm the scope before relying on the estimate."
              : ""}
          </p>
          <div className="mission-recommendation">
            <Sparkles />
            <div>
              <span>OUR FIRST DIRECTION</span>
              <h3>{estimate.recommendation}</h3>
              <p>{estimate.reason}</p>
            </div>
          </div>
          <div className="mission-price-grid">
            {(["wordpress", "lovable"] as const).map((platform) => (
              <article className="mission-price" key={platform}>
                <span>
                  {platform === "wordpress" ? "WORDPRESS" : "LOVABLE"}
                </span>
                <h3>
                  {platform === "lovable"
                    ? `Up to ${money(estimate.lovable.high)}`
                    : `${money(estimate.wordpress.low)}–${money(estimate.wordpress.high)}`}
                </h3>
                <p>
                  {platform === "lovable"
                    ? `${input.care === "managed" ? "More managed" : "Lighter"} care · KAMROK project ceiling`
                    : "Illustrative WordPress planning estimate"}
                </p>
                <details>
                  <summary>See the work behind the number</summary>
                  <ul>
                    {estimate[platform].rows.map((row) => (
                      <li key={row.name}>
                        <span>{row.name}</span>
                        <strong>
                          {platform === "wordpress" ? (
                            `${Math.ceil(row.hours)}h`
                          ) : (
                            <Check size={16} />
                          )}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <p className="mission-small">
                    {platform === "wordpress"
                      ? `${estimate.wordpress.hours} baseline hours at an illustrative €65/hour, plus up to 50% contingency. This is not a fixed WordPress quote.`
                      : "Your selected service is capped at this amount. We agree the project scope and maintenance duration before booking; larger projects may be planned in phases within that scope."}
                  </p>
                </details>
                <p className="mission-small">
                  {platform === "wordpress"
                    ? "Budget separately for hosting, theme/plugin licences, maintenance and domains."
                    : "Your Lovable plan, domain, usage and outside services are separate. The agreed care level is part of your KAMROK package. A DIY starter avoids the build fee if you prefer to do it yourself."}
                </p>
              </article>
            ))}
          </div>
          <LovableBenefits />
          <p className="mission-notice">
            Final scope, taxes and third-party costs are confirmed before
            booking. Complex commerce, multilingual content, existing data,
            custom integrations and specialist functionality need discovery.
            Sitemap counts don’t reveal every task. Subscriptions, licences,
            external services, photography, payment processing and taxes are
            additional.
          </p>
          <h3>Pack these for the first conversation.</h3>
          <ul className="mission-checklist">
            <li>Your logo, brand files and any inspiration</li>
            <li>Draft copy, photography and the pages you need</li>
            <li>Must-have tools, a launch window and a comfortable budget</li>
            {input.kind === "redesign" && (
              <li>
                Existing analytics, content exports and a list of URLs to
                preserve
              </li>
            )}
          </ul>
          <div className="mission-actions">
            <button
              className="mission-primary"
              onClick={() => downloadBrief("my-kamrok-project-plan.txt", brief)}
            >
              <Download size={17} /> Download my brief
            </button>
            <a
              className="mission-secondary"
              href={`mailto:cormac@kamrok.com?subject=${encodeURIComponent("My website project plan")}&body=${encodeURIComponent(brief)}`}
            >
              Discuss this plan <ArrowUpRight size={17} />
            </a>
            <Link
              className="mission-text-link"
              to={`/lovable-savings?websiteQuote=${Math.round((estimate.wordpress.low + estimate.wordpress.high) / 2)}`}
            >
              Explore the DIY Lovable route <ArrowUpRight size={17} />
            </Link>
          </div>
          <p className="mission-small">
            “Discuss this plan” opens an email draft for you to review and send.
          </p>
        </>
      )}
    </WizardFrame>
  );
}
