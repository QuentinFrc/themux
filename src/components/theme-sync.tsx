"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
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
  const [config] = useConfig();
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme as ThemeMode;

  React.useEffect(() => {
    const root = document.querySelector(":root") as HTMLElement;
    if (!root) return;

    const preset = config.themeObject.name;
    const primary = config.themeObject[mode].primary!;
    const surface = config.surface ?? "default";

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
      ...config.themeObject[mode],
      radius: config.themeObject.radius ?? config.radius,
    };

    const cssVars = getCssVarsFromThemeObject(themeProperties);

    for (const [key, value] of Object.entries(cssVars)) {
      setStyleProperty({ element: root, key: key as DataKey, value });
    }
  }, [config, mode]);

  return null;
}
