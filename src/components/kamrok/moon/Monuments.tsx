import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type MonumentKey = "about" | "work" | "skills" | "contact";

export const MONUMENTS: { key: MonumentKey; label: string; pos: [number, number, number]; color: string }[] = [
  { key: "about", label: "ABOUT", pos: [0, 0, -55], color: "#8b7dff" },
  { key: "work", label: "WORK", pos: [55, 0, 0], color: "#4ea8ff" },
  { key: "skills", label: "SKILLS", pos: [0, 0, 55], color: "#c4a3ff" },
  { key: "contact", label: "CONTACT", pos: [-55, 0, 0], color: "#7be7ff" },
];

function Monument({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.2;
  });
  return (
    <group position={position}>
      <mesh ref={ref} castShadow position={[0, 5, 0]}>
        <coneGeometry args={[2, 10, 4]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.5} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 6, 0]} intensity={2} distance={30} color={color} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[6, 6.4, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function Monuments() {
  return (
    <>
      {MONUMENTS.map((m) => (
        <Monument key={m.key} position={m.pos} color={m.color} />
      ))}
    </>
  );
}
