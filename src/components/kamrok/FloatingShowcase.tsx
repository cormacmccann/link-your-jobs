import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import cormacPhoto from "@/assets/team/cormac.png.asset.json";
import kaylaPhoto from "@/assets/team/kayla.png.asset.json";

// Fills the empty left space on the dedicated pages with floating, interactive
// client logos + larger project cards that 3D-tilt toward the cursor.

type Logo = {
  type: "logo";
  src: string;
  alt: string;
  url: string;
  top: string;
  left: string;
  dur: number;
  delay: number;
  dx: number; // px drift horizontal
  dy: number; // px drift vertical
  blur: number; // px default blur
  scale?: number; // size multiplier
};
type Member = { type: "member"; tag: string; name: string; role: string; photo: string; accent: string; href: string; top: string; left: string; dur: number; delay: number };
type Item = Logo | Member;

const WORK_ITEMS: Item[] = [
  { type: "logo", src: "/clients/guinness-storehouse.webp", alt: "Guinness Storehouse", url: "https://guinness-storehouse.com", top: "6%", left: "30%", dur: 11, delay: 0, dx: 28, dy: -18, blur: 0, scale: 1.05 },
  { type: "logo", src: "/clients/coca-cola.png", alt: "Coca-Cola", url: "https://coca-cola.com", top: "18%", left: "4%", dur: 13, delay: 0.6, dx: -22, dy: 24, blur: 2.5 },
  { type: "logo", src: "/clients/tifco.webp", alt: "TIFCO Hotel Group", url: "https://tifcohotels.com", top: "12%", left: "16%", dur: 9.5, delay: 1.6, dx: 18, dy: 26, blur: 1.5 },
  { type: "logo", src: "/clients/crowne-plaza.webp", alt: "Crowne Plaza", url: "https://crowneplaza.com", top: "30%", left: "32%", dur: 14, delay: 0.9, dx: -30, dy: -22, blur: 0 },
  { type: "logo", src: "/clients/dundalk-stadium.webp", alt: "Dundalk Stadium", url: "https://dundalkstadium.com", top: "88%", left: "28%", dur: 12, delay: 1.9, dx: 24, dy: -28, blur: 3, scale: 0.9 },
  { type: "logo", src: "/clients/boylesports.png", alt: "BoyleSports", url: "https://boylesports.com", top: "62%", left: "2%", dur: 10, delay: 2.3, dx: 30, dy: 18, blur: 0 },
  { type: "logo", src: "/clients/centra.webp", alt: "Centra", url: "https://centra.ie", top: "44%", left: "10%", dur: 11.5, delay: 1.2, dx: -26, dy: 22, blur: 2 },
  { type: "logo", src: "/clients/thehenie.png", alt: "The HENie", url: "https://thehen.ie", top: "8%", left: "8%", dur: 12.5, delay: 0.3, dx: 22, dy: 30, blur: 1, scale: 0.95 },
  { type: "logo", src: "/clients/onyerbike.png", alt: "On Yer Bike", url: "https://onyerbike.ie", top: "52%", left: "30%", dur: 9, delay: 1.5, dx: -20, dy: 26, blur: 0 },
  { type: "logo", src: "/clients/catering-disposables.webp", alt: "Catering Disposables", url: "https://cateringdisposables.ie", top: "76%", left: "20%", dur: 13.5, delay: 0.7, dx: 26, dy: -20, blur: 3, scale: 0.9 },
  { type: "logo", src: "/clients/last-leprechauns.png", alt: "Last Leprechauns of Ireland", url: "https://lastleprechaunsofireland.com", top: "38%", left: "22%", dur: 10.5, delay: 2.1, dx: -28, dy: -16, blur: 2 },
  { type: "logo", src: "/clients/coil-carrier.png", alt: "Coil Carrier", url: "https://coilcarrier.com", top: "92%", left: "6%", dur: 11.8, delay: 1.8, dx: 24, dy: 22, blur: 0 },
  { type: "logo", src: "/clients/down-to-earth.png", alt: "Down to Earth Electrical", url: "https://downtoearthelectrical.com", top: "54%", left: "18%", dur: 12.2, delay: 1.0, dx: -22, dy: 28, blur: 1.5 },
  { type: "logo", src: "/clients/carlichauns.png", alt: "Carlinhauns", url: "https://carlichauns.com", top: "24%", left: "26%", dur: 10.8, delay: 2.5, dx: 28, dy: -24, blur: 2.5, scale: 0.95 },
  { type: "logo", src: "/clients/carlingford-arms.png", alt: "Carlingford Arms", url: "https://carlingfordarms.com", top: "68%", left: "26%", dur: 13, delay: 0.4, dx: -24, dy: 20, blur: 0 },
];

