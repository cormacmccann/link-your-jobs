import { Link, useLocation } from "@/lib/router-compat";
import { Globe, Briefcase, Sparkles, BookOpen, Mail } from "lucide-react";

const TABS = [
  { to: "/", label: "MOON", icon: Globe, match: (p: string) => p === "/" },
  { to: "/work", label: "WORK", icon: Briefcase, match: (p: string) => p.startsWith("/work") },
  { to: "/skills", label: "SKILLS", icon: Sparkles, match: (p: string) => p.startsWith("/skills") },
  { to: "/blog", label: "JOURNAL", icon: BookOpen, match: (p: string) => p.startsWith("/blog") },
  { to: "/contact", label: "CONTACT", icon: Mail, match: (p: string) => p.startsWith("/contact") },
];

/**
 * Tactile-app style bottom tab bar shown only on phones.
 * Glass blur, safe-area inset, gradient accent on active tab.
 */
export default function MobileTabBar() {
  const { pathname } = useLocation();
  return (
    <nav className="im-mtabs" aria-label="Primary">
      {TABS.map((t) => {
        const Icon = t.icon;
        const active = t.match(pathname);
        return (
          <Link key={t.to} to={t.to} className={`im-mtab ${active ? "is-active" : ""}`}>
            <Icon size={18} strokeWidth={1.6} />
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
