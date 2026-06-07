import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import clubLogo from "@/assets/clubrovia/logo.png.asset.json";
import clubLaptop from "@/assets/clubrovia/laptop.png.asset.json";
import clubCoach from "@/assets/clubrovia/coach.png.asset.json";
import clubAction from "@/assets/clubrovia/in-action.png.asset.json";
import clubChat from "@/assets/clubrovia/team-chat.png.asset.json";

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
    name: "McKevitt's",
    domain: "mckevitts.com",
    url: "https://mckevitts.com",
    tagline: "A modern home for a long-standing Irish name.",
    role: "Client · Web design",
    year: "2025",
    accent: "#56a8ff",
    overview:
      "A warm, modern website for McKevitt's — a long-established Irish business — built around clear structure, strong imagery and content the team can keep up to date themselves.",
    challenge:
      "A trusted local name with a dated site that didn't reflect the quality behind it. The brief was simple: something that feels current and inviting, loads fast, and is easy for the team to maintain.",
    approach:
      "A clean, content-led design with a CMS the staff can actually use. Strong photography leads each page, the structure stays simple, and the whole thing is fast and accessible on every device.",
    features: [
      { h: "Content-led design", p: "Imagery and clear hierarchy that let the business speak for itself." },
      { h: "Easy CMS", p: "The team updates content themselves — no developer in the loop." },
      { h: "Fast & accessible", p: "Built to be quick and usable for everyone, on any device." },
      { h: "Findable", p: "Clean markup and SEO foundations so the right people land on it." },
    ],
    outcome: "A site that finally matches the reputation behind it — and one the team runs themselves.",
    services: ["Web design", "CMS build", "Content", "Responsive", "SEO foundations"],
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
