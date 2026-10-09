import { createFileRoute } from "@tanstack/react-router";
import LovableSavings from "@/pages/planning/LovableSavings";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/_studio/lovable-savings")({
  head: () =>
    pageHead({
      path: "/lovable-savings",
      title: "Switch to Lovable — Your DIY Website Plan | KAMROK",
      description:
        "Add your website bills, choose the features you need and explore a DIY Lovable website with €0 KAMROK design and build fees.",
    }),
  component: LovableSavings,
});
