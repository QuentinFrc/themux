"use client";

import * as React from "react";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { getCssVarsFromThemeObject } from "@/lib/themes";
import { ThemeMode, ThemeProperties } from "@/types/theme";
import {
  DATA_KEYS,
  setAttributeToElement,
  setStyleProperty,
} from "@/utils/set-attribute-to-element";
import { useTheme } from "next-themes";

export function ThemeSync() {
  const {
    currentThemeObject,
    currentSurfacePreset,
    currentRadius,
    currentFonts,
  } = useThemeConfig();
  const mode = useTheme().resolvedTheme as ThemeMode;

  React.useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (!root) return;

    const preset = currentThemeObject.name;
    const primary = currentThemeObject[mode].primary!;
    const surface = currentSurfacePreset ?? "default";
    const fontSans = currentFonts?.sans!;
    const fontSerif = currentFonts?.serif!;
    const fontMono = currentFonts?.mono!;

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
    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS["font-sans"],
      value: fontSans,
    });
    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS["font-serif"],
      value: fontSerif,
    });
    setAttributeToElement({
      element: root,
      attribute: DATA_KEYS["font-mono"],
      value: fontMono,
    });

    const themeProperties: Partial<ThemeProperties> = {
      ...currentThemeObject[mode],
      radius: currentRadius,
      "font-sans": fontSans,
      "font-serif": fontSerif,
      "font-mono": fontMono,
    };

    const cssVars = getCssVarsFromThemeObject(themeProperties);

    for (const [key, value] of Object.entries(cssVars)) {
      setStyleProperty({ element: root, key: key, value });
    }
  }, [
    currentThemeObject,
    currentSurfacePreset,
    currentRadius,
    currentFonts,
    mode,
  ]);

  return null;
}
