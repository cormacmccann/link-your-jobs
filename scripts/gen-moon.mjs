/**
 * gen-moon.mjs — port the proven KAMROK moonscape (public/index-kamrok.html)
 * into a React-mountable module + scoped CSS + markup string.
 *
 * The reference is a self-contained three.js r128 page with assets inlined as
 * base64. This script reproduces it faithfully, applying only mechanical
 * adaptations so it runs as a React component inside this Vite + three 0.160 app:
 *   - GLTFLoader from three-stdlib; a parse()->load() shim so the existing
 *     `loader.parse(b64buf(data), ...)` call-sites load CDN URLs unchanged
 *   - assets sourced from MOON_ASSETS (mirrored on the Lovable CDN)
 *   - modern-three colour-space API (sRGBEncoding -> SRGBColorSpace)
 *   - window/RAF/timer listener tracking so the scene tears down on unmount
 *
 * Regenerate with:  node scripts/gen-moon.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const SRC = resolve(root, "public/index-kamrok.html");
const html = readFileSync(SRC, "utf8");

/* ---------- 1. CSS ---------- */
let css = html.split("<style>")[1].split("</style>")[0];
css =
  "/* AUTO-GENERATED from public/index-kamrok.html via scripts/gen-moon.mjs — do not hand-edit. */\n" +
  "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap');\n" +
  css.trim() +
  "\n";
const cssPath = resolve(root, "src/styles/kamrok-moon.css");
writeFileSync(cssPath, css);

/* ---------- 2. body markup ---------- */
let markup = html.split("<body>")[1].split("<script")[0];
// point the "view full page" / intro links at the React routes
markup = markup.replace(/href="(about|work|skills|contact)\.html"/g, 'href="/$1"');
// escape for safe embedding in a template literal
const esc = markup.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
const markupOut =
  "// AUTO-GENERATED from public/index-kamrok.html via scripts/gen-moon.mjs — do not hand-edit.\n" +
  "export const MOON_MARKUP = `" +
  esc +
  "`;\n";
const markupPath = resolve(root, "src/components/kamrok/moon/moonMarkup.ts");
mkdirSync(dirname(markupPath), { recursive: true });
writeFileSync(markupPath, markupOut);

/* ---------- 3. scene script ---------- */
let body = html.split("<script>").pop().split("</script>")[0].trim();

// strip the IIFE wrapper + the window.THREE alias (we provide T ourselves)
body = body.replace(
  /^\(function\s*\(\)\s*\{\s*"use strict";\s*const\s+T\s*=\s*window\.THREE;/,
  ""
);
body = body.replace(/\}\)\(\);\s*$/, "");

