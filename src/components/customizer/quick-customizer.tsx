"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
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
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
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

export function QuickCustomizer() {
  const { getColorToken, setPrimaryColorTokens } = useColorTokens();
  const { modesInSync } = useSettings();
  const [shade, setShade] = useState<TailwindShadeKey>("500");
  const isMounted = useMounted();

  return (
    <div className="@container flex flex-wrap items-start gap-6 sm:flex-row">
      {/* Paste your primary color */}
      <section className="grow space-y-1.5 sm:flex-1">
        <Label className="flex items-center gap-1 pb-2">
          <ClipboardPaste className="size-4" /> Paste your primary color
        </Label>
        <PasteColorControl
          setColorTokens={setPrimaryColorTokens}
          modesInSync={modesInSync}
          property={"primary"}
          className="min-w-48"
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
                {isMounted ? (
                  <SelectValue defaultValue={shade} />
                ) : (
                  <Skeleton className="h-[1ch] w-[3ch]" />
                )}
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
      <section className="@container my-auto flex min-w-48 flex-3 flex-wrap gap-2 @6xl:w-full @7xl:w-fit">
        <div className="flex grow items-center gap-2">
          <CopyCodeButtonDialog size="sm" className="grow" />
        </div>

        <div className="flex items-center gap-2">
          <ResetButton size="sm" />
          <CustomizerSettings />
        </div>
      </section>
    </div>
  );
}
