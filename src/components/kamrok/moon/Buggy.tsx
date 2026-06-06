import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

useGLTF.preload(MOON_ASSETS.chimp);

type Keys = { f: boolean; b: boolean; l: boolean; r: boolean };

export default function Buggy({
  onPosition,
  onSpeed,
}: {
  onPosition?: (pos: THREE.Vector3, heading: number) => void;
  onSpeed?: (speed: number) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const keys = useRef<Keys>({ f: false, b: false, l: false, r: false });
  const speed = useRef(0);
  const heading = useRef(0);
  const { camera } = useThree();
  const chimp = useGLTF(MOON_ASSETS.chimp);

  const chimpScene = useMemo(() => {
    const c = chimp.scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).castShadow = true;
        (o as THREE.Mesh).receiveShadow = true;
      }
    });
    return c;
  }, [chimp.scene]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "arrowup") keys.current.f = true;
      if (k === "s" || k === "arrowdown") keys.current.b = true;
      if (k === "a" || k === "arrowleft") keys.current.l = true;
      if (k === "d" || k === "arrowright") keys.current.r = true;
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "w" || k === "arrowup") keys.current.f = false;
      if (k === "s" || k === "arrowdown") keys.current.b = false;
      if (k === "a" || k === "arrowleft") keys.current.l = false;
      if (k === "d" || k === "arrowright") keys.current.r = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, dt) => {
    const k = keys.current;
    const accel = k.f ? 18 : k.b ? -12 : 0;
    speed.current += accel * dt;
    speed.current *= 1 - Math.min(1, dt * (accel === 0 ? 1.6 : 0.3));
    speed.current = THREE.MathUtils.clamp(speed.current, -14, 28);

    const steer = (k.l ? 1 : 0) - (k.r ? 1 : 0);
    heading.current += steer * dt * 1.6 * Math.min(1, Math.abs(speed.current) / 4);

    const g = group.current;
    g.position.x += Math.sin(heading.current) * speed.current * dt;
    g.position.z += Math.cos(heading.current) * speed.current * dt;
    g.rotation.y = heading.current;

    // Isometric follow: fixed-angle camera that tracks position only (no rotation with heading)
    const camTarget = new THREE.Vector3(
      g.position.x + 60,
      g.position.y + 60,
      g.position.z + 60
    );
    camera.position.lerp(camTarget, Math.min(1, dt * 4));
    camera.lookAt(g.position.x, g.position.y + 1.2, g.position.z);

    onPosition?.(g.position, heading.current);
    onSpeed?.(Math.abs(speed.current));
  });

  return (
    <group ref={group} position={[0, 0.6, 0]}>
      {/* chassis */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2, 0.4, 3]} />
        <meshStandardMaterial color="#1b1830" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* roll cage glow */}
      <mesh position={[0, 1, -0.4]} castShadow>
        <boxGeometry args={[1.6, 0.9, 1.2]} />
        <meshStandardMaterial color="#8b7dff" emissive="#4ea8ff" emissiveIntensity={0.25} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* chimp pilot */}
      <primitive object={chimpScene} position={[0, 0.9, 0.2]} scale={0.6} rotation={[0, Math.PI, 0]} />
      {/* wheels */}
      {[
        [-1.1, 0, 1.1],
        [1.1, 0, 1.1],
        [-1.1, 0, -1.1],
        [1.1, 0, -1.1],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 18]} />
          <meshStandardMaterial color="#111" roughness={0.9} />
        </mesh>
      ))}
      {/* headlights */}
      <pointLight position={[0, 0.6, 1.6]} intensity={1.2} distance={18} color="#cfe3ff" />
    </group>
  );
}
