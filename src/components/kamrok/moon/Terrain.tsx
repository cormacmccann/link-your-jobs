import { useMemo } from "react";
import * as THREE from "three";

// Procedural displaced moon plane (placeholder until /assets PBR maps arrive).
export default function Terrain({ size = 600, segments = 200 }: { size?: number; segments?: number }) {
  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, segments, segments);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    // simple value-noise via sin/cos sums
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h =
        Math.sin(x * 0.05) * Math.cos(z * 0.04) * 1.6 +
        Math.sin(x * 0.13 + 1.3) * 0.8 +
        Math.cos(z * 0.17 - 0.4) * 0.7 +
        Math.sin((x + z) * 0.03) * 1.2;
      // flatten near origin for spawn area
      const r = Math.sqrt(x * x + z * z);
      const flatten = Math.max(0, 1 - Math.exp(-r * r / 600));
      pos.setY(i, h * flatten);
    }
    g.computeVertexNormals();
    return g;
  }, [size, segments]);

  return (
    <mesh geometry={geom} receiveShadow>
      <meshStandardMaterial color="#8a82a3" roughness={1} metalness={0} />
    </mesh>
  );
}
