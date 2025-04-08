"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { TAILWIND_PALETTE_V4, TailwindShadeKey } from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { OklchValue } from "@/types/theme";
import { convertToOklch } from "@/utils/color-converter";
import React, { ComponentProps } from "react";
import { Color } from "./color";

export const MemoizedTailwindV4ColorPalette = React.memo(
  TailwindV4ColorPalette,
);
function TailwindV4ColorPalette({
  currentColor,
  shade,
  bothModes,
  className,
  ...props
}: {
  currentColor: OklchValue;
  shade: TailwindShadeKey;
  bothModes?: boolean;
} & ComponentProps<"div">) {
  const { setPrimaryColorTokens } = useColorTokens();

  const handleColorChange = (color: string) => {
    const newOklchColor = convertToOklch(color);
    setPrimaryColorTokens({ primaryColor: newOklchColor, bothModes });
  };

  return (
    <div
      className={cn(
        "flex flex-wrap content-start items-start gap-2",
        className,
      )}
      {...props}
    >
      {Object.entries(TAILWIND_PALETTE_V4).map(([key, colors]) => {
        const color = colors[shade];
        const isActive = currentColor === color;

        return (
          <Color
            key={key}
            color={color}
            isActive={isActive}
            onClick={() => handleColorChange(color)}
            className="ring-border ring"
          />
        );
      })}
    </div>
  );
}
