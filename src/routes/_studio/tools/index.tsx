import { createFileRoute } from "@tanstack/react-router";
import ToolsHub from "@/pages/tools/ToolsHub";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/")({
  head: () => pageHead({ path: "/tools", title: "Free Business, Design & Marketing Tools | KAMROK", description: "Create invoices, generate QR codes, calculate VAT and more. Explore KAMROK\u2019s free tools for everyday business, design and marketing tasks." }),
  component: ToolsHub,
});
