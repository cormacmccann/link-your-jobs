import { createFileRoute } from "@tanstack/react-router";
import QRCodeGenerator from "@/pages/tools/QRCodeGenerator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/qr-code-generator")({
  head: () => toolHead("qr-code-generator"),
  component: QRCodeGenerator,
});
