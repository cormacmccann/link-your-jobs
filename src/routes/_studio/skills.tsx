import { createFileRoute } from "@tanstack/react-router";
import Skills from "@/pages/kamrok/Skills";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/skills")({
  head: () => pageHead({ path: "/skills", title: "Websites, Lovable Apps & WordPress Services | KAMROK", description: "Distinctive websites, ecommerce and custom apps. Work directly with Cormac McCann, a certified Lovable expert and award-winning WordPress designer." }),
  component: Skills,
});
