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
import { cn } from "@/lib/utils";
import { ColorFormat, TailwindVersion } from "@/types/theme";
import { Repeat, Settings } from "lucide-react";
import { ComponentProps } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function CustomizerSettings({
  className,
  ...props
}: ComponentProps<"div">) {
  const {
    modesInSync,
    updateSettings,
    resetSettings,
    tailwindVersion,
    colorFormat,
  } = useSettings();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-80 p-0", className)} align="end">
        <header className="text-muted-foreground flex items-center justify-between px-4 py-2 text-sm font-semibold">
          <span>Customizer settings</span>{" "}
          <Button variant="ghost" onClick={resetSettings}>
            <Repeat />
            <span className="sr-only">Reset</span>
          </Button>
        </header>

        <Separator className="mb-2" />

        <section className="grid px-4 pb-4">
          <Label className="text-muted-foreground py-1 text-xs">
            Color tokens
          </Label>
          <div className="flex items-center rounded-lg">
            <div className="flex flex-col gap-1">
              <span className="text-sm">Sync light and dark modes</span>
              <span className="text-muted-foreground w-[25ch] text-xs">
                Tokens will sync for both modes, except for surface presets.
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
        </section>

        <section className="grid px-4 pb-4">
          <Label className="text-muted-foreground py-1 text-xs">
            Preferences
          </Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 rounded-lg">
              <div className="flex flex-col gap-1">
                <span className="text-sm">Tailwind version</span>
                <span className="text-muted-foreground w-[25ch] text-xs">
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
                <span className="text-muted-foreground w-[25ch] text-xs">
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
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}
