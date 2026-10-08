import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/kamrok/About";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/about")({
  head: () => pageHead({ path: "/about", title: "About KAMROK \u2014 Design Studio in Dundalk", description: "Meet Cormac McCann and Kayla Minto, the small, hands-on team behind KAMROK. Design and development from Dundalk, Ireland." }),
  component: About,
});
