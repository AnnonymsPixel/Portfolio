import { useState, useCallback } from "react";
import THEMES from "../data/themes";

/**
 * Manages the active theme, persisting the user's choice to localStorage.
 * Returns { theme, themeKey, switchTheme }
 */
export function useTheme() {
  const [themeKey, setThemeKey] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  const switchTheme = useCallback((mode) => {
    setThemeKey(mode);
    try {
      localStorage.setItem("theme", mode);
    } catch {}
  }, []);

  const theme = THEMES[themeKey] || THEMES.light;

  return { theme, themeKey, switchTheme };
}
