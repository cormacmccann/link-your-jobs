import { Link } from "react-router-dom";
import KamrokLayout from "@/components/kamrok/KamrokLayout";

const SERVICES = [
  { name: "Web design & development", note: "From a first impression to a finished website", body: "Thoughtful interfaces, clear content and fast, responsive websites. We handle the design and build together, so the finished result feels considered at every size.", items: ["Website & interface design", "Custom React development", "Animation & interactive 3D", "Accessibility & performance"] },
  { name: "Brand identity", note: "A consistent look, wherever people find you", body: "Logos, typography and a visual language that carries your business across your website, print and everyday communications.", items: ["Logos & wordmarks", "Colour & typography", "Brand guidelines", "Digital & print assets"] },
  { name: "WordPress & ecommerce", note: "Sites your team can make their own", body: "Bespoke WordPress websites and stores, with straightforward editing and room to grow. We also help with migrations and improvements to existing sites.", items: ["WordPress themes & blocks", "WooCommerce & Shopify", "Content management", "Migrations, speed & maintenance"] },
  { name: "Products & custom tools", note: "Make an idea useful", body: "From an early prototype to an application people use every day. We build products, internal tools and automations around the way your business works.", items: ["MVPs & prototypes", "Full-stack applications", "Payments & integrations", "Workflow automation"] },
  { name: "Search & measurement", note: "Help people find you, then understand what works", body: "Practical foundations for visibility and measurement, from technical SEO to analytics and your local business presence.", items: ["SEO & technical audits", "Google Analytics & Search Console", "Business Profile & local search", "Google Workspace setup"] },
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
      title="Services — Web Design, Branding & Development | KAMROK"
      description="Web design, branding, WordPress, ecommerce and custom software. Design and development from KAMROK in Dundalk, Ireland."
    >
      <div className="kk-eyebrow">WHAT WE DO</div>
      <h1>Good ideas, brought to life.</h1>
      <p className="kk-lead-text">From a new identity to a website or a complete digital product. We make things that look right, work well and support your business.</p>
      <div>
        {SERVICES.map((service) => (
          <details className="studio-service" key={service.name}>
            <summary><span>{service.name}<small>{service.note}</small></span></summary>
            <p>{service.body}</p>
            <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </details>
        ))}
      </div>
      <h2 className="kk-sub">A straightforward process</h2>
      <div className="kk-process">
        {PROCESS.map((step) => <div className="kk-step" key={step.n}><span className="kk-step__n">{step.n}</span><div><h3>{step.h}</h3><p>{step.p}</p></div></div>)}
      </div>
      <Link className="kk-cta" to="/work">See the work ↗</Link>
    </KamrokLayout>
  );
}
