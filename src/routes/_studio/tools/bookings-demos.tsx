import { createFileRoute } from "@tanstack/react-router";
import BookingsDemos from "@/pages/BookingsDemos";
import { toolHead } from "@/lib/seo";

export const Route = createFileRoute("/_studio/tools/bookings-demos")({
  head: () => toolHead("bookings-demos"),
  component: BookingsDemos,
});
