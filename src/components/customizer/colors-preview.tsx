"use client";

import { startCase } from "lodash";

import { colorTokenGroups } from "@/config/color-tokens";
import { useTokens } from "@/hooks/use-tokens";
import {
  TAILWIND_COLOR_NAMES,
  TAILWIND_SHADES,
  type TailwindColorName,
} from "@/lib/palettes";

import { ControlSection } from "./customizer-controls";
import { BaseColorPicker } from "./base-color-picker";
import { TokenColorPicker } from "./token-color-picker";

export function ColorsPreview() {
  return (
    <div className="space-y-10 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
      <BaseColorsSection />
      <TokenColorsSection />
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

      <div className="space-y-6">
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
        {colorTokenGroups.map(({ id, title, expanded, tokens }) => {
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
            <ControlSection expanded={expanded} id={id} key={id} title={title}>
              {renderedTokens}
            </ControlSection>
          );
        })}
      </div>
    </section>
  );
}
