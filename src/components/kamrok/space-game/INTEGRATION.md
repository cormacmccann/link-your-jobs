# Space‑game integration & merge guide

The pmndrs **space‑game** demo (`degit pmndrs/examples/demos/space-game`) — drcmda's R3F
arcade flyer: spline track, mouse‑aim shooting, asteroids + drones, drei bloom, audio.

This folder is **scaffolded but dormant** — the files are copied in and the store is already
patched for modern zustand, but **nothing imports them yet**, so the live build is unaffected
(verified: `npm run build` green, not in the bundle). Wire it up with the steps below.

The goal you chose is a **merge**: keep KAMROK's takeoff cinematic, return‑to‑moon flow, theme
and narrative; borrow the pmndrs flight/combat mechanics. See **§4**.

---

## What's here
```
space-game/
  App.jsx            # the demo's <Canvas> + scene composition (the thing you mount)
  Hud.jsx            # score/health/charge overlay (uses styled-components — see §1)
  store.js           # zustand store: the spline track, mutation buffer, actions  [PATCHED]
  styles.css         # demo global styles (optional)
  3d/*.jsx           # Ship, Rocks, Enemies, Explosions, Particles, Planets, Rig, Rings, Stars, Track, Effects
  3d/*.gltf          # ship / rock / spacedrone models (self-contained, ~480KB)
  audio/*.mp3 + index.js   # bg/engine/laser/explosion/warp (~1.9MB) — loads only on entry
  images/earth.jpg, moon.png
/public/bold.blob    # HUD font (already copied to public/)
```
`store.js` is already patched: `import { create } from 'zustand'` (the demo shipped zustand v3's
default export; KAMROK will use v4/v5's named export).

---

## §1 — Install deps
```bash
npm i zustand styled-components three-stdlib
```
- **No `@react-three/postprocessing` needed** — `3d/Effects.jsx` uses drei's `Effects` +
  `UnrealBloomPass` from `three-stdlib`, both already compatible with our R3F 8 / drei 9.
- `three-stdlib` is likely already present transitively (via drei); installing it direct pins it.
- `styled-components` is only used by `Hud.jsx`. If you'd rather not add it, rewrite the HUD in
  plain CSS (it's ~80 lines) — recommended anyway, to match KAMROK's look (see §4).
- **Version note:** demo targets `three@0.165`, we're on `0.160`. Watch two things on first run:
  `three/examples/jsm/curves/CurveExtras` (used by the track) and the `UnrealBloomPass` import —
  both exist in 0.160, but if bloom/track throw, bump three or import the pass from `three-stdlib`
  consistently. Test before shipping.

⚠️ I deliberately did **not** add these to `package.json` myself: Lovable is editing `package.json`
in parallel and an unverified dep bump could break the live build. Run the install when you wire
this up (in Lovable or locally) so it's resolved against the current tree.

---

## §2 — The mount wrapper  `KamrokSpaceGame.tsx`
Create this **after** installing deps (it imports the demo, which needs them). It lazy‑loads the
game (its own chunk + assets only download on entry), error‑boundaries it, and gates it off phones.

```tsx
// src/components/kamrok/space-game/KamrokSpaceGame.tsx
import { Suspense, lazy } from "react";
import MoonBoundary from "@/components/kamrok/moon/MoonBoundary";

const Game = lazy(() => import("./App")); // the demo's App.jsx (default export)

export default function KamrokSpaceGame({ onExit }: { onExit: () => void }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "#05030f" }}>
      <MoonBoundary fallback={<button onClick={onExit} style={exitBtn}>← RETURN TO THE MOON</button>}>
        <Suspense fallback={null}>
          <Game />
        </Suspense>
      </MoonBoundary>
      <button onClick={onExit} style={exitBtn} aria-label="Exit to moon">← MOON</button>
    </div>
  );
}
const exitBtn: React.CSSProperties = {
  position: "fixed", top: 18, left: 18, zIndex: 61, padding: "8px 14px", borderRadius: 24,
  border: "1px solid rgba(180,170,255,.4)", background: "rgba(8,7,20,.6)", color: "#ece8ff",
  fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: ".18em", cursor: "pointer",
};
```

---

## §3 — Wire the moon → space handoff
The engine already has the trigger: collect all 14 anomalies → `spawnShip()` → takeoff cinematic →
**`enterSpace()`** in `src/components/kamrok/moon/moonEngine.ts` (~line 971). That function is the
single seam.

**a) In `moonEngine.ts`, make `enterSpace()` tell React** (keep or drop the vanilla `buildSpace()` —
see §4):
```js
function enterSpace(){
  mode='space';
  // MERGE: keep the vanilla orbit as the backdrop, OR comment buildSpace() out to go full pmndrs
  buildSpace();
  document.body.classList.add('space-mode');
  renderer.toneMappingExposure=1.28;
  window.dispatchEvent(new CustomEvent('kamrok:enter-space'));   // <-- add this
  showToast('✦ ENTERING ORBIT');
  updateSpaceHud();
}
```
Also expose an exit the React layer can call — add near the top-level of the engine:
```js
window.__kamrokExitSpace = () => { window.dispatchEvent(new CustomEvent('kamrok:exit-space')); /* + reset mode='drive', buggy.visible=true, camera, etc. */ };
```

**b) In `MoonExperience.tsx`, listen and mount:**
```tsx
const [inSpace, setInSpace] = useState(false);
useEffect(() => {
  const enter = () => setInSpace(true);
  const exit  = () => setInSpace(false);
  window.addEventListener("kamrok:enter-space", enter);
  window.addEventListener("kamrok:exit-space", exit);
  return () => { window.removeEventListener("kamrok:enter-space", enter); window.removeEventListener("kamrok:exit-space", exit); };
}, []);
// ...in JSX, desktop only (mobile WebGL can't spare the context — see the moon mobile fix):
{inSpace && showFlyby /* reuse the >=768px gate */ && (
  <KamrokSpaceGame onExit={() => { window.dispatchEvent(new CustomEvent("kamrok:exit-space")); /* tell engine to resume drive */ }} />
)}
```
On mobile (`<=767px`) the takeoff can simply fade to a "the orbit run is a desktop experience"
card, or just drop you back on the moon.

