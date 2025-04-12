// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/mode-switcher.tsx
"use client";

import { META_THEME_COLORS, useMetaColor } from "@/hooks/use-meta-colors";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "./ui/button";

export function ModeSwitcher({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor } = useMetaColor();

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setMetaColor(
      resolvedTheme === "dark"
        ? META_THEME_COLORS.light
        : META_THEME_COLORS.dark,
    );
  }, [resolvedTheme, setTheme, setMetaColor]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={className}
      {...props}
    >
      <SunIcon className="hidden size-4 [html.dark_&]:block" />
      <MoonIcon className="hidden size-4 [html.light_&]:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
