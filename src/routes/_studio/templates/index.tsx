import { createFileRoute } from "@tanstack/react-router";
import Templates from "@/pages/kamrok/Templates";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/templates/")({
  head: () => pageHead({ path: "/templates", title: "Lovable Templates & Website Starters | KAMROK", description: "Explore Takeaway Hub, a Lovable starter for food businesses, alongside free website templates you can customise and download." }),
  component: Templates,
});
