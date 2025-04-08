import { basePresetsV4 } from "@/lib/colors";
import { ThemeConfig } from "@/types/theme";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

export const initialThemeConfig: ThemeConfig = {
  radius: "0.625rem",
  surface: "default",
  themeObject: basePresetsV4.neutral,
};

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  "theme-config",
  initialThemeConfig,
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
