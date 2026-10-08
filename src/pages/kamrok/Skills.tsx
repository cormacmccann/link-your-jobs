import { Link } from "@/lib/router-compat";
import { ArrowDown, Award, CalendarDays, Check, Code2, GraduationCap, LayoutGrid, MessageCircle, MousePointer2, Palette, Plus, Search, ShoppingBag, Ticket, Workflow, Wrench } from "lucide-react";
import { SiWordpress } from "react-icons/si";
import HumanAiStory from "@/components/kamrok/HumanAiStory";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import { LOVABLE_AFFILIATE_URL } from "@/lib/brand";
import { PROJECT_CASES } from "@/data/projects";
import "@/styles/services.css";

const SERVICES = [
  { icon: MousePointer2, name: "Websites & landing pages", line: "Make the right first impression. Then make the next step obvious.", body: "Distinctive, mobile-first websites with a clear story, intuitive navigation and purposeful calls to action. From a focused campaign page to a complete business website.", items: ["Brand-led design & content structure", "B2B websites & lead generation", "Campaign landing pages & redesigns"] },
  { icon: ShoppingBag, name: "Ecommerce", line: "Turn browsing into a better buying experience.", body: "Help customers find the right product, understand its value and move confidently towards checkout. The store is designed around your products and how you run your business.", items: ["WooCommerce & Shopify stores", "Product discovery, filters & collections", "Payments & business integrations"] },
  { icon: Code2, name: "Apps & customer portals", line: "Give your big idea a working interface.", body: "Bring accounts, information and everyday tasks into one considered product. I shape the flows and build the features around the people who will actually use them.", items: ["Lovable apps & product prototypes", "Member areas & customer dashboards", "Internal tools & connected workflows"] },
  { icon: Ticket, name: "Events & ticketing", line: "From “that looks brilliant” to “I’m going”.", body: "Event experiences that carry the excitement all the way through discovery, entry and the participant journey. Built around the needs of your audience and organisers.", items: ["Event listings & ticket purchase journeys", "Participant accounts & communications", "Interactive challenges & experiences"] },
  { icon: CalendarDays, name: "Booking & reservations", line: "Make getting booked the easy part.", body: "A clear path from checking the options to choosing a time or sending an enquiry. I connect the right booking tools to the experience, with availability and next steps easy to understand.", items: ["Appointments & service bookings", "Hospitality, activities & reservations", "Booking integrations & enquiry flows"] },
  { icon: GraduationCap, name: "Learning & membership", line: "A useful place to learn, belong and return.", body: "Organise content into a journey people can follow. From a resource library to course and member experiences, we plan access, navigation and management around your offer.", items: ["Learning websites & resource libraries", "Course-platform integrations", "Member access & content organisation"] },
  { icon: Search, name: "Search & discoverability", line: "Help people find you. Help them understand you.", body: "Search engine optimisation (SEO) starts with useful content and a well-built website. For AI-powered search (GEO), the focus is equally practical: clear answers, credible information and content that is easy to interpret.", items: ["Technical SEO & page structure", "Content planning & structured data", "Search visibility reviews & improvements"] },
  { icon: Palette, name: "Brand & creative direction", line: "Make it unmistakably yours.", body: "Design, illustration and marketing thinking, working together. I help you find a distinctive visual language and carry it through the website, the campaign and the little details people remember.", items: ["Brand identity & original illustration", "Campaign visuals & digital content", "Motion & interactive storytelling"] },
];
const WORK = [
  { slug: "26-events", label: "Lovable · Events, ticketing & virtual challenges" },
  { slug: "mckevitts", label: "WordPress · Hospitality & website design" },
];
const PROCESS = [
  { n: "01", title: "Get clear", text: "We talk about your customers, your goals and what needs to change. Then agree the scope and the right platform." },
  { n: "02", title: "Make it yours", text: "I shape the story, the structure and the design. You see the direction early and help refine it." },
  { n: "03", title: "Build & test", text: "The design becomes a working site or app. We check the key journeys, mobile experience and details together." },
  { n: "04", title: "Launch & grow", text: "A considered launch, a practical handover and support agreed around what you need next." },
];
const FAQ = [
  { q: "Which platform should I choose?", a: "Start with what the website or app needs to do. WordPress is often a strong fit for content-led business websites and established publishing workflows. Lovable suits custom apps, portals and interactive products. Both can support a business website; I’ll explain the trade-offs, running costs and maintenance before we choose." },
  { q: "Can you improve something I already have?", a: "Yes. I can review an existing WordPress site or Lovable project, work out what is holding it back and prioritise the improvements. That might mean design changes, fixes, new features or a clearer customer journey." },
  { q: "What does a project cost?", a: "That depends on the scope, content and integrations. After a first conversation, I’ll put together a clear project quote. Hosting, platform subscriptions and any paid services are discussed separately, so you know what the ongoing costs involve." },
  { q: "Do I need a finished brief?", a: "No. Your current website, a rough idea or a problem you want to solve is enough to start. A target launch date and budget range are useful if you have them. We can work out the details together." },
];

