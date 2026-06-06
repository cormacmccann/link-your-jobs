import { Link } from "react-router-dom";
import type { MonumentKey } from "./Monuments";

const COPY: Record<MonumentKey, { eyebrow: string; title: string; body: string; href: string }> = {
  about: {
    eyebrow: "01 / KAMROK",
    title: "About",
    body: "Candy Shop Digital Ltd — independent design and build studio based in Dundalk. Crafted experiences for ambitious brands.",
    href: "/about",
  },
  work: {
    eyebrow: "02 / KAMROK",
    title: "Selected Work",
    body: "Recent projects across product, identity and immersive web. Step inside to explore the case studies.",
    href: "/work",
  },
  skills: {
    eyebrow: "03 / KAMROK",
    title: "Skills",
    body: "Brand systems, full-stack product, real-time 3D, and the workflow tooling that ties it together.",
    href: "/skills",
  },
  contact: {
    eyebrow: "04 / KAMROK",
    title: "Contact",
    body: "Tell us what you're building. We reply within one working day.",
    href: "/contact",
  },
};

export default function MonumentPanel({
  monument,
  onClose,
}: {
  monument: MonumentKey;
  onClose: () => void;
}) {
  const c = COPY[monument];
  return (
    <div className="moon-panel-backdrop" onClick={onClose}>
      <div className="moon-panel" onClick={(e) => e.stopPropagation()}>
        <div className="moon-panel__eyebrow">{c.eyebrow}</div>
        <h2 className="moon-panel__title">{c.title}</h2>
        <p className="moon-panel__body">{c.body}</p>
        <div className="moon-panel__actions">
          <Link to={c.href} className="moon-panel__cta">
            Enter →
          </Link>
          <button className="moon-panel__close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
