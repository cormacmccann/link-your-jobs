// Fills the empty left space on the dedicated pages with gently floating,
// interactive client logos + mini project cards.

type Logo = { type: "logo"; src: string; alt: string; url: string; top: string; left: string; dur: number; delay: number };
type Card = { type: "card"; name: string; desc: string; url: string; top: string; left: string; dur: number; delay: number };
type Item = Logo | Card;

const ITEMS: Item[] = [
  { type: "logo", src: "/clients/guinness-storehouse.webp", alt: "Guinness Storehouse", url: "https://guinness-storehouse.com", top: "12%", left: "7%", dur: 7.5, delay: 0 },
  { type: "card", name: "Clubrovia", desc: "Club OS · our product", url: "https://clubrovia.com", top: "26%", left: "19%", dur: 8.5, delay: 1.1 },
  { type: "logo", src: "/clients/coca-cola.png", alt: "Coca-Cola", url: "https://coca-cola.com", top: "44%", left: "5%", dur: 6.8, delay: 0.6 },
  { type: "card", name: "McKevitt's", desc: "Web design", url: "https://mckevitts.com", top: "55%", left: "21%", dur: 7.8, delay: 2 },
  { type: "logo", src: "/clients/tifco.webp", alt: "TIFCO Hotel Group", url: "https://tifcohotels.com", top: "70%", left: "9%", dur: 7.2, delay: 1.6 },
  { type: "logo", src: "/clients/crowne-plaza.webp", alt: "Crowne Plaza", url: "https://crowneplaza.com", top: "22%", left: "31%", dur: 8, delay: 0.9 },
  { type: "card", name: "Digital Screen Displays", desc: "Signage", url: "https://digitalscreendisplays.ie", top: "82%", left: "23%", dur: 8.6, delay: 1.3 },
  { type: "logo", src: "/clients/dundalk-stadium.webp", alt: "Dundalk Stadium", url: "https://dundalkstadium.com", top: "40%", left: "32%", dur: 7.6, delay: 1.9 },
  { type: "logo", src: "/clients/boylesports.png", alt: "BoyleSports", url: "https://boylesports.com", top: "88%", left: "6%", dur: 7, delay: 2.3 },
  { type: "card", name: "Carlingford Arms", desc: "Hospitality", url: "https://carlingfordarms.com", top: "66%", left: "33%", dur: 8.2, delay: 0.4 },
];

export default function FloatingShowcase() {
  return (
    <div className="im-float" aria-hidden>
      {ITEMS.map((it, i) =>
        it.type === "logo" ? (
          <a
            key={i}
            className="im-float-logo"
            href={it.url}
            target="_blank"
            rel="noopener"
            style={{ top: it.top, left: it.left, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}
          >
            <img src={it.src} alt={it.alt} loading="lazy" />
          </a>
        ) : (
          <a
            key={i}
            className="im-float-card"
            href={it.url}
            target="_blank"
            rel="noopener"
            style={{ top: it.top, left: it.left, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}
          >
            <span className="im-float-card__name">{it.name}</span>
            <span className="im-float-card__desc">{it.desc} ↗</span>
          </a>
        )
      )}
    </div>
  );
}
