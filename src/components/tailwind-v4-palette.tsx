"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { TAILWIND_PALETTE_V4, TailwindShadeKey } from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { OklchValue } from "@/types/theme";
import { convertToOklch } from "@/utils/color-converter";
import React, { ComponentProps } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

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
          />
        );
      })}
    </div>
  );
}

export function Color({
  color,
  isActive,
  className,
  onClick,
}: { color: string; isActive?: boolean } & ComponentProps<"button">) {
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Button
        variant={"ghost"}
        className={cn(
          "ring-border size-fit cursor-pointer rounded-lg p-1 ring",
        )}
      >
        <Skeleton
          className={cn(
            "bg-muted ring-border relative flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-lg ring",
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "ring-border size-fit cursor-pointer rounded-lg p-1 ring",
        isActive &&
          "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
        className,
      )}
      style={{ "--primary": color }}
      onClick={onClick}
    >
      <span
        className={cn(
          "bg-primary ring-border relative flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-lg ring",
        )}
      />
    </Button>
  );
}