const before = body;
// modern-three colour space API
body = body.split("renderer.outputEncoding").join("renderer.outputColorSpace");
body = body.split("t.encoding=T.sRGBEncoding").join("t.colorSpace=T.SRGBColorSpace");
body = body.split("T.sRGBEncoding").join("T.SRGBColorSpace");
// neutralise base64 helpers — assets are URLs now (parse() shim routes to load())
body = body.replace(/function b64buf\(d\)\{[^}]*\}/g, "function b64buf(d){return d;}");
// neutralise base64-length guards (URLs are short)
body = body.split("data.length<100").join("false");
body = body.split(".length>100").join("");
// window event listeners -> tracked __on() so they unbind on unmount
body = body.replace(/(?<![\w.])addEventListener\(/g, "__on(");
// requestAnimationFrame loops -> disposable
body = body.replace(
  /function animate\(\)\{\s*requestAnimationFrame\(animate\);/,
  "function animate(){if(__disposed)return;__rafId=requestAnimationFrame(animate);"
);
body = body.replace(
  /if\(life<26&&mode==='space'\)requestAnimationFrame\(tk\);/,
  "if(life<26&&mode==='space'&&!__disposed)requestAnimationFrame(tk);"
);
body = body.replace(
  /setTimeout\(\(\)=>\{\s*clearInterval\(mInt\);\s*loader\.classList\.add\('gone'\);\s*animate\(\);\s*\},1700\);/,
  "__t1=setTimeout(()=>{if(__disposed)return;clearInterval(mInt);loader.classList.add('gone');animate();},1700);"
);

// sanity: make sure the key transforms actually fired
const checks = [
  ["outputColorSpace", body.includes("renderer.outputColorSpace")],
  ["no sRGBEncoding", !body.includes("sRGBEncoding")],
  ["b64buf passthrough", body.includes("function b64buf(d){return d;}")],
  ["__on rewired", body.includes("__on('wheel'") || body.includes('__on("wheel"')],
  ["animate guarded", body.includes("function animate(){if(__disposed)return;")],
  ["boot guarded", body.includes("__t1=setTimeout(")],
];
const failed = checks.filter(([, ok]) => !ok);
if (failed.length || body === before) {
  console.error("TRANSFORM CHECK FAILED:", failed.map((f) => f[0]));
  process.exit(1);
}

const header = `// @ts-nocheck
/* eslint-disable */
// AUTO-GENERATED from public/index-kamrok.html via scripts/gen-moon.mjs — do not hand-edit.
// Faithful port of the KAMROK moonscape, adapted to run as a React component
// (three 0.160 + three-stdlib GLTFLoader, assets from the Lovable CDN).
import * as THREE from "three";
import { GLTFLoader } from "three-stdlib";
import { MOON_ASSETS } from "@/config/moonAssets";

export function startMoonExperience(): () => void {
  // THREE is a frozen ES-module namespace; make a mutable copy so we can hang
  // GLTFLoader off it the way the original (window.THREE) build did.
  const T: any = { ...THREE };
  T.GLTFLoader = GLTFLoader;
  (window as any).THREE = T;
  // route the reference's loader.parse(urlString, "", onLoad, onError) calls to loader.load(url, ...)
  const _origParse = (GLTFLoader as any).prototype.parse;
  (GLTFLoader as any).prototype.parse = function (data: any, path: any, onLoad: any, onError: any) {
    if (typeof data === "string") return (this as any).load(data, onLoad, undefined, onError);
    return _origParse.call(this, data, path, onLoad, onError);
  };
  // assets -> CDN urls (mirrored on the Lovable CDN via MOON_ASSETS)
  (window as any).TEX = { groundColor: MOON_ASSETS.groundColor, groundNormal: MOON_ASSETS.groundNormal, groundRough: MOON_ASSETS.groundRough, rockColor: MOON_ASSETS.rockColor, rockNormal: MOON_ASSETS.rockNormal, trackColor: MOON_ASSETS.trackColor };
  (window as any).CHIMP_GLB = MOON_ASSETS.chimp;
  (window as any).SHIP_GLB = MOON_ASSETS.ship;
  (window as any).ENGINE_SND = MOON_ASSETS.engine;
  (window as any).MUSIC = MOON_ASSETS.music;
  (window as any).ALIEN = { idle: MOON_ASSETS.alienIdle, walk: MOON_ASSETS.alienWalk, run: MOON_ASSETS.alienRun, wave: MOON_ASSETS.alienWave };
  (window as any).PROPS = { rock7: MOON_ASSETS.rock7, rock4: MOON_ASSETS.rock4, platform: MOON_ASSETS.platform, termL: MOON_ASSETS.termL, termS: MOON_ASSETS.termS };
  (window as any).WORLD_GLB = ""; (window as any).WORLD_HF = ""; (window as any).WORLD_C = "";

  // ---- React lifecycle scaffolding (unbinds everything on unmount) ----
  let __disposed = false, __rafId = 0, __t1: any = 0;
  const __cleanups: Array<() => void> = [];
  function __on(type: string, fn: any, opts?: any) {
    window.addEventListener(type, fn, opts);
    __cleanups.push(() => window.removeEventListener(type, fn, opts));
  }

  // ============================ ported scene ============================
`;

const footer = `
  // ========================== end ported scene =========================
  return () => {
    __disposed = true;
    try { cancelAnimationFrame(__rafId); } catch (e) {}
    try { clearTimeout(__t1); } catch (e) {}
    try { clearInterval(mInt); } catch (e) {}
    __cleanups.forEach((f) => { try { f(); } catch (e) {} });
    try { (engine as any) && (engine as any).pause(); } catch (e) {}
    try { (music as any) && (music as any).pause(); } catch (e) {}
    [nodesWrap, flashEl, spaceHud, spScore, spCtrl].forEach((n: any) => { try { n && n.remove && n.remove(); } catch (e) {} });
    try { document.body.classList.remove("space-mode", "is-touch"); } catch (e) {}
    try { (renderer as any).domElement && (renderer as any).domElement.remove(); } catch (e) {}
    try { (renderer as any).dispose && (renderer as any).dispose(); } catch (e) {}
  };
}
`;

const out = header + body + footer;
const scenePath = resolve(root, "src/components/kamrok/moon/moonEngine.ts");
writeFileSync(scenePath, out);

console.log("Generated:");
console.log("  src/styles/kamrok-moon.css          (" + css.split("\n").length + " lines)");
console.log("  src/components/kamrok/moon/moonMarkup.ts");
console.log("  src/components/kamrok/moon/moonEngine.ts (" + out.split("\n").length + " lines)");
console.log("Transform checks: all passed.");
