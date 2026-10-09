import {
  CalendarDays,
  Code2,
  GraduationCap,
  MousePointer2,
  Palette,
  Search,
  ShoppingBag,
  Ticket,
} from "lucide-react";

const SERVICE_SUMMARIES = [
  {
    icon: MousePointer2,
    name: "Websites & landing pages",
    line: "Make the right first impression. Then make the next step obvious.",
    body: "Distinctive, mobile-first websites with a clear story, intuitive navigation and purposeful calls to action. From a focused campaign page to a complete business website.",
    items: [
      "Brand-led design & content structure",
      "B2B websites & lead generation",
      "Campaign landing pages & redesigns",
    ],
  },
  {
    icon: ShoppingBag,
    name: "Ecommerce",
    line: "Turn browsing into a better buying experience.",
    body: "Help customers find the right product, understand its value and move confidently towards checkout. The store is designed around your products and how you run your business.",
    items: [
      "WooCommerce & Shopify stores",
      "Product discovery, filters & collections",
      "Payments & business integrations",
    ],
  },
  {
    icon: Code2,
    name: "Apps & customer portals",
    line: "Give your big idea a working interface.",
    body: "Bring accounts, information and everyday tasks into one considered product. I shape the flows and build the features around the people who will actually use them.",
    items: [
      "Lovable apps & product prototypes",
      "Member areas & customer dashboards",
      "Internal tools & connected workflows",
    ],
  },
  {
    icon: Ticket,
    name: "Events & ticketing",
    line: "From “that looks brilliant” to “I’m going”.",
    body: "Event experiences that carry the excitement all the way through discovery, entry and the participant journey. Built around the needs of your audience and organisers.",
    items: [
      "Event listings & ticket purchase journeys",
      "Participant accounts & communications",
      "Interactive challenges & experiences",
    ],
  },
  {
    icon: CalendarDays,
    name: "Booking & reservations",
    line: "Make getting booked the easy part.",
    body: "A clear path from checking the options to choosing a time or sending an enquiry. I connect the right booking tools to the experience, with availability and next steps easy to understand.",
    items: [
      "Appointments & service bookings",
      "Hospitality, activities & reservations",
      "Booking integrations & enquiry flows",
    ],
  },
  {
    icon: GraduationCap,
    name: "Learning & membership",
    line: "A useful place to learn, belong and return.",
    body: "Organise content into a journey people can follow. From a resource library to course and member experiences, we plan access, navigation and management around your offer.",
    items: [
      "Learning websites & resource libraries",
      "Course-platform integrations",
      "Member access & content organisation",
    ],
  },
  {
    icon: Search,
    name: "Search & discoverability",
    line: "Help people find you. Help them understand you.",
    body: "Search engine optimisation (SEO) starts with useful content and a well-built website. For AI-powered search (GEO), the focus is equally practical: clear answers, credible information and content that is easy to interpret.",
    items: [
      "Technical SEO & page structure",
      "Content planning & structured data",
      "Search visibility reviews & improvements",
    ],
  },
  {
    icon: Palette,
    name: "Brand & creative direction",
    line: "Make it unmistakably yours.",
    body: "Design, illustration and marketing thinking, working together. I help you find a distinctive visual language and carry it through the website, the campaign and the little details people remember.",
    items: [
      "Brand identity & original illustration",
      "Campaign visuals & digital content",
      "Motion & interactive storytelling",
    ],
  },
];
export type ServiceDefinition = (typeof SERVICE_SUMMARIES)[number] & {
  slug: string;
  number: string;
  fit: string;
  journey: string[];
  includes: [string, string][];
  examples: { slug: string; heading: string; text: string }[];
  faq: [string, string][];
};

