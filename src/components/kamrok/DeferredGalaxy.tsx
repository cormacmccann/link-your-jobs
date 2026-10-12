import { lazy, Suspense, useEffect, useRef, useState } from "react";
import "@/styles/galaxy.css";

const Galaxy = lazy(() => import("./Galaxy"));

/** Keep the CSS starfield visible while the optional WebGL background waits. */
export default function DeferredGalaxy({
  paused = false,
}: {
  paused?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    );
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let idle: number | undefined;
    let nearby = false;
    let interacted = false;
    const cancel = () => {
      clearTimeout(timer);
      if (idle !== undefined) window.cancelIdleCallback?.(idle);
      window.removeEventListener("load", enableWhenIdle);
    };
    function enableWhenIdle() {
      if (
        !nearby ||
        !interacted ||
        !desktop.matches ||
        paused ||
        reduced.matches ||
        connection?.saveData
      )
        return;
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setEnabled(true), {
          timeout: 2000,
        });
      } else {
        timer = setTimeout(() => setEnabled(true), 700);
      }
    }
    const schedule = () => {
      cancel();
      if (
        paused ||
        reduced.matches ||
        !desktop.matches ||
        connection?.saveData
      ) {
        setEnabled(false);
        return;
      }
      if (document.readyState === "complete") enableWhenIdle();
      else window.addEventListener("load", enableWhenIdle, { once: true });
    };
    const interact = (event: PointerEvent) => {
      if (event.pointerType === "touch" || !desktop.matches || interacted)
        return;
      interacted = true;
      schedule();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearby = !!entry?.isIntersecting;
        schedule();
      },
      { rootMargin: "150px" },
    );
    observer.observe(host);
    reduced.addEventListener("change", schedule);
    desktop.addEventListener("change", schedule);
    const surface = host.closest(".space-hero, .studio-footer") ?? host;
    surface.addEventListener("pointermove", interact as EventListener, {
      passive: true,
    });
    return () => {
      cancel();
      observer.disconnect();
      reduced.removeEventListener("change", schedule);
      desktop.removeEventListener("change", schedule);
      surface.removeEventListener("pointermove", interact as EventListener);
    };
  }, [paused]);
  return (
    <div
      ref={hostRef}
      className="studio-galaxy"
      data-ready={enabled ? "true" : undefined}
      aria-hidden="true"
    >
      {enabled && (
        <Suspense fallback={null}>
          <Galaxy paused={paused} />
        </Suspense>
      )}
    </div>
  );
}
