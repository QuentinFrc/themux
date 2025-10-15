import {useTheme} from "next-themes";
import {useCallback} from "react";
import {allPresetsArray, surfaceShadesPresets} from "@/lib/colors";
import {initialThemeConfig} from "@/lib/themes";
import type {
  BaseColorReference,
  ColorProperty,
  OklchValue,
  Preset,
  SurfaceShadesThemeObject,
  ThemeMode,
  ThemeProperty,
} from "@/types/theme";
import {type TailwindColorName, type TailwindShadeKey} from "@/lib/palettes";
import {convertToOklch} from "@/utils/color-converter";
import {getOptimalForegroundColor, isValidColor} from "@/utils/colors";
import {useThemeConfig} from "./use-theme-config";

const BASE_COLOR_VAR_REGEX =
  /^var\(--color-([a-z-]+)-(50|100|200|300|400|500|600|700|800|900|950)\)$/;

const createBaseColorVariable = (reference: BaseColorReference) =>
  `var(--color-${reference.colorName}-${reference.shade})`;

const parseBaseColorReference = (value: string): BaseColorReference | null => {
  const match = value.trim().match(BASE_COLOR_VAR_REGEX);

  if (!match) return null;

  const [, colorName, shade] = match;

  return {
    colorName: colorName as TailwindColorName,
    shade: shade as TailwindShadeKey,
  };
};

