"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useSettings } from "@/hooks/use-settings";
import { TAILWIND_SHADES, TailwindShadeKey } from "@/lib/palettes";
import {
  BrickWall,
  ClipboardPaste,
  Paintbrush,
  SquareRoundCorner,
  SunMoon,
} from "lucide-react";
import { useState } from "react";
import { CopyCodeButtonDialog } from "./copy-code-button-dialog";
import {
  PasteColorControl,
  RadiusControls,
  SurfaceShadesControl,
  ThemeModeControls,
} from "./customizer-controls";
import { CustomizerSettings } from "./customizer-settings";
import { ResetButton } from "./reset-button";
import { MemoizedTailwindV4ColorPalette } from "./tailwind-v4-palette";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PLACEHOLDERS = [
  "oklch(0.685 0.169 237.323)",
  "hsl(199.18 100% 47.843%)",
  "rgb(0, 166, 244)",
  "#00a6f4",
];

export function QuickCustomizer() {
  const { getColorToken, setPrimaryColorTokens } = useColorTokens();

  const { modesInSync } = useSettings();
  const [shade, setShade] = useState<TailwindShadeKey>("500");

  return (
    <div className="@container flex flex-wrap items-start gap-6 sm:flex-row">
      {/* Paste your primary color */}
      <section className="grow space-y-1.5 md:flex-1">
        <Label className="flex items-center gap-1 pb-2">
          <ClipboardPaste className="size-4" /> Paste your primary color
        </Label>
        <PasteColorControl
          setColorTokens={setPrimaryColorTokens}
          modesInSync={modesInSync}
        />
      </section>

      {/* Theme modes */}
      <section className="relative grow space-y-1.5 sm:flex-1">
        <Label className="flex items-center gap-1 pb-2">
          <SunMoon className="size-4" /> Mode
        </Label>
        <ThemeModeControls
          showSystem={false}
          className="flex flex-row gap-2 @6xl:flex-col"
        />
      </section>

      {/* Primary color */}
      <section className="grow space-y-1.5">
        <div className="flex items-start justify-between gap-2 pb-1">
          <Label className="flex items-center gap-1">
            <Paintbrush className="size-4" /> Primary color
          </Label>
          <Label className="text-muted-foreground flex gap-1">
            Shade
            <Select
              value={shade}
              onValueChange={(v: TailwindShadeKey) => setShade(v)}
            >
              <SelectTrigger
                size="sm"
                className="data-[size=sm]:h-5 data-[size=sm]:px-2 data-[size=sm]:text-xs"
              >
                <SelectValue defaultValue={shade} />
              </SelectTrigger>
              <SelectContent className="w-fit min-w-0">
                <SelectGroup>
                  <SelectLabel>Shade</SelectLabel>
                  {TAILWIND_SHADES.map((shade) => (
                    <SelectItem value={shade} key={shade}>
                      {shade}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </div>
        <div className="grid w-full shrink-0 grid-cols-11 gap-1.5">
          <MemoizedTailwindV4ColorPalette
            currentColor={getColorToken({
              property: "primary",
            })}
            shade={shade}
            className="contents"
            modesInSync={modesInSync}
          />
        </div>
      </section>

      {/* Surface shades */}
      <section className="relative grow space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <BrickWall className="size-4" />
          Surface shades
        </Label>
        <SurfaceShadesControl />
      </section>

      {/* Radius */}
      <section className="relative grow space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="grid w-auto grid-cols-6 gap-2 @6xl:grid-cols-3" />
      </section>

      {/* Action buttons */}
      <section className="grid grow grid-cols-[3fr_1fr] place-content-center items-center gap-2 self-baseline-last sm:grid-cols-[2fr_1fr] @7xl:grid-cols-1">
        <CopyCodeButtonDialog size="sm" />
        <div className="flex w-full gap-1">
          <ResetButton variant="outline" size="sm" className="grow" />
          <CustomizerSettings />
        </div>
      </section>
    </div>
  );
}
