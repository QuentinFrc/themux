import { allPresetsArray, surfaceShadesPresets } from "@/lib/colors";
import {
  ColorProperty,
  OklchValue,
  SurfaceShadesThemeObject,
} from "@/types/theme";
import { getOptimalForegroundColor, isValidColor } from "@/utils/colors";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useThemeConfig } from "./use-theme-config";

export function useColorTokens() {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const { config, setConfig, currentThemeObject } = useThemeConfig();

  const getColorToken = useCallback(
    ({ property }: { property: ColorProperty }) => {
      const color = currentThemeObject[mode][property];

      if (!color) {
        throw new Error(`Color token "${property}" not found in theme object`);
      }

      return color;
    },
    [mode, currentThemeObject[mode]],
  );

  const getActiveThemeColorToken = useCallback(
    ({ property }: { property: ColorProperty }) => {
      const activeThemeObject = allPresetsArray.find(
        (theme) => theme.name === currentThemeObject.name,
      );

      const themeObject = activeThemeObject ?? currentThemeObject;
      const color = themeObject[mode][property];

      if (!color) {
        throw new Error(`Color token "${property}" not found in theme object`);
      }

      return color;
    },
    [currentThemeObject, mode],
  );

  const setColorToken = ({
    property,
    color,
    modesInSync = false,
  }: {
    property: ColorProperty;
    color: string;
    modesInSync?: boolean;
  }) => {
    const isValidPastedColor = isValidColor(color);
    if (!isValidPastedColor) return;

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => {
        return {
          ...prev,
          themeObject: {
            ...prev.themeObject,
            light: {
              ...prev.themeObject.light,
              [property]: color,
            },
            dark: {
              ...prev.themeObject.dark,
              [property]: color,
            },
          },
        };
      });
    }

    // Only update the current mode
    setConfig((prev) => {
      return {
        ...prev,
        themeObject: {
          ...prev.themeObject,
          [mode]: {
            ...prev.themeObject[mode],
            [property]: color,
          },
        },
      };
    });
  };

  const setColorTokenWithForeground = ({
    property,
    color,
    modesInSync = false,
  }: {
    property: ColorProperty;
    color: OklchValue | string;
    modesInSync?: boolean;
  }) => {
    const isValidPastedColor = isValidColor(color);
    if (!isValidPastedColor) return;

    const foregroundColor = getOptimalForegroundColor(color);
    const propertyForeground =
      property === "background" ? "foreground" : property + "-foreground";

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => {
        return {
          ...prev,
          themeObject: {
            ...prev.themeObject,
            light: {
              ...prev.themeObject.light,
              [property]: color,
              [propertyForeground]: foregroundColor,
            },
            dark: {
              ...prev.themeObject.dark,
              [property]: color,
              [propertyForeground]: foregroundColor,
            },
          },
        };
      });
    }

    // Only update the current mode
    setConfig((prev) => {
      return {
        ...prev,
        themeObject: {
          ...prev.themeObject,
          [mode]: {
            ...prev.themeObject[mode],
            [property]: color,
            [propertyForeground]: foregroundColor,
          },
        },
      };
    });
  };

  const setPrimaryColorTokens = ({
    color: color,
    modesInSync = false,
  }: {
    color: string | OklchValue;
    modesInSync?: boolean;
  }) => {
    const isValidPastedColor = isValidColor(color);
    if (!isValidPastedColor) return;

    const foregroundColor = getOptimalForegroundColor(color);

    // Update both modes
    if (modesInSync) {
      return setConfig((prev) => {
        return {
          ...prev,
          themeObject: {
            ...prev.themeObject,
            light: {
              ...prev.themeObject.light,
              primary: color,
              "primary-foreground": foregroundColor,
              ring: color,
              "sidebar-primary": color,
              "sidebar-primary-foreground": foregroundColor,
              "sidebar-ring": color,
            },
            dark: {
              ...prev.themeObject.dark,
              primary: color,
              "primary-foreground": foregroundColor,
              ring: color,
              "sidebar-primary": color,
              "sidebar-primary-foreground": foregroundColor,
              "sidebar-ring": color,
            },
          },
        };
      });
    }

    // Only update the current mode
    setConfig((prev) => {
      return {
        ...prev,
        themeObject: {
          ...prev.themeObject,
          [mode]: {
            ...prev.themeObject[mode],
            primary: color,
            "primary-foreground": foregroundColor,
            ring: color,
            "sidebar-primary": color,
            "sidebar-primary-foreground": foregroundColor,
            "sidebar-ring": color,
          },
        },
      };
    });
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
      return setConfig((prev) => {
        return {
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
        };
      });
    }

    // Only update the current mode
    setConfig((prev) => {
      return {
        ...prev,
        surface: bgShadesThemeObject.name,
        themeObject: {
          ...prev.themeObject,
          [mode]: {
            ...prev.themeObject[mode],
            ...bgShadesThemeObject[mode],
          },
        },
      };
    });
  };

  const getActiveSurfaceShades = useCallback(() => {
    const surface = config?.surface ?? "default";
    const surfaceShadesThemeObject = Object.values(surfaceShadesPresets).find(
      (theme) => theme.name === surface,
    );
    return surfaceShadesThemeObject;
  }, [config.surface]);

  return {
    getColorToken,
    setColorToken,
    setColorTokenWithForeground,
    setPrimaryColorTokens,
    setSurfaceShadesColorTokens,
    getActiveSurfaceShades,
    getActiveThemeColorToken,
  };
}
