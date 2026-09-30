import { ReactNode, useEffect } from "react";

interface Props {
  title: string;
  description: string;
  maxWidth?: number;
  children: ReactNode;
}

export default function KamrokLayout({ title, description, maxWidth = 1160, children }: Props) {
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
    <div className="kk-root studio-container">
      <div className="kk-page" style={{ maxWidth }}>
        <article className="kk-card">{children}</article>
      </div>
    </div>
  );
}
