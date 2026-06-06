import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BookOpen, Compass, Menu, X, Settings, Map as MapIcon,
  MessageCircle, Youtube, Headphones, Bell, Volume2,
} from "lucide-react";
import "@/styles/immersive.css";

const PRIMARY = [
  { to: "/about", label: "ABOUT", count: "00/01", note: "The studio & team" },
  { to: "/work", label: "WORK", count: "04/12", note: "Selected projects" },
  { to: "/skills", label: "SKILLS", count: "05/05", note: "What I do" },
  { to: "/tools", label: "TOOLS", count: "24/24", note: "Free toolkit" },
  { to: "/contact", label: "CONTACT", note: "Open channel" },
];

const SOCIAL = [
  { label: "DISCORD", icon: MessageCircle, note: "Join the discussion", href: "#" },
  { label: "YOUTUBE", icon: Youtube, note: "Watch", href: "#" },
  { label: "ALL AUDIO", icon: Headphones, note: "Listen", href: "#" },
  { label: "GET NOTIFIED", icon: Bell, note: "Subscribe", href: "mailto:cormac@kamrok.com" },
];

/**
 * Persistent KAMROK navigation — the left rail + drawer + floating pills +
 * functional settings (fullscreen / volume). Shared by the dedicated pages
 * (via ImmersiveShell) and the interactive moon page.
 */
export default function KamrokNav({ onMoon = false }: { onMoon?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fs, setFs] = useState(false);
  const [vol, setVol] = useState(() => {
    const v = (window as { __kamrokVol?: number }).__kamrokVol;
    return typeof v === "number" ? Math.round(v * 100) : 75;
  });
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setShowSettings(false);
  }, [pathname]);

  useEffect(() => {
    const onFs = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    onFs();
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  useEffect(() => {
    (window as { __kamrokVol?: number }).__kamrokVol = vol / 100;
  }, [vol]);

  const toggleFs = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else document.documentElement.requestFullscreen?.();
    } catch {
      /* noop */
    }
  };

  return (
    <div className={`im-nav-root${onMoon ? " im-nav-root--moon" : ""}`}>
      {/* Left rail */}
      <aside className={`im-rail ${open ? "im-rail--hidden" : ""}`}>
        <button className="im-rail-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={18} strokeWidth={1.4} />
        </button>
        <div className="im-rail-icons">
          <Link to="/about" className="im-rail-icon" aria-label="About">
            <BookOpen size={16} strokeWidth={1.2} />
            <span>ABOUT</span>
          </Link>
          <Link to="/work" className="im-rail-icon" aria-label="Work">
            <Compass size={16} strokeWidth={1.2} />
            <span>WORK</span>
          </Link>
          <Link to="/" className="im-rail-icon" aria-label="Map">
            <MapIcon size={16} strokeWidth={1.2} />
            <span>MAP</span>
          </Link>
        </div>
        <div className="im-rail-divider" />
        <div className="im-rail-wordmark">KAMROK · DESIGN STUDIO</div>
        <button
          className={`im-rail-btn im-rail-btn--bottom ${showSettings ? "is-active" : ""}`}
          aria-label="Settings"
          onClick={() => setShowSettings((s) => !s)}
        >
          <Settings size={16} strokeWidth={1.2} />
        </button>
      </aside>

      {/* Floating top pills — off-moon only (the moon has its own top nav) */}
      {!onMoon && (
        <div className="im-top">
          <Link to="/" className="im-pill">
            <span className="im-pill-dot" />
            KAMROK
          </Link>
          <Link to="/contact" className="im-pill im-pill--accent">
            START A PROJECT →
          </Link>
        </div>
      )}

      {/* Floating map / back-to-moon — off-moon only */}
      {!onMoon && (
        <Link to="/" className="im-map">
          <MapIcon size={12} strokeWidth={1.4} /> BACK TO MOON
        </Link>
      )}

      {/* Settings popover */}
      <div className={`im-settings ${showSettings ? "is-open" : ""}`} aria-hidden={!showSettings}>
        <div className="im-settings-h">SETTINGS</div>
        <div className="im-settings-row">
          <span>FULLSCREEN</span>
          <span className="im-toggle">
            <button className={fs ? "is-on" : ""} onClick={toggleFs}>ON</button>
            <button className={!fs ? "is-on" : ""} onClick={toggleFs}>OFF</button>
          </span>
        </div>
        <div className="im-settings-row im-settings-row--vol">
          <span><Volume2 size={13} strokeWidth={1.5} /></span>
          <input
            type="range"
            min={0}
            max={100}
            value={vol}
            onChange={(e) => setVol(Number(e.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>

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
            <a href="/" className="im-nav-secondary">
              <span className="im-nav-tag">INTERACTIVE</span>
              <span className="im-nav-sec-label">MOONSCAPE</span>
              <span className="im-nav-note">Drive the buggy</span>
            </a>
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
    </div>
  );
}
