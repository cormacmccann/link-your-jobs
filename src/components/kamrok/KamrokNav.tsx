import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Compass, BookOpen, Sparkles, Newspaper, Menu, X, Settings, Map as MapIcon, Target, Volume2,
  MessageCircle, Youtube, Headphones, Bell, Music,
} from "lucide-react";
import "@/styles/immersive.css";
import MobileNav from "./MobileNav";
import lockOnPulse from "@/assets/moon/tracks/lock-on-pulse.mp3.asset.json";
import orbitCrown from "@/assets/moon/tracks/orbit-crown.mp3.asset.json";
import orbitalDrift from "@/assets/moon/tracks/orbital-drift.mp3.asset.json";

const TRACKS = [
  { id: "default", label: "MOONSCAPE", url: "" }, // empty = use default window.MUSIC
  { id: "drift", label: "ORBITAL DRIFT", url: orbitalDrift.url },
  { id: "crown", label: "ORBIT CROWN", url: orbitCrown.url },
  { id: "pulse", label: "LOCK ON PULSE", url: lockOnPulse.url },
];

const PRIMARY = [
  { to: "/about", label: "ABOUT", count: "00/02", note: "The studio & team" },
  { to: "/work", label: "WORK", count: "04/12", note: "Selected projects" },
  { to: "/skills", label: "SKILLS", count: "05/05", note: "What we do" },
  { to: "/blog", label: "BLOG", note: "Field notes" },
  { to: "/tools", label: "TOOLS", count: "24/24", note: "Free toolkit" },
  { to: "/contact", label: "CONTACT", note: "Open channel" },
];

const SOCIAL = [
  { label: "DISCORD", icon: MessageCircle, note: "Join the discussion", href: "#" },
  { label: "YOUTUBE", icon: Youtube, note: "Watch", href: "#" },
  { label: "ALL AUDIO", icon: Headphones, note: "Listen", href: "#" },
  { label: "GET NOTIFIED", icon: Bell, note: "Subscribe", href: "mailto:cormac@kamrok.com" },
];

type W = Window & {
  __kamrokVol?: number; __kamrokMusic?: boolean; __kamrokSound?: boolean; __kamrokTrack?: string;
};

/**
 * Persistent KAMROK navigation — a dark bar on the right (menu + settings),
 * with audio/display settings folded into SETTINGS and a bottom-left hub that
 * opens the moon's map/objectives. Shared by the moon and the dedicated pages.
 */
