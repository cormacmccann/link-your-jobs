import { createFileRoute } from "@tanstack/react-router";
import DundalkSeoGuide from "@/pages/kamrok/DundalkSeoGuide";
import { articleLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/blog/dundalk-seo-guide")({
  head: () => pageHead({ path: "/blog/dundalk-seo-guide", title: "How to Get Found on Google in Dundalk (I Only Copped This Myself) \u2014 KAMROK", description: "A plain-English, step-by-step guide to local SEO for Dundalk businesses \u2014 Google Business Profile, reviews, local keywords and the mistakes I made myself, from Cormac at KAMROK.", type: "article", jsonLd: articleLd("How to Get Found on Google in Dundalk (I Only Copped This Myself)", "A plain-English, step-by-step guide to local SEO for Dundalk businesses — Google Business Profile, reviews, local keywords and the mistakes I made myself, from Cormac at KAMROK.", "/blog/dundalk-seo-guide") }),
  component: DundalkSeoGuide,
});
