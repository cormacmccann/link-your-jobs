import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Box3, Vector3 } from "three";
import chimpAsset from "@/assets/moon/chimp.glb.asset.json";

function Chimp() {
  const { scene } = useGLTF(chimpAsset.url);
  const chimp = useMemo(() => {
    const clone = scene.clone(true);
    const box = new Box3().setFromObject(clone);
    const size = box.getSize(new Vector3());
    const centre = box.getCenter(new Vector3());
    const scale = 3.1 / Math.max(size.y, 0.001);
    clone.scale.setScalar(scale);
    clone.position.set(-centre.x * scale, 1.05 - box.min.y * scale, .15 - centre.z * scale);
    return clone;
  }, [scene]);
  return <group rotation={[0, .52, 0]}><primitive object={chimp} /></group>;
}
function Rover() {
  return <group position={[0, -1.5, 0]}>
    <mesh position={[0, 1.1, 0]}><boxGeometry args={[2.4, .35, 3.8]} /><meshStandardMaterial color="#84939c" metalness={.7} roughness={.35} /></mesh>
    <mesh position={[0, 1.3, .1]}><boxGeometry args={[2, .12, 2.4]} /><meshStandardMaterial color="#28323e" /></mesh>
    <mesh position={[0, 1.55, .35]}><boxGeometry args={[1.2, .45, 1]} /><meshStandardMaterial color="#171926" /></mesh>
    <mesh position={[0, 1.55, -1.4]}><boxGeometry args={[1.8, .7, .8]} /><meshStandardMaterial color="#5f727b" metalness={.6} roughness={.4} /></mesh>
    {[-1.3, 1.3].flatMap(x => [-1.3, 1.3].map(z => <group key={`${x}-${z}`} position={[x, .74, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh><cylinderGeometry args={[.74, .74, .56, 24]} /><meshStandardMaterial color="#14151b" roughness={.9} /></mesh>
      <mesh><cylinderGeometry args={[.36, .36, .58, 16]} /><meshStandardMaterial color="#a4b4b9" metalness={.8} roughness={.3} /></mesh>
    </group>))}
    {[-.7, .7].map(x => <mesh key={x} position={[x, 1.25, 1.94]}><boxGeometry args={[.4, .2, .15]} /><meshStandardMaterial color="#94f5d4" emissive="#94f5d4" emissiveIntensity={2} /></mesh>)}
    <Suspense fallback={null}><Chimp /></Suspense>
  </group>;
}
class PreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static override getDerivedStateFromError() { return { failed: true }; }
  override render() { return this.state.failed ? <p className="fun-preview-fallback">Your moon buggy is waiting. Open the 3D playground below.</p> : this.props.children; }
}
export default function FunRoverPreview() {
  return <PreviewBoundary><Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [6, 3, 7], fov: 42 }} aria-label="3D chimp on a moon buggy. Drag to rotate the view.">
    <ambientLight intensity={1.6} /><directionalLight position={[3, 5, 5]} intensity={3} /><directionalLight position={[-4, 2, -2]} color="#ce74ff" intensity={3} />
    <Rover /><OrbitControls target={[0, .7, 0]} enablePan={false} enableZoom={false} minPolarAngle={.5} maxPolarAngle={1.8} />
  </Canvas></PreviewBoundary>;
}
