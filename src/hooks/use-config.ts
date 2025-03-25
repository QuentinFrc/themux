import { basePresetsV4 } from "@/lib/colors";
import { ColorfulPreset, PresetV4, ThemeObject } from "@/lib/themes";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

export type ThemeConfig = {
  radius: number;
  theme: PresetV4 | ColorfulPreset;
  themeObject: ThemeObject;
};

export const initialThemeConfig: ThemeConfig = {
  radius: 0.625,
  theme: "neutral",
  themeObject: basePresetsV4["neutral"] as ThemeObject,
};

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  "theme-config",
  initialThemeConfig,
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
