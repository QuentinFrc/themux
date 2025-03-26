import { basePresetsV4 } from "@/lib/colors";
import { RemValue, ThemeObject } from "@/types/theme";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

export type ThemeConfig = {
  radius: RemValue;
  themeObject: ThemeObject;
};

export const initialThemeConfig: ThemeConfig = {
  radius: "0.625rem",
  themeObject: basePresetsV4.neutral,
};

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  "theme-config",
  initialThemeConfig,
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
