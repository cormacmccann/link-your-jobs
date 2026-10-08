import { createFileRoute } from "@tanstack/react-router";
import QuotationMaker from "@/pages/tools/QuotationMaker";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/quotation-maker")({
  head: () => toolHead("quotation-maker"),
  component: QuotationMaker,
});
