import { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

useGLTF.preload(MOON_ASSETS.rock4);
useGLTF.preload(MOON_ASSETS.rock7);

export default function Rocks({ count = 90 }: { count?: number }) {
  const rock4 = useGLTF(MOON_ASSETS.rock4);
  const rock7 = useGLTF(MOON_ASSETS.rock7);
  const [colorMap, normalMap] = useTexture([MOON_ASSETS.rockColor, MOON_ASSETS.rockNormal]);
  colorMap.colorSpace = THREE.SRGBColorSpace;

  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: colorMap,
        normalMap,
        roughness: 1,
        metalness: 0,
      }),
    [colorMap, normalMap]
  );

  const rocks = useMemo(() => {
    const out: { node: THREE.Object3D; pos: [number, number, number]; scale: number; rot: number }[] = [];
    let seed = 7;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < count; i++) {
      const r = 30 + rnd() * 220;
      const a = rnd() * Math.PI * 2;
      const src = rnd() > 0.5 ? rock4.scene : rock7.scene;
      const node = src.clone(true);
      node.traverse((o) => {
        if ((o as THREE.Mesh).isMesh) {
          (o as THREE.Mesh).material = mat;
          (o as THREE.Mesh).castShadow = true;
          (o as THREE.Mesh).receiveShadow = true;
        }
      });
      out.push({
        node,
        pos: [Math.sin(a) * r, 0, Math.cos(a) * r],
        scale: 0.8 + rnd() * 2.4,
        rot: rnd() * Math.PI * 2,
      });
    }
    return out;
  }, [count, rock4.scene, rock7.scene, mat]);

  return (
    <group>
      {rocks.map((r, i) => (
        <primitive key={i} object={r.node} position={r.pos} rotation={[0, r.rot, 0]} scale={r.scale} />
      ))}
    </group>
  );
}
