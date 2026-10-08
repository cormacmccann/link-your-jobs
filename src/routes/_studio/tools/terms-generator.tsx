import { createFileRoute } from "@tanstack/react-router";
import TermsGenerator from "@/pages/TermsGenerator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/terms-generator")({
  head: () => toolHead("terms-generator"),
  component: TermsGenerator,
});
