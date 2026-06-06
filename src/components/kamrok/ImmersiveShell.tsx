import { ReactNode, useEffect } from "react";
import heroBg from "@/assets/immersive-hero.jpg";
import KamrokNav from "./KamrokNav";
import FloatingShowcase from "./FloatingShowcase";
import "@/styles/immersive.css";

interface Props {
  title: string;
  description: string;
  children: ReactNode;
}

export default function ImmersiveShell({ title, description, children }: Props) {
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
    <div className="im-root">
      {/* Painterly backdrop */}
      <div className="im-bg" style={{ backgroundImage: `url(${heroBg})` }} aria-hidden />
      <div className="im-bg-vignette" aria-hidden />
      <div className="im-bg-frame" aria-hidden />

      {/* Interactive showcase floating in the empty left space */}
      <FloatingShowcase />

      <KamrokNav onMoon={false} />

      {/* Content */}
      <main className="im-main">{children}</main>
    </div>
  );
}
