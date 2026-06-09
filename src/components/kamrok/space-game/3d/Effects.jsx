import { extend } from '@react-three/fiber'
import { Effects as EffectComposer } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

export default function Effects() {
  return (
    <EffectComposer disableGammaPass>
      {/* Punchy neon bloom — the glow that makes the run feel spectacular. */}
      <unrealBloomPass strength={1.2} radius={0.85} threshold={0.08} />
    </EffectComposer>
  )
}
