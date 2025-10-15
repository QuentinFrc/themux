"use client";

import { startCase } from "lodash";

import { colorTokenGroups } from "@/config/color-tokens";
import { useTokens } from "@/hooks/use-tokens";
import {
  TAILWIND_COLOR_NAMES,
  TAILWIND_SHADES,
  type TailwindColorName,
} from "@/lib/palettes";

import { BaseColorPicker } from "./base-color-picker";
import { TokenColorPicker } from "./token-color-picker";

export function ColorsPreview() {
  return (
    <div className="space-y-6">
      <div className="space-y-6 rounded-lg border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
        <BaseColorsSection />
      </div>
      <div className="space-y-6 rounded-lg border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
        <TokenColorsSection />
      </div>
    </div>
  );
}

function BaseColorsSection() {
  const { getBaseColor, setBaseColor } = useTokens();

  const handleChange = (
    colorName: TailwindColorName,
    shade: (typeof TAILWIND_SHADES)[number],
    value: string
  ) => {
    setBaseColor({ colorName, shade, color: value });
  };

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

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {TAILWIND_COLOR_NAMES.map((colorName) => (
          <div
            className="space-y-3 rounded-lg border border-border/60 bg-background/60 p-4 shadow-sm"
            key={colorName}
          >
            <header className="space-y-1">
              <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                {startCase(colorName)}
              </h3>
              <p className="text-muted-foreground text-xs">
                {`--color-${colorName}`}
              </p>
            </header>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6">
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
          </div>
        ))}
      </div>
    </section>
  );
}

function TokenColorsSection() {
  const {
    getColorToken,
    getResolvedColorToken,
    getColorTokenReference,
    setColorToken,
    setColorTokenWithForeground,
  } = useTokens();

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

      <div className="space-y-6">
        {colorTokenGroups.map(({ id, title, tokens }) => {
          const renderedTokens = tokens
            .map(({ property, setter = "single", syncModes, optional }) => {
              const rawColor = getColorToken({ property });

              if (optional && !rawColor) {
                return null;
              }

              const resolvedColor = getResolvedColorToken({ property });
              const reference = getColorTokenReference({ property });

              const setterFn =
                setter === "paired" ? setColorTokenWithForeground : setColorToken;

              return (
                <TokenColorPicker
                  key={property}
                  color={resolvedColor}
                  colorProperty={property}
                  rawColor={rawColor}
                  reference={reference ?? undefined}
                  setColorTokens={setterFn}
                  {...(syncModes !== undefined ? { syncModes } : {})}
                />
              );
            })
            .filter(Boolean);

          if (renderedTokens.length === 0) return null;

          return (
            <div className="space-y-2" key={id} id={id}>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                  {title}
                </h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {renderedTokens}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
