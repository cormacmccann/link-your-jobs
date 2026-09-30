import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Youtube, Headphones, Bell, Volume2 } from "lucide-react";
import MobileTabBar from "./MobileTabBar";
import kamrokLogo from "@/assets/kamrok-logo.png.asset.json";

const PRIMARY = [
  { to: "/about", label: "ABOUT", count: "00/02", note: "The studio & team" },
  { to: "/work", label: "WORK", count: "04/12", note: "Selected projects" },
  { to: "/skills", label: "SKILLS", count: "05/05", note: "What we do" },
  { to: "/blog", label: "BLOG", note: "Field notes" },
  { to: "/tools", label: "TOOLS", count: "24/24", note: "Free toolkit" },
  { to: "/contact", label: "CONTACT", note: "Open channel" },
];

const SOCIAL = [
  { label: "DISCORD", icon: MessageCircle, href: "#" },
  { label: "YOUTUBE", icon: Youtube, href: "#" },
  { label: "AUDIO", icon: Headphones, href: "#" },
  { label: "NOTIFY", icon: Bell, href: "mailto:cormac@kamrok.com" },
];

type W = Window & { __kamrokVol?: number; __kamrokMusic?: boolean; __kamrokSound?: boolean };

/**
 * Mobile-only navigation: slim top bar + full-screen menu.
 * Rendered by KamrokNav alongside the desktop rail/drawer and shown only at <768px via CSS.
 */
export default function MobileNav({ onMoon = false }: { onMoon?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);
  const [vol, setVol] = useState(70);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (onMoon) return;
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onMoon]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => { (window as W).__kamrokVol = vol / 100; }, [vol]);
  useEffect(() => { (window as W).__kamrokMusic = music; }, [music]);
  useEffect(() => { (window as W).__kamrokSound = sound; }, [sound]);

  return (
    <div className="im-mobile">
      <header className={`im-mtop ${scrolled || onMoon ? "is-solid" : ""}`}>
        <Link to="/" className="im-mtop-mark" aria-label="KAMROK home">
          <img src={kamrokLogo.url} alt="KAMROK" width="86" height="48" style={{ width: 86, height: 48, objectFit: "contain" }} />
        </Link>
        <button
          className="im-mtop-btn"
          onClick={() => setOpen((s) => !s)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
        </button>
      </header>

      <div className={`im-msheet ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="im-msheet-inner">
          <ul className="im-mnav">
            {PRIMARY.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={`im-mnav-item ${pathname === n.to ? "is-active" : ""}`}>
                  <span className="im-mnav-label">{n.label}</span>
                  {n.count && <span className="im-mnav-count">{n.count}</span>}
                  {n.note && <span className="im-mnav-note">{n.note}</span>}
                </Link>
              </li>
            ))}
          </ul>

          {!onMoon && (
            <Link to="/" className="im-mnav-moon">
              <span className="im-mnav-tag">INTERACTIVE</span>
              <span className="im-mnav-moon-label">MOONSCAPE →</span>
            </Link>
          )}

          <div className="im-msocials">
            {SOCIAL.map((s) => {
              const Icon = s.icon;
              return (
                <a key={s.label} href={s.href} className="im-msoc">
                  <Icon size={14} strokeWidth={1.4} /> {s.label}
                </a>
              );
            })}
          </div>

          <div className="im-msettings">
            <div className="im-mset-row">
              <span>MUSIC</span>
              <span className="im-toggle">
                <button className={music ? "is-on" : ""} onClick={() => setMusic(true)}>ON</button>
                <button className={!music ? "is-on" : ""} onClick={() => setMusic(false)}>OFF</button>
              </span>
            </div>
            <div className="im-mset-row">
              <span>SOUND</span>
              <span className="im-toggle">
                <button className={sound ? "is-on" : ""} onClick={() => setSound(true)}>ON</button>
                <button className={!sound ? "is-on" : ""} onClick={() => setSound(false)}>OFF</button>
              </span>
            </div>
            <div className="im-mset-row im-mset-row--vol">
              <span><Volume2 size={13} strokeWidth={1.5} /></span>
              <input type="range" min={0} max={100} value={vol} onChange={(e) => setVol(Number(e.target.value))} aria-label="Volume" />
            </div>
          </div>

          <div className="im-mfoot">
            <span>© {new Date().getFullYear()} KAMROK</span>
            <a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a>
          </div>
        </div>
      </div>
      {!onMoon && <MobileTabBar />}
    </div>
  );
}
