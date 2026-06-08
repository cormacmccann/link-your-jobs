import { useEffect, useState } from "react";
import { startMoonExperience } from "./moonEngine";
import { MOON_MARKUP } from "./moonMarkup";
import KamrokNav from "@/components/kamrok/KamrokNav";
import SatelliteFlyby from "./SatelliteFlyby";
import MoonBoundary from "./MoonBoundary";
// imported as a string so the moonscape styling is scoped to this page only
// (injected on mount, removed on unmount) instead of leaking into other routes.
import moonCss from "@/styles/kamrok-moon.css?inline";

/**
 * The KAMROK interactive moon portfolio — a faithful port of the original
 * self-contained three.js experience (public/index-kamrok.html), mounted as a
 * React component. Assets stream from the Lovable CDN via MOON_ASSETS.
 */
export default function MoonExperience() {
  // The flyby is a SECOND WebGL canvas. Mobile GPUs cap concurrent contexts, so
  // on phones it loses context and crashes — skip it there (the moon itself is
  // one canvas and runs fine). Computed once on mount.
  const [showFlyby] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(max-width: 767px)").matches
  );

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-kamrok-moon", "");
    styleEl.textContent = moonCss;
    document.head.appendChild(styleEl);

    let stop: () => void = () => {};
    try {
      stop = startMoonExperience();
    } catch (e) {
      console.error("MoonExperience failed to start", e);
    }

    return () => {
      try {
        stop();
      } catch (e) {
        /* noop */
      }
      styleEl.remove();
    };
  }, []);

  return (
    <>
      <div className="moon-root" dangerouslySetInnerHTML={{ __html: MOON_MARKUP }} />
      <KamrokNav onMoon />
      {showFlyby && (
        <MoonBoundary fallback={null} label="satellite">
          <SatelliteFlyby />
        </MoonBoundary>
      )}
    </>
  );
}
