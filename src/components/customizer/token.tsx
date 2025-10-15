"use client";

import { Check, Clipboard, Link2 } from "lucide-react";
import type { ComponentProps } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { useColorFormat } from "@/store/preferences-store";
import { colorFormatter } from "@/utils/color-converter";
import { Badge } from "../ui/badge";

export function Token({
  colorProperty,
  color,
  rawColor,
}: {
  colorProperty: string;
  color: string;
  rawColor?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <TokenDisplay color={rawColor ?? color} />
      <TokenInfo
        color={color}
        colorProperty={colorProperty}
        rawColor={rawColor}
      />
    </div>
  );
}

export function TokenDisplay({
  color,
  className,
}: ComponentProps<"div"> & { color: string }) {
  return (
    <div
      className={cn(
        "aspect-square size-8 rounded-lg border shadow outline-2 outline-border",
        className
      )}
      style={{
        backgroundColor: color,
      }}
    />
  );
}

export function TokenInfo({
  colorProperty,
  color,
  rawColor,
}: {
  colorProperty: string;
  color: string;
  rawColor?: string;
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const colorFormat = useColorFormat();
  const formattedColor = colorFormatter(color, colorFormat, "4");
  const isReference = rawColor?.startsWith("var(") ?? false;
  const referenceToken = isReference
    ? rawColor!.slice("var(".length, rawColor!.length - 1)
    : null;
  const displayValue = isReference ? rawColor! : formattedColor;

  const handleCopyColor = () => {
    copyToClipboard(displayValue);
  };

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="space-y-1">
        <p className="font-mono font-semibold text-xs">
          {`--${colorProperty}`}
        </p>
        {isReference && referenceToken ? (
          <div className="flex flex-wrap items-center gap-1">
            <Badge
              className="inline-flex items-center gap-1 border-dashed px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground"
              variant="outline"
            >
              <Link2 className="size-3" />
              {referenceToken}
            </Badge>
            <span className="text-muted-foreground text-[10px] uppercase tracking-wide">
              Linked to base color
            </span>
          </div>
        ) : null}
        <p className="font-mono text-muted-foreground text-xs">{formattedColor}</p>
      </div>

      <button
        className="ml-auto cursor-pointer rounded-lg p-1 transition hover:bg-foreground/10"
        type="button"
        onClick={handleCopyColor}
      >
        <Clipboard
          className={cn(
            "size-4 transition duration-200",
            isCopied ? "absolute scale-0" : "scale-100"
          )}
        />
        <Check
          className={cn(
            "size-4 transition duration-200",
            isCopied ? "scale-100" : "absolute scale-0"
          )}
        />
      </button>
    </div>
  );
}
