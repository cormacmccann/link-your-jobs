import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, Download, ExternalLink, MessageCircle, Monitor, RotateCcw, Smartphone, WandSparkles } from "lucide-react";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import BrandMascot from "@/components/kamrok/BrandMascot";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import { SITE_TEMPLATES, renderTemplate, type SiteTemplate } from "@/data/templates";
import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";
import "@/styles/templates.css";

export default function Templates() {
  const [selected, setSelected] = useState(SITE_TEMPLATES[0]);
  const [brand, setBrand] = useState(selected.brand);
  const [headline, setHeadline] = useState(selected.headline);
  const [accent, setAccent] = useState(selected.accent);
  const [mobile, setMobile] = useState(false);
  const [notice, setNotice] = useState("");
  const editor = useRef<HTMLElement>(null);
  const choose = (template: SiteTemplate) => {
    setSelected(template); setBrand(template.brand); setHeadline(template.headline); setAccent(template.accent); setNotice("");
    editor.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    editor.current?.focus({ preventScroll: true });
  };
  const html = renderTemplate(selected, brand, headline, accent);
  const download = () => {
    const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = `${selected.id}-my-remix.html`; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Your HTML download is ready. Replace the sample content and contact details before publishing.");
  };
  return <KamrokLayout title="Lovable Templates & Website Starters | KAMROK" description="Explore Takeaway Hub, a Lovable starter for food businesses, alongside free website templates you can customise and download.">
    <div className="template-heading"><span className="orbit-eyebrow">A HEAD START. YOUR OWN DIRECTION.</span><h1>Start somewhere.<br /><em>Make it yours.</em></h1><p className="kk-lead-text">A starting point with a bit of ambition. Explore a ready-made Lovable project or personalise a free website starter, then make it your own.</p><span className="template-format">Lovable projects + free HTML starters</span></div>
    <section className="template-featured" aria-labelledby="takeaway-title">
      <Link className="template-featured-image" to="/templates/takeaway-hub" aria-label="Explore Takeaway Hub"><img src="/templates/takeaway-hub/preview.webp" alt="Takeaway Hub demo with food photography, a digital menu and a clear ordering action" width="1420" height="1004" /></Link>
      <div><span className="orbit-eyebrow">FEATURED LOVABLE STARTER · FOOD & HOSPITALITY</span><h2 id="takeaway-title">Your menu.<br />Your takeaway hub.</h2><p>Give your food business its own home online. Start with Takeaway Hub, then make the branding, menu, opening hours and delivery information yours in Lovable.</p><ul><li>Digital menu</li><li>Food photography</li><li>Opening hours</li><li>Delivery information</li></ul>
        <div className="template-featured-price"><strong>Lovable Pro from US$25 / month</strong><small>Includes connecting your own domain. Lovable subscription paid separately; domain registration, usage and payment-provider costs may be additional. Local currency and taxes are confirmed by Lovable. Price checked October 2026.</small></div>
        <div className="template-featured-actions"><Link className="orbit-button cinematic-action" to="/templates/takeaway-hub">Explore Takeaway Hub <ActionFeedback icon={ExternalLink} /></Link><a className="orbit-text-link cinematic-action" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">Get started with Lovable <ActionFeedback icon={WandSparkles} /></a></div>
        <p className="template-help">Lovable sign-up uses my affiliate link. Want help making this your own? <Link to="/contact?service=Takeaway%20Hub%20template">Talk to me about your takeaway.</Link></p>
      </div>
    </section>
    <h2 className="template-collection-title">Free website starters</h2>
    <div className="template-grid">
      {SITE_TEMPLATES.map(template => <article className="template-card" key={template.id}>
        <div className="template-thumbnail" aria-hidden="true"><iframe tabIndex={-1} sandbox="" title={`${template.name} design thumbnail`} srcDoc={renderTemplate(template, template.brand, template.headline, template.accent)} loading="lazy" /></div>
        <div className="template-card-copy"><span className="orbit-eyebrow">{template.category}</span><h2>{template.name}</h2><p>{template.description}</p><button className="orbit-text-link cinematic-action" onClick={() => choose(template)}>Remix this template <ActionFeedback icon={WandSparkles} /></button></div>
      </article>)}
    </div>
    <section className="template-editor" ref={editor} tabIndex={-1} aria-labelledby="remix-heading">
      <div className="template-editor-heading"><div><span className="orbit-eyebrow">YOUR VERSION OF {selected.name.toUpperCase()}</span><h2 id="remix-heading">A little more you.</h2></div><div className="template-device-controls" role="group" aria-label="Preview width"><button aria-label="Desktop preview" aria-pressed={!mobile} onClick={() => setMobile(false)}><Monitor size={18} /></button><button aria-label="Mobile preview" aria-pressed={mobile} onClick={() => setMobile(true)}><Smartphone size={18} /></button></div></div>
      <div className="template-editor-layout"><div className="template-controls">
        <label>Your name or business<input value={brand} onChange={event => setBrand(event.target.value)} maxLength={60} /></label>
        <label>Your headline<textarea value={headline} onChange={event => setHeadline(event.target.value)} maxLength={140} rows={3} /></label>
        <label className="template-colour">Accent colour<input type="color" value={accent} onChange={event => setAccent(event.target.value)} /></label>
        <button className="orbit-button cinematic-action" onClick={download}>Download your remix <ActionFeedback icon={Download} direction="down" /></button>
        <button className="orbit-text-link cinematic-action" onClick={() => choose(selected)}>Reset this design <ActionFeedback icon={RotateCcw} /></button>
        <p className="template-help">A single HTML file you can open in a browser and edit in a code editor. Sample text and contact details need replacing before you publish. This is a visual starter, with no backend or forms connected.</p>
        <p className="template-notice" role="status">{notice}</p>
      </div><div className={`template-live-preview${mobile ? " is-mobile" : ""}`}><iframe title={`Your ${selected.name} remix preview`} sandbox="" srcDoc={html} /></div></div>
    </section>
    <section className="template-help-section"><div><span className="orbit-eyebrow">A STARTING POINT, NOT THE FINISH LINE</span><h2>Want to take it further?</h2><p>I can shape the design around your brand, connect the functionality and help you launch.</p><Link className="orbit-text-link cinematic-action" to="/contact?service=Template%20customisation">Make it work for your business <ActionFeedback icon={MessageCircle} /></Link></div><div><h3>Building with Lovable?</h3><p>Takeaway Hub is a Lovable project. Orbit, Form and Signal are standalone HTML starters you can customise here and download. Choose the starting point that fits your idea.</p><a className="orbit-text-link cinematic-action" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">Explore Lovable <ActionFeedback icon={Code2} /></a><small>Affiliate link</small><BrandMascot pose="front" className="brand-mascot--templates" /></div></section>
  </KamrokLayout>;
}
