import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import { useStudioTheme } from "@/hooks/useStudioTheme";
import { vertexShader, fragmentShader } from "./galaxyShaders";
import "@/styles/galaxy.css";

/** Transparent, decorative galaxy. Render only while visible; leave a still frame when paused. */
export default function Galaxy({ paused = false, className = "" }: { paused?: boolean; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { theme } = useStudioTheme();
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const surface = host.closest<HTMLElement>(".space-hero, .studio-footer") ?? host;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let renderer: Renderer | undefined;
    let program: Program;
    let geometry: Triangle;
    let mesh: Mesh;
    let frame = 0, previous = 0, time = 0;
    let visible = false, failed = false;
    let targetX = .5, targetY = .5, targetActive = 0;
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; };
    const moving = () => !paused && !reduced.matches && !document.hidden;
    const resize = () => {
      if (!renderer) return;
      renderer.setSize(Math.max(1, host.clientWidth), Math.max(1, host.clientHeight));
      program.uniforms.uResolution.value = new Float32Array([renderer.gl.canvas.width, renderer.gl.canvas.height, host.clientWidth / Math.max(1, host.clientHeight)]);
      if (visible && !document.hidden) renderer.render({ scene: mesh });
    };
    const init = () => {
      if (renderer || failed) return;
      try {
        renderer = new Renderer({ alpha: true, premultipliedAlpha: false, dpr: 1, antialias: false, powerPreference: "low-power" });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        geometry = new Triangle(gl);
        program = new Program(gl, {
          vertex: vertexShader, fragment: fragmentShader,
          uniforms: {
            uTime: { value: 0 }, uResolution: { value: new Float32Array([1, 1, 1]) },
            uFocal: { value: new Float32Array([.5, .5]) }, uRotation: { value: new Float32Array([1, 0]) },
            uStarSpeed: { value: .5 }, uDensity: { value: 1.1 }, uHueShift: { value: 110 },
            uSpeed: { value: .3 }, uMouse: { value: new Float32Array([.5, .5]) },
            uGlowIntensity: { value: .2 }, uSaturation: { value: 1 }, uMouseRepulsion: { value: true },
            uTwinkleIntensity: { value: .2 }, uRotationSpeed: { value: .05 }, uRepulsionStrength: { value: .5 },
            uMouseActiveFactor: { value: 0 }, uAutoCenterRepulsion: { value: 0 },
            uTransparent: { value: true }, uLightMode: { value: theme === "light" ? 1 : 0 },
          },
        });
        mesh = new Mesh(gl, { geometry, program });
        const canvas = gl.canvas as HTMLCanvasElement;
        canvas.setAttribute("aria-hidden", "true");
        canvas.addEventListener("webglcontextlost", lost);
        host.appendChild(canvas);
        resize();
        host.dataset.ready = "true";
      } catch {
        failed = true;
        stop();
        host.dataset.ready = "false";
        renderer?.gl.getExtension("WEBGL_lose_context")?.loseContext();
        renderer = undefined;
        host.replaceChildren();
      }
    };
    const update = (now: number) => {
      frame = 0;
      if (!renderer || !visible || !moving() || failed) return;
      // Cap this background effect at 30fps and freeze elapsed time while offscreen.
      if (!previous || now - previous >= 1000 / 30) {
        time += previous ? Math.min(now - previous, 100) / 1000 : 0;
        previous = now;
        program.uniforms.uTime.value = time;
        program.uniforms.uStarSpeed.value = .5 + time * .05;
        const mouse = program.uniforms.uMouse.value;
        mouse[0] += (targetX - mouse[0]) * .09;
        mouse[1] += (targetY - mouse[1]) * .09;
        program.uniforms.uMouseActiveFactor.value += (targetActive - program.uniforms.uMouseActiveFactor.value) * .09;
        renderer.render({ scene: mesh });
      }
      frame = requestAnimationFrame(update);
    };
    const sync = () => {
      stop();
      if (!visible || document.hidden || failed) return;
      init();
      if (!renderer) return;
      program.uniforms.uMouseActiveFactor.value = 0;
      renderer.render({ scene: mesh });
      if (moving()) frame = requestAnimationFrame(update);
    };
    function lost(event: Event) { event.preventDefault(); failed = true; stop(); host!.dataset.ready = "false"; }
    const move = (event: PointerEvent) => {
      if (!fine.matches || !moving()) return;
      const bounds = host.getBoundingClientRect();
      targetX = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
      targetY = 1 - Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));
      targetActive = 1;
    };
    const leave = () => { targetActive = 0; };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    const size = new ResizeObserver(resize);
    intersection.observe(host); size.observe(host);
    surface.addEventListener("pointermove", move, { passive: true });
    surface.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      stop(); intersection.disconnect(); size.disconnect();
      surface.removeEventListener("pointermove", move);
      surface.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
      if (renderer) {
        (renderer.gl.canvas as HTMLCanvasElement).removeEventListener("webglcontextlost", lost);
        geometry?.remove();
        if (program) renderer.gl.deleteProgram(program.program);
        renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      host.replaceChildren();
    };
  }, [paused, theme]);
  return <div className={`studio-galaxy ${className}`} ref={hostRef} aria-hidden="true" />;
}
