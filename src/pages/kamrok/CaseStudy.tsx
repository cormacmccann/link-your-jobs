import { useEffect, type CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import clubLaptop from "@/assets/clubrovia/laptop.png.asset.json";
import mckHero from "@/assets/mckevitts/hero.png.asset.json";
import mckRooms from "@/assets/mckevitts/rooms.jpg.asset.json";
import "@/styles/case-study.css";

type ProjectImage = { src: string; alt: string; caption: string };
type CaseData = {
  name: string;
  category: string;
  url: string;
  intro: string;
  year: string;
  surface: string;
  hero: ProjectImage;
  description: string[];
  services: string[];
  gallery?: ProjectImage[];
  next: string;
};

const CASES: Record<string, CaseData> = {
  clubrovia: {
    name: "Clubrovia",
    category: "Our own product · Sports & community",
    url: "https://clubrovia.com",
    intro: "More time for the club. Less time running it.",
    year: "2024 — present",
    surface: "#171329",
    hero: { src: clubLaptop.url, alt: "Clubrovia dashboard presented on a laptop", caption: "Club management, brought together." },
    description: [
      "We designed and built Clubrovia to bring memberships, payments, fundraising and communication into one place for sports clubs.",
      "A clear dashboard helps committees manage the day-to-day, while each club gets its own branded website. The same design system carries through to the mobile experience for coaches and members.",
    ],
    services: ["Product design", "Design system", "Web development"],
    next: "mckevitts",
  },
  mckevitts: {
    name: "McKevitt’s Village Hotel",
    category: "Hospitality · Carlingford",
    url: "https://mckevitts.ie",
    intro: "A warm welcome, from the very first visit.",
    year: "2024 — 2025",
    surface: "#29261e",
    hero: { src: mckHero.url, alt: "McKevitt’s Village Hotel website", caption: "One identity for the hotel, bar and restaurant." },
    description: [
      "A new identity and website for a family-run hotel in the heart of Carlingford. We brought the hotel, bar and restaurant together under one considered brand.",
      "The website puts the rooms, food and setting first, with a clear route to booking. The family can update menus, offers and events themselves.",
    ],
    services: ["Brand identity", "Web design", "WordPress development"],
    gallery: [{ src: mckRooms.url, alt: "A guest room at McKevitt’s Village Hotel", caption: "A closer look at the stay." }],
    next: "carlingford-arms",
  },
  "carlingford-arms": {
    name: "The Carlingford Arms",
    category: "Hospitality · Carlingford",
    url: "https://carlingfordarms.com",
    intro: "A much-loved local, with a fresh presence online.",
    year: "2024",
    surface: "#29221b",
    hero: { src: "/case-thumbs/carlingford-arms.png", alt: "The Carlingford Arms website", caption: "Food, atmosphere and a table waiting." },
    description: [
      "We rebuilt the Carlingford Arms website around the things guests come for: the food, the atmosphere and a place to gather.",
      "Warm imagery and clear navigation make menus and reservations easy to find. A straightforward WordPress setup lets the team keep everything current.",
    ],
    services: ["Web design", "WordPress development", "Local SEO"],
    next: "onyerbike",
  },
  onyerbike: {
    name: "On Yer Bike",
    category: "Tourism · Carlingford",
    url: "https://onyerbike.ie",
    intro: "Making the next adventure easy to find.",
    year: "2024",
    surface: "#2a241e",
    hero: { src: "/case-thumbs/onyerbike.png", alt: "On Yer Bike Carlingford website", caption: "Explore the peninsula. Find your route. Book a bike." },
    description: [
      "A booking-focused website for a family bike-hire business on the shores of Carlingford Lough.",
      "We paired bold photography with useful route information and a clear booking journey. Designed around visitors on their phones, the site makes planning a day out feel simple.",
    ],
    services: ["Web design", "WordPress development", "Booking integration"],
    next: "catering-disposables",
  },
  "catering-disposables": {
    name: "Catering Disposables",
    category: "Ecommerce · Trade supplies",
    url: "https://cateringdisposables.ie",
    intro: "A busy product range, made easy to shop.",
    year: "2024",
    surface: "#20282c",
    hero: { src: "/case-thumbs/catering-disposables.png", alt: "Catering Disposables online store", caption: "Everyday supplies, without the search." },
    description: [
      "An online store for the cafés, restaurants and takeaway businesses that depend on Catering Disposables.",
      "We organised a large catalogue around clear categories, prominent search and practical delivery information. Account and reorder flows help returning customers get straight to what they need.",
    ],
    services: ["Ecommerce design", "WooCommerce development", "Trade UX"],
    next: "greyhound",
  },
  greyhound: {
    name: "Greyhound Extreme",
    category: "Ecommerce · Irish brand",
    url: "https://greyhoundextreme.com",
    intro: "A specialist brand, thoughtfully presented.",
    year: "2024",
    surface: "#291d1d",
    hero: { src: "/case-thumbs/greyhound.png", alt: "Greyhound Extreme online store", caption: "The products and the story behind them." },
    description: [
      "A website and online store for an Irish business creating herbal products for greyhounds.",
      "We gave the brand’s story and product information room to breathe, supported by a straightforward shopping experience and clear ways to ask for advice.",
    ],
    services: ["Web design", "Ecommerce design", "WooCommerce development"],
    next: "thehenie",
  },
  thehenie: {
    name: "TheHen.ie",
    category: "Travel & experiences",
    url: "https://thehen.ie",
    intro: "The beginning of a great weekend.",
    year: "2024",
    surface: "#292519",
    hero: { src: "/case-thumbs/thehenie.png", alt: "TheHen.ie party planning website", caption: "Destinations and experiences, ready to explore." },
    description: [
      "A fresh website for a team planning hen parties across Ireland, from city weekends to coastal getaways.",
      "An editorial feel brings the experiences to life, while clear paths through destinations and ready-made packages help groups find the right fit.",
    ],
    services: ["Web design", "WordPress development", "Booking journey"],
    next: "carlichauns",
  },
  carlichauns: {
    name: "Carlichauns",
    category: "Entertainment · Kids & family",
    url: "https://carlichauns.com",
    intro: "A little world with a big imagination.",
    year: "2024",
    surface: "#20271e",
    hero: { src: "/case-thumbs/carlichauns.png", alt: "Carlichauns entertainment website", caption: "An online home for the characters and their world." },
    description: [
      "A playful website for an Irish entertainment brand spanning books, characters and a real-world adventure trail.",
      "We built the experience around the brand’s illustrations, with clear routes for families to explore and for partners to learn more.",
    ],
    services: ["Web design", "Web development", "Illustration integration"],
    next: "coil-carrier",
  },
  "coil-carrier": {
    name: "Coil Carrier",
    category: "Engineering · Product website",
    url: "https://coilcarrier.com",
    intro: "Complex engineering. A clear proposition.",
    year: "2024",
    surface: "#1b252e",
    hero: { src: "/case-thumbs/coil-carrier.png", alt: "Coil Carrier product website", caption: "A focused introduction to the product." },
    description: [
      "A dedicated product website for Marmion Engineering’s reusable steel coil carriers.",
      "We brought specifications, use cases and frequently asked questions into a focused experience, giving buyers the information they need and a direct route to enquire.",
    ],
    services: ["Web design", "Product UX", "Web development"],
    next: "marmion",
  },
  marmion: {
    name: "Marmion Engineering",
    category: "Engineering · Manufacturing",
    url: "https://marmionengineering.ie",
    intro: "Built to show what they’re capable of.",
    year: "2024",
    surface: "#1e252b",
    hero: { src: "/case-thumbs/marmion.png", alt: "Marmion Engineering website", caption: "The team’s capabilities, products and services in one place." },
    description: [
      "A website for an engineering business delivering custom steel fabrication in-house.",
      "We gave their capabilities a clear structure, connecting services and product lines under one consistent identity. Industrial imagery and direct enquiry routes keep the focus on the work.",
    ],
    services: ["Web design", "Content structure", "Web development"],
    next: "down-to-earth",
  },
  "down-to-earth": {
    name: "Down to Earth Electrical",
    category: "Electrical · Commercial & industrial",
    url: "https://downtoearthelectrical.com",
    intro: "A growing team, with a presence to match.",
    year: "2024",
    surface: "#1b2824",
    hero: { src: "/case-thumbs/down-to-earth.png", alt: "Down to Earth Electrical website", caption: "Specialist services, clearly communicated." },
    description: [
      "A website for an electrical contractor working across Ireland, the UK and Germany.",
      "We brought their services, credentials and team together in a clear, confident design. Regional contact details make it easy for prospective clients to reach the right people.",
    ],
    services: ["Web design", "Content structure", "Web development"],
    next: "clubrovia",
  },
};

export default function CaseStudy() {
  const { slug } = useParams();
  const data = slug && Object.prototype.hasOwnProperty.call(CASES, slug) ? CASES[slug] : undefined;
  const next = data ? CASES[data.next] : undefined;

  useEffect(() => {
    document.title = data ? `${data.name} — Case Study | KAMROK` : "Project not found | KAMROK";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", data ? `${data.name}. ${data.description[0]} A project by KAMROK.` : "Explore selected projects by KAMROK.");
  }, [data]);

  return (
    <div className="case-page" style={{ "--case-surface": data?.surface } as CSSProperties}>
      <div className="case-container">
        {data ? (
          <article>
            <header className="case-intro">
              <Link to="/work" className="case-back"><ArrowLeft size={15} aria-hidden="true" /> All projects</Link>
              <p className="case-category">{data.category}</p>
              <h1>{data.name}</h1>
              <div className="case-intro-bottom">
                <p className="case-deck">{data.intro}</p>
                <a className="case-visit" href={data.url} target="_blank" rel="noopener noreferrer">
                  Visit website <ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </header>

            <figure className="case-hero">
              <div className="case-image-surface"><img src={data.hero.src} alt={data.hero.alt} loading="eager" /></div>
              <figcaption>{data.hero.caption}</figcaption>
            </figure>

            <section className="case-details" aria-labelledby="case-about">
              <div className="case-description">
                <h2 id="case-about">About the project</h2>
                {data.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <dl className="case-facts">
                <div><dt>What we did</dt><dd>{data.services.map((service) => <span key={service}>{service}</span>)}</dd></div>
                <div><dt>Year</dt><dd>{data.year}</dd></div>
              </dl>
            </section>

            {data.gallery && (
              <div className={`case-gallery${data.gallery.length === 1 ? " case-gallery--single" : ""}`}>
                {data.gallery.map((shot) => (
                  <figure key={shot.src}>
                    <div className="case-image-surface"><img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" /></div>
                    <figcaption>{shot.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}

            {next && (
              <nav className="case-next" aria-label="Next project">
                <Link to={`/work/${data.next}`}>
                  <div><span className="case-label">Next project</span><h2>{next.name}</h2><span className="case-next-category">{next.category}</span></div>
                  <div className="case-next-image" style={{ backgroundColor: next.surface }}><img src={next.hero.src} alt="" loading="lazy" /></div>
                  <ArrowRight className="case-next-arrow" size={30} strokeWidth={1.3} aria-hidden="true" />
                </Link>
              </nav>
            )}
          </article>
        ) : (
          <section className="case-empty"><h1>Project not found.</h1><p>There’s plenty more to see.</p><Link className="case-visit" to="/work">View all projects <ArrowRight size={18} aria-hidden="true" /></Link></section>
        )}
      </div>
    </div>
  );
}
