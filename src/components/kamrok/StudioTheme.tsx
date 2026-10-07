import { useEffect, useState, type ReactNode } from "react";

import { StudioThemeContext, type StudioTheme } from "@/hooks/useStudioTheme";

export function StudioThemeProvider({ children }: { children: ReactNode }) {
  // Every fresh visit opens in the studio's dark art direction.
  // A visitor can switch to bright mode while moving between pages.
  const [theme, setTheme] = useState<StudioTheme>("dark");
  useEffect(() => {
    document.documentElement.dataset.studioTheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#03060d" : "#faf5e7");
  }, [theme]);
  return <StudioThemeContext.Provider value={{ theme, toggleTheme: () => setTheme(current => current === "dark" ? "light" : "dark") }}>{children}</StudioThemeContext.Provider>;
}
