"use client";

import { useConfig } from "@/hooks/use-config";
import {
  ColorProperty,
  CssThemePropertiesWithoutRadius,
  OklchValue,
} from "@/types/theme";
import { getOptimalForegroundColor } from "@/utils/colors";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { TokenColorPicker } from "./color-picker";
import { Token } from "./token";
import { ScrollArea } from "./ui/scroll-area";

export function ColorTokens() {
  return (
    <div className="bg-muted h-full max-h-96 overflow-hidden rounded-lg border">
      <ScrollArea className="relative size-full overflow-hidden">
        <div className="bg-muted sticky top-0 isolate z-1 flex h-10 w-full items-center justify-between gap-2 border-b p-4">
          <span className="text-muted-foreground text-sm font-semibold">
            Color tokens
          </span>
        </div>

        <Tokens />
      </ScrollArea>
    </div>
  );
}

function Tokens() {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const [config, setConfig] = useConfig();

  const getColorFromThemeObject = useCallback(
    ({ property }: { property: ColorProperty }) => {
      return config.themeObject[mode][property];
    },
    [mode, config.themeObject[mode]],
  );

  const setPrimaryColorTokens = (primaryColor: OklchValue) => {
    const foregroundColor = getOptimalForegroundColor(primaryColor);

    setConfig((prev) => {
      return {
        ...prev,
        themeObject: {
          ...prev.themeObject,
          label: "Custom",
          name: "custom",
          light: {
            ...prev.themeObject.light,
            primary: primaryColor,
            "primary-foreground": foregroundColor,
            ring: primaryColor,
            "sidebar-primary": primaryColor,
            "sidebar-primary-foreground": foregroundColor,
            "sidebar-ring": primaryColor,
          },
          dark: {
            ...prev.themeObject.dark,
            primary: primaryColor,
            "primary-foreground": foregroundColor,
            ring: primaryColor,
            "sidebar-primary": primaryColor,
            "sidebar-primary-foreground": foregroundColor,
            "sidebar-ring": primaryColor,
          },
        },
      };
    });
  };

  const getStaticTokens = () => {
    let currentThemeObject: CssThemePropertiesWithoutRadius;

    if (mode === "light") {
      const { radius, ...rest } = config.themeObject.light;
      currentThemeObject = { ...rest };
    } else {
      currentThemeObject = config.themeObject.dark;
    }

    const staticTokens = Object.entries(currentThemeObject).map(
      ([property, value]) => ({
        property,
        value,
      }),
    ) as { property: ColorProperty; value: OklchValue }[];

    return staticTokens.filter(
      (token) =>
        token.property !== "primary-foreground" && token.property !== "primary",
    );
  };

  return (
    <div className="space-y-4 p-4">
      <TokenColorPicker
        colorProperty="primary"
        oklchColor={getColorFromThemeObject({
          property: "primary",
        })}
        setColorTokens={setPrimaryColorTokens}
      />
      <Token
        colorProperty="primary-foreground"
        oklchColor={getColorFromThemeObject({
          property: "primary-foreground",
        })}
      />

      {getStaticTokens().map((token) => (
        <Token
          colorProperty={token.property as ColorProperty}
          oklchColor={token.value}
          key={token.property}
        />
      ))}
    </div>
  );
}
