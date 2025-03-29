"use client";

import { useConfig } from "@/hooks/use-config";
import { ColorProperty, OklchValue } from "@/types/theme";
import {
  getOptimalForegroundColor,
  hexToOklch,
  oklchToHex,
} from "@/utils/colors";
import { CircleAlert, Pipette } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ComponentErrorBoundary } from "./error-boundary";
import { TokenDisplay, TokenInfo } from "./token";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { useDebouncedCallback } from "./use-debounced-callback";

interface TokenColorPickerProps {
  colorProperty: ColorProperty;
  oklchColor: OklchValue;
  setColorTokens: (color: OklchValue) => void;
}

export function TokenColorPicker({
  colorProperty,
  oklchColor,
  setColorTokens,
}: TokenColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(oklchColor);
  const hexColor = oklchToHex(oklchColor);

  useEffect(() => {
    if (currentColor !== oklchColor) setCurrentColor(oklchColor);
  }, [oklchColor]);

  const debouncedSetColorTokens = useDebouncedCallback(setColorTokens, 200);

  const handleColorChange = useCallback((newHexColor: string) => {
    const newOklchColor = hexToOklch(newHexColor);
    setCurrentColor(newOklchColor);
    debouncedSetColorTokens(newOklchColor);
  }, []);

  return (
    <ComponentErrorBoundary
      name="TokenColorPicker"
      fallback={<ColorPickerErrorFallback />}
    >
      <Popover>
        <div className="flex items-center gap-2">
          <PopoverTrigger className="relative cursor-pointer">
            <TokenDisplay oklchColor={oklchColor} />
            <Pipette className="text-primary-foreground fill-primary-foreground absolute inset-0 m-auto size-4" />
          </PopoverTrigger>
          <TokenInfo colorProperty={colorProperty} oklchColor={oklchColor} />
        </div>

        <PopoverContent className="flex size-fit gap-6 p-6">
          <div className="space-y-2">
            <HexColorPicker color={hexColor} onChange={handleColorChange} />

            <div className="flex items-center gap-1">
              <div
                className="bg-primary size-2 rounded-full"
                style={{
                  "--primary": currentColor,
                }}
              />
              <p className="text-muted-foreground font-mono text-xs">
                {currentColor}
              </p>
            </div>
          </div>

          <MemoizedPreviewComponents currentColor={currentColor} />
        </PopoverContent>
      </Popover>
    </ComponentErrorBoundary>
  );
}

const MemoizedPreviewComponents = React.memo(PreviewComponents);
function PreviewComponents({ currentColor }: { currentColor: OklchValue }) {
  const foregroundColor = useMemo(
    () => getOptimalForegroundColor(currentColor),
    [currentColor],
  );

  return (
    <div
      className="flex w-fit flex-col gap-3 text-sm"
      style={{
        "--primary": currentColor,
        "--primary-foreground": foregroundColor,
      }}
    >
      <Label className="text-muted-foreground">Preview</Label>
      <Button className="size-fit px-4 py-1.5">Button</Button>

      <div className="flex items-center gap-1">
        <Checkbox value="default" id="c1" defaultChecked />
        <Checkbox value="default_2" id="c1" />
        <Label htmlFor="c1" className="text-muted-foreground">
          Checkbox
        </Label>
      </div>

      <RadioGroup defaultValue="default">
        <div className="flex items-center gap-1">
          <RadioGroupItem value="default" id="r1" defaultChecked />
          <RadioGroupItem value="default_2" id="r2" />
          <Label htmlFor="r1" className="text-muted-foreground">
            Radio group
          </Label>
        </div>
      </RadioGroup>

      <Badge>Badge</Badge>

      <Switch defaultChecked />

      <Slider defaultValue={[50]} />
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
            config.themeObject[resolvedTheme as "light" | "dark"].destructive
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
