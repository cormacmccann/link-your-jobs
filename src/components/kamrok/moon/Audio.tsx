import { useEffect, useRef } from "react";
import { MOON_ASSETS } from "@/config/moonAssets";

export default function MoonAudio({
  music,
  sound,
  speed,
}: {
  music: boolean;
  sound: boolean;
  speed: number;
}) {
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const engineRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const m = new Audio(MOON_ASSETS.music);
    m.loop = true;
    m.volume = 0.35;
    musicRef.current = m;
    const e = new Audio(MOON_ASSETS.engine);
    e.loop = true;
    e.volume = 0;
    engineRef.current = e;
    return () => {
      m.pause();
      e.pause();
    };
  }, []);

  useEffect(() => {
    const m = musicRef.current;
    if (!m) return;
    if (music) m.play().catch(() => undefined);
    else m.pause();
  }, [music]);

  useEffect(() => {
    const e = engineRef.current;
    if (!e) return;
    if (sound) e.play().catch(() => undefined);
    else e.pause();
  }, [sound]);

  useEffect(() => {
    const e = engineRef.current;
    if (!e || !sound) return;
    const norm = Math.min(1, speed / 28);
    e.volume = 0.15 + norm * 0.45;
    e.playbackRate = 0.7 + norm * 1.2;
  }, [speed, sound]);

  return null;
}
