"use client";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { Repeat, Undo } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ResetButton({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const {
    resetToDefault,
    resetToLatestThemePreset,
    hasDefaultThemeChanged,
    hasCurrentPresetChanged,
  } = useThemeConfig();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn("", className)} {...props}>
          <span className="hidden @md:inline-flex">Reset</span> <Repeat />
          <span className="sr-only">Reset</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        <DropdownMenuItem
          className={cn(hasDefaultThemeChanged() && "cursor-pointer")}
          onClick={resetToDefault}
          disabled={!hasDefaultThemeChanged()}
        >
          <Repeat />
          Reset to default
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(hasCurrentPresetChanged() && "cursor-pointer")}
          onClick={resetToLatestThemePreset}
          disabled={!hasCurrentPresetChanged()}
        >
          <Undo />
          Reset to latest preset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
