"use client";

import { cn, copyToClipboard } from "@/lib/utils";
import { ColorProperty, OklchValue } from "@/types/theme";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export function Token({
  colorProperty,
  oklchColor,
}: {
  colorProperty: ColorProperty;
  oklchColor: OklchValue;
}) {
  return (
    <div className="flex items-center gap-2">
      <TokenDisplay oklchColor={oklchColor} />
      <TokenInfo colorProperty={colorProperty} oklchColor={oklchColor} />
    </div>
  );
}

export function TokenDisplay({ oklchColor }: { oklchColor: OklchValue }) {
  return (
    <div
      className="outline-border aspect-square size-8 rounded-full shadow outline-2"
      style={{
        backgroundColor: oklchColor,
      }}
    />
  );
}

export function TokenInfo({
  colorProperty,
  oklchColor,
}: {
  colorProperty: ColorProperty;
  oklchColor: OklchValue;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyColor = () => {
    copyToClipboard(oklchColor);

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div>
        <p className="font-mono text-xs font-semibold">
          {`--${colorProperty}`}
        </p>
        <p className="text-muted-foreground font-mono text-xs">{oklchColor}</p>
      </div>

      <button
        className="hover:bg-foreground/10 ml-auto cursor-pointer rounded-lg p-1 transition"
        onClick={handleCopyColor}
      >
        <Clipboard
          className={cn(
            "size-4 transition duration-200",
            copied ? "absolute scale-0" : "scale-100",
          )}
        />
        <Check
          className={cn(
            "size-4 transition duration-200",
            !copied ? "absolute scale-0" : "scale-100",
          )}
        />
      </button>
    </div>
  );
}
