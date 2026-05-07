import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const VIDEO_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;
    }
    return () => {
      hls?.destroy();
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );
      tl.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        "<"
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="relative w-screen h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="blur-in text-xs text-pl-muted uppercase tracking-[0.3em] mb-8">
          COLLECTION '26
        </div>
        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display leading-[0.9] tracking-tight text-text-primary mb-6">
          Michael Smith
        </h1>
        <div className="blur-in text-lg md:text-xl text-text-primary mb-6">
          A{" "}
          <span
            key={roleIdx}
            className="font-display text-text-primary animate-role-fade-in inline-block"
          >
            {ROLES[roleIdx]}
          </span>{" "}
          lives in Chicago.
        </div>
        <div className="blur-in flex flex-col items-center gap-4 mb-10">
          <div className="text-[10px] uppercase tracking-[0.3em] text-pl-muted">Built with</div>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 max-w-xl">
            {[
              { name: "Lovable", slug: "lovable" },
              { name: "WordPress", slug: "wordpress" },
              { name: "Anthropic", slug: "anthropic" },
              { name: "Claude", slug: "claude" },
              { name: "Gemini", slug: "googlegemini" },
              { name: "TypeScript", slug: "typescript" },
            ].map((t) => (
              <img
                key={t.name}
                src={`https://cdn.simpleicons.org/${t.slug}/ffffff`}
                alt={t.name}
                title={t.name}
                className="h-5 md:h-6 w-auto opacity-70 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <p className="blur-in text-sm md:text-base text-pl-muted max-w-md mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <a
            href="#work"
            className="group relative rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 2 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative">See Works</span>
          </a>
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 2 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative">Reach out...</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-pl-muted uppercase tracking-[0.2em]">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
