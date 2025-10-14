import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";
import { initialThemeConfig } from "@/lib/themes";
import type { ThemeConfig } from "@/types/theme";
import { LOCAL_STORAGE_KEYS } from "@/utils/constants";

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  LOCAL_STORAGE_KEYS.themeConfig,
  initialThemeConfig
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
