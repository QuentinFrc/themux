"use client";

import { Check, CircleAlert, Link2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { ComponentErrorBoundary } from "@/components/error-boundary";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useTokens } from "@/hooks/use-tokens";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { useColorFormat, useModesInSync } from "@/store/preferences-store";
import type { BaseColorReference, ColorProperty, ThemeMode } from "@/types/theme";
import { TAILWIND_COLOR_NAMES, TAILWIND_SHADES } from "@/lib/palettes";
import { startCase } from "lodash";
import {
  colorFormatter,
  convertToHex,
  convertToOklch,
} from "@/utils/color-converter";
import { PasteColorControl } from "./customizer-controls";
import { TokenDisplay, TokenInfo } from "./token";

type SingleColorSetter = (obj: {
  property: ColorProperty;
  color: string;
  modesInSync?: boolean;
}) => void;

type PairedColorSetter = (obj: {
  property: ColorProperty;
  bgColor: string;
  fgColor: string;
  modesInSync?: boolean;
}) => void;

interface TokenColorPickerProps {
  colorProperty: ColorProperty;
  color: string;
  rawColor?: string;
  reference?: BaseColorReference;
  syncModes?: boolean;
  setColorTokens: SingleColorSetter | PairedColorSetter;
}

export function TokenColorPicker({
  colorProperty,
  color,
  rawColor,
  reference,
  syncModes,
  setColorTokens,
}: TokenColorPickerProps) {
  const {
    resolveColorValue,
    createBaseColorVar,
    getBaseColorReferenceFromValue,
    getBaseColor,
  } = useTokens();
  const [currentColor, setCurrentColor] = useState(color);
  const [isReferenceDialogOpen, setReferenceDialogOpen] = useState(false);
  const hexColor = convertToHex(color);
  const modesInSync = useModesInSync();
  const { currentThemeObject } = useThemeConfig();
  const { resolvedTheme } = useTheme();

  const resolvedModesInSync = syncModes !== undefined ? syncModes : modesInSync;
  const displayColor = rawColor ?? color;
  const currentReference =
    reference ?? getBaseColorReferenceFromValue(displayColor ?? "");
  const currentReferenceLabel = currentReference
    ? `--color-${currentReference.colorName}-${currentReference.shade}`
    : null;
  const baseColorOptions = useMemo(
    () =>
      TAILWIND_COLOR_NAMES.map((colorName) => ({
        colorName,
        shades: TAILWIND_SHADES.map((shade) => ({
          shade,
          value: getBaseColor({ colorName, shade }),
        })),
      })),
    [getBaseColor]
  );

  useEffect(() => {
    if (currentColor !== color) setCurrentColor(color);
  }, [color, currentColor]);

  // Helper to get the corresponding foreground color for a background property
  const getForegroundProperty = (bgProperty: ColorProperty): ColorProperty => {
    if (bgProperty === "background") return "foreground";
    return `${bgProperty}-foreground` as ColorProperty;
  };

  // Helper to get the current foreground color for a background property
  const getCurrentForegroundColor = (bgProperty: ColorProperty): string => {
    const fgProperty = getForegroundProperty(bgProperty);
    const mode = resolvedTheme === "dark" ? "dark" : "light";
    return currentThemeObject[mode][fgProperty] || "#ffffff";
  };

  // Check if this is a paired color setter (expects bgColor and fgColor)
  const isPairedColorSetter = (): boolean => {
    const hasCorrespondingForeground =
      colorProperty === "background" ||
      colorProperty === "primary" ||
      colorProperty === "secondary" ||
      colorProperty === "card" ||
      colorProperty === "popover" ||
      colorProperty === "muted" ||
      colorProperty === "accent" ||
      colorProperty === "destructive" ||
      colorProperty === "sidebar" ||
      colorProperty === "sidebar-primary" ||
      colorProperty === "sidebar-accent";

    return hasCorrespondingForeground;
  };

  const handleReferenceSelect = useCallback(
    ({ colorName, shade }: BaseColorReference) => {
      const baseColorVar = createBaseColorVar({ colorName, shade });
      const resolvedBaseColor = resolveColorValue(baseColorVar);

      if (isPairedColorSetter()) {
        const currentFgColor = getCurrentForegroundColor(colorProperty);
        const pairedSetter = setColorTokens as PairedColorSetter;
        pairedSetter({
          property: colorProperty,
          bgColor: baseColorVar,
          fgColor: currentFgColor,
          modesInSync: resolvedModesInSync,
        });
      } else {
        const singleSetter = setColorTokens as SingleColorSetter;
        singleSetter({
          property: colorProperty,
          color: baseColorVar,
          modesInSync: resolvedModesInSync,
        });
      }

      if (resolvedBaseColor) {
        setCurrentColor(resolvedBaseColor);
      }

      setReferenceDialogOpen(false);
    },
    [
      colorProperty,
      createBaseColorVar,
      getCurrentForegroundColor,
      isPairedColorSetter,
      resolveColorValue,
      resolvedModesInSync,
      setColorTokens,
    ]
  );

  const handleColorChange = useCallback(
    (color: string) => {
      const newOklchColor = convertToOklch(color);
      setCurrentColor(newOklchColor);

      if (isPairedColorSetter()) {
        // This is a background color with corresponding foreground
        const currentFgColor = getCurrentForegroundColor(colorProperty);

        const pairedSetter = setColorTokens as PairedColorSetter;
        pairedSetter({
          property: colorProperty,
          bgColor: newOklchColor,
          fgColor: currentFgColor,
          modesInSync: resolvedModesInSync,
        });
      } else {
        // This is a single color (foreground, border, etc.)
        const singleSetter = setColorTokens as SingleColorSetter;
        singleSetter({
          property: colorProperty,
          color: newOklchColor,
          modesInSync: resolvedModesInSync,
        });
      }
    },
    [
      resolvedModesInSync,
      colorProperty,
      currentThemeObject,
      resolvedTheme,
      setColorTokens,
    ]
  );

  const debouncedHandleColorChange = useDebouncedCallback(
    handleColorChange,
    100
  );

  // Create a wrapper for PasteColorControl that always expects single color format
  const handlePasteColorChange = useCallback(
    (obj: {
      property: ColorProperty;
      color: string;
      modesInSync?: boolean;
    }) => {
      handleColorChange(obj.color);
    },
    [handleColorChange]
  );

  return (
    <ComponentErrorBoundary
      fallback={<ColorPickerErrorFallback />}
      name="TokenColorPicker"
    >
      <CommandDialog
        onOpenChange={setReferenceDialogOpen}
        open={isReferenceDialogOpen}
      >
        <CommandInput placeholder="Search base colors..." />
        <CommandList>
          {baseColorOptions.map(({ colorName, shades }) => (
            <CommandGroup
              heading={startCase(colorName)}
              key={colorName}
            >
              {shades.map(({ shade, value }) => {
                const isActive =
                  currentReference?.colorName === colorName &&
                  currentReference?.shade === shade;

                return (
                  <CommandItem
                    key={`${colorName}-${shade}`}
                    onSelect={() =>
                      handleReferenceSelect({ colorName, shade })
                    }
                    value={`${colorName}-${shade}`}
                  >
                    <span
                      className="mr-2 inline-flex size-4 items-center justify-center rounded border"
                      style={{ backgroundColor: value }}
                    />
                    <span className="flex-1 font-mono text-xs">
                      {`--color-${colorName}-${shade}`}
                    </span>
                    {isActive ? <Check className="size-4" /> : null}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>

      <Popover>
        <div className="flex items-center gap-2">
          <PopoverTrigger className="relative cursor-pointer">
            <TokenDisplay color={displayColor} />
          </PopoverTrigger>
          <TokenInfo
            color={currentColor}
            colorProperty={colorProperty}
            rawColor={displayColor}
          />
        </div>

        <PopoverContent align="start" className="flex h-fit w-60 gap-6 p-4">
          <div className="w-full space-y-2">
            <div className="mx-auto w-fit">
              <HexColorPicker
                color={hexColor}
                onChange={debouncedHandleColorChange}
              />
            </div>
            <div className="w-fit">
              <ColorOklchValue currentColor={currentColor} />
            </div>
            <div className="space-y-1">
              <Button
                className="w-full justify-start gap-2"
                onClick={() => setReferenceDialogOpen(true)}
                size="sm"
                type="button"
                variant="outline"
              >
                <Link2 className="size-4" /> Link to base color
              </Button>
              {currentReferenceLabel ? (
                <p className="text-muted-foreground text-xs">
                  Linked to {currentReferenceLabel}
                </p>
              ) : null}
            </div>
            <PasteColorControl
              className="w-50"
              modesInSync={resolvedModesInSync}
              property={colorProperty}
              setColorTokens={handlePasteColorChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </ComponentErrorBoundary>
  );
}

function ColorOklchValue({ currentColor }: { currentColor: string }) {
  const colorFormat = useColorFormat();
  const colorValue = colorFormatter(currentColor, colorFormat, "4");

  return (
    <p className="font-mono text-muted-foreground text-xs">{colorValue}</p>
  );
}

// Error fallback to prevent *shittier* experiences, for the moment
function ColorPickerErrorFallback() {
  const { currentThemeObject } = useThemeConfig();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <div className="relative cursor-pointer">
        <TokenDisplay
          color={currentThemeObject[resolvedTheme as ThemeMode].destructive!}
        />
        <CircleAlert className="absolute inset-0 m-auto size-4 text-neutral-50" />
      </div>

      <div>
        <p className="font-mono font-semibold text-destructive text-xs">
          Error occurred. I'm sorry :/
        </p>
        <p className="truncate font-mono text-destructive/70 text-xs">
          For now, refresh the page.
        </p>
      </div>
    </div>
  );
}
