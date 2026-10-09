import {
  Globe,
  Server,
  HeartHandshake,
  Code2,
  WandSparkles,
  Layers,
} from "lucide-react";
import { ChoiceGroup } from "./WizardFrame";
import { LOVABLE_PACKAGES, money, type CareLevel } from "@/lib/planner/model";

export function LovableCareChoices({
  value,
  onChange,
  includeDIY = false,
}: {
  value: CareLevel | "diy";
  onChange: (value: CareLevel | "diy") => void;
  includeDIY?: boolean;
}) {
  return (
    <fieldset className="mission-choice-group">
      <legend>How much support would you like?</legend>
      <div className="mission-care-options">
        {includeDIY && (
          <button
            type="button"
            aria-pressed={value === "diy"}
            onClick={() => onChange("diy")}
          >
            <WandSparkles />
            <strong>Do it myself</strong>
            <span>Start with a template and make it yours.</span>
            <b>€0 build fee</b>
          </button>
        )}
        {LOVABLE_PACKAGES.map((tier) => (
          <button
            key={tier.id}
            type="button"
            aria-pressed={value === tier.id}
            onClick={() => onChange(tier.id)}
          >
            <HeartHandshake />
            <strong>{tier.name}</strong>
            <span>{tier.description}</span>
            <b>Up to {money(tier.cap)}</b>
          </button>
        ))}
      </div>
      <p className="mission-small">
        KAMROK project-price ceilings. The maintenance scope and duration are
        agreed with you before booking. Lovable subscriptions, domains and usage
        are separate.
      </p>
    </fieldset>
  );
}
export function HostingExplainer() {
  return (
    <div className="mission-service-glossary">
      <article>
        <Server />
        <div>
          <h3>Hosting</h3>
          <p>
            The home for your website’s files and data, keeping it online so
            people can visit. Lovable can host your site; WordPress needs a
            hosting plan.
          </p>
        </div>
      </article>
      <article>
        <Globe />
        <div>
          <h3>Your domain</h3>
          <p>
            Your address on the internet, like yourbusiness.ie. You register it
            and renew it, usually each year. We can help connect one you own or
            set up a new one.
          </p>
        </div>
      </article>
      <article>
        <HeartHandshake />
        <div>
          <h3>Ongoing care</h3>
          <p>
            Help after launch: updates, changes and keeping things running. We
            agree what you need and how long the support lasts before you
            commit.
          </p>
        </div>
      </article>
    </div>
  );
}
export function WebsiteHomeChoices({
  hosting,
  domain,
  onHosting,
  onDomain,
}: {
  hosting: string;
  domain: string;
  onHosting: (value: string) => void;
  onDomain: (value: string) => void;
}) {
  return (
    <>
      <HostingExplainer />
      <ChoiceGroup
        label="Where will your website live?"
        value={hosting}
        onChange={onHosting}
        options={[
          {
            value: "help",
            label: "Set it up for me",
            description: "Help choose and connect the right hosting.",
          },
          {
            value: "existing",
            label: "I already have hosting",
            description: "Check whether it suits the new website.",
          },
          {
            value: "unsure",
            label: "Guide me",
            description: "Choose the best fit together.",
          },
        ]}
      />
      <ChoiceGroup
        label="Do you have a website address?"
        value={domain}
        onChange={onDomain}
        options={[
          { value: "existing", label: "Yes, keep my domain" },
          { value: "new", label: "I need a new domain" },
          { value: "unsure", label: "Help me decide" },
        ]}
      />
    </>
  );
}
export function LovableBenefits() {
  return (
    <div className="mission-benefits">
      <h3>Why build with Lovable?</h3>
      <div>
        <Code2 />
        <p>
          <strong>Your project, your code.</strong> A website you can continue
          to develop and connect to Git.
        </p>
      </div>
      <div>
        <WandSparkles />
        <p>
          <strong>Keep improving it.</strong> Change content and explore new
          features through a conversation.
        </p>
      </div>
      <div>
        <Layers />
        <p>
          <strong>Room to grow.</strong> Start with a website and add accounts,
          dashboards or connected tools as you need them.
        </p>
      </div>
    </div>
  );
}
