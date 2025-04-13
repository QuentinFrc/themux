import { allPresetsArray } from "@/lib/colors";
import { ThemeObject } from "@/types/theme";
import { isEqual } from "lodash";
import { initialThemeConfig, useConfig } from "./use-config";

export function useThemeConfig() {
  const [config, setConfig] = useConfig();

  const currentThemeObject = config.themeObject;
  const currentSurfacePreset = config.surface;
  const currentRadius = config.radius;

  const updateThemeConfig = (themeObject: ThemeObject) => {
    setConfig((prev) => ({
      ...prev,
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

    setConfig((prev) => {
      return {
        ...prev,
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

    return !themeObjectIsEqual || !radiusIsEqual;
  };

  const hasCurrentPresetChanged = () => {
    const themeObjectIsEqual = isEqual(
      currentPresetThemeObject,
      currentThemeObject,
    );
    const radiusIsEqual =
      (currentPresetThemeObject?.radius ?? initialThemeConfig.radius) ===
      currentRadius;

    console.log(currentPresetThemeObject?.radius, currentRadius, radiusIsEqual);

    return !themeObjectIsEqual || !radiusIsEqual;
  };

  return {
    currentThemeObject,
    currentSurfacePreset,
    currentRadius,
    config,
    setConfig,
    updateThemeConfig,
    resetToDefault,
    resetToLatestThemePreset,
    hasDefaultThemeChanged,
    hasCurrentPresetChanged,
  };
}
