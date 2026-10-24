import type { ComponentProps } from "react";
import { portfolioImages } from "@/assets/responsive/portfolioImages";
import ResponsiveImage from "./ResponsiveImage";
import { epsoImages } from "@/assets/epso/images";
import { imacImages } from "@/assets/mockups/images";

export default function PortfolioImage({
  src,
  ...props
}: ComponentProps<"img"> & { src: string }) {
  const epso = epsoImages[src as keyof typeof epsoImages];
  const variants = imacImages[src as keyof typeof imacImages] ?? epso ?? portfolioImages[src as keyof typeof portfolioImages];
  return variants ? (
    <ResponsiveImage
      {...props}
      variants={variants}
      mobileMax={epso ? 480 : 840}
    />
  ) : (
    <img {...props} src={src} />
  );
}
