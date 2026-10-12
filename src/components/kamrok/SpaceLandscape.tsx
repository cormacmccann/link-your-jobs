import ResponsiveImage from "./ResponsiveImage";
import { homeImages } from "@/assets/responsive/homeImages";
import mobileTerrain from "@/assets/responsive/mobile-terrain.webp?no-inline";
import { useEffect, useRef } from "react";
import DeferredGalaxy from "./DeferredGalaxy";

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
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    const paint = () => {
      frame = 0;
      const still = paused || preference.matches;
      const bounds = scene.getBoundingClientRect();
      scene.style.setProperty(
        "--scene-scroll",
        `${still ? 0 : Math.min(Math.max(-bounds.top, 0), bounds.height)}px`,
      );
      scene.style.setProperty("--scene-x", `${still ? 0 : pointerX}px`);
      scene.style.setProperty("--scene-y", `${still ? 0 : pointerY}px`);
      // The foreground uses its own transform so it can keep its entrance animation.
      hero?.style.setProperty("--chimp-x", `${still ? 0 : pointerX}px`);
      hero?.style.setProperty("--chimp-y", `${still ? 0 : pointerY}px`);
      hero?.style.setProperty(
        "--chimp-scroll",
        `${still ? 0 : Math.min(Math.max(-bounds.top, 0), 360)}px`,
      );
      hero?.style.setProperty(
        "--chimp-tilt",
        `${still ? 0 : pointerX * 0.055}deg`,
      );
    };
    const queue = () => {
      if (visible && !frame) frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.matches || paused || preference.matches) return;
      const bounds = scene.getBoundingClientRect();
      pointerX =
        (Math.min(
          1,
          Math.max(0, (event.clientX - bounds.left) / bounds.width),
        ) -
          0.5) *
        22;
      pointerY =
        (Math.min(
          1,
          Math.max(0, (event.clientY - bounds.top) / bounds.height),
        ) -
          0.5) *
        14;
      queue();
    };
    const reset = () => {
      pointerX = 0;
      pointerY = 0;
      queue();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting;
      scene.classList.toggle("is-offscreen", !visible);
      if (visible) queue();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
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
    <div
      className={`space-landscape space-landscape--cinematic${paused ? " is-paused" : ""}`}
      ref={sceneRef}
      aria-hidden="true"
    >
      <div className="space-nebula" />
      <DeferredGalaxy paused={paused} />
      <svg
        className="space-starmap"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g className="space-stars" fill="var(--star-color)">
          {STARS.map((star, index) => (
            <circle
              key={index}
              cx={star.x}
              cy={star.y}
              r={star.r * 0.65}
              opacity={index % 3 === 0 ? 0.45 : 0.18}
            />
          ))}
        </g>
      </svg>
      <div className="space-planet-layer">
        <ResponsiveImage
          variants={homeImages["cinematic-moon"]}
          mobileMax={480}
          sizes="(max-width: 760px) 430px, (max-width: 1000px) 69vw, min(59vw, 850px)"
          alt=""
          width="1254"
          height="1254"
          fetchPriority="auto"
          decoding="async"
        />
      </div>
      <div className="space-horizon-light" />
      <div className="space-moonscape">
        <div className="space-moon-plane space-moon-plane--back">
          <picture style={{ display: "contents" }}>
            <source media="(max-width: 760px)" srcSet={mobileTerrain} />
            <img
              src={homeImages["moon-back"][0]!.src}
              srcSet={homeImages["moon-back"]
                .map((image) => `${image.src} ${image.width}w`)
                .join(", ")}
              sizes="112vw"
              fetchPriority="high"
              alt=""
              width="2172"
              height="703"
              decoding="async"
            />
          </picture>
        </div>
        <div className="space-moon-plane space-moon-plane--middle">
          <picture style={{ display: "contents" }}>
            <source
              media="(max-width: 760px)"
              srcSet="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'/%3E"
            />
            <img
              src={homeImages["moon-middle"][0]!.src}
              srcSet={homeImages["moon-middle"]
                .map((image) => `${image.src} ${image.width}w`)
                .join(", ")}
              sizes="112vw"
              fetchPriority="low"
              alt=""
              width="2172"
              height="287"
              decoding="async"
            />
          </picture>
        </div>
        <div className="space-moon-plane space-moon-plane--front">
          <picture style={{ display: "contents" }}>
            <source
              media="(max-width: 760px)"
              srcSet="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1'%20height='1'/%3E"
            />
            <img
              src={homeImages["moon-front"][0]!.src}
              srcSet={homeImages["moon-front"]
                .map((image) => `${image.src} ${image.width}w`)
                .join(", ")}
              sizes="112vw"
              fetchPriority="low"
              alt=""
              width="2172"
              height="317"
              decoding="async"
            />
          </picture>
        </div>
      </div>
      <div className="space-ground-fade" />
      <svg
        className="space-survey"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g
          fill="none"
          stroke="var(--studio-mint)"
          strokeWidth=".65"
          opacity=".25"
        >
          <path d="M1110 204h32m-16-16v32M818 613h18m-9-9v18" />
          <path d="M1130 236v45m-300 322 258-315" strokeDasharray="1 7" />
          <circle cx="1126" cy="204" r="68" strokeDasharray="1 12" />
        </g>
      </svg>
      <div className="space-film-grain" />
    </div>
  );
}
