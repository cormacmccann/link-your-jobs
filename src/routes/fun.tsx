import { createFileRoute } from "@tanstack/react-router";
import MoonHome from "@/pages/kamrok/MoonHome";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/fun")({
  head: () => pageHead({ path: "/fun", title: "The Moon Playground | KAMROK", description: "Drive the KAMROK moon rover, explore our work in 3D and take off into space \u2014 the playful side of a Dundalk design studio." }),
  component: MoonHome,
});
