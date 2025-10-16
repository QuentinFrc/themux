"use client";

import {
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ThemeConfigContext } from "@/hooks/use-config";
import { initialThemeConfig } from "@/lib/themes";
import type { ThemeConfig } from "@/types/theme";

type ThemeConfigProviderProps = {
  initialConfig?: ThemeConfig;
  children: ReactNode;
};

export function ThemeConfigProvider({
  initialConfig,
  children,
}: ThemeConfigProviderProps) {
  const [config, setConfig] = useState(initialConfig ?? initialThemeConfig);

  useEffect(() => {
    setConfig(initialConfig ?? initialThemeConfig);
  }, [initialConfig]);

  const contextValue = useMemo(
    () => ({
      config,
      setConfig,
    }),
    [config, setConfig],
  );

  return (
    <ThemeConfigContext.Provider value={contextValue}>
      {children}
    </ThemeConfigContext.Provider>
  );
}
