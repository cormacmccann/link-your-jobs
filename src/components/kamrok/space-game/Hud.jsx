import React, { useEffect, useMemo, useRef, useState } from 'react'
import useStore, { PROJECTS } from './store'

/**
 * KAMROK-skinned HUD. Replaces the demo's styled-components/Teko look with our
 * mono/serif voice so we don't need to ship styled-components.
 */
export default function Hud() {
  const points = useStore((s) => s.points)
  const health = useStore((s) => s.health)
  const sound = useStore((s) => s.sound)
  const boosting = useStore((s) => s.boosting)
  const recovered = useStore((s) => s.recovered)
  const revealed = useStore((s) => s.revealed)
  const toggle = useStore((s) => s.actions.toggleSound)

  // brief fly-past reveal flash
  const [flash, setFlash] = useState(null)
  useEffect(() => {
    if (!revealed) return
    setFlash(revealed)
    const id = setTimeout(() => setFlash(null), 2800)
    return () => clearTimeout(id)
  }, [revealed && revealed.id])
  const complete = recovered.length >= PROJECTS.length

  const seconds = useRef(null)
  useEffect(() => {
    const t = Date.now()
    const i = setInterval(() => {
      if (seconds.current) seconds.current.innerText = ((Date.now() - t) / 1000).toFixed(1)
    }, 100)
    return () => clearInterval(i)
  }, [])

  const score = useMemo(
    () => (points >= 1000 ? (points / 1000).toFixed(1) + 'K' : String(points).padStart(4, '0')),
    [points],
  )

  return (
    <div style={ui.layer}>
      <button type="button" onClick={() => toggle()} style={{ ...ui.chip, ...ui.topLeft }}>
        <span style={ui.dim}>AUDIO</span>
        <span style={ui.val}>{sound ? 'ON' : 'OFF'}</span>
      </button>

      <div style={{ ...ui.chip, ...ui.topRight }}>
        <span style={ui.dim}>KAMROK · ORBIT RUN</span>
        <span style={ui.dim}>MOUSE AIM · CLICK FIRE</span>
      </div>

      {/* projects-recovered counter */}
      <div style={{ ...ui.chip, ...ui.topCenter }}>
        <span style={ui.dim}>{complete ? '✦ ALL SIGNALS RECOVERED' : 'PROJECTS RECOVERED'}</span>
        {!complete && <span style={ui.gold}>{recovered.length}/{PROJECTS.length}</span>}
      </div>

      {/* fly-past reveal flash */}
      <style>{'@keyframes kkReveal{0%{opacity:0;transform:translate(-50%,10px) scale(.96)}12%{opacity:1;transform:translate(-50%,0) scale(1)}78%{opacity:1}100%{opacity:0}}'}</style>
      {flash && (
        <div key={flash.id} style={ui.reveal}>
          <div style={ui.revealKicker}>✦ SIGNAL RECOVERED</div>
          <div style={ui.revealName}>{flash.project}</div>
        </div>
      )}

      <div style={ui.lowerLeft}>
        <div style={ui.timer} ref={seconds}>0.0</div>
        <div style={ui.score}>{score}</div>
        <div style={ui.dim}>ANOMALIES NEUTRALISED</div>
      </div>

      <div style={ui.lowerRight}>
        <div style={ui.dim}>HULL</div>
        <div style={ui.bar}>
          <div style={{ ...ui.barFill, width: Math.max(0, Math.min(100, health)) + '%' }} />
        </div>
      </div>

      <div style={ui.lowerCenter}>
        {boosting && (
          <div style={{ ...ui.dim, color: accentPink, opacity: 1, marginBottom: 6, fontSize: 11 }}>
            ◆ BOOST ACTIVE
          </div>
        )}
        <div style={ui.dim}>QUICK TRAVEL</div>
        <div style={ui.travelRow}>
          {[
            { label: 'α SECTOR', t: 0.2 },
            { label: 'β SECTOR', t: 0.5 },
            { label: 'γ SECTOR', t: 0.8 },
          ].map((sector) => (
            <button
              key={sector.label}
              type="button"
              style={ui.travelBtn}
              onClick={() => useStore.getState().actions.quickTravel(sector.t)}
            >
              {sector.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const accent = '#c8b8ff'
const accentPink = '#ff7ad4'
const ink = '#ece8ff'

const ui = {
  layer: {
    position: 'absolute', inset: 0, pointerEvents: 'none',
    fontFamily: "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace",
    color: ink,
  },
  chip: {
    position: 'absolute', display: 'inline-flex', gap: 10, alignItems: 'center',
    padding: '8px 14px', borderRadius: 999, pointerEvents: 'auto',
    border: '1px solid rgba(200,184,255,0.28)',
    background: 'rgba(10,8,24,0.55)', backdropFilter: 'blur(6px)',
    color: ink, fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase',
    cursor: 'pointer',
  },
  topLeft: { top: 18, left: 18 },
  topRight: { top: 18, right: 18, flexDirection: 'column', alignItems: 'flex-end', gap: 2, cursor: 'default' },
  topCenter: { top: 18, left: '50%', transform: 'translateX(-50%)', cursor: 'default' },
  gold: { color: '#ffd24d', fontSize: 12, letterSpacing: '.22em' },
  reveal: {
    position: 'absolute', left: '50%', top: '32%', transform: 'translateX(-50%)',
    textAlign: 'center', pointerEvents: 'none', animation: 'kkReveal 2.8s ease-out forwards',
  },
  revealKicker: { fontSize: 11, letterSpacing: '.42em', color: '#ffd24d', opacity: 0.95 },
  revealName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(34px, 6vw, 60px)',
    color: '#fff', textShadow: '0 0 32px rgba(255,210,77,.7)', marginTop: 6, letterSpacing: '.04em',
  },
  dim: { opacity: 0.55, fontSize: 10, letterSpacing: '.22em' },
  val: { color: accent, fontSize: 12, letterSpacing: '.22em' },
  lowerLeft: {
    position: 'absolute', left: 24, bottom: 24, display: 'flex', flexDirection: 'column', gap: 4,
  },
  timer: {
    fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic',
    fontSize: 28, color: accentPink, lineHeight: 1,
  },
  score: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 84, lineHeight: 0.95, color: ink, textShadow: '0 0 24px rgba(200,184,255,0.35)',
  },
  lowerRight: {
    position: 'absolute', right: 24, bottom: 28, display: 'flex', flexDirection: 'column', gap: 6,
    alignItems: 'flex-end',
  },
  bar: {
    width: 180, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(200,184,255,0.25)', overflow: 'hidden',
  },
  barFill: {
    height: '100%', background: `linear-gradient(90deg, ${accentPink}, ${accent})`,
  },
  lowerCenter: {
    position: 'absolute', left: '50%', bottom: 24, transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', pointerEvents: 'none',
  },
  travelRow: {
    display: 'flex', gap: 8, pointerEvents: 'auto',
  },
  travelBtn: {
    padding: '6px 12px', borderRadius: 999, pointerEvents: 'auto',
    border: '1px solid rgba(200,184,255,0.28)',
    background: 'rgba(10,8,24,0.55)', backdropFilter: 'blur(6px)',
    color: ink, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase',
    cursor: 'pointer', fontFamily: "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace",
  },
}
