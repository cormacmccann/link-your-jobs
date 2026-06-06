// Central asset URL map. All assets are hosted on Lovable CDN.
import alienIdle from "@/assets/moon/alien_idle.glb.asset.json";
import alienRun from "@/assets/moon/alien_run.glb.asset.json";
import alienWalk from "@/assets/moon/alien_walk.glb.asset.json";
import alienWave from "@/assets/moon/alien_wave.glb.asset.json";
import chimp from "@/assets/moon/chimp.glb.asset.json";
import engine from "@/assets/moon/engine.mp3.asset.json";
import groundColor from "@/assets/moon/groundColor.jpg.asset.json";
import groundNormal from "@/assets/moon/groundNormal.jpg.asset.json";
import groundRough from "@/assets/moon/groundRough.jpg.asset.json";
import music from "@/assets/moon/music.mp3.asset.json";
import platform from "@/assets/moon/platform.glb.asset.json";
import rock4 from "@/assets/moon/rock4.glb.asset.json";
import rock7 from "@/assets/moon/rock7.glb.asset.json";
import rockColor from "@/assets/moon/rockColor.jpg.asset.json";
import rockNormal from "@/assets/moon/rockNormal.jpg.asset.json";
import ship from "@/assets/moon/ship.glb.asset.json";
import termL from "@/assets/moon/termL.glb.asset.json";
import termS from "@/assets/moon/termS.glb.asset.json";
import trackColor from "@/assets/moon/trackColor.jpg.asset.json";

export const MOON_ASSETS = {
  alienIdle: alienIdle.url,
  alienRun: alienRun.url,
  alienWalk: alienWalk.url,
  alienWave: alienWave.url,
  chimp: chimp.url,
  engine: engine.url,
  groundColor: groundColor.url,
  groundNormal: groundNormal.url,
  groundRough: groundRough.url,
  music: music.url,
  platform: platform.url,
  rock4: rock4.url,
  rock7: rock7.url,
  rockColor: rockColor.url,
  rockNormal: rockNormal.url,
  ship: ship.url,
  termL: termL.url,
  termS: termS.url,
  trackColor: trackColor.url,
} as const;
