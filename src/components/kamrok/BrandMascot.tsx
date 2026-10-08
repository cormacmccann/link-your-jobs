import { useStudioTheme } from "@/hooks/useStudioTheme";
import "@/styles/brand-stories.css";
export default function BrandMascot({ pose = "side", className = "" }: { pose?: "side" | "front"; className?: string }) {
  const { theme } = useStudioTheme();
  return <img className={`brand-mascot ${className}`} src={`/art/brand/chimp-${pose}-${theme}.webp`} alt="" aria-hidden="true" loading="lazy" decoding="async" width="1254" height="1254" />;
}
