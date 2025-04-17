"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { ControlSection } from "./customizer-controls";
import { Token } from "./token";
import { TokenColorPicker } from "./token-color-picker";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";

export function ColorTokens({ className }: React.ComponentProps<"div">) {
  return (
    <section className="h-full space-y-1.5">
      <Label className="flex items-center gap-1 pb-2">
        <Palette className="size-4" /> Tokens
      </Label>
      <div className={cn("h-full rounded-lg")}>
        <ScrollArea className="relative size-full">
          <TokensList className={className} />
        </ScrollArea>
      </div>
    </section>
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
    <div className={cn("space-y-2", className)}>
      <ControlSection title="Base colors" id="base-colors" expanded>
        <TokenColorPicker
          colorProperty="background"
          color={getColorToken({
            property: "background",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="foreground"
          color={getColorToken({
            property: "foreground",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection title="Primary colors" id="primary-colors" expanded>
        <TokenColorPicker
          colorProperty="primary"
          color={getColorToken({
            property: "primary",
          })}
          setColorTokens={setPrimaryColorTokens}
        />
        <Token
          colorProperty="primary-foreground"
          color={getColorToken({
            property: "primary-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Secondary colors" id="secondary-colors">
        <TokenColorPicker
          colorProperty="secondary"
          color={getColorToken({
            property: "secondary",
          })}
          setColorTokens={setColorTokenWithForeground}
        />
        <Token
          colorProperty="secondary-foreground"
          color={getColorToken({
            property: "secondary-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Card colors" id="card-colors">
        <TokenColorPicker
          colorProperty="card"
          color={getColorToken({
            property: "card",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="card-foreground"
          color={getColorToken({
            property: "card-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Popover colors" id="popover-colors">
        <TokenColorPicker
          colorProperty="popover"
          color={getColorToken({
            property: "popover",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="popover-foreground"
          color={getColorToken({
            property: "popover-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Muted colors" id="muted-colors">
        <TokenColorPicker
          colorProperty="muted"
          color={getColorToken({
            property: "muted",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="muted-foreground"
          color={getColorToken({
            property: "muted-foreground",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection title="Accent colors" id="accent-colors">
        <TokenColorPicker
          colorProperty="accent"
          color={getColorToken({
            property: "accent",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="accent-foreground"
          color={getColorToken({
            property: "accent-foreground",
          })}
        />
      </ControlSection>

      <ControlSection title="Destructive colors" id="destructive-colors">
        <TokenColorPicker
          colorProperty="destructive"
          color={getColorToken({
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
          color={getColorToken({
            property: "border",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="input"
          color={getColorToken({
            property: "input",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="ring"
          color={getColorToken({
            property: "ring",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection title="Chart colors" id="chart-colors">
        <TokenColorPicker
          colorProperty="chart-1"
          color={getColorToken({
            property: "chart-1",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-2"
          color={getColorToken({
            property: "chart-2",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-3"
          color={getColorToken({
            property: "chart-3",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-4"
          color={getColorToken({
            property: "chart-4",
          })}
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          colorProperty="chart-5"
          color={getColorToken({
            property: "chart-5",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection title="Sidebar colors" id="sidebar-colors">
        <TokenColorPicker
          colorProperty="sidebar"
          color={getColorToken({
            property: "sidebar",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-foreground"
          color={getColorToken({
            property: "sidebar-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-primary"
          color={getColorToken({
            property: "sidebar-primary",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-primary-foreground"
          color={getColorToken({
            property: "sidebar-primary-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-accent"
          color={getColorToken({
            property: "sidebar-accent",
          })}
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <Token
          colorProperty="sidebar-accent-foreground"
          color={getColorToken({
            property: "sidebar-accent-foreground",
          })}
        />
        <TokenColorPicker
          colorProperty="sidebar-border"
          color={getColorToken({
            property: "sidebar-border",
          })}
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          colorProperty="sidebar-ring"
          color={getColorToken({
            property: "sidebar-ring",
          })}
          setColorTokens={setColorToken}
        />
      </ControlSection>
    </div>
  );
}
