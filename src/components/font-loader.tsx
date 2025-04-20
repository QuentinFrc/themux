"use client";

import React from "react";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { monoFontsArray, sansFontsArray, serifFontsArray } from "@/utils/fonts";

export function FontLoader() {
  const { currentFonts } = useThemeConfig();
  const [shouldSync, setShouldSync] = React.useState(false);

  React.useEffect(() => {
    // This prevents the theme from being set with the default values
    // since the theme config from localStorage was applied in a script in the <head>
    setShouldSync(true);
  }, []);

  if (!shouldSync) return null;

  const sansFontHref = [
    ...sansFontsArray,
    ...serifFontsArray,
    ...monoFontsArray,
  ].find((font) => font.value === currentFonts?.sans)?.href;
  const serifFontHref = serifFontsArray.find(
    (font) => font.value === currentFonts?.serif,
  )?.href;
  const monoFontHref = monoFontsArray.find(
    (font) => font.value === currentFonts?.mono,
  )?.href;

  return (
    <>
      {sansFontHref && (
        <link href={sansFontHref} rel="stylesheet" precedence="high" />
      )}
      {serifFontHref && (
        <link href={serifFontHref} rel="stylesheet" precedence="high" />
      )}
      {monoFontHref && (
        <link href={monoFontHref} rel="stylesheet" precedence="high" />
      )}
    </>
  );
}
