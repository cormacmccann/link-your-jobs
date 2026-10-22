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
  localEvidence?: {
    title: string;
    text: string;
    url?: string;
    linkLabel?: string;
  };
  workNote?: string;
  projectOptions?: boolean;
  testimonial?: { quote: string; author: string; context: string };
};

const APPROVED_26_EVENTS_TESTIMONIAL = {
  quote:
    "Cormac has brought a real sense of adventure to 26 Events. The platform captures the spirit of 26 Extreme while making the practical side — finding an event, choosing an entry and keeping track of tickets — feel clear and connected. The virtual challenges are a particular highlight, turning each route into an experience people can explore. It’s an ambitious piece of work that brings design, technology and our passion for getting people outdoors together.",
  author: "Lucy Cumming · 26 Extreme",
  context:
    "26 Events · regional client feedback, not a town-specific commission",
};

export const WEB_DESIGN_LOCATIONS: Record<
  WebDesignLocation["slug"],
  WebDesignLocation
> = {
  newry: {
    ...LOCAL_WEB_DESIGN_META.newry,
    introduction:
      "Your customers may shop on both sides of the border. Your website should make the next step clear on either side: enquire, book or buy.",
    positioning: "SERVING NEWRY · DUNDALK STUDIO",
    lead: "One business. Two markets. A clearer journey.",
    context:
      "For a Newry business serving customers in Northern Ireland and Ireland, a website can quickly become a tangle of delivery details, currencies and enquiries. I’m Cormac at KAMROK. We work through those decisions first, then bring the brand, website and any connected app together. KAMROK is based in Dundalk, not a Newry branch office.",
    priorities: [
      {
        title: "Make cross-border buying clear.",
        text: "Before building a shop, we agree which markets you serve, how prices are displayed and what customers need to know about delivery and returns. Payments and stock connections are scoped around your actual business, not a generic template.",
      },
      {
        title: "Give trade customers useful detail.",
        text: "A product catalogue can support an enquiry as well as a checkout. Specifications, ranges and project examples help customers shortlist what they need; a focused enquiry form gives your team enough context to respond.",
      },
      {
        title: "Connect the work behind the website.",
        text: "If your team is copying information between forms, spreadsheets and customer emails, a custom portal may be the next step. We define permissions, customer journeys and integrations before committing to the build.",
      },
    ],
    projects: ["global-tiles-bathrooms", "26-events", "roco9"],
    testimonial: APPROVED_26_EVENTS_TESTIMONIAL,
    localEvidence: {
      title: "Cooley Gullion Mourne: work across Newry and Armagh.",
      text: "Cooley Gullion Mourne is a KAMROK client covering the Newry and Armagh area. Explore their website alongside the detailed regional case studies below.",
      url: "https://cooleygullionmourne.com",
      linkLabel: "Visit Cooley Gullion Mourne",
    },
    workNote:
      "Cooley Gullion Mourne is the confirmed Newry/Armagh-area client above. The case studies below are wider-region examples; they are not all Newry commissions.",
    projectOptions: true,
    faqs: [
      {
        q: "Do you have an office in Newry?",
        a: "No. KAMROK serves Newry from Dundalk. You work directly with Cormac through agreed calls and project reviews, rather than being passed between a sales team and a separate builder.",
      },
      {
        q: "Can our Newry shop sell in euros and pounds?",
        a: "We can plan EUR and GBP display and payment options around the ecommerce platform and payment provider. Delivery rules and tax treatment need to be agreed with your advisers before implementation.",
      },
      {
        q: "Can we start with a website and add an app later?",
        a: "Yes. We can scope a first website as a one-off project, identify future integrations and agree an app phase separately. A retainer is an option for ongoing work, not a requirement for every website.",
      },
    ],
  },
  armagh: {
    ...LOCAL_WEB_DESIGN_META.armagh,
    introduction:
      "A useful website for the business you run today. Room for the bookings, customer tools and ideas you want to build next.",
    positioning: "SERVING ARMAGH · DUNDALK STUDIO",
    lead: "From a first enquiry to a working platform.",
    context:
      "For an Armagh service business, visitor organisation or growing team, the right website depends on what people need to do. Find an answer? Book an experience? Manage information after they become a customer? I help separate those journeys before choosing WordPress or a custom app. You work with Cormac at KAMROK in Dundalk throughout.",
    priorities: [
      {
        title: "Organise places and experiences.",
        text: "For visitor-facing work across Armagh and the wider Gullion area, clear information matters: what is available, where to go and how to plan the visit. We shape the content around those practical questions and connect the agreed booking or enquiry route.",
      },
      {
        title: "Make service enquiries specific.",
        text: "A service website should explain the work, show relevant examples and ask for the details your team actually needs. We plan the page structure and forms around your sales conversation, rather than adding a contact box and hoping for the best.",
      },
      {
        title: "Build a reason to return.",
        text: "An app or member area can support customers after the first visit. The 26 Events regional case study shows one approach: discovery, entry, participant accounts and ongoing challenges, all shaped around a particular audience.",
      },
    ],
    projects: ["26-events", "onyerbike", "global-tiles-bathrooms"],
    testimonial: APPROVED_26_EVENTS_TESTIMONIAL,
    localEvidence: {
      title: "A confirmed client in the Armagh and Newry area.",
      text: "Cooley Gullion Mourne is part of KAMROK’s work across Armagh and Newry. Their site is a direct example to explore; the 26 Events and other case studies below show additional work from the wider region.",
      url: "https://cooleygullionmourne.com",
      linkLabel: "Explore Cooley Gullion Mourne",
    },
    workNote:
      "Cooley Gullion Mourne covers Armagh and Newry. Other examples are regional work, not claims of an Armagh city office or an Armagh commission for every project.",
    projectOptions: true,
    faqs: [
      {
        q: "Do you work with Armagh businesses from Dundalk?",
        a: "Yes. KAMROK serves the Armagh area from Dundalk, with no separate Armagh office. We agree how to meet, review designs and hand over the finished website at the start.",
      },
      {
        q: "Do we need a custom app or just a website?",
        a: "If the job is to explain services and receive enquiries, a content-led website may be enough. Customer accounts, permissions and recurring workflows can make a custom app worthwhile. We scope the simplest useful solution first.",
      },
      {
        q: "Can you help us maintain the site afterwards?",
        a: "We can agree a retainer for ongoing development, content or technical work. A one-off build with an agreed handover is also available; ongoing services and third-party costs are set out separately.",
      },
    ],
  },
  drogheda: {
    ...LOCAL_WEB_DESIGN_META.drogheda,
    introduction:
      "For a local service, a growing shop or a new digital product: a website that explains your offer and makes the next step straightforward.",
    positioning: "SERVING DROGHEDA · BASED IN DUNDALK, LOUTH",
    lead: "A Louth studio. A practical plan for your next move.",
    context:
      "KAMROK serves Drogheda from our Dundalk base. For a redesign, I start with what already works: the pages customers use, the enquiries you want and the content worth keeping. For a new business, we build that structure together. The portfolio on this page is regional evidence from Louth and beyond, not a list of claimed Drogheda clients.",
    priorities: [
      {
        title: "Redesign without losing the useful bits.",
        text: "We review your existing pages, customer journeys and important links before changing the site. Content migration and redirects are part of the agreed scope, so a fresh design does not mean forgetting the work your old website already does.",
      },
      {
        title: "Make a local service easy to choose.",
        text: "For a Drogheda business serving south Louth and surrounding areas, service pages should make the offer and coverage clear. Relevant work, straightforward contact details and a useful enquiry route help people decide whether you are a fit.",
      },
      {
        title: "Choose the right editing workflow.",
        text: "A shop, hospitality website and custom app have different everyday needs. We choose WordPress, ecommerce tooling or Lovable around who updates the information and what needs to connect, with a handover scoped from the start.",
      },
    ],
    projects: ["mckevitts", "carlingford-arms", "onyerbike"],
    localEvidence: {
      title: "County Louth work, labelled honestly.",
      text: "McKevitt’s Village Hotel, Carlingford Arms and OnYerBike are Carlingford projects in County Louth. They show KAMROK’s hospitality and visitor-business experience; they are not presented as Drogheda commissions.",
    },
    workNote:
      "These are Carlingford and County Louth examples. No Drogheda-specific client project or testimonial is claimed on this page.",
    projectOptions: true,
    faqs: [
      {
        q: "Are you based in Drogheda?",
        a: "No. KAMROK is based in Dundalk, County Louth, and serves Drogheda. You work directly with Cormac; review calls and shared previews are agreed around your project.",
      },
      {
        q: "Can you move our current website to WordPress?",
        a: "We first check the current platform, content and required features. If WordPress is a good fit, the proposal covers the agreed migration, redirects, editing setup and handover.",
      },
      {
        q: "Do you only offer monthly retainers?",
        a: "No. A website or defined app phase can be a one-off project. Retainers are available where there is a regular need for development, maintenance or content work, with an agreed scope rather than an automatic commitment.",
      },
    ],
  },
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
