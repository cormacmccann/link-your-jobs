import { useEffect, useRef } from "react";

const STARS = Array.from({ length: 36 }, (_, index) => ({
  x: (index * 167 + 53) % 1440,
  y: (index * 83 + 31) % 770,
  r: index % 7 === 0 ? 2 : 1,
}));

/** Hand-cut terrain planes retain depth without loading the 3D playground. */
export default function SpaceLandscape({ paused }: { paused: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const hero = scene.closest<HTMLElement>(".space-hero");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = window.matchMedia("(pointer: fine)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    const paint = () => {
      frame = 0;
      const still = paused || preference.matches;
      const bounds = scene.getBoundingClientRect();
      scene.style.setProperty("--scene-scroll", `${still ? 0 : Math.min(Math.max(-bounds.top, 0), bounds.height)}px`);
      scene.style.setProperty("--scene-x", `${still ? 0 : pointerX}px`);
      scene.style.setProperty("--scene-y", `${still ? 0 : pointerY}px`);
      // The foreground uses its own transform so it can keep its entrance animation.
      hero?.style.setProperty("--chimp-x", `${still ? 0 : pointerX}px`);
      hero?.style.setProperty("--chimp-y", `${still ? 0 : pointerY}px`);
      hero?.style.setProperty("--chimp-scroll", `${still ? 0 : Math.min(Math.max(-bounds.top, 0), 360)}px`);
      hero?.style.setProperty("--chimp-tilt", `${still ? 0 : pointerX * .055}deg`);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || paused || preference.matches) return;
      const bounds = scene.getBoundingClientRect();
      pointerX = (Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)) - .5) * 22;
      pointerY = (Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)) - .5) * 14;
      queue();
    };
    const reset = () => { pointerX = 0; pointerY = 0; queue(); };
    const observer = new IntersectionObserver(([entry]) => scene.classList.toggle("is-offscreen", !entry.isIntersecting));
    observer.observe(scene);
    paint();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    hero?.addEventListener("pointermove", move, { passive: true });
    hero?.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    preference.addEventListener("change", queue);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      hero?.removeEventListener("pointermove", move);
      hero?.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      preference.removeEventListener("change", queue);
    };
  }, [paused]);

  return (
    <div className={`space-landscape space-landscape--cinematic${paused ? " is-paused" : ""}`} ref={sceneRef} aria-hidden="true">
      <div className="space-nebula" />
      <svg className="space-starmap" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g className="space-stars" fill="var(--star-color)">{STARS.map((star, index) => <circle key={index} cx={star.x} cy={star.y} r={star.r * .65} opacity={index % 3 === 0 ? .45 : .18} />)}</g>
      </svg>
      <div className="space-planet-layer"><img src="/art/orbit/cinematic-moon.webp" alt="" width="1254" height="1254" loading="eager" decoding="async" /></div>
      <div className="space-horizon-light" />
      <div className="space-moonscape">
        <div className="space-moon-plane space-moon-plane--back"><img src="/art/orbit/moon-back.webp" alt="" width="2172" height="703" decoding="async" /></div>
        <div className="space-moon-plane space-moon-plane--middle"><img src="/art/orbit/moon-middle.webp" alt="" width="2172" height="287" decoding="async" /></div>
        <div className="space-moon-plane space-moon-plane--front"><img src="/art/orbit/moon-front.webp" alt="" width="2172" height="317" decoding="async" /></div>
      </div>
      <div className="space-ground-fade" />
      <svg className="space-survey" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="var(--studio-mint)" strokeWidth=".65" opacity=".25"><path d="M1110 204h32m-16-16v32M818 613h18m-9-9v18"/><path d="M1130 236v45m-300 322 258-315" strokeDasharray="1 7"/><circle cx="1126" cy="204" r="68" strokeDasharray="1 12"/></g></svg>
      <div className="space-film-grain" />
    </div>
  );
}
