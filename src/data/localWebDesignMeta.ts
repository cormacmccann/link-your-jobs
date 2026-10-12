/** Small route-head inventory; full page stories stay in the lazy page bundle. */
export type LocalWebDesignMeta = {
  slug: "dundalk" | "warrenpoint" | "rostrevor";
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
