import clubLaptop from "@/assets/clubrovia/laptop.png.asset.json";
import mckHero from "@/assets/mckevitts/hero.png.asset.json";
import mckRooms from "@/assets/mckevitts/rooms.jpg.asset.json";

export type ProjectImage = { src: string; alt: string; caption: string };
export type CaseData = {
  name: string;
  category: string;
  url?: string;
  intro: string;
  year?: string;
  surface: string;
  hero: ProjectImage;
  description: string[];
  services: string[];
  gallery?: ProjectImage[];
  presentation?: "screens";
  categories?: string[];
  next: string;
};

export const PROJECT_CASES: Record<string, CaseData> = {
  "global-tiles-bathrooms": {
    name: "Global Tiles & Bathrooms",
    category: "Interiors & retail · Website & app design",
    intro: "From a little inspiration to a considered selection.",
    surface: "#111d26",
    presentation: "screens",
    categories: ["websites", "apps", "commerce"],
    hero: {
      src: "/projects/global-tiles-bathrooms/homepage.png",
      alt: "Global Tiles & Bathrooms homepage with a sunlit stone bathroom and the headline Beautiful spaces begin here",
      caption: "A warm, editorial welcome to the showroom online.",
    },
    description: [
      "A website and app design for Global Tiles & Bathrooms, bringing the atmosphere of the showroom into an online experience. Rich interior photography, deep navy and warm stone tones give tiles, flooring and bathrooms room to make an impression.",
      "The product journey moves from inspiration to a useful enquiry. Visitors can refine the catalogue by brand, material and finish, save a shortlist, and add room notes and approximate quantities. Their selections feed into an email draft they can review before sending to the team.",
    ],
    services: ["Website & app design", "Product catalogue UX", "Filtering & product discovery", "Shortlist & enquiry flow"],
    gallery: [
      { src: "/projects/global-tiles-bathrooms/flooring-catalogue.png", alt: "Flooring catalogue with product cards and filters for brand, product type, collection and finish", caption: "A visual catalogue with clear ways to narrow the choice." },
      { src: "/projects/global-tiles-bathrooms/brand-filters.png", alt: "Expanded tile selection interface with brand cards and grouped product filters", caption: "Explore brands and combine filters around the space you have in mind." },
      { src: "/projects/global-tiles-bathrooms/catalogue-responsive.png", alt: "Global Tiles flooring catalogue displayed in a narrower four-column layout", caption: "The same catalogue, with a layout that adapts to the available space." },
      { src: "/projects/global-tiles-bathrooms/project-shortlist.png", alt: "Saved flooring selections with fields for approximate areas and room notes", caption: "A shortlist that keeps the products and project details together." },
      { src: "/projects/global-tiles-bathrooms/enquiry-form.png", alt: "Project enquiry form showing selected products, contact fields and an email draft action", caption: "One considered next step: prepare an enquiry, then review it before sending." },
    ],
    next: "clubrovia",
  },

  clubrovia: {
    name: "Clubrovia",
    category: "Our own product · Sports & community",
    url: "https://clubrovia.com",
    intro: "More time for the club. Less time running it.",
    year: "2024 — present",
    surface: "#171329",
    hero: { src: clubLaptop.url, alt: "Clubrovia dashboard presented on a laptop", caption: "Club management, brought together." },
    description: [
      "We designed and built Clubrovia to bring memberships, payments, fundraising and communication into one place for sports clubs.",
      "A clear dashboard helps committees manage the day-to-day, while each club gets its own branded website. The same design system carries through to the mobile experience for coaches and members.",
    ],
    services: ["Product design", "Design system", "Web development"],
    next: "mckevitts",
  },
  mckevitts: {
    name: "McKevitt’s Village Hotel",
    category: "Hospitality · Carlingford",
    url: "https://mckevitts.ie",
    intro: "A warm welcome, from the very first visit.",
    year: "2024 — 2025",
    surface: "#29261e",
    hero: { src: mckHero.url, alt: "McKevitt’s Village Hotel website", caption: "One identity for the hotel, bar and restaurant." },
    description: [
      "A new identity and website for a family-run hotel in the heart of Carlingford. We brought the hotel, bar and restaurant together under one considered brand.",
      "The website puts the rooms, food and setting first, with a clear route to booking. The family can update menus, offers and events themselves.",
    ],
    services: ["Brand identity", "Web design", "WordPress development"],
    gallery: [{ src: mckRooms.url, alt: "A guest room at McKevitt’s Village Hotel", caption: "A closer look at the stay." }],
    next: "carlingford-arms",
  },
  "carlingford-arms": {
    name: "The Carlingford Arms",
    category: "Hospitality · Carlingford",
    url: "https://carlingfordarms.com",
    intro: "A much-loved local, with a fresh presence online.",
    year: "2024",
    surface: "#29221b",
    hero: { src: "/case-thumbs/carlingford-arms.png", alt: "The Carlingford Arms website", caption: "Food, atmosphere and a table waiting." },
    description: [
      "We rebuilt the Carlingford Arms website around the things guests come for: the food, the atmosphere and a place to gather.",
      "Warm imagery and clear navigation make menus and reservations easy to find. A straightforward WordPress setup lets the team keep everything current.",
    ],
    services: ["Web design", "WordPress development", "Local SEO"],
    next: "onyerbike",
  },
  onyerbike: {
    name: "On Yer Bike",
    category: "Tourism · Carlingford",
    url: "https://onyerbike.ie",
    intro: "Making the next adventure easy to find.",
    year: "2024",
    surface: "#2a241e",
    hero: { src: "/case-thumbs/onyerbike.png", alt: "On Yer Bike Carlingford website", caption: "Explore the peninsula. Find your route. Book a bike." },
    description: [
      "A booking-focused website for a family bike-hire business on the shores of Carlingford Lough.",
      "We paired bold photography with useful route information and a clear booking journey. Designed around visitors on their phones, the site makes planning a day out feel simple.",
    ],
    services: ["Web design", "WordPress development", "Booking integration"],
    next: "catering-disposables",
  },
  "catering-disposables": {
    name: "Catering Disposables",
    category: "Ecommerce · Trade supplies",
    url: "https://cateringdisposables.ie",
    intro: "A busy product range, made easy to shop.",
    year: "2024",
    surface: "#20282c",
    hero: { src: "/case-thumbs/catering-disposables.png", alt: "Catering Disposables online store", caption: "Everyday supplies, without the search." },
    description: [
      "An online store for the cafés, restaurants and takeaway businesses that depend on Catering Disposables.",
      "We organised a large catalogue around clear categories, prominent search and practical delivery information. Account and reorder flows help returning customers get straight to what they need.",
    ],
    services: ["Ecommerce design", "WooCommerce development", "Trade UX"],
    next: "greyhound",
  },
  greyhound: {
    name: "Greyhound Extreme",
    category: "Ecommerce · Irish brand",
    url: "https://greyhoundextreme.com",
    intro: "A specialist brand, thoughtfully presented.",
    year: "2024",
    surface: "#291d1d",
    hero: { src: "/case-thumbs/greyhound.png", alt: "Greyhound Extreme online store", caption: "The products and the story behind them." },
    description: [
      "A website and online store for an Irish business creating herbal products for greyhounds.",
      "We gave the brand’s story and product information room to breathe, supported by a straightforward shopping experience and clear ways to ask for advice.",
    ],
    services: ["Web design", "Ecommerce design", "Shopify development"],
    next: "thehenie",
  },
  thehenie: {
    name: "TheHen.ie",
    category: "Travel & experiences",
    url: "https://thehen.ie",
    intro: "The beginning of a great weekend.",
    year: "2024",
    surface: "#292519",
    hero: { src: "/case-thumbs/thehenie.png", alt: "TheHen.ie party planning website", caption: "Destinations and experiences, ready to explore." },
    description: [
      "A fresh website for a team planning hen parties across Ireland, from city weekends to coastal getaways.",
      "An editorial feel brings the experiences to life, while clear paths through destinations and ready-made packages help groups find the right fit.",
    ],
    services: ["Web design", "WordPress development", "Booking journey"],
    next: "carlichauns",
  },
  carlichauns: {
    name: "Carlichauns",
    category: "Entertainment · Kids & family",
    url: "https://carlichauns.com",
    intro: "A little world with a big imagination.",
    year: "2024",
    surface: "#20271e",
    hero: { src: "/case-thumbs/carlichauns.png", alt: "Carlichauns entertainment website", caption: "An online home for the characters and their world." },
    description: [
      "A playful website for an Irish entertainment brand spanning books, characters and a real-world adventure trail.",
      "We built the experience around the brand’s illustrations, with clear routes for families to explore and for partners to learn more.",
    ],
    services: ["Web design", "Web development", "Illustration integration"],
    next: "coil-carrier",
  },
  "coil-carrier": {
    name: "Coil Carrier",
    category: "Engineering · Product website",
    url: "https://coilcarrier.com",
    intro: "Complex engineering. A clear proposition.",
    year: "2024",
    surface: "#1b252e",
    hero: { src: "/case-thumbs/coil-carrier.png", alt: "Coil Carrier product website", caption: "A focused introduction to the product." },
    description: [
      "A dedicated product website for Marmion Engineering’s reusable steel coil carriers.",
      "We brought specifications, use cases and frequently asked questions into a focused experience, giving buyers the information they need and a direct route to enquire.",
    ],
    services: ["Web design", "Product UX", "Web development"],
    next: "marmion",
  },
  marmion: {
    name: "Marmion Engineering",
    category: "Engineering · Manufacturing",
    url: "https://marmionengineering.ie",
    intro: "Built to show what they’re capable of.",
    year: "2024",
    surface: "#1e252b",
    hero: { src: "/case-thumbs/marmion.png", alt: "Marmion Engineering website", caption: "The team’s capabilities, products and services in one place." },
    description: [
      "A website for an engineering business delivering custom steel fabrication in-house.",
      "We gave their capabilities a clear structure, connecting services and product lines under one consistent identity. Industrial imagery and direct enquiry routes keep the focus on the work.",
    ],
    services: ["Web design", "Content structure", "Web development"],
    next: "down-to-earth",
  },
  "down-to-earth": {
    name: "Down to Earth Electrical",
    category: "Electrical · Commercial & industrial",
    url: "https://downtoearthelectrical.com",
    intro: "A growing team, with a presence to match.",
    year: "2024",
    surface: "#1b2824",
    hero: { src: "/case-thumbs/down-to-earth.png", alt: "Down to Earth Electrical website", caption: "Specialist services, clearly communicated." },
    description: [
      "A website for an electrical contractor working across Ireland, the UK and Germany.",
      "We brought their services, credentials and team together in a clear, confident design. Regional contact details make it easy for prospective clients to reach the right people.",
    ],
    services: ["Web design", "Content structure", "Web development"],
    next: "global-tiles-bathrooms",
  },
};