---

## §4 — The MERGE (elements of both)
You asked to blend the two rather than replace. Concretely:

**Keep from KAMROK (vanilla space / the moon):**
- The **takeoff cinematic** as the *entry transition* into the pmndrs game (it already launches the
  ship off the moon — fade to white → mount `<KamrokSpaceGame/>`).
- The **return‑to‑moon** exit (the `← MOON` button → `kamrok:exit-space` → engine resumes `drive`).
- The **theme**: retint the demo to KAMROK's palette — bloom/laser/particles to purple `#8b7dff` /
  pink, dark `#05030f` background. (`3d/Effects.jsx` UnrealBloomPass + the material colors in
  `Ship/Rocks/Particles`.)
- The **HUD voice**: rewrite `Hud.jsx` in KAMROK's mono/serif style (kills the styled-components dep
  too). Map the demo's `score`/`health` to KAMROK copy.
- Optionally the **narrative**: seed the demo's rock field as the "anomalies" you chased, and show
  the **moon receding** by swapping the demo's `images/moon.png` planet for KAMROK's moon.

**Take from pmndrs:**
- The **spline‑track flight + mouse‑aim shooting + asteroids/drones + particles + bloom + audio** —
  i.e. `store.js` (the track + mutation), `3d/Track/Ship/Rocks/Enemies/Particles/Explosions/Effects`,
  `audio/`.

**Don't run both loops at once:** if you keep `buildSpace()` for the backdrop, make the vanilla
`spaceTick()` stop driving the camera/controls once the pmndrs game mounts (guard it with a flag set
on `kamrok:enter-space`), otherwise two things fight for input. Cleanest merge = pmndrs owns the
gameplay; KAMROK owns the entry, exit, skin and story.

**Swap the ship (nice touch):** replace `3d/ship.gltf` with KAMROK's ship/chimp model so the thing
you fly is the thing that launched off the moon. `3d/Ship.jsx` just `useGLTF`s the file.

---

## §5 — Desktop‑only, lazy, boundaried (do not skip)
We *just* fixed a mobile blank‑screen caused by too many WebGL contexts (see
`[[kamrok-moon-homepage]]` / `MoonBoundary`). The space‑game is **another** heavy canvas + bloom:
- Gate it to `matchMedia('(max-width: 767px)')` = false (desktop), like `SatelliteFlyby`.
- Keep it inside `MoonBoundary` (already in §2) so a failure never blanks the site.
- Keep it `lazy()` so its ~3.4MB of assets only download when someone actually reaches orbit.

---

## §6 — Assets & licensing ⚠️
The pmndrs **code** is MIT. The bundled **ship/rock/drone GLTFs and the audio** come with the demo
and may have their own terms — **verify they're cleared for commercial use** before this ships on a
client‑facing portfolio, or swap in your own (the ship swap in §4 is a good excuse). Consider moving
the 3.4MB of assets to the Lovable CDN (like the moon assets) instead of the JS bundle.
