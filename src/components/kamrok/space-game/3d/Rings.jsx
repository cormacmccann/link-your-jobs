import * as THREE from 'three'
import React from 'react'
import useStore from '../store'

const geometry = new THREE.RingGeometry(1, 1.03, 90)
// KAMROK neon — gates cycle purple / pink / cyan / violet as you fly through them
const RING_COLORS = ['#8b7dff', '#ff5db1', '#45e0ff', '#c06bff']
const materials = RING_COLORS.map(
  (c) => new THREE.MeshBasicMaterial({ color: new THREE.Color(c), side: THREE.DoubleSide, transparent: true, opacity: 0.92 })
)

export default function Rings() {
  const { rings } = useStore(state => state.mutation)
  return rings.map(([pos, matrix], i) => {
    const f = (Math.sin(i / 10) * Math.PI) / 2
    return (
      <mesh
        key={i}
        position={pos}
        scale={[30 + i * 5 * f, 30 + i * 5 * f, 30 + i * 5 * f]}
        onUpdate={self => self.quaternion.setFromRotationMatrix(matrix)}
        geometry={geometry}
        material={materials[i % materials.length]}
      />
    )
  })
}
