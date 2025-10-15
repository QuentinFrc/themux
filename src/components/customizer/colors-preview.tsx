"use client";

import { startCase } from "lodash";

import { colorTokenGroups } from "@/config/color-tokens";
import { useTokens } from "@/hooks/use-tokens";
import { TAILWIND_COLOR_NAMES, TAILWIND_SHADES } from "@/lib/palettes";
import type { ColorProperty } from "@/types/theme";

import { Token } from "./token";

export function ColorsPreview() {
  return (
    <div className="space-y-8 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
      <BaseColorsSection />
      <TokenColorsSection />
    </div>
  );
}

function BaseColorsSection() {
  const { getBaseColor } = useTokens();

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Base colors
        </h2>
        <p className="text-muted-foreground text-xs">
          Tailwind-inspired palette shared across light and dark modes.
        </p>
      </header>

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
    </section>
  );
}

function TokenColorsSection() {
  const { getColorToken, getResolvedColorToken } = useTokens();

  return (
    <section className="space-y-4">
      <header className="space-y-1">
        <h2 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
          Token colors
        </h2>
        <p className="text-muted-foreground text-xs">
          Tokens automatically reflect any linked base colors.
        </p>
      </header>

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
    </section>
  );
}
