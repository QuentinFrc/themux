"use client";

import { initialThemeConfig, useConfig } from "@/hooks/use-config";
import { Repeat } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function ResetButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const [_, setConfig] = useConfig();

  const resetThemeConfig = () => {
    setConfig(initialThemeConfig);
  };

  return (
    <Button
      variant="ghost"
      onClick={resetThemeConfig}
      className={cn("", className)}
      {...props}
    >
      <span className="hidden @md:inline-flex">Reset</span> <Repeat />
      <span className="sr-only">Reset</span>
    </Button>
  );
}
