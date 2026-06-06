import { useEffect } from "react";

export default function MoonHome() {
  useEffect(() => {
    document.title = "KAMROK — Cormac · Web Designer & Interactive Portfolio";
  }, []);

  return (
    <iframe
      src="/moon.html"
      title="KAMROK interactive moon portfolio"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: 0,
        margin: 0,
        padding: 0,
        display: "block",
      }}
      allow="fullscreen; autoplay"
    />
  );
}
