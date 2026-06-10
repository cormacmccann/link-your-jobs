import { lazy, Suspense, useEffect, useState } from "react";
import { startMoonExperience } from "./moonEngine";
import { MOON_MARKUP } from "./moonMarkup";
import KamrokNav from "@/components/kamrok/KamrokNav";
import SatelliteFlyby from "./SatelliteFlyby";
import MoonBoundary from "./MoonBoundary";
import moonCss from "@/styles/kamrok-moon.css?inline";

// Desktop-only — the pmndrs game is a second WebGL canvas with bloom, which
// blows past mobile context limits and would regress the mobile fix.
const KamrokSpaceGame = lazy(() => import("@/components/kamrok/space-game/KamrokSpaceGame"));

export default function MoonExperience() {
  const [isDesktop] = useState(
    () => typeof window !== "undefined" && !window.matchMedia("(max-width: 767px)").matches
  );
  const [inSpace, setInSpace] = useState(false);

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-kamrok-moon", "");
    styleEl.textContent = moonCss;
    document.head.appendChild(styleEl);

    // Phones: don't download the 3.7MB hero video on mobile data — the intro's
    // gradient + logo carry it. (Desktop keeps the full cinematic.)
    if (window.matchMedia("(max-width: 767px)").matches) {
      document.querySelectorAll(".moon-root video.hero-vid").forEach((v) => v.remove());
    }

    let stop: () => void = () => {};
    try {
      stop = startMoonExperience();
    } catch (e) {
      console.error("MoonExperience failed to start", e);
    }

    return () => {
      try { stop(); } catch (e) { /* noop */ }
      styleEl.remove();
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const enter = () => setInSpace(true);
    const exit = () => setInSpace(false);
    window.addEventListener("kamrok:enter-space", enter);
    window.addEventListener("kamrok:exit-space", exit);

    // Cheat code: type "gotowar" anywhere to launch the space world.
    const CODE = "gotowar";
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key.length !== 1) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-CODE.length);
      if (buffer === CODE) {
        buffer = "";
        window.dispatchEvent(new CustomEvent("kamrok:enter-space"));
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("kamrok:enter-space", enter);
      window.removeEventListener("kamrok:exit-space", exit);
      window.removeEventListener("keydown", onKey);
    };
  }, [isDesktop]);

  const handleExit = () => {
    // The engine exposes this — it resumes drive mode and fires kamrok:exit-space.
    try { (window as any).__kamrokExitSpace?.(); } catch (e) { /* noop */ }
    setInSpace(false);
  };

  return (
    <>
      <div className="moon-root" dangerouslySetInnerHTML={{ __html: MOON_MARKUP }} />
      <KamrokNav onMoon />
      {isDesktop && !inSpace && (
        <MoonBoundary fallback={null} label="satellite">
          <SatelliteFlyby />
        </MoonBoundary>
      )}
      {isDesktop && inSpace && (
        <Suspense fallback={null}>
          <KamrokSpaceGame onExit={handleExit} />
        </Suspense>
      )}
    </>
  );
}