// On the About page: feature the two team members as floating CTAs at the top,
// and push the work showcase down so it sits below them.
const TEAM_ITEMS: Item[] = [
  { type: "member", tag: "FOUNDER · DESIGN + BUILD", name: "Cormac McCann", role: "Meet Cormac →", photo: cormacPhoto.url, accent: "#8b7dff", href: "/about?member=cormac", top: "10%", left: "10%", dur: 8.2, delay: 0.4 },
  { type: "member", tag: "CREATIVE & CLIENT", name: "Kayla Minto", role: "Meet Kayla →", photo: kaylaPhoto.url, accent: "#56a8ff", href: "/about?member=kayla", top: "26%", left: "24%", dur: 7.6, delay: 1.3 },
];

const ABOUT_SHIFT = 36; // percentage points to push work items down on About
function shiftDown(items: Item[], by: number): Item[] {
  return items.map((it) => {
    const n = parseFloat(it.top);
    const next = Math.min(96, n + by);
    return { ...it, top: `${next}%` } as Item;
  });
}



export default function FloatingShowcase() {
  const layerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";
  const items: Item[] = isAbout
    ? [...TEAM_ITEMS, ...shiftDown(WORK_ITEMS, ABOUT_SHIFT)]
    : WORK_ITEMS;

  // Indices of logo items (eligible for blur swap)
  const logoIndices = useMemo(
    () => items.map((it, i) => (it.type === "logo" ? i : -1)).filter((i) => i >= 0),
    [items]
  );
  const [blurred, setBlurred] = useState<Set<number>>(() => {
    const s = new Set<number>();
    items.forEach((it, i) => {
      if (it.type === "logo" && it.blur > 0) s.add(i);
    });
    return s;
  });
  const onLogoEnter = (i: number) => {
    setBlurred((prev) => {
      if (!prev.has(i)) return prev;
      const next = new Set(prev);
      next.delete(i);
      // Pick a replacement from logos not currently blurred (and not the hovered one)
      const candidates = logoIndices.filter((idx) => idx !== i && !next.has(idx));
      if (candidates.length) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        next.add(pick);
      }
      return next;
    });
  };

  // Event delegation: catches hovers even when React's synthetic events are flaky
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.(".im-float-logo") as HTMLElement | null;
      if (!a) return;
      const idx = Number(a.dataset.idx);
      if (Number.isFinite(idx)) onLogoEnter(idx);
    };
    layer.addEventListener("mouseover", onOver);
    return () => layer.removeEventListener("mouseover", onOver);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logoIndices]);


  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    // skip the cursor-tilt on touch, and for visitors who asked for reduced motion
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    let raf = 0;
    let mx = -9999, my = -9999;
    const INF = 320;
    const apply = () => {
      raf = 0;
      const inners = layer.querySelectorAll<HTMLElement>(".im-float-inner");
      for (const el of inners) {
        const r = el.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        if (dist < INF) {
          const f = 1 - dist / INF;
          const ry = (dx / INF) * 26;
          const rx = (-dy / INF) * 26;
          el.style.transform = `perspective(620px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(${(f * 34).toFixed(1)}px) scale(${(1 + f * 0.14).toFixed(3)})`;
          el.style.zIndex = "4";
        } else {
          el.style.transform = "";
          el.style.zIndex = "";
        }
        // Proximity-based blur swap: trigger when cursor is over the logo's actual rect
        if (
          el.classList.contains("im-float-logo") &&
          mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom
        ) {
          const idx = Number((el as HTMLElement).dataset.idx);
          if (Number.isFinite(idx)) onLogoEnter(idx);
        }
      }
    };
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <div className="im-float" ref={layerRef}>
      {items.map((it, i) => {
        const itemStyle: React.CSSProperties = {
          top: it.top,
          left: it.left,
          animationDuration: `${it.dur}s`,
          animationDelay: `${it.delay}s`,
        };
        if (it.type === "logo") {
          (itemStyle as Record<string, string>)["--dx"] = `${it.dx}px`;
          (itemStyle as Record<string, string>)["--dy"] = `${it.dy}px`;
        }
        return (
        <div
          className={it.type === "logo" ? "im-float-item im-float-item--drift" : "im-float-item im-float-item--member"}
          key={i}
          style={itemStyle}
        >
          {it.type === "logo" ? (
            <a
              className={`im-float-inner im-float-logo${blurred.has(i) ? " is-blurred" : ""}`}
              href={it.url}
              target={it.url === "#" ? undefined : "_blank"}
              rel="noopener"
              data-idx={i}
              style={{
                ["--scl" as string]: String(it.scale ?? 1),
              }}
            >
              <img src={it.src} alt={it.alt} loading="lazy" />
            </a>
          ) : (
            <Link
              className="im-float-inner im-float-member"
              to={it.href}
              style={{ ["--accent" as string]: it.accent }}
            >
              <span className="im-float-member__photo">
                <img src={it.photo} alt={it.name} loading="lazy" />
              </span>
              <span className="im-float-member__body">
                <span className="im-float-member__tag">{it.tag}</span>
                <span className="im-float-member__name">{it.name}</span>
                <span className="im-float-member__cta">{it.role}</span>
              </span>
            </Link>
          )}
        </div>
        );
      })}
    </div>
  );
}
