import { useEffect, useState } from "react";
import * as THREE from "three";

/**
 * Loading overlay shown while the pmndrs space-game lazy chunk + its
 * ~3.4MB of GLB/audio assets download. Hooks into THREE.DefaultLoadingManager
 * for real progress on geometry/textures, and uses a soft animated fallback
 * so the user always sees motion even before the manager starts ticking.
 */
export default function SpaceLoadingOverlay() {
  const [pct, setPct] = useState(0);
  const [phase, setPhase] = useState("BOOTING NAV COMPUTER");

  useEffect(() => {
    const mgr = THREE.DefaultLoadingManager;
    const prevStart = mgr.onStart;
    const prevProgress = mgr.onProgress;
    const prevLoad = mgr.onLoad;

    mgr.onStart = (url, loaded, total) => {
      setPhase("STREAMING ASSETS");
      setPct(Math.round((loaded / Math.max(total, 1)) * 100));
    };
    mgr.onProgress = (url, loaded, total) => {
      setPct(Math.round((loaded / Math.max(total, 1)) * 100));
    };
    mgr.onLoad = () => {
      setPct(100);
      setPhase("ENGAGING DRIVE");
    };

    // Soft baseline animation: creeps up to 92% so the bar always moves even
    // before THREE starts reporting, then real progress takes over.
    let raf = 0;
    let v = 0;
    const tick = () => {
      v = Math.min(92, v + 0.6);
      setPct((p) => (p < v ? Math.round(v) : p));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mgr.onStart = prevStart;
      mgr.onProgress = prevProgress;
      mgr.onLoad = prevLoad;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 62,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        background:
          "radial-gradient(ellipse at center, rgba(60,20,90,0.55), rgba(5,3,15,0.98) 70%)",
        color: "#ece8ff",
        fontFamily: "ui-monospace, 'JetBrains Mono', SFMono-Regular, monospace",
        pointerEvents: "auto",
      }}
      aria-live="polite"
      role="status"
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: ".42em",
          color: "rgba(236,232,255,0.55)",
        }}
      >
        KAMROK · ORBITAL HANDOFF
      </div>
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic",
          fontSize: 26,
          color: "#ff7ad9",
          textShadow: "0 0 24px rgba(255,122,217,0.55)",
        }}
      >
        {phase}…
      </div>
      <div
        style={{
          width: 320,
          maxWidth: "70vw",
          height: 4,
          borderRadius: 4,
          background: "rgba(200,184,255,0.12)",
          overflow: "hidden",
          border: "1px solid rgba(200,184,255,0.18)",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background:
              "linear-gradient(90deg,#7c5cff 0%,#ff3d9a 60%,#ff7ad9 100%)",
            boxShadow: "0 0 14px rgba(255,61,154,0.7)",
            transition: "width 220ms ease-out",
          }}
        />
      </div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: ".3em",
          color: "rgba(236,232,255,0.6)",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}
