import { useRef, useState } from "react";
import { Link } from "@/lib/router-compat";
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
      <div className="template-featured-topline"><span className="orbit-eyebrow">FEATURED STARTER / 01</span><span>FOOD & HOSPITALITY · BUILT WITH LOVABLE</span></div>
      <div className="template-featured-main">
        <div className="template-featured-copy">
          <h2 id="takeaway-title">Your menu.<br /><em>Your takeaway hub.</em></h2>
          <p className="template-featured-intro">Your website. Your order system. Your name above the door. Make the menu, branding and delivery experience yours, then host it on Lovable.</p>
          <div className="template-commission"><strong>0%</strong><div><span>COMMISSION</span><p>Every order. Zero KAMROK cut.</p></div></div>
          <p className="template-fee-promise">No hidden design fees.<br />No hidden website build fees.</p>
          <div className="template-featured-actions"><Link className="orbit-button cinematic-action" to="/templates/takeaway-hub">Explore Takeaway Hub <ActionFeedback icon={ExternalLink} /></Link><a className="orbit-text-link cinematic-action" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">Make it yours <ActionFeedback icon={WandSparkles} /></a></div>
        </div>
        <div className="template-featured-product">
          <Link className="template-featured-image" to="/templates/takeaway-hub" aria-label="Explore Takeaway Hub"><div className="template-preview-bar"><span><i /><i /><i /></span><span>YOUR NEXT CHAPTER, ONLINE</span><ExternalLink size={13} /></div><img src="/templates/takeaway-hub/website.webp" alt="Takeaway Hub demo with food photography, a digital menu and a clear ordering action" width="1219" height="894" /></Link>
          <div className="template-product-details"><span className="orbit-eyebrow">FROM YOUR MENU TO THEIR FRONT DOOR</span><ul><li>Pizza options & combo deals</li><li>Customer rewards</li><li>Owner controls</li><li>Order timeline</li><li>Individual driver links</li><li>Practical remix guide</li></ul></div>
        </div>
      </div>
      <div className="template-featured-bottom">
        <div className="template-featured-price"><span>YOUR STARTING POINT</span><strong>€0 template.<br />Lovable Pro from US$25<span> / month</span></strong><p>Customise it yourself. Connect your own domain. Pay Lovable directly.</p></div>
        <div className="template-independence"><span>KEEP YOUR INDEPENDENCE</span><h3>Put the budget back into your business.</h3><p>A €500 or €2,000 studio setup quote? This free DIY starter lets you avoid that upfront fee and build it your way.</p><Link className="orbit-text-link cinematic-action" to="/templates/takeaway-hub#compare">Compare the costs & savings <ActionFeedback icon={ExternalLink} /></Link></div>
      </div>
      <div className="template-featured-notes"><p>€0 KAMROK design and build fees for DIY use. Lovable subscription, domain registration, payment processing and extra usage are separate. Optional hands-on help is quoted upfront. Studio quotes are illustrative; DIY takes your time. Local currency and taxes confirmed by Lovable. Price checked October 2026.</p><p>Lovable sign-up uses my affiliate link. <Link to="/contact?service=Takeaway%20Hub%20template">Want a hand making it yours?</Link></p></div>
    </section>
    <div className="template-collection-heading"><div><span className="orbit-eyebrow">MORE WAYS TO START</span><h2 className="template-collection-title">A blank canvas.<br />With a head start.</h2></div><p>Three free website starters. Pick a direction, add your personality and download your own version.</p></div>
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
