"use client";

import { Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTokens } from "@/hooks/use-tokens";
import { cn } from "@/lib/utils";
import { ControlSection } from "./customizer-controls";
import { TokenColorPicker } from "./token-color-picker";

export function ColorTokens({ className }: React.ComponentProps<"div">) {
  return (
    <section className="h-full space-y-1.5">
      <Label className="flex items-center gap-1 pb-2">
        <Palette className="size-4" /> Color tokens
      </Label>

      <TokensList className={className} />
    </section>
  );
}

function TokensList({ className }: React.ComponentProps<"div">) {
  const { getColorToken, setColorToken, setColorTokenWithForeground } =
    useTokens();

  return (
    <div className={cn("space-y-2", className)}>
      <ControlSection expanded id="base-colors" title="Base colors">
        <TokenColorPicker
          color={getColorToken({
            property: "background",
          })}
          colorProperty="background"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "foreground",
          })}
          colorProperty="foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection expanded id="primary-colors" title="Primary colors">
        <TokenColorPicker
          color={getColorToken({
            property: "primary",
          })}
          colorProperty="primary"
          setColorTokens={setColorTokenWithForeground}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "primary-foreground",
          })}
          colorProperty="primary-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="secondary-colors" title="Secondary colors">
        <TokenColorPicker
          color={getColorToken({
            property: "secondary",
          })}
          colorProperty="secondary"
          setColorTokens={setColorTokenWithForeground}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "secondary-foreground",
          })}
          colorProperty="secondary-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="card-colors" title="Card colors">
        <TokenColorPicker
          color={getColorToken({
            property: "card",
          })}
          colorProperty="card"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "card-foreground",
          })}
          colorProperty="card-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="popover-colors" title="Popover colors">
        <TokenColorPicker
          color={getColorToken({
            property: "popover",
          })}
          colorProperty="popover"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "popover-foreground",
          })}
          colorProperty="popover-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="muted-colors" title="Muted colors">
        <TokenColorPicker
          color={getColorToken({
            property: "muted",
          })}
          colorProperty="muted"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "muted-foreground",
          })}
          colorProperty="muted-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="accent-colors" title="Accent colors">
        <TokenColorPicker
          color={getColorToken({
            property: "accent",
          })}
          colorProperty="accent"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "accent-foreground",
          })}
          colorProperty="accent-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </ControlSection>

      <ControlSection id="destructive-colors" title="Destructive colors">
        <TokenColorPicker
          color={getColorToken({
            property: "destructive",
          })}
          colorProperty="destructive"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        {getColorToken({
          property: "destructive-foreground",
        }) && (
          <TokenColorPicker
            color={getColorToken({
              property: "destructive-foreground",
            })}
            colorProperty="destructive-foreground"
            setColorTokens={setColorToken}
            syncModes={false}
          />
        )}
      </ControlSection>

      <ControlSection
        id="border-input-ring-colors"
        title="Border/Input/Ring colors"
      >
        <TokenColorPicker
          color={getColorToken({
            property: "border",
          })}
          colorProperty="border"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "input",
          })}
          colorProperty="input"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "ring",
          })}
          colorProperty="ring"
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection id="chart-colors" title="Chart colors">
        <TokenColorPicker
          color={getColorToken({
            property: "chart-1",
          })}
          colorProperty="chart-1"
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "chart-2",
          })}
          colorProperty="chart-2"
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "chart-3",
          })}
          colorProperty="chart-3"
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "chart-4",
          })}
          colorProperty="chart-4"
          setColorTokens={setColorToken}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "chart-5",
          })}
          colorProperty="chart-5"
          setColorTokens={setColorToken}
        />
      </ControlSection>

      <ControlSection id="sidebar-colors" title="Sidebar colors">
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar",
          })}
          colorProperty="sidebar"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-foreground",
          })}
          colorProperty="sidebar-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-primary",
          })}
          colorProperty="sidebar-primary"
          setColorTokens={setColorTokenWithForeground}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-primary-foreground",
          })}
          colorProperty="sidebar-primary-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-accent",
          })}
          colorProperty="sidebar-accent"
          setColorTokens={setColorTokenWithForeground}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-accent-foreground",
          })}
          colorProperty="sidebar-accent-foreground"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-border",
          })}
          colorProperty="sidebar-border"
          setColorTokens={setColorToken}
          syncModes={false}
        />
        <TokenColorPicker
          color={getColorToken({
            property: "sidebar-ring",
          })}
          colorProperty="sidebar-ring"
          setColorTokens={setColorToken}
        />
      </ControlSection>
    </div>
  );
}
