"use client";

import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  TAILWIND_PALETTE_V4,
  TAILWIND_SHADES,
  TailwindShadeKey,
} from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { ColorProperty, OklchValue, ThemeMode } from "@/types/theme";
import { convertToHex, convertToOklch } from "@/utils/color-converter";
import { CircleAlert, Pipette } from "lucide-react";
import { useTheme } from "next-themes";
import React, { ComponentProps, useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ComponentErrorBoundary } from "./error-boundary";
import { TokenDisplay, TokenInfo } from "./token";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
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
  const hexColor = convertToHex(oklchColor);
  const isMobile = useMediaQuery("(max-width: 500px)");
  const [shade, setShade] = useState<TailwindShadeKey>("500");

  useEffect(() => {
    if (currentColor !== oklchColor) setCurrentColor(oklchColor);
  }, [oklchColor]);

  const debouncedSetColorTokens = useDebouncedCallback(setColorTokens, 200);

  const handleColorChange = useCallback((color: string) => {
    const newOklchColor = convertToOklch(color);
    setCurrentColor(newOklchColor);
    debouncedSetColorTokens(newOklchColor);
  }, []);

  if (isMobile) {
    return (
      <ComponentErrorBoundary
        name="TokenColorPicker"
        fallback={<ColorPickerErrorFallback />}
      >
        <Sheet>
          <div className="flex items-center gap-2">
            <SheetTrigger className="relative cursor-pointer">
              <TokenDisplay oklchColor={oklchColor} />
              <Pipette className="text-primary-foreground fill-primary-foreground absolute inset-0 m-auto size-4" />
            </SheetTrigger>
            <TokenInfo colorProperty={colorProperty} oklchColor={oklchColor} />
          </div>

          <SheetContent
            className="flex w-full flex-row gap-6 p-4 py-10"
            side="bottom"
          >
            <SheetTitle className="sr-only">Color picker</SheetTitle>

            <div className="space-y-2">
              <HexColorPicker color={hexColor} onChange={handleColorChange} />
              <ColorOklchValue currentColor={currentColor} />
            </div>

            <div className="flex max-w-34 flex-col gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Label className="text-muted-foreground">Tailwind colors</Label>
              </div>

              <MemoizedTailwindV4ColorPalette
                currentColor={currentColor}
                shade={shade}
                handleColorChange={handleColorChange}
              />

              <Label className="text-muted-foreground">
                Shade
                <Select
                  value={shade}
                  onValueChange={(v: TailwindShadeKey) => setShade(v)}
                >
                  <SelectTrigger size="sm" className="px-2">
                    <SelectValue defaultValue={shade} />
                  </SelectTrigger>
                  <SelectContent className="w-fit min-w-0">
                    <SelectGroup>
                      <SelectLabel>Shade</SelectLabel>
                      {TAILWIND_SHADES.map((shade) => (
                        <SelectItem value={shade} key={shade}>
                          {shade}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Label>
            </div>
          </SheetContent>
        </Sheet>
      </ComponentErrorBoundary>
    );
  }

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

        <PopoverContent className="bg-background flex size-fit gap-6 p-6">
          <div className="space-y-2">
            <HexColorPicker color={hexColor} onChange={handleColorChange} />
            <ColorOklchValue currentColor={currentColor} />
          </div>

          <div className="flex max-w-34 flex-col gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Label className="text-muted-foreground">Tailwind colors</Label>
            </div>

            <MemoizedTailwindV4ColorPalette
              currentColor={currentColor}
              shade={shade}
              handleColorChange={handleColorChange}
            />

            <Label className="text-muted-foreground">
              Shade
              <Select
                value={shade}
                onValueChange={(v: TailwindShadeKey) => setShade(v)}
              >
                <SelectTrigger size="sm" className="px-2">
                  <SelectValue defaultValue={shade} />
                </SelectTrigger>
                <SelectContent className="w-fit min-w-0">
                  <SelectGroup>
                    <SelectLabel>Shade</SelectLabel>
                    {TAILWIND_SHADES.map((shade) => (
                      <SelectItem value={shade} key={shade}>
                        {shade}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
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

const MemoizedTailwindV4ColorPalette = React.memo(TailwindV4ColorPalette);
function TailwindV4ColorPalette({
  currentColor,
  shade,
  handleColorChange,
  className,
  ...props
}: {
  currentColor: OklchValue;
  shade: TailwindShadeKey;
  handleColorChange: (color: string) => void;
} & ComponentProps<"div">) {
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
          <button
            className={cn(
              "bg-primary outline-border hover:bg-primary/80 relative size-5 rounded-lg border outline-1 outline-offset-2 sm:outline-2",
              isActive && "outline-primary/70",
            )}
            key={key}
            style={{ "--primary": color }}
            onClick={() => handleColorChange(color)}
          >
            <div
              className={cn(
                "bg-background absolute inset-0 m-auto size-3 rounded-lg transition",
                isActive ? "scale-100" : "scale-0",
              )}
            />
          </button>
        );
      })}
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
