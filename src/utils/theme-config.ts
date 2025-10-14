import { merge } from "lodash";
import { initialThemeConfig } from "@/lib/themes";
import type { ThemeObject } from "@/types/theme";

export function mergeThemeObjects(...themeObjects: ThemeObject[]) {
  // Clone each theme object to avoid mutating the originals
  const clonedObjects = themeObjects.map((obj) => structuredClone(obj));

  return merge({}, ...clonedObjects);
}

export function mergeThemeObjectWithInitial(themeObject: ThemeObject) {
  return merge(
    {}, // Start with an empty object
    structuredClone(initialThemeConfig.themeObject), // Apply defaults
    structuredClone(themeObject) // Apply overrides deeply
  );
}
