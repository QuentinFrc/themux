"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { getCssVarsFromThemeObject } from "@/lib/themes";
import { CssThemeProperties, ThemeMode } from "@/types/theme";
import { useTheme } from "next-themes";

const DATA_KEYS = {
  preset: "data-preset",
  primary: "data-primary",
  surface: "data-surface",
  variant: "data-variant",
};

export function ThemeSync() {
  const [config] = useConfig();
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme as ThemeMode;

  React.useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (!root) return;

    const preset = config.themeObject.name;
    const primary = config.themeObject[mode].primary;

    root.setAttribute(DATA_KEYS.preset, preset);
    root.setAttribute(DATA_KEYS.primary, primary);

    // root.classList.forEach((className) => {
    //   if (className.match(/^theme.*/)) {
    //     root.classList.remove(className);
    //   }
    // });
    // root.classList.add(`theme-${theme}`);

    const themeProperties: CssThemeProperties = {
      ...config.themeObject[mode],
      radius: config.radius,
    };

    const cssVars = getCssVarsFromThemeObject(themeProperties);

    for (const [key, value] of Object.entries(cssVars)) {
      root.style.setProperty(key, value as string);
    }
  }, [config, mode]);

  return null;
}
