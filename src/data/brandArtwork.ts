// Brand artwork and authorship supplied by KAMROK. VITHIT scope is posters, apparel and web design.
import type { ProjectImage } from "./projects";

export const BRAND_ARTWORK: Record<
  string,
  { hero: ProjectImage; gallery?: ProjectImage[]; category?: string }
> = {
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
    hero: {
      src: "/projects/brand-artwork/mckevitts.jpg",
      alt: "McKevitt’s Hotel Restaurant Bar stag logo beside a beer being poured",
      caption:
        "The McKevitt’s logo, bringing hotel, restaurant and bar together.",
      width: 1920,
      height: 990,
      fit: "contain",
    },
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
