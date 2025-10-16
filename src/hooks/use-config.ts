import { createContext, type Dispatch, type SetStateAction, useContext } from "react";

import type { ThemeConfig } from "@/types/theme";

type ThemeConfigContextValue = {
  config: ThemeConfig;
  setConfig: Dispatch<SetStateAction<ThemeConfig>>;
};

export const ThemeConfigContext = createContext<
  ThemeConfigContextValue | undefined
>(undefined);

export function useConfig() {
  const context = useContext(ThemeConfigContext);

  if (!context) {
    throw new Error("useConfig must be used within a ThemeConfigProvider");
  }

  return [context.config, context.setConfig] as const;
}
