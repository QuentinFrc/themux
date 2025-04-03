"use client";

import { useConfig } from "@/hooks/use-config";
import { useMediaQuery } from "@/hooks/use-media-query";
import { TAILWIND_PALETTE_V4 } from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { TailwindShadeKey } from "@/types/palette";
import { ColorProperty, OklchValue, ThemeMode } from "@/types/theme";
import { convertToHex, convertToOklch } from "@/utils/color-converter";
import { getOptimalForegroundColor } from "@/utils/colors";
import { CircleAlert, Pipette } from "lucide-react";
import { useTheme } from "next-themes";
import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HexColorPicker } from "react-colorful";
import { ComponentErrorBoundary } from "./error-boundary";
import { TokenDisplay, TokenInfo } from "./token";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
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
  const hexColor = convertToHex(oklchColor);
  const isMobile = useMediaQuery("(max-width: 500px)");

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

          <SheetContent className="flex w-full gap-6 p-6 pb-12" side="bottom">
            <SheetTitle className="sr-only">Color picker</SheetTitle>

            <div className="flex flex-col gap-4 pt-4 pb-6">
              <div className="flex gap-6">
                <div className="space-y-2">
                  <HexColorPicker
                    color={hexColor}
                    onChange={handleColorChange}
                  />
                  <ColorOklchValue currentColor={currentColor} />
                </div>

                <div className="w-full">
                  <MemoizedPreviewComponents currentColor={currentColor} />
                </div>
              </div>

              <div className="flex flex-col gap-3 text-sm">
                <Label className="text-muted-foreground">Tailwind colors</Label>
                <MemoizedTailwindV4ColorPalette
                  currentColor={currentColor}
                  shade={500}
                  handleColorChange={handleColorChange}
                />
              </div>
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

          <div className="flex max-w-26 flex-col gap-3 text-sm">
            <Label className="text-muted-foreground">Tailwind colors</Label>
            <MemoizedTailwindV4ColorPalette
              currentColor={currentColor}
              shade={500}
              handleColorChange={handleColorChange}
            />
          </div>
          <MemoizedPreviewComponents currentColor={currentColor} />
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
              "bg-primary outline-border hover:bg-primary/80 relative size-5 rounded-lg border outline-2 outline-offset-2",
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

const MemoizedPreviewComponents = React.memo(PreviewComponents);
function PreviewComponents({ currentColor }: { currentColor: OklchValue }) {
  const foregroundColor = useMemo(
    () => getOptimalForegroundColor(currentColor),
    [currentColor],
  );

  return (
    <div
      className="flex flex-col gap-3 text-sm"
      style={{
        "--primary": currentColor,
        "--primary-foreground": foregroundColor,
      }}
    >
      <Label className="text-muted-foreground">Preview</Label>
      <div className="flex w-full flex-wrap items-center gap-2">
        <Button>Button</Button>
        <Button variant={"link"}>Link</Button>
      </div>

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