export type ProjectPlatform = "WordPress" | "WooCommerce" | "Lovable" | "Shopify";
export type ProjectResult = { value: string; label: string; source: string };
export type PortfolioProject = CaseData & {
  slug: string;
  platforms: ProjectPlatform[];
  categories: string[];
  results: ProjectResult[];
};

// Add only platforms and results confirmed by the project brief or the client.
// Percentage results require a source; omitted results never create placeholder claims.
const PROJECT_PLATFORMS: Partial<Record<string, ProjectPlatform[]>> = {
  clubrovia: ["Lovable"],
  "global-tiles-bathrooms": ["Lovable"],
  greyhound: ["Shopify"],
  "nude-foods": ["Shopify"],
};
const PROJECT_RESULTS: Partial<Record<string, ProjectResult[]>> = {
  "global-tiles-bathrooms": [
    { value: "2,560", label: "Tile selections", source: "Shown in the catalogue design" },
    { value: "448", label: "Flooring selections", source: "Shown in the catalogue design" },
  ],
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = Object.entries(PROJECT_CASES).map(([slug, project]) => {
  const wordpress = project.services.some(service => /WordPress|WooCommerce/.test(service));
  const commerce = project.services.some(service => /Ecommerce|WooCommerce/.test(service));
  const platforms = PROJECT_PLATFORMS[slug] ?? (wordpress ? ["WordPress" as const, ...(commerce ? ["WooCommerce" as const] : [])] : []);
  const categories = [...(project.categories ?? [slug === "clubrovia" ? "apps" : "websites"])];
  if (commerce) categories.push("commerce");
  if (project.services.includes("Brand identity")) categories.push("branding");
  return { ...project, slug, platforms, categories, results: PROJECT_RESULTS[slug] ?? [] };
});
