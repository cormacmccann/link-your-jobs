import { createFileRoute } from "@tanstack/react-router";
import BusinessNameGenerator from "@/pages/tools/BusinessNameGenerator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/business-name-generator")({
  head: () => toolHead("business-name-generator"),
  component: BusinessNameGenerator,
});
