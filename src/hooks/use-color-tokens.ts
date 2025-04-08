import {
  ColorProperty,
  OklchValue,
  SurfaceShadesThemeObject,
} from "@/types/theme";
import { getOptimalForegroundColor } from "@/utils/colors";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useConfig } from "./use-config";
import { surfaceShadesPresets } from "@/lib/colors";

export function useColorTokens() {
  const { resolvedTheme } = useTheme();
  const mode = resolvedTheme === "dark" ? "dark" : "light";
  const [config, setConfig] = useConfig();

  const getColorToken = useCallback(
    ({ property }: { property: ColorProperty }) => {
      return config.themeObject[mode][property];
    },
    [mode, config.themeObject[mode]],
  );

  const setPrimaryColorTokens = ({
    primaryColor,
    bothModes = false,
  }: {
    primaryColor: OklchValue;
    bothModes?: boolean;
  }) => {
    const foregroundColor = getOptimalForegroundColor(primaryColor);

    // Update both modes
    if (bothModes) {
      return setConfig((prev) => {
        return {
          ...prev,
          themeObject: {
            ...prev.themeObject,
            label: "Custom",
            name: "custom",
            light: {
              ...prev.themeObject.light,
              primary: primaryColor,
              "primary-foreground": foregroundColor,
              ring: primaryColor,
              "sidebar-primary": primaryColor,
              "sidebar-primary-foreground": foregroundColor,
              "sidebar-ring": primaryColor,
            },
            dark: {
              ...prev.themeObject.dark,
              primary: primaryColor,
              "primary-foreground": foregroundColor,
              ring: primaryColor,
              "sidebar-primary": primaryColor,
              "sidebar-primary-foreground": foregroundColor,
              "sidebar-ring": primaryColor,
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
          label: "Custom",
          name: "custom",
          [mode]: {
            ...prev.themeObject[mode],
            primary: primaryColor,
            "primary-foreground": foregroundColor,
            ring: primaryColor,
            "sidebar-primary": primaryColor,
            "sidebar-primary-foreground": foregroundColor,
            "sidebar-ring": primaryColor,
          },
        },
      };
    });
  };

  const setSurfaceShadesColorTokens = ({
    bgShadesThemeObject,
    bothModes = false,
  }: {
    bgShadesThemeObject: SurfaceShadesThemeObject;
    bothModes?: boolean;
  }) => {
    // Update both modes
    if (bothModes) {
      return setConfig((prev) => {
        return {
          ...prev,
          surface: bgShadesThemeObject.name,
          themeObject: {
            ...prev.themeObject,
            label: "Custom",
            name: "custom",
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
          label: "Custom",
          name: "custom",
          [mode]: {
            ...prev.themeObject[mode],
            ...bgShadesThemeObject[mode],
          },
        },
      };
    });
  };

  const getActiveSurfaceShades = useCallback(() => {
    const surface = config?.surface;
    const surfaceShadesThemeObject = Object.values(surfaceShadesPresets).find(
      (theme) => theme.name === surface,
    );
    return surfaceShadesThemeObject;
  }, [config.surface]);

  return {
    getColorToken,
    setPrimaryColorTokens,
    setSurfaceShadesColorTokens,
    getActiveSurfaceShades,
  };
}
