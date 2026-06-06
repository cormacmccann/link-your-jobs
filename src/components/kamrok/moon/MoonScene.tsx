import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useCallback, useRef, useState } from "react";
import * as THREE from "three";
import Terrain from "./Terrain";
import Buggy from "./Buggy";
import Monuments, { MONUMENTS, type MonumentKey } from "./Monuments";
import Rocks from "./Rocks";
import Ship from "./Ship";
import HUD from "./HUD";
import MonumentPanel from "./MonumentPanel";
import MoonAudio from "./Audio";

const PROXIMITY = 12;

export default function MoonScene() {
  const [near, setNear] = useState<MonumentKey | null>(null);
  const [openPanel, setOpenPanel] = useState<MonumentKey | null>(null);
  const [music, setMusic] = useState(false);
  const [sound, setSound] = useState(false);
  const [speed, setSpeed] = useState(0);
  const lastNearRef = useRef<MonumentKey | null>(null);

  const handlePos = useCallback((pos: THREE.Vector3) => {
    let found: MonumentKey | null = null;
    for (const m of MONUMENTS) {
      const dx = pos.x - m.pos[0];
      const dz = pos.z - m.pos[2];
      if (Math.hypot(dx, dz) < PROXIMITY) {
        found = m.key;
        break;
      }
    }
    if (found !== lastNearRef.current) {
      lastNearRef.current = found;
      setNear(found);
      if (found) setOpenPanel(found);
    }
  }, []);

  return (
    <div className="moon-stage">
      <Canvas
        shadows
        orthographic
        camera={{ position: [60, 60, 60], zoom: 38, near: 0.1, far: 2000 }}
        gl={{ antialias: true }}
        dpr={[1, 1.8]}
      >
        <color attach="background" args={["#05030f"]} />
        <fog attach="fog" args={["#0a0820", 60, 380]} />

        <ambientLight intensity={0.25} color="#9890ff" />
        <directionalLight
          position={[40, 60, 20]}
          intensity={1.4}
          color="#dcd6ff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <hemisphereLight args={["#b0a8ff", "#1a1233", 0.4]} />

        <Suspense fallback={null}>
          <Stars radius={400} depth={120} count={6000} factor={4} fade speed={0.5} />
          <Terrain />
          <Rocks />
          <Monuments />
          <Ship />
          <Buggy onPosition={handlePos} onSpeed={setSpeed} />
        </Suspense>
      </Canvas>

      <MoonAudio music={music} sound={sound} speed={speed} />
      <HUD
        near={near}
        onJump={(k) => setOpenPanel(k)}
        music={music}
        sound={sound}
        onToggleMusic={() => setMusic((v) => !v)}
        onToggleSound={() => setSound((v) => !v)}
      />
      {openPanel && <MonumentPanel monument={openPanel} onClose={() => setOpenPanel(null)} />}
    </div>
  );
}
