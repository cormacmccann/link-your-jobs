import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SHOTS = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&q=80",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80",
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800&q=80",
  "https://images.unsplash.com/photo-1492724724894-7464c27d0ceb?w=800&q=80",
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        pinSpacing: false,
      });
      gsap.to(colARef.current, {
        y: -200,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(colBRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const left = SHOTS.slice(0, 3);
  const right = SHOTS.slice(3);

  return (
    <section ref={sectionRef} className="relative bg-bg min-h-[300vh]">
      <div ref={contentRef} className="absolute inset-x-0 top-0 h-screen z-10 flex items-center justify-center pointer-events-none">
        <div className="text-center px-6 max-w-xl pointer-events-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-pl-muted uppercase tracking-[0.3em]">Explorations</span>
            <span className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-light">
            Visual <span className="font-display">playground</span>
          </h2>
          <p className="mt-4 text-pl-muted">
            Loose experiments, type studies and side quests.
          </p>
          <a
            href="https://dribbble.com"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center gap-2 mt-6 rounded-full text-sm px-5 py-3 border border-stroke text-text-primary"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 1 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative inline-flex items-center gap-2">
              See more on Dribbble <span aria-hidden>↗</span>
            </span>
          </a>
        </div>
      </div>

      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pt-[20vh]">
        <div className="grid grid-cols-2 gap-12 md:gap-40">
          <div ref={colARef} className="space-y-12 md:space-y-20">
            {left.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                className="block w-full aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface"
                style={{ transform: `rotate(${i % 2 === 0 ? -2 : 3}deg)` }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div ref={colBRef} className="space-y-12 md:space-y-20 mt-32 ml-auto">
            {right.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightbox(src)}
                className="block w-full aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke bg-surface"
                style={{ transform: `rotate(${i % 2 === 0 ? 3 : -2}deg)` }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out"
        >
          <img src={lightbox} alt="" className="max-h-[90vh] max-w-[90vw] rounded-2xl" />
        </div>
      )}
    </section>
  );
}
