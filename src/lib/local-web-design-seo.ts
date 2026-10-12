import type { LocalWebDesignMeta } from "@/data/localWebDesignMeta";
import { canonicalUrl, pageHead, SITE_URL } from "./seo";

export function localWebDesignHead(location: LocalWebDesignMeta) {
  const path = `/web-design-${location.slug}`;
  const url = canonicalUrl(path);
  return pageHead({
    path,
    title: location.title,
    description: location.description,
    image: `/projects/local/${location.feature.image}-1200.webp`,
    imageAlt: location.feature.alt,
    jsonLd: {
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#page`,
          url,
          name: location.title,
          description: location.description,
          isPartOf: { "@id": `${SITE_URL}/#website` },
          mainEntity: { "@id": `${url}#service` },
          breadcrumb: { "@id": `${url}#breadcrumbs` },
        },
        {
          "@type": "Service",
          "@id": `${url}#service`,
          url,
          name: `Web design in ${location.name}`,
          serviceType: "Website design and development",
          description: location.description,
          provider: { "@id": `${SITE_URL}/#org` },
          areaServed: {
            "@type": "Place",
            name: location.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressRegion: location.region,
              addressCountry: location.country,
            },
          },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumbs`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${SITE_URL}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: `Web design ${location.name}`,
              item: url,
            },
          ],
        },
      ],
    },
  });
}
