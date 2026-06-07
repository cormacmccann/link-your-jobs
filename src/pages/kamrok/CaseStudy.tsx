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
import carlArms from "@/assets/carlingford-arms/hero.png.asset.json";


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
    heroImage: carlArms.url,
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
