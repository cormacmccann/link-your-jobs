import { createFileRoute, redirect } from "@tanstack/react-router";
import CaseStudy from "@/pages/kamrok/CaseStudy";
import { PROJECT_CASES } from "@/data/projects";
import { articleLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/work/$slug")({
  beforeLoad: ({ params }) => {
    if (params.slug === "kamrok-archive") throw redirect({ to: "/illustrations", statusCode: 301 });
  },
  head: ({ params }) => {
    const data = Object.prototype.hasOwnProperty.call(PROJECT_CASES, params.slug) ? PROJECT_CASES[params.slug] : undefined;
    if (!data) {
      return { meta: [{ title: "Project not found | KAMROK" }, { name: "robots", content: "noindex" }] };
    }
    const path = `/work/${params.slug}`;
    const title = `${data.name} — Case Study | KAMROK`;
    const description = `${data.name}. ${data.description[0] ?? data.intro} A project by KAMROK.`;
    return pageHead({
      path,
      title,
      description,
      image: data.hero.src,
      imageAlt: data.hero.alt,
      type: "article",
      jsonLd: articleLd(`${data.name} — Case Study`, description, path),
    });
  },
  component: CaseStudy,
});
