import { createFileRoute } from "@tanstack/react-router";
import PasswordGenerator from "@/pages/tools/PasswordGenerator";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/password-generator")({
  head: () => toolHead("password-generator"),
  component: PasswordGenerator,
});
