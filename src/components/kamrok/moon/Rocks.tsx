import { useMemo } from "react";
import * as THREE from "three";

export default function Rocks({ count = 80 }: { count?: number }) {
  const rocks = useMemo(() => {
    const out: { pos: [number, number, number]; scale: number; rot: number }[] = [];
    let seed = 1;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const r = 30 + rnd() * 220;
      const a = rnd() * Math.PI * 2;
      out.push({
        pos: [Math.sin(a) * r, 0, Math.cos(a) * r],
        scale: 1 + rnd() * 3,
        rot: rnd() * Math.PI,
      });
    }
    return out;
  }, [count]);

  return (
    <group>
      {rocks.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={[0, r.rot, 0]} scale={r.scale} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#6c6585" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}
