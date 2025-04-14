import { initialThemeConfig } from "@/lib/themes";
import { ThemeConfig } from "@/types/theme";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

const initialConfigAtom = atomWithStorage<ThemeConfig>(
  "theme-config",
  initialThemeConfig,
);

export function useConfig() {
  return useAtom(initialConfigAtom);
}
