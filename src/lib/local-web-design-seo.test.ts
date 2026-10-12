import { existsSync, readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { WEB_DESIGN_LOCATIONS, LOCAL_PROJECTS } from "@/data/localWebDesign";
import { localWebDesignHead } from "./local-web-design-seo";

const locations = Object.values(WEB_DESIGN_LOCATIONS);
describe("Local service pages", () => {
  it("gives each location its own canonical, title, visible content and service area", () => {
    const titles = new Set<string>();
    for (const location of locations) {
      const head = localWebDesignHead(location);
      const canonical = `https://kamrok.com/web-design-${location.slug}`;
      titles.add(location.title);
      expect(head.links).toEqual([{ rel: "canonical", href: canonical }]);
      expect(
        head.meta.find((meta) => meta["property"] === "og:url")?.["content"],
      ).toBe(canonical);
      expect(
        head.meta.filter((meta) => meta["property"] === "og:image"),
      ).toHaveLength(1);
      const graph = JSON.parse(head.scripts[0]!.children)["@graph"];
      const service = graph.find(
        (node: Record<string, unknown>) => node["@type"] === "Service",
      );
      expect(service.areaServed.address.addressLocality).toBe(location.name);
      expect(service.areaServed.address.addressCountry).toBe(location.country);
      expect(service.provider["@id"]).toBe("https://kamrok.com/#org");
      expect(readFileSync("public/sitemap.xml", "utf8")).toContain(
        `<loc>${canonical}</loc>`,
      );
      for (const slug of location.projects) {
        const project = LOCAL_PROJECTS[slug]!;
        expect(project).toBeDefined();
        expect(
          existsSync(`public/projects/local/${project.image}-480.webp`),
        ).toBe(true);
      }
    }
    expect(titles.size).toBe(3);
    expect(new Set(locations.map((location) => location.context)).size).toBe(3);
  });

  it("describes Northern Ireland as a service area without inventing local offices", () => {
    expect(
      WEB_DESIGN_LOCATIONS.warrenpoint.faqs.map((faq) => faq.a).join(" "),
    ).toContain("no separate Warrenpoint office");
    expect(
      WEB_DESIGN_LOCATIONS.rostrevor.faqs.map((faq) => faq.a).join(" "),
    ).toContain("based in Dundalk");
  });
});
