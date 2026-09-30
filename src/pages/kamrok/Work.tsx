import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import KamrokLayout from "@/components/kamrok/KamrokLayout";
import Testimonials from "@/components/kamrok/Testimonials";
import clubLaptop from "@/assets/clubrovia/laptop.png.asset.json";
import mckHero from "@/assets/mckevitts/hero.png.asset.json";

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

const LOGOS = ["tifco", "guinness-storehouse", "dundalk-stadium", "crowne-plaza", "coca-cola", "centra", "boylesports"];
const LOGO_EXT: Record<string, string> = {
  "coca-cola": "png", boylesports: "png",
  thehenie: "png", onyerbike: "png", "catering-disposables": "webp",
  "carlingford-arms": "png", "last-leprechauns": "png", "coil-carrier": "png",
  "down-to-earth": "png", carlichauns: "png",
};

const PROJECTS = [
  { slug: "clubrovia", name: "Clubrovia", desc: "Product design & development", thumb: clubLaptop.url },
  { slug: "mckevitts", name: "McKevitt’s Village Hotel", desc: "Brand identity & web design", thumb: mckHero.url },
  ...CASE_THUMBS,
];

export default function Work() {
  return (
    <KamrokLayout
      title="Selected Work — Web Design Portfolio | KAMROK"
      description="Selected web design and front-end work — Clubrovia, McKevitt's and clients across Ireland and beyond."
    >
      <div className="kk-eyebrow">THE PORTFOLIO</div>
      <h1>Selected work.</h1>
      <p className="kk-lead-text">Websites, brands and digital products. A few things we’ve made for ambitious businesses, and for ourselves.</p>
      <div className="studio-work-grid">
        {PROJECTS.map((project, index) => (
          <Link className="studio-project" to={`/work/${project.slug}`} key={project.slug}>
            <span className="studio-project-image">
              <img src={project.thumb} alt={`${project.name} website`} loading={index < 2 ? "eager" : "lazy"} />
            </span>
            <div className="studio-project-caption">
              <div><h2>{project.name}</h2><p>{project.desc}</p></div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
      <h2 className="kk-sub">In good company</h2>
      <div className="kk-logos">
        {LOGOS.map((logo) => (
          <img key={logo} src={`/clients/${logo}.${LOGO_EXT[logo] || "webp"}`} alt={`${logo.replace(/-/g, " ")} client logo`} loading="lazy" />
        ))}
      </div>
      <Testimonials limit={2} />
    </KamrokLayout>
  );
}
