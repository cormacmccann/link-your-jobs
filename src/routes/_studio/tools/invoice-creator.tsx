import { createFileRoute } from "@tanstack/react-router";
import InvoiceCreator from "@/pages/tools/InvoiceCreator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/invoice-creator")({
  head: () => toolHead("invoice-creator"),
  component: InvoiceCreator,
});
