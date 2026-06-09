import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import clubLogo from "@/assets/clubrovia/logo.png.asset.json";
import clubLaptop from "@/assets/clubrovia/laptop.png.asset.json";
import clubCoach from "@/assets/clubrovia/coach.png.asset.json";
import clubAction from "@/assets/clubrovia/in-action.png.asset.json";
import clubChat from "@/assets/clubrovia/team-chat.png.asset.json";
import mckHero from "@/assets/mckevitts/hero.png.asset.json";
import mckRooms from "@/assets/mckevitts/rooms.jpg.asset.json";
// carlingford-arms uses screenshot from /public


type Feature = { h: string; p: string };
type Shot = { src: string; alt: string; caption: string; span?: "wide" | "half" | "third" };
type Stat = { value: string; label: string };
type CaseData = {
  name: string;
  domain: string;
  url: string;
  tagline: string;
  role: string;
  year: string;
  accent: string;
  logo?: string;
  heroImage?: string;
  overview: string;
  challenge: string;
  approach: string;
  approachExtra?: string[];
  features: Feature[];
  outcome: string;
  services: string[];
  screenshots?: Shot[];
  stats?: Stat[];
  quote?: { text: string; cite: string };
  next: { slug: string; name: string };
};

const CASES: Record<string, CaseData> = {
  clubrovia: {
    name: "Clubrovia",
    domain: "clubrovia.com",
    url: "https://clubrovia.com",
    tagline: "A complete operating system for the modern sports club — many clubs, one platform.",
    role: "Own product · Design + Build",
    year: "2024 — present",
    accent: "#8b7dff",
    logo: clubLogo.url,
    heroImage: clubLaptop.url,
    overview:
      "Clubrovia is our own product — a complete operating system for sports clubs. One place to run registration, finances, fundraising, communications and a public-facing club website, across many clubs at once.",
    challenge:
      "Clubs run on spreadsheets, group chats and goodwill. Volunteers burn out chasing membership renewals, reconciling cash and keeping a website alive. We set out to replace all of it with one tool a non-technical committee could actually run.",
    approach:
      "Multi-tenant from day one. Every club gets its own branded space and only the modules it needs — and Clubrovia handles dozens of clubs from a single codebase without breaking a sweat.",
    approachExtra: [
      "Two faces, one platform. A dedicated admin system covers configuration, finances and compliance for committees, while a generated 'Club Hub' mini-website serves members and supporters — distinct roles, shared data.",
      "Finances and compliance baked in. Membership payments, fundraising income, refunds and reconciliation all live in one ledger, with the paper trail clubs actually need at year end.",
      "Built for the people who actually run clubs. Treasurers, secretaries and coaches — not technologists. Every flow was designed to be obvious on a phone in a noisy clubhouse.",
    ],
    features: [
      { h: "Registration engine", p: "Memberships, renewals and forms that handle themselves." },
      { h: "Finances & compliance", p: "Money in and out, reconciled, with the paper trail clubs need." },
      { h: "Fundraising", p: "A flexible system for the lifeblood of every club." },
      { h: "Generated club website", p: "A public Club Hub for members and supporters, no webmaster required." },
      { h: "Comms & content", p: "Reach the whole club without ten different group chats." },
      { h: "Multi-tenant & branded", p: "Many clubs, each with their own identity and enabled modules." },
    ],
    outcome:
      "Hundreds of members managed from one place, by people who aren't techies — less admin, more time for the actual club.",
    services: ["Product design", "Full-stack build", "Design system", "Multi-tenant SaaS", "Payments", "Auth & roles"],
    screenshots: [
      { src: clubLaptop.url, alt: "Clubrovia admin dashboard on laptop", caption: "Admin dashboard — one view across every club", span: "wide" },
      { src: clubCoach.url, alt: "Coach view in Clubrovia", caption: "Coach view — squads, sessions, attendance", span: "half" },
      { src: clubChat.url, alt: "Team chat in Clubrovia", caption: "Team chat — replaces the group-chat sprawl", span: "half" },
      { src: clubAction.url, alt: "Clubrovia in action with a real club", caption: "In the wild — running a real Irish sports club", span: "wide" },
    ],
    stats: [
      { value: "1 platform", label: "MANY CLUBS" },
      { value: "100s", label: "MEMBERS MANAGED" },
      { value: "0", label: "SPREADSHEETS LEFT" },
    ],
    quote: {
      text: "It finally feels like the club runs itself instead of the other way around.",
      cite: "— Club secretary, early Clubrovia adopter",
    },
    next: { slug: "mckevitts", name: "McKevitt's" },
  },
  mckevitts: {
    name: "McKevitt's Village Hotel",
    domain: "mckevitts.ie",
    url: "https://mckevitts.ie",
    tagline: "Brand, logo and website for a family-run hotel, bar & restaurant in the heart of Carlingford.",
    role: "Client · Logo + Brand + Web design & build",
    year: "2024 — 2025",
    accent: "#c9a86a",
    heroImage: mckHero.url,
    overview:
      "McKevitt's Village Hotel is a family-run boutique hotel, bar and restaurant in Carlingford, Co. Louth — a 14-bedroom property at the foot of the Cooley Mountains. We designed the logo and brand mark, rolled it through their identity, and built a warm, content-led website that finally matches the welcome you get through the door.",
    challenge:
      "A long-standing Carlingford name with deep history, but a dated mark and an old site that didn't reflect the quality of the rooms, the food or the setting. They needed one consistent identity across the hotel, the restaurant and the bar — and a website guests would actually want to book from.",
    approach:
      "We started with the brand. The new mark leans into the McKevitt's heritage — a quiet, confident wordmark with a custom emblem that works as a signet on signage, menus, vouchers and digital. From there we built a fast, image-led WordPress site that puts Carlingford, the rooms and the food front and centre, with booking flows that hand off cleanly to the existing reservation system.",
    approachExtra: [
      "Three businesses, one identity. STAY, DINING and BAR all live under one mark, with consistent type, colour and tone — easier for the team, clearer for the guest.",
      "Editable by the family, not the agency. The team adds rooms, offers, menus and events themselves through a CMS we tuned around how they actually work.",
      "Built to load fast on a phone in Carlingford on patchy 4G — because that's when half the bookings happen.",
    ],
    features: [
      { h: "Logo & brand mark", p: "A custom wordmark and emblem rolled across signage, print and digital." },
      { h: "Brand system", p: "Type, colour and tone that hold across hotel, bar and restaurant." },
      { h: "Content-led website", p: "Strong imagery and clear hierarchy that let the place speak for itself." },
      { h: "Easy CMS", p: "Rooms, offers, menus and events updated by the team in minutes." },
      { h: "Booking flow", p: "Clean hand-off to the existing reservation provider with no friction." },
      { h: "Fast & findable", p: "Quick on every device, with SEO foundations that bring guests in directly." },
    ],
    outcome:
      "One coherent identity across stay, dining and bar — and a website the family actually runs themselves, doing the talking for Carlingford's most welcoming front door.",
    services: ["Logo design", "Brand identity", "Web design", "WordPress build", "CMS", "SEO foundations"],
    screenshots: [
      { src: mckHero.url, alt: "McKevitt's homepage hero", caption: "Homepage — Carlingford Lough doing the heavy lifting", span: "wide" },
      { src: mckRooms.url, alt: "McKevitt's rooms", caption: "Rooms — 14 bedrooms, presented honestly", span: "half" },
      { src: mckHero.url, alt: "McKevitt's hotel brand", caption: "One mark across STAY, DINING and BAR", span: "half" },
    ],
    stats: [
      { value: "3-in-1", label: "HOTEL · BAR · RESTAURANT" },
      { value: "14", label: "BEDROOMS LIVE ON SITE" },
      { value: "1", label: "FAMILY, ONE BRAND" },
    ],
    quote: {
      text: "It finally looks like the place feels when you walk in.",
      cite: "— The McKevitt family",
    },
    next: { slug: "carlingford-arms", name: "The Carlingford Arms" },
  },
  "carlingford-arms": {
    name: "The Carlingford Arms",
    domain: "carlingfordarms.com",
    url: "https://carlingfordarms.com",
    tagline: "A traditional Carlingford bar & restaurant, rebuilt for the web.",
    role: "Client · Web design & build",
    year: "2024",
    accent: "#d97b3a",
    heroImage: "/case-thumbs/carlingford-arms.png",
    overview:
      "The Carlingford Arms is one of the village's best-loved bars and restaurants. We rebuilt their website around the food, the room and the reservations — clean, warm, and unmistakably Carlingford.",
    challenge:
      "A busy hospitality business losing bookings to a tired site. They needed menus that were easy to keep current, a reservations route that worked on a phone, and a feel that matched the room.",
    approach:
      "An image-led WordPress build with menus the team can swap in seconds and a reservations flow that doesn't get in the way. The design borrows from the bar itself — warm timbers, confident type, no clutter.",
    features: [
      { h: "Menus the team owns", p: "Food and drink menus updated by staff, not a webmaster." },
      { h: "Mobile-first reservations", p: "Bookings that work on a phone at the bar door." },
      { h: "Local SEO", p: "Found when people search 'restaurant Carlingford'." },
      { h: "Fast & accessible", p: "Quick to load, easy to read, works for everyone." },
    ],
    outcome: "More direct bookings, fewer phone calls about 'is the kitchen open?', and a site the team is proud to share.",
    services: ["Web design", "WordPress build", "CMS", "Local SEO"],
    next: { slug: "onyerbike", name: "On Yer Bike" },
  },
  onyerbike: {
    name: "On Yer Bike Carlingford",
    domain: "onyerbike.ie",
    url: "https://onyerbike.ie",
    tagline: "Bike hire on the Carlingford & Cooley Peninsula — booking-led tourism site for a Tripadvisor Travellers' Choice operator.",
    role: "Client · Web design & build",
    year: "2024",
    accent: "#f37021",
    heroImage: "/case-thumbs/onyerbike.png",
    overview:
      "On Yer Bike is Carlingford's go-to family bike-hire operator on the shores of Carlingford Lough. We built a fast, booking-led site that puts routes, things to do and the booking button front and centre.",
    challenge:
      "A seasonal, tourism-driven business that lives or dies on direct bookings. The old site buried the booking button and didn't sell the experience.",
    approach:
      "Bold imagery, a sticky BOOK button on every screen, and clear sections for Bike Hire, Routes and Things To Do — with the Tripadvisor Travellers' Choice badges proudly above the fold.",
    features: [
      { h: "Always-visible BOOK button", p: "A high-contrast CTA in the nav and as a sticky on mobile." },
      { h: "Routes & things to do", p: "Helpful pre-booking content that does the selling for them." },
      { h: "Reviews above the fold", p: "Tripadvisor Travellers' Choice 2024 & 2025 prominently shown." },
      { h: "Mobile-first", p: "Most of the traffic is tourists on a phone, mid-trip." },
    ],
    outcome: "A site that finally matches the energy of the brand — and turns more browsers into bookings.",
    services: ["Web design", "WordPress build", "CMS", "Booking integration"],
    next: { slug: "catering-disposables", name: "Catering Disposables" },
  },
  "catering-disposables": {
    name: "Catering Disposables",
    domain: "cateringdisposables.ie",
    url: "https://cateringdisposables.ie",
    tagline: "Trade ecommerce for one of Ireland's busiest catering-supply businesses — built for repeat B2B orders.",
    role: "Client · Ecommerce design & build",
    year: "2024",
    accent: "#34495e",
    heroImage: "/case-thumbs/catering-disposables.png",
    overview:
      "Catering Disposables supplies cafés, restaurants and takeaways across Ireland. We built a no-nonsense trade ecommerce experience around fast reorders, clear category navigation and trustworthy delivery messaging.",
    challenge:
      "A huge SKU range across packaging, hot cups, takeaway bags, hygiene and more — being browsed by busy operators who don't have time to hunt. Trade users need price, stock and delivery clarity at a glance.",
    approach:
      "A clean mega-nav that maps the product world, an opening-hours and delivery-promise bar pinned to the top, and a video-led hero that humanises a trade store.",
    features: [
      { h: "Trade-first nav", p: "Every category one click away — built for repeat buyers." },
      { h: "Live delivery promise", p: "Opening hours and next-day cut-off shown in the top bar." },
      { h: "Account & reorder", p: "Login/register and Buy Now anchored in the header." },
      { h: "Search-first UX", p: "Big product search bar for power users who know exactly what they need." },
    ],
    outcome: "Faster reorders, fewer support calls, and a site that looks the part for a serious trade supplier.",
    services: ["Ecommerce design", "WooCommerce build", "Trade UX", "SEO"],
    next: { slug: "greyhound", name: "Greyhound Extreme" },
  },
  greyhound: {
    name: "Greyhound Extreme",
    domain: "greyhoundextreme.com",
    url: "https://greyhoundextreme.com",
    tagline: "Premium herbal solutions for greyhound health — a proudly Irish brand, online.",
    role: "Client · Brand-led ecommerce",
    year: "2024",
    accent: "#d10a0a",
    heroImage: "/case-thumbs/greyhound.png",
    overview:
      "Greyhound Extreme is a proudly Irish business crafting natural herbal products specifically for greyhound wellbeing and performance. We built a premium, content-led ecommerce site that puts the herbalist's story front and centre.",
    challenge:
      "A specialist product range in a tight, knowledgeable community. Buyers need to trust the formulations before they'll buy — so the site has to earn that trust before it ever shows a price.",
    approach:
      "A magazine-style hero, prominent 'Natural Ingredients' badge, and a fast WooCommerce store underneath. Free-shipping incentives and a chat widget close the gap between curious and converted.",
    features: [
      { h: "Story-first homepage", p: "Premium herbal positioning, not a generic shop layout." },
      { h: "Free-shipping bar", p: "€100 threshold pinned to the top, with IE & UK badges." },
      { h: "Live chat", p: "Specialist questions get a real answer, fast." },
      { h: "Built for repeat purchase", p: "Wishlist, recently viewed, and quick reorder flows." },
    ],
    outcome: "A brand presence that finally matches the quality of the products — and converts the community that already knows the brand.",
    services: ["Brand polish", "Ecommerce design", "WooCommerce build", "Conversion UX"],
    next: { slug: "thehenie", name: "TheHen.ie" },
  },
  thehenie: {
    name: "TheHen.ie",
    domain: "thehen.ie",
    url: "https://thehen.ie",
    tagline: "Ireland's number one hen-party planning experts — an editorial, package-led site.",
    role: "Client · Web design & build",
    year: "2024",
    accent: "#d4af37",
    heroImage: "/case-thumbs/thehenie.png",
    overview:
      "TheHen.ie plans hen parties across Ireland, from city-centre weekends to coastal getaways. We built an elegant, editorial-led site that mirrors the premium feel of the bookings they handle.",
    challenge:
      "Hundreds of activities and destinations to package up, and a bride-to-be audience that buys on emotion as much as logic. The old site had the packages — but not the wow.",
    approach:
      "A split-hero layout pairing real cocktail-bar footage with serif headline typography, a Google-reviews trust block, and dual CTAs into Ready-Made Packages and Destinations.",
    features: [
      { h: "Editorial hero", p: "Serif headline, split-screen video — a hospitality-grade first impression." },
      { h: "500+ Google reviews", p: "Social proof block sitting right under the hero." },
      { h: "Package vs Destination CTAs", p: "Two clear paths into the booking journey." },
      { h: "Smart search & help", p: "CTRL+K quick search and a persistent 'Need Help?' chip." },
    ],
    outcome: "A site that finally feels as memorable as the parties they plan.",
    services: ["Web design", "WordPress build", "Editorial UX", "Conversion design"],
    next: { slug: "carlichauns", name: "Carlichauns" },
  },
  carlichauns: {
    name: "Carlichauns",
    domain: "carlichauns.com",
    url: "https://carlichauns.com",
    tagline: "A global kids & family entertainment brand — Little Heroes from the Land of Legends.",
    role: "Client · Brand-led web design & build",
    year: "2024",
    accent: "#a3e635",
    heroImage: "/case-thumbs/carlichauns.png",
    overview:
      "Carlichauns is an emerging kids' entertainment IP — books, an adventure trail and a wider universe of characters. We built a cinematic homepage that introduces the world and funnels visitors into Books, Trail, Partners and Press.",
    challenge:
      "A new IP needs to look like one. The brand had character art and a story, but needed a site that felt like a Pixar microsite, not a children's bookstore.",
    approach:
      "Full-bleed cinematic hero, custom illustrated nav icons, neon-on-dark colour palette, and a clear path for partners and press alongside the consumer-facing Books & Adventure Trail.",
    features: [
      { h: "Cinematic homepage", p: "Full-bleed character art with a 'View Trailer' CTA." },
      { h: "Illustrated nav", p: "Custom mushroom, hat, heart & clover icons — pure brand." },
      { h: "Partners & Press paths", p: "Built for both fans and the business side of an IP." },
      { h: "Adventure Trail funnel", p: "Real-world activation tied straight into the site." },
    ],
    outcome: "An IP that finally has a home online — one that delights kids and convinces partners in the same scroll.",
    services: ["Web design", "Brand-led build", "Illustration integration", "CMS"],
    next: { slug: "coil-carrier", name: "Coil Carrier" },
  },
  "coil-carrier": {
    name: "Coil Carrier — Marmion Engineering",
    domain: "coilcarrier.com",
    url: "https://coilcarrier.com",
    tagline: "EN 12195 load-restraint-certified reusable coil carriers — a product microsite for Marmion Engineering.",
    role: "Client · Product microsite",
    year: "2024",
    accent: "#1565d8",
    heroImage: "/case-thumbs/coil-carrier.png",
    overview:
      "Marmion Engineering's Coil Carrier is a heavy-duty, EN 12195 certified solution for transporting steel coils. We built a dedicated product microsite — Technical Specs, Use Cases and FAQs — sitting alongside the main Marmion site.",
    challenge:
      "A serious B2B engineering product sold into procurement and safety teams. The site has to communicate compliance, safety and durability instantly — without sounding like a brochure.",
    approach:
      "Bold split-screen hero with the compliance badge on the right, a confident 'Get a Product Demo' CTA, and a tight nav focused on the three things a buyer actually needs: specs, use cases and FAQs.",
    features: [
      { h: "Compliance, front and centre", p: "EN 12195 load-restraint certified, called out in the hero." },
      { h: "Tight conversion nav", p: "Specs · Use Cases · FAQs · Enquire — nothing else." },
      { h: "Engineered, dark-mode aesthetic", p: "Steel-blue palette that matches the product photography." },
      { h: "Cross-linked with main Marmion site", p: "Header bar links back to the parent brand." },
    ],
    outcome: "A focused product page that earns trust in seconds and drives qualified demo requests.",
    services: ["Microsite design", "Product UX", "Web build", "Technical content design"],
    next: { slug: "marmion", name: "Marmion Engineering" },
  },
  marmion: {
    name: "Marmion Engineering",
    domain: "marmionengineering.ie",
    url: "https://marmionengineering.ie",
    tagline: "EN1090 EX2 certified custom fabrication — a hub site for an in-house engineering firm.",
    role: "Client · Web design & build",
    year: "2024",
    accent: "#1565d8",
    heroImage: "/case-thumbs/marmion.png",
    overview:
      "Marmion Engineering handles custom steel fabrication end to end, in-house, to EN1090 EX2 standards. We built a hub website that connects the parent brand to its product lines — Coil Carrier, Van Storage, Pits and Services.",
    challenge:
      "A serious engineering business with multiple product lines and a strong compliance story. The old site didn't articulate the in-house capability, and didn't connect the dots between Marmion and its sub-brands.",
    approach:
      "A dark, industrial-feeling homepage with a Custom Fabrication hero, an EN1090 EX2 compliance card pinned alongside it, and a horizontal nav that doubles as a launchpad for every product line.",
    features: [
      { h: "Product-line nav", p: "Home · Coil Carrier · Van Storage · Pits · Services, with custom icons." },
      { h: "Compliance card", p: "EN1090 EX2 certification given a prominent slot in the hero." },
      { h: "Two clear CTAs", p: "OUR SERVICES and SEE PRODUCTS — covering both buyer paths." },
      { h: "Customer logo strip", p: "Happy-customers section directly under the hero for instant credibility." },
    ],
    outcome: "A hub site that finally reflects the size and seriousness of the operation — and feeds qualified leads into each product line.",
    services: ["Web design", "Hub-and-spoke architecture", "Brand consistency", "CMS"],
    next: { slug: "down-to-earth", name: "Down to Earth Electrical" },
  },
  "down-to-earth": {
    name: "Down to Earth Electrical",
    domain: "downtoearthelectrical.com",
    url: "https://downtoearthelectrical.com",
    tagline: "High-quality electrical specialist teams for mission-critical projects — a multi-region B2B site.",
    role: "Client · Web design & build",
    year: "2024",
    accent: "#10b981",
    heroImage: "/case-thumbs/down-to-earth.png",
    overview:
      "Down to Earth Electrical (DTE) deliver high-performance electrical solutions for data centres and industrial environments across Ireland, the UK and Germany. We built a serious, multi-region B2B site that opens doors at the procurement table.",
    challenge:
      "A growing specialist contractor working across multiple countries and sectors, with the safety credentials to prove it. The site needed to communicate scale, certifications and seriousness — without losing the human warmth of the team.",
    approach:
      "A split-screen hero pairing a confident headline ('High-Quality Electrical Specialist Teams for Mission-Critical Projects') with a real meeting-room photo. Multi-language phone numbers in the top bar, a SAFE Electric badge under the CTAs, and a 'Who We Work With' logo strip directly below.",
    features: [
      { h: "Multi-region top bar", p: "IE, UK and DE phone numbers shown with flags up top." },
      { h: "Project-proven positioning", p: "Eyebrow line + serif italic for 'Mission-Critical Projects'." },
      { h: "SAFE Electric badge", p: "Regulator credential surfaced right under the CTAs." },
      { h: "Two-CTA conversion", p: "View All Services & View Projects — covers both intent types." },
    ],
    outcome: "A site that helps DTE compete for — and win — bigger, multi-region work.",
    services: ["Web design", "Multi-region UX", "B2B conversion design", "CMS"],
    next: { slug: "clubrovia", name: "Clubrovia" },
  },
};


