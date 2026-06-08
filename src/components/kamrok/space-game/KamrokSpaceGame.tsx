import { Suspense, lazy } from "react";
import MoonBoundary from "@/components/kamrok/moon/MoonBoundary";

// Lazy: ~3.4MB of audio/geometry only downloads when the user actually reaches orbit.
const Game = lazy(() => import("./App"));

const exitBtn: React.CSSProperties = {
  position: "fixed",
  top: 18,
  left: 18,
  zIndex: 61,
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
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </MoonBoundary>
      <button type="button" onClick={onExit} style={exitBtn} aria-label="Exit to moon">
        ← MOON
      </button>
    </div>
  );
}