export default function Skills() {
  const { theme } = useStudioTheme();
  return (
    <KamrokLayout title="Websites, Lovable Apps & WordPress Services | KAMROK" description="Distinctive websites, ecommerce and custom apps. Work directly with Cormac McCann, a certified Lovable expert and award-winning WordPress designer.">
      <div className="services-page">
        <section className="services-hero" aria-labelledby="services-title">
          <div className="services-hero-copy">
            <p className="services-kicker">DESIGN INSTINCT. COMMERCIAL THINKING.</p>
            <h1 id="services-title">Look the part.<br /><em>Work harder.</em></h1>
            <p className="services-intro">A website that wins enquiries. A shop that makes buying easy. An app that makes a better way of working possible.</p>
            <p className="services-body">I’m Cormac — designer, illustrator, marketer and builder. I bring the creative thinking and the technology together, from the first “what if” to the details that make it work.</p>
            <div className="services-actions"><Link className="orbit-button cinematic-action" to="/contact">Tell me your idea <ActionFeedback icon={MessageCircle} /></Link><a className="services-text-link cinematic-action" href="#platforms">Find your platform <ActionFeedback icon={ArrowDown} direction="down" /></a></div>
          </div>
          <Link className="services-hero-work" to="/work/26-events" aria-label="Explore the 26 Events case study">
            <div className="services-work-topline"><span>IDEAS, OUT IN THE WORLD</span><span>01 / 26 EVENTS</span></div>
            <img src="/projects/26-events/homepage.webp" alt="26 Events website, with a runner silhouetted against a mountain sunset" width="1204" height="837" />
            <div className="services-work-caption"><div><span>BUILT & HOSTED ON LOVABLE</span><h2>Adventure. By design.</h2></div><span className="cinematic-action services-work-arrow"><ActionFeedback icon={LayoutGrid} /></span></div>
          </Link>
        </section>

        <div className="services-trust"><span><Award size={20} aria-hidden="true" /> Award-winning WordPress designer</span><span><Check size={20} aria-hidden="true" /> Certified Lovable expert</span><span><MessageCircle size={20} aria-hidden="true" /> Work directly with Cormac</span></div>

        <section id="platforms" className="services-section" aria-labelledby="platforms-title">
          <div className="services-section-heading"><div><p className="services-kicker">THE RIGHT FOUNDATION</p><h2 id="platforms-title">Your ambition.<br />Your platform.</h2></div><p>Choose WordPress or Lovable. Not sure yet? Tell me what you need to achieve and I’ll help you make an informed choice.</p></div>
          <div className="services-platforms">
            <article className="services-platform services-platform--wordpress">
              <div className="services-platform-brand"><SiWordpress aria-hidden="true" /><span>WordPress</span></div>
              <h3>Established. Open.<br />Ready to make your own.</h3>
              <p>The world’s most popular open-source content management system, shaped by a global community. A flexible foundation for a business website, publishing platform or WooCommerce store.</p>
              <ul><li><Check />Control over your content and choice of hosting</li><li><Check />A vast community of developers and integrations</li><li><Check />Familiar editing tools for your day-to-day updates</li></ul>
              <div className="services-platform-fit"><strong>A strong fit for</strong><span>Content-led websites, established businesses, publishing and ecommerce.</span></div>
              <Link className="services-platform-cta cinematic-action" to="/contact?platform=wordpress">Let’s build with WordPress <ActionFeedback icon={MessageCircle} /></Link>
              <a className="services-source" href="https://wordpress.org/about/" target="_blank" rel="noopener noreferrer">About the WordPress community ↗</a>
            </article>
            <article className="services-platform services-platform--lovable">
              <div className="services-platform-brand"><img src={`/certifications/lovable-expert-app-builder-full-on-${theme === "dark" ? "dark" : "light"}.svg`} alt="Lovable certified expert app builder" width="615" height="176" /></div>
              <h3>A big idea.<br />A working product.</h3>
              <p>Lovable brings a different way to build websites and apps. With certified expertise and a designer’s eye, I turn the starting idea into a considered product with a clear purpose.</p>
              <ul><li><Check />Custom interfaces shaped around your customers</li><li><Check />Accounts, dashboards and connected workflows</li><li><Check />A practical route from prototype to a refined build</li></ul>
              <div className="services-platform-fit"><strong>A strong fit for</strong><span>Customer portals, business tools, new products and interactive websites.</span></div>
              <Link className="services-platform-cta cinematic-action" to="/contact?platform=lovable">Let’s build with Lovable <ActionFeedback icon={MessageCircle} /></Link>
              <a className="services-source" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">Explore Lovable ↗ <span>Affiliate link</span></a>
            </article>
          </div>
          <p className="services-platform-note"><ShoppingBag size={18} aria-hidden="true" /> Building a dedicated online store? I also design and build with Shopify. We’ll choose around your products, operations and plans.</p>
        </section>

        <HumanAiStory />

        <section className="services-section" aria-labelledby="services-offer-title">
          <div className="services-section-heading"><div><p className="services-kicker">WHAT WE CAN MAKE POSSIBLE</p><h2 id="services-offer-title">Built around<br />your next move.</h2></div><p>Start with the thing your business needs to do better. The design, the build and the tools follow from there.</p></div>
          <div className="services-offerings">{SERVICES.map((service, index) => <article className="services-offering" key={service.name}>
            <div className="services-offering-index"><service.icon size={25} strokeWidth={1.4} aria-hidden="true" /><span>{String(index + 1).padStart(2, "0")}</span></div>
            <h3>{service.name}</h3><p className="services-offering-line">{service.line}</p>
            <details><summary className="cinematic-action">What’s included <ActionFeedback icon={Plus} direction="down" size={16} /></summary><div className="services-offering-details"><p>{service.body}</p><ul>{service.items.map(item => <li key={item}>{item}</li>)}</ul><Link className="services-text-link cinematic-action" to={`/contact?service=${encodeURIComponent(service.name)}`}>Talk about this <ActionFeedback icon={MessageCircle} size={16} /></Link></div></details>
          </article>)}</div>
        </section>

        <section className="services-section" aria-labelledby="services-proof-title">
          <div className="services-section-heading"><div><p className="services-kicker">FROM THE STUDIO</p><h2 id="services-proof-title">The work does<br />the talking.</h2></div><Link className="services-text-link cinematic-action" to="/work">Explore all projects <ActionFeedback icon={LayoutGrid} /></Link></div>
          <div className="services-proof">{WORK.map(({slug,label}) => {const project = PROJECT_CASES[slug]; return <Link className="services-proof-project" key={slug} to={`/work/${slug}`}><div className="services-proof-image"><img src={project.hero.src} alt={project.hero.alt} loading="lazy" /></div><div className="services-proof-caption"><div><p>{label}</p><h3>{project.name}</h3></div><span className="cinematic-action"><ActionFeedback icon={LayoutGrid} /></span></div></Link>;})}</div>
          <p className="services-award-note"><Award size={18} aria-hidden="true" /> WordPress design recognised at the Business Awards: <strong>Best Use of Internet Technology.</strong></p>
        </section>

        <section className="services-section" aria-labelledby="services-process-title"><p className="services-kicker">A CLEAR WAY FORWARD</p><h2 id="services-process-title">Good conversations.<br />Better outcomes.</h2><div className="services-process">{PROCESS.map(step=><article key={step.n}><span>{step.n}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

        <section className="services-support" aria-labelledby="services-support-title"><div><Workflow size={30} strokeWidth={1.3} aria-hidden="true" /><h2 id="services-support-title">Already up and running?</h2><p>There’s room to go further. Connect your tools, explore practical AI features, fix the frustrating bits or keep improving with a familiar pair of hands.</p></div><div className="services-support-links"><Link className="services-platform-cta cinematic-action" to="/contact?help=review">Review my existing project <ActionFeedback icon={Wrench} /></Link><Link className="services-platform-cta cinematic-action" to="/contact?help=support">Explore ongoing support <ActionFeedback icon={Workflow} /></Link></div></section>

        <section className="services-section services-faq" aria-labelledby="services-faq-title"><div><p className="services-kicker">BEFORE WE BEGIN</p><h2 id="services-faq-title">A few good<br />questions.</h2></div><div>{FAQ.map(item=><details key={item.q}><summary className="cinematic-action">{item.q}<ActionFeedback icon={Plus} direction="down" size={18} /></summary><p>{item.a}</p></details>)}</div></section>

        <section className="services-close" aria-labelledby="services-close-title"><p className="services-kicker">YOUR IDEA DESERVES A CONVERSATION</p><h2 id="services-close-title">Let’s build<br /><em>what’s next.</em></h2><p>A new venture. A better website. A project that’s ready to go further.<br />Tell me where you want to take it.</p><Link className="orbit-button cinematic-action" to="/contact">Start a conversation <ActionFeedback icon={MessageCircle} /></Link><span>No polished brief needed. Just a place to start.</span></section>
      </div>
    </KamrokLayout>
  );
}
