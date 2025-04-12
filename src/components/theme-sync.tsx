"use client";

import * as React from "react";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { getCssVarsFromThemeObject } from "@/lib/themes";
import { ThemeMode, ThemeProperties } from "@/types/theme";
import {
  DATA_KEYS,
  DataKey,
  setAttributeToElement,
  setStyleProperty,
} from "@/utils/set-attribute-to-element";
import { useTheme } from "next-themes";

export function ThemeSync() {
  const { currentThemeObject, currentSurfacePreset, currentRadius } =
    useThemeConfig();
  const mode = useTheme().resolvedTheme as ThemeMode;

  React.useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (!root) return;

    const preset = currentThemeObject.name;
    const primary = currentThemeObject[mode].primary!;
    const surface = currentSurfacePreset ?? "default";

    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS.preset,
      value: preset,
    });
    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS.primary,
      value: primary,
    });
    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS.surface,
      value: surface,
    });

    const themeProperties: Partial<ThemeProperties> = {
      ...currentThemeObject[mode],
      radius: currentThemeObject.radius ?? currentRadius,
    };

    const cssVars = getCssVarsFromThemeObject(themeProperties);

    for (const [key, value] of Object.entries(cssVars)) {
      setStyleProperty({ element: root, key: key as DataKey, value });
    }
  }, [currentThemeObject, currentSurfacePreset, currentRadius, mode]);

  return null;
}
