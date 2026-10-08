import { useEffect, useRef, useState, type ReactNode } from "react";
import { LayoutGrid, MessageCircle, Wrench } from "lucide-react";
import ActionFeedback from "@/components/kamrok/ActionFeedback";

import { Link } from "@/lib/router-compat";
import monkeyFilm from "@/assets/home-monkey-space.mp4.asset.json";

/** The video always stays paused. Scrolling, rather than a playback clock, selects its frame. */
export default function ScrollFilm({ source = monkeyFilm.url, poster, id = "film-title", className = "", children }: { source?: string; poster?: string; id?: string; className?: string; children?: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setLoad(true); observer.disconnect(); }
    }, { rootMargin: "500px" });
    observer.observe(section);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    preference.addEventListener("change", update);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !load) return;
    let frame = 0;
    let targetTime = 0;
    const seek = () => {
      if (video.readyState < 1 || video.seeking || !Number.isFinite(video.duration)) return;
      if (Math.abs(video.currentTime - targetTime) > .035) video.currentTime = targetTime;
    };
    const paint = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - window.innerHeight);
      const progress = reduced ? .15 : Math.min(1, Math.max(0, -bounds.top / travel));
      if (Number.isFinite(video.duration)) {
        targetTime = Math.min(Math.max(0, video.duration - .05), Math.max(.04, progress * video.duration));
        seek();
      }
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const stayPaused = () => video.pause();
    video.pause();
    video.addEventListener("loadedmetadata", paint);
    video.addEventListener("seeked", seek);
    video.addEventListener("play", stayPaused);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      video.removeEventListener("loadedmetadata", paint);
      video.removeEventListener("seeked", seek);
      video.removeEventListener("play", stayPaused);
      video.pause();
    };
  }, [load, reduced]);

  return (
    <section ref={sectionRef} className={`orbit-film ${className}${reduced || failed ? " orbit-film--still" : ""}${ready ? " is-ready" : ""}`} aria-labelledby={id}>
      <div className="orbit-film-sticky" aria-hidden="true">
        <video ref={videoRef} className="orbit-film-video" src={load ? source : undefined} poster={poster} muted playsInline preload="auto" disablePictureInPicture aria-hidden="true" tabIndex={-1} onLoadedData={() => setReady(true)} onError={() => setFailed(true)} />
        <div className="orbit-film-shade" />
      </div>
      <div className="orbit-film-stories studio-container">
        {children ?? <><article className="orbit-film-chapter">
          <span className="orbit-eyebrow">LOOK DIFFERENT. MEAN SOMETHING.</span>
          <h2 id={id}>Make them look.<br /><em>Make it matter.</em></h2>
          <p>Your website should make it easy to understand what you do, why it matters and how to work with you. A memorable first impression, with a clear next step.</p>
          <Link className="orbit-text-link cinematic-action" to="/work">See what that looks like <ActionFeedback icon={LayoutGrid} /></Link>
        </article>
        <article className="orbit-film-chapter">
          <span className="orbit-eyebrow">GOOD ON A PHONE. GREAT FOR YOUR BUSINESS.</span>
          <h2>Less friction.<br /><em>More possibility.</em></h2>
          <p>Quick pages. Clear journeys. Buttons you can actually reach. From the first tap to an enquiry or a sale, every detail should help your visitors get somewhere.</p>
          <Link className="orbit-text-link cinematic-action" to="/skills">Explore what I can help with <ActionFeedback icon={Wrench} /></Link>
        </article>
        <article className="orbit-film-chapter">
          <span className="orbit-eyebrow">BUILT FOR WHAT COMES NEXT</span>
          <h2>Your next chapter.<br /><em>Ready when you are.</em></h2>
          <p>A site you can update. An app you can build on. Useful connections that save you time. I’ll help you launch with confidence, then keep improving as your business grows.</p>
          <Link className="orbit-text-link cinematic-action" to="/contact">Tell me what you’re thinking <ActionFeedback icon={MessageCircle} /></Link>
        </article></>}
      </div>
    </section>
  );
}
