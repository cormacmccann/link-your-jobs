import { Suspense, lazy, useEffect, useState } from "react";
import MoonBoundary from "@/components/kamrok/moon/MoonBoundary";
import SpaceLoadingOverlay from "./SpaceLoadingOverlay";
import * as THREE from "three";

// Lazy: ~3.4MB of audio/geometry only downloads when the user actually reaches orbit.
const Game = lazy(() => import("./App"));

const exitBtn: React.CSSProperties = {
  position: "fixed",
  top: 18,
  left: 18,
  zIndex: 63,
  padding: "8px 14px",
  borderRadius: 24,
  border: "1px solid rgba(200,184,255,0.4)",
  background: "rgba(8,7,20,0.6)",
  color: "#ece8ff",
  fontFamily: "ui-monospace, 'JetBrains Mono', SFMono-Regular, monospace",
  fontSize: 11,
  letterSpacing: ".22em",
  cursor: "pointer",
  pointerEvents: "auto",
};

/**
 * Hide the loading overlay once THREE's DefaultLoadingManager has finished
 * its first batch of loads (GLBs, textures). If nothing ever loads we still
 * release after a short safety timeout so the player can't get stuck behind it.
 */
function useAssetWarmup() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const mgr = THREE.DefaultLoadingManager;
    let started = false;
    let safety: ReturnType<typeof setTimeout>;
    const prevStart = mgr.onStart;
    const prevLoad = mgr.onLoad;
    mgr.onStart = (...args) => {
      started = true;
      prevStart?.(...args);
    };
    mgr.onLoad = () => {
      prevLoad?.();
      // Small grace so the bar visually completes before fade.
      setTimeout(() => setReady(true), 250);
    };
    // Safety: if no loaders ever fire (e.g. everything cached), reveal after 2.5s.
    safety = setTimeout(() => {
      if (!started) setReady(true);
    }, 2500);
    return () => {
      mgr.onStart = prevStart;
      mgr.onLoad = prevLoad;
      clearTimeout(safety);
    };
  }, []);
  return ready;
}

function GameWithGate() {
  const ready = useAssetWarmup();
  return (
    <>
      <Game />
      {!ready && <SpaceLoadingOverlay />}
    </>
  );
}

export default function KamrokSpaceGame({ onExit }: { onExit: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "#05030f" }}>
      <MoonBoundary
        label="space-game"
        fallback={
          <button type="button" onClick={onExit} style={exitBtn}>
            ← RETURN TO THE MOON
          </button>
        }
      >
        <Suspense fallback={<SpaceLoadingOverlay />}>
          <GameWithGate />
        </Suspense>
      </MoonBoundary>
      <button type="button" onClick={onExit} style={exitBtn} aria-label="Exit to moon">
        ← MOON
      </button>
    </div>
  );
}
