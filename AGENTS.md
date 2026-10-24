# Architecture rules

- Page titles, descriptions, canonical URLs and social preview tags are set per route in each route file's `head()` (helpers in `src/lib/seo.ts`); this is server-rendered, so social crawlers get page-specific previews without JavaScript.
- `__root.tsx` holds only sitewide defaults and JSON-LD; never put canonical or og:image there, because root head entries leak into every page.
- Components must not read `window`, `document` or `matchMedia` during render or in `useState` initializers; read them in `useEffect`, because every page renders on the server first.
- The moon engine lives in `moonEngine.js` with a `.d.ts` API declaration, because the original file was untyped and strict TypeScript would otherwise block builds.
- Backend functions stay on the existing backend runtime (none are called from the public site); move them only with an explicit cutover plan.
- Local service pages use dedicated route files with a small metadata inventory and shared evidence-driven page data, including approved testimonials with explicit regional attribution; this keeps towns independently crawlable without duplicating layout or claiming false local evidence.
- Device mockups perspective-composite original screenshots into generated device scenes via the performance preparation script and serve responsive variants; this preserves real website text instead of AI-redrawing it.