export function useTokens() {
  const { resolvedTheme } = useTheme();
  const mode: ThemeMode = resolvedTheme === "dark" ? "dark" : "light";
  const { config, setConfig, currentThemeObject, currentBaseColors } =
    useThemeConfig();
  const baseColors = currentBaseColors;

  const resolveBaseColorReference = useCallback(
    (reference: BaseColorReference) => {
      return baseColors[reference.colorName]?.[reference.shade] ??
          initialThemeConfig.baseColors[reference.colorName][reference.shade];
    },
    [baseColors]
  );

  const resolveColorValue = useCallback(
    (value: string) => {
      const reference = parseBaseColorReference(value);

      if (!reference) return value;

      return resolveBaseColorReference(reference);
    },
    [resolveBaseColorReference]
  );

  const getBaseColorReferenceFromValue = useCallback(
    (value: string) => parseBaseColorReference(value),
    []
  );

  const getToken = useCallback(
    ({ property }: { property: ThemeProperty }) => {
      const isShadow = property.startsWith("shadow-");
      const isShadowColor = property.startsWith("shadow-color");

      let resolvedMode = mode;

      if (isShadow) {
        resolvedMode = "light";
        if (isShadowColor) resolvedMode = mode;
      }

      const token =
        currentThemeObject[resolvedMode][property] ??
        initialThemeConfig.themeObject[resolvedMode][property];

      if (!token) {
        throw new Error(`Token "${property}" not found in theme object`);
      }

      return token;
    },
    [mode, currentThemeObject[mode]]
  );

  const setToken = ({
    property,
    value,
    modesInSync = false,
  }: {
    property: ThemeProperty;
    value: string;
    modesInSync?: boolean;
  }) => {
    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => ({
        ...prev,
        themeObject: {
          ...prev.themeObject,
          light: {
            ...prev.themeObject.light,
            [property]: value,
          },
          dark: {
            ...prev.themeObject.dark,
            [property]: value,
          },
        },
      }));
    }

    // Only update the current mode
    setConfig((prev) => ({
      ...prev,
      themeObject: {
        ...prev.themeObject,
        [mode]: {
          ...prev.themeObject[mode],
          [property]: value,
        },
      },
    }));
  };

  const getColorToken = useCallback(
    ({ property }: { property: ColorProperty }) => {
      const color = currentThemeObject[mode][property];

      return color ?? "";
    },
    [mode, currentThemeObject[mode]]
  );

  const getResolvedColorToken = useCallback(
    ({ property }: { property: ColorProperty }) => {
      const rawColor = getColorToken({ property });

      if (!rawColor) return "";

      return resolveColorValue(rawColor);
    },
    [getColorToken, resolveColorValue]
  );

  const getColorTokenReference = useCallback(
    ({ property }: { property: ColorProperty }) => {
      const rawColor = getColorToken({ property });

      if (!rawColor) return null;

      return getBaseColorReferenceFromValue(rawColor);
    },
    [getBaseColorReferenceFromValue, getColorToken]
  );

  const getActiveThemeColorToken = useCallback(
    ({ property, mode }: { property: ColorProperty; mode: ThemeMode }) => {
      const activeThemeObject = allPresetsArray.find(
        (theme) => theme.name === currentThemeObject.name
      );

      const themeObject = activeThemeObject ?? currentThemeObject;
      const color = themeObject[mode][property];

      if (!color) {
        throw new Error(`Color token "${property}" not found in theme object`);
      }

      return color;
    },
    [currentThemeObject, mode]
  );

  const getBaseColor = useCallback(
    ({
      colorName,
      shade,
    }: {
      colorName: TailwindColorName;
      shade: TailwindShadeKey;
    }) => resolveBaseColorReference({ colorName, shade }),
    [resolveBaseColorReference]
  );

  const setBaseColor = ({
    colorName,
    shade,
    color,
  }: {
    colorName: TailwindColorName;
    shade: TailwindShadeKey;
    color: string;
  }) => {
    if (!isValidColor(color)) return;

    const normalizedColor = convertToOklch(color);

    setConfig((prev) => {
      const previousShades =
        prev.baseColors[colorName] ??
        initialThemeConfig.baseColors[colorName];

      return {
        ...prev,
        baseColors: {
          ...prev.baseColors,
          [colorName]: {
            ...previousShades,
            [shade]: normalizedColor,
          },
        },
      };
    });
  };

  const createTokenGetterForPreset = useCallback((preset: Preset) => {
    const presetThemeObject = allPresetsArray.find(
      (theme) => theme.name === preset
    );

    if (!presetThemeObject) {
      throw new Error(`Preset "${preset}" not found`);
    }

    return ({
      property,
      mode,
    }: {
      property: ThemeProperty;
      mode: ThemeMode;
    }) => {
      const color = presetThemeObject[mode][property];

      if (!color) {
        throw new Error(`Color token "${property}" not found in theme object`);
      }

      return color;
    };
  }, []);

  const setColorToken = ({
    property,
    color,
    modesInSync = false,
  }: {
    property: ColorProperty;
    color: string;
    modesInSync?: boolean;
  }) => {
    const reference = getBaseColorReferenceFromValue(color);
    const isReference = Boolean(reference);

    if (!isReference && !isValidColor(color)) return;

    const normalizedColor = isReference ? color : convertToOklch(color);

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => ({
        ...prev,
        themeObject: {
          ...prev.themeObject,
          light: {
            ...prev.themeObject.light,
            [property]: normalizedColor,
          },
          dark: {
            ...prev.themeObject.dark,
            [property]: normalizedColor,
          },
        },
      }));
    }

    // Only update the current mode
    setConfig((prev) => ({
      ...prev,
      themeObject: {
        ...prev.themeObject,
        [mode]: {
          ...prev.themeObject[mode],
          [property]: normalizedColor,
        },
      },
    }));
  };

  const setColorTokenWithForeground = ({
    property,
    bgColor,
    fgColor,
    modesInSync = false,
  }: {
    property: ColorProperty;
    bgColor: OklchValue | string;
    fgColor: OklchValue | string;
    modesInSync?: boolean;
  }) => {
    const backgroundValue = String(bgColor);
    const foregroundValue = String(fgColor);
    const reference = getBaseColorReferenceFromValue(backgroundValue);
    const isReference = Boolean(reference);

    if (!isReference && !isValidColor(backgroundValue)) return;

    const normalizedBgColor = isReference
      ? backgroundValue
      : convertToOklch(backgroundValue);

    const resolvedBgColor = reference
      ? resolveBaseColorReference(reference)
      : normalizedBgColor;

    if (!resolvedBgColor) return;

    const resolvedFgColor = resolveColorValue(foregroundValue);

    const optimalFgColor = getOptimalForegroundColor(
      resolvedFgColor,
      resolvedBgColor
    );
    const propertyForeground =
      property === "background" ? "foreground" : property + "-foreground";

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => ({
        ...prev,
        themeObject: {
          ...prev.themeObject,
          light: {
            ...prev.themeObject.light,
            [property]: normalizedBgColor,
            [propertyForeground]: optimalFgColor,
          },
          dark: {
            ...prev.themeObject.dark,
            [property]: normalizedBgColor,
            [propertyForeground]: optimalFgColor,
          },
        },
      }));
    }

    // Only update the current mode
    setConfig((prev) => ({
      ...prev,
      themeObject: {
        ...prev.themeObject,
        [mode]: {
          ...prev.themeObject[mode],
          [property]: normalizedBgColor,
          [propertyForeground]: optimalFgColor,
        },
      },
    }));
  };

  const setPrimaryColorTokens = ({
    color,
    modesInSync = false,
  }: {
    color: string | OklchValue;
    modesInSync?: boolean;
  }) => {
    const colorValue = String(color);
    const reference = getBaseColorReferenceFromValue(colorValue);
    const isReference = Boolean(reference);

    if (!isReference && !isValidColor(colorValue)) return;

    const normalizedColor = isReference
      ? colorValue
      : convertToOklch(colorValue);

    const resolvedPrimaryColor = reference
      ? resolveBaseColorReference(reference)
      : normalizedColor;

    if (!resolvedPrimaryColor) return;

    const primaryFgColor = getColorToken({
      property: "primary-foreground",
    });

    const resolvedPrimaryFgColor = resolveColorValue(primaryFgColor);

    const optimalFgColor = getOptimalForegroundColor(
      resolvedPrimaryFgColor,
      resolvedPrimaryColor
    );

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => ({
        ...prev,
        themeObject: {
          ...prev.themeObject,
          light: {
            ...prev.themeObject.light,
            primary: normalizedColor,
            "primary-foreground": optimalFgColor,
            ring: normalizedColor,
            "sidebar-primary": normalizedColor,
            "sidebar-primary-foreground": optimalFgColor,
            "sidebar-ring": normalizedColor,
          },
          dark: {
            ...prev.themeObject.dark,
            primary: normalizedColor,
            "primary-foreground": optimalFgColor,
            ring: normalizedColor,
            "sidebar-primary": normalizedColor,
            "sidebar-primary-foreground": optimalFgColor,
            "sidebar-ring": normalizedColor,
          },
        },
      }));
    }

    // Only update the current mode
    setConfig((prev) => ({
      ...prev,
      themeObject: {
        ...prev.themeObject,
        [mode]: {
          ...prev.themeObject[mode],
          primary: normalizedColor,
          "primary-foreground": optimalFgColor,
          ring: normalizedColor,
          "sidebar-primary": normalizedColor,
          "sidebar-primary-foreground": optimalFgColor,
          "sidebar-ring": normalizedColor,
        },
      },
    }));
  };

  const setSurfaceShadesColorTokens = ({
    bgShadesThemeObject,
    modesInSync = false,
  }: {
    bgShadesThemeObject: SurfaceShadesThemeObject;
    modesInSync?: boolean;
  }) => {
    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => ({
        ...prev,
        surface: bgShadesThemeObject.name,
        themeObject: {
          ...prev.themeObject,
          light: {
            ...prev.themeObject.light,
            ...bgShadesThemeObject.light,
          },
          dark: {
            ...prev.themeObject.dark,
            ...bgShadesThemeObject.dark,
          },
        },
      }));
    }

    // Only update the current mode
    setConfig((prev) => ({
      ...prev,
      surface: bgShadesThemeObject.name,
      themeObject: {
        ...prev.themeObject,
        [mode]: {
          ...prev.themeObject[mode],
          ...bgShadesThemeObject[mode],
        },
      },
    }));
  };

  const getActiveSurfaceShades = useCallback(() => {
    const surface = config?.surface ?? "default";
    const surfaceShadesThemeObject = Object.values(surfaceShadesPresets).find(
      (theme) => theme.name === surface
    );
    return surfaceShadesThemeObject;
  }, [config.surface]);

  return {
    getToken,
    setToken,
    getColorToken,
    getResolvedColorToken,
    getColorTokenReference,
    setColorToken,
    setColorTokenWithForeground,
    setPrimaryColorTokens,
    getBaseColor,
    setBaseColor,
    setSurfaceShadesColorTokens,
    getActiveSurfaceShades,
    getActiveThemeColorToken,
    createTokenGetterForPreset,
    resolveColorValue,
    createBaseColorVar: createBaseColorVariable,
    getBaseColorReferenceFromValue,
  };
}