const DETAILS = [
  {
    slug: "websites-landing-pages",
    fit: "For businesses that need a clearer story, better enquiries or a focused home for a campaign.",
    journey: [
      "Understand the offer",
      "Find the right information",
      "Make an enquiry",
    ],
    includes: [
      [
        "Structure before styling",
        "Map the pages around your customers’ questions, with a clear offer, useful navigation and a next step on each key page.",
      ],
      [
        "A design that feels like you",
        "Responsive layouts, typography and imagery shaped around your identity. The mobile experience gets the same care as the desktop version.",
      ],
      [
        "A practical launch",
        "Build the agreed pages and forms, check the main journeys and provide a handover for everyday updates. Content preparation and any migration are agreed in the scope.",
      ],
    ],
    examples: [
      {
        slug: "mckevitts",
        heading: "Give different visitors a clear route",
        text: "McKevitt’s brings accommodation, dining, weddings and the local area into one hospitality website. It shows how a site can express the character of a place while helping visitors find the part that matters to them.",
      },
      {
        slug: "roco9",
        heading: "Adapt the story to the market",
        text: "ROCO9 combines web design with localisation and multi-country sales advice. It is a useful example of planning a website around different audiences, languages and buying contexts.",
      },
    ],
    faq: [
      [
        "Do I need all the copy ready?",
        "No. We can start with the offer and page structure, then agree who is writing, gathering and approving each piece of content.",
      ],
      [
        "Can this be a single landing page?",
        "Yes. A focused campaign can use one page with a clear message and call to action. A wider business offer usually benefits from a fuller structure.",
      ],
    ],
  },
  {
    slug: "ecommerce",
    fit: "For product businesses launching a store or making an existing catalogue easier to shop.",
    journey: [
      "Discover a product",
      "Choose with confidence",
      "Complete the order",
    ],
    includes: [
      [
        "A catalogue people can explore",
        "Plan collections, categories and product information so customers can compare the right details. Filters and variants are scoped around the range.",
      ],
      [
        "A considered buying journey",
        "Design product, basket and checkout journeys around the decisions your customers need to make, including clear delivery information.",
      ],
      [
        "Fit the store to the business",
        "Configure agreed payments, delivery rules and integrations. Test representative purchases and provide a handover for products and orders.",
      ],
    ],
    examples: [
      {
        slug: "nude-foods",
        heading: "Connect the product to the brand story",
        text: "Nude Foods brings prepared meals, product photography and online ordering together in a Shopify storefront. The project also included branding and marketing for the direct-to-consumer launch.",
      },
      {
        slug: "greyhound",
        heading: "Make a specialist range understandable",
        text: "Greyhound Extreme presents a specialist supplement range through a Shopify shopping experience. Product-led navigation gives a focused catalogue a clear place to live.",
      },
    ],
    faq: [
      [
        "Can you work with my existing shop?",
        "Yes. We can review its catalogue, design and buying journey before deciding whether to improve it or rebuild. Existing orders, products and customer data need a migration plan if the platform changes.",
      ],
      [
        "Are payment and platform fees included?",
        "The project quote covers the agreed design and build. Platform subscriptions, payment fees, paid extensions and ongoing services are identified separately.",
      ],
    ],
  },
  {
    slug: "apps-customer-portals",
    fit: "For a new product, a customer self-service area or an internal process that has outgrown spreadsheets and email.",
    journey: ["Sign in", "See what needs attention", "Complete the task"],
    includes: [
      [
        "Define the useful first version",
        "Map users, roles and key tasks, then agree a manageable starting scope. Prototype the main flows before adding secondary features.",
      ],
      [
        "Accounts and working screens",
        "Design and build the agreed dashboards, forms and data views. Access rules, empty states and error messages are part of the experience.",
      ],
      [
        "Connected workflows",
        "Scope integrations, notifications and administration around the systems you use. Test the important journeys and agree support and ownership at handover.",
      ],
    ],
    examples: [
      {
        slug: "clubrovia",
        heading: "Bring daily tasks into one product",
        text: "Clubrovia combines club and team management with membership, payments, bookings and match days. Its public website introduces the product while the app provides working tools for administrators and families.",
      },
      {
        slug: "catering-disposables",
        heading: "Support a repeat customer relationship",
        text: "Catering Disposables pairs web design with sales portal integration for trade accounts. It demonstrates how a public website and a customer ordering experience can serve different parts of the same relationship.",
      },
    ],
    faq: [
      [
        "Can we start with a prototype?",
        "Yes. We can agree the smallest set of screens and tasks needed to explore the idea, then decide what belongs in a production build.",
      ],
      [
        "Can it connect to our existing systems?",
        "Potentially. We first check what those systems expose, how access works and what data needs to move. Integration effort and third-party costs are agreed before implementation.",
      ],
    ],
  },
  {
    slug: "events-ticketing",
    fit: "For organisers who need to bring event discovery, entry and participant information into a coherent experience.",
    journey: ["Find an event", "Review the details", "Enter and prepare"],
    includes: [
      [
        "Event pages with a purpose",
        "Present dates, locations, formats and practical details in a structure people can scan, with a clear route to enter or enquire.",
      ],
      [
        "Entry and ticketing flows",
        "Plan ticket types, participant details and payment or booking connections. Capacity, group entry and organiser needs are agreed for your event.",
      ],
      [
        "The journey after entry",
        "Scope confirmations, participant information and account features around how the event runs. Test the path from discovery through to a successful entry.",
      ],
    ],
    examples: [
      {
        slug: "26-events",
        heading: "Carry the excitement through to entry",
        text: "26.events combines branding, an event catalogue, an entry portal and app development for 26 Extreme. The project connects outdoor event imagery with the practical task of finding and entering an event.",
      },
      {
        slug: "team-building-ireland",
        heading: "Help groups choose the right experience",
        text: "Team Building Ireland presents corporate events, activities and school programmes through an activity catalogue. This example illustrates event discovery and offer structure; the portfolio scope is website design.",
      },
    ],
    faq: [
      [
        "Can you connect an existing ticket provider?",
        "Yes, subject to the provider’s available integrations. We can decide whether an embedded flow, a direct connection or a clear hand-off best suits the event.",
      ],
      [
        "Do all events need participant accounts?",
        "No. A simple event may only need an entry and confirmation flow. Accounts are useful when participants need to manage entries or return to an ongoing programme.",
      ],
    ],
  },
  {
    slug: "booking-reservations",
    fit: "For accommodation, activities and service businesses that need a clear route from interest to a reservation or enquiry.",
    journey: [
      "Explore the options",
      "Choose a date or package",
      "Book or send an enquiry",
    ],
    includes: [
      [
        "Make the offer easy to choose",
        "Organise rooms, appointments, activities or packages around the questions guests ask before committing.",
      ],
      [
        "The right booking connection",
        "Design the route into your booking provider or enquiry form. Availability, deposits, calendars and confirmation requirements are scoped around your operations.",
      ],
      [
        "A usable everyday process",
        "Check forms, mobile flows and booking hand-offs, then agree how your team receives and manages requests.",
      ],
    ],
    examples: [
      {
        slug: "mckevitts",
        heading: "Make the stay part of the story",
        text: "McKevitt’s website places accommodation alongside dining, weddings and the surrounding destination, with a visible availability route. It shows the role the website plays before a guest reaches the booking system.",
      },
      {
        slug: "thehenie",
        heading: "Start with the right package",
        text: "The Hen combines logo design, a WordPress website and a full application build with package and offer strategy. It is an example of shaping the experience around the choices a group needs to make.",
      },
    ],
    faq: [
      [
        "Will you replace our current booking system?",
        "Only if there is a reason to. We begin with your current process and assess whether a better website connection solves the problem.",
      ],
      [
        "Can we use enquiries rather than instant booking?",
        "Yes. For bespoke services and group packages, a well-structured enquiry can be more useful. The form should gather enough information to make the next conversation productive.",
      ],
    ],
  },
  {
    slug: "learning-membership",
    fit: "For clubs, communities and educators that want useful content and a clear reason for people to return.",
    journey: [
      "Join or sign in",
      "Find the right resource",
      "Return for the next step",
    ],
    includes: [
      [
        "Organise the experience",
        "Map member needs, content categories and the path through resources or lessons. Give each audience a clear starting point.",
      ],
      [
        "Plan access and membership",
        "Agree who can see what, how people join and how the team manages access. Paid membership or course-platform connections are scoped where needed.",
      ],
      [
        "Make it manageable",
        "Design the content and administration flows, check key access journeys and agree how new resources will be published over time.",
      ],
    ],
    examples: [
      {
        slug: "clubrovia",
        heading: "Make membership useful day to day",
        text: "Clubrovia brings membership and club administration together with payments, bookings and match-day tools. It demonstrates the account and member-management side of this service.",
      },
      {
        slug: "glenmuir-fc",
        heading: "Give a community useful information",
        text: "Glenmuir FC’s website brings membership, fixtures and sponsor communications into the club’s digital presence. It demonstrates community content organisation rather than an online course platform.",
      },
    ],
    faq: [
      [
        "Can this include online courses?",
        "Yes. We can scope a learning website or course-platform integration around your content, access model and teaching approach. The examples here show membership and community work.",
      ],
      [
        "Do I need a paid membership model?",
        "No. A free resource library, club website or private member area may be the right fit. The structure follows what your audience needs and how you plan to maintain it.",
      ],
    ],
  },
  {
    slug: "search-discoverability",
    fit: "For businesses whose website needs to explain the offer more clearly and make useful pages easier to discover.",
    journey: [
      "Ask a question",
      "Find a useful page",
      "Understand the next step",
    ],
    includes: [
      [
        "A practical visibility review",
        "Review page structure, technical issues and the way important services or products are presented. Turn findings into a prioritised plan.",
      ],
      [
        "Clear pages and useful answers",
        "Plan titles, descriptions, internal links and content around customer questions. Add appropriate structured data where the content supports it.",
      ],
      [
        "A basis for improvement",
        "Agree measurement and review points, then work through the priority changes. The goal is a clearer, more accessible website that can be assessed over time.",
      ],
    ],
    examples: [
      {
        slug: "onyerbike",
        heading: "Treat search as part of the rebuild",
        text: "OnYerBike’s confirmed scope includes corporate identity, web design, integrations and SEO. It shows how search improvements can be considered alongside the offer and the wider customer journey.",
      },
      {
        slug: "down-to-earth",
        heading: "Explain the service and who it is for",
        text: "Down to Earth Electrical connects a trade identity, website and marketing with local lead generation. It illustrates service positioning and content clarity, without making a claim about search rankings.",
      },
    ],
    faq: [
      [
        "Can you guarantee rankings or AI mentions?",
        "No. Search engines and AI services control their own results. I focus on improvements we can make and measure: clear content, sound page structure and practical technical fixes.",
      ],
      [
        "Is this only for a new website?",
        "No. A review can help prioritise changes to an existing site. We can then agree a focused improvement project or build search considerations into a wider redesign.",
      ],
    ],
  },
  {
    slug: "brand-creative-direction",
    fit: "For a new identity, a brand that needs a clearer direction or an established look that needs to work across more places.",
    journey: [
      "Find the story",
      "Create the visual language",
      "Carry it into the world",
    ],
    includes: [
      [
        "A clear creative direction",
        "Start with your audience, offer and personality. Agree the ideas and visual references that should guide the work.",
      ],
      [
        "An identity with meaning",
        "Scope the logo, lettering, colour and typography around the brand. Develop a direction you can review and refine, with usable final assets.",
      ],
      [
        "Applications that belong together",
        "Carry the identity into the agreed website, campaign, print or other materials. Handover guidance helps keep later applications consistent.",
      ],
    ],
    examples: [
      {
        slug: "airnean",
        heading: "Build meaning into the mark",
        text: "Airneán brings music, Celtic-inspired moon imagery and candlelight into one identity. Its custom lettering and symbols connect directly to the tradition of gathering to share stories and songs.",
      },
      {
        slug: "mckevitts",
        heading: "Carry the identity across the experience",
        text: "McKevitt’s combines logo and brand work with a website and menu design. It demonstrates a visual identity applied across both the digital introduction and the guest experience.",
      },
      {
        slug: "vithit",
        heading: "Work within an established identity",
        text: "For VITHIT, the work covered posters, apparel and website design using the existing brand. This is an example of creative application; the VITHIT logo was not designed by KAMROK.",
      },
    ],
    faq: [
      [
        "Can you work with an existing logo?",
        "Yes. The task may be to improve consistency, develop campaign materials or bring the identity into a new website. A new logo is only one possible part of the work.",
      ],
      [
        "Is your personal artwork part of this portfolio?",
        "My personal illustrations have their own Just for fun gallery. Commercial brand work is scoped around the needs of the business and the agreed brief.",
      ],
    ],
  },
];

export const SERVICES: ServiceDefinition[] = SERVICE_SUMMARIES.map(
  (summary, index) => ({
    ...summary,
    ...DETAILS[index]!,
    number: String(index + 1).padStart(2, "0"),
    includes: DETAILS[index]!.includes as [string, string][],
    faq: DETAILS[index]!.faq as [string, string][],
  }),
);

export const getService = (slug: string) =>
  SERVICES.find((service) => service.slug === slug);
