import { createFileRoute } from "@tanstack/react-router";
import DundalkSeoGuide from "@/pages/kamrok/DundalkSeoGuide";
import { articleLd, pageHead } from "@/lib/seo";

const title = "Local SEO in Dundalk: a Practical Visual Guide | KAMROK";
const description =
  "Get found on Google in Dundalk with six practical steps: claim your Business Profile, fix your details, add photos, ask for reviews and improve your website. Includes visual examples and a checklist.";
const path = "/blog/dundalk-seo-guide";
const image = "/blog/dundalk-seo/google-profile-example.webp";

export const Route = createFileRoute("/_studio/blog/dundalk-seo-guide")({
  head: () =>
    pageHead({
      path,
      title,
      description,
      image,
      imageAlt:
        "Google’s illustrative business listing with photos and a map pin",
      type: "article",
      jsonLd: {
        ...articleLd(
          "How to get found on Google in Dundalk.",
          description,
          path,
        ),
        author: {
          "@type": "Person",
          name: "Cormac McCann",
          url: "https://kamrok.com/about",
        },
        image: `https://kamrok.com${image}`,
        dateModified: "2026-10-12",
        inLanguage: "en-IE",
      },
    }),
  component: DundalkSeoGuide,
});
