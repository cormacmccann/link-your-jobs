import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'

// Gold so they read as "valuable signals" against the cyan/violet scene.
const GOLD = '#ffd24d'
const HALO = '#ffe9a6'
const DIM = '#4a4668'

export default function Anomalies() {
  const anomalies = useStore((s) => s.anomalies)
  const recovered = useStore((s) => s.recovered)
  const group = useRef()

  // shared spin + gentle pulse for life
  useFrame((state) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.children.forEach((child, i) => {
      const a = anomalies[i]
      if (!a) return
      child.rotation.y += 0.02
      child.rotation.x += 0.011
      child.scale.setScalar(a.size * a.scale * (1 + Math.sin(t * 2.6 + i) * 0.1))
    })
  })

  return (
    <group ref={group}>
      {anomalies.map((a) => {
        const got = recovered.includes(a.project)
        return (
          <group key={a.guid} position={a.offset}>
            <mesh>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color={got ? DIM : GOLD} transparent opacity={got ? 0.4 : 1} />
            </mesh>
            <mesh scale={1.6}>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color={got ? DIM : HALO} wireframe transparent opacity={got ? 0.12 : 0.5} />
            </mesh>
            {!got && <pointLight color={GOLD} intensity={6} distance={140} />}
          </group>
        )
      })}
    </group>
  )
}
