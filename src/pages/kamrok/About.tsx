import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import KamrokLayout, { Divider } from "@/components/kamrok/KamrokLayout";
import cormacPhoto from "@/assets/team/cormac.png.asset.json";
import kaylaPhoto from "@/assets/team/kayla.png.asset.json";
import kamrokLogo from "@/assets/kamrok-logo.png.asset.json";

const PRINCIPLES = [
  { h: "Clarity over decoration", p: "Every element earns its place. If it doesn't help the visitor, it goes." },
  { h: "Performance is a feature", p: "Fast is a design decision — Core Web Vitals budgeted from day one." },
  { h: "Accessible by default", p: "Semantics, contrast and keyboard paths are the baseline, not an upgrade." },
  { h: "Built to last", p: "Work that still looks considered, and runs clean, five years from now." },
];

type Member = {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  photo: string;
  based: string;
  craft: string;
  bio: string;
  does: string[];
};

const TEAM: Member[] = [
  {
    id: "cormac", name: "Cormac McCann", role: "Founder · Design + Build", initials: "CM",
    color: "#8b7dff", photo: cormacPhoto.url, based: "Dundalk, IE", craft: "Web Design & Code",
    bio: "Founder, designer and programmer. Cormac builds the studio's sites end to end and has shipped projects across the board — with a background spanning hospitality, sales and marketing before the screen. A musician and artist at heart, and cautiously curious about AI: where it earns its place, and why that matters.",
    does: ["Design & front-end", "Projects, launched", "Hospitality → sales → marketing", "Music & art", "AI, used with intent"],
  },
  {
    id: "kayla", name: "Kayla Minto", role: "Creative & Client", initials: "KM",
    color: "#56a8ff", photo: kaylaPhoto.url, based: "Dundalk, IE", craft: "Creative Media",
    bio: "A Creative Media graduate from DKIT, Kayla brings a route that runs sales → hardware → software → back to sales — equal parts creative and commercial. She keeps projects (and clients) moving, and brings a fresh creative eye to everything the studio makes.",
    does: ["Creative Media (DKIT)", "Sales & accounts", "Hardware → software → sales", "Client & content"],
  },
];

function Portrait({ m, big }: { m: Member; big?: boolean }) {
  return (
    <span className={big ? "kk-codex-portrait" : "kk-team-av"}>
      <span className="kk-av-mono">{m.initials}</span>
      <img
        src={m.photo}
        alt={m.name}
        loading="lazy"
        onLoad={(e) => e.currentTarget.parentElement?.classList.add("has-img")}
        onError={(e) => e.currentTarget.remove()}
      />
    </span>
  );
}

