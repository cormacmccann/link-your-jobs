# Mobile: "Tactile App" redesign + performance pass

Desktop stays exactly as-is. Everything below is gated on `<768px` (or route-level for code-split).

## 1. Mobile feel — "Tactile App"

Goal: feel like a native iOS app, not a website shrunk down.

- **Top bar**: 52px, just KAMROK wordmark left, menu icon right. No borders, no background until scrolled (then `rgba(11,12,16,.7)` + 14px blur).
- **Bottom tab bar**: fixed, 64px, 5 icons (Moon · Work · Skills · Blog · Contact). Glass blur, no borders, active tab gets the orange→pink gradient underline. Safe-area inset for iPhone notch.
- **Snap-scroll sections**: each page becomes vertically snap-scrolled "cards" (`scroll-snap-type: y mandatory`). One section per viewport, swipe to next. Page indicator dots on the right edge.
- **Sticky CTA**: Contact + Work pages get a thumb-zone "Start a project →" button floating above the tab bar.
- **Press feedback**: every interactive element gets `active:scale-[.97]` + a 120ms ease. Hamburger menu opens with a spring slide-down (not fade).
- **Zero ornament on mobile**: hide all `kk-emblem`, `kk-div`, `kk-pc`, corner brackets, drop caps, dividers, `im-bg-frame`, `FloatingShowcase`. Already partially done — finish it with a single `[data-mobile] *` reset rule.
- **Type**: 17/28 body, headings clamp(36px, 10vw, 56px), tighter tracking. One accent color per section instead of multi-color filigree.

## 2. Moon on mobile — Lightweight 3D

Edit `moonEngine.ts` with a mobile branch:
- DPR capped at 1 (vs 1.5–2 on desktop)
- Shadows OFF
- Object count halved: drop decorative rocks, alien idle/walk variants keep only one
- Texture size: load 512px versions instead of 1024/2048
- Skip post-processing (bloom, AA — use browser MSAA off)
- Camera FOV slightly wider so smaller scene feels full
- Replace bottom HUD (radar, objectives, speed, compass) with a single bottom-right "i" button → sheet

Target: <2MB initial moon payload on mobile vs ~8MB desktop.

## 3. Performance wins

**Smaller initial JS**
- Lazy-load `MoonExperience` (already a heavy chunk) via `React.lazy` + Suspense with a static moon poster fallback. First paint shows the poster instantly; Three.js downloads in background.
- Code-split tool pages — each tool route becomes its own chunk via `lazy()`.
- Audit `framer-motion` usage; replace simple fades with CSS where possible (saves ~40KB on routes that don't need it).
- Defer `lovable-tagger` and analytics until idle.

**Image optimization**
- Add `vite-imagetools` plugin. Convert `immersive-hero.jpg` and team photos to AVIF + WebP with JPEG fallback via `<picture>`.
- Add explicit `width`/`height` on all `<img>` (fixes CLS).
- Preload LCP image with `<link rel="preload" as="image" fetchpriority="high">` in `index.html`.
- Lazy-load below-fold images (`loading="lazy" decoding="async"`).
- Responsive `srcset` so phones don't pull 1920px images.

**Fewer fonts / CSS**
- Audit GOBOLD weights — keep only the 1–2 used on mobile (likely Regular + Bold). Subset to Latin only.
- Add `font-display: swap` to every `@font-face`.
- Tailwind already purges, but audit `kamrok.css` / `immersive.css` for unused selectors after the ornament removal — estimated 30%+ reduction.
- Inline critical above-the-fold CSS in `index.html`; defer the rest.

**PWA**
- Keep `vite-plugin-pwa` but exclude Three.js bundle and moon assets from precache (already partially configured). Switch moon assets to `runtimeCaching` NetworkFirst so they don't block first load.

## 4. Files to touch

```text
src/components/kamrok/MobileNav.tsx              (slim top bar, no border)
src/components/kamrok/MobileTabBar.tsx           (NEW — bottom tab bar)
src/components/kamrok/KamrokLayout.tsx           (snap-scroll wrapper on mobile)
src/components/kamrok/moon/moonEngine.ts         (mobile branch: DPR, shadows, count, textures)
src/components/kamrok/moon/MoonExperience.tsx    (lazy + poster fallback)
src/components/kamrok/ImmersiveShell.tsx         (hide frame/showcase on mobile)
src/pages/kamrok/Contact.tsx, Work.tsx           (sticky CTA above tab bar)
src/App.tsx                                      (lazy-load tool routes)
src/styles/immersive.css                         (mobile reset: no borders/ornament, tab bar, snap)
src/styles/kamrok.css                            (mobile type scale, section padding for tab bar)
src/styles/kamrok-moon.css                       (collapse HUD to single button)
vite.config.ts                                   (vite-imagetools, PWA tuning)
index.html                                       (preload LCP, font-display swap, critical CSS)
src/assets/immersive-hero.jpg                    (regenerate as AVIF/WebP via imagetools)
```

## Verification

After build I'll screenshot at 390×844 on About, Work, Contact, Moon to confirm: no borders/filigree, tab bar visible, snap-scroll smooth, moon loads under 2s on simulated 3G throttle. I'll also report bundle-size deltas (before/after) for the initial JS chunk and the moon chunk.

No backend, no routing, no content changes.
