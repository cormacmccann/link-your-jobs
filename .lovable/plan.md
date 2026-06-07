## Goal
Make the landed ship clearly visible, the space sequence more immersive, and the cube targets look more detailed — all without adding new downloads.

## Scope
Only `src/components/kamrok/moon/moonEngine.ts` (the three.js scene). Generated file, but edits are surgical and well-contained; no asset additions.

---

## 1. Ship visibility on the moon

Currently `landedShip` sits in deep shadow with one cool point light at `2.2` intensity. The ship's own materials read black under our cool ambient.

Changes around `spawnShip()` (lines ~782–796):
- Walk `landedShip` materials once and boost `emissiveIntensity` to ~0.35 with a warm `emissive` (`0x6a4a1f`) so the hull self-lights without changing textures.
- Set `metalness` floor 0.6, `roughness` ceiling 0.55 so the warm key light actually reflects.
- Add a warm key `SpotLight(0xffd9a0, 6, 60, Math.PI/5, 0.45, 1.4)` aimed at the ship from above-front; cool fill PointLight already there, raise to 3.4 intensity / range 90.
- Strengthen the tractor beam: opacity .16 → .28, add a second inner cone (radius 1.2→2.8) and a ground halo `RingGeometry` with additive blending.
- Add a slow pulsing glow on `landedShip` via `update()` callback (sin-driven emissiveIntensity 0.25↔0.5).
- Make the `THE SHIP` DOM marker auto-show a pulsing arrow ring when off-screen so the user can find it.

Mobile-safe: spotlight has no shadow; one extra light total.

## 2. More immersive space

Edits in `buildSpace()` and the space render loop (lines ~855+):
- Raise key sun PointLight intensity 2.3 → 3.2, add a second cool rim PointLight (`0x6cf2ff`, 1.6, far side).
- Tune nebula shader: increase fbm octaves from 5 → 6, mix in a second purple band (`0x4a2870` ↔ `0x1a4a8a`), gently animate `uTime` faster (×1.6) for drifting clouds.
- Add a distant volumetric “dust” layer: a second `THREE.Points` cloud (1500 pts, additive, size 2.5, sizeAttenuation) drifting slowly relative to camera → parallax depth, ~0 cost.
- Add subtle bloom-feel by raising `toneMappingExposure` to 1.25 while in space, restore on exit.
- Camera shake on thrust: add tiny `Math.sin(t*30)*0.06` offset when accelerating for tactility.
- Slow rotate the galaxy group (`grp.rotation.z += 0.0004`) for living backdrop.

All particle/shader changes — no new downloads.

## 3. “More detailed” blocks without more resources

The arcade targets are flat `BoxGeometry(16,16,16)` with one edge overlay. Upgrade in `spawnTarget()` (lines ~845–854):
- Replace single box with a small `Group`: core box + inset smaller box scaled 0.7 with inverted normals giving depth illusion, plus 6 small `BoxGeometry(2,2,2)` greebles on faces (procedural, no assets).
- Use `MeshStandardMaterial` with `flatShading:true`, slight per-instance hue jitter, `emissiveIntensity` pulsing.
- Add a thin additive `Sprite` halo (canvas-generated radial gradient, cached once) for glow.
- Edge lines kept; widen with `LineBasicMaterial({linewidth optional})` and randomize edge color among the palette.
- Result: visually richer “tech crates” at the same triangle budget (~200 tris each) and zero new network bytes.

Optional small touch: same greeble pattern reused on moon rocks via instanced detail if time allows — gated behind `!IS_MOBILE`.

## Verification
- Visual check at `/` on desktop and mobile preview: ship clearly readable on landing; space looks deeper; cubes feel like detailed objects.
- Confirm no new asset imports, bundle size unchanged, mobile FPS unaffected (extra lights/particles are cheap and gated where needed).

## Files touched
- `src/components/kamrok/moon/moonEngine.ts` (only)
