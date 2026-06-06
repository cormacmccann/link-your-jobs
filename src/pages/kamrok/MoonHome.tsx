import { useEffect } from "react";
import MoonExperience from "@/components/kamrok/moon/MoonExperience";

export default function MoonHome() {
  useEffect(() => {
    document.title = "KAMROK — Cormac · Web Designer & Interactive Portfolio";
  }, []);

  return <MoonExperience />;
}
