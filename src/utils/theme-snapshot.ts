import {
  ColorFormat,
  TailwindVersion,
  ThemeConfig,
  ThemeMode,
} from "@/types/theme";
import {
  ThemeSnapshot,
  ThemeUpdatePayload,
} from "@/types/theme-update";
import {
  generateThemeVariables,
  ThemeVarsOptions,
} from "./theme-style-generator";

function buildThemeCss(
  themeConfig: ThemeConfig,
  mode: ThemeMode,
  colorFormat: ColorFormat,
  tailwindVersion: TailwindVersion,
  options: ThemeVarsOptions,
) {
  return generateThemeVariables(
    themeConfig,
    mode,
    colorFormat,
    tailwindVersion,
    options,
  );
}

export function createThemeSnapshot(payload: ThemeUpdatePayload): ThemeSnapshot {
  const options: ThemeVarsOptions = {
    fontVars: Boolean(payload.includeFontVars),
    shadowVars: Boolean(payload.includeShadowVars),
  };

  const rootCss = buildThemeCss(
    payload.themeConfig,
    "light",
    payload.colorFormat,
    payload.tailwindVersion,
    options,
  );

  const darkCss = buildThemeCss(
    payload.themeConfig,
    "dark",
    payload.colorFormat,
    payload.tailwindVersion,
    options,
  );

  return {
    theme: payload.themeConfig,
    css: {
      root: rootCss,
      dark: darkCss,
    },
    colorFormat: payload.colorFormat,
    tailwindVersion: payload.tailwindVersion,
    options: {
      fontVars: Boolean(payload.includeFontVars),
      shadowVars: Boolean(payload.includeShadowVars),
    },
  } satisfies ThemeSnapshot;
}
