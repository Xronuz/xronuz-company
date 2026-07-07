"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => {},
  toggle: () => {},
});

function persist(t: Theme) {
  document.cookie = `xronuz-theme=${t}; path=/; max-age=31536000; samesite=lax`;
}

export function ThemeProvider({
  children,
  initialTheme = "dark",
}: {
  children: ReactNode;
  initialTheme?: Theme;
}) {
  // initialTheme comes from the cookie via the server layout, so SSR markup,
  // hydration and client state all agree from the very first frame
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // one-time migration from the old localStorage-based persistence
  useEffect(() => {
    const saved = localStorage.getItem("xronuz-theme");
    if (saved === "light" || saved === "dark") {
      localStorage.removeItem("xronuz-theme");
      if (saved !== initialTheme) {
        setThemeState(saved);
      }
      persist(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    persist(t);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
