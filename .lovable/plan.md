## Goal
Rebuild `public/index-kamrok.html` (the Three.js moon‑buggy + spaceship experience) as a React route at `/`, using `@react-three/fiber` and `@react-three/drei`, keeping the immersive purple/blue shell intact for the panels.

## Asset reality check
- `public/assets/` does **not** exist in this project. The static HTML expects: `chimp.glb`, `ship.glb`, `alien_idle/walk/run/wave.glb`, `rock4.glb`, `rock7.glb`, `platform.glb`, `termL.glb`, `termS.glb`, `groundColor/Normal/Rough.jpg`, `rockColor/Normal.jpg`, `trackColor.jpg`, `engine.mp3`, `music.mp3`.
- Without the real .glb files I can only ship placeholder geometry (boxes/spheres) and silent audio. **You'll need to upload the `/assets` folder** for the real moonscape to render. Phase 1 below ships a working skeleton with placeholders so the rest of the work is unblocked.

## Phased build

### Phase 1 — Foundation (this turn)
- Install `@react-three/fiber@^8.18`, `@react-three/drei@^9.122.0`, `three@^0.160`.
- New `src/pages/kamrok/MoonHome.tsx` mounted at `/` in `App.tsx` (replacing the current `StaticRedirect` to `index-kamrok.html`).
- `src/components/kamrok/moon/` directory containing:
  - `MoonScene.tsx` — `<Canvas>` with starfield, lighting, fog, camera rig.
  - `Terrain.tsx` — procedural displaced plane with noise (no textures yet → solid color until assets arrive).
  - `Buggy.tsx` — placeholder buggy (low‑poly geo) with WASD/Arrow driving controls, velocity + steering, chase camera.
  - `Monuments.tsx` — 4 obelisks at fixed coords (About / Work / Skills / Contact). Proximity triggers a panel.
  - `Rocks.tsx` — scattered boulder instancing (placeholder spheres) with simple collision.
  - `HUD.tsx` — overlay using the existing immersive purple/blue tokens: top‑center KAMROK pill, bottom controls hint, monument labels.
  - `MonumentPanel.tsx` — when a monument is reached (or double‑clicked from a nav), open a glass panel using `ImmersiveShell` styling and route to `/about|work|skills|contact` on "Enter".

### Phase 2 — Real assets (after you upload `/assets`)
- Drop `.glb`/`.jpg`/`.mp3` into `public/assets/` (or upload via Lovable Assets if large).
- Swap placeholders for `useGLTF` loads of chimp, ship, rocks, platform, terminals.
- Wire PBR textures into the terrain and rocks.
- Add `music.mp3` + `engine.mp3` with Music/Sound toggles in a settings strip.

### Phase 3 — Anomalies + endgame
- Scatter glowing anomaly nodes, collect-on-proximity, counter in HUD.
- On full collection, land the ship at a monument; drive to it to enter flight mode.

### Phase 4 — Flight mode
- Swap controls to ship (WASD/Arrows steer, Q/E roll, Shift boost, Space fire), free‑flight starfield scene, target cubes + score.
- `warp` keyboard cheat.

## Out of scope (for now)
- 1:1 visual parity with the original (geometry tweaks, exact buggy proportions, alien NPCs) — those come in phases 2–4.
- Mobile touch controls — added in a later pass.

## Technical notes
- All UI overlays use existing `--accent` (#8b7dff) and `--accent-2` (#4ea8ff) tokens from `src/styles/immersive.css` so the moonscape matches the rest of the site.
- Routes `/about`, `/work`, `/skills`, `/contact` stay as the React pages already built.
- The old `public/index-kamrok.html` stays on disk so nothing breaks if we need to fall back; `/` no longer redirects to it.

## What I'll do right now if you approve
Phase 1 only: install deps, scaffold the R3F scene with placeholder geometry, hook up driving + 4 monuments + HUD, mount it at `/`. Then you upload `/assets` and I do Phase 2.
