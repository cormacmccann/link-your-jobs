import { useEffect, useRef, useState } from "react";
import { useStudioTheme } from "@/hooks/useStudioTheme";

/** The two portraits share a transform; only the robot's circular mask moves. */
export default function ChimpHero({ paused }: { paused: boolean }) {
  const { theme } = useStudioTheme();
  const [ready, setReady] = useState(false);
  const [loadRobot, setLoadRobot] = useState(false);
  const portraitRef = useRef<HTMLImageElement>(null);
  const artRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Server-rendered images can finish loading before React attaches onLoad.
    const portrait = portraitRef.current;
    if (portrait?.complete && portrait.naturalWidth > 0) setReady(true);
  }, [theme]);
  useEffect(() => {
    const art = artRef.current;
    const hero = art?.closest(".space-hero");
    if (!art || !hero) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let x = 0,
      y = 0;
    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      art.classList.remove("is-revealing");
    };
    const paint = () => {
      frame = 0;
      const bounds = art.getBoundingClientRect();
      if (
        x < bounds.left ||
        x > bounds.right ||
        y < bounds.top ||
        y > bounds.bottom
      ) {
        hide();
        return;
      }
      art.style.setProperty(
        "--reveal-x",
        `${((x - bounds.left) / bounds.width) * 100}%`,
      );
      art.style.setProperty(
        "--reveal-y",
        `${((y - bounds.top) / bounds.height) * 100}%`,
      );
      setLoadRobot(true);
      art.classList.add("is-revealing");
    };
    const move = (event: Event) => {
      const pointer = event as PointerEvent;
      if (
        paused ||
        reduced.matches ||
        !finePointer.matches ||
        pointer.pointerType === "touch" ||
        (pointer.target as Element).closest("a,button,summary")
      ) {
        hide();
        return;
      }
      x = pointer.clientX;
      y = pointer.clientY;
      if (!frame) frame = requestAnimationFrame(paint);
    };
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    window.addEventListener("scroll", hide, { passive: true });
    finePointer.addEventListener("change", hide);
    return () => {
      hide();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      window.removeEventListener("scroll", hide);
      finePointer.removeEventListener("change", hide);
    };
  }, [paused]);
  return (
    <div
      className={`space-hero-chimp${ready ? " is-ready" : ""}${paused ? " is-paused" : ""}`}
      aria-hidden="true"
    >
      <div className="space-chimp-art" ref={artRef}>
        <img
          ref={portraitRef}
          src={`/art/orbit/chimp-hero-${theme}-800.webp`}
          srcSet={`/art/orbit/chimp-hero-${theme}-480.webp 480w, /art/orbit/chimp-hero-${theme}-800.webp 800w, /art/orbit/chimp-hero-${theme}-1200.webp 1200w`}
          sizes="(max-width: 760px) min(100vw, 570px), (max-width: 1000px) 62vw, min(58vw, 920px)"
          alt=""
          width="1265"
          height="1244"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setReady(true)}
        />
        {loadRobot && (
          <img
            className="space-chimp-reveal"
            src="/art/orbit/chimp-hero-robot-800.webp"
            srcSet="/art/orbit/chimp-hero-robot-480.webp 480w, /art/orbit/chimp-hero-robot-800.webp 800w, /art/orbit/chimp-hero-robot-1200.webp 1200w"
            sizes="(max-width: 760px) min(100vw, 570px), min(58vw, 920px)"
            fetchPriority="low"
            alt=""
            width="1265"
            height="1244"
            decoding="async"
          />
        )}
      </div>
    </div>
  );
}
