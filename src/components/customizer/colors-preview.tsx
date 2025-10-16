"use client";


import { colorTokenGroups } from "@/config/color-tokens";
import { useTokens } from "@/hooks/use-tokens";

import { TokenColorPicker } from "./token-color-picker";
import {BaseColorMaps} from "@/components/customizer/base-color-maps";

export function ColorsPreview() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
        <BaseColorMaps />
      </div>
      <div className="space-y-6 rounded-lg border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
        <TokenColorsSection />
      </div>
    </div>
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

      <div className="grid grid-cols-[max-content_minmax(auto,54rem)] gap-y-8 gap-x-4">
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
            <div className="grid grid-cols-subgrid col-span-full items-center" key={id} id={id}>
                  <div className="space-y-1">
                      <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                          {title}
                      </h3>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2 2xl:grid-cols-3">
                      {renderedTokens}
                  </div>
              </div>
          );
        })}
      </div>
    </section>
  );
}
