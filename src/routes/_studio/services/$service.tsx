import { createFileRoute, notFound } from "@tanstack/react-router";
import { getService } from "@/data/services";
import { PROJECT_CASES } from "@/data/projects";
import { PORTFOLIO_CAPTURES } from "@/data/portfolioCaptures";
import ServiceDetail from "@/pages/kamrok/ServiceDetail";
import { pageHead, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/_studio/services/$service")({
  beforeLoad: ({ params }) => {
    if (!getService(params.service)) throw notFound();
  },
  head: ({ params }) => {
    const service = getService(params.service);
    if (!service)
      return {
        meta: [
          { title: "Service not found | KAMROK" },
          { name: "robots", content: "noindex" },
        ],
      };
    const projectSlug = service.examples[0]!.slug;
    const image =
      (service.slug === "brand-creative-direction"
        ? undefined
        : PORTFOLIO_CAPTURES[projectSlug]?.hero) ??
      PROJECT_CASES[projectSlug]!.hero;
    return pageHead({
      path: `/services/${service.slug}`,
      title: `${service.name} — Design & Build | KAMROK`,
      description: `${service.line} ${service.body}`,
      image: image.src,
      imageAlt: image.alt,
      jsonLd: {
        "@type": "Service",
        name: service.name,
        description: service.body,
        url: `${SITE_URL}/services/${service.slug}`,
        provider: { "@id": `${SITE_URL}/#org` },
      },
    });
  },
  component: ServicePage,
  notFoundComponent: () => (
    <div className="studio-container">
      <h1>Service not found</h1>
      <a href="/skills">Explore all services</a>
    </div>
  ),
});

function ServicePage() {
  const { service: slug } = Route.useParams();
  const service = getService(slug);
  return service ? <ServiceDetail service={service} /> : null;
}
