import { createFileRoute } from "@tanstack/react-router";
import Work from "@/pages/kamrok/Work";
import { collectionLd, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/work/")({
  head: () => pageHead({ path: "/work", title: "Selected Work \u2014 Web Design Portfolio | KAMROK", description: "Explore KAMROK\u2019s websites, brands and digital products. Take a closer look at our client projects and case studies.", jsonLd: collectionLd("Selected Work — Web Design Portfolio | KAMROK", "Explore KAMROK’s websites, brands and digital products. Take a closer look at our client projects and case studies.", "/work") }),
  component: Work,
});
