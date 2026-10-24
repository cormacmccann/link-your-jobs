import type { CaseData, ProjectImage } from "./projects";
import { EPSO_SCREENSHOTS } from "./epsoScreenshots";

const shot = (
  key: keyof typeof EPSO_SCREENSHOTS,
  caption: string,
  alt: string,
): ProjectImage => ({
  ...EPSO_SCREENSHOTS[key],
  caption,
  alt,
  kind: "website",
});

export const EPSO_CASE: CaseData = {
  name: "EPSO",
  category: "Arts & culture · Interactive website",
  url: "https://epso.ie/",
  intro: "A town full of stories. Built to explore, wherever you are.",
  year: "2026",
  surface: "#620092",
  presentation: "screens",
  collection: "platforms",
  categories: ["websites", "apps"],
  platformLabel: "Interactive website · Custom development",
  brief:
    "A speed-first rebuild for Dundalk’s open-air gallery, developing the existing visual direction into an interactive experience for people exploring the town.",
  tools: [
    "Lovable",
    "React",
    "TypeScript",
    "Vite",
    "TanStack Start",
    "Leaflet",
    "OpenStreetMap",
  ],
  services: [
    "Web design",
    "Custom development",
    "Interactive mural explorer",
    "Mobile navigation",
    "Performance optimisation",
    "Content structure",
  ],
  description: [
    "The previous EPSO website established the visual aesthetic. KAMROK built on that foundation with a wider development effort spanning Lovable and custom code, prioritising speed, clearer navigation and a genuinely interactive way to discover Dundalk’s murals, artists and stories.",
  ],
  hero: {
    src: "/projects/epso/imac-dark.webp",
    width: 1264,
    height: 848,
    caption: "EPSO — an open invitation to explore Dundalk’s art, language and culture.",
    alt: "EPSO homepage displayed on a graphite and chrome iMac against a dark studio background",
    kind: "website",
  },
  chapters: [
    {
      id: "direction",
      navLabel: "The starting point",
      eyebrow: "01 / BUILDING ON A STRONG FOUNDATION",
      title: "Keep the character. Open up the experience.",
      paragraphs: [
        "The earlier site had already set the design aesthetic. This rebuild was about taking that character further: keeping the energy, colour and connection to Dundalk while making the website more useful to the people visiting it.",
        "The murals lead. Large imagery, confident typography and playful details give the artwork room to speak, while the navigation points people towards the map, the artists, the stories and the next way to get involved. The existing direction becomes a system that works across a much broader experience.",
        "This is website design and development around EPSO’s identity and the artists’ work. The mural artwork belongs to its respective artists; it is the experience of discovering that work that we have rebuilt.",
      ],
      images: [
        shot(
          "desktop-homepage",
          "A familiar visual spirit, developed into a clearer starting point for discovery.",
          "EPSO desktop homepage with routes to the mural map and art collection",
        ),
      ],
      supportingLabel: "See more of the visual direction",
      supportingImages: [
        shot(
          "desktop-featured-murals",
          "Featured walls put the artwork, artist and street location together.",
          "Featured mural cards for Brigid of Faughart, Lugh, Roesia de Verdun and Tom Sailor Sharkey",
        ),
        shot(
          "desktop-our-story",
          "EPSO’s story remains rooted in Dundalk and its creative community.",
          "Purple EPSO story section with the headline Our streets, our stories, our extraordinary",
        ),
      ],
    },
    {
      id: "explorer",
      navLabel: "Interactive discovery",
      eyebrow: "02 / FROM A COLLECTION TO AN EXPLORER",
      title: "Find a wall. Make it part of your walk.",
      paragraphs: [
        "The centre of the rebuild is an interactive mural explorer. Visitors can browse visually, search and filter the collection, or switch to an OpenStreetMap view to understand where the artwork sits around town. On desktop, the map and collection sit alongside each other so discovery stays connected to place.",
        "My Trail turns interest into a next step. People can save murals on their device and use their chosen stops to shape a walk. Instead of asking visitors to remember a list of names, the experience gives them a practical way to collect the walls they want to see.",
        "Search, filters, gallery layouts and the map offer different ways into the same collection. The aim is to let people follow their curiosity without losing their way through the website.",
      ],
      images: [
        shot(
          "desktop-mural-map",
          "A connected map and mural collection, built around exploring the town.",
          "EPSO mural explorer with mural cards beside an OpenStreetMap of Dundalk and photographic location markers",
        ),
      ],
      supportingLabel: "Explore the gallery view",
      supportingImages: [
        shot(
          "desktop-mural-gallery",
          "Switch from geography to a visual gallery of the artwork.",
          "EPSO desktop mural gallery with search, year filters and alternative layout controls",
        ),
      ],
    },
    {
      id: "stories",
      navLabel: "Artists & stories",
      eyebrow: "03 / GIVE PEOPLE A REASON TO LOOK CLOSER",
      title: "The wall is the beginning of the story.",
      paragraphs: [
        "A mural is more than an image in a grid. Its page brings the artwork, artist, subject, year and location together, with a clear route back to the map. Visitors can move from something that catches their eye to the story behind it and then to the street where they can see it.",
        "Artist discovery and the people-and-places collection create further routes through the work. They connect the makers with the history, mythology and local characters represented on the walls, giving people more than one reason to keep exploring.",
        "Tour information sits within that wider journey. Public booking links and private-tour information help turn an online visit into a visit to Dundalk, with the next action close to the content that created the interest.",
      ],
      images: [
        shot(
          "desktop-mural-story",
          "Artwork, artist, subject and street location meet on one story page.",
          "Cúchulainn mural page showing Mister Copy, the year, the story and a route to the map",
        ),
      ],
      supportingLabel: "Browse artists, people and tour information",
      supportingImages: [
        shot(
          "desktop-artists",
          "A searchable way to meet the people behind the artwork.",
          "EPSO artist directory with artist search and year filters",
        ),
        shot(
          "desktop-people-and-places",
          "Another route into the collection: the subjects behind the murals.",
          "EPSO people and places directory connecting murals with historical and mythological subjects",
        ),
        shot(
          "desktop-book-a-tour",
          "From discovering the work to planning a guided visit.",
          "EPSO guided mural tour page with a local tour photograph and public booking links",
        ),
      ],
    },
    {
      id: "mobile",
      navLabel: "Made for the street",
      eyebrow: "04 / BUILT FOR PEOPLE ON THE GO",
      title: "Less figuring it out. More looking up.",
      paragraphs: [
        "This is a website people may use while standing on a street corner. Mobile navigation needed to feel direct: see the art, find the map, open the saved trail and get back to the walk.",
        "The explorer’s bottom navigation keeps Grid, Map and My Trail within reach. The mobile map gets the space it needs, while the gallery remains a useful way to recognise a wall. The information and interactions adapt to the smaller screen rather than squeezing the desktop layout into it.",
        "That same approach carries through the artist, story and tour pages. The next step stays clear, and the artwork keeps its presence without making the visitor work through unnecessary interface.",
      ],
      layout: "phones",
      images: [
        shot(
          "mobile-homepage",
          "An introduction that keeps the artwork and the next action in view.",
          "EPSO mobile homepage with clear mural map and browse art actions",
        ),
        shot(
          "mobile-mural-gallery",
          "Grid, Map and My Trail remain close to hand.",
          "EPSO mobile mural gallery with a bottom navigation bar for grid, map and saved trail",
        ),
        shot(
          "mobile-mural-map",
          "A map-first view for finding the next wall on the move.",
          "EPSO mobile map with mural markers and the Map option selected in the bottom navigation",
        ),
      ],
      supportingLabel: "See the other mobile journeys",
      supportingImages: [
        shot(
          "mobile-artists",
          "Artist discovery, adapted for a phone.",
          "EPSO artist search and year filters on mobile",
        ),
        shot(
          "mobile-mural-story",
          "The story behind a wall, wherever you are reading it.",
          "EPSO Cúchulainn mural story on mobile with a see the map action",
        ),
        shot(
          "mobile-people-and-places",
          "People and places stay easy to browse on a smaller screen.",
          "EPSO mobile people and places directory",
        ),
        shot(
          "mobile-book-a-tour",
          "A clear route to planning a guided visit.",
          "EPSO mobile tour page with private-tour action and local guide photograph",
        ),
        shot(
          "mobile-our-story",
          "The same expressive visual language on mobile.",
          "EPSO story section adapted into a single mobile column",
        ),
      ],
    },
    {
      id: "performance",
      navLabel: "Speed first",
      eyebrow: "05 / PERFORMANCE AS A DESIGN DECISION",
      title: "More to explore. Less waiting around.",
      paragraphs: [
        "Speed was the priority throughout the rebuild, especially for people using mobile connections while out and about. An image-rich experience still has to be practical to load and navigate. Visual impact earns its place when it helps people discover the work.",
        "The development went beyond one tool: Lovable formed part of the workflow alongside custom React and TypeScript development, Vite, TanStack Start and Leaflet. The stack served the experience, with the freedom to refine the code where the visitor journey needed more attention.",
        "Responsive image variants let the browser choose a suitable file for its display. The mapping library is loaded separately, keeping that specialist functionality out of the initial shared JavaScript. These are practical decisions behind a website designed to feel lighter while offering more ways to explore.",
        "The result is a rebuild focused on faster loading, clearer navigation and useful interaction, while carrying the established design aesthetic forward. The screenshots show the experience; performance remains something to measure and maintain as the website grows.",
      ],
      images: [],
      supportingLabel: "See the complete page designs",
      supportingImages: [
        shot(
          "desktop-complete-homepage",
          "The complete desktop homepage, from introduction to the story directory.",
          "Full EPSO desktop homepage showing the connected art, artist, trail, story and visitor sections",
        ),
        shot(
          "mobile-complete-homepage",
          "The full homepage reflowed for mobile.",
          "Complete EPSO mobile homepage in a single-column layout",
        ),
        shot(
          "desktop-footer",
          "Useful routes back into the collection, right down to the footer.",
          "EPSO desktop footer with artist and story links and KAMROK website credit",
        ),
      ],
    },
  ],
  next: "airnean",
};
