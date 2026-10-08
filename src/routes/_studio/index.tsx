import { createFileRoute } from "@tanstack/react-router";
import StudioHome from "@/pages/kamrok/StudioHome";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/")({
  head: () => pageHead({ path: "/", title: "KAMROK \u00b7 Lovable Expert & Award-Winning WordPress Designer", description: "Certified Lovable expert and award-winning WordPress designer in Dundalk, Ireland. Thoughtful websites, custom apps, branding and practical AI." }),
  component: StudioHome,
});
