"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useSettings } from "@/hooks/use-settings";
import { ColorFormat, TailwindVersion } from "@/types/theme";
import { Repeat, Settings } from "lucide-react";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TooltipWrapper } from "../tooltip-wrapper";

export function CustomizerSettings({
  className,
  ...props
}: ComponentProps<typeof PopoverTrigger>) {
  const {
    modesInSync,
    updateSettings,
    resetSettings,
    tailwindVersion,
    colorFormat,
    showTootips,
    fontVars,
    shadows,
  } = useSettings();

  return (
    <Popover>
      <PopoverTrigger asChild {...props}>
        <Button variant="ghost" size="sm">
          <span className="hidden @md:inline-flex">Settings</span> <Settings />
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-92 p-0" align="end">
        <header className="text-muted-foreground flex items-center justify-between px-4 py-2 text-sm font-semibold">
          <span>Customizer settings</span>{" "}
          <TooltipWrapper asChild label="Reset settings">
            <Button variant="ghost" onClick={resetSettings}>
              <Repeat />
              <span className="sr-only">Reset</span>
            </Button>
          </TooltipWrapper>
        </header>

        <Separator className="mb-2" />

        <section className="grid px-4 pb-4">
          <Label className="text-muted-foreground py-1 text-xs">Tokens</Label>
          <div className="space-y-4">
            <div className="flex items-center rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Sync both modes</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  {`Brand tokens will be in sync in light and dark modes. Presets are always synced.`}
                </span>
              </div>
              <Switch
                className="ml-auto"
                checked={modesInSync}
                onCheckedChange={(isActive) =>
                  updateSettings({ modesInSync: isActive })
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Show font variables</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  Keep this setting OFF if you handle fonts separately.
                </span>
              </div>
              <Switch
                className="ml-auto"
                checked={fontVars}
                onCheckedChange={(isActive) =>
                  updateSettings({ fontVars: isActive })
                }
              />
            </div>
            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Show shadow variables</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  Show shadow variables in the generated CSS output.
                </span>
              </div>
              <Switch
                className="ml-auto"
                checked={shadows}
                onCheckedChange={(isActive) =>
                  updateSettings({ shadows: isActive })
                }
              />
            </div>
          </div>
        </section>

        <section className="grid px-4 pb-4">
          <Label className="text-muted-foreground py-1 text-xs">
            Preferences
          </Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Tailwind version</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  For the generated CSS output. Supports v3 and v4.
                </span>
              </div>
              <Select
                value={tailwindVersion}
                onValueChange={(v) =>
                  updateSettings({ tailwindVersion: v as TailwindVersion })
                }
              >
                <SelectTrigger className="h-fit min-w-18 px-2 text-xs">
                  <SelectValue placeholder="Version" className="h-fit p-0" />
                </SelectTrigger>
                <SelectContent className="p-0">
                  <SelectItem value="4" className="text-xs">
                    v4
                  </SelectItem>
                  <SelectItem value="3" className="text-xs">
                    v3
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Color format</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  For the generated CSS output. Supports oklch, hsl, rbg and
                  hex.
                </span>
              </div>
              <Select
                value={colorFormat}
                onValueChange={(v) =>
                  updateSettings({ colorFormat: v as ColorFormat })
                }
              >
                <SelectTrigger className="h-fit min-w-18 px-2 text-xs">
                  <SelectValue placeholder="Format" className="h-fit p-0" />
                </SelectTrigger>
                <SelectContent className="p-0">
                  <SelectItem value={"oklch"} className="text-xs">
                    oklch
                  </SelectItem>
                  <SelectItem value={"hsl"} className="text-xs">
                    hsl
                  </SelectItem>
                  <SelectItem value={"rgb"} className="text-xs">
                    rgb
                  </SelectItem>
                  <SelectItem value={"hex"} className="text-xs">
                    hex
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Show tooltips</span>
                <span className="text-muted-foreground w-[28ch] text-xs">
                  Enable or disable tooltips throughout the app.
                </span>
              </div>
              <Switch
                className="ml-auto"
                checked={showTootips}
                onCheckedChange={(isActive) =>
                  updateSettings({ showTootips: isActive })
                }
              />
            </div>
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}
