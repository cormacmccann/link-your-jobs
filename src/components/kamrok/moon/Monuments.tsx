import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

useGLTF.preload(MOON_ASSETS.platform);
useGLTF.preload(MOON_ASSETS.termL);
useGLTF.preload(MOON_ASSETS.termS);
useGLTF.preload(MOON_ASSETS.alienIdle);
useGLTF.preload(MOON_ASSETS.alienWave);

export type MonumentKey = "about" | "work" | "skills" | "contact";

export const MONUMENTS: {
  key: MonumentKey;
  label: string;
  pos: [number, number, number];
  color: string;
  term: "L" | "S";
}[] = [
  { key: "about", label: "ABOUT", pos: [0, 0, -55], color: "#8b7dff", term: "L" },
  { key: "work", label: "WORK", pos: [55, 0, 0], color: "#4ea8ff", term: "L" },
  { key: "skills", label: "SKILLS", pos: [0, 0, 55], color: "#c4a3ff", term: "S" },
  { key: "contact", label: "CONTACT", pos: [-55, 0, 0], color: "#7be7ff", term: "S" },
];

function Alien({ url, position, rotation }: { url: string; position: [number, number, number]; rotation: number }) {
  const gltf = useGLTF(url);
  const group = useRef<THREE.Group>(null!);
  const cloned = useMemo(() => {
    const c = gltf.scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).castShadow = true;
      }
    });
    return c;
  }, [gltf.scene]);
  const { actions, names } = useAnimations(gltf.animations, group);
  useMemo(() => {
    if (names[0] && actions[names[0]]) actions[names[0]]!.reset().play();
  }, [actions, names]);
  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]}>
      <primitive object={cloned} />
    </group>
  );
}

function Monument({
  position,
  color,
  term,
  monumentIndex,
}: {
  position: [number, number, number];
  color: string;
  term: "L" | "S";
  monumentIndex: number;
}) {
  const platform = useGLTF(MOON_ASSETS.platform);
  const termGlb = useGLTF(term === "L" ? MOON_ASSETS.termL : MOON_ASSETS.termS);
  const ringRef = useRef<THREE.Mesh>(null!);

  const platformClone = useMemo(() => {
    const c = platform.scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        (o as THREE.Mesh).receiveShadow = true;
        (o as THREE.Mesh).castShadow = true;
      }
    });
    return c;
  }, [platform.scene]);

  const termClone = useMemo(() => {
    const c = termGlb.scene.clone(true);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (m && "emissive" in m) {
          m.emissive = new THREE.Color(color);
          m.emissiveIntensity = 0.4;
        }
        (o as THREE.Mesh).castShadow = true;
      }
    });
    return c;
  }, [termGlb.scene, color]);

  useFrame((s) => {
    if (ringRef.current) {
      const pulse = 0.5 + Math.sin(s.clock.elapsedTime * 1.5 + monumentIndex) * 0.25;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
    }
  });

  const alienUrl = monumentIndex % 2 === 0 ? MOON_ASSETS.alienIdle : MOON_ASSETS.alienWave;

  return (
    <group position={position}>
      <primitive object={platformClone} scale={2.4} />
      <primitive object={termClone} position={[0, 1.2, 0]} scale={2} />
      <Alien url={alienUrl} position={[2.5, 1.2, 0.5]} rotation={Math.PI * 0.9} />
      <pointLight position={[0, 6, 0]} intensity={2.4} distance={36} color={color} />
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <ringGeometry args={[8, 8.6, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Monuments() {
  return (
    <>
      {MONUMENTS.map((m, i) => (
        <Monument key={m.key} position={m.pos} color={m.color} term={m.term} monumentIndex={i} />
      ))}
    </>
  );
}
