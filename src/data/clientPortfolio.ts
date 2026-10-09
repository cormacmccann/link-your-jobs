// Client scope and technology details supplied by KAMROK, October 2026.
export type ClientPortfolioBrief = {
  slug: string;
  name: string;
  url?: string;
  collection: "platforms" | "identity";
  services: string[];
  tools: string[];
  intro: string;
  description: string;
};

export const CLIENT_PORTFOLIO: ClientPortfolioBrief[] = [
  {
    slug: "airnean",
    name: "Airneán",
    collection: "identity",
    services: ["Brand identity", "Logo design", "Custom lettering"],
    tools: [],
    intro: "Music, moonlight and a welcome at the door.",
    description:
      "A logo and brand identity inspired by the Irish tradition of airneán: neighbours gathering at night to share music, stories and warmth. Custom lettering, Celtic-inspired knotwork and a central candle bring that sense of welcome and cultural continuity into one mark.",
  },
  {
    slug: "clubrovia",
    name: "Clubrovia",
    collection: "platforms",
    services: [
      "Brand identity",
      "App build",
      "Marketing & sales strategy",
      "Support",
      "Product ownership",
    ],
    tools: ["Vite", "Supabase", "Stripe", "Lovable"],
    intro: "A complete club and team management app, free to use.",
    description:
      "An owned product bringing club and team management together, supported by brand identity, app development, marketing and sales strategy, and ongoing support.",
    url: "https://clubrovia.com",
  },
  {
    slug: "global-tiles-bathrooms",
    name: "Global Tiles & Bathrooms",
    collection: "platforms",
    services: ["Branding", "Web design", "Marketing", "ERP build"],
    tools: ["WordPress", "Vite", "Google", "Lovable"],
    intro: "Trade pricing advice, with a 320k-SKU ERP feeding the marketing.",
    description:
      "Branding, web design and marketing connected to an ERP covering 320,000 SKUs, with trade pricing advice shaping the commercial experience.",
    url: "https://www.globaltilesbathrooms.co.uk/",
  },
  {
    slug: "digital-screen-displays",
    name: "Digital Screen Displays",
    collection: "platforms",
    services: ["Web design", "Marketing", "Tooling", "Custom apps"],
    tools: ["WordPress", "Vite", "Google"],
    intro: "Positioning, demand generation and a sales platform, together.",
    description:
      "Web design, marketing, custom applications and tooling developed around the same sales proposition, connecting positioning with demand generation.",
    url: "https://digitalscreendisplays.ie",
  },
  {
    slug: "catering-disposables",
    name: "Catering Disposables",
    collection: "platforms",
    services: ["Web design", "Sales portal integration"],
    tools: ["WordPress", "Vite", "Google"],
    intro: "Trade-account growth, with a portal built for repeat orders.",
    description:
      "Web design and sales portal integration focused on trade accounts, making the service experience part of the route to repeat orders.",
    url: "https://cateringdisposables.ie",
  },
  {
    slug: "roco9",
    name: "ROCO9",
    collection: "platforms",
    services: ["Web design", "Localisation", "Multi-country sales"],
    tools: ["WordPress", "Google", "Kinsta", "Cloudflare"],
    intro: "Market-entry advice, shaped around each territory.",
    description:
      "A WordPress and Elementor One build supported by localisation and multi-country sales advice, considering language, pricing and channels for each territory.",
    url: "https://roco9.com",
  },
  {
    slug: "thehenie",
    name: "The Hen",
    collection: "platforms",
    services: [
      "Logo design",
      "Web design",
      "WordPress development",
      "Full app build",
    ],
    tools: ["Kinsta", "WordPress", "Vite", "Google"],
    intro: "Package and offer strategy, with an app built around the demand.",
    description:
      "Logo design, web design, WordPress development and a full application build, supported by package and offer strategy for the customer journey.",
    url: "https://thehen.ie",
  },
  {
    slug: "26-events",
    name: "26.events",
    collection: "platforms",
    services: [
      "Logo design",
      "Branding",
      "Web design",
      "Entry portal",
      "App development",
    ],
    tools: ["WordPress", "Vite", "Google", "Lovable"],
    intro: "Marketing owned end to end: entries, retention and the calendar.",
    description:
      "For 26 Extreme, branding, web design, an entry portal and app development support event entries, retention and the wider marketing calendar. The 26.events application is built and hosted on Lovable.",
    url: "https://26.events",
  },
  {
    slug: "avts",
    name: "AVTS",
    collection: "platforms",
    services: ["Branding", "Web design", "App design", "Reseller portal"],
    tools: ["WordPress", "Vite", "Google"],
    intro: "Channel marketing, with the tools for partners to sell.",
    description:
      "Branding, web and app design brought together with a reseller portal, supporting channel marketing and the work of sales partners.",
    url: "https://avts.ie",
  },
  {
    slug: "conekt",
    name: "Conekt",
    collection: "platforms",
    services: ["Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Connecting brands with consumers through identity and marketing.",
    description:
      "Corporate identity, web design and marketing for Conekt, a business connecting brands with consumers through retail sales and distribution.",
    url: "https://conekt.ie",
  },
  {
    slug: "dsa-cloud",
    name: "DSA Cloud",
    collection: "platforms",
    services: ["Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Cloud-service positioning, from identity through to campaigns.",
    description:
      "Corporate identity, web design and marketing for cloud services, carrying the positioning from the brand into digital campaigns.",
    url: "https://dsa-cloud.com",
  },
  {
    slug: "sweeney-computers",
    name: "Sweeney Computers",
    collection: "platforms",
    services: ["Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Managed IT and cybersecurity, with a clear business identity.",
    description:
      "Corporate identity, web design and marketing for Sweeney Computers, presenting its managed IT support and cybersecurity services to businesses.",
    url: "https://sweeneycomputers.ie",
  },
  {
    slug: "carlichauns",
    name: "Carlichauns",
    collection: "platforms",
    services: ["Branding implementation", "Web design", "Tool building"],
    tools: ["WordPress", "Vite", "Google"],
    intro: "A brand rollout, with tools to keep it consistent.",
    description:
      "Brand implementation and web design supported by custom tooling, helping the brand carry consistently across its digital presence.",
    url: "https://carlichauns.com",
  },
  {
    slug: "marmion",
    name: "Marmion",
    collection: "platforms",
    services: ["Branding", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Positioning, campaigns and lead flow, working together.",
    description:
      "Branding, web design and marketing supported by full marketing advisory, from positioning to campaigns and lead generation.",
    url: "https://marmion.ie",
  },
  {
    slug: "guinness",
    name: "Guinness",
    collection: "identity",
    services: ["Retail brand design", "Vehicle livery"],
    tools: ["Adobe"],
    intro: "Retail brand execution, in store and on the road.",
    description:
      "Retail brand design and vehicle livery for Guinness / Diageo, bringing the brand into physical retail environments and on-road visibility.",
  },
  {
    slug: "vithit",
    name: "VITHIT Drinks",
    collection: "identity",
    services: ["Poster design", "Apparel design", "Web design"],
    tools: ["Adobe"],
    intro: "Posters, apparel and a website for an established drinks brand.",
    description:
      "Poster, apparel and website design for VITHIT Drinks, applying the existing brand across print, clothing and digital. The VITHIT logo was not designed by KAMROK.",
    url: "https://vithit.com",
  },
  {
    slug: "old-carrick-mill",
    name: "Old Carrick Mill",
    collection: "identity",
    services: [
      "Corporate identity",
      "Logo design",
      "Bottle design",
      "Brochure design",
    ],
    tools: ["Adobe"],
    intro: "Identity and packaging for a premium craft producer.",
    description:
      "Corporate identity, logo, bottle design and brochure work for Old Carrick Mill. This case study focuses on the brand and printed materials.",
    url: "https://oldcarrickmill.com",
  },
  {
    slug: "ruby-ellens",
    name: "Ruby Ellens",
    collection: "identity",
    services: ["Logo design", "Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Identity and launch marketing for a consumer brand.",
    description:
      "Corporate identity, web design and marketing, bringing the brand story and launch activity together across customer touchpoints.",
    url: "https://rubyellens.com",
  },
  {
    slug: "carlingford-arms",
    name: "Carlingford Arms",
    collection: "identity",
    services: ["Logo design", "Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "A hospitality identity, with bookings and local demand behind it.",
    description:
      "Corporate identity, web design and marketing for Carlingford Arms, connecting the hospitality offer with bookings and local demand.",
    url: "https://carlingfordarms.com",
  },
  {
    slug: "mcla",
    name: "MCLA",
    collection: "identity",
    services: ["Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "Professional-services identity, with lead generation behind it.",
    description:
      "Corporate identity, web design and marketing for a professional-services business, connecting its presentation with lead generation.",
    url: "https://mcla.ie",
  },
  {
    slug: "bunzl-mclaughlin",
    name: "Bunzl McLaughlin",
    collection: "identity",
    services: ["Editorial design", "Print collateral"],
    tools: ["Adobe"],
    intro: "Editorial and print design for a distribution group.",
    description:
      "Editorial design and print collateral for Bunzl McLaughlin, supporting communication across the distribution business.",
  },
  {
    slug: "nude-foods",
    name: "Nude Foods",
    collection: "identity",
    services: ["Branding", "Web design", "Marketing"],
    tools: ["Shopify", "Google"],
    intro: "A direct-to-consumer launch, from brand story to acquisition.",
    description:
      "Branding, web design and marketing for Nude Foods, with direct-to-consumer launch advice covering the brand, its story and customer acquisition.",
    url: "https://www.nudefoods.ie/",
  },
  {
    slug: "carnivore-meats",
    name: "Carnivore Meats",
    collection: "identity",
    services: ["Branding", "Web design"],
    tools: ["WordPress", "Google", "Kinsta", "Cloudflare"],
    intro: "A premium proposition built around provenance.",
    description:
      "Branding and web design for Carnivore Meats, with brand strategy centred on provenance and a premium market position.",
    url: "https://carnivoremeats.ie/",
  },
  {
    slug: "mckevitts",
    name: "McKevitt’s",
    collection: "identity",
    services: ["Logo design", "Branding", "Web design", "Menu design"],
    tools: ["WordPress", "Google", "Kinsta", "Cloudflare"],
    intro: "A hospitality brand, from the menu to the next visit.",
    description:
      "Branding, web design and menu design for McKevitt’s, supported by hospitality advice around menus, the offer and local demand.",
    url: "https://mckevitts.ie",
  },
  {
    slug: "carlingford-heritage-centre",
    name: "Carlingford Heritage Centre",
    collection: "identity",
    services: [
      "Logo design",
      "Web design",
      "Email & communications",
      "Google Workspace",
    ],
    tools: ["WordPress", "Vite", "Google"],
    intro: "Visitor marketing, with the communications tools behind it.",
    description:
      "Logo design, web design, email and communications, and Google Workspace support for Carlingford Heritage Centre, connecting visitor marketing with the tools behind it.",
    url: "https://carlingfordheritage.ie/",
  },
  {
    slug: "greyhound",
    name: "Greyhound Extreme",
    collection: "identity",
    services: ["Web design"],
    tools: ["Shopify", "Google"],
    intro: "A specialist Shopify storefront for greyhound supplements.",
    description:
      "Web design for Greyhound Extreme, bringing a specialist supplement range into a Shopify shopping experience.",
    url: "https://greyhoundextreme.com",
  },
  {
    slug: "glenmuir-fc",
    name: "Glenmuir FC",
    collection: "identity",
    services: ["Web design"],
    tools: [],
    intro: "Club communications, from membership to match day.",
    description:
      "Web design for Glenmuir FC, bringing membership, fixtures and sponsor communications into the club’s digital presence.",
    url: "https://glenmuirfc.com",
  },
  {
    slug: "down-to-earth",
    name: "Down to Earth Electrical",
    collection: "identity",
    services: ["Corporate identity", "Web design", "Marketing"],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "A trade identity built for local lead generation.",
    description:
      "Corporate identity, web design and marketing for an electrical contractor, connecting a clear trade identity with local lead generation.",
    url: "https://downtoearthelectrical.ie",
  },
  {
    slug: "onyerbike",
    name: "OnYerBike",
    collection: "identity",
    services: [
      "Logo design",
      "Corporate identity",
      "Web design",
      "Marketing",
      "Integrations",
      "SEO",
    ],
    tools: ["WordPress", "Kinsta", "Google", "Adobe"],
    intro: "A full look-and-feel rebuild, with integrations and SEO.",
    description:
      "Corporate identity, web design and marketing for OnYerBike, with a full look-and-feel rebuild supported by integrations and search optimisation.",
    url: "https://onyerbike.ie",
  },
  {
    slug: "team-building-ireland",
    name: "Team Building Ireland",
    collection: "platforms",
    services: ["Web design"],
    tools: ["WordPress"],
    intro: "Group experiences, brought together in one place.",
    description:
      "A website for Team Building Ireland, presenting corporate events, team-building activities and school programmes through an accessible activity catalogue.",
    url: "https://teambuildingireland.ie/",
  },
  {
    slug: "loughnavalley-cottages",
    name: "Loughnavalley Cottages",
    collection: "identity",
    services: ["Web design"],
    tools: ["WordPress"],
    intro: "A welcoming introduction to a rural escape.",
    description:
      "An accommodation website for Loughnavalley Cottages in Westmeath, introducing the properties, group stays and the surrounding setting.",
    url: "https://loughnavalleycottages.ie/",
  },
  {
    slug: "positive-care",
    name: "Positive Health",
    collection: "platforms",
    services: ["Web design"],
    tools: [],
    intro: "A clear introduction to connected community care.",
    description:
      "A platform website for Positive Health, bringing its community-care workspace concept, audiences and demo into one clear introduction.",
    url: "https://positivecare.kamrok.com/",
  },
  {
    slug: "primrose-lane",
    name: "Primrose Lane",
    collection: "identity",
    services: ["Web design"],
    tools: ["WordPress"],
    intro: "Handmade cakes. A personal digital presence.",
    description:
      "A bakery website for Primrose Lane, showcasing bespoke cakes, wedding creations and the story behind the business.",
    url: "https://primroselane.ie/",
  },
  {
    slug: "last-leprechauns-of-ireland",
    name: "The Last Leprechauns of Ireland",
    collection: "identity",
    services: ["Logo design", "Web design"],
    tools: ["WordPress"],
    intro: "A local story with a world of character.",
    description:
      "Logo design and a visitor website for The Last Leprechauns of Ireland in Carlingford, connecting its storyteller, folklore and cavern experience.",
    url: "https://www.thelastleprechaunsofireland.com/",
  },
  {
    slug: "kieran-mcgee",
    name: "Kieran & McGee Auctioneers",
    collection: "identity",
    services: ["Logo design"],
    tools: [],
    intro: "A distinctive local identity for property and auctions.",
    description:
      "Logo design for Kieran & McGee Auctioneers, shown here in a brand presentation featuring Ardee Castle.",
  },
  {
    slug: "cranny-mechanical",
    name: "Cranny Mechanical",
    collection: "identity",
    services: ["Logo design"],
    tools: [],
    intro: "Engineering expertise, expressed in one clear mark.",
    description:
      "Logo design for Cranny Mechanical, pairing a blue water drop with a gear motif and a strong wordmark.",
  },
  {
    slug: "conor-clarke",
    name: "Conor Clarke",
    collection: "identity",
    services: ["Logo design", "Brand identity"],
    tools: [],
    intro: "A bold identity for wrapping and signage.",
    description:
      "Logo and brand identity design for Conor Clarke, presented alongside its vehicle wrapping and commercial signage services.",
  },
  {
    slug: "dundalk-trucks-trailers",
    name: "Dundalk Trucks & Trailers",
    collection: "identity",
    services: ["Logo design"],
    tools: [],
    intro: "A transport identity with presence on the road.",
    description:
      "Logo design for Dundalk Trucks & Trailers, combining the DTT initials with a clear business wordmark.",
  },
  {
    slug: "jk-kitchens-woodwork",
    name: "JK Kitchens & Woodwork",
    collection: "identity",
    services: ["Logo design", "Web design"],
    tools: [],
    intro: "An identity and website shaped around craftsmanship.",
    description:
      "Logo and website design for John Kane’s JK Kitchens & Woodwork, presenting handcrafted kitchens, furniture and fitted storage through a warm, material-led visual style.",
  },
  {
    slug: "tranquility-ireland",
    name: "Tranquility Ireland",
    collection: "identity",
    services: ["Logo design", "Web design"],
    tools: [],
    intro: "A quiet sense of luxury, from identity to website.",
    description:
      "Logo and website design for Tranquility Ireland. A refined gold wordmark and emblem carry through the accommodation website and its property presentations.",
  },
  {
    slug: "owen-v-woods",
    name: "Owen V Woods",
    collection: "identity",
    services: ["Logo design"],
    tools: [],
    intro: "A recognisable identity for a local property business.",
    description:
      "Logo design for Owen V Woods Estate Agent and Auctioneer, shown against the landscape around Carlingford.",
  },
  {
    slug: "visit-carlingford",
    name: "Carlingford & Cooley Peninsula",
    collection: "identity",
    services: ["Logo design", "Web design"],
    tools: [],
    intro: "A destination with a story of its own.",
    description:
      "Logo and website design for Carlingford & Cooley Peninsula, bringing the area’s landscape, heritage and visitor experiences into a destination identity and mobile guide.",
  },
];
