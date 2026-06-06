import { MONUMENTS, type MonumentKey } from "./Monuments";

export default function HUD({
  near,
  onJump,
  music,
  sound,
  onToggleMusic,
  onToggleSound,
}: {
  near: MonumentKey | null;
  onJump: (k: MonumentKey) => void;
  music: boolean;
  sound: boolean;
  onToggleMusic: () => void;
  onToggleSound: () => void;
}) {
  return (
    <>
      <div className="moon-hud moon-hud--top">
        <div className="moon-pill moon-pill--brand">KAMROK</div>
        <nav className="moon-nav">
          {MONUMENTS.map((m) => (
            <button
              key={m.key}
              className={`moon-nav__item${near === m.key ? " is-near" : ""}`}
              onDoubleClick={() => onJump(m.key)}
              title="Double-click to open"
            >
              {m.label}
            </button>
          ))}
        </nav>
        <div className="moon-nav">
          <button
            className={`moon-nav__item${music ? " is-near" : ""}`}
            onClick={onToggleMusic}
          >
            Music {music ? "On" : "Off"}
          </button>
          <button
            className={`moon-nav__item${sound ? " is-near" : ""}`}
            onClick={onToggleSound}
          >
            Sound {sound ? "On" : "Off"}
          </button>
        </div>
      </div>
      <div className="moon-hud moon-hud--bottom">
        <span className="moon-hint">WASD / ARROWS to drive · Approach a monument or double-click a label</span>
      </div>
    </>
  );
}
