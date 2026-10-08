import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SiShopify, SiWordpress } from "react-icons/si";
import { Award, Code2, FileText, LayoutGrid, LifeBuoy, Lightbulb, MessageCircle, MousePointer2, Pause, Play, Plus, Search, Sparkles, UserRound, Workflow } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import SpaceLandscape from "@/components/kamrok/SpaceLandscape";
import ChimpHero from "@/components/kamrok/ChimpHero";
import ScrollFilm from "@/components/kamrok/ScrollFilm";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import Testimonials from "@/components/kamrok/Testimonials";
import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";
import mckHero from "@/assets/mckevitts/hero.png.asset.json";

const SERVICES = [
  { icon: MousePointer2, number: "01", title: "Websites with a point of view.", text: "Distinctive WordPress and Lovable websites that make the right impression, then make the next step easy.", tags: "WEB DESIGN / WORDPRESS / ECOMMERCE" },
  { icon: Code2, number: "02", title: "That app you keep thinking about.", text: "Bring the idea. I’ll help shape the product, design the experience and build it in Lovable, with custom code where it counts.", tags: "LOVABLE / WEB APPS / PROTOTYPES" },
  { icon: Workflow, number: "03", title: "A little less busywork.", text: "Connect the tools you already use. Turn repeated tasks into useful automations and give your team some time back.", tags: "AUTOMATION / INTEGRATIONS / AI" },
  { icon: Sparkles, number: "04", title: "A personality of your own.", text: "Brand identities, original illustration and campaign visuals that tell your story, shaped by a marketer’s understanding of what makes people care.", tags: "BRANDING / ILLUSTRATION / MARKETING" },
];
const FAQ = [
  { q: "Can you help with an unfinished Lovable app?", a: "Absolutely. I’ll start by looking at what you have, what’s working and where you’re stuck. Then we can agree a focused fix, a design refresh or a plan to get the whole thing ready for launch." },
  { q: "WordPress or Lovable — which is right for me?", a: "That depends on what you need the site to do. WordPress is a strong fit for content-led websites and established ecommerce. Lovable is useful for custom apps and interactive products. We’ll choose around your needs, your team and your budget." },
  { q: "What should I budget for a project?", a: "The right budget follows the scope. After an initial conversation, I’ll give you a clear proposal covering the work, the timeline and the price. Smaller reviews and fixes can be scoped separately, so you don’t have to commit to a full rebuild." },
  { q: "How involved will I need to be?", a: "You’ll help set the direction and give feedback at agreed checkpoints. I’ll handle the design and development, show you progress and flag decisions early. You won’t need to learn a new technical language to be part of the process." },
  { q: "What happens after the site launches?", a: "You get a proper handover and guidance on running your site. If you’d like ongoing help, we can agree support for updates, improvements and the ideas that come next." },
  { q: "Do I need a finished brief to get in touch?", a: "No. A rough idea, a link to your current site or a problem you want to solve is enough to start. If you have a deadline or budget range, that helps me give you useful advice from the first conversation." },
];

