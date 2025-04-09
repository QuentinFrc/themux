"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { ControlSection } from "./customizer-controls";
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

export function TokensList({ className }: React.ComponentProps<"div">) {
  const {
    getColorToken,
    setPrimaryColorTokens,
    setColorToken,
    setColorTokenWithForeground,
  } = useColorTokens();

  return (
    <div className={cn("grid space-y-2", className)}>
      <ControlSection title="Base colors" id="base-colors" expanded>
        <TokenColorPicker
          colorProperty="background"
          oklchColor={getColorToken({
            property: "background",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="foreground"
          oklchColor={getColorToken({
            property: "foreground",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection title="Primary colors" id="primary-colors" expanded>
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
      </ControlSection>

      <ControlSection title="Secondary colors" id="secondary-colors">
        <TokenColorPicker
          colorProperty="secondary"
          oklchColor={getColorToken({
            property: "secondary",
          })}
          setColorTokens={setColorTokenWithForeground}
        />
        <Token
          colorProperty="secondary-foreground"
          oklchColor={getColorToken({
            property: "secondary-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Card colors" id="card-colors">
        <TokenColorPicker
          colorProperty="card"
          oklchColor={getColorToken({
            property: "card",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="card-foreground"
          oklchColor={getColorToken({
            property: "card-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Popover colors" id="popover-colors">
        <TokenColorPicker
          colorProperty="popover"
          oklchColor={getColorToken({
            property: "popover",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="popover-foreground"
          oklchColor={getColorToken({
            property: "popover-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Muted colors" id="muted-colors">
        <TokenColorPicker
          colorProperty="muted"
          oklchColor={getColorToken({
            property: "muted",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="muted-foreground"
          oklchColor={getColorToken({
            property: "muted-foreground",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection title="Accent colors" id="accent-colors">
        <TokenColorPicker
          colorProperty="accent"
          oklchColor={getColorToken({
            property: "accent",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="accent-foreground"
          oklchColor={getColorToken({
            property: "accent-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Destructive colors" id="destructive-colors">
        <TokenColorPicker
          colorProperty="destructive"
          oklchColor={getColorToken({
            property: "destructive",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection
        title="Border/Input/Ring colors"
        id="border-input-ring-colors"
      >
        <TokenColorPicker
          colorProperty="border"
          oklchColor={getColorToken({
            property: "border",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="input"
          oklchColor={getColorToken({
            property: "input",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="ring"
          oklchColor={getColorToken({
            property: "ring",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection title="Chart colors" id="chart-colors">
        <TokenColorPicker
          colorProperty="chart-1"
          oklchColor={getColorToken({
            property: "chart-1",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-2"
          oklchColor={getColorToken({
            property: "chart-2",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-3"
          oklchColor={getColorToken({
            property: "chart-3",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-4"
          oklchColor={getColorToken({
            property: "chart-4",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-5"
          oklchColor={getColorToken({
            property: "chart-5",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection title="Sidebar colors" id="sidebar-colors">
        <TokenColorPicker
          colorProperty="sidebar"
          oklchColor={getColorToken({
            property: "sidebar",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-foreground"
          oklchColor={getColorToken({
            property: "sidebar-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-primary"
          oklchColor={getColorToken({
            property: "sidebar-primary",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-primary-foreground"
          oklchColor={getColorToken({
            property: "sidebar-primary-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-accent"
          oklchColor={getColorToken({
            property: "sidebar-accent",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-accent-foreground"
          oklchColor={getColorToken({
            property: "sidebar-accent-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-border"
          oklchColor={getColorToken({
            property: "sidebar-border",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="sidebar-ring"
          oklchColor={getColorToken({
            property: "sidebar-ring",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>
    </div>
  );
}
