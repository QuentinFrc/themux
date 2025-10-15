import * as culori from "culori";
import type { ColorFormat, OklchValue, TailwindVersion } from "@/types/theme";

const formatNumber = (num?: number): number => {
  if (!num) return 0;
  return num % 1 === 0 ? num : Number(num.toFixed(3));
};

// Helper to format the alpha value if it exists and is not 1
const formatAlphaForCss = (alpha: number | undefined): string | null => {
  if (alpha === undefined || alpha === 1) {
    return null; // Not needed if opaque or undefined
  }
  // Standard CSS format: / A (where A can be a number or percentage)
  // We'll use percentage for consistency with HSL
  return `/ ${formatNumber(alpha * 100)}%`;
};

const formatAlphaForHex = (alpha: number | undefined): string | null => {
  if (alpha === undefined || alpha === 1) {
    return null; // Not needed if opaque or undefined
  }
  // Convert alpha to a two-digit hexadecimal value (00-ff)
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return alphaHex;
};

const normalizeColorInput = (value?: string | null) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

export const colorFormatter = (
  colorValue: string | null | undefined, // Expected "oklch(L C H)" or "oklch(L C H / A)"
  format: ColorFormat,
  tailwindVersion: TailwindVersion
): string => {
  const normalizedColor = normalizeColorInput(colorValue);

  if (!normalizedColor) {
    return colorValue ?? "";
  }

  if (normalizedColor.startsWith("var(")) {
    return normalizedColor;
  }

  try {
    const parsedColor = culori.parse(normalizedColor);
    if (!parsedColor) throw new Error("Invalid color input");

    switch (format) {
      case "oklch": {
        const colorInOklch = convertToOklch(normalizedColor);
        return colorInOklch;
      }
      case "hsl": {
        // Transform to hex first to avoid weird conversion issues from oklch to hsl
        const colorInHex = culori.formatHex(parsedColor);
        const hsl = culori.hsl(colorInHex);
        if (!hsl) throw new Error("Invalid color input");

        const h = formatNumber(hsl.h);
        const s = formatNumber(hsl.s * 100);
        const l = formatNumber(hsl.l * 100);
        const alphaPart = formatAlphaForCss(parsedColor.alpha); // Extract alpha from the original color

        if (tailwindVersion === "4") {
          // Tailwind v4 uses modern CSS syntax hsl(H S% L% / A)
          return alphaPart
            ? `hsl(${h} ${s}% ${l}% ${alphaPart})`
            : `hsl(${h} ${s}% ${l}%)`;
        }
        // Tailwind v3 expects direct values "H S% L%" (alpha is omitted)
        return `${h} ${s}% ${l}%`;
      }
      case "rgb": {
        // Convert the 'color' object (parsed from oklch) to RGB
        const rgb = culori.converter("rgb")(parsedColor);
        if (!rgb) throw new Error("Invalid color input");

        // culori.formatRgb handles alpha, returning rgb(R G B / A)
        return culori.formatRgb(rgb); // e.g., "rgb(64 128 192)" or "rgb(64 128 192 / 0.5)"
      }
      case "hex": {
        const hex = culori.formatHex(parsedColor);

        // Add the alpha channel if necessary
        const alphaPart = formatAlphaForHex(parsedColor.alpha);
        return alphaPart ? `${hex}${alphaPart}` : hex;
      }
      default:
        return normalizedColor;
    }
  } catch {
    return normalizedColor;
  }
};

export const convertToOklch = (
  colorToConvert: string | null | undefined
): OklchValue => {
  const normalizedColor = normalizeColorInput(colorToConvert);

  if (!normalizedColor) {
    return "oklch(0 0 0)";
  }

  const parsedColor = culori.parse(normalizedColor);
  if (!parsedColor) return "oklch(0 0 0)";

  const colorInOklch = culori.oklch(parsedColor);

  if (!colorInOklch) {
    return "oklch(0 0 0)";
  }

  const l = formatNumber(colorInOklch.l);
  const c = formatNumber(colorInOklch.c);
  const h = formatNumber(colorInOklch.h ? colorInOklch.h : 0);
  const alphaPart = formatAlphaForCss(parsedColor.alpha); // Extract alpha from the original color

  if (alphaPart) {
    return `oklch(${l} ${c} ${h} ${alphaPart})` as OklchValue;
  }

  return `oklch(${l} ${c} ${h})`;
};

export function convertToHex(colorToConvert: string | null | undefined): string {
  const normalizedColor = normalizeColorInput(colorToConvert);

  if (!normalizedColor) {
    return "#000000";
  }

  const parsedColor = culori.parse(normalizedColor);
  if (!parsedColor) {
    return "#000000";
  }

  const hex = culori.formatHex(parsedColor);

  if (parsedColor.alpha) {
    const alphaHex = formatAlphaForHex(parsedColor.alpha);
    return `${hex}${alphaHex}`;
  }

  return hex;
}
