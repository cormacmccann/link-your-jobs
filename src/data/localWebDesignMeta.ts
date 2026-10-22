/** Small route-head inventory; full page stories stay in the lazy page bundle. */
export type LocalWebDesignMeta = {
  slug: "dundalk" | "warrenpoint" | "rostrevor" | "newry" | "armagh" | "drogheda";
  name: string;
  region: string;
  country: "IE" | "GB";
  title: string;
  description: string;
  feature: {
    slug: string;
    name: string;
    label: string;
    image: string;
    alt: string;
    caption: string;
  };
};

export const LOCAL_WEB_DESIGN_META: Record<
  LocalWebDesignMeta["slug"],
  LocalWebDesignMeta
> = {
  newry: {
    slug: "newry", name: "Newry", region: "County Down / County Armagh", country: "GB",
    title: "Web Design Newry | Websites & App Development | KAMROK",
    description: "Website design and app development for Newry businesses. Explore KAMROK’s regional work, Cooley Gullion Mourne and one-off or retainer options.",
    feature: { slug: "global-tiles-bathrooms", name: "Global Tiles & Bathrooms", label: "REGIONAL WORK · RETAIL & TRADE", image: "global-tiles", alt: "Global Tiles and Bathrooms website and connected product catalogue", caption: "A regional retail project: brand, website and connected catalogue. See the actual scope." },
  },
  armagh: {
    slug: "armagh", name: "Armagh", region: "County Armagh", country: "GB",
    title: "Web Design Armagh | Business Websites & Custom Apps | KAMROK",
    description: "Websites and custom apps for Armagh businesses, from Dundalk-based KAMROK. Cooley Gullion Mourne work, regional examples and flexible project options.",
    feature: { slug: "26-events", name: "26 Events", label: "REGIONAL WORK · EVENTS & APPS", image: "26-events", alt: "26 Events website showing outdoor event discovery and participant journeys", caption: "A wider-region platform combining event discovery, entries and virtual challenges." },
  },
  drogheda: {
    slug: "drogheda", name: "Drogheda", region: "County Louth", country: "IE",
    title: "Web Design Drogheda | WordPress, Ecommerce & Apps | KAMROK",
    description: "Web design for Drogheda businesses from KAMROK in Dundalk. WordPress, ecommerce and custom apps, with regional portfolio examples and project pricing.",
    feature: { slug: "mckevitts", name: "McKevitt’s Village Hotel", label: "REGIONAL WORK · CARLINGFORD", image: "mckevitts", alt: "McKevitt’s Village Hotel WordPress website on desktop and laptop", caption: "A County Louth hospitality project in Carlingford, shown as regional work rather than a Drogheda commission." },
  },
  dundalk: {
    slug: "dundalk",
    name: "Dundalk",
    region: "County Louth",
    country: "IE",
    title: "Web Design Dundalk | WordPress & Lovable Websites | KAMROK",
    description:
      "Web design in Dundalk, Co. Louth. Work directly with Cormac at KAMROK on WordPress websites, ecommerce, Lovable apps and local SEO. Explore the work.",
    feature: {
      slug: "global-tiles-bathrooms",
      name: "Global Tiles & Bathrooms",
      label: "WEBSITE & CONNECTED CATALOGUE",
      image: "global-tiles",
      alt: "Global Tiles and Bathrooms website design and product catalogue",
      caption:
        "Brand, website and a platform underneath it. Explore the complete project.",
    },
  },
  warrenpoint: {
    slug: "warrenpoint",
    name: "Warrenpoint",
    region: "County Down",
    country: "GB",
    title: "Web Design Warrenpoint | Business Websites & Ecommerce | KAMROK",
    description:
      "Website design for Warrenpoint businesses. WordPress, ecommerce and Lovable builds with KAMROK, a Dundalk-based studio serving County Down. Talk to Cormac.",
    feature: {
      slug: "mckevitts",
      name: "McKevitt’s Village Hotel",
      label: "SELECTED WORK · CARLINGFORD",
      image: "mckevitts",
      alt: "McKevitt’s WordPress hotel website displayed on desktop and laptop",
      caption:
        "Brand identity and a WordPress welcome for a hotel on Carlingford Lough.",
    },
  },
  rostrevor: {
    slug: "rostrevor",
    name: "Rostrevor",
    region: "County Down",
    country: "GB",
    title: "Web Design Rostrevor | Tourism & Business Websites | KAMROK",
    description:
      "Web design for Rostrevor and the Mourne area. Distinctive tourism, hospitality and service-business websites, WordPress and Lovable builds from KAMROK.",
    feature: {
      slug: "onyerbike",
      name: "OnYerBike",
      label: "SELECTED WORK · CARLINGFORD",
      image: "onyerbike",
      alt: "OnYerBike website connecting bike hire with the Carlingford Greenway",
      caption:
        "A visitor website that brings bike hire, local discovery and booking together.",
    },
  },
};
