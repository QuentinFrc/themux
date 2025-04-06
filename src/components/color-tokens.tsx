"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useConfig } from "@/hooks/use-config";
import { cn } from "@/lib/utils";
import { ColorProperty, OklchValue } from "@/types/theme";
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
      <div className={cn("h-full rounded-lg", className)}>
        <ScrollArea className="relative size-full">
          <TokensList />
        </ScrollArea>
      </div>
    </div>
  );
}

export function TokensList() {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const [config] = useConfig();
  const { getColorToken, setPrimaryColorTokens } = useColorTokens();

  const getStaticTokens = useCallback(() => {
    const currentThemeObject = config.themeObject[mode];

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
  }, [mode]);

  return (
    <div className="grid space-y-2">
      <TokenColorPicker
        colorProperty="primary"
        oklchColor={getColorToken({
          property: "primary",
        })}
        setColorTokens={setPrimaryColorTokens}
      />
      <Token
        colorProperty="primary-foreground"
        oklchColor={getColorToken({
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
