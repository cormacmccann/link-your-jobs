import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_studio/tools/$")({
  beforeLoad: () => {
    throw redirect({ to: "/work", statusCode: 301 });
  },
});
