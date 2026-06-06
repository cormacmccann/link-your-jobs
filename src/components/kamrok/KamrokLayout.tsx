import { ReactNode, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "@/styles/kamrok.css";

const NAV = [
  { href: "/", label: "PLAY", external: true },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "WORK" },
  { href: "/skills", label: "SKILLS" },
  { href: "/contact", label: "CONTACT" },
];

const Corner = ({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) => (
  <span className={`kk-pc kk-${pos}`}>
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1}>
      <path d="M6 22 L6 6 L22 6" strokeOpacity=".6" />
      <path d="M11 24 L11 11 L24 11" strokeOpacity=".32" />
      <circle cx="6" cy="6" r="2" fill="currentColor" stroke="none" />
      <path d="M6 30 L6 27" strokeOpacity=".5" />
      <path d="M30 6 L27 6" strokeOpacity=".5" />
      <circle cx="20" cy="20" r="1.3" fill="currentColor" stroke="none" opacity=".7" />
    </svg>
  </span>
);

export const Emblem = () => (
  <div className="kk-emblem">
    <svg viewBox="0 0 56 56">
      <circle cx="28" cy="28" r="28" fill="#1d1822" />
      <circle cx="28" cy="28" r="19" fill="none" stroke="#efece2" strokeOpacity=".3" />
      <ellipse cx="28" cy="28" rx="19" ry="7" fill="none" stroke="#efece2" strokeOpacity=".22" />
      <path d="M32 16 a12 12 0 1 0 0 24 a9.2 9.2 0 1 1 0 -24 z" fill="#efece2" fillOpacity=".92" />
      <circle cx="41" cy="18" r="1.9" fill="#efece2" />
      <circle cx="14" cy="34" r="1.2" fill="#efece2" fillOpacity=".8" />
    </svg>
  </div>
);

export const Divider = () => (
  <div className="kk-div">
    <svg viewBox="0 0 210 16">
      <g stroke="currentColor" strokeWidth={1} fill="none" opacity=".85">
        <line x1="10" y1="8" x2="86" y2="8" />
        <line x1="124" y1="8" x2="200" y2="8" />
        <circle cx="105" cy="8" r="5.2" />
      </g>
      <g fill="currentColor">
        <circle cx="105" cy="8" r="1.7" />
        <circle cx="90" cy="8" r="1.2" />
        <circle cx="120" cy="8" r="1.2" />
        <circle cx="9" cy="8" r="1" />
        <circle cx="201" cy="8" r="1" />
      </g>
    </svg>
  </div>
);

interface Props {
  title: string;
  description: string;
  maxWidth?: number;
  footerRight?: ReactNode;
  children: ReactNode;
}

export default function KamrokLayout({ title, description, maxWidth = 880, footerRight, children }: Props) {
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

  return (
    <div className="kk-root">
      <div className="kk-page" style={{ maxWidth }}>
        <header className="kk-header">
          <a className="kk-mark" href="/">KAMROK</a>
          <nav className="kk-nav">
            {NAV.map((n) =>
              n.external ? (
                <a key={n.href} href={n.href}>{n.label}</a>
              ) : (
                <Link
                  key={n.href}
                  to={n.href}
                  aria-current={pathname === n.href ? "page" : undefined}
                >
                  {n.label}
                </Link>
              )
            )}
          </nav>
        </header>
        <article className="kk-card">
          <Corner pos="tl" /><Corner pos="tr" /><Corner pos="bl" /><Corner pos="br" />
          {children}
        </article>
        <footer className="kk-footer">
          <span>© {new Date().getFullYear()} KAMROK — Candy Shop Digital Ltd</span>
          {footerRight ?? <a href="mailto:cormac@kamrok.com">cormac@kamrok.com</a>}
        </footer>
      </div>
    </div>
  );
}
