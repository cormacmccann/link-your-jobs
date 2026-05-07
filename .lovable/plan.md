# Replace homepage with dark portfolio landing

Build the Michael Smith single-page dark portfolio exactly as specified and mount it at `/`, replacing the current KAMROK homepage. Existing CRM, /clients, portfolio detail pages, and all other routes stay untouched.

## Scope

- New homepage only. No changes to KAMROK brand globally — design tokens are scoped to the new page.
- Placeholder content verbatim ("Michael Smith", Chicago, "hello@michaelsmith.com", etc.).
- No database, no auth, no CMS wiring.

## File changes

**New files**
- `src/pages/PortfolioLanding.tsx` — page shell, loading-screen state, GSAP setup, smooth-scroll
- `src/components/portfolio-landing/LoadingScreen.tsx` — counter 000→100, rotating words, progress bar
- `src/components/portfolio-landing/Navbar.tsx` — floating pill nav with gradient logo + Say hi
- `src/components/portfolio-landing/Hero.tsx` — HLS bg video, name reveal, rotating role, CTAs, scroll cue
- `src/components/portfolio-landing/SelectedWorks.tsx` — bento 7/5/5/7 with 4 placeholder project cards
- `src/components/portfolio-landing/Journal.tsx` — 4 horizontal pill entries
- `src/components/portfolio-landing/Explorations.tsx` — pinned center + 2-column GSAP parallax + lightbox
- `src/components/portfolio-landing/Stats.tsx` — 3-column stats
- `src/components/portfolio-landing/ContactFooter.tsx` — flipped HLS bg, GSAP marquee, mailto CTA, social row
- `src/styles/portfolio-landing.css` — Inter + Instrument Serif imports, `--bg/--surface/--text/--muted/--stroke/--accent` HSL tokens scoped under `.portfolio-landing-root`, keyframes `scroll-down`, `role-fade-in`, `gradient-shift`, `.accent-gradient` utility

**Edited files**
- `src/App.tsx` — change the `/` route element from the current `Index` to `PortfolioLanding`. Keep `Index` importable for now (not deleted) so nothing else breaks.
- `tailwind.config.ts` — add `bg`, `surface`, `text-primary`, `muted`, `stroke` colors (HSL var driven), `font-body`/`font-display` families, and the three keyframes/animations. All additive — no existing tokens removed.
- `index.html` — add Google Fonts preconnect + Inter (300–700) and Instrument Serif italic 400 link tags.

**Dependencies to install**
- `gsap` (with ScrollTrigger), `hls.js`. `framer-motion` is already in the project.

## Implementation notes (technical)

- The page wraps everything in a `<div className="portfolio-landing-root font-body bg-bg text-text-primary">` so the dark tokens, fonts, and overrides only apply inside this page. KAMROK pages remain unchanged.
- GSAP `ScrollTrigger` registered once in `PortfolioLanding.tsx`; pinning logic for Explorations uses `useLayoutEffect` + `gsap.context` for cleanup on unmount.
- HLS video: feature-detect `Hls.isSupported()`, fall back to native `canPlayType('application/vnd.apple.mpegurl')`. Source: `https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8`.
- Loading screen counter via `requestAnimationFrame` over 2700ms; calls `onComplete` after 400ms post-100.
- Rotating hero role uses `key={roleIndex}` + `animate-role-fade-in` to retrigger CSS animation.
- Bento grid images: use Unsplash placeholders (Automotive, Architecture, Portrait, Branding) so the page renders without uploads.
- Explorations gallery: 6 placeholder images, click-to-lightbox via a small in-component modal (no extra lib).
- Marquee: GSAP `to(..., { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })` over a doubled string of "BUILDING THE FUTURE • ".
- Smooth scroll: native `html { scroll-behavior: smooth }` scoped under the page root; nav links use hash anchors (`#work`, `#resume` placeholder).
- Page transitions on `/` are not needed since it's a single-page layout; Framer Motion `whileInView` handles section reveals.

## Section structure

```text
<PortfolioLanding>
  <LoadingScreen/>            // overlay, unmounts on complete
  <Navbar/>                   // fixed
  <Hero id="home"/>           // 100vh, HLS bg
  <SelectedWorks id="work"/>  // bento 7/5/5/7
  <Journal/>                  // pill list
  <Explorations/>             // 300vh pinned + parallax
  <Stats/>                    // 3-up
  <ContactFooter/>            // marquee + mailto + socials
</PortfolioLanding>
```

## Out of scope

- Real content wiring (DB-driven projects/journal). Can be a follow-up.
- Restoring the old KAMROK homepage anywhere else — `Index.tsx` stays in the repo but unmounted.
- Mobile-only redesign work beyond what the spec already states (responsive classes are in the spec).
