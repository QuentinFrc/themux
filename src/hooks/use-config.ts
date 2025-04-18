import { initialThemeConfig } from "@/lib/themes";
import { ThemeConfig } from "@/types/theme";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const THEME_CONFIG_KEY_LS = "theme-config";

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  THEME_CONFIG_KEY_LS,
  initialThemeConfig,
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
