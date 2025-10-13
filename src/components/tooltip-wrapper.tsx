"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { useShowTooltips } from "@/store/preferences-store";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function TooltipWrapper({
  label,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipTrigger> & {
  label: string;
}) {
  const showTootips = useShowTooltips();

  return (
    <Tooltip defaultOpen={false} delayDuration={500} key={label}>
      <TooltipTrigger className={cn(className)} {...props}>
        {children}
      </TooltipTrigger>

      {showTootips && (
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
}
