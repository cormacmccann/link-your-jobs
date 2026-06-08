import { extend } from '@react-three/fiber'
import { Effects as EffectComposer } from '@react-three/drei'
import { UnrealBloomPass } from 'three-stdlib'

extend({ UnrealBloomPass })

export default function Effects() {
  return (
    <EffectComposer disableGammaPass>
      {/* Softer bloom — calm exploratory glow, not a strobe. */}
      <unrealBloomPass strength={0.55} radius={0.9} threshold={0.15} />
    </EffectComposer>
  )
}
