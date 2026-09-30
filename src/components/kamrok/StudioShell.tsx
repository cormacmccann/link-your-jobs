import { useEffect, useRef } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu } from "lucide-react";
import kamrokLogo from "@/assets/kamrok-logo.png.asset.json";
import "@/styles/studio.css";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Services" },
  { to: "/blog", label: "Notes" },
  { to: "/tools", label: "Tools" },
];

/** Shared, quiet navigation for every page beyond the moon. */
export default function StudioShell() {
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (menuRef.current) menuRef.current.open = false;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    mainRef.current?.focus({ preventScroll: true });
    if (pathname.startsWith("/tools")) {
      const heading = mainRef.current?.querySelector("h1")?.textContent?.trim();
      document.title = `${pathname === "/tools" ? "Free tools" : heading || "Tools"} | KAMROK`;
    }
  }, [pathname]);

  return (
    <div className={`studio-page${pathname.startsWith("/tools") ? " studio-tools" : ""}`}>
      <a className="studio-skip" href="#studio-content">Skip to content</a>
      <header className="studio-header studio-container">
        <Link to="/" className="studio-logo" aria-label="KAMROK home">
          <img src={kamrokLogo.url} alt="KAMROK" width="118" height="66" />
        </Link>
        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {LINKS.map((link) => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
        </nav>
        <Link className="studio-contact" to="/contact">Let’s talk <ArrowUpRight size={15} aria-hidden="true" /></Link>
        <details className="studio-mobile-menu" ref={menuRef} onKeyDown={(event) => {
          if (event.key === "Escape" && menuRef.current?.open) {
            menuRef.current.open = false;
            menuRef.current.querySelector("summary")?.focus();
          }
        }}>
          <summary aria-label="Navigation menu"><Menu size={22} aria-hidden="true" /></summary>
          <nav aria-label="Mobile navigation">
            {LINKS.map((link) => <NavLink key={link.to} to={link.to}>{link.label}</NavLink>)}
            <Link to="/">Explore the moon <ArrowUpRight size={15} aria-hidden="true" /></Link>
          </nav>
        </details>
      </header>
      <main id="studio-content" ref={mainRef} tabIndex={-1}><Outlet /></main>
      <footer className="studio-footer studio-container">
        <div className="studio-footer-top"><p>Have something in mind?</p><Link to="/contact">Let’s talk <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
        <div className="studio-footer-bottom">
          <span>© {new Date().getFullYear()} KAMROK · Dundalk, Ireland</span>
          <a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a>
          <Link to="/">Explore the moon <ArrowUpRight size={14} aria-hidden="true" /></Link>
        </div>
      </footer>
    </div>
  );
}
