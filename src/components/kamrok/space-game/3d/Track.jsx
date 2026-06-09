import React from 'react'
import useStore from '../store'

export default function Track() {
  const { scale, track } = useStore((state) => state.mutation)
  return (
    <mesh scale={[scale, scale, scale]} geometry={track}>
      {/* glowing cyan energy conduit, semi-transparent so it reads as a beam not a wall */}
      <meshBasicMaterial color="#22d3ee" transparent opacity={0.5} />
    </mesh>
  )
}