export default function About() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [shownId, setShownId] = useState<string>(TEAM[0].id);
  const [whyOpen, setWhyOpen] = useState<boolean>(false);
  const { search } = useLocation();
  const member = TEAM.find((m) => m.id === shownId) || TEAM[0];

  // Open dossier when arriving via /about?member=cormac (floating CTA)
  useEffect(() => {
    const id = new URLSearchParams(search).get("member");
    if (id && TEAM.some((m) => m.id === id)) {
      setShownId(id);
      setOpenId(id);
    }
  }, [search]);

  const openMember = (id: string) => {
    setShownId(id);
    setOpenId(id);
  };
  const closeMember = () => setOpenId(null);
  const closeWhy = () => {
    setWhyOpen(false);
    try { sessionStorage.setItem("kk-why-seen", "1"); } catch {}
  };

  useEffect(() => {
    document.body.classList.toggle("kk-codex-open", !!openId);
    return () => document.body.classList.remove("kk-codex-open");
  }, [openId]);

  // Auto-open Why panel once per session, after a small delay
  useEffect(() => {
    let seen = "0";
    try { seen = sessionStorage.getItem("kk-why-seen") || "0"; } catch {}
    if (seen !== "1") {
      const t = setTimeout(() => setWhyOpen(true), 700);
      return () => clearTimeout(t);
    }
  }, []);

  // Esc closes whichever panel is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openId) closeMember();
      else if (whyOpen) closeWhy();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId, whyOpen]);

  return (
    <KamrokLayout
      title="About KAMROK — Design Studio & Team in Dundalk | Candy Shop Digital"
      description="KAMROK is the design studio of Candy Shop Digital Ltd in Dundalk — Cormac McCann and Kayla Minto, plus a trusted circle of specialists. Meet the team."
    >
      <div className="kk-logo-hero">
        <img src={kamrokLogo.url} alt="KAMROK" />
        <div className="kk-eyebrow">THE STUDIO · 01</div>
      </div>
      <Divider />
      <div className="kk-body">
        <p className="kk-lead">
          KAMROK is the design studio of Candy Shop Digital Ltd — a small, hands-on team in Dundalk,
          Ireland, crafting elegant, considered digital products for ambitious people.
        </p>
        <p>
          We design and build, end to end: brand and interface, then the hand-coded front-end that ships
          it. For bigger jobs we bring in a trusted circle of specialists. Same standard, more hands.
        </p>

        <h2>APPROACH</h2>
        <p>
          Good design is mostly subtraction. We start from the content and the user's intent, then strip
          away everything that doesn't serve them — until what's left feels inevitable.
        </p>

        <h2>WHAT WE VALUE</h2>
        {PRINCIPLES.map((pr) => (
          <p key={pr.h}>
            <strong>{pr.h}.</strong> {pr.p}
          </p>
        ))}
      </div>

      <h2 className="kk-sub">The Team — open a dossier</h2>
      <p className="kk-lead-text">Tap a card for the full breakdown.</p>
      <div className="kk-team">
        {TEAM.map((m) => (
          <button
            key={m.id}
            className={`kk-team-card${openId === m.id ? " is-active" : ""}`}
            style={{ ["--accent" as string]: m.color }}
            onClick={() => openMember(m.id)}
          >
            <Portrait m={m} />
            <span className="kk-team-name">{m.name}</span>
            <span className="kk-team-role">{m.role}</span>
            <span className="kk-team-open">VIEW DOSSIER →</span>
          </button>
        ))}
      </div>

      <Link className="kk-cta" to="/work">VIEW SELECTED WORK →</Link>

      {/* Persistent edge tab to (re)open the "why" pullout */}
      {!whyOpen && (
        <button className="kk-why-toggle" onClick={() => setWhyOpen(true)} aria-label="Why we built the Moon">
          WHY THE MOON
        </button>
      )}

      {/* Left-side "Why immersive" pullout */}
      <aside className={`kk-flyout-left${whyOpen ? " is-open" : ""}`} aria-hidden={!whyOpen}>
        <button className="kk-codex-x" onClick={closeWhy} aria-label="Close">✕</button>
        <div className="kk-eyebrow">WHY WE BUILT THE MOON</div>
        <h3>Templates are a great start. We wanted to go further.</h3>
        <p>
          We don't just build sites — <strong>we specialise in WordPress</strong> and we build to
          <strong> Shopify</strong>. The craft of clean code, fast stores and sites that actually
          convert is our day job.
        </p>
        <p>
          But in a world dominated by templates, we decided to do something different. Inspired by
          the beautiful sites we kept seeing, we wanted to build our own version — something that
          wasn't just another page, but an experience.
        </p>
        <p>
          So we built a fully explorable 3D world — <strong>not because we needed to, but because it
          shows we can</strong>. It's proof that the same studio building your Shopify store can also
          build something unforgettable.
        </p>
        <Link className="kk-cta" to="/" onClick={closeWhy}>EXPLORE THE 3D WORLD →</Link>
      </aside>

      {/* Team-dossier scrim + panel (slides from LEFT) */}
      <div
        className={`kk-codex-scrim${openId ? " is-open" : ""}`}
        onClick={closeMember}
        aria-hidden={!openId}
      />
      <aside
        className={`kk-codex-panel${openId ? " is-open" : ""}`}
        style={{ ["--accent" as string]: member.color }}
        aria-hidden={!openId}
      >
        <button className="kk-codex-x" onClick={closeMember} aria-label="Close">✕</button>
        <Portrait m={member} big />
        <div className="kk-codex-sigil">
          <svg viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity=".4" />
            <path d="M22 9 a11 11 0 1 0 0 22 a8.5 8.5 0 1 1 0 -22 z" fill="currentColor" fillOpacity=".85" />
          </svg>
        </div>
        <h2 className="kk-codex-name">{member.name}</h2>
        <div className="kk-codex-stats">
          <div><span>ROLE</span><b>{member.role}</b></div>
          <div><span>BASED</span><b>{member.based}</b></div>
          <div><span>CRAFT</span><b>{member.craft}</b></div>
        </div>
        <p className="kk-codex-bio">{member.bio}</p>
        <div className="kk-codex-label">DISCIPLINES</div>
        <ul className="kk-tags">
          {member.does.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <Link className="kk-cta" to="/contact" onClick={closeMember}>WORK WITH US →</Link>
      </aside>
    </KamrokLayout>
  );
}
