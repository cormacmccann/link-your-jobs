import {
  LOCAL_WEB_DESIGN_META,
  type LocalWebDesignMeta,
} from "./localWebDesignMeta";

export type WebDesignLocation = LocalWebDesignMeta & {
  introduction: string;
  positioning: string;
  lead: string;
  context: string;
  priorities: { title: string; text: string }[];
  projects: string[];
  faqs: { q: string; a: string }[];
};

export const WEB_DESIGN_LOCATIONS: Record<
  WebDesignLocation["slug"],
  WebDesignLocation
> = {
  dundalk: {
    ...LOCAL_WEB_DESIGN_META.dundalk,
    introduction:
      "A distinctive website. A clear next step. Designed and built with a studio right here in Dundalk.",
    positioning: "DUNDALK STUDIO · BUSINESSES ACROSS LOUTH",
    lead: "Local roots. Bigger possibilities.",
    context:
      "I’m Cormac McCann, the designer behind KAMROK. From our Dundalk base, I bring branding, web design and development together for businesses that need their online presence to do more. You work with the person shaping the design and building the site, from the first conversation to handover.",
    priorities: [
      {
        title: "Turn searches into conversations.",
        text: "For a service business in Dundalk, Blackrock or the wider Louth area, the important journey may be an enquiry rather than a checkout. We organise your services, explain the areas you actually cover and make it easy to call, request a quote or book a conversation.",
      },
      {
        title: "Bring the shop online.",
        text: "For retailers and trade suppliers, product discovery matters as much as the homepage. We plan categories, search, product information and the route to ordering or an enquiry. Where the business needs stock, payment or back-office connections, we scope those before choosing the platform.",
      },
      {
        title: "Build beyond the brochure.",
        text: "A member portal, customer dashboard or business tool needs more than a set of pages. As a certified Lovable expert, I can help define the workflows, design the interface and build the app, with the integrations and permissions considered from the start.",
      },
    ],
    projects: ["global-tiles-bathrooms", "mckevitts", "26-events"],
    faqs: [
      {
        q: "Are you based in Dundalk?",
        a: "Yes. KAMROK is based in Dundalk, County Louth, and is part of Candy Shop Digital Ltd. You work directly with Cormac on the direction, design and build. We can agree the best way to meet and review progress when we talk.",
      },
      {
        q: "Can you redesign my existing Dundalk business website?",
        a: "Yes. We start with the current site, its content and the journeys that matter to your customers. If a redesign is needed, we plan the content migration and redirects so useful pages and existing links are considered. Sometimes a focused set of improvements is the better starting point.",
      },
      {
        q: "Do you include local SEO for Dundalk?",
        a: "The build includes an agreed search foundation: descriptive page titles, a clear service structure, crawlable content, internal links and a sitemap. We can also review how your website and Google Business Profile describe your business. Search visibility grows through useful content, a sound website and ongoing work; a new site alone cannot guarantee a ranking.",
      },
    ],
  },
  warrenpoint: {
    ...LOCAL_WEB_DESIGN_META.warrenpoint,
    introduction:
      "For the customers on your doorstep. And the ones discovering you from further away. Website design for Warrenpoint businesses.",
    positioning: "SERVING WARRENPOINT · BASED IN DUNDALK",
    lead: "A local welcome. A wider reach.",
    context:
      "Your website may be a visitor’s first introduction to your business, or a regular customer’s quickest way to get something done. I design around both. KAMROK is based in Dundalk and works with businesses in Warrenpoint and across the border, bringing the brand, the customer journey and the build together.",
    priorities: [
      {
        title: "Make the visit easy to plan.",
        text: "For a restaurant, accommodation provider or visitor business around Warrenpoint and Carlingford Lough, people need practical details quickly. We bring menus, opening hours, directions, accessibility information and booking links into a clear mobile experience, with photography that gives a real sense of the place.",
      },
      {
        title: "Make the enquiry worth answering.",
        text: "For professional services and trade businesses, a useful website explains the work and helps customers provide the right details. We shape service pages, project examples and enquiry forms around the questions your team answers every day, so the first conversation can start with more context.",
      },
      {
        title: "Think across the border.",
        text: "Selling or taking bookings in more than one market creates decisions about currency, delivery areas, payment methods and customer information. We work through those requirements before the build, then choose the right ecommerce or booking tools for the way your business operates.",
      },
    ],
    projects: ["mckevitts", "carlingford-arms", "roco9"],
    faqs: [
      {
        q: "Do you work with businesses in Warrenpoint?",
        a: "Yes. KAMROK serves Warrenpoint and the wider County Down area from Dundalk. There is no separate Warrenpoint office. We can work through calls, shared previews and agreed review sessions, with the working arrangements set out at the start.",
      },
      {
        q: "Can you connect our website to a booking system?",
        a: "Yes, subject to the booking provider’s available integration options. We review your existing system, the customer journey and any fees or limitations before deciding whether a link, embedded booking flow or custom integration is the right approach.",
      },
      {
        q: "Can the website serve customers in Northern Ireland and Ireland?",
        a: "Yes. We can plan separate delivery information, suitable currencies and payment options around your markets. Any tax or legal requirements should be confirmed with your own advisers; I handle how the agreed requirements are presented and implemented on the website.",
      },
    ],
  },
  rostrevor: {
    ...LOCAL_WEB_DESIGN_META.rostrevor,
    introduction:
      "Give people a reason to explore. Then make the booking, purchase or enquiry feel effortless. Web design for Rostrevor and the Mourne area.",
    positioning: "SERVING ROSTREVOR · BASED IN DUNDALK",
    lead: "The experience starts before they arrive.",
    context:
      "For a business in Rostrevor, the website can connect the experience you offer with the place people want to discover. Whether you welcome visitors, run activities or provide a local service, I help tell that story clearly. KAMROK works from Dundalk, combining original design, practical marketing thinking and a considered build.",
    priorities: [
      {
        title: "Turn inspiration into a plan.",
        text: "For an activity, accommodation or outdoor business serving Rostrevor and the Mourne area, strong imagery needs practical information alongside it. We plan routes to availability, meeting points, equipment requirements and booking, so visitors can move from imagining their trip to organising it.",
      },
      {
        title: "Keep the season moving.",
        text: "Offers, event dates and opening hours change. We build the editing workflow around the information you need to keep current, with reusable page layouts and a handover. If bookings or events already live in another system, we look at how to connect them without duplicating work.",
      },
      {
        title: "Be clear about your services.",
        text: "Not every Rostrevor business is visitor-facing. For a contractor, consultant or local retailer, we focus on service areas, examples of the work and a straightforward enquiry or buying journey. The content should answer real customer questions and show why your business is a good fit.",
      },
    ],
    projects: ["onyerbike", "26-events", "mckevitts"],
    faqs: [
      {
        q: "Can you build a tourism or activity website for Rostrevor?",
        a: "Yes. We can shape the site around your experiences, practical visitor information and the booking process. The portfolio includes bike hire, hospitality and event projects. We review your booking platform and content needs before agreeing the scope.",
      },
      {
        q: "Will I be able to update dates, offers and photographs?",
        a: "We choose the platform and editing setup around those everyday tasks. A WordPress build can include reusable layouts for offers and events; a custom app may use a different content workflow. The agreed editing features and handover are included in the proposal.",
      },
      {
        q: "Are you a Rostrevor-based web design studio?",
        a: "KAMROK is based in Dundalk and serves businesses in Rostrevor, Warrenpoint and the wider region. You work directly with Cormac. Calls and shared working previews make the design and review process straightforward without a local branch office.",
      },
    ],
  },
};

