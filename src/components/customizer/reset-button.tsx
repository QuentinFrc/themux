"use client";

import { RotateCcw, Undo } from "lucide-react";
import type { ComponentProps } from "react";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
        <Button className={cn("", className)} variant="ghost" {...props}>
          <RotateCcw />
          <span className="@xl:inline-flex hidden">Reset</span>
          <span className="sr-only">Reset</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-fit">
        <DropdownMenuItem
          className={cn(hasDefaultThemeChanged() && "cursor-pointer")}
          disabled={!hasDefaultThemeChanged()}
          onClick={resetToDefault}
        >
          <RotateCcw />
          To default
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(hasCurrentPresetChanged() && "cursor-pointer")}
          disabled={!hasCurrentPresetChanged()}
          onClick={resetToLatestThemePreset}
        >
          <Undo />
          To latest preset
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
