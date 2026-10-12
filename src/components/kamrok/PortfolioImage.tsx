import type { ComponentProps } from "react";
import { portfolioImages } from "@/assets/responsive/portfolioImages";
import ResponsiveImage from "./ResponsiveImage";

export default function PortfolioImage({
  src,
  ...props
}: ComponentProps<"img"> & { src: string }) {
  const variants = portfolioImages[src as keyof typeof portfolioImages];
  return variants ? (
    <ResponsiveImage {...props} variants={variants} />
  ) : (
    <img {...props} src={src} />
  );
}
