import { createFileRoute } from "@tanstack/react-router";
import StudioHome from "@/pages/kamrok/StudioHome";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/")({
  head: () => pageHead({ path: "/", title: "Web Design Dundalk & Louth | WordPress & Lovable Expert | KAMROK", description: "KAMROK is a web design studio in Dundalk, Co. Louth, Ireland. Award-winning WordPress websites, Lovable apps, ecommerce, branding and practical AI for businesses in Louth and beyond." }),
  component: StudioHome,
});
