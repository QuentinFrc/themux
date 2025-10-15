"use client";

import { PaintBucket } from "lucide-react";
import { startCase } from "lodash";
import type { ComponentProps } from "react";
import { useTokens } from "@/hooks/use-tokens";
import {
  TAILWIND_COLOR_NAMES,
  TAILWIND_SHADES,
  type TailwindColorName,
} from "@/lib/palettes";
import { Label } from "../ui/label";
import { ControlSection } from "./customizer-controls";
import { BaseColorPicker } from "./base-color-picker";

export function BaseColorMaps({ className }: ComponentProps<"section">) {
  const { getBaseColor, setBaseColor } = useTokens();

  const handleChange = (
    colorName: TailwindColorName,
    shade: (typeof TAILWIND_SHADES)[number],
    value: string
  ) => {
    setBaseColor({ colorName, shade, color: value });
  };

  return (
    <section className={className}>
      <Label className="flex items-center gap-1 pb-2">
        <PaintBucket className="size-4" /> Base colors
      </Label>

      <div className="space-y-2">
        {TAILWIND_COLOR_NAMES.map((colorName) => (
          <ControlSection
            expanded={colorName === "neutral"}
            id={`base-color-${colorName}`}
            key={colorName}
            title={startCase(colorName)}
          >
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {TAILWIND_SHADES.map((shade) => (
                <BaseColorPicker
                  color={getBaseColor({ colorName, shade })}
                  colorName={colorName}
                  key={`${colorName}-${shade}`}
                  onChange={(value) => handleChange(colorName, shade, value)}
                  shade={shade}
                />
              ))}
            </div>
          </ControlSection>
        ))}
      </div>
    </section>
  );
}
