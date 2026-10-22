import { createFileRoute, redirect } from "@tanstack/react-router";

// Free tools were retired; forward old links to the portfolio.
export const Route = createFileRoute("/_studio/tools")({
  beforeLoad: () => {
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
