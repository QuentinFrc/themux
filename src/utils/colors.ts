import { basePresetsV4 } from "@/lib/colors";
import { OklchValue } from "@/types/theme";
import { formatHex, oklch, parse, rgb } from "culori";

import Color from "color";

export const hexToOklch = (hex: string): OklchValue => {
  const rgb = parse(hex);
  const color = oklch(rgb);

  if (!color) {
    throw new Error("Color not found");
  }

  const l = Number(color.l.toFixed(3));
  const c = Number(color.c.toFixed(3));
  const h = Number(color.h ? color.h.toFixed(3) : "0");

  return `oklch(${l} ${c} ${h})`;
};

export function oklchToHex(oklchValue: OklchValue): string {
  const parsedColor = parse(oklchValue);

  if (!parsedColor) {
    throw new Error("Value Oklch could not parse.");
  }

  const hex = formatHex(parsedColor);
  return hex;
}

export function getOptimalForegroundColor(colorInOklch: OklchValue) {
  const colorInHex = oklchToHex(colorInOklch);
  const color = Color(colorInHex);

  const foregroundColor = color.isDark()
    ? basePresetsV4.neutral.dark.foreground
    : basePresetsV4.neutral.light.foreground;

  return foregroundColor;
}

export function extractValuesFromOklch(oklchValue: OklchValue) {
  const regex = /^oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)$/;
  const match = oklchValue.match(regex);

  if (!match) {
    throw new Error("Not a valid Oklch value");
  }

  const oklchValues = {
    l: Number(match[1]),
    c: Number(match[2]),
    h: Number(match[3]),
  };

  return oklchValues;
}
