"use client";

import { useConfig } from "@/hooks/use-config";
import { useSettings } from "@/hooks/use-settings";
import { ColorProperty, OklchValue, ThemeMode } from "@/types/theme";
import { convertToHex, convertToOklch } from "@/utils/color-converter";
import { getOptimalForegroundColor } from "@/utils/colors";
import { CircleAlert, Pipette } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDebouncedCallback } from "../hooks/use-debounced-callback";
import { ComponentErrorBoundary } from "./error-boundary";
import { TokenDisplay, TokenInfo } from "./token";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface TokenColorPickerProps {
  colorProperty: ColorProperty;
  oklchColor: OklchValue;
  syncModes?: boolean;
  setColorTokens: (obj: {
    property: ColorProperty;
    color: OklchValue;
    modesInSync?: boolean;
  }) => void;
}

export function TokenColorPicker({
  colorProperty,
  oklchColor,
  syncModes,
  setColorTokens,
}: TokenColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(oklchColor);
  const hexColor = convertToHex(oklchColor);
  const { modesInSync } = useSettings();

  useEffect(() => {
    if (currentColor !== oklchColor) setCurrentColor(oklchColor);
  }, [oklchColor]);

  const debouncedSetColorTokens = useDebouncedCallback(setColorTokens, 100);

  const handleColorChange = useCallback(
    (color: string) => {
      const newOklchColor = convertToOklch(color);
      setCurrentColor(newOklchColor);
      debouncedSetColorTokens({
        color: newOklchColor,
        modesInSync: syncModes !== undefined ? syncModes : modesInSync, // allows overriding the global sync mode
        property: colorProperty,
      });
    },
    [syncModes, modesInSync, colorProperty],
  );

  return (
    <ComponentErrorBoundary
      name="TokenColorPicker"
      fallback={<ColorPickerErrorFallback />}
    >
      <Popover>
        <div className="flex items-center gap-2">
          <PopoverTrigger className="relative cursor-pointer">
            <TokenDisplay oklchColor={oklchColor} />
            <Pipette
              className="text-foreground fill-foreground absolute inset-0 m-auto size-4"
              style={{
                "--foreground": getOptimalForegroundColor(currentColor),
              }}
            />
          </PopoverTrigger>
          <TokenInfo colorProperty={colorProperty} oklchColor={oklchColor} />
        </div>

        <PopoverContent className="bg-background flex size-fit gap-6 p-4">
          <div className="space-y-2">
            <HexColorPicker color={hexColor} onChange={handleColorChange} />
            <ColorOklchValue currentColor={currentColor} />
          </div>
        </PopoverContent>
      </Popover>
    </ComponentErrorBoundary>
  );
}

function ColorOklchValue({ currentColor }: { currentColor: OklchValue }) {
  return (
    <div className="flex items-center gap-1">
      <div
        className="bg-primary size-2 rounded-full"
        style={{
          "--primary": currentColor,
        }}
      />
      <p className="text-muted-foreground font-mono text-xs">{currentColor}</p>
    </div>
  );
}

// Error fallback to prevent *shittier* experiences, for the moment
function ColorPickerErrorFallback() {
  const [config] = useConfig();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div className="relative cursor-pointer">
        <TokenDisplay
          oklchColor={
            config.themeObject[resolvedTheme as ThemeMode].destructive
          }
        />
        <CircleAlert className="absolute inset-0 m-auto size-4 text-neutral-50" />
      </div>

      <div>
        <p className="text-destructive font-mono text-xs font-semibold">
          Error occurred. I'm sorry :/
        </p>
        <p className="text-destructive/70 truncate font-mono text-xs">
          For now, refresh the page.
        </p>
      </div>
    </div>
  );
}
