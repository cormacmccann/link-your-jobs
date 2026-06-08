import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import useStore from '../store'
import chimpAsset from '@/assets/moon/chimp.glb.asset.json'

// KAMROK skin: the thing you fly is the chimp ship that launched off the moon.
useGLTF.preload(chimpAsset.url)

const geometry = new THREE.BoxGeometry(1, 1, 40)
const accent = new THREE.Color('#c8b8ff')
const pink = new THREE.Color('#ff7ad4')
const laserMaterial = new THREE.MeshBasicMaterial({ color: accent })
const crossMaterial = new THREE.MeshBasicMaterial({ color: pink, fog: false })
const position = new THREE.Vector3()
const direction = new THREE.Vector3()

export default function Ship() {
  const { scene } = useGLTF(chimpAsset.url)
  const ship = useMemo(() => {
    const c = scene.clone(true)
    // Normalise to ~10 units along its largest axis so it matches the demo's scale budget.
    const box = new THREE.Box3().setFromObject(c)
    const size = box.getSize(new THREE.Vector3())
    const s = 10 / Math.max(0.001, Math.max(size.x, size.y, size.z))
    c.scale.setScalar(s)
    const center = box.getCenter(new THREE.Vector3())
    c.position.set(-center.x * s, -center.y * s, -center.z * s)
    return c
  }, [scene])

  const mutation = useStore((state) => state.mutation)
  const { clock, mouse, ray } = mutation
  const lasers = useStore((state) => state.lasers)
  const main = useRef()
  const laserGroup = useRef()
  const laserLight = useRef()
  const exhaust = useRef()
  const cross = useRef()
  const target = useRef()

  useFrame(() => {
    main.current.position.z = Math.sin(clock.getElapsedTime() * 40) * Math.PI * 0.2
    main.current.rotation.z += (mouse.x / 500 - main.current.rotation.z) * 0.2
    main.current.rotation.x += (-mouse.y / 1200 - main.current.rotation.x) * 0.2
    main.current.rotation.y += (-mouse.x / 1200 - main.current.rotation.y) * 0.2
    main.current.position.x += (mouse.x / 10 - main.current.position.x) * 0.2
    main.current.position.y += (25 + -mouse.y / 10 - main.current.position.y) * 0.2
    exhaust.current.scale.x = 1 + Math.sin(clock.getElapsedTime() * 200)
    exhaust.current.scale.y = 1 + Math.sin(clock.getElapsedTime() * 200)
    for (let i = 0; i < lasers.length; i++) {
      const group = laserGroup.current.children[i]
      group.position.z -= 20
    }
    laserLight.current.intensity +=
      ((lasers.length && Date.now() - lasers[lasers.length - 1] < 100 ? 20 : 0) - laserLight.current.intensity) * 0.3

    main.current.getWorldPosition(position)
    main.current.getWorldDirection(direction)
    ray.origin.copy(position)
    ray.direction.copy(direction.negate())

    crossMaterial.color = mutation.hits ? accent : pink
    cross.current.visible = !mutation.hits
    target.current.visible = !!mutation.hits
  })

  return (
    <group ref={main}>
      <group scale={[3.5, 3.5, 3.5]}>
        <group ref={cross} position={[0, 0, -300]} name="cross">
          <mesh renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[20, 2, 2]} />
          </mesh>
          <mesh renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 20, 2]} />
          </mesh>
        </group>
        <group ref={target} position={[0, 0, -300]} name="target">
          <mesh position={[0, 20, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[40, 2, 2]} />
          </mesh>
          <mesh position={[0, -20, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[40, 2, 2]} />
          </mesh>
          <mesh position={[20, 0, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 40, 2]} />
          </mesh>
          <mesh position={[-20, 0, 0]} renderOrder={1000} material={crossMaterial}>
            <boxGeometry args={[2, 40, 2]} />
          </mesh>
        </group>
        <pointLight ref={laserLight} position={[0, 0, -20]} distance={100} intensity={0} decay={0} color={accent} />
        <group ref={laserGroup}>
          {lasers.map((t, i) => (
            <group key={i}>
              <mesh position={[-2.8, 0, -0.8]} geometry={geometry} material={laserMaterial} />
              <mesh position={[2.8, 0, -0.8]} geometry={geometry} material={laserMaterial} />
            </group>
          ))}
        </group>
        <group rotation={[0, Math.PI, 0]}>
          <primitive object={ship} />
        </group>
      </group>
      <mesh ref={exhaust} scale={[1, 1, 30]} position={[0, 1, 30]}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  )
}
