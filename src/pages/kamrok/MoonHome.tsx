import { useEffect } from "react";
import { Link } from "react-router-dom";
import MoonExperience from "@/components/kamrok/moon/MoonExperience";
import MoonBoundary from "@/components/kamrok/moon/MoonBoundary";

const fbBtn: React.CSSProperties = {
  textDecoration: "none", padding: "11px 20px", borderRadius: 30,
  border: "1px solid rgba(180,170,255,.3)", color: "#ece8ff",
};

// Shown only if the 3D moon throws (e.g. WebGL unavailable) — a usable mini-home,
// never a blank screen.
function MoonHomeFallback() {
  return (
    <div style={{
      position: "fixed", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center", padding: 24,
      background: "radial-gradient(125% 125% at 50% 40%, #15122e, #07060f 70%)",
      color: "#ece8ff", fontFamily: "'Cormorant Garamond', Georgia, serif",
    }}>
      <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, letterSpacing: ".3em", color: "#9b8dff" }}>
        KAMROK · CANDY SHOP DIGITAL
      </div>
      <h1 style={{ fontSize: "clamp(34px,9vw,72px)", fontWeight: 600, margin: 0, letterSpacing: ".04em" }}>KAMROK</h1>
      <p style={{ maxWidth: 420, fontSize: 17, fontStyle: "italic", color: "#cfc9f2", margin: 0 }}>
        The interactive moon is taking a moment on this device — dive straight into the work.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center",
        fontFamily: "ui-monospace, monospace", fontSize: 11, letterSpacing: ".18em" }}>
        <Link to="/work" style={{ ...fbBtn, background: "#ece8ff", color: "#0a0820", border: "none" }}>SEE THE WORK →</Link>
        <Link to="/about" style={fbBtn}>ABOUT</Link>
        <Link to="/contact" style={fbBtn}>CONTACT</Link>
      </div>
    </div>
  );
}

const ATV_SVG = `
<svg viewBox="0 0 32 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 14 L7 14 L9 9 L20 9 L24 14 L29 14" />
  <path d="M11 9 L13 6 L18 6 L20 9" />
  <g class="wheel"><circle cx="8" cy="17" r="3.2" /><circle cx="8" cy="17" r="1" fill="currentColor" stroke="none" /></g>
  <g class="wheel"><circle cx="24" cy="17" r="3.2" /><circle cx="24" cy="17" r="1" fill="currentColor" stroke="none" /></g>
  <path d="M26 11 L29 8" />
</svg>`;

export default function MoonHome() {
  useEffect(() => {
    document.title = "KAMROK — Cormac · Web Designer & Interactive Portfolio";
  }, []);

  // Wire objective list quick-travel: click li -> trigger matching nav button (drives buggy there)
  // + run a small ATV icon animation across the row.
  useEffect(() => {
    let attached = false;
    const wire = () => {
      const lis = document.querySelectorAll<HTMLLIElement>("#objList li[data-b]");
      if (!lis.length) return false;
      lis.forEach((li) => {
        if (li.dataset.qtWired === "1") return;
        li.dataset.qtWired = "1";
        // Inject ATV icon once
        const atv = document.createElement("span");
        atv.className = "atv";
        atv.innerHTML = ATV_SVG;
        li.appendChild(atv);
        li.addEventListener("click", () => {
          if (li.classList.contains("traveling")) return;
          li.classList.add("traveling");
          window.setTimeout(() => li.classList.remove("traveling"), 1500);
          const key = li.dataset.b;
          const btn = document.querySelector<HTMLButtonElement>(
            `#navItems button[data-build="${key}"]`
          );
          btn?.click(); // single click = drive buggy toward target
        });
      });
      attached = true;
      return true;
    };
    if (wire()) return;
    // Markup mounts after engine init — poll briefly
    const t = window.setInterval(() => {
      if (wire()) window.clearInterval(t);
    }, 250);
    return () => window.clearInterval(t);
  }, []);

  return (
    <MoonBoundary fallback={<MoonHomeFallback />} label="moon-home">
      <MoonExperience />
    </MoonBoundary>
  );
}
