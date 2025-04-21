import { allPresetsArray } from "@/lib/colors";
import { Preset } from "@/types/theme";
import { useQueryState } from "nuqs";
import React from "react";
import { useThemeConfig } from "./use-theme-config";

export const usePresetSyncUrl = () => {
  const [preset, setPreset] = useQueryState("preset");
  const { updateThemeConfig } = useThemeConfig();

  // Apply theme preset from the URL if it exists
  React.useEffect(() => {
    if (preset) {
      const normalizedPresetFromUrl = preset.trim().toLowerCase() as Preset;
      const presetThemeObject = allPresetsArray.find(
        (p) => p.name === normalizedPresetFromUrl,
      );

      if (presetThemeObject) {
        updateThemeConfig(presetThemeObject);
      } else {
        // If the preset is not valid, set it to null
        setPreset(null);
      }
    }
  }, [preset, setPreset, updateThemeConfig]);

  return { preset, setPreset };
};
