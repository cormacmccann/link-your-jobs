import { useEffect } from "react";
import MoonExperience from "@/components/kamrok/moon/MoonExperience";

export default function MoonHome() {
  useEffect(() => {
    document.title = "KAMROK — interactive moon portfolio";
    const meta = document.querySelector('meta[name="description"]');
    const content =
      "KAMROK — independent design + build studio. Drive across the moon and explore about, work, skills and contact.";
    if (meta) meta.setAttribute("content", content);
    else {
      const m = document.createElement("meta");
      m.name = "description";
      m.content = content;
      document.head.appendChild(m);
    }
  }, []);

  return <MoonExperience />;
}
