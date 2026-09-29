import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";
import Testimonials from "@/components/kamrok/Testimonials";

const FEATURED = [
  {
    n: "FEATURED · OWN PRODUCT",
    title: "Clubrovia",
    slug: "clubrovia",
    url: "https://clubrovia.com",
    body: "A complete club operating system — registration, finances, fundraising, communications and a generated club website, multi-tenant across many clubs. Designed and built end to end as our own product.",
    outcome: "Hundreds of members managed from one place, by people who aren't techies.",
    meta: "PRODUCT · SAAS · FULL-STACK · DESIGN SYSTEM",
  },
  {
    n: "FEATURED · CLIENT",
    title: "McKevitt's Village Hotel",
    slug: "mckevitts",
    url: "https://mckevitts.ie",
    body: "Logo, brand identity and website for a family-run boutique hotel, bar and restaurant in Carlingford. One coherent mark across stay, dining and bar — and a fast, image-led WordPress site the family runs themselves.",
    outcome: "One identity, three businesses, and a site that finally looks like the place feels.",
    meta: "LOGO · BRAND · WEB DESIGN · WORDPRESS",
  },
  {
    n: "CLIENT",
    title: "The Carlingford Arms",
    slug: "carlingford-arms",
    url: "https://carlingfordarms.com",
    body: "A warm, image-led website for one of Carlingford's best-loved bars and restaurants — menus the team owns, mobile-first reservations and local SEO baked in.",
    outcome: "More direct bookings, fewer phone calls about 'is the kitchen open?'.",
    meta: "WEB DESIGN · WORDPRESS · CMS · LOCAL SEO",
  },
];


type CaseThumb = { slug: string; name: string; url: string; desc: string; thumb: string };
const CASE_THUMBS: CaseThumb[] = [
  { slug: "carlingford-arms", name: "The Carlingford Arms", url: "https://carlingfordarms.com", desc: "Bar & restaurant · Carlingford", thumb: "/case-thumbs/carlingford-arms.png" },
  { slug: "onyerbike", name: "On Yer Bike Carlingford", url: "https://onyerbike.ie", desc: "Bike hire · Cooley Peninsula", thumb: "/case-thumbs/onyerbike.png" },
  { slug: "catering-disposables", name: "Catering Disposables", url: "https://cateringdisposables.ie", desc: "Trade ecommerce", thumb: "/case-thumbs/catering-disposables.png" },
  { slug: "greyhound", name: "Greyhound Extreme", url: "https://greyhoundextreme.com", desc: "Premium herbal · Irish brand", thumb: "/case-thumbs/greyhound.png" },
  { slug: "thehenie", name: "TheHen.ie", url: "https://thehen.ie", desc: "Hen-party planning experts", thumb: "/case-thumbs/thehenie.png" },
  { slug: "carlichauns", name: "Carlichauns", url: "https://carlichauns.com", desc: "Kids & family IP", thumb: "/case-thumbs/carlichauns.png" },
  { slug: "coil-carrier", name: "Coil Carrier", url: "https://coilcarrier.com", desc: "Engineering product microsite", thumb: "/case-thumbs/coil-carrier.png" },
  { slug: "marmion", name: "Marmion Engineering", url: "https://marmionengineering.ie", desc: "Custom fabrication · EN1090", thumb: "/case-thumbs/marmion.png" },
  { slug: "down-to-earth", name: "Down to Earth Electrical", url: "https://downtoearthelectrical.com", desc: "Electrical · IE · UK · DE", thumb: "/case-thumbs/down-to-earth.png" },
];

const LOGOS = [
  "tifco", "guinness-storehouse", "dundalk-stadium", "crowne-plaza", "coca-cola", "centra", "boylesports",
  "thehenie", "onyerbike", "catering-disposables", "carlingford-arms", "last-leprechauns", "coil-carrier", "down-to-earth", "carlichauns",
];
const LOGO_EXT: Record<string, string> = {
  "coca-cola": "png", boylesports: "png",
  thehenie: "png", onyerbike: "png", "catering-disposables": "webp",
  "carlingford-arms": "png", "last-leprechauns": "png", "coil-carrier": "png",
  "down-to-earth": "png", carlichauns: "png",
};

export default function Work() {
  return (
    <KamrokLayout
      title="Selected Work — Web Design Portfolio | KAMROK"
      description="Selected web design and front-end work — Clubrovia, McKevitt's and clients across Ireland and beyond. Real sites, real businesses, built end to end."
    >
      <Emblem />
      <h1 className="work-heading">THE WORK</h1>
      <div className="kk-eyebrow work-eyebrow">SELECTED WORK · 03</div>
      <Divider />
      <p className="kk-lead-text">
        Real sites for real businesses — from our own products to long-standing local names and brands
        you'll know. A selection below; plenty more on request.
      </p>

      <div className="kk-work">
        {FEATURED.map((p) => (
          <div className="kk-proj" key={p.title}>
            <div className="kk-n">{p.n}</div>
            <div>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <p style={{ color: "#a59ccf", fontStyle: "italic" }}>{p.outcome}</p>
              <div className="kk-meta">{p.meta}</div>
              <div className="kk-proj-links">
                <Link className="kk-visit kk-visit--solid" to={`/work/${p.slug}`}>CASE STUDY →</Link>
                <a className="kk-visit" href={p.url} target="_blank" rel="noopener">VISIT SITE ↗</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="kk-sub">More case studies</h2>
      <div className="kk-case-grid">
        {CASE_THUMBS.map((c) => (
          <Link className="kk-case-card" to={`/work/${c.slug}`} key={c.slug}>
            <div className="kk-case-card__thumb">
              <img src={c.thumb} alt={`${c.name} website screenshot`} loading="lazy" />
            </div>
            <div className="kk-case-card__body">
              <span className="kk-case-card__name">{c.name}</span>
              <span className="kk-case-card__desc">{c.desc}</span>
              <span className="kk-case-card__cta">CASE STUDY →</span>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="kk-sub">Trusted by</h2>
      <div className="kk-logos">
        {LOGOS.map((l) => (
          <img key={l} src={`/clients/${l}.${LOGO_EXT[l] || "webp"}`} alt={`${l.replace(/-/g, " ")} client logo`} loading="lazy" />
        ))}
      </div>

      <Testimonials />

      <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
    </KamrokLayout>
  );
}
