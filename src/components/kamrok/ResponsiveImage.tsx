import type { ComponentProps } from "react";

export type ImageVariant = { src: string; width: number };

/** The browser chooses before downloading; no client viewport check or duplicate image. */
export default function ResponsiveImage({
  variants,
  mobileMax = 840,
  sizes = "(max-width: 760px) 92vw, 90vw",
  ...props
}: Omit<ComponentProps<"img">, "src" | "srcSet"> & {
  variants: ImageVariant[];
  mobileMax?: number;
}) {
  const mobile = variants.filter((variant) => variant.width <= mobileMax);
  const fallback =
    variants.find((variant) => variant.width >= 840) ?? variants.at(-1)!;
  const srcSet = (items: ImageVariant[]) =>
    items.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
  return (
    <picture style={{ display: "contents" }}>
      <source
        media="(max-width: 760px)"
        srcSet={srcSet(mobile.length ? mobile : [variants[0]!])}
        sizes={sizes}
      />
      <img
        {...props}
        src={fallback.src}
        srcSet={srcSet(variants)}
        sizes={sizes}
      />
    </picture>
  );
}
