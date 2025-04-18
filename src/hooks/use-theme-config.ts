import { allPresetsArray } from "@/lib/colors";
import { initialThemeConfig } from "@/lib/themes";
import { ThemeObject } from "@/types/theme";
import { isEqual } from "lodash";
import { useConfig } from "./use-config";

export function useThemeConfig() {
  const [config, setConfig] = useConfig();

  const currentThemeObject = config.themeObject;
  const currentSurfacePreset = config.surface;
  const currentRadius = config.radius;
  const currentFonts = config.fonts;

  const updateThemeConfig = (themeObject: ThemeObject) => {
    setConfig((prev) => ({
      ...prev,
      surface: "custom",
      fonts: { ...prev.fonts, ...themeObject.fonts },
      radius: themeObject.radius ?? prev.radius,
      themeObject,
    }));
  };

  const resetToDefault = () => {
    setConfig(initialThemeConfig);
  };

  const currentPresetName = config.themeObject.name;
  const currentPresetThemeObject = allPresetsArray.find(
    (preset) => preset.name === currentPresetName,
  );

  const resetToLatestThemePreset = () => {
    if (!currentPresetThemeObject) return;

    if (currentPresetName === "neutral") {
      return;
    }

    setConfig((prev) => {
      return {
        ...prev,
        fonts: currentPresetThemeObject.fonts ?? prev.fonts,
        radius: currentPresetThemeObject.radius ?? prev.radius,
        themeObject: {
          ...prev.themeObject,
          ...currentPresetThemeObject,
        },
      };
    });
  };

  const hasDefaultThemeChanged = () => {
    const defaultThemeObject = initialThemeConfig.themeObject;

    const themeObjectIsEqual = isEqual(currentThemeObject, defaultThemeObject);
    const radiusIsEqual = currentRadius === initialThemeConfig.radius;
    const areFontsEqual = isEqual(currentFonts, defaultThemeObject.fonts);

    return !themeObjectIsEqual || !radiusIsEqual || !areFontsEqual;
  };

  const hasCurrentPresetChanged = () => {
    if (currentPresetName === "neutral") {
      return false;
    }

    const themeObjectIsEqual = isEqual(
      currentPresetThemeObject,
      currentThemeObject,
    );
    const radiusIsEqual =
      (currentPresetThemeObject?.radius ?? initialThemeConfig.radius) ===
      currentRadius;
    const areFontsEqual = currentPresetThemeObject?.fonts
      ? isEqual(currentPresetThemeObject.fonts, currentFonts)
      : true;

    return !themeObjectIsEqual || !radiusIsEqual || !areFontsEqual;
  };

  return {
    currentThemeObject,
    currentSurfacePreset,
    currentRadius,
    currentFonts,
    config,
    setConfig,
    updateThemeConfig,
    resetToDefault,
    resetToLatestThemePreset,
    hasDefaultThemeChanged,
    hasCurrentPresetChanged,
  };
}
