import { ColorFormat, TailwindVersion } from "@/types/theme";
import { useAtom } from "jotai/react";
import { atomWithStorage } from "jotai/utils";

type Settings = {
  modesInSync: boolean;
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
};

export const initialSettings: Settings = {
  modesInSync: false,
  colorFormat: "oklch",
  tailwindVersion: "4",
};

const initialConfigAtom = atomWithStorage<Settings>(
  "customizer-settings",
  initialSettings,
);

export function useSettings() {
  const [settings, setSettings] = useAtom(initialConfigAtom);
  const { modesInSync, colorFormat, tailwindVersion } = settings;

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Function to reset settings to initial values
  const resetSettings = () => {
    setSettings(initialSettings);
  };

  return {
    settings,
    modesInSync,
    colorFormat,
    tailwindVersion,
    setSettings,
    updateSettings,
    resetSettings,
  };
}