export const LOCAL_PROJECTS: Record<
  string,
  { name: string; image: string; alt: string; text: string; label: string }
> = {
  "global-tiles-bathrooms": {
    name: "Global Tiles & Bathrooms",
    image: "global-tiles",
    alt: "Global Tiles and Bathrooms website catalogue",
    text: "Branding, website design and a connected product catalogue.",
    label: "RETAIL & TRADE",
  },
  mckevitts: {
    name: "McKevitt’s Village Hotel",
    image: "mckevitts",
    alt: "McKevitt’s hotel WordPress website on desktop and laptop",
    text: "A family identity, brought into a complete WordPress hotel website.",
    label: "HOSPITALITY · WORDPRESS",
  },
  "26-events": {
    name: "26 Events",
    image: "26-events",
    alt: "26 Events website with a runner against a mountain sunset",
    text: "Event discovery, entries and a connected participant experience.",
    label: "EVENTS · LOVABLE",
  },
  "carlingford-arms": {
    name: "Carlingford Arms",
    image: "carlingford-arms",
    alt: "Carlingford Arms restaurant and bar website",
    text: "A distinctive hospitality identity with menus and visitor information.",
    label: "HOSPITALITY",
  },
  roco9: {
    name: "ROCO9",
    image: "roco9",
    alt: "ROCO9 product website design",
    text: "Product storytelling and a website built for multiple markets.",
    label: "PRODUCTS · WORDPRESS",
  },
  onyerbike: {
    name: "OnYerBike",
    image: "onyerbike",
    alt: "OnYerBike bike hire and Carlingford Greenway website",
    text: "A fresh look, useful integrations and a clearer visitor journey.",
    label: "TOURISM & RETAIL",
  },
};
