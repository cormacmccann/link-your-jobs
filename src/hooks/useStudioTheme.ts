import { createContext, useContext } from "react";

export type StudioTheme = "dark" | "light";
export const StudioThemeContext = createContext<{ theme: StudioTheme; toggleTheme: () => void }>({ theme: "dark", toggleTheme: () => {} });
export const useStudioTheme = () => useContext(StudioThemeContext);
