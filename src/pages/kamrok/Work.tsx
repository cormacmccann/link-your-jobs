import { Link } from "react-router-dom";
import KamrokLayout, { Emblem, Divider } from "@/components/kamrok/KamrokLayout";

const FEATURED = [
  {
    n: "FEATURED · OWN PRODUCT",
    title: "Clubrovia",
    url: "https://clubrovia.com",
    body: "A complete club operating system — registration, finances, fundraising, communications and a generated club website, multi-tenant across many clubs. Designed and built end to end as our own product.",
    outcome: "Hundreds of members managed from one place, by people who aren't techies.",
    meta: "PRODUCT · SAAS · FULL-STACK · DESIGN SYSTEM",
  },
  {
    n: "FEATURED · CLIENT",
    title: "McKevitt's",
    url: "https://mckevitts.com",
    body: "A warm, modern website for a long-standing Irish business — clean structure, strong imagery and content the team can keep up to date themselves.",
    outcome: "A site that finally matches the reputation behind it.",
    meta: "WEB DESIGN · CMS · CONTENT",
  },
];

const CLIENTS = [
  { name: "Digital Screen Displays", url: "https://digitalscreendisplays.ie", desc: "Digital signage & commercial displays" },
  { name: "AVTS", url: "https://avts.ie", desc: "Auto-tech solutions, Ireland" },
  { name: "DSA Cloud", url: "https://dsa-cloud.com", desc: "Cloud platform & dashboard" },
  { name: "Kama Golf", url: "https://kamagolf.com", desc: "Golf brand & store" },
  { name: "Ruby Ellens", url: "https://rubyellens.com", desc: "Boutique & lifestyle" },
  { name: "Carlingford Arms", url: "https://carlingfordarms.com", desc: "Bar & restaurant, Carlingford" },
  { name: "Down to Earth Electrical", url: "https://downtoearthelectrical.com", desc: "Electrical contractor" },
  { name: "Carlinhauns", url: "https://carlichauns.com", desc: "Carlingford experience" },
  { name: "Last Leprechauns of Ireland", url: "https://lastleprechaunsofireland.com", desc: "Tourism & folklore" },
  { name: "Catering Disposables", url: "https://cateringdisposables.ie", desc: "Trade ecommerce" },
];

const LOGOS = ["tifco", "guinness-storehouse", "dundalk-stadium", "crowne-plaza", "coca-cola", "centra", "boylesports"];
const LOGO_EXT: Record<string, string> = { "coca-cola": "png", boylesports: "png" };

export default function Work() {
  return (
    <KamrokLayout
      title="Selected Work — Web Design Portfolio | KAMROK"
      description="Selected web design and front-end work — Clubrovia, McKevitt's and clients across Ireland and beyond. Real sites, real businesses, built end to end."
    >
      <Emblem />
      <div className="kk-eyebrow">SELECTED WORK · 02</div>
      <h1>The Work</h1>
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
              <a className="kk-visit" href={p.url} target="_blank" rel="noopener">VISIT SITE ↗</a>
            </div>
          </div>
        ))}
      </div>

      <h2 className="kk-sub">More clients</h2>
      <div className="kk-clients">
        {CLIENTS.map((c) => (
          <a className="kk-client" href={c.url} target="_blank" rel="noopener" key={c.url}>
            <span className="kk-client__name">{c.name} <span className="kk-client__arrow">↗</span></span>
            <span className="kk-client__desc">{c.desc}</span>
          </a>
        ))}
      </div>

      <h2 className="kk-sub">Trusted by</h2>
      <div className="kk-logos">
        {LOGOS.map((l) => (
          <img key={l} src={`/clients/${l}.${LOGO_EXT[l] || "webp"}`} alt={l} loading="lazy" />
        ))}
      </div>

      <Link className="kk-cta" to="/contact">START A PROJECT →</Link>
    </KamrokLayout>
  );
}
