import { Link, useParams } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

type Feature = { h: string; p: string };
type CaseData = {
  name: string;
  domain: string;
  url: string;
  tagline: string;
  role: string;
  year: string;
  accent: string;
  overview: string;
  challenge: string;
  approach: string;
  features: Feature[];
  outcome: string;
  services: string[];
  next: { slug: string; name: string };
};

const CASES: Record<string, CaseData> = {
  clubrovia: {
    name: "Clubrovia",
    domain: "clubrovia.com",
    url: "https://clubrovia.com",
    tagline: "A club operating system for the modern sports club.",
    role: "Own product · Design + Build",
    year: "2024 — present",
    accent: "#8b7dff",
    overview:
      "Clubrovia is our own product — a complete operating system for sports clubs. One place to run registration, finances, fundraising, communications and a public-facing club website, across many clubs at once.",
    challenge:
      "Clubs run on spreadsheets, group chats and goodwill. Volunteers burn out chasing membership renewals, reconciling cash and keeping a website alive. We set out to replace all of it with one tool a non-technical committee could actually run.",
    approach:
      "Multi-tenant from day one — every club gets its own branded space and only the modules it needs. We designed a dedicated admin system for configuration, finances and compliance, alongside a generated 'Club Hub' mini-website for members and supporters, with distinct roles for platform and club management.",
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

  if (!data) {
    return (
      <KamrokLayout title="Case study — KAMROK" description="Case study">
        <Emblem />
        <h1>Not found</h1>
        <Divider />
        <p className="kk-lead-text">That case study doesn't exist (yet).</p>
        <Link className="kk-cta" to="/work">← BACK TO WORK</Link>
      </KamrokLayout>
    );
  }

  return (
    <KamrokLayout
      title={`${data.name} — Case Study | KAMROK`}
      description={`${data.name}: ${data.tagline} A KAMROK case study.`}
    >
      <div className="kk-case" style={{ ["--accent" as string]: data.accent }}>
        <div className="kk-eyebrow">CASE STUDY</div>
        <h1>{data.name}</h1>
        <p className="kk-case-tag">{data.tagline}</p>
        <Divider />

        {/* stylised browser mockup */}
        <a className="kk-case-screen" href={data.url} target="_blank" rel="noopener">
          <div className="kk-case-bar"><i /><i /><i /><span>{data.domain}</span></div>
          <div className="kk-case-glass"><span>{data.name}</span><em>VISIT LIVE SITE ↗</em></div>
        </a>

        <div className="kk-case-meta">
          <div><span>ROLE</span><b>{data.role}</b></div>
          <div><span>YEAR</span><b>{data.year}</b></div>
          <div><span>LIVE</span><a href={data.url} target="_blank" rel="noopener">{data.domain} ↗</a></div>
        </div>

        <div className="kk-case-body">
          <p className="kk-lead">{data.overview}</p>
          <h2>THE CHALLENGE</h2>
          <p>{data.challenge}</p>
          <h2>THE APPROACH</h2>
          <p>{data.approach}</p>
        </div>

        <h2 className="kk-sub">Highlights</h2>
        <div className="kk-case-features">
          {data.features.map((f) => (
            <div className="kk-case-feature" key={f.h}>
              <h3>{f.h}</h3>
              <p>{f.p}</p>
            </div>
          ))}
        </div>

        <div className="kk-case-outcome">
          <span className="kk-eyebrow">THE OUTCOME</span>
          <p>{data.outcome}</p>
        </div>

        <ul className="kk-tags" style={{ justifyContent: "center", maxWidth: "58ch", margin: "22px auto 0" }}>
          {data.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <div className="kk-case-foot">
          <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
          <Link className="kk-case-next" to={`/work/${data.next.slug}`}>
            NEXT · {data.next.name} →
          </Link>
        </div>
      </div>
    </KamrokLayout>
  );
}
