// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/active-theme.tsx
// I removed this implementation that uses cookies, but I plan on adding it back in the future
"use client";

import { ACTIVE_THEME_NAME_COOKIE } from "@/lib/constants";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const DEFAULT_THEME = "default";

// TODO: Type theme
function setThemeCookie(theme: string) {
  if (typeof window === "undefined") return;

  document.cookie = `${ACTIVE_THEME_NAME_COOKIE}=${theme}; path=/; max-age=31536000; SameSite=Lax; ${window.location.protocol === "https:" ? "Secure;" : ""}`;
}

type ThemeContextType = {
  activeTheme: string;
  setActiveTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ActiveThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme?: string;
}) {
  const [activeTheme, setActiveTheme] = useState(
    () => initialTheme || DEFAULT_THEME,
  );

  useEffect(() => {
    setThemeCookie(activeTheme);

    Array.from(document.body.classList)
      .filter((className) => className.startsWith("theme-"))
      .forEach((className) => {
        document.body.classList.remove(className);
      });
    document.body.classList.add(`theme-${activeTheme}`);
    if (activeTheme.endsWith("-scaled")) {
      document.body.classList.add("theme-scaled");
    }
  }, [activeTheme]);

  return (
    <ThemeContext.Provider value={{ activeTheme, setActiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeConfig() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeConfig must be used within an ActiveThemeProvider",
    );
  }
  return context;
}
