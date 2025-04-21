import { useThemeConfig } from "@/hooks/use-theme-config";
import { otherPresetsArray } from "@/lib/presets";
import { RADIUS_VALUES } from "@/utils/constants";
import { monoFontsArray, sansFontsArray, serifFontsArray } from "@/utils/fonts";
import { Shuffle } from "lucide-react";
import { ComponentProps, useCallback } from "react";
import { Button } from "../ui/button";
import {
  basePresetsV4Array,
  colorfulPresetsArray,
  surfaceShadesPresetArray,
} from "@/lib/colors";
import { TAILWIND_PALETTE_V4 } from "@/lib/palettes";
import { object } from "zod";
import { useTokens } from "@/hooks/use-tokens";

interface RandomizeButtonProps extends ComponentProps<typeof Button> {}

export function RandomizeButton({ className, ...props }: RandomizeButtonProps) {
  const { setConfig } = useThemeConfig();
  const { setPrimaryColorTokens, setSurfaceShadesColorTokens } = useTokens();

  const randomize = useCallback(() => {
    const allFontsArray = [
      ...sansFontsArray,
      ...serifFontsArray,
      ...monoFontsArray,
    ];

    const baseShadcnPresetsArray = [...basePresetsV4Array];

    const presetsArray = [...otherPresetsArray, ...basePresetsV4Array];

    const randomRadiusIndex = Math.floor(Math.random() * RADIUS_VALUES.length);
    const randomPresetIndex = Math.floor(Math.random() * presetsArray.length);
    const randomSansFontIndex = Math.floor(
      Math.random() * allFontsArray.length,
    );
    const randomSerifFontIndex = Math.floor(
      Math.random() * serifFontsArray.length,
    );
    const randomMonoFontIndex = Math.floor(
      Math.random() * monoFontsArray.length,
    );

    const randomRadius = RADIUS_VALUES[randomRadiusIndex];
    const randomPreset = presetsArray[randomPresetIndex];
    const randomSansFont = allFontsArray[randomSansFontIndex].value;
    const randomSerifFont = serifFontsArray[randomSerifFontIndex].value;
    const randomMonoFont = monoFontsArray[randomMonoFontIndex].value;

    setConfig((prev) => {
      return {
        ...prev,
        radius: randomRadius,
        surface: "custom",
        fonts: {
          sans: randomSansFont,
          serif: randomSerifFont,
          mono: randomMonoFont,
        },
        themeObject: randomPreset,
      };
    });

    if (
      baseShadcnPresetsArray.some((item) => item.name === randomPreset.name)
    ) {
      const randomSurfaceShadesIndex = Math.floor(
        Math.random() * surfaceShadesPresetArray.length,
      );
      const randomSurfaceShadesPreset =
        surfaceShadesPresetArray[randomSurfaceShadesIndex];

      const randomPrimaryColorIndex = Math.floor(
        Math.random() * Object.entries(TAILWIND_PALETTE_V4).length,
      );
      const randomPrimaryColor =
        Object.entries(TAILWIND_PALETTE_V4)[randomPrimaryColorIndex]["1"][
          "500"
        ];

      setSurfaceShadesColorTokens({
        bgShadesThemeObject: randomSurfaceShadesPreset,
        modesInSync: true,
      });

      setPrimaryColorTokens({
        color: randomPrimaryColor,
        modesInSync: true,
      });
    }
  }, []);

  return (
    <Button
      size="sm"
      variant="ghost"
      className={className}
      {...props}
      onClick={randomize}
    >
      <Shuffle />
      <span className="sr-only">Get random theme</span>
    </Button>
  );
}
