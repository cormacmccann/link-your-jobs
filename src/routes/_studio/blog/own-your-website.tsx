import { createFileRoute } from "@tanstack/react-router";
import WebsiteOwnershipGuide from "@/pages/kamrok/WebsiteOwnershipGuide";
import { articleLd, pageHead } from "@/lib/seo";
import { OWNERSHIP_GUIDE as guide } from "@/lib/website-ownership";
export const Route = createFileRoute("/_studio/blog/own-your-website")({
  head: () =>
    pageHead({
      path: guide.path,
      title: guide.title,
      description: guide.description,
      image: guide.image,
      imageAlt:
        "The KAMROK astronaut chimp holding the keys to your website",
      type: "article",
      jsonLd: {
        ...articleLd(guide.headline, guide.description, guide.path),
        author: {
          "@type": "Person",
          name: "Cormac McCann",
          url: "https://kamrok.com/about",
        },
        image: `https://kamrok.com${guide.image}`,
        datePublished: guide.date,
        dateModified: guide.date,
        inLanguage: "en-IE",
        citation: "https://www.codo.digital/blog/what-to-ask-a-web-designer/",
      },
    }),
  component: WebsiteOwnershipGuide,
});
