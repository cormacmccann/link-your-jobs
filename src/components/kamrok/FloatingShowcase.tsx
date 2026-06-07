import { useEffect, useRef } from "react";

// Fills the empty left space on the dedicated pages with floating, interactive
// client logos + larger project cards that 3D-tilt toward the cursor.

type Logo = { type: "logo"; src: string; alt: string; url: string; top: string; left: string; dur: number; delay: number };
type Card = { type: "card"; tag: string; name: string; desc: string; url: string; top: string; left: string; dur: number; delay: number };
type Item = Logo | Card;

const ITEMS: Item[] = [
  { type: "card", tag: "OWN PRODUCT", name: "Clubrovia", desc: "Club operating system ↗", url: "https://clubrovia.com", top: "14%", left: "13%", dur: 8.5, delay: 1.1 },
  { type: "card", tag: "CLIENT · LOGO + WEB", name: "McKevitt's", desc: "Hotel · Bar · Restaurant ↗", url: "https://mckevitts.ie", top: "44%", left: "20%", dur: 7.8, delay: 2 },
  { type: "card", tag: "CLIENT", name: "Carlingford Arms", desc: "Bar & restaurant ↗", url: "https://carlingfordarms.com", top: "72%", left: "13%", dur: 8.6, delay: 0.5 },
  { type: "logo", src: "/clients/guinness-storehouse.webp", alt: "Guinness Storehouse", url: "https://guinness-storehouse.com", top: "8%", left: "33%", dur: 7.5, delay: 0 },
  { type: "logo", src: "/clients/coca-cola.png", alt: "Coca-Cola", url: "https://coca-cola.com", top: "30%", left: "4%", dur: 6.8, delay: 0.6 },
  { type: "logo", src: "/clients/tifco.webp", alt: "TIFCO Hotel Group", url: "https://tifcohotels.com", top: "34%", left: "36%", dur: 7.2, delay: 1.6 },
  { type: "logo", src: "/clients/crowne-plaza.webp", alt: "Crowne Plaza", url: "https://crowneplaza.com", top: "60%", left: "36%", dur: 8, delay: 0.9 },
  { type: "logo", src: "/clients/dundalk-stadium.webp", alt: "Dundalk Stadium", url: "https://dundalkstadium.com", top: "86%", left: "31%", dur: 7.6, delay: 1.9 },
  { type: "logo", src: "/clients/boylesports.png", alt: "BoyleSports", url: "https://boylesports.com", top: "66%", left: "4%", dur: 7, delay: 2.3 },
  { type: "logo", src: "/clients/centra.webp", alt: "Centra", url: "https://centra.ie", top: "20%", left: "26%", dur: 7.4, delay: 1.2 },
];


export default function FloatingShowcase() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(hover: none)").matches) return; // touch: skip tilt
    const inners = Array.from(layer.querySelectorAll<HTMLElement>(".im-float-inner"));
    let raf = 0;
    let mx = -9999, my = -9999;
    const INF = 320;
    const apply = () => {
      raf = 0;
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
  }, []);

  return (
    <div className="im-float" ref={layerRef} aria-hidden>
      {ITEMS.map((it, i) => (
        <div
          className="im-float-item"
          key={i}
          style={{ top: it.top, left: it.left, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}
        >
          {it.type === "logo" ? (
            <a className="im-float-inner im-float-logo" href={it.url} target="_blank" rel="noopener">
              <img src={it.src} alt={it.alt} loading="lazy" />
            </a>
          ) : (
            <a className="im-float-inner im-float-card" href={it.url} target="_blank" rel="noopener">
              <span className="im-float-card__tag">{it.tag}</span>
              <span className="im-float-card__name">{it.name}</span>
              <span className="im-float-card__desc">{it.desc}</span>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
