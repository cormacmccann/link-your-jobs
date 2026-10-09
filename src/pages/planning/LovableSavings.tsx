import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  Globe,
  Lightbulb,
  Palette,
  ReceiptText,
  Server,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link, useSearchParams } from "@/lib/router-compat";
import {
  WizardFrame,
  NumberField,
  ChoiceGroup,
} from "@/components/planning/WizardFrame";
import { FeaturePicker } from "@/components/planning/FeaturePicker";
import {
  DEFAULT_DIY_COSTS,
  LOVABLE_CAPABILITIES,
  totalDiyCosts,
  type DiyCosts,
} from "@/lib/planner/diy-savings";
import {
  FEATURES,
  money,
  queryAmount,
  type Feature,
} from "@/lib/planner/model";
import { downloadBrief } from "@/lib/planner/download";
import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";

const CHECKED = "8 October 2026";
export default function LovableSavings() {
  const [params] = useSearchParams();
  const quote = params.get("websiteQuote") ?? params.get("currentBuild");
  const imported = quote !== null;
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<DiyCosts>(() => ({
    ...DEFAULT_DIY_COSTS,
    situation: imported ? "new" : "existing",
    studio: imported ? queryAmount(quote, 0) : null,
  }));
  const [themeChoice, setThemeChoice] = useState("unsure");
  const [features, setFeatures] = useState<Feature[]>([]);
  const change = <K extends keyof DiyCosts>(key: K, value: DiyCosts[K]) =>
    setInput((old) => ({ ...old, [key]: value }));
  const totals = totalDiyCosts(input);
  const existing = input.situation === "existing";
  const questions = [
    {
      id: "start",
      label: "Your starting point",
      title: "Your website. Without the studio bill.",
      intro:
        "Let’s look at what you pay, what you need, and what you could build yourself. We’ll explain the Lovable side for you.",
      why: "Starting fresh or rethinking a site you already own? This keeps your previous spending separate from what you might pay next.",
    },
    {
      id: "studio",
      label: "The studio bill",
      title: existing
        ? "How much did you pay to get your site live?"
        : "What’s the studio’s website quote?",
      intro: existing
        ? "Just the one-off design and build fee. We’ll get to hosting, your domain and any theme purchase next."
        : "Use the design and build quote you’re considering. No quote yet? You can skip this.",
      why: existing
        ? "This shows what your last launch cost. Building the next version yourself can avoid another design invoice, but it won’t refund the old one."
        : "We compare this quoted design/build fee with €0 KAMROK design/build fees when you do it yourself. Your own time and platform costs are separate.",
    },
    {
      id: "theme",
      label: "The theme",
      title: existing
        ? "Did you buy a theme, too?"
        : "Does your plan include buying a theme?",
      intro:
        "A WordPress theme, a template or a design kit. Only add a separate purchase here.",
      why: "You can start from a free KAMROK starter or build your own design with Lovable. You don’t need to buy a WordPress theme. If the theme is already in the studio fee, don’t count it twice.",
    },
    {
      id: "hosting",
      label: "Hosting",
      title: "What do you pay to keep the site online?",
      intro:
        "Hosting is the home for your website. Check the bill, choose monthly or yearly, then tap the amount.",
      why: "We add up the hosting cost over a year. If your bill bundles support or a domain, enter the bundle here and choose €0 for those items later.",
    },
    {
      id: "domain",
      label: "Your domain",
      title: "And your website address?",
      intro:
        "Yourbusiness.ie, for example. What does it cost to renew your domain each year?",
      why: "You can keep your domain when you move. Its renewal still needs paying, so we carry it forward rather than claiming it as a saving.",
    },
    {
      id: "support",
      label: "Ongoing studio fees",
      title: "Does the studio send a regular bill?",
      intro:
        "Maintenance, small changes or a support retainer. Add only costs not already included in your hosting bill.",
      why: "With DIY, you take on the updates and checks yourself. This shows the paid support you could reconsider, provided you’re comfortable doing that work.",
    },
    {
      id: "tools",
      label: "Paid extras",
      title: "Any plugins or tools on top?",
      intro:
        "Add up yearly subscriptions for forms, bookings, themes, ecommerce plugins or other website tools. Leave out payment transaction fees.",
      why: "Your new site may replace some of these tools, but you may keep others. We’ll show this bill separately and explain what each feature needs.",
    },
    {
      id: "features",
      label: "Your wish list",
      title: "What would you love your website to do?",
      intro:
        "Bookings? A shop? A private customer area? Pick what matters. We’ll show how you can build it with Lovable.",
      why: "This becomes your personal feature checklist and starter prompt. These are things you can build and connect, not ready-made features switched on automatically.",
    },
  ];
  const question = questions[step];
  const fieldKey =
    question &&
    ["studio", "hosting", "domain", "support", "tools"].includes(question.id)
      ? (question.id as "studio" | "hosting" | "domain" | "support" | "tools")
      : null;
  const selected = FEATURES.filter((f) => features.includes(f.id));
  const costLabel = (value: number | null) =>
    value === null ? "Not entered" : money(value);
  const starter = [
    "Build a responsive website for [my business name and what it does].",
    "Use my branding, clear navigation, accessible layouts, a contact form and search-friendly page structure.",
    ...selected.map(
      (f) =>
        `Add ${f.name.toLowerCase()}: ${LOVABLE_CAPABILITIES[f.id].detail} ${LOVABLE_CAPABILITIES[f.id].setup}`,
    ),
    "Ask me for my real business content, opening hours, service area and contact details. Do not invent testimonials or business claims.",
    "Build in small steps. Explain which integrations, accounts and paid services I need before adding them. Start with a free lovable.app preview. Test forms, permissions and checkout where relevant before accepting real customer data or payments.",
  ].join("\n\n");
  const brief = [
    "KAMROK — Your DIY Lovable plan",
    `Context: ${existing ? "existing website; launch invoices are historical" : "new website; launch costs are quoted/planned"}.`,
    `Design/build: ${costLabel(input.studio)}. Separate theme purchase: ${costLabel(input.theme)}.`,
    `Hosting: ${costLabel(input.hosting)} ${input.hostingPeriod}. Domain: ${costLabel(input.domain)} yearly.`,
    `Support: ${costLabel(input.support)} ${input.supportPeriod}. Other tools: ${costLabel(input.tools)} yearly.`,
    `Entered launch fees: ${money(totals.launch)}. Entered annual running bills: ${money(totals.annual)}. ${totals.missing} cost items not entered.`,
    "DIY KAMROK design/build fee: €0. Free starters require your own customisation and testing. Your time is not priced here.",
    "Start on Lovable Free within its credit and usage limits using a lovable.app address. A custom domain needs a paid plan. Pro starts at US$25/month; annual billing starts at US$250/year. Local currency, taxes, usage and connected services may add cost. Domain renewals continue. No EUR/USD conversion or net saving is claimed.",
    `Sources checked ${CHECKED}: https://lovable.dev/pricing and https://docs.lovable.dev/introduction/subscription-plans`,
    "\nYOUR STARTER PROMPT\n",
    starter,
  ].join("\n");
  const freeLink = (
    <a
      className="mission-primary"
      href={LOVABLE_AFFILIATE_URL}
      target="_blank"
      rel="sponsored noopener noreferrer"
    >
      Start building free <ArrowUpRight size={17} />
    </a>
  );
  return (
    <WizardFrame
      title="Switch to Lovable — Your DIY Website Plan | KAMROK"
      description="Add your current website bills, choose your features and discover your DIY Lovable route with €0 KAMROK design and build fees."
      mode="savings"
      conversational
      steps={[...questions.map((q) => q.label), "Your DIY plan"]}
      step={step}
      setStep={setStep}
      finalAction={freeLink}
      aside={
        <>
          <span className="mission-kicker">
            BUILD IT YOURSELF. MAKE IT YOURS.
          </span>
          <h2>Your ideas don’t need another studio invoice.</h2>
          <div className="diy-aside-zero">
            <strong>€0</strong>
            <span>
              KAMROK design & build fees
              <br />
              when you do it yourself
            </span>
          </div>
          <p>
            Start free with Lovable or a free KAMROK starter. We’ll show what
            your chosen features need, and what still costs money.
          </p>
          <div className="savings-receipt">
            <Check size={18} />
            <span>
              Your bills, your feature checklist and a starter prompt to help
              you get moving.
            </span>
          </div>
          <p className="mission-small">
            Your own domain needs a paid Lovable plan. Domain renewal, usage and
            connected services may add cost.
          </p>
          <Link className="mission-text-link" to="/templates">
            Explore free starters <ArrowUpRight size={16} />
          </Link>
        </>
      }
    >
      {question ? (
        <>
          <span className="mission-kicker savings-chapter">
            <Sparkles size={16} /> {String(step + 1).padStart(2, "0")} /{" "}
            {step === 7 ? "YOUR POSSIBILITIES" : "YOUR WEBSITE TODAY"}
          </span>
          <h2>{question.title}</h2>
          <p className="savings-intro">{question.intro}</p>
          <div className="savings-why">
            <Lightbulb size={21} />
            <p>
              <strong>Why we’re asking</strong>
              {question.why}
            </p>
          </div>
          {question.id === "start" && (
            <ChoiceGroup
              label="Where are you starting?"
              value={input.situation}
              onChange={(value) =>
                change("situation", value as DiyCosts["situation"])
              }
              options={[
                {
                  value: "existing",
                  label: "I already have a website",
                  description: "Look at what it cost and what I pay now.",
                },
                {
                  value: "new",
                  label: "I’m planning a new build",
                  description: "Compare the quote and bills I expect.",
                },
              ]}
            />
          )}
          {question.id === "studio" && imported && (
            <p className="mission-notice">
              Your project-planner estimate is here as a future quote, not a
              bill you have already paid.
            </p>
          )}
          {question.id === "theme" && (
            <>
              <ChoiceGroup
                label={
                  existing
                    ? "Did you pay separately for a theme?"
                    : "Will you pay separately for a theme?"
                }
                value={themeChoice}
                onChange={(value) => {
                  setThemeChoice(value);
                  change("theme", value === "included" ? 0 : null);
                }}
                options={[
                  {
                    value: "yes",
                    label: "Yes, a separate purchase",
                    description: "Add the one-off price below.",
                  },
                  {
                    value: "included",
                    label: "No extra theme fee",
                    description: "Free, or already in the studio price.",
                  },
                  {
                    value: "unsure",
                    label: "I’m not sure",
                    description: "Leave this out for now.",
                  },
                ]}
              />
              {themeChoice === "yes" && (
                <NumberField
                  label="One-off theme purchase"
                  value={input.theme ?? 0}
                  unanswered={input.theme === null}
                  max={1000}
                  increment={10}
                  presets={[0, 50, 100, 200, 300]}
                  onChange={(value) => change("theme", value)}
                  hint="Only the purchase price. Put renewals in the paid extras question."
                />
              )}
            </>
          )}
          {(question.id === "hosting" || question.id === "support") && (
            <ChoiceGroup
              label="How is this billed?"
              value={
                input[
                  question.id === "hosting" ? "hostingPeriod" : "supportPeriod"
                ]
              }
              onChange={(value) =>
                change(
                  question.id === "hosting" ? "hostingPeriod" : "supportPeriod",
                  value as "monthly" | "yearly",
                )
              }
              options={[
                { value: "monthly", label: "Every month" },
                { value: "yearly", label: "Once a year" },
              ]}
            />
          )}
          {fieldKey && (
            <>
              <NumberField
                label={
                  fieldKey === "studio"
                    ? existing
                      ? "Design & build fee you paid"
                      : "Your design & build quote"
                    : fieldKey === "hosting"
                      ? `Hosting per ${input.hostingPeriod === "monthly" ? "month" : "year"}`
                      : fieldKey === "domain"
                        ? "Domain renewal per year"
                        : fieldKey === "support"
                          ? `Studio support per ${input.supportPeriod === "monthly" ? "month" : "year"}`
                          : "Paid tools & renewals per year"
                }
                value={input[fieldKey] ?? 0}
                unanswered={input[fieldKey] === null}
                onChange={(value) => change(fieldKey, value)}
                max={
                  fieldKey === "studio"
                    ? 20000
                    : fieldKey === "domain"
                      ? 500
                      : 3000
                }
                increment={fieldKey === "studio" ? 50 : 5}
                presets={
                  fieldKey === "studio"
                    ? [0, 500, 1500, 2500, 5000, 10000]
                    : fieldKey === "domain"
                      ? [0, 15, 25, 40, 60, 100]
                      : [0, 10, 25, 50, 100, 300]
                }
                hint="Tap €0 if there is no separate charge or it’s already included in another bill. Use consistent tax-inclusive or tax-exclusive amounts."
              />
              <div className="diy-answer-status">
                <span role="status">
                  {input[fieldKey] === null
                    ? "Not entered yet — choose an amount or skip this bill."
                    : `${money(input[fieldKey]!)} recorded`}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    change(fieldKey, null);
                    setStep(step + 1);
                  }}
                >
                  I’m not sure — skip for now <ArrowUpRight size={14} />
                </button>
              </div>
            </>
          )}
          {question.id === "features" && (
            <FeaturePicker
              value={features}
              onChange={setFeatures}
              purpose="diy"
            />
          )}
          <p className="savings-keyhint">
            {step === 7
              ? "Ready? Reveal your DIY plan below."
              : "Your best estimate is fine. Tap OK, next when you’re ready."}
          </p>
        </>
      ) : (
        <>
          <span className="mission-kicker savings-chapter">
            <Sparkles size={16} /> YOUR NEXT WEBSITE. YOUR OWN WAY.
          </span>
          <div className="savings-reveal">
            <div className="savings-reveal-copy">
              <span>Your DIY design & build fee</span>
              <strong>€0</strong>
              <h2>Your ideas. Your website. No studio invoice.</h2>
              <p>
                Build it yourself with Lovable or a free KAMROK starter. No
                KAMROK design, build or theme fee. Your time and platform costs
                are separate.
              </p>
            </div>
            <div className="savings-seal">
              <WandSparkles size={32} />
              <strong>DIY</strong>
              <span>make it yours</span>
            </div>
          </div>
          <div className="mission-actions savings-result-actions">
            {freeLink}
            <button
              className="mission-secondary"
              onClick={() =>
                downloadBrief("my-lovable-starter-plan.txt", brief)
              }
            >
              <Download size={17} /> Get my starter prompt
            </button>
          </div>
          <p className="mission-small">
            “Start building free” uses my Lovable affiliate link. Free-plan
            credit and usage limits apply.
          </p>
          <div className="diy-cost-story">
            <article>
              <ReceiptText size={24} />
              <span>
                {existing
                  ? "What you paid to launch"
                  : "Your quoted launch fees"}
              </span>
              <strong>
                {input.studio === null && input.theme === null
                  ? "Not entered"
                  : money(totals.launch)}
              </strong>
              <p>
                {existing
                  ? "Design/build + separate theme purchase. This is past spending, not money you get back by switching."
                  : "Design/build + separate theme purchase. DIY can avoid these upfront fees if you do the work yourself."}
              </p>
            </article>
            <article>
              <Server size={24} />
              <span>
                {existing
                  ? "Your running bills today"
                  : "Your planned running bills"}
              </span>
              <strong>
                {totals.runningMissing ? "At least " : ""}
                {money(totals.annual)}
                <small>/ year</small>
              </strong>
              <p>
                Hosting, domain, studio support and paid tools.{" "}
                {totals.runningMissing
                  ? "Some bills are unanswered, so this is only a subtotal."
                  : "Based on the amounts you entered."}
              </p>
            </article>
          </div>
          {totals.futureBuildFees > 0 && (
            <p className="mission-notice">
              <strong>
                {money(totals.futureBuildFees)} in quoted upfront fees you could
                avoid.
              </strong>{" "}
              This compares your entered quote with €0 DIY studio/theme fees,
              before Lovable subscription, usage, your time and any services you
              keep.
            </p>
          )}
          <details className="savings-breakdown">
            <summary>See my bills added up</summary>
            <div className="mission-table-wrap">
              <table>
                <caption>Your entered costs · EUR</caption>
                <thead>
                  <tr>
                    <th scope="col">Bill</th>
                    <th scope="col">Amount</th>
                    <th scope="col">When</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Studio design & build</th>
                    <td>{costLabel(input.studio)}</td>
                    <td>{existing ? "Already paid" : "Quoted upfront"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Separate theme purchase</th>
                    <td>{costLabel(input.theme)}</td>
                    <td>{existing ? "Already paid" : "Planned upfront"}</td>
                  </tr>
                  <tr>
                    <th scope="row">Hosting</th>
                    <td>
                      {input.hosting === null
                        ? "Not entered"
                        : money(totals.hosting)}
                    </td>
                    <td>Per year</td>
                  </tr>
                  <tr>
                    <th scope="row">Domain renewal</th>
                    <td>{costLabel(input.domain)}</td>
                    <td>Per year · continues</td>
                  </tr>
                  <tr>
                    <th scope="row">Studio support</th>
                    <td>
                      {input.support === null
                        ? "Not entered"
                        : money(totals.support)}
                    </td>
                    <td>Per year</td>
                  </tr>
                  <tr>
                    <th scope="row">Paid tools & renewals</th>
                    <td>{costLabel(input.tools)}</td>
                    <td>Per year</td>
                  </tr>
                  <tr>
                    <th scope="row">
                      {existing ? "Next 12 months" : "Launch + first 12 months"}
                      {totals.missing > 0 ? " · entered costs only" : ""}
                    </th>
                    <td>{money(totals.firstYear)}</td>
                    <td>
                      {existing
                        ? "Excludes past launch bills"
                        : "Includes quoted launch fees"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mission-small">
              Monthly hosting/support × 12 + yearly domain and tools. New-build
              totals add your quoted launch fees; existing-site totals don’t add
              past invoices. Unknown bills are excluded, not assumed free. These
              are your costs, not a verified provider quote.
            </p>
          </details>
          <section className="diy-feature-plan">
            <span className="mission-kicker">
              YOUR WISH LIST, WITH A WAY FORWARD
            </span>
            <h2>
              {features.length
                ? "Yes — you can build these with Lovable."
                : "Start simple. Grow when you’re ready."}
            </h2>
            <p>
              Lovable can help you build the website and connect the tools
              behind it. You’ll still customise, configure and test the features
              before going live.
            </p>
            <article>
              <Check size={22} />
              <div>
                <h3>Your website essentials</h3>
                <p>
                  Mobile layouts, page content, a contact form and
                  search-friendly structure.
                </p>
                <small>
                  Connect form delivery, check submissions and review your page
                  titles before launch.
                </small>
              </div>
            </article>
            {selected.map((feature) => {
              const capability = LOVABLE_CAPABILITIES[feature.id];
              return (
                <article key={feature.id}>
                  <Check size={22} />
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.detail}</p>
                    <small>{capability.setup}</small>
                    <a
                      href={capability.source}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      How the building blocks work <ArrowUpRight size={13} />
                    </a>
                  </div>
                </article>
              );
            })}
          </section>
          <section className="diy-launch-options">
            <span className="mission-kicker">
              NO GUESSING THE LOVABLE COSTS
            </span>
            <h2>Start free. Bring your domain when you’re ready.</h2>
            <div className="diy-cost-story">
              <article>
                <Palette size={24} />
                <span>Try it & publish a small project</span>
                <strong>Free</strong>
                <p>
                  Start building on Lovable Free and publish to a lovable.app
                  address within the plan’s credit and usage limits. No custom
                  domain on Free.
                </p>
              </article>
              <article>
                <Globe size={24} />
                <span>Use your own website address</span>
                <strong>
                  US$25<small>/ month</small>
                </strong>
                <p>
                  Lovable Pro starts here on monthly billing, or US$250/year
                  with annual billing. Keep paying your domain renewal
                  {input.domain !== null
                    ? ` (${money(input.domain)}/year entered)`
                    : ""}
                  . Local price and tax are confirmed at checkout.
                </p>
              </article>
            </div>
            <p>
              Hosting and backend usage draw on Lovable’s included allowances
              and credits. Extra building, usage, email, booking services or
              ecommerce/payment providers can add costs. Your own time is not
              priced here.
            </p>
            <div className="mission-note">
              <Lightbulb size={22} />
              <p>
                <strong>Where could the savings come from?</strong>
                <br />
                {totals.reviewableAnnual > 0
                  ? `You entered ${money(totals.reviewableAnnual)}/year in hosting, studio support and tools. Review which of those bills you can actually stop paying. `
                  : "DIY can remove a new studio design bill and the need to buy a theme. "}
                Your domain still needs renewing. For lower running bills, the
                Lovable plan, extra usage and any services you keep must cost
                less than the bills they replace. The totals above show your
                entered costs. Net savings depend on your final plan and the
                services you keep.
              </p>
            </div>
            <p className="mission-small">
              Checked {CHECKED}:{" "}
              <a
                href="https://docs.lovable.dev/introduction/subscription-plans"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plans & pricing
              </a>{" "}
              ·{" "}
              <a
                href="https://docs.lovable.dev/features/publish"
                target="_blank"
                rel="noopener noreferrer"
              >
                Publishing
              </a>{" "}
              ·{" "}
              <a
                href="https://docs.lovable.dev/features/custom-domain"
                target="_blank"
                rel="noopener noreferrer"
              >
                Custom domains
              </a>{" "}
              ·{" "}
              <a
                href="https://docs.lovable.dev/introduction/credits-and-usage"
                target="_blank"
                rel="noopener noreferrer"
              >
                Usage
              </a>
            </p>
          </section>
          <div className="mission-actions">
            {freeLink}
            <Link className="mission-secondary" to="/templates">
              Pick a free starter <ArrowUpRight size={17} />
            </Link>
            <button className="mission-text-link" onClick={() => setStep(0)}>
              Review my answers
            </button>
          </div>
        </>
      )}
    </WizardFrame>
  );
}
