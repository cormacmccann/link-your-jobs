import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/sitemap-audit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleSitemapAudit } = await import("@/server/sitemap-audit");
        return handleSitemapAudit(request);
      },
    },
  },
});
