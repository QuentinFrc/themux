"use client";

import { SquareRoundCorner } from "lucide-react";
import { startCase } from "lodash";
import { useTokens } from "@/hooks/use-tokens";
import { colorTokenGroups } from "@/config/color-tokens";
import { TAILWIND_COLOR_NAMES, TAILWIND_SHADES } from "@/lib/palettes";
import type { ColorProperty } from "@/types/theme";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadiusControls } from "./customizer-controls";
import { Token } from "./token";

export function QuickCustomizer() {
  return (
    <div className="space-y-6">
      <ColorsPreviewTabs />

      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="flex flex-wrap gap-2 @max-lg:[&>*]:flex-1" />
      </section>
    </div>
  );
}

function ColorsPreviewTabs() {
  return (
    <Tabs className="space-y-4" defaultValue="base">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="base">Base colors</TabsTrigger>
        <TabsTrigger value="tokens">Token colors</TabsTrigger>
      </TabsList>

      <TabsContent value="base">
        <BaseColorsPreview />
      </TabsContent>

      <TabsContent value="tokens">
        <TokenColorsPreview />
      </TabsContent>
    </Tabs>
  );
}

function BaseColorsPreview() {
  const { getBaseColor } = useTokens();

  return (
    <div className="space-y-4">
      {TAILWIND_COLOR_NAMES.map((colorName) => (
        <div className="space-y-2" key={colorName}>
          <p className="font-medium text-sm">{startCase(colorName)}</p>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-11">
            {TAILWIND_SHADES.map((shade) => {
              const shadeValue = getBaseColor({ colorName, shade });

              return (
                <div
                  className="space-y-1 text-center"
                  key={`${colorName}-${shade}`}
                >
                  <div
                    className="h-10 w-full rounded border"
                    style={{ backgroundColor: shadeValue }}
                  />
                  <p className="font-mono text-muted-foreground text-xs">{shade}</p>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function TokenColorsPreview() {
  const { getColorToken, getResolvedColorToken } = useTokens();

  return (
    <div className="space-y-4">
      {colorTokenGroups.map(({ id, title, tokens }) => {
        const previewTokens = tokens
          .map(({ property, optional }) => {
            const rawColor = getColorToken({ property });
            if (optional && !rawColor) return null;

            const resolvedColor = getResolvedColorToken({ property });
            if (!rawColor && !resolvedColor) return null;

            return { property, rawColor, resolvedColor };
          })
          .filter(Boolean) as Array<{
          property: ColorProperty;
          rawColor: string;
          resolvedColor: string;
        }>;

        if (previewTokens.length === 0) return null;

        return (
          <div className="space-y-2" key={id}>
            <p className="font-medium text-sm">{title}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {previewTokens.map(({ property, rawColor, resolvedColor }) => (
                <Token
                  key={property}
                  color={resolvedColor}
                  colorProperty={property}
                  rawColor={rawColor}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
