import { createFileRoute } from "@tanstack/react-router";
import VATCalculator from "@/pages/tools/VATCalculator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/vat-calculator")({
  head: () => toolHead("vat-calculator"),
  component: VATCalculator,
});
