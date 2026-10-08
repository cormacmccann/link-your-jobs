import { createFileRoute } from "@tanstack/react-router";
import ChatLeadCapture from "@/pages/ChatLeadCapture";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/chat-lead-capture")({
  head: () => toolHead("chat-lead-capture"),
  component: ChatLeadCapture,
});
