"use client";

import { ThemeConfig, useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import React from "react";

interface ThemeWrapperProps extends React.ComponentProps<"div"> {}

export function ThemeWrapper({ children, className }: ThemeWrapperProps) {
  const [config] = useConfig();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(`theme-${config.theme}`, "w-full", className)}
      style={getStyles(config)}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
}

function getStyles(config: ThemeConfig) {
  return {
    "--radius": `${config.radius}rem`,
  } as React.CSSProperties;
}
