"use client";

import React, { type ComponentProps } from "react";
import { useTokens } from "@/hooks/use-tokens";
import { TAILWIND_PALETTE_V4, type TailwindShadeKey } from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { convertToOklch } from "@/utils/color-converter";
import { TooltipWrapper } from "../tooltip-wrapper";
import { Color } from "./color";

export const MemoizedTailwindV4ColorPalette = React.memo(
  TailwindV4ColorPalette
);
function TailwindV4ColorPalette({
  currentColor,
  shade,
  modesInSync,
  className,
  ...props
}: {
  currentColor: string;
  shade: TailwindShadeKey;
  modesInSync?: boolean;
} & ComponentProps<"div">) {
  const { setPrimaryColorTokens } = useTokens();

  const handleColorChange = (color: string) => {
    const newOklchColor = convertToOklch(color);
    setPrimaryColorTokens({ color: newOklchColor, modesInSync });
  };

  return (
    <div
      className={cn(
        "flex flex-wrap content-start items-start gap-2",
        className
      )}
      {...props}
    >
      {Object.entries(TAILWIND_PALETTE_V4).map(([key, colors]) => {
        const color = colors[shade];
        const isActive = currentColor === color;

        return (
          <TooltipWrapper asChild key={key} label={`${key}-${shade}`}>
            <Color
              className="ring ring-border"
              color={color}
              isActive={isActive}
              onClick={() => handleColorChange(color)}
            />
          </TooltipWrapper>
        );
      })}
    </div>
  );
}
