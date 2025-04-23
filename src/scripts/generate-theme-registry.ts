import { otherPresets } from "@/lib/presets";
import { generateThemeRegistryFromPreset } from "@/utils/registry/themes";

function execute() {
  const presets = otherPresets;

  // Generate registry files for presets
  Object.keys(presets).forEach((preset) => {
    generateThemeRegistryFromPreset(preset);
  });
}

execute();
