import * as THREE from 'three'
import React, { Suspense, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Stars from './3d/Stars'
import Planets from './3d/Planets'
import Effects from './3d/Effects'
import Particles from './3d/Particles'
import Enemies from './3d/Enemies'
import Rocks from './3d/Rocks'
import Explosions from './3d/Explosions'
import { audio } from './store'
import Rings from './3d/Rings'
import Track from './3d/Track'
import Ship from './3d/Ship'
import Rig from './3d/Rig'
import Hud from './Hud'
import useStore from './store'
import MoonBoundary from '@/components/kamrok/moon/MoonBoundary'

export default function App() {
  const { fov } = useStore((state) => state.mutation)
  const actions = useStore((state) => state.actions)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault()
        useStore.getState().actions.setBoosting(true)
      }
    }
    const onKeyUp = (e) => {
      if (e.code === 'Space' || e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault()
        useStore.getState().actions.setBoosting(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [])

  // Honor the global SETTINGS popover (music/sound/volume) — set on window by KamrokNav.
  useEffect(() => {
    const all = [audio.bg, audio.engine, audio.engine2, audio.zap, audio.warp, audio.click, audio.explosion]
    const sync = () => {
      const vol = window.__kamrokVol == null ? 0.7 : window.__kamrokVol
      const musicOn = window.__kamrokMusic !== false
      const soundOn = window.__kamrokSound !== false
      all.forEach((a) => { if (!a) return; a.muted = !soundOn })
      if (audio.bg) {
        audio.bg.muted = !musicOn
        audio.bg.volume = musicOn ? 0.6 * vol : 0
      }
    }
    sync()
    const id = setInterval(sync, 250)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      onPointerMove={actions.updateMouse}
      onClick={actions.shoot}
      style={{ position: "absolute", inset: 0 }}
    >
      <Canvas
        linear
        mode="concurrent"
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [0, 0, 2000], near: 0.01, far: 10000, fov }}
        onCreated={({ gl, camera }) => {
          actions.init(camera)
          gl.toneMapping = THREE.NoToneMapping
          gl.setClearColor(new THREE.Color('#020209'))
        }}>
        {/* Push fog way out so the view feels open and explorable. */}
        <fog attach="fog" args={['#070710', 400, 2200]} />
        <ambientLight intensity={0.45} />
        <Stars />
        <Explosions />
        <Track />
        <Particles />
        <Rings />
        <Suspense fallback={null}>
          <Rocks />
          <Planets />
          <Enemies />
          <Rig>
            <MoonBoundary fallback={null}>
              <Ship />
            </MoonBoundary>
          </Rig>
        </Suspense>
        <Effects />
      </Canvas>
      <Hud />
    </div>
  )
}
