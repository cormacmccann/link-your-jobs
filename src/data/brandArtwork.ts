// Brand artwork and authorship supplied by KAMROK. VITHIT scope is posters, apparel and web design.
import type { ProjectImage } from "./projects";

export const BRAND_ARTWORK: Record<
  string,
  {
    hero: ProjectImage;
    gallery?: ProjectImage[];
    category?: string;
    covers?: Partial<Record<"websites" | "designs", ProjectImage>>;
    story?: { title: string; text: string }[];
    defaultCover?: "websites" | "designs";
    groupGallery?: boolean;
  }
> = {
  guinness: {
    category: "Guinness / Diageo · Brand wrap concepts",
    hero: {
      src: "/projects/guinness-diageo/guinness-six-nations-tanker.jpg",
      alt: "Guinness Six Nations branding across a black truck and polished tanker outside the Guinness brewery",
      caption:
        "Guinness Six Nations — tanker livery presentation. Agency: Dundalk Trucks and Trailers.",
      width: 1024,
      height: 768,
      fit: "contain",
    },
    gallery: [
      {
        src: "/projects/guinness-diageo/guinness-six-nations-angle.jpg",
        alt: "A wider view of the Guinness Six Nations truck and tanker at the brewery",
        caption: "Guinness Six Nations — the vehicle and tanker seen together.",
        width: 1024,
        height: 768,
        fit: "contain",
      },
      {
        src: "/projects/guinness-diageo/guinness-tanker-side.jpg",
        alt: "Side view of a polished tanker carrying the Guinness wordmark and harp behind a white and blue truck",
        caption:
          "Guinness — a simple wordmark and harp treatment across the tanker.",
        width: 1024,
        height: 768,
        fit: "contain",
      },
      {
        src: "/projects/guinness-diageo/guinness-tanker-front.jpg",
        alt: "Front three-quarter view of the truck and Guinness-branded tanker",
        caption: "Guinness — the tanker identity from a different perspective.",
        width: 1024,
        height: 768,
        fit: "contain",
      },
      {
        src: "/projects/guinness-diageo/rockshore-wave-wrap-concept.jpg",
        alt: "Rockshore tanker wrap concept with turquoise illustrated waves and a large Rockshore Irish Lager badge",
        caption: "Rockshore — an illustrated wave wrap concept.",
        width: 1600,
        height: 1200,
        fit: "contain",
      },
      {
        src: "/projects/guinness-diageo/rockshore-can-wrap-concept.jpg",
        alt: "Rockshore tanker wrap concept using two oversized turquoise and cream lager can designs",
        caption:
          "Rockshore — an alternative wrap concept built around the can design.",
        width: 1600,
        height: 1200,
        fit: "contain",
      },
    ],
  },
  "kieran-mcgee": {
    hero: {
      src: "/projects/brand-artwork/kieran-mcgee.jpg",
      alt: "Kieran & McGee Auctioneers logo over a view of Ardee Castle",
      caption: "Logo design for Kieran & McGee Auctioneers.",
      width: 550,
      height: 346,
      fit: "contain",
    },
    category: "Property · Logo design",
  },
  thehenie: {
    hero: {
      src: "/projects/brand-artwork/thehenie.jpg",
      alt: "The Hen.ie script logo over a hen party celebration",
      caption: "The Hen.ie logo, designed by KAMROK.",
      width: 1024,
      height: 682,
      fit: "contain",
    },
    gallery: [
      {
        src: "/projects/brand-artwork/thehenie-mobile.jpg",
        alt: "The Hen.ie website shown on a smartphone",
        caption: "A mobile website presentation for The Hen.ie.",
        width: 1920,
        height: 1080,
        fit: "contain",
      },
    ],
  },
  "carlingford-arms": {
    hero: {
      src: "/projects/brand-artwork/carlingford-arms.jpg",
      alt: "Carlingford Arms logo with the purple pub and outdoor dining",
      caption: "The Carlingford Arms identity, from the sign to the welcome.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
  },
  "carlingford-heritage-centre": {
    hero: {
      src: "/projects/brand-artwork/carlingford-heritage-centre.jpg",
      alt: "Carlingford Heritage Centre gold logo with the historic church and a musician",
      caption:
        "A logo connecting the centre’s architecture, heritage and cultural life.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
    gallery: [
      {
        src: "/projects/brand-artwork/heritage-website.jpg",
        alt: "Carlingford Heritage Centre website on a desktop monitor with medieval props",
        caption:
          "The heritage centre’s website, presented as part of its visual world.",
        width: 1920,
        height: 1080,
        fit: "contain",
      },
    ],
  },
  "cranny-mechanical": {
    hero: {
      src: "/projects/brand-artwork/cranny-mechanical.jpg",
      alt: "Cranny Mechanical blue drop and gear logo against industrial equipment",
      caption: "Logo design for Cranny Mechanical.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
    category: "Engineering · Logo design",
  },
  "conor-clarke": {
    hero: {
      src: "/projects/brand-artwork/conor-clarke.jpg",
      alt: "Conor Clarke vehicle wrapping and commercial signage presentation with blue vans",
      caption: "Brand presentation for Conor Clarke.",
      width: 2268,
      height: 1356,
      fit: "contain",
    },
    category: "Signage · Brand identity",
  },
  "dundalk-trucks-trailers": {
    hero: {
      src: "/projects/brand-artwork/dundalk-trucks-trailers.jpg",
      alt: "Dundalk Trucks & Trailers logo over a truck outside the Guinness brewery",
      caption: "Dundalk Trucks & Trailers logo design.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
    category: "Transport · Logo design",
  },
  "jk-kitchens-woodwork": {
    hero: {
      src: "/projects/brand-artwork/jk-kitchens-woodwork.jpg",
      alt: "JK Kitchens & Woodwork website with the logo, handcrafted furniture and kitchen galleries",
      caption: "Logo and website design for JK Kitchens & Woodwork.",
      width: 1075,
      height: 2560,
      fit: "contain",
    },
    category: "Craft · Brand identity & web design",
  },
  "tranquility-ireland": {
    hero: {
      src: "/projects/brand-artwork/tranquility-ireland.jpg",
      alt: "Tranquility Ireland logo over an illuminated stone house and fountain",
      caption: "A luxury accommodation identity for Tranquility Ireland.",
      width: 2244,
      height: 909,
      fit: "contain",
    },
    category: "Hospitality · Brand identity & web design",
    gallery: [
      {
        src: "/projects/brand-artwork/tranquility-website.jpg",
        alt: "Tranquility Ireland accommodation website presented on two desktop displays",
        caption: "The accommodation identity carried through to the website.",
        width: 1920,
        height: 1080,
        fit: "contain",
      },
    ],
  },
  "26-events": {
    hero: {
      src: "/projects/brand-artwork/26-events.jpg",
      alt: "26 Extreme logo glowing yellow over runners on a trail",
      caption: "The 26 Extreme identity behind the events.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
  },
  mckevitts: {
    defaultCover: "websites",
    groupGallery: true,
    category: "Hospitality · Brand identity & web design",
    hero: {
      src: "/projects/mckevitts/brand-presentation.jpg",
      alt: "McKevitt’s stag and mountain identity with the hotel building behind it",
      caption:
        "A new identity rooted in family, landscape and the building itself.",
      width: 2048,
      height: 2048,
      fit: "contain",
    },
    covers: {
      websites: {
        src: "/projects/mckevitts/website-cover.png",
        kind: "website",
        alt: "McKevitt’s website design presented on a desktop monitor and laptop",
        caption: "The identity carried through to the hotel website.",
        width: 1688,
        height: 1125,
        fit: "contain",
      },
    },
    story: [
      {
        title: "The mountain after sundown",
        text: "The colours of the mountain in the evening and at night inspired the palette: layered, muted tones that move into deep purple and dark shades. That sense of place is carried into the landscape within the stag.",
      },
      {
        title: "A connection to the family",
        text: "The stag comes from the McKevitt family crest. Reinterpreted as the central mark, it connects the hotel’s identity to the family behind it, with the mountain landscape giving the symbol a local character.",
      },
      {
        title: "Made to belong to the building",
        text: "Purple and dark colours were already synonymous with the building. The identity was adapted to complement that existing character, so the exterior signage, printed materials and website feel like parts of the same place.",
      },
      {
        title: "From the sign to the screen",
        text: "The stag, refined lettering and evening palette bring hotel, restaurant and bar together. The website extends that visual language into pages for staying, dining and visiting Carlingford, while the business cards and exterior sign show how the identity works beyond the screen.",
      },
    ],
    gallery: [
      {
        src: "/projects/brand-artwork/mckevitts.jpg",
        alt: "McKevitt’s Hotel Restaurant Bar stag logo beside a beer being poured",
        caption:
          "The McKevitt’s identity, bringing hotel, restaurant and bar together.",
        width: 1920,
        height: 990,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/design-studies.jpg",
        alt: "McKevitt’s stag, mountain and colour studies on paper with a pencil resting across the drawings",
        caption: "Hands-on design — working through studies and ideas.",
        width: 1920,
        height: 1281,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/logo.jpg",
        alt: "McKevitt’s Hotel Restaurant Bar logo with a stag formed from layers of mountain colour",
        caption:
          "The complete identity — family heritage and the evening landscape.",
        width: 879,
        height: 879,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/logo-bright-mode.avif",
        themeSources: {
          dark: "/projects/mckevitts/logo-dark-mode.png",
          light: "/projects/mckevitts/logo-bright-mode.avif",
        },
        presentation: "logo",
        alt: "McKevitt’s horizontal stag and wordmark with layered teal, blue and purple mountain colours",
        caption:
          "The horizontal logo — the evening mountain colours within the stag.",
        width: 1536,
        height: 484,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/family-crest-reference.png",
        alt: "Supplied McKevitt family crest reference featuring a red stag",
        caption:
          "Family crest reference supplied for the story — the stag provided the starting point for the new mark.",
        width: 1086,
        height: 1448,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/exterior-sign.jpg",
        alt: "McKevitt’s dimensional stag and wordmark signage mounted on the purple exterior at night",
        caption:
          "The identity in place — signage that complements the building’s purple exterior.",
        width: 800,
        height: 1067,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/business-cards.jpg",
        alt: "McKevitt’s business card designs in dark mountain colours and white",
        caption:
          "The brand in print — business cards using the stag, landscape and refined lettering.",
        width: 2048,
        height: 1536,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/website-devices.jpg",
        kind: "website",
        alt: "McKevitt’s homepage and dining page shown on desktop and laptop screens",
        caption:
          "Web design — the same identity across the homepage and dining experience.",
        width: 1688,
        height: 1125,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/website-presentation.jpg",
        kind: "website",
        alt: "McKevitt’s website design with Carlingford photography, dark navigation and a room availability form",
        caption:
          "Web design — a welcome to Carlingford, with rooms and availability close at hand.",
        width: 2048,
        height: 2048,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/historic-identity.jpg",
        kind: "archive",
        alt: "Historic McKevitt’s Village Hotel identity with a line drawing of the building",
        caption:
          "Before the redesign — the earlier illustrated hotel identity, included as historical context.",
        width: 547,
        height: 302,
        fit: "contain",
      },
      {
        src: "/projects/mckevitts/previous-identity.png",
        kind: "archive",
        alt: "Previous Village Hotel logo using a burgundy building illustration and cream wordmark panel",
        caption:
          "Before the redesign — the previous Village Hotel logo, included as historical context.",
        width: 1920,
        height: 1190,
        fit: "contain",
      },
    ],
  },
  "old-carrick-mill": {
    hero: {
      src: "/projects/brand-artwork/old-carrick-mill.jpg",
      alt: "Old Carrick Mill black wordmark over a monochrome lake landscape",
      caption: "Original logo and identity for Old Carrick Mill.",
      width: 1920,
      height: 1080,
      fit: "contain",
    },
    category: "Food & drink · Identity & packaging",
  },
  onyerbike: {
    hero: {
      src: "/projects/brand-artwork/onyerbike.jpg",
      alt: "On Yer Bike hire logo over the Carlingford countryside and cycling path",
      caption: "An identity made for exploring Carlingford on two wheels.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
  },
  "owen-v-woods": {
    hero: {
      src: "/projects/brand-artwork/owen-v-woods.jpg",
      alt: "Owen V Woods estate agent and auctioneer logo over Carlingford Lough",
      caption: "Logo design for Owen V Woods.",
      width: 550,
      height: 346,
      fit: "contain",
    },
    category: "Property · Logo design",
  },
  "ruby-ellens": {
    hero: {
      src: "/projects/brand-artwork/ruby-ellens.jpg",
      alt: "Ruby Ellens Tea Rooms illustrated sign in a colourful garden",
      caption: "The Ruby Ellens Tea Rooms identity in its hospitality setting.",
      width: 1920,
      height: 1281,
      fit: "contain",
    },
  },
  "last-leprechauns-of-ireland": {
    hero: {
      src: "/projects/brand-artwork/last-leprechauns-of-ireland.jpg",
      alt: "The Last Leprechauns of Ireland lettering with a green-clad leprechaun",
      caption:
        "Logo and brand presentation for The Last Leprechauns of Ireland.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
  },
  vithit: {
    hero: {
      src: "/projects/brand-artwork/vithit.jpg",
      alt: "VITHIT brand and colourful vitamin drink range on white",
      caption: "VITHIT — poster, apparel and website design.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
    category: "Food & drink · Posters, apparel & web design",
  },
  "visit-carlingford": {
    hero: {
      src: "/projects/brand-artwork/visit-carlingford.jpg",
      alt: "Carlingford and Cooley Peninsula white logo over aerial castle ruins",
      caption: "Destination identity for Carlingford & Cooley Peninsula.",
      width: 2962,
      height: 1672,
      fit: "contain",
    },
    category: "Tourism · Brand identity & web design",
    gallery: [
      {
        src: "/projects/brand-artwork/visit-carlingford-mobile.jpg",
        alt: "Visit Carlingford tourism website on smartphones beside a wooden bow",
        caption:
          "A mobile guide to places, stories and experiences around Carlingford.",
        width: 1920,
        height: 1080,
        fit: "contain",
      },
    ],
  },
};
