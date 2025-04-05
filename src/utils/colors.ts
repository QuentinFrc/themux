import { basePresetsV4 } from "@/lib/colors";
import { OklchValue } from "@/types/theme";
import Color from "color";
import { parse } from "culori";
import { convertToHex } from "./color-converter";

export function getOptimalForegroundColor(colorInOklch: OklchValue) {
  if (!isValidColor(colorInOklch)) {
    console.log("Invalid color format:", colorInOklch);
    return;
  }

  const colorInHex = convertToHex(colorInOklch);
  const color = Color(colorInHex);

  const foregroundColor = color.isDark()
    ? basePresetsV4.neutral.dark.foreground
    : basePresetsV4.neutral.light.foreground;

  return foregroundColor;
}

export function isValidColor(color: string): boolean {
  try {
    const parsedColor = parse(color);
    if (!parsedColor) return false;
    return true;
  } catch {
    return false;
  }
}
