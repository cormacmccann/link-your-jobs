import { createFileRoute } from "@tanstack/react-router";
import Illustrations from "@/pages/kamrok/Illustrations";
import { collectionLd, pageHead } from "@/lib/seo";

const description =
  "Personal illustrations, sketches and imaginary worlds by Cormac McCann. Art made just for fun, from the KAMROK sketchbook.";
export const Route = createFileRoute("/_studio/illustrations")({
  head: () =>
    pageHead({
      path: "/illustrations",
      title: "Illustrations — Just for fun | KAMROK",
      description,
      image: "/illustrations/forest-spirits.jpg",
      imageAlt:
        "A forest creature watches glowing spirits — illustration by Cormac McCann",
      jsonLd: collectionLd(
        "Illustrations — Just for fun",
        description,
        "/illustrations",
      ),
    }),
  component: Illustrations,
});
