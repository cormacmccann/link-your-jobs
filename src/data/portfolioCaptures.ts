// Curated from the user-supplied portfolio image library, captured 8 October 2026.
// Old Carrick Mill's current storefront is intentionally excluded: it is not KAMROK's design.
import type { ProjectImage } from "./projects";
type PortfolioCapture = {
  category: string;
  description: string;
  hero: ProjectImage;
  gallery: ProjectImage[];
};
export const PORTFOLIO_CAPTURES: Record<string, PortfolioCapture> = {
  clubrovia: {
    category: "Sport · Club management",
    description:
      "Membership, payments, bookings and match days share one visual language. The public website introduces the platform, while the existing app screens show the tools for club administrators and families.",
    hero: {
      src: "/projects/site-captures/clubrovia/homepage.jpg",
      alt: "Clubrovia — Website homepage",
      caption: "Website homepage",
      width: 1128,
      height: 1001,
    },
    gallery: [],
  },
  "global-tiles-bathrooms": {
    category: "Interiors · Retail & trade",
    description:
      "Warm photography and an editorial layout connect tiles, flooring, bathrooms and installation. Product discovery sits alongside the showroom story, giving both retail and trade customers a clear starting point.",
    hero: {
      src: "/projects/site-captures/global-tiles-bathrooms/homepage.jpg",
      alt: "Global Tiles & Bathrooms — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [
      {
        src: "/projects/site-captures/global-tiles-bathrooms/detail-1.jpg",
        alt: "Global Tiles & Bathrooms — Tiles, flooring and bathrooms — a connected showroom offer.",
        caption: "Tiles, flooring and bathrooms — a connected showroom offer.",
        width: 1453,
        height: 1004,
      },
      {
        src: "/projects/site-captures/global-tiles-bathrooms/detail-2.jpg",
        alt: "Global Tiles & Bathrooms — Product cards bring materials and finishes into focus.",
        caption: "Product cards bring materials and finishes into focus.",
        width: 1453,
        height: 1004,
      },
    ],
  },
  "digital-screen-displays": {
    category: "Digital signage · Website & sales tools",
    description:
      "A dark visual system, red accents and installation imagery make a technical offer easy to explore. The website brings digital menus, window displays, LED screens and supporting services into a clear sales journey.",
    hero: {
      src: "/projects/site-captures/digital-screen-displays/homepage.jpg",
      alt: "Digital Screen Displays — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [
      {
        src: "/projects/site-captures/digital-screen-displays/detail-1.jpg",
        alt: "Digital Screen Displays — Digital signage solutions organised around business needs.",
        caption: "Digital signage solutions organised around business needs.",
        width: 1453,
        height: 1004,
      },
      {
        src: "/projects/site-captures/digital-screen-displays/detail-2.jpg",
        alt: "Digital Screen Displays — Service information and customer stories.",
        caption: "Service information and customer stories.",
        width: 1453,
        height: 1004,
      },
    ],
  },
  "catering-disposables": {
    category: "Hospitality supply · B2B website",
    description:
      "Product categories lead the experience, from tableware and takeaway packaging to hygiene supplies. The company story and sustainability information support the trade offer alongside the sales portal integration.",
    hero: {
      src: "/projects/site-captures/catering-disposables/homepage.jpg",
      alt: "Catering Disposables — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [
      {
        src: "/projects/site-captures/catering-disposables/detail-1.jpg",
        alt: "Catering Disposables — A clear catalogue of hospitality and packaging supplies.",
        caption: "A clear catalogue of hospitality and packaging supplies.",
        width: 1453,
        height: 1004,
      },
      {
        src: "/projects/site-captures/catering-disposables/detail-2.jpg",
        alt: "Catering Disposables — Company values presented alongside the product offer.",
        caption: "Company values presented alongside the product offer.",
        width: 1453,
        height: 1004,
      },
    ],
  },
  roco9: {
    category: "Machinery · WordPress & Elementor",
    description:
      "Industrial yellow, strong typography and machinery imagery connect the product range with the wider business. Technical product screens, specifications and feature highlights remain part of this case study.",
    hero: {
      src: "/projects/site-captures/roco9/homepage.jpg",
      alt: "Roco9 — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [],
  },
  thehenie: {
    category: "Hospitality · Packages & planning",
    description:
      "Activity cards, destinations and accommodation help groups explore a hen-party package. The website pairs aspirational photography with practical choices and a clear route to planning an event.",
    hero: {
      src: "/projects/site-captures/thehenie/homepage.jpg",
      alt: "The Hen — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [
      {
        src: "/projects/site-captures/thehenie/detail-1.jpg",
        alt: "The Hen — Activities and ideas for planning a group celebration.",
        caption: "Activities and ideas for planning a group celebration.",
        width: 1453,
        height: 1004,
      },
      {
        src: "/projects/site-captures/thehenie/detail-2.jpg",
        alt: "The Hen — Accommodation and package choices in one browsing experience.",
        caption:
          "Accommodation and package choices in one browsing experience.",
        width: 1453,
        height: 1004,
      },
    ],
  },
  "26-events": {
    category: "Sport · Event discovery & entry",
    description:
      "An energetic homepage leads into the event catalogue, with outdoor photography and clear entry points. The visual approach connects the excitement of an event with the practical task of finding and entering it.",
    hero: {
      src: "/projects/site-captures/26-events/homepage.jpg",
      alt: "26.events — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [],
  },
  avts: {
    category: "Audio visual · Trade & reseller tools",
    description:
      "A trade-focused website introduces digital signage products and supplier brands. Product imagery and application categories help resellers understand the range and start a conversation with the team.",
    hero: {
      src: "/projects/site-captures/avts/homepage.jpg",
      alt: "AVTS — Website homepage",
      caption: "Website homepage",
      width: 1453,
      height: 1004,
    },
    gallery: [
      {
        src: "/projects/site-captures/avts/detail-1.jpg",
        alt: "AVTS — A personal introduction to the trade team.",
        caption: "A personal introduction to the trade team.",
        width: 1453,
        height: 1004,
      },
      {
        src: "/projects/site-captures/avts/detail-2.jpg",
        alt: "AVTS — Display applications and products for resellers.",
        caption: "Display applications and products for resellers.",
        width: 1453,
        height: 1004,
      },
    ],
  },
  conekt: {
    category: "Retail · Brand sales & distribution",
    description:
      "The website presents Conekt as a connection between brands and consumers. Its partner brands, retail coverage and sales services form a clear story for businesses looking to reach the Irish retail market.",
    hero: {
      src: "/projects/site-captures/conekt/homepage.jpg",
      alt: "Conekt — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/conekt/detail-1.jpg",
        alt: "Conekt — Retail coverage and the people behind the service.",
        caption: "Retail coverage and the people behind the service.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/conekt/detail-2.jpg",
        alt: "Conekt — Retail partners and the wider distribution network.",
        caption: "Retail partners and the wider distribution network.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "dsa-cloud": {
    category: "Digital signage · Software marketing",
    description:
      "Green accents, interface previews and feature cards explain cloud-based digital signage. Scheduling, media management and content tools are presented alongside clear routes to a demo and support.",
    hero: {
      src: "/projects/site-captures/dsa-cloud/homepage.jpg",
      alt: "DSA Cloud — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/dsa-cloud/detail-1.jpg",
        alt: "DSA Cloud — Software capabilities explained through a clear feature grid.",
        caption:
          "Software capabilities explained through a clear feature grid.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/dsa-cloud/detail-2.jpg",
        alt: "DSA Cloud — Interface previews show how media and content are managed.",
        caption: "Interface previews show how media and content are managed.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "sweeney-computers": {
    category: "Technology · Managed IT & cybersecurity",
    description:
      "A people-focused website explains managed IT support and cybersecurity for businesses. Team photography, service choices and consultation links make the offer approachable without losing its technical substance.",
    hero: {
      src: "/projects/site-captures/sweeney-computers/homepage.jpg",
      alt: "Sweeney Computers — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/sweeney-computers/detail-1.jpg",
        alt: "Sweeney Computers — The support process, explained in plain language.",
        caption: "The support process, explained in plain language.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/sweeney-computers/detail-2.jpg",
        alt: "Sweeney Computers — Service plans laid out for comparison.",
        caption: "Service plans laid out for comparison.",
        width: 1265,
        height: 712,
      },
    ],
  },
  carlichauns: {
    category: "Entertainment · Brand website",
    description:
      "Character artwork, a rich colour palette and an illustrated world carry the children’s adventure brand online. Books, the adventure trail and brand storytelling sit within the same visual experience.",
    hero: {
      src: "/projects/site-captures/carlichauns/homepage.jpg",
      alt: "Carlichauns — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/carlichauns/detail-1.jpg",
        alt: "Carlichauns — Character-led storytelling for the adventure brand.",
        caption: "Character-led storytelling for the adventure brand.",
        width: 1265,
        height: 712,
      },
    ],
  },
  marmion: {
    category: "Engineering · Manufacturing website",
    description:
      "A dark blue visual system and workshop imagery present Marmion’s fabrication and manufacturing capabilities. Service categories help visitors explore engineering, inspection pits, gates and van storage before making an enquiry.",
    hero: {
      src: "/projects/site-captures/marmion/homepage.jpg",
      alt: "Marmion — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/marmion/detail-1.jpg",
        alt: "Marmion — Engineering capabilities and specialist product categories.",
        caption: "Engineering capabilities and specialist product categories.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/marmion/detail-2.jpg",
        alt: "Marmion — Workshop imagery and the manufacturing story.",
        caption: "Workshop imagery and the manufacturing story.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "ruby-ellens": {
    category: "Hospitality · Tea room identity & website",
    description:
      "Purple, cream and photographic storytelling bring the Carlingford tea rooms online. The website introduces the food, interiors and character of the business through a welcoming hospitality identity.",
    hero: {
      src: "/projects/site-captures/ruby-ellens/homepage.jpg",
      alt: "Ruby Ellens — Website homepage",
      caption: "Website homepage",
      width: 1253,
      height: 705,
    },
    gallery: [
      {
        src: "/projects/site-captures/ruby-ellens/detail-1.jpg",
        alt: "Ruby Ellens — Food and interiors tell the story of the tea rooms.",
        caption: "Food and interiors tell the story of the tea rooms.",
        width: 1253,
        height: 705,
      },
    ],
  },
  "carlingford-arms": {
    category: "Hospitality · Pub & restaurant",
    description:
      "Food photography and a distinctive purple palette connect menus, live music and private occasions. The website gives visitors a sense of the venue while keeping practical information close at hand.",
    hero: {
      src: "/projects/site-captures/carlingford-arms/homepage.jpg",
      alt: "Carlingford Arms — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/carlingford-arms/detail-1.jpg",
        alt: "Carlingford Arms — Dining information and menu discovery.",
        caption: "Dining information and menu discovery.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/carlingford-arms/detail-2.jpg",
        alt: "Carlingford Arms — Live music and private occasions extend the venue story.",
        caption: "Live music and private occasions extend the venue story.",
        width: 1265,
        height: 712,
      },
    ],
  },
  mcla: {
    category: "Professional services · Insurance loss assessors",
    description:
      "Clear service explanations introduce the loss-assessment process and the people behind it. Property imagery, claim categories and contact routes help visitors find the right information at a stressful moment.",
    hero: {
      src: "/projects/site-captures/mcla/homepage.jpg",
      alt: "MCLA — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/mcla/detail-1.jpg",
        alt: "MCLA — Introducing the assessor and explaining the claims process.",
        caption: "Introducing the assessor and explaining the claims process.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/mcla/detail-2.jpg",
        alt: "MCLA — Claim categories help visitors find relevant support.",
        caption: "Claim categories help visitors find relevant support.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "nude-foods": {
    category: "Food · Shopify ecommerce",
    description:
      "Prepared meals take centre stage in a clean storefront with food photography, product prices and shopping controls. The Irish website at nudefoods.ie brings the brand story and online ordering together.",
    hero: {
      src: "/projects/site-captures/nude-foods/homepage.jpg",
      alt: "Nude Foods — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/nude-foods/detail-1.jpg",
        alt: "Nude Foods — Meal choices, product prices and shopping controls.",
        caption: "Meal choices, product prices and shopping controls.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "carnivore-meats": {
    category: "Food · Wholesale brand & website",
    description:
      "Black, gold and bold product photography give the Irish wholesale business a distinctive presence. Catalogue, ordering and customer-enquiry links support the trade offer at carnivoremeats.ie.",
    hero: {
      src: "/projects/site-captures/carnivore-meats/homepage.jpg",
      alt: "Carnivore Meats — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/carnivore-meats/detail-1.jpg",
        alt: "Carnivore Meats — A closer look at the wholesale business.",
        caption: "A closer look at the wholesale business.",
        width: 1265,
        height: 712,
      },
    ],
  },
  mckevitts: {
    category: "Hospitality · Hotel, restaurant & bar",
    description:
      "The website brings rooms, dining and the bar together under one hotel identity. Photography and a restrained dark palette support the browsing experience, with booking and availability links kept visible.",
    hero: {
      src: "/projects/site-captures/mckevitts/homepage.jpg",
      alt: "McKevitt’s Village Hotel homepage introducing its Carlingford location",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/mckevitts/detail-1.jpg",
        alt: "McKevitt’s — Rooms and practical information for a hotel stay.",
        caption: "Rooms and practical information for a hotel stay.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/mckevitts/weddings.jpg",
        alt: "McKevitt’s wedding venue website section with event and dining photography",
        caption: "A dedicated welcome for weddings and celebrations.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/mckevitts/history.jpg",
        alt: "McKevitt’s hotel history section with Carlingford Lough and an archive photograph",
        caption: "The hotel’s story, rooted in Carlingford.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/mckevitts/destination.jpg",
        alt: "McKevitt’s destination section featuring the Cooley Peninsula and family activities",
        caption: "The destination is part of the stay.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "carlingford-heritage-centre": {
    category: "Heritage · Visitor website & communications",
    description:
      "The website connects the heritage centre with Carlingford’s wider visitor experience. Events, tours, history and remote working are brought together around local photography and practical contact information.",
    hero: {
      src: "/projects/site-captures/carlingford-heritage-centre/homepage.jpg",
      alt: "Carlingford Heritage Centre — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/carlingford-heritage-centre/detail-1.jpg",
        alt: "Carlingford Heritage Centre — Events and contact routes for the heritage centre.",
        caption: "Events and contact routes for the heritage centre.",
        width: 1265,
        height: 712,
      },
    ],
  },
  greyhound: {
    category: "Pet care · Shopify ecommerce",
    description:
      "A specialist greyhound-supplement shop with product photography, catalogue navigation and shopping controls. The storefront gives customers a clear way to browse the range and place an order.",
    hero: {
      src: "/projects/site-captures/greyhound/homepage.jpg",
      alt: "Greyhound Extreme — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/greyhound/detail-1.jpg",
        alt: "Greyhound Extreme — Products and shopping information for the specialist range.",
        caption: "Products and shopping information for the specialist range.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "glenmuir-fc": {
    category: "Sport · Football club website",
    description:
      "A club-focused website brings teams, fixtures, news and membership into one place. Match imagery and a strong blue identity give supporters, players and families a shared point of reference.",
    hero: {
      src: "/projects/site-captures/glenmuir-fc/homepage.jpg",
      alt: "Glenmuir FC — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/glenmuir-fc/detail-1.jpg",
        alt: "Glenmuir FC — Club sections bring players and families into the site.",
        caption: "Club sections bring players and families into the site.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "down-to-earth": {
    category: "Electrical · Contractor website",
    description:
      "Project imagery and a navy-and-green palette introduce the contractor’s specialist electrical services. Capabilities, people and case studies help prospective customers understand the business and get in touch.",
    hero: {
      src: "/projects/site-captures/down-to-earth/homepage.jpg",
      alt: "Down to Earth Electrical — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/down-to-earth/detail-1.jpg",
        alt: "Down to Earth Electrical — People, capabilities and specialist electrical services.",
        caption: "People, capabilities and specialist electrical services.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/down-to-earth/detail-2.jpg",
        alt: "Down to Earth Electrical — Project experience supports the business introduction.",
        caption: "Project experience supports the business introduction.",
        width: 1265,
        height: 712,
      },
    ],
  },
  onyerbike: {
    category: "Tourism · Bike hire & local discovery",
    description:
      "A bright, photography-led website connects bike hire with the Carlingford Greenway. Route information, local attractions and booking links help visitors move from inspiration to planning a day out.",
    hero: {
      src: "/projects/site-captures/onyerbike/homepage.jpg",
      alt: "OnYerBike — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/onyerbike/detail-1.jpg",
        alt: "OnYerBike — Bike hire and local routes in one visitor experience.",
        caption: "Bike hire and local routes in one visitor experience.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/onyerbike/detail-2.jpg",
        alt: "OnYerBike — The Carlingford Greenway and its surroundings.",
        caption: "The Carlingford Greenway and its surroundings.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "team-building-ireland": {
    category: "Events · Team-building website",
    description:
      "Activity cards, group photography and a clear navigation system bring a varied events catalogue together. Corporate teams and school groups can explore experiences and find a route to an enquiry.",
    hero: {
      src: "/projects/site-captures/team-building-ireland/homepage.jpg",
      alt: "Team Building Ireland — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/team-building-ireland/detail-1.jpg",
        alt: "Team Building Ireland — Activities presented as an easy-to-browse catalogue.",
        caption: "Activities presented as an easy-to-browse catalogue.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/team-building-ireland/detail-2.jpg",
        alt: "Team Building Ireland — Different experiences for different groups.",
        caption: "Different experiences for different groups.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "loughnavalley-cottages": {
    category: "Hospitality · Accommodation website",
    description:
      "Large property photographs introduce the cottages and their rural setting. Navigation separates the individual cottages, corporate stays and contact information so different groups can find what they need.",
    hero: {
      src: "/projects/site-captures/loughnavalley-cottages/homepage.jpg",
      alt: "Loughnavalley Cottages — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/loughnavalley-cottages/detail-1.jpg",
        alt: "Loughnavalley Cottages — The properties, their setting and the story behind them.",
        caption: "The properties, their setting and the story behind them.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "positive-care": {
    category: "Health technology · Platform website",
    description:
      "The Positive Care project is presented publicly as Positive Health. The landing page uses an illustrative workspace, role-based explanations and demo links to explain the community-care platform.",
    hero: {
      src: "/projects/site-captures/positive-care/homepage.jpg",
      alt: "Positive Care — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/positive-care/detail-1.jpg",
        alt: "Positive Care — Role-based explanations of the community-care workspace.",
        caption: "Role-based explanations of the community-care workspace.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "primrose-lane": {
    category: "Food · Bespoke bakery website",
    description:
      "Cake photography, warm colours and expressive typography reflect the bakery’s handmade character. Wedding cakes, other creations and the maker’s story lead visitors towards a personal enquiry.",
    hero: {
      src: "/projects/site-captures/primrose-lane/homepage.jpg",
      alt: "Primrose Lane — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/primrose-lane/detail-1.jpg",
        alt: "Primrose Lane — The baker’s story and the character behind the cakes.",
        caption: "The baker’s story and the character behind the cakes.",
        width: 1265,
        height: 712,
      },
    ],
  },
  "last-leprechauns-of-ireland": {
    category: "Tourism · Folklore & visitor experience",
    description:
      "Portraiture, landscape imagery and an earthy visual palette introduce the storyteller and the cavern experience. Folklore, visitor information and tours give the attraction a coherent home online.",
    hero: {
      src: "/projects/site-captures/last-leprechauns-of-ireland/homepage.jpg",
      alt: "The Last Leprechauns of Ireland — Website homepage",
      caption: "Website homepage",
      width: 1265,
      height: 712,
    },
    gallery: [
      {
        src: "/projects/site-captures/last-leprechauns-of-ireland/detail-1.jpg",
        alt: "The Last Leprechauns of Ireland — The cavern, folklore and storytelling brought together.",
        caption: "The cavern, folklore and storytelling brought together.",
        width: 1265,
        height: 712,
      },
      {
        src: "/projects/site-captures/last-leprechauns-of-ireland/detail-2.jpg",
        alt: "The Last Leprechauns of Ireland — Tours and visitor experiences continue the story.",
        caption: "Tours and visitor experiences continue the story.",
        width: 1265,
        height: 712,
      },
    ],
  },
};
