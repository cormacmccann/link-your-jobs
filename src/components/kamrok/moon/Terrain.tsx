import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

// Procedural displaced moon plane with PBR ground textures.
export default function Terrain({ size = 600, segments = 200 }: { size?: number; segments?: number }) {
  const [colorMap, normalMap, roughMap] = useTexture([
    MOON_ASSETS.groundColor,
    MOON_ASSETS.groundNormal,
    MOON_ASSETS.groundRough,
  ]);

  useMemo(() => {
    [colorMap, normalMap, roughMap].forEach((t) => {
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(40, 40);
      t.anisotropy = 8;
    });
    colorMap.colorSpace = THREE.SRGBColorSpace;
  }, [colorMap, normalMap, roughMap]);

  const geom = useMemo(() => {
    const g = new THREE.PlaneGeometry(size, size, segments, segments);
    g.rotateX(-Math.PI / 2);
    const pos = g.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const h =
        Math.sin(x * 0.05) * Math.cos(z * 0.04) * 1.6 +
        Math.sin(x * 0.13 + 1.3) * 0.8 +
        Math.cos(z * 0.17 - 0.4) * 0.7 +
        Math.sin((x + z) * 0.03) * 1.2;
      const r = Math.sqrt(x * x + z * z);
      const flatten = Math.max(0, 1 - Math.exp((-r * r) / 600));
      pos.setY(i, h * flatten);
    }
    g.computeVertexNormals();
    return g;
  }, [size, segments]);

  return (
    <mesh geometry={geom} receiveShadow>
      <meshStandardMaterial
        map={colorMap}
        normalMap={normalMap}
        roughnessMap={roughMap}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
