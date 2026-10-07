export type SiteTemplate = {
  id: string;
  name: string;
  category: string;
  description: string;
  brand: string;
  headline: string;
  accent: string;
  background: string;
  foreground: string;
};

export const SITE_TEMPLATES: SiteTemplate[] = [
  { id: "orbit", name: "Orbit", category: "Creative portfolio", description: "A dark, spacious introduction for independent creatives.", brand: "YOUR STUDIO", headline: "Ideas worth putting into the world.", accent: "#a5e3d2", background: "#080d19", foreground: "#fff4df" },
  { id: "form", name: "Form", category: "Services & studios", description: "Warm editorial typography with a clear route to an enquiry.", brand: "FORM STUDIO", headline: "Good thinking. Beautifully made.", accent: "#6530a2", background: "#f6efdf", foreground: "#25212e" },
  { id: "signal", name: "Signal", category: "Product launch", description: "A bold starting point for your next product or big idea.", brand: "SIGNAL", headline: "A small idea. A whole new possibility.", accent: "#f9a6cd", background: "#171020", foreground: "#fff5e8" },
];

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]!));

/** A standalone starter: no scripts, remote assets, tracking or external dependencies. */
export function renderTemplate(template: SiteTemplate, brand: string, headline: string, accent: string) {
  const safeAccent = /^#[\da-f]{6}$/i.test(accent) ? accent : template.accent;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(brand)}</title>
<style>
*{box-sizing:border-box}h1,h2,h3,h4,h5,h6{text-transform:uppercase}html{scroll-behavior:smooth}body{margin:0;background:${template.background};color:${template.foreground};font:16px/1.7 Arial,sans-serif}a{color:inherit}header,main,footer{max-width:1180px;margin:auto;padding:28px 6%}header{display:flex;justify-content:space-between;gap:24px;align-items:center;border-bottom:1px solid currentColor}header strong{letter-spacing:.1em;font-size:13px}nav{display:flex;gap:24px;font-size:13px}nav a{text-decoration:none}.hero{position:relative;isolation:isolate;min-height:620px;display:flex;flex-direction:column;justify-content:center;padding:70px 0;overflow:hidden}.eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:${safeAccent}}h1{font-family:${template.id === "form" ? "Georgia,serif" : "Arial,sans-serif"};font-size:clamp(44px,7vw,88px);line-height:1.06;letter-spacing:-.055em;max-width:820px;margin:20px 0 28px;font-weight:${template.id === "form" ? "400" : "700"}}.hero p:not(.eyebrow){max-width:470px;opacity:.75}.cta{display:inline-block;align-self:flex-start;margin-top:20px;padding:14px 24px;background:${safeAccent};color:${template.id === "form" ? "#fff" : "#12121a"};font-weight:bold;text-decoration:none;border-radius:2px}.art{position:absolute;z-index:-1;right:-140px;top:80px;width:440px;height:440px;border:1px solid ${safeAccent};border-radius:${template.id === "signal" ? "28%" : "50%"};transform:rotate(-25deg);opacity:.25;box-shadow:inset 40px 0 100px ${safeAccent}44,0 0 100px ${safeAccent}18}.art:after{content:"";position:absolute;inset:35px;border:1px solid ${safeAccent};border-radius:inherit}section{padding:64px 0;border-top:1px solid #8885}h2{font-size:32px;line-height:1.2;letter-spacing:-.03em}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px}.grid article{padding-top:18px;border-top:2px solid ${safeAccent}}.grid p{opacity:.75}footer{border-top:1px solid #8885;font-size:12px;opacity:.7}a:focus-visible{outline:3px solid ${safeAccent};outline-offset:6px}@media(max-width:600px){.hero{min-height:560px}.grid{grid-template-columns:1fr}header,main,footer{padding-inline:7%}.art{right:-280px}nav{gap:14px}}@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
</style></head><body>
<header><strong>${escapeHtml(brand)}</strong><nav aria-label="Main navigation"><a href="#about">About</a><a href="#contact">Contact</a></nav></header>
<main><div class="hero"><div class="art" aria-hidden="true"></div><p class="eyebrow">${escapeHtml(template.category)}</p><h1>${escapeHtml(headline)}</h1><p>A fresh perspective. A thoughtful approach. Something that feels like you. Replace this introduction with your own story.</p><a class="cta" href="#contact">Let’s talk ↗</a></div>
<section id="about"><p class="eyebrow">Make it your own</p><h2>Good things start here.</h2><div class="grid"><article><h3>Your first offering</h3><p>Explain what you do and how it helps the people you want to reach.</p></article><article><h3>Your approach</h3><p>Share what makes working with you different, in your own words.</p></article><article><h3>Your next chapter</h3><p>Add a project, a product or a story that gives visitors a reason to care.</p></article></div></section>
<section id="contact"><p class="eyebrow">Your next move</p><h2>Start a conversation.</h2><p>Replace this text with your email address or booking link before publishing.</p></section></main>
<footer>${escapeHtml(brand)} · Adapted from a KAMROK starter.</footer></body></html>`;
}
