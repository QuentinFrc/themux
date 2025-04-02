import { ColorFormat, TailwindVersion } from "@/types/theme";
import * as culori from "culori";
import { Hsl } from "culori";

const formatNumber = (num?: number): string => {
  if (!num) return "0";
  return num % 1 === 0 ? num.toString() : num.toFixed(2);
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

const formatAlphaForHex = (alpha: number | undefined): string => {
  if (alpha === undefined || alpha === 1) {
    return ""; // Not needed if opaque or undefined
  }
  // Convert alpha to a two-digit hexadecimal value (00-ff)
  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return alphaHex;
};

export const colorFormatter = (
  colorValue: string, // Expected "oklch(L C H)" or "oklch(L C H / A)"
  format: ColorFormat = "oklch",
  tailwindVersion: TailwindVersion = "3",
): string => {
  try {
    const color = culori.parse(colorValue);
    if (!color) throw new Error("Invalid color input");

    switch (format) {
      case "oklch": {
        // Due my implementation, the input is already in oklch format, return it as is.
        return colorValue;
      }
      case "hsl": {
        // Transform to hex first to avoid weird conversion issues from oklch to hsl
        const colorInHex = culori.formatHex(color);
        const hsl = culori.converter("hsl")(colorInHex) as Hsl & {
          alpha?: number;
        };
        if (!hsl) throw new Error("Invalid color input");

        const h = formatNumber(hsl.h);
        const s = formatNumber(hsl.s * 100);
        const l = formatNumber(hsl.l * 100);
        const alphaPart = formatAlphaForCss(color.alpha); // Extract alpha from the original color

        if (tailwindVersion === "4") {
          // Tailwind v4 uses modern CSS syntax hsl(H S% L% / A)
          return `hsl(${h} ${s}% ${l}%${alphaPart ?? ""})`;
        } else {
          // Tailwind v3 expects direct values "H S% L%" (alpha is omitted)
          if (alphaPart) {
            console.warn(
              `Alpha channel ignored converting to HSL for Tailwind v3: ${colorValue}`,
            );
          }
          return `${h} ${s}% ${l}%`;
        }
      }
      case "rgb": {
        // Convert the 'color' object (parsed from oklch) to RGB
        const rgb = culori.converter("rgb")(color);
        if (!rgb) throw new Error("Invalid color input");

        // culori.formatRgb handles alpha, returning rgb(R G B / A)
        return culori.formatRgb(rgb); // e.g., "rgb(64 128 192)" or "rgb(64 128 192 / 0.5)"
      }
      case "hex": {
        // First transform in rbg to have access to the alpha channel
        const rgb = culori.converter("rgb")(color);
        if (!rgb) throw new Error("Invalid color input");

        const hex = culori.formatHex(rgb);

        // Add the alpha channel if necessary
        const alphaHex = formatAlphaForHex(color.alpha);
        return `${hex}${alphaHex}`;
      }
      default:
        return colorValue;
    }
  } catch (error) {
    console.error(`Failed to convert color: ${colorValue}`, error);
    return colorValue;
  }
};
