"use client";

import {
  ClipboardPaste,
  PaintBucket,
  Paintbrush,
  SquareRoundCorner,
} from "lucide-react";
import { useState } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { useTokens } from "@/hooks/use-tokens";
import { TAILWIND_SHADES, type TailwindShadeKey } from "@/lib/palettes";
import { useModesInSync } from "@/store/preferences-store";
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
import {
  AllPresetsControl,
  PasteColorControl,
  RadiusControls,
} from "./customizer-controls";
import { MemoizedTailwindV4ColorPalette } from "./tailwind-v4-palette";

export function QuickCustomizer() {
  const [shade, setShade] = useState<TailwindShadeKey>("500");
  const isMounted = useMounted();

  const { getColorToken, setPrimaryColorTokens } = useTokens();
  const modesInSync = useModesInSync();

  return (
    <div className="space-y-4">
      <div className="@container flex flex-wrap items-start gap-x-6 gap-y-4 sm:flex-row">
        <section className="min-w-72 max-w-80 flex-1 space-y-1.5 max-sm:w-full max-sm:max-w-full">
          <Label className="flex items-center gap-1 pb-2">
            <PaintBucket className="size-4" /> Theme presets
          </Label>
          <AllPresetsControl />
          <span className="truncate text-muted-foreground text-xs">
            {"Complete theme presets"}
          </span>
        </section>

        {/* Paste your primary color */}
        <section className="min-w-62 max-w-66 space-y-1.5 max-sm:w-full max-sm:max-w-full sm:flex-1">
          <Label className="flex items-center gap-1 pb-2">
            <ClipboardPaste className="size-4" /> Paste your primary color
          </Label>
          <PasteColorControl
            modesInSync={modesInSync}
            property={"primary"}
            setColorTokens={setPrimaryColorTokens}
          />
          <span className="text-muted-foreground text-xs">
            {"oklch(), hsl(), rbg() and #hex"}
          </span>
        </section>

        {/* Primary color */}
        <section className="min-w-72 max-w-80 flex-2 space-y-1.5 max-sm:w-full max-sm:max-w-full">
          <div className="flex items-start justify-between gap-2 pb-1">
            <Label className="flex items-center gap-1">
              <Paintbrush className="size-4" /> Primary color
            </Label>
            <Label className="flex gap-1 text-muted-foreground">
              Shade
              <Select
                onValueChange={(v: TailwindShadeKey) => setShade(v)}
                value={shade}
              >
                <SelectTrigger
                  className="data-[size=sm]:h-5 data-[size=sm]:px-2 data-[size=sm]:text-xs"
                  size="sm"
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
                      <SelectItem key={shade} value={shade}>
                        {shade}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Label>
          </div>
          <div className="grid grid-cols-11 gap-1.5">
            <MemoizedTailwindV4ColorPalette
              className="contents"
              currentColor={getColorToken({
                property: "primary",
              })}
              modesInSync={modesInSync}
              shade={shade}
            />
          </div>
          <span className="truncate text-muted-foreground text-xs">
            Tailwind v4 color palette
          </span>
        </section>

        {/* Radius */}
        <section className="min-w-62 space-y-1.5 max-sm:w-full max-sm:max-w-full sm:flex-1">
          <Label className="flex items-center gap-1 pb-2">
            <SquareRoundCorner className="size-4" /> Radius
          </Label>
          <RadiusControls className="flex flex-wrap gap-2 @max-lg:[&>*]:flex-1" />
        </section>
      </div>
    </div>
  );
}
