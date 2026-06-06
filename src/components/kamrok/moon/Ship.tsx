import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

useGLTF.preload(MOON_ASSETS.ship);

export default function Ship({ position = [30, 22, -30] as [number, number, number] }) {
  const ship = useGLTF(MOON_ASSETS.ship);
  const ref = useRef<THREE.Group>(null!);
  const cloned = useMemo(() => {
    const c = ship.scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true;
    });
    return c;
  }, [ship.scene]);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.6;
    ref.current.rotation.y = t * 0.15;
  });
  return (
    <group ref={ref} position={position} scale={1.4}>
      <primitive object={cloned} />
      <pointLight position={[0, -1, 0]} intensity={1.6} distance={20} color="#7be7ff" />
    </group>
  );
}
