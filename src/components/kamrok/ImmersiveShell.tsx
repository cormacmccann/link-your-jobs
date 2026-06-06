import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Compass, Menu, X, Settings, Map as MapIcon, MessageCircle, Youtube, Headphones, Bell } from "lucide-react";
import heroBg from "@/assets/immersive-hero.jpg";
import "@/styles/immersive.css";

interface NavItem {
  to: string;
  label: string;
  count?: string;
  note?: string;
}

const PRIMARY: NavItem[] = [
  { to: "/about",   label: "ABOUT",    count: "00/01", note: "The studio" },
  { to: "/work",    label: "WORK",     count: "03/12", note: "Selected projects" },
  { to: "/skills",  label: "SKILLS",   count: "06/06", note: "What I do" },
  { to: "/tools",   label: "TOOLS",    count: "24/24", note: "Free toolkit" },
  { to: "/contact", label: "CONTACT",  note: "Open channel" },
];

const SECONDARY = [
  { to: "/", label: "MOONSCAPE", tag: "INTERACTIVE", note: "Drive the buggy" },
];

const SOCIAL = [
  { label: "DISCORD",   icon: MessageCircle, note: "Join the discussion", href: "#" },
  { label: "YOUTUBE",   icon: Youtube,       note: "Watch",                href: "#" },
  { label: "ALL AUDIO", icon: Headphones,    note: "Listen",               href: "#" },
  { label: "GET NOTIFIED", icon: Bell,       note: "Subscribe",            href: "mailto:cormac@kamrok.com" },
];

interface Props {
  title: string;
  description: string;
  pageLabel?: string; // shown vertically on left rail e.g. "A LIGHT IN THE WOODS"
  children: ReactNode;
}

export default function ImmersiveShell({ title, description, pageLabel = "KAMROK · DESIGN STUDIO", children }: Props) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div className="im-root">
      {/* Painterly backdrop */}
      <div
        className="im-bg"
        style={{ backgroundImage: `url(${heroBg})` }}
        aria-hidden
      />
      <div className="im-bg-vignette" aria-hidden />
      <div className="im-bg-frame" aria-hidden />

      {/* Left rail (collapsed) */}
      <aside className={`im-rail ${open ? "im-rail--hidden" : ""}`}>
        <button className="im-rail-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={18} strokeWidth={1.4} />
        </button>
        <div className="im-rail-icons">
          <Link to="/work" className="im-rail-icon" aria-label="Work">
            <BookOpen size={16} strokeWidth={1.2} />
            <span>WORK</span>
          </Link>
          <Link to="/skills" className="im-rail-icon" aria-label="Skills">
            <Compass size={16} strokeWidth={1.2} />
            <span>SKILLS</span>
          </Link>
        </div>
        <div className="im-rail-divider" />
        <div className="im-rail-wordmark">{pageLabel}</div>
        <button className="im-rail-btn im-rail-btn--bottom" aria-label="Settings">
          <Settings size={16} strokeWidth={1.2} />
        </button>
      </aside>

      {/* Floating top buttons */}
      <div className="im-top">
        <Link to="/" className="im-pill">
          <span className="im-pill-dot" />
          KAMROK
        </Link>
        <Link to="/contact" className="im-pill im-pill--accent">
          START A PROJECT →
        </Link>
      </div>

      {/* Floating map / locator */}
      <button className="im-map">
        <MapIcon size={12} strokeWidth={1.4} /> MAP
      </button>

      {/* Drawer */}
      <div className={`im-drawer ${open ? "im-drawer--open" : ""}`} aria-hidden={!open}>
        <button className="im-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={16} strokeWidth={1.4} />
        </button>

        <nav className="im-nav">
          <ul className="im-nav-primary">
            {PRIMARY.map((n) => {
              const active = pathname === n.to;
              return (
                <li key={n.to}>
                  <Link to={n.to} className={`im-nav-item ${active ? "is-active" : ""}`}>
                    <span className="im-nav-label">{n.label}</span>
                    {n.count && <span className="im-nav-count">{n.count}</span>}
                    {n.note && <span className="im-nav-note">{n.note}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="im-nav-section">
            {SECONDARY.map((s) => (
              <a key={s.label} href={s.to} className="im-nav-secondary">
                <span className="im-nav-tag">{s.tag}</span>
                <span className="im-nav-sec-label">{s.label}</span>
                <span className="im-nav-note">{s.note}</span>
              </a>
            ))}
          </div>

          <div className="im-nav-socials">
            {SOCIAL.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} className="im-soc">
                  <span className="im-soc-note">{s.note}</span>
                  <span className="im-soc-label">
                    <Icon size={14} strokeWidth={1.4} /> {s.label}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="im-nav-foot">
            <span>PRIVACY</span>
            <span>·</span>
            <span>TERMS</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} KAMROK</span>
          </div>
        </nav>
      </div>

      {/* Content */}
      <main className="im-main">{children}</main>
    </div>
  );
}
