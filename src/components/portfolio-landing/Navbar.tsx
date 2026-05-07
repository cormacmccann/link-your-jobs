import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Journal", to: "/journal" },
  { label: "Explorations", to: "/explorations" },
  { label: "Resume", to: "/resume" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow ${
          scrolled ? "shadow-md shadow-black/40" : ""
        }`}
      >
        <Link to="/" className="group relative w-9 h-9 rounded-full p-[1.5px] accent-gradient transition-transform hover:scale-110">
          <span className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative w-full h-full rounded-full bg-bg flex items-center justify-center font-display text-[13px] text-text-primary">
            JA
          </span>
        </Link>

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {LINKS.map((l) => {
          const isActive = l.to === "/" ? pathname === "/" : pathname.startsWith(l.to);
          return (
            <Link
              key={l.label}
              to={l.to}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${
                isActive
                  ? "text-text-primary bg-stroke/50"
                  : "text-pl-muted hover:text-text-primary hover:bg-stroke/50"
              }`}
            >
              {l.label}
            </Link>
          );
        })}

        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <a
          href="mailto:hello@michaelsmith.com"
          className="group relative text-xs sm:text-sm rounded-full text-text-primary"
        >
          <span
            className="absolute rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ inset: -2 }}
          />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md">
            Say hi <span aria-hidden>↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}
