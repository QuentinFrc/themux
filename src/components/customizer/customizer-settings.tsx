"use client";

import { RotateCcw, Settings } from "lucide-react";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  useColorFormat,
  useFontVars,
  useModesInSync,
  usePreferencesActions,
  useShadowVars,
  useShowTooltips,
  useTailwindVersion,
} from "@/store/preferences-store";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function CustomizerSettings({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const colorFormat = useColorFormat();
  const tailwindVersion = useTailwindVersion();
  const showFontVars = useFontVars();
  const showShadowVars = useShadowVars();
  const showTootips = useShowTooltips();
  const modesInSync = useModesInSync();

  const {
    setColorFormat,
    setTailwindVersion,
    setShowFontVars,
    setShowShadowsVars,
    setShowTooltips,
    resetSettings,
    setModesInSync,
  } = usePreferencesActions();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={className} size="sm" variant="ghost" {...props}>
          <Settings /> <span className="@xl:inline-flex hidden">Settings</span>
          <span className="sr-only">Settings</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="isolate w-72 max-w-full p-0 sm:w-auto"
      >
        <header className="flex items-center justify-between px-4 py-1 font-semibold text-muted-foreground/80 text-sm">
          <span>Customizer settings</span>
          <Button onClick={resetSettings} variant="ghost">
            <RotateCcw />
            <span className="sr-only">Reset</span>
          </Button>
        </header>

        <Separator />

        <ScrollArea className="flex max-h-84 flex-col">
          <section className="grid px-4 pt-2 pb-4">
            <Label className="py-1 text-muted-foreground/80 text-xs">
              Preferences
            </Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Tailwind version</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    For the generated CSS. Supports v3 and v4.
                  </span>
                </div>
                <Select
                  onValueChange={setTailwindVersion}
                  value={tailwindVersion}
                >
                  <SelectTrigger className="h-fit min-w-18 px-2 text-xs">
                    <SelectValue className="h-fit p-0" placeholder="Version" />
                  </SelectTrigger>
                  <SelectContent className="p-0">
                    <SelectItem className="text-xs" value="4">
                      v4
                    </SelectItem>
                    <SelectItem className="text-xs" value="3">
                      v3
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Color format</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    For the generated CSS. Supports oklch, hsl, rbg and hex.
                  </span>
                </div>
                <Select onValueChange={setColorFormat} value={colorFormat}>
                  <SelectTrigger className="h-fit min-w-18 px-2 text-xs">
                    <SelectValue className="h-fit p-0" placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent className="p-0">
                    <SelectItem className="text-xs" value={"oklch"}>
                      oklch
                    </SelectItem>
                    <SelectItem className="text-xs" value={"hsl"}>
                      hsl
                    </SelectItem>
                    <SelectItem className="text-xs" value={"rgb"}>
                      rgb
                    </SelectItem>
                    <SelectItem className="text-xs" value={"hex"}>
                      hex
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Show tooltips</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    Enable or disable tooltips throughout the app.
                  </span>
                </div>
                <Switch
                  checked={showTootips}
                  className="ml-auto"
                  onCheckedChange={setShowTooltips}
                />
              </div>
            </div>
          </section>

          <section className="grid px-4 pb-4">
            <Label className="py-1 text-muted-foreground/80 text-xs">
              Tokens
            </Label>
            <div className="space-y-4">
              <div className="flex items-center rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Sync both modes</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    Brand tokens will be in sync in light and dark modes.
                    Presets are always synced.
                  </span>
                </div>
                <Switch
                  checked={modesInSync}
                  className="ml-auto"
                  onCheckedChange={setModesInSync}
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Show font variables</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    Keep this OFF if you handle fonts separately.
                  </span>
                </div>
                <Switch
                  checked={showFontVars}
                  className="ml-auto"
                  onCheckedChange={setShowFontVars}
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg">
                <div className="flex flex-col gap-1">
                  <span className="text-sm">Show shadow variables</span>
                  <span className="hidden w-[32ch] text-muted-foreground/80 text-xs sm:inline-flex">
                    Show shadow variables in the generated CSS.
                  </span>
                </div>
                <Switch
                  checked={showShadowVars}
                  className="ml-auto"
                  onCheckedChange={setShowShadowsVars}
                />
              </div>
            </div>
          </section>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