export default function CaseStudy() {
  const { slug } = useParams();
  const data = slug ? CASES[slug] : undefined;

  useEffect(() => {
    document.body.classList.add("kk-case-open");
    return () => document.body.classList.remove("kk-case-open");
  }, []);


  if (!data) {
    return (
      <KamrokLayout title="Case study — KAMROK" description="Case study">
        <h1>Not found</h1>
        <p className="kk-lead-text">That case study doesn't exist (yet).</p>
        <Link className="kk-cta" to="/work">← BACK TO WORK</Link>
      </KamrokLayout>
    );
  }

  return (
    <KamrokLayout
      fullBleed
      title={`${data.name} — Case Study | KAMROK`}
      description={`${data.name}: ${data.tagline} A KAMROK case study.`}
    >
      <div style={{ ["--accent" as string]: data.accent }}>
        {data.heroImage && (
          <div className="kk-case-bg" style={{ backgroundImage: `url(${data.heroImage})` }} aria-hidden />
        )}
        <div className="kk-case-tint" aria-hidden />
        {/* HERO */}
        <header className="kk-case-hero">

          {data.heroImage && (
            <div className="kk-case-hero__bg" style={{ backgroundImage: `url(${data.heroImage})` }} />
          )}
          <div className="kk-case-hero__inner">
            {data.logo && <img className="kk-case-hero__logo" src={data.logo} alt={`${data.name} logo`} />}
            <div className="kk-eyebrow">CASE STUDY · {data.year}</div>
            <h1>{data.name}</h1>
            <p className="kk-case-hero__tag">{data.tagline}</p>
            <div className="kk-case-hero__meta">
              <span>ROLE<b>{data.role}</b></span>
              <span>YEAR<b>{data.year}</b></span>
              <span>LIVE<b><a href={data.url} target="_blank" rel="noopener">{data.domain} ↗</a></b></span>
            </div>
          </div>
        </header>

        <div className="kk-case-wrap">
          <section className="kk-case-section">
            <h2>OVERVIEW</h2>
            <p className="kk-lead">{data.overview}</p>
          </section>

          {data.stats && (
            <div className="kk-case-stats">
              {data.stats.map((s) => (
                <div key={s.label}>
                  <span className="num">{s.value}</span>
                  <span className="lab">{s.label}</span>
                </div>
              ))}
            </div>
          )}

          <section className="kk-case-section">
            <h2>THE CHALLENGE</h2>
            <p>{data.challenge}</p>
          </section>

          <section className="kk-case-section">
            <h2>THE APPROACH</h2>
            <p>{data.approach}</p>
            {data.approachExtra?.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          {data.screenshots && (
            <section className="kk-case-section">
              <h2>INSIDE THE PRODUCT</h2>
              <div className="kk-case-shots">
                {data.screenshots.map((s) => (
                  <figure key={s.src} className={`kk-case-shot kk-case-shot--${s.span ?? "half"}`}>
                    <img src={s.src} alt={s.alt} loading="lazy" />
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {data.quote && (
            <blockquote className="kk-case-quote">
              "{data.quote.text}"
              <cite>{data.quote.cite}</cite>
            </blockquote>
          )}

          <section className="kk-case-section">
            <h2>HIGHLIGHTS</h2>
            <div className="kk-case-highlights">
              {data.features.map((f) => (
                <div key={f.h}>
                  <h3>{f.h}</h3>
                  <p>{f.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="kk-case-outcome--big">
            <span className="kk-eyebrow">THE OUTCOME</span>
            <p>{data.outcome}</p>
          </section>

          <div className="kk-case-foot--big">
            <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
            <Link className="kk-case-next" to={`/work/${data.next.slug}`}>
              NEXT · {data.next.name} →
            </Link>
          </div>
        </div>
      </div>
    </KamrokLayout>
  );
}
