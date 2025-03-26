"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { getCssVarsFromThemeObject } from "@/lib/themes";
import { CssThemeProperties } from "@/types/theme";
import { useTheme } from "next-themes";

export function ThemeSync() {
  const [config] = useConfig();
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (!root) return;

    const theme = config.themeObject.name;

    root.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        root.classList.remove(className);
      }
    });
    root.classList.add(`theme-${theme}`);

    const themeProperties: CssThemeProperties =
      resolvedTheme === "light"
        ? { ...config.themeObject.light, radius: config.radius }
        : { ...config.themeObject.dark, radius: config.radius };

    const cssVars = getCssVarsFromThemeObject(themeProperties);

    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value as string);
    }
  }, [config, resolvedTheme]);

  return null;
}
