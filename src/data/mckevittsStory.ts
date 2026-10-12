import type { CaseChapter, CaseData, ProjectImage } from "./projects";

export function buildMckevittsChapters(project: CaseData): CaseChapter[] {
  const images = [project.hero, ...(project.gallery ?? [])];
  const image = (filename: string): ProjectImage => {
    const found = images.find((shot) => shot.src.endsWith(`/${filename}`));
    if (!found)
      throw new Error(`Missing McKevitt’s project image: ${filename}`);
    return found;
  };
  return [
    {
      id: "website",
      eyebrow: "01 / WEB DESIGN & WORDPRESS DEVELOPMENT",
      title: "A warm welcome, before the first visit.",
      paragraphs: [
        "The WordPress website brings the hotel, restaurant and bar together. Rooms, dining and Carlingford’s setting lead the experience, with a clear route to availability and booking.",
        "The identity carries into the navigation, typography and colour palette. The family can update menus, offers and events themselves, keeping the website part of the day-to-day life of the hotel.",
      ],
      images: [image("website-presentation.jpg")],
      supportingImages: [
        image("website-devices.jpg"),
        ...images.filter((shot) =>
          shot.src.includes("/site-captures/mckevitts/"),
        ),
      ],
      supportingLabel: "Explore the website screens",
    },
    {
      id: "before",
      eyebrow: "02 / WHERE WE STARTED",
      title: "A familiar building. A new chapter.",
      paragraphs: [
        "The earlier identities put the Village Hotel building at the centre of the brand. They are shown here as the starting point for the redesign, preserving the link to a familiar place in Carlingford.",
        "The new identity brings the family’s heritage and the surrounding landscape into that story, while respecting the purple and dark colours already associated with the building.",
      ],
      images: [image("historic-identity.jpg"), image("previous-identity.png")],
      paired: true,
    },
    {
      id: "process",
      eyebrow: "03 / THE IDEA BEHIND THE MARK",
      title: "Family heritage, shaped by the landscape.",
      paragraphs:
        project.story?.slice(0, 2).map((chapter) => chapter.text) ?? [],
      images: [image("design-studies.jpg")],
      supportingImages: [image("family-crest-reference.png")],
      supportingLabel: "See the family crest reference",
    },
    {
      id: "identity",
      eyebrow: "04 / THE FINISHED IDENTITY",
      title: "Made to belong here.",
      paragraphs: project.story?.slice(2).map((chapter) => chapter.text) ?? [],
      images: [image("logo-bright-mode.avif")],
      supportingImages: [
        image("logo.jpg"),
        image("brand-presentation.jpg"),
        image("mckevitts.jpg"),
      ],
      supportingLabel: "Explore the logo presentations",
    },
    {
      id: "applications",
      eyebrow: "05 / FROM THE SIGN TO THE HANDSHAKE",
      title: "One identity, wherever you meet it.",
      paragraphs: [
        "The exterior sign and business cards carry the same stag, landscape and lettering into the physical experience of the hotel. Together with the WordPress website, they give hotel, restaurant and bar a shared visual language.",
      ],
      images: [image("business-cards.jpg"), image("exterior-sign.jpg")],
    },
  ];
}
