import { SurfaceShades, SurfaceShadesThemeObject } from "@/types/theme";
import { useTokens } from "./use-tokens";

export function useSurfaceShades() {
  const { getActiveThemeColorToken } = useTokens();

  const getDefaultSurfaceShades = (): SurfaceShadesThemeObject => {
    const lightDefaultSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      foreground: getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      card: getActiveThemeColorToken({
        property: "card",
        mode: "light",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "card-foreground",
        mode: "light",
      }),

      popover: getActiveThemeColorToken({
        property: "popover",
        mode: "light",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "popover-foreground",
        mode: "light",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "light",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "light",
      }),

      accent: getActiveThemeColorToken({
        property: "accent",
        mode: "light",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "light",
      }),

      border: getActiveThemeColorToken({
        property: "border",
        mode: "light",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "light",
      }),

      sidebar: getActiveThemeColorToken({
        property: "sidebar",
        mode: "light",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "sidebar-foreground",
        mode: "light",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "sidebar-accent",
        mode: "light",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "sidebar-accent-foreground",
        mode: "light",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "sidebar-border",
        mode: "light",
      }),
    };

    const darkDefaultSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      foreground: getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      card: getActiveThemeColorToken({
        property: "card",
        mode: "dark",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "card-foreground",
        mode: "dark",
      }),

      popover: getActiveThemeColorToken({
        property: "popover",
        mode: "dark",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "popover-foreground",
        mode: "dark",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "dark",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "dark",
      }),

      accent: getActiveThemeColorToken({
        property: "accent",
        mode: "dark",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "dark",
      }),

      border: getActiveThemeColorToken({
        property: "border",
        mode: "dark",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "dark",
      }),

      sidebar: getActiveThemeColorToken({
        property: "sidebar",
        mode: "dark",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "sidebar-foreground",
        mode: "dark",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "sidebar-accent",
        mode: "dark",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "sidebar-accent-foreground",
        mode: "dark",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "sidebar-border",
        mode: "dark",
      }),
    };

    const surfaceThemeObject: SurfaceShadesThemeObject = {
      name: "default",
      label: "Default",
      light: lightDefaultSurfaceShades,
      dark: darkDefaultSurfaceShades,
    };

    return surfaceThemeObject;
  };

  const getInvertedSurfaceShades = (): SurfaceShadesThemeObject => {
    const lightInvertedSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "sidebar",
        mode: "light",
      }),
      foreground: getActiveThemeColorToken({
        property: "sidebar-foreground",
        mode: "light",
      }),

      card: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      popover: getActiveThemeColorToken({
        property: "card",
        mode: "light",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "card-foreground",
        mode: "light",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "light",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "light",
      }),

      accent: getActiveThemeColorToken({
        property: "sidebar-accent",
        mode: "light",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "sidebar-accent-foreground",
        mode: "light",
      }),

      border: getActiveThemeColorToken({
        property: "sidebar-border",
        mode: "light",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "light",
      }),

      sidebar: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "accent",
        mode: "light",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "light",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "border",
        mode: "light",
      }),
    };

    const darkInvertedSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "sidebar",
        mode: "dark",
      }),
      foreground: getActiveThemeColorToken({
        property: "sidebar-foreground",
        mode: "dark",
      }),

      card: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      popover: getActiveThemeColorToken({
        property: "card",
        mode: "dark",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "card-foreground",
        mode: "dark",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "dark",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "dark",
      }),

      accent: getActiveThemeColorToken({
        property: "sidebar-accent",
        mode: "dark",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "sidebar-accent-foreground",
        mode: "dark",
      }),

      border: getActiveThemeColorToken({
        property: "sidebar-border",
        mode: "dark",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "dark",
      }),

      sidebar: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "accent",
        mode: "dark",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "dark",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "border",
        mode: "dark",
      }),
    };

    const surfaceThemeObject: SurfaceShadesThemeObject = {
      name: "inverted",
      label: "Inverted",
      light: lightInvertedSurfaceShades,
      dark: darkInvertedSurfaceShades,
    };

    return surfaceThemeObject;
  };

  const getPlainSurfaceShades = (): SurfaceShadesThemeObject => {
    const lightPlainSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      foreground: getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      card: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      popover: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "light",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "light",
      }),

      accent: getActiveThemeColorToken({
        property: "accent",
        mode: "light",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "light",
      }),

      border: getActiveThemeColorToken({
        property: "border",
        mode: "light",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "light",
      }),

      sidebar: getActiveThemeColorToken({
        property: "background",
        mode: "light",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "light",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "accent",
        mode: "light",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "light",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "border",
        mode: "light",
      }),
    };

    const darkPlainSurfaceShades: SurfaceShades = {
      background: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      foreground: getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      card: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      "card-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      popover: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      "popover-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      muted: getActiveThemeColorToken({
        property: "muted",
        mode: "dark",
      }),
      "muted-foreground": getActiveThemeColorToken({
        property: "muted-foreground",
        mode: "dark",
      }),

      accent: getActiveThemeColorToken({
        property: "accent",
        mode: "dark",
      }),
      "accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "dark",
      }),

      border: getActiveThemeColorToken({
        property: "border",
        mode: "dark",
      }),
      input: getActiveThemeColorToken({
        property: "input",
        mode: "dark",
      }),

      sidebar: getActiveThemeColorToken({
        property: "background",
        mode: "dark",
      }),
      "sidebar-foreground": getActiveThemeColorToken({
        property: "foreground",
        mode: "dark",
      }),

      "sidebar-accent": getActiveThemeColorToken({
        property: "accent",
        mode: "dark",
      }),
      "sidebar-accent-foreground": getActiveThemeColorToken({
        property: "accent-foreground",
        mode: "dark",
      }),

      "sidebar-border": getActiveThemeColorToken({
        property: "border",
        mode: "dark",
      }),
    };

    const surfaceThemeObject: SurfaceShadesThemeObject = {
      name: "plain",
      label: "Plain",
      light: lightPlainSurfaceShades,
      dark: darkPlainSurfaceShades,
    };

    return surfaceThemeObject;
  };

  return {
    getDefaultSurfaceShades,
    getInvertedSurfaceShades,
    getPlainSurfaceShades,
  };
}
