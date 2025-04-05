import {
  ColorProperty,
  OklchColorProperties,
  OklchValue,
  ThemeObject,
} from "@/types/theme";
import { getOptimalForegroundColor } from "@/utils/colors";
import { useTheme } from "next-themes";
import { useCallback } from "react";
import { useConfig } from "./use-config";
import { access } from "fs";

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
    bothModes = true,
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

  return { getColorToken, setPrimaryColorTokens };
}
