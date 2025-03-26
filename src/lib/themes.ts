import {
  CssThemeProperties,
  OklchValue,
  RemValue,
  ThemeObject,
} from "@/types/theme";
import { basePresetsV4, colorfulPresets } from "./colors";

export const BASE_THEMES = [
  { name: "Default", value: "default" },
  { name: "Scaled", value: "scaled" },
  ...Object.values(basePresetsV4).map((theme) => ({
    name: theme.label,
    value: theme.name,
  })),
];

export const COLORFUL_THEMES = Object.values(colorfulPresets).map((theme) => ({
  name: theme.label,
  value: theme.name,
}));

export function getCopyableThemeCSSVariablesV4({
  themeObject,
  radius,
}: {
  themeObject: ThemeObject;
  radius: RemValue;
}) {
  if (!themeObject) {
    return "No theme object provided";
  }

  return `:root {
  --radius: ${radius};
  --background: ${themeObject.light.background};
  --foreground: ${themeObject.light.foreground};
  --card: ${themeObject.light.card};
  --card-foreground: ${themeObject.light["card-foreground"]};
  --popover: ${themeObject.light.popover};
  --popover-foreground: ${themeObject.light["popover-foreground"]};
  --primary: ${themeObject.light.primary};
  --primary-foreground: ${themeObject.light["primary-foreground"]};
  --secondary: ${themeObject.light.secondary};
  --secondary-foreground: ${themeObject.light["secondary-foreground"]};
  --muted: ${themeObject.light.muted};
  --muted-foreground: ${themeObject.light["muted-foreground"]};
  --accent: ${themeObject.light.accent};
  --accent-foreground: ${themeObject.light["accent-foreground"]};
  --destructive: ${themeObject.light.destructive};
  --border: ${themeObject.light.border};
  --input: ${themeObject.light.input};
  --ring: ${themeObject.light.ring};
  --chart-1: ${themeObject.light["chart-1"]};
  --chart-2: ${themeObject.light["chart-2"]};
  --chart-3: ${themeObject.light["chart-3"]};
  --chart-4: ${themeObject.light["chart-4"]};
  --chart-5: ${themeObject.light["chart-5"]};
  --sidebar: ${themeObject.light.sidebar};
  --sidebar-foreground: ${themeObject.light["sidebar-foreground"]};
  --sidebar-primary: ${themeObject.light["sidebar-primary"]};
  --sidebar-primary-foreground: ${themeObject.light["sidebar-primary-foreground"]};
  --sidebar-accent: ${themeObject.light["sidebar-accent"]};
  --sidebar-accent-foreground: ${themeObject.light["sidebar-accent-foreground"]};
  --sidebar-border: ${themeObject.light["sidebar-border"]};
  --sidebar-ring: ${themeObject.light["sidebar-ring"]};
}

.dark {
  --background: ${themeObject.dark.background};
  --foreground: ${themeObject.dark.foreground};
  --card: ${themeObject.dark.card};
  --card-foreground: ${themeObject.dark["card-foreground"]};
  --popover: ${themeObject.dark.popover};
  --popover-foreground: ${themeObject.dark["popover-foreground"]};
  --primary: ${themeObject.dark.primary};
  --primary-foreground: ${themeObject.dark["primary-foreground"]};
  --secondary: ${themeObject.dark.secondary};
  --secondary-foreground: ${themeObject.dark["secondary-foreground"]};
  --muted: ${themeObject.dark.muted};
  --muted-foreground: ${themeObject.dark["muted-foreground"]};
  --accent: ${themeObject.dark.accent};
  --accent-foreground: ${themeObject.dark["accent-foreground"]};
  --destructive: ${themeObject.dark.destructive};
  --border: ${themeObject.dark.border};
  --input: ${themeObject.dark.input};
  --ring: ${themeObject.dark.ring};
  --chart-1: ${themeObject.dark["chart-1"]};
  --chart-2: ${themeObject.dark["chart-2"]};
  --chart-3: ${themeObject.dark["chart-3"]};
  --chart-4: ${themeObject.dark["chart-4"]};
  --chart-5: ${themeObject.dark["chart-5"]};
  --sidebar: ${themeObject.dark.sidebar};
  --sidebar-foreground: ${themeObject.dark["sidebar-foreground"]};
  --sidebar-primary: ${themeObject.dark["sidebar-primary"]};
  --sidebar-primary-foreground: ${themeObject.dark["sidebar-primary-foreground"]};
  --sidebar-accent: ${themeObject.dark["sidebar-accent"]};
  --sidebar-accent-foreground: ${themeObject.dark["sidebar-accent-foreground"]};
  --sidebar-border: ${themeObject.dark["sidebar-border"]};
  --sidebar-ring: ${themeObject.dark["sidebar-ring"]};
}

@theme inline {
  /* fonts variables go here  */
  /* --font-sans: var(...);   */
  /* --font-mono: var(...);   */

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}`.trim();
}

export function getCssVarsFromThemeObject(themeProperties: CssThemeProperties) {
  const cssVars = {} as Record<string, OklchValue | RemValue>;

  for (const [key, value] of Object.entries(themeProperties)) {
    cssVars[`--${key}`] = value;
  }

  return cssVars;
}
