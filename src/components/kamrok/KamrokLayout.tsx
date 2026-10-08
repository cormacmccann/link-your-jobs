import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  maxWidth?: number;
  fullWidth?: boolean;
  children: ReactNode;
}

export default function KamrokLayout({ title, description, maxWidth = 1160, fullWidth = true, children }: Props) {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start", behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [hash]);
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
  }, [title, description]);
  return (
    <div className={`kk-root studio-container${fullWidth ? " studio-container--full" : ""}`}>
      <div className="kk-page" style={{ maxWidth: fullWidth ? "none" : maxWidth }}>
        <article className="kk-card">{children}</article>
      </div>
    </div>
  );
}
