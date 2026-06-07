## Mobile Redesign Plan

Goal: keep the desktop's high-end aesthetic (deep dark, glass, GOBOLD display type, painterly backdrop) but on phones reduce chrome, increase whitespace, and give each page a magazine rhythm: one featured block + tightly-spaced sections.

### 1. New mobile navigation — top bar + full-screen menu

Replace the right-side rail / drawer on screens `<768px` with:

- **Slim top bar (56px)**: KAMROK wordmark left, single icon button right (menu / close). Transparent over hero, becomes solid `rgba(13,12,18,.85)` + blur on scroll.
- **Full-screen menu**: covers viewport, deep dark with subtle painterly backdrop. Large GOBOLD nav items (ABOUT, WORK, SKILLS, BLOG, TOOLS, CONTACT) stacked, 36–44px, with small count/note under each. Footer holds socials + settings (music/sound/fullscreen) as a compact strip — no separate popover.
- Hide the right rail, drawer, settings popover, and bottom-left MAP/OBJECTIVES hub at `<768px` (moon HUD also collapses to a single toggle).
- Implementation: new `MobileNav.tsx`; `KamrokNav` renders `MobileNav` when `useIsMobile()` is true, else current desktop chrome.

### 2. Moonscape page on mobile

Keep the 3D scene as-is per your choice, but declutter the surrounding UI:

- Hide `FloatingShowcase`, painterly frame corners, and the bottom-left hub.
- Collapse HUD radar + objectives into a single bottom "i" button that opens a sheet.
- Reduce DPR/quality only at `<400px` (one-line change in `moonEngine.ts`) so it stays smooth.

### 3. Content pages (About / Work / Skills / Blog / Contact) — magazine layout

Currently each page is one long `kk-card` with corners, dividers, dense rows, and 2-col grids that crush on mobile. New mobile treatment:

- **Featured block (hero)**: page eyebrow + oversized GOBOLD H1 + a single lead paragraph. No corner ornaments at this size; replace with one thin gradient hairline.
- **Section cards**: each subsequent section (team, process, rows, clients, case features) becomes its own glass card with rounded corners, generous 24px padding, separated by 32px gaps — feels like flipping through a zine instead of one wall of text.
- All `grid-template-columns: 1fr 1fr` collapses to single column with bigger type and proper rhythm; small "01 / 03" indices replace dense numbering.
- Increase base font to 16/26, headings get more letter-spacing breathing room. Backdrop opacity bumped so text is comfortable.
- Add a sticky bottom CTA bar on Contact and Work ("Start a project →") so the primary action is always reachable.

### 4. Background / showcase

- Hide `FloatingShowcase` on mobile (already partially done at 1180px — formalize).
- Painterly hero image stays but with a stronger top-to-bottom dark gradient so text always reads.
- Drop the decorative `im-bg-frame` corners on mobile.

### Files to add / change

```text
src/components/kamrok/MobileNav.tsx          (new — top bar + fullscreen menu)
src/components/kamrok/KamrokNav.tsx          (gate desktop chrome to >=768px)
src/components/kamrok/ImmersiveShell.tsx     (hide FloatingShowcase + frame on mobile)
src/components/kamrok/KamrokLayout.tsx       (drop corner ornaments on mobile, add section-card wrapper option)
src/styles/immersive.css                     (new mobile breakpoint: top bar, fullscreen menu, hero gradient)
src/styles/kamrok.css                        (mobile: stack grids, section-card treatment, type scale, spacing)
src/styles/kamrok-moon.css                   (mobile: hide HUD chrome, consolidate into one toggle)
src/components/kamrok/moon/MoonExperience.tsx (mobile HUD toggle wiring)
```

No backend, routing, or content changes — purely presentation. After implementation I'll screenshot at 390×844 to verify each page.