export default function KamrokNav({ onMoon = false }: { onMoon?: boolean }) {
  const [open, setOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fs, setFs] = useState(false);
  const [vol, setVol] = useState(70);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);
  const [trackId, setTrackId] = useState<string>("default");
  const [mapOn, setMapOn] = useState(false);
  const [objOn, setObjOn] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); setShowSettings(false); }, [pathname]);
  useEffect(() => {
    const f = () => setFs(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", f); f();
    return () => document.removeEventListener("fullscreenchange", f);
  }, []);
  useEffect(() => { (window as W).__kamrokVol = vol / 100; }, [vol]);
  useEffect(() => { (window as W).__kamrokMusic = music; }, [music]);
  useEffect(() => { (window as W).__kamrokSound = sound; }, [sound]);
  useEffect(() => {
    const t = TRACKS.find((x) => x.id === trackId);
    (window as W).__kamrokTrack = t?.url || "";
  }, [trackId]);

  const toggleFs = () => {
    try {
      if (document.fullscreenElement) document.exitFullscreen?.();
      else document.documentElement.requestFullscreen?.();
    } catch { /* noop */ }
  };
  const togglePanel = (id: string, set: (b: boolean) => void) => {
    const el = document.getElementById(id);
    if (el) set(el.classList.toggle("hud--open"));
  };

  return (
    <div className={`im-nav-root${onMoon ? " im-nav-root--moon" : ""}`}>
      <MobileNav onMoon={onMoon} />
      {/* Right dark menu bar (desktop) */}
      <aside className="im-rail">
        <button className="im-rail-btn" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={18} strokeWidth={1.4} />
        </button>
        <Link to="/" className="im-rail-logo" aria-label="KAMROK home">
          <img src="/kamrok-logo.png" alt="KAMROK" />
        </Link>
        <div className="im-rail-icons">
          <Link to="/about" className="im-rail-icon"><Compass size={16} strokeWidth={1.4} /><span>ABOUT</span></Link>
          <Link to="/work" className="im-rail-icon"><BookOpen size={16} strokeWidth={1.4} /><span>WORK</span></Link>
          <Link to="/skills" className="im-rail-icon"><Sparkles size={16} strokeWidth={1.4} /><span>SKILLS</span></Link>
          <Link to="/contact" className="im-rail-icon"><Newspaper size={16} strokeWidth={1.4} /><span>CONTACT</span></Link>
        </div>
        <div className="im-rail-divider" />
        <div className="im-rail-wordmark">KAMROK · DESIGN STUDIO</div>
        <div className="im-rail-bottom">
          <Link
            to="/"
            className="im-rail-icon im-rail-moon"
            aria-label="Back to the moonscape"
            onClick={() => {
              try { (window as any).__kamrokExitSpace?.(); } catch (e) { /* noop */ }
              try { window.dispatchEvent(new CustomEvent("kamrok:exit-space")); } catch (e) { /* noop */ }
            }}
          >
            <MapIcon size={16} strokeWidth={1.3} /><span>MOON</span>
          </Link>
          <button
            className={`im-rail-btn ${showSettings ? "is-active" : ""}`}
            onClick={() => setShowSettings((s) => !s)} aria-label="Settings"
          >
            <Settings size={16} strokeWidth={1.2} />
          </button>
        </div>
      </aside>

      {/* Settings popover */}
      <div className={`im-settings ${showSettings ? "is-open" : ""}`} aria-hidden={!showSettings}>
        <div className="im-settings-h">SETTINGS</div>
        <div className="im-settings-row">
          <span>MUSIC</span>
          <span className="im-toggle">
            <button className={music ? "is-on" : ""} onClick={() => setMusic(true)}>ON</button>
            <button className={!music ? "is-on" : ""} onClick={() => setMusic(false)}>OFF</button>
          </span>
        </div>
        <div className="im-settings-row">
          <span>SOUND</span>
          <span className="im-toggle">
            <button className={sound ? "is-on" : ""} onClick={() => setSound(true)}>ON</button>
            <button className={!sound ? "is-on" : ""} onClick={() => setSound(false)}>OFF</button>
          </span>
        </div>
        <div className="im-settings-row">
          <span>FULLSCREEN</span>
          <span className="im-toggle">
            <button className={fs ? "is-on" : ""} onClick={() => { if (!fs) toggleFs(); }}>ON</button>
            <button className={!fs ? "is-on" : ""} onClick={() => { if (fs) toggleFs(); }}>OFF</button>
          </span>
        </div>
        <div className="im-settings-row im-settings-row--vol">
          <span><Volume2 size={13} strokeWidth={1.5} /></span>
          <input type="range" min={0} max={100} value={vol} onChange={(e) => setVol(Number(e.target.value))} aria-label="Volume" />
        </div>
        {music && (
          <div className="im-settings-tracks">
            <div className="im-settings-tracks-h"><Music size={11} strokeWidth={1.5} /> TRACK</div>
            <div className="im-settings-tracks-list">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  className={`im-track-btn ${trackId === t.id ? "is-on" : ""}`}
                  onClick={() => setTrackId(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Drawer (slides from the right) */}
      <div className={`im-drawer ${open ? "im-drawer--open" : ""}`} aria-hidden={!open}>
        <button className="im-drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={16} strokeWidth={1.4} />
        </button>
        <nav className="im-nav">
          <ul className="im-nav-primary">
            {PRIMARY.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={`im-nav-item ${pathname === n.to ? "is-active" : ""}`}>
                  <span className="im-nav-label">{n.label}</span>
                  {n.count && <span className="im-nav-count">{n.count}</span>}
                  {n.note && <span className="im-nav-note">{n.note}</span>}
                </Link>
              </li>
            ))}
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
                  <span className="im-soc-label"><Icon size={14} strokeWidth={1.4} /> {s.label}</span>
                </a>
              );
            })}
          </div>
          <div className="im-nav-foot">
            <span>PRIVACY</span><span>·</span><span>TERMS</span><span>·</span>
            <span>© {new Date().getFullYear()} KAMROK</span>
          </div>
        </nav>
      </div>

      {/* Bottom-left mini hub — opens the moon's map / objectives */}
      {onMoon && (
        <div className="im-hub">
          <button className={`im-hub-btn ${mapOn ? "is-on" : ""}`} onClick={() => togglePanel("hudRadar", setMapOn)}>
            <MapIcon size={14} strokeWidth={1.5} /><span>MAP</span>
          </button>
          <button className={`im-hub-btn ${objOn ? "is-on" : ""}`} onClick={() => togglePanel("hudObj", setObjOn)}>
            <Target size={14} strokeWidth={1.5} /><span>OBJECTIVES</span>
          </button>
        </div>
      )}
    </div>
  );
}
