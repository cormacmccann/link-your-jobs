import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CLIENTS = [
  "Digital Screen Displays",
  "Clubrovia",
  "Kodiak",
  "Northern Forge",
  "Dundalk FC",
  "Ironclad Studio",
  "Silvermoor",
  "Atlas & Co.",
];

export default function ClientLogoStrip() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".client-logo",
        { opacity: 0, y: 12 },
        {
          opacity: 0.55,
          y: 0,
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 85%",
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative border-y border-stroke bg-bg py-10 md:py-14"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-pl-muted">
            Selected Clients · 2011 — 2026
          </span>
          <span className="h-px w-8 bg-stroke" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-14">
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="client-logo font-display italic text-lg md:text-2xl text-text-primary opacity-0 hover:opacity-100 transition-opacity"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
