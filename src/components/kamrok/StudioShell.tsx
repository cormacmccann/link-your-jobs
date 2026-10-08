import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "@/lib/router-compat";
import { BookOpen, Code2, Copy, LayoutGrid, Mail, Menu, MessageCircle, Phone, Moon, Sun, Orbit, UserRound, Wrench } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";
import StudioDrawer, { type DrawerKind } from "@/components/kamrok/StudioDrawer";
import Galaxy from "@/components/kamrok/Galaxy";

import { useStudioTheme } from "@/hooks/useStudioTheme";
import kamrokLogo from "@/assets/kamrok-logo.png.asset.json";
import { LOVABLE_AFFILIATE_URL, CONTACT_PHONE, CONTACT_TEL } from "@/lib/brand";
import "@/styles/studio.css";
import "@/styles/orbit.css";
import "@/styles/cinematic.css";

const LINKS = [
  { to: "/work", label: "The work", icon: LayoutGrid },
  { to: "/templates", label: "Templates", icon: Copy },
  { to: "/skills", label: "What I do", icon: Wrench },
  { to: "/about", label: "The studio", icon: UserRound },
];

export default function StudioShell() {
  const { pathname, hash } = useLocation();
  const { theme, toggleTheme } = useStudioTheme();
  const [drawer, setDrawer] = useState<DrawerKind>(null);
  const drawerTrigger = useRef<HTMLElement>(null);
  const openDrawer = (kind: DrawerKind, trigger: HTMLElement) => { (drawerTrigger as { current: HTMLElement | null }).current = trigger; setDrawer(kind); };
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setDrawer(null);
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
    if (pathname.startsWith("/tools")) {
      const heading = mainRef.current?.querySelector("h1")?.textContent?.trim();
      document.title = `${pathname === "/tools" ? "Free tools" : heading || "Tools"} | KAMROK`;
    }
  }, [pathname, hash]);

  return (
    <div data-theme={theme} className={`studio-page${pathname === "/" ? " studio-home" : ""}${pathname.startsWith("/tools") ? " studio-tools" : ""}${pathname === "/work" ? " studio-work" : ""}`}>
      <a className="studio-skip" href="#studio-content">Skip to content</a>
      <div className="studio-header-wrap">
        <header className="studio-header studio-container">
          <Link to="/" className="studio-logo" aria-label="KAMROK home"><img src={theme === "light" ? "/kamrok-logo-bright-mode.png" : kamrokLogo.url} alt="KAMROK studio logo" width="118" height="66" /></Link>
          <nav className="studio-desktop-nav" aria-label="Main navigation">
            {LINKS.map(link => <NavLink className="cinematic-action" key={link.to} to={link.to}>{link.label}<ActionFeedback icon={link.icon} size={15} /></NavLink>)}
            <NavLink className="cinematic-action" to="/contact">Let’s talk <ActionFeedback icon={MessageCircle} size={15} /></NavLink>
          </nav>
          <div className="studio-header-actions">
            <button className="studio-theme-toggle cinematic-action" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "bright" : "dark"} mode`} title={theme === "dark" ? "Hello, sunshine" : "To the dark side"}>
              <ActionFeedback icon={theme === "dark" ? Sun : Moon} size={19} />
            </button>
            <button className="studio-mobile-trigger cinematic-action" type="button" aria-label="Navigation menu" aria-haspopup="dialog" aria-expanded={drawer === "menu"} onClick={event => openDrawer("menu", event.currentTarget)}><ActionFeedback icon={Menu} size={22} direction="down" /></button>
            <button className="studio-fun cinematic-action" type="button" aria-label="FUN — explore the playground" aria-haspopup="dialog" aria-expanded={drawer === "fun"} onClick={event => openDrawer("fun", event.currentTarget)}><ActionFeedback icon={Orbit} /><span>FUN</span><span className="studio-fun-dot" /></button>
          </div>
        </header>
      </div>
      <StudioDrawer kind={drawer} onChange={setDrawer} trigger={drawerTrigger} />
      <main id="studio-content" ref={mainRef} tabIndex={-1}><Outlet /></main>
      <footer className="studio-footer studio-container">
        <Galaxy />
        <div className="studio-footer-top">
          <div><span className="orbit-eyebrow">HAVE A PROJECT IN MIND?</span><p>Your next move.<br /><em>Let’s make it happen.</em></p></div>
          <Link className="orbit-button cinematic-action" to="/contact">Talk to Cormac <ActionFeedback icon={MessageCircle} size={19} /></Link>
        </div>
        <div className="studio-footer-bottom">
          <span>© {new Date().getFullYear()} KAMROK<br />Candy Shop Digital Ltd · Dundalk, Ireland</span>
          <a className="cinematic-action" href="mailto:cormac@kamrok.com">cormac@kamrok.com <ActionFeedback icon={Mail} size={15} /></a>
          <a className="cinematic-action" href={CONTACT_TEL}>{CONTACT_PHONE} <ActionFeedback icon={Phone} size={15} /></a>
          <nav aria-label="Footer navigation"><Link className="cinematic-action" to="/blog">Field notes <ActionFeedback icon={BookOpen} size={14} /></Link><Link className="cinematic-action" to="/tools">Free tools <ActionFeedback icon={Wrench} size={14} /></Link><button className="cinematic-action" onClick={event => openDrawer("fun", event.currentTarget)}>Off-duty <ActionFeedback icon={Orbit} size={14} /></button><a className="cinematic-action" href={LOVABLE_AFFILIATE_URL} target="_blank" rel="sponsored noopener noreferrer">Try Lovable <ActionFeedback icon={Code2} size={14} /> <span className="orbit-affiliate-note">Affiliate link</span></a></nav>
        </div>
        <div className="studio-footer-signoff"><span>DESIGN · ILLUSTRATION · DEVELOPMENT · MARKETING</span><span>54° N · 6° W</span></div>
      </footer>
    </div>
  );
}