export default function StudioHome() {
  const { theme } = useStudioTheme();
  const [paused, setPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    document.title = "KAMROK — Lovable Expert & Award-Winning WordPress Designer";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Design for what’s next. Cormac McCann: designer, illustrator, marketer, certified Lovable expert and award-winning WordPress designer. Brands, websites and apps.");
  }, []);

  return (
    <>
      <section className="space-hero" aria-labelledby="home-title">
        <SpaceLandscape paused={paused} />
        <ChimpHero paused={paused} />
        <div className="space-hero-copy studio-container">
          <p className="orbit-eyebrow"><span className="orbit-status-dot" /> INDEPENDENT DESIGN & DIGITAL STUDIO</p>
          <h1 id="home-title">Design for<br /><em>what’s next.</em></h1>
          <p className="space-hero-intro">I’m Cormac. Designer, illustrator and marketer. I bring creative thinking and emerging technology together to build distinctive brands, websites and digital experiences.</p>
          <div className="orbit-actions"><a className="orbit-button cinematic-action" href="#selected-work">Explore the work <ActionFeedback icon={LayoutGrid} direction="down" /></a><Link className="orbit-text-link cinematic-action" to="/contact">Let’s build something <ActionFeedback icon={MessageCircle} /></Link></div>
          <div className="space-hero-platforms" role="group" aria-label="Platforms I build with">
            <a className="space-hero-certified" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" aria-label="Lovable certified expert — explore Lovable (affiliate link)">
              <img src={`/certifications/lovable-expert-app-builder-full-on-${theme}.svg`} alt="Lovable Certified Expert App Builder" width="534" height="176" />
            </a>
            <span className="space-hero-platform space-hero-platform--shopify"><SiShopify aria-hidden="true" /><span>shopify</span></span>
            <span className="space-hero-platform space-hero-platform--wordpress"><SiWordpress aria-hidden="true" /><span>WordPress</span></span>
          </div>
        </div>
        <div className="space-hero-foot studio-container"><a href="#credentials"><span className="space-scroll-line" /> SCROLL TO EXPLORE</a><span className="space-coordinate">DUNDALK, IRELAND · WORKING EVERYWHERE</span><button className="cinematic-action orbit-motion-toggle" onClick={() => setPaused(value => !value)} aria-label={paused ? "Play landscape motion" : "Pause landscape motion"} aria-pressed={paused}><ActionFeedback icon={paused ? Play : Pause} size={14} direction="right" /><span>{paused ? "Still life" : "Slow motion"}</span></button></div>
      </section>

      <section className="orbit-credentials studio-container" id="credentials" aria-label="Credentials">
        <div className="orbit-credential-intro"><span className="orbit-eyebrow">EXPERIENCE & RECOGNITION</span><p>Independent thinking.<br /><strong>Experienced hands.</strong></p></div>
        <a className="orbit-lovable-link" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer" aria-label="Explore Lovable — affiliate link"><img className="orbit-lovable-badge" src={`/certifications/lovable-expert-app-builder-full-on-${theme}.svg`} alt="Lovable certified expert app builder" width="534" height="176" /></a>
        <div className="orbit-award"><Award size={33} strokeWidth={1.3} aria-hidden="true" /><div><span>AWARD-WINNING WORDPRESS DESIGNER</span><strong>Best Use of Internet Technology</strong><small>Business Awards</small></div></div>
      </section>

      <section className="orbit-section studio-container" id="selected-work" aria-labelledby="work-title">
        <div className="orbit-section-heading"><div><span className="orbit-eyebrow">01 / SELECTED WORK</span><h2 id="work-title">Selected work.<br /><em>A closer look.</em></h2></div><Link className="orbit-text-link cinematic-action" to="/work">The whole collection <ActionFeedback icon={LayoutGrid} /></Link></div>
        <div className="orbit-projects">
          <Link className="action-trigger orbit-project orbit-project--club" to="/work/clubrovia"><div className="orbit-project-visual"><span className="orbit-project-tag">OUR OWN PRODUCT</span><img src="/projects/clubrovia/landing.webp" alt="Clubrovia: Less admin. More club. — the connected sports club platform" width="1202" height="827" loading="lazy" /><span className="orbit-project-open cinematic-action"><ActionFeedback icon={FileText} size={21} /></span></div><div className="orbit-project-caption"><div><h3>Clubrovia</h3><p>Less club admin. More time for the game.</p></div><span>PRODUCT DESIGN & BUILD</span></div></Link>
          <Link className="action-trigger orbit-project orbit-project--hotel" to="/work/mckevitts"><div className="orbit-project-visual"><span className="orbit-project-tag">HOSPITALITY</span><img src={mckHero.url} alt="McKevitt’s Village Hotel website overlooking Carlingford" width="1200" height="800" loading="lazy" /><span className="orbit-project-open cinematic-action"><ActionFeedback icon={FileText} size={21} /></span></div><div className="orbit-project-caption"><div><h3>McKevitt’s Village Hotel</h3><p>A proper welcome, before you arrive.</p></div><span>BRANDING & WORDPRESS</span></div></Link>
        </div>
        <div className="orbit-work-note"><span>LOCAL FAVOURITES. AMBITIOUS START-UPS. GOOD PEOPLE.</span><p>Different businesses. The same care in every detail.</p></div>
      </section>

      <section className="orbit-services-band">
        <div className="orbit-section studio-container" aria-labelledby="services-title">
          <div className="orbit-section-heading"><div><span className="orbit-eyebrow">02 / EXPERTISE</span><h2 id="services-title">Creative direction.<br /><em>Technical depth.</em></h2></div><p>Design that gets noticed.<br />Development that gets things done.</p></div>
          <div className="orbit-services">{SERVICES.map(service => <Link className="orbit-service action-trigger" to="/skills" key={service.number}><div className="orbit-service-top"><service.icon size={28} strokeWidth={1.4} aria-hidden="true" /><span>{service.number}</span></div><h3>{service.title}</h3><p>{service.text}</p><div className="orbit-service-bottom"><span>{service.tags}</span><span className="orbit-service-action cinematic-action"><ActionFeedback icon={service.icon} size={20} /></span></div></Link>)}</div>
        </div>
      </section>

      <section className="orbit-section orbit-about studio-container" aria-labelledby="about-title">
        <figure className="orbit-profile"><img src={`/people/cormac-mccann-${theme}.webp`} alt="Cormac McCann in an astronaut helmet, lit in ruby and cyan" width="720" height="956" loading="lazy" decoding="async" /><figcaption><span className="orbit-eyebrow">THE PERSON BEHIND KAMROK</span><strong>Cormac McCann</strong><span>Designer. Illustrator. Marketer.</span></figcaption></figure>
        <div><span className="orbit-eyebrow">THE THINKING BEHIND THE WORK</span><h2 id="about-title">The world is changing.<br /><em>So is what’s possible.</em></h2><p>I’ve always loved making things — drawing them, designing them, then finding the story that makes people care. KAMROK brings that mix of illustration, design and marketing into everything I build.</p><p>Now the tools are changing faster than ever, and I love being part of it. As a certified Lovable expert and award-winning WordPress designer, I explore what new technology can do, then put it to work for real businesses.</p><Link className="orbit-text-link cinematic-action" to="/about">A little more about the studio <ActionFeedback icon={UserRound} /></Link></div>
      </section>

      <ScrollFilm />

      <section id="process" className="orbit-section orbit-process studio-container" aria-labelledby="process-title">
        <div className="orbit-section-heading"><div><span className="orbit-eyebrow">03 / HOW WE WORK</span><h2 id="process-title">A clear process.<br /><em>Room to explore.</em></h2></div></div>
        <div className="orbit-steps">{[{n:"01",h:"Find the real idea.",p:"We talk about your business, the people you want to reach and what a good result looks like. Then I map the way forward."},{n:"02",h:"Make it take shape.",p:"Design and development happen with you in the loop. You see real progress, try things out and help steer the details."},{n:"03",h:"Put it out into the world.",p:"We check the details, launch with care and make sure you know how everything works. There’s room to keep improving, too."}].map(step => <article key={step.n}><span className="orbit-step-number">{step.n}<span /></span><h3>{step.h}</h3><p>{step.p}</p></article>)}</div>
      </section>

      <section className="orbit-hire-band">
        <div className="orbit-section studio-container" aria-labelledby="hire-title"><div className="orbit-section-heading"><div><span className="orbit-eyebrow">04 / YOUR NEXT MOVE</span><h2 id="hire-title">Start where<br /><em>you are.</em></h2></div><p>A blank page, a half-built app or a site that needs<br className="desktop-break" /> some love. There’s a sensible way forward.</p></div>
          <div className="orbit-hire-options">
            <article><span className="orbit-eyebrow">A FOCUSED BIT OF HELP</span><h3>Find your way forward.</h3><p>A project review, a stubborn bug, or a second opinion before you commit.</p><ul><li>Lovable & WordPress troubleshooting</li><li>Design feedback & practical AI advice</li></ul><Link className="orbit-text-link cinematic-action" to="/contact?help=review">Let’s take a look <ActionFeedback icon={Search} /></Link></article>
            <article className="orbit-hire-featured"><span className="orbit-eyebrow">A NEW CHAPTER</span><h3>Build something brilliant.</h3><p>A website or app, designed and built around your business from the start.</p><ul><li>Design, development & launch</li><li>A clear scope, timeline & project price</li></ul><Link className="orbit-button cinematic-action" to="/contact?help=project">Tell me your idea <ActionFeedback icon={Lightbulb} /></Link></article>
            <article><span className="orbit-eyebrow">A FAMILIAR PAIR OF HANDS</span><h3>Keep the good things going.</h3><p>Make the next improvement with someone who already knows your business.</p><ul><li>New features, updates & refinements</li><li>Support shaped around what you need</li></ul><Link className="orbit-text-link cinematic-action" to="/contact?help=support">Talk about support <ActionFeedback icon={LifeBuoy} /></Link></article>
          </div>
        </div>
      </section>

      <section className="orbit-section orbit-testimonials studio-container" aria-label="Client feedback"><span className="orbit-eyebrow">THE VIEW FROM THE OTHER SIDE</span><Testimonials limit={2} /></section>
      <section className="orbit-section orbit-faq studio-container" aria-labelledby="faq-title"><div><span className="orbit-eyebrow">THE PRACTICAL DETAILS</span><h2 id="faq-title">What you need<br /><em>to know.</em></h2><p>Something else on your mind?</p><Link className="orbit-text-link cinematic-action" to="/contact">Just ask <ActionFeedback icon={MessageCircle} /></Link></div><div className="orbit-faq-list">{FAQ.map(item => <details key={item.q}><summary className="cinematic-action">{item.q}<ActionFeedback icon={Plus} direction="down" /></summary><p>{item.a}</p></details>)}</div></section>
    </>
  );
}
