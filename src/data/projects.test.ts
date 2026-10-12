import { describe, expect, it } from "vitest";
import { getProjectCover, PROJECT_CASES, PORTFOLIO_PROJECTS } from "./projects";

describe("Portfolio covers and complete project stories", () => {
  it("presents McKevitt’s brand and website with distinct covers leading to one complete case study", () => {
    const project = PROJECT_CASES["mckevitts"]!;
    const brand = getProjectCover(project, "designs");
    const website = getProjectCover(project, "websites");
    expect(brand.src).toContain("brand-presentation.jpg");
    expect(website.src).toContain("website-cover.png");
    expect(project.hero.src).toBe(website.src);
    const projectImages = [project.hero, ...(project.gallery ?? [])].map(
      (image) => image.src,
    );
    expect(projectImages).toContain(brand.src);
    expect(projectImages).toContain(website.src);
    expect(projectImages).toContain(
      "/projects/site-captures/mckevitts/homepage.jpg",
    );
    expect(project.story?.map((chapter) => chapter.text).join(" ")).toContain(
      "family crest",
    );
    expect(project.description.join(" ")).toContain(
      "The family can update menus, offers and events themselves.",
    );
    expect(project.services).toContain("WordPress development");
    const websiteImages = project.gallery
      ?.filter((image) => image.kind === "website")
      .map((image) => image.src);
    expect(websiteImages).toEqual(
      expect.arrayContaining([
        "/projects/mckevitts/website-devices.jpg",
        "/projects/mckevitts/website-presentation.jpg",
        ...["homepage", "detail-1", "weddings", "history", "destination"].map(
          (page) => `/projects/site-captures/mckevitts/${page}.jpg`,
        ),
      ]),
    );
    expect(projectImages).toContain("/projects/brand-artwork/mckevitts.jpg");
  });

  it("retains website captures when a brand cover is supplied", () => {
    const project = PROJECT_CASES["thehenie"]!;
    expect(getProjectCover(project, "websites").src).toContain(
      "/site-captures/",
    );
    expect(getProjectCover(project, "designs").src).toContain(
      "/brand-artwork/",
    );
  });

  it("keeps all McKevitt’s work accessible in the centred narrative and identifies WordPress", () => {
    const project = PROJECT_CASES["mckevitts"]!;
    expect(
      PORTFOLIO_PROJECTS.find((item) => item.slug === "mckevitts")?.platforms,
    ).toContain("WordPress");
    expect(project.chapters?.map((chapter) => chapter.id)).toEqual([
      "website",
      "before",
      "process",
      "identity",
      "applications",
    ]);
    const narrativeSources = new Set(
      [
        project.hero,
        ...(project.chapters?.flatMap((chapter) => [
          ...chapter.images,
          ...(chapter.supportingImages ?? []),
        ]) ?? []),
      ].map((image) => image.src),
    );
    for (const image of project.gallery ?? [])
      expect(narrativeSources.has(image.src)).toBe(true);
    expect(
      project.chapters?.find((chapter) => chapter.id === "process")?.images[0]
        ?.caption,
    ).toBe("Hands-on design — working through studies and ideas.");
  });

  it("falls back to the main artwork when a project has no cover for that context", () => {
    const project = PROJECT_CASES["airnean"]!;
    expect(getProjectCover(project, "websites")).toBe(project.hero);
    expect(getProjectCover(project)).toBe(project.hero);
  });
});
