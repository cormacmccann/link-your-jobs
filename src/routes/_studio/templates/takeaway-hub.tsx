import { createFileRoute } from "@tanstack/react-router";
import TakeawayHub from "@/pages/kamrok/TakeawayHub";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/templates/takeaway-hub")({
  head: () => pageHead({ path: "/templates/takeaway-hub", title: "Commission-Free Takeaway Website Template | KAMROK", description: "Launch your own takeaway website with Takeaway Hub. Free DIY Lovable template, no KAMROK design fee and 0% order commission. Explore the demo and calculate savings.", image: "/templates/takeaway-hub/website.webp", imageAlt: "Takeaway Hub takeaway website template" }),
  component: TakeawayHub,
});
