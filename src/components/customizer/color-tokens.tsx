"use client";

import { Palette } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useTokens } from "@/hooks/use-tokens";
import { cn } from "@/lib/utils";
import { colorTokenGroups } from "@/config/color-tokens";
import { ControlSection } from "./customizer-controls";
import { TokenColorPicker } from "./token-color-picker";

export function ColorTokens({ className }: React.ComponentProps<"div">) {
  return (
    <section className="h-full space-y-1.5">
      <Label className="flex items-center gap-1 pb-2">
        <Palette className="size-4" /> Color tokens
      </Label>

      <TokensList className={className} />
    </section>
  );
}

function TokensList({ className }: React.ComponentProps<"div">) {
  const {
    getColorToken,
    getResolvedColorToken,
    getColorTokenReference,
    setColorToken,
    setColorTokenWithForeground,
  } = useTokens();

  return (
    <div className={cn("space-y-2", className)}>
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
                colorProperty={property}
                color={resolvedColor}
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
          <ControlSection key={id} title={title} id={id} expanded={expanded}>
            {renderedTokens}
          </ControlSection>
        );
      })}
    </div>
  );
}
