"use client";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { preconnect } from "react-dom";

import { monoFontsArray, sansFontsArray, serifFontsArray } from "@/utils/fonts";

export function LoadFonts() {
  preconnect("https://fonts.gstatic.com", { crossOrigin: "anonymous" });
  preconnect("https://fonts.googleapis.com", { crossOrigin: "anonymous" });

  const { currentFonts } = useThemeConfig();

  const sansFontHref = [...sansFontsArray, ...serifFontsArray].find(
    (font) => font.value === currentFonts?.sans,
  )?.href;
  const serifFontHref = serifFontsArray.find(
    (font) => font.value === currentFonts?.serif,
  )?.href;
  const monoFontHref = monoFontsArray.find(
    (font) => font.value === currentFonts?.mono,
  )?.href;

  return (
    <>
      {sansFontHref && (
        <link href={sansFontHref} rel="stylesheet" precedence="medium" />
      )}
      {serifFontHref && (
        <link href={serifFontHref} rel="stylesheet" precedence="medium" />
      )}
      {monoFontHref && (
        <link href={monoFontHref} rel="stylesheet" precedence="medium" />
      )}
    </>
  );
}
