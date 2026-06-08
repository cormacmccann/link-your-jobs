import { Suspense, useMemo, useState, Component, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Float, ContactShadows } from "@react-three/drei";
import { KTX2Loader, MeshoptDecoder } from "three-stdlib";
import * as THREE from "three";
import { MOON_ASSETS } from "@/config/moonAssets";

// Shared decoders for the optimised (meshopt + KTX2) GLBs.
const ktx2 = new KTX2Loader().setTranscoderPath("https://unpkg.com/three@0.160.0/examples/jsm/libs/basis/");
const extendGltfLoader = (loader: any) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
  loader.setKTX2Loader(ktx2);
};

export type SkillIcon = {
  key: string;
  name: string;
  kicker: string;
  color: string;
  url: string;
};

export const SKILL_ICONS: SkillIcon[] = [
  { key: "react", name: "React", kicker: "WEB DESIGN", color: "#61dafb", url: MOON_ASSETS.react },
  { key: "wordpress", name: "WordPress", kicker: "CMS", color: "#2aa7d0", url: MOON_ASSETS.wordpress },
  { key: "google", name: "Google", kicker: "GROWTH", color: "#4285f4", url: MOON_ASSETS.google },
  { key: "starburst", name: "Claude", kicker: "AI DEV", color: "#ff8a3c", url: MOON_ASSETS.starburst },
  { key: "heart", name: "Lovable", kicker: "AI APPS", color: "#ff4d6d", url: MOON_ASSETS.heart },
];

SKILL_ICONS.forEach((s) => useGLTF.preload(s.url, true, true, extendGltfLoader));

// If a model fails to load (e.g. CDN unreachable), render nothing instead of
// crashing the whole canvas — the glowing centre still shows.
class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function Model({ url }: { url: string }) {
  const gl = useThree((s) => s.gl);
  try { ktx2.detectSupport(gl); } catch (e) { /* noop */ }
  const { scene } = useGLTF(url, true, true, extendGltfLoader);
  const obj = useMemo(() => {
    const c = scene.clone(true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const s = 2 / Math.max(0.001, Math.max(size.x, size.y, size.z));
    c.scale.setScalar(s);
    c.position.set(-center.x * s, -center.y * s, -center.z * s);
    c.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) (o as THREE.Mesh).castShadow = true;
    });
    return c;
  }, [scene]);
  return <primitive object={obj} />;
}

function Icon({
  icon,
  x,
  active,
  onSelect,
}: {
  icon: SkillIcon;
  x: number;
  active: boolean;
  onSelect: (k: string) => void;
}) {
  const [hover, setHover] = useState(false);
  const lit = hover || active;
  return (
    <group position={[x, 0, 0]}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.1}>
        <group
          scale={lit ? 1.18 : 1}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(icon.key);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = "auto";
          }}
        >
          <ModelBoundary>
            <Suspense fallback={null}>
              <Model url={icon.url} />
            </Suspense>
          </ModelBoundary>
          <pointLight color={icon.color} intensity={lit ? 4 : 1.8} distance={5} />
          {/* glowing centre */}
          <mesh>
            <sphereGeometry args={[0.32, 16, 16]} />
            <meshBasicMaterial color={icon.color} transparent opacity={lit ? 0.7 : 0.4} />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function SkillsShowcase({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (k: string) => void;
}) {
  const gap = 2.0;
  return (
    <div className="kk-showcase">
      <Canvas camera={{ position: [0, 0.4, 11], fov: 44 }} dpr={[1, 1.6]} gl={{ antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 6]} intensity={1.1} />
        <Suspense fallback={null}>
          {SKILL_ICONS.map((ic, i) => (
            <Icon
              key={ic.key}
              icon={ic}
              x={(i - (SKILL_ICONS.length - 1) / 2) * gap}
              active={active === ic.key}
              onSelect={onSelect}
            />
          ))}
          <ContactShadows position={[0, -1.7, 0]} opacity={0.35} scale={14} blur={2.6} far={3} />
        </Suspense>
      </Canvas>
      <div className="kk-showcase__hint">Tap an icon · drag the buggy into them on the moon</div>
    </div>
  );
}
