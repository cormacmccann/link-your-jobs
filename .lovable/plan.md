## Goals
1. Case studies become a full-screen takeover read, with rich Clubrovia detail (screenshots already in `src/assets/clubrovia/`).
2. Team-member dossier slides in from the **left** so it isn't hidden behind the right-side nav.
3. About page leads with the **KAMROK logo** (instant brand recognition) and adds a left-side pull-out explaining the why behind the 3D immersive experience.

---

## 1. Fullscreen case study

Today `CaseStudy.tsx` renders inside `KamrokLayout` (max-width 880, padded card with corner filigree). It feels small.

Changes:
- New `CaseStudyShell` (or `KamrokLayout maxWidth={9999} fullBleed` prop) that:
  - drops the bordered `.kk-card`, corners and `.kk-page` width cap
  - lets content go edge-to-edge, comfortable reading column for prose but full-width hero/gallery/screenshots
  - still uses `ImmersiveShell` for nav + background, so the right-side nav stays present (it doesn't block reading because case content is centered)
- Add a true hero: large title + tagline over a darkened banner using the first Clubrovia screenshot (or accent gradient for cases without imagery).
- Sticky in-page section nav (Overview · Challenge · Approach · Highlights · Outcome) on the left rail (desktop only) for long reads.

### Clubrovia detail upgrade
Extend the `CaseData` shape with optional fields and fill Clubrovia in fully:
- `screenshots: { src; alt; caption }[]` — use `laptop.png`, `coach.png`, `in-action.png`, `team-chat.png`
- `logo: string` — `logo.png` shown above the title
- `gallery` section: full-width grid alternating large/small screenshots with captions
- expanded `approach` broken into 3–4 paragraphs (multi-tenant, admin vs club hub, finances/compliance, fundraising)
- `stats: { value; label }[]` — e.g. "Hundreds of members", "1 platform / many clubs", "0 spreadsheets"
- `quote: { text; attribution }` (optional pull-quote)

McKevitt's keeps its current shape; new fields are optional so it doesn't break.

### New CSS (`kamrok.css`)
- `.kk-case-hero` (full-width, 60–72vh, image + gradient overlay, large title)
- `.kk-case-shots` (responsive grid, lazy-loaded `<img>` with `loading="lazy"` + width/height for CLS)
- `.kk-case-stats` (3-up bold numbers)
- `.kk-case-quote` (serif pull quote)
- `.kk-case-sectionnav` (sticky left rail, desktop only, hidden under 1100px)

---

## 2. Team dossier slides from the LEFT

Today `.kk-codex-panel` is `right: 0; transform: translateX(102%)` — collides with the right nav.

Changes in `src/styles/kamrok.css`:
- swap to `left: 0; transform: translateX(-102%)`, open state `translateX(0)`
- accent bar `::before` moves to `right: 0`
- shadow flips to `36px 0 110px rgba(0,0,0,.6)`
- mobile rules: same flip
- Add a translucent backdrop (`.kk-codex-scrim`) behind the panel that closes on click — gives the takeover feel without scrolljacking.
- Esc-to-close already implied by `setOpenId(null)` — wire a `keydown` listener in `About.tsx`.

No JSX restructuring needed beyond adding the scrim element.

---

## 3. About page — logo-first + left "Why immersive" pullout

In `src/pages/kamrok/About.tsx`:
- Replace the `Emblem` (small SVG) at the top with a centered KAMROK logo (`src/assets/kamrok-logo.png`) at hero scale (~clamp(160px, 28vw, 280px) wide), with the existing eyebrow underneath. First thing visitors see = the brand.
- Add a new left-side pull-out panel (`.kk-flyout-left`) that auto-opens on first visit (small delay) or via a button labelled "WHY WE BUILD IMMERSIVE". Content:
  > Great design isn't enough anymore. In a world where every site looks "fine", people remember **how it felt**. We build immersive, playful, three-dimensional experiences because that's what the new web expects — and because it's fun. We design and deliver the craft of great web design, then go further with content and worlds people want to explore.
  - Includes a small "ENTER THE MOON" link back to `/`.
- Style mirrors the dossier panel but slides from the left with its own accent (cyan `#1FE1E9` to match brand). Closeable; remembers state in `sessionStorage` so it doesn't nag returning visitors.

This pull-out reuses the same slide-in pattern as the redesigned team dossier — visually consistent.

---

## Files touched
- `src/pages/kamrok/CaseStudy.tsx` — expanded data shape, Clubrovia detail, fullscreen layout
- `src/pages/kamrok/About.tsx` — logo hero + left "Why immersive" pullout
- `src/components/kamrok/KamrokLayout.tsx` — add `fullBleed` prop (drops card + width cap)
- `src/styles/kamrok.css` — flip dossier to left, add case-study hero/gallery/stats/sticky-nav, add left-flyout styles, logo-hero block
- (assets already present: `src/assets/kamrok-logo.png`, `src/assets/clubrovia/*.png`)

## Verification
- Visit `/about` → KAMROK logo is the first thing seen; left pullout reveals the why
- Click a team card → dossier slides in **from the left**, nothing hidden behind right nav
- Visit `/work/clubrovia` → full-bleed hero, screenshot gallery, stats, longer narrative
- `/work/mckevitts` still works (no new required fields)
- Mobile: dossier and case study both readable, no horizontal scroll
