import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import satelliteAsset from "@/assets/moon/satellite.glb.asset.json";

useGLTF.preload(satelliteAsset.url);

function Satellite({ onDone }: { onDone: () => void }) {
  const { scene } = useGLTF(satelliteAsset.url);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const s = 2.2 / Math.max(0.001, Math.max(size.x, size.y, size.z));
    c.scale.setScalar(s);
    const center = box.getCenter(new THREE.Vector3());
    c.position.set(-center.x * s, -center.y * s, -center.z * s);
    return c;
  }, [scene]);

  const group = useRef<THREE.Group>(null!);
  const t0 = useRef<number>(performance.now());
  // Randomise: direction (L->R or R->L), vertical band, slight tilt
  const params = useMemo(() => {
    const dir = Math.random() < 0.5 ? 1 : -1;
    const yBand = (Math.random() - 0.5) * 2.4; // -1.2..1.2
    const speed = 0.045 + Math.random() * 0.025; // x units per frame-ish
    const duration = 18000 + Math.random() * 6000;
    return { dir, yBand, speed, duration };
  }, []);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const elapsed = performance.now() - t0.current;
    const p = Math.min(1, elapsed / params.duration);
    // travel from -8 to 8 (or reverse)
    const x = (-1 * params.dir) * 8 + params.dir * 16 * p;
    g.position.x = x;
    g.position.y = params.yBand + Math.sin(elapsed * 0.0012) * 0.25;
    g.rotation.y += delta * 0.6;
    g.rotation.z = Math.sin(elapsed * 0.0009) * 0.12;
    if (p >= 1) onDone();
  });

  return (
    <group ref={group}>
      <primitive object={obj} />
      <pointLight color="#9fd6ff" intensity={2} distance={6} />
    </group>
  );
}

export default function SatelliteFlyby() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // First flyby appears soon after mount so it's actually visible
    const firstDelay = 4000 + Math.random() * 6000; // 4–10s
    const id = window.setTimeout(() => {
      if (!cancelled) setVisible(true);
    }, firstDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  // After a flyby ends, schedule the next one
  const handleDone = () => {
    setVisible(false);
    const delay = 45000 + Math.random() * 60000; // 45–105s between flybys
    window.setTimeout(() => setVisible(true), delay);
  };

  if (!visible) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 40,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", pointerEvents: "none" }}
        {...(typeof document !== "undefined" ? { eventSource: document.body } : {})}
        eventPrefix="client"
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 5, 4]} intensity={1.1} />
        <Suspense fallback={null}>
          <Satellite onDone={handleDone} />
        </Suspense>
      </Canvas>
    </div>
  );
}
