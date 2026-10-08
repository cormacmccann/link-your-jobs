import { createFileRoute } from "@tanstack/react-router";
import EmailSignatureGenerator from "@/pages/tools/EmailSignatureGenerator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/email-signature")({
  head: () => toolHead("email-signature"),
  component: EmailSignatureGenerator,
});
