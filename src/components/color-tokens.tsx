"use client";

import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import {
  ColorProperty,
  CssThemePropertiesWithoutRadius,
  OklchValue,
} from "@/types/theme";
import { getOptimalForegroundColor } from "@/utils/colors";
import { Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { Token } from "./token";
import { TokenColorPicker } from "./token-color-picker";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

export function ColorTokens({ className }: React.ComponentProps<"div">) {
  return (
    <div className="h-full space-y-1.5">
      <Label className="flex items-center gap-1 pb-2">
        <Palette className="size-4" /> Tokens
      </Label>
      <div
        className={cn("h-full overflow-hidden rounded-lg border", className)}
      >
        <ScrollArea className="relative size-full overflow-hidden p-2">
          <TokensList />
        </ScrollArea>
      </div>
    </div>
  );
}

export function TokensList() {
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
    <div className="[&>*:hover]:bg-accent/70 grid [&>*]:rounded-lg [&>*]:p-2">
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
