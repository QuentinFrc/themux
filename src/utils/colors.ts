import { basePresetsV4 } from "@/lib/colors";
import { OklchValue } from "@/types/theme";

import Color from "color";
import { convertToHex } from "./color-converter";

export function getOptimalForegroundColor(colorInOklch: OklchValue) {
  const colorInHex = convertToHex(colorInOklch);
  const color = Color(colorInHex);

  const foregroundColor = color.isDark()
    ? basePresetsV4.neutral.dark.foreground
    : basePresetsV4.neutral.light.foreground;

  return foregroundColor;
}
