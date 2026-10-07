import { Link } from "react-router-dom";
import { LayoutGrid, Plus } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";
import KamrokLayout from "@/components/kamrok/KamrokLayout";

const SERVICES = [
  { name: "Lovable apps & websites", note: "Certified expertise, from the idea to the details", body: "I help turn an early idea into a useful product, or take an existing Lovable build further. We’ll work through the flows, shape the interface and connect the services the product needs.", items: ["Product planning & interface design", "Lovable apps & working prototypes", "Accounts, databases & payments", "Custom features & integrations"] },
  { name: "WordPress & ecommerce", note: "Award-winning design, built for your business", body: "A website should feel like your business and work for the people using it. I design and build bespoke WordPress websites and stores, with content editing your team can manage and performance considered from the start.", items: ["WordPress design & development", "WooCommerce & Shopify stores", "Content structure & technical SEO", "Migrations & improvements"] },
  { name: "Branding, illustration & marketing", note: "A recognisable personality, in every detail", body: "From a hand-drawn illustration to the story behind a campaign, I help your business find a voice people recognise. Brand design, creative direction and marketing thinking come together in work that has personality and a purpose.", items: ["Brand identity & original illustration", "Campaign visuals & creative direction", "Content & conversion strategy", "Interactive design & animation"] },
  { name: "Automations & practical AI", note: "Put the repetitive work in its place", body: "I look at how your business works before adding another tool to the mix. We can connect systems, streamline manual tasks and explore AI features where they solve a real problem.", items: ["Workflow reviews", "Tool & API integrations", "Internal tools & automations", "AI features, prototypes & guidance"] },
  { name: "Fixes, reviews & ongoing support", note: "You don’t have to start again to move forward", body: "Bring the build that’s stuck, the site that needs attention or the question you can’t get a straight answer to. I’ll help identify what needs doing and agree a manageable next step.", items: ["Lovable & WordPress project reviews", "Bug fixes & design refinements", "Performance & accessibility improvements", "Ongoing development & support"] },
];
const PROCESS = [
  { n: "01", h: "Understand", p: "Your goals, your audience and what the project needs to achieve." },
  { n: "02", h: "Design", p: "A clear structure and a visual direction we develop together." },
  { n: "03", h: "Build", p: "Careful development, with performance and accessibility built in." },
  { n: "04", h: "Launch", p: "Final checks, a smooth handover and support for what comes next." },
];

export default function Skills() {
  return (
    <KamrokLayout
      title="Lovable Expert, WordPress Design & Development | KAMROK"
      description="Work with a certified Lovable expert and award-winning WordPress designer. Apps, websites, branding, automations and thoughtful project support."
    >
      <div className="kk-eyebrow">WHAT I CAN HELP WITH</div>
      <h1>Your idea. My sleeves rolled up.</h1>
      <p className="kk-lead-text">A new site, a useful app, a better way of doing things. I bring design and development together, with the right tools for the job.</p>
      <div className="orbit-service-credentials"><a className="orbit-lovable-link" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" aria-label="Explore Lovable — affiliate link"><img src="/certifications/lovable-expert-website-builder-full-on-light.svg" alt="Lovable certified expert website builder" width="615" height="176" /></a><p>WordPress design recognised at the Business Awards<br /><strong>Best Use of Internet Technology</strong></p></div>
      <div>
        {SERVICES.map((service) => (
          <details className="studio-service" key={service.name}>
            <summary className="cinematic-action"><span>{service.name}<small>{service.note}</small></span><ActionFeedback icon={Plus} direction="down" /></summary>
            <p>{service.body}</p>
            <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        ))}
      </div>
      <h2 className="kk-sub">A straightforward process</h2>
      <div className="kk-process">
        {PROCESS.map((step) => <div className="kk-step" key={step.n}><span className="kk-step__n">{step.n}</span><div><h3>{step.h}</h3><p>{step.p}</p></div></div>)}
      </div>
      <Link className="kk-cta cinematic-action" to="/work">See the work <ActionFeedback icon={LayoutGrid} /></Link>
    </KamrokLayout>
  );
}
