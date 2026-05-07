import { useEffect, useRef } from "react";
import Hls from "hls.js";
import gsap from "gsap";

const VIDEO_SRC = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
const SOCIALS = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
];

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(v);
    } else if (v.canPlayType("application/vnd.apple.mpegurl")) {
      v.src = VIDEO_SRC;
    }
    return () => hls?.destroy();
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, []);

  const phrase = "BUILDING THE FUTURE • ".repeat(10);

  return (
    <footer id="resume" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 scale-y-[-1]"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10">
        <div className="overflow-hidden py-10">
          <div ref={marqueeRef} className="whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-display text-text-primary/90">
            {phrase}{phrase}
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 text-center py-16">
          <div className="text-xs text-pl-muted uppercase tracking-[0.3em] mb-6">Get in touch</div>
          <h2 className="text-5xl md:text-7xl text-text-primary font-light mb-10">
            Let's <span className="font-display">build</span> something.
          </h2>
          <a
            href="mailto:hello@michaelsmith.com"
            className="group relative inline-flex items-center gap-2 rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all hover:scale-105"
          >
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity" style={{ padding: 2 }}>
              <span className="block w-full h-full rounded-full bg-bg" />
            </span>
            <span className="relative">hello@michaelsmith.com</span>
          </a>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-stroke pt-6">
          <div className="flex items-center gap-5 text-sm text-pl-muted">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-text-primary transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-pl-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            Available for projects
          </div>
        </div>
      </div>
    </footer>
  );
}
