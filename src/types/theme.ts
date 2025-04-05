export type ThemeMode = "light" | "dark";

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

export type TailwindVersion = "3" | "4";

export type RemValue = `${number}rem`; // For rem values, i.e. "0.625rem"

export type OklchValue =
  | `oklch(${number} ${number} ${number})` // For oklch values without an alpha channel, i.e., 'oklch(0.145 0 0)'
  | `oklch(${number} ${number} ${number} / ${number}%)` // For oklch values with with the alpha channel in %, i.e., 'oklch(1 0 0 / 15%)'
  | `oklch(${number} ${number} ${number} / ${number})`; // For oklch values with with the alpha channel in decimal, i.e., 'oklch(1 0 0 / 0.15)'

export type RadiusProperty = {
  radius: RemValue;
};

export type HexValue = `#${string}`;

export type OklchColorProperties = {
  background: OklchValue;
  foreground: OklchValue;
  card: OklchValue;
  "card-foreground": OklchValue;
  popover: OklchValue;
  "popover-foreground": OklchValue;
  primary: OklchValue;
  "primary-foreground": OklchValue;
  secondary: OklchValue;
  "secondary-foreground": OklchValue;
  muted: OklchValue;
  "muted-foreground": OklchValue;
  accent: OklchValue;
  "accent-foreground": OklchValue;
  destructive: OklchValue;
  border: OklchValue;
  input: OklchValue;
  ring: OklchValue;
  "chart-1": OklchValue;
  "chart-2": OklchValue;
  "chart-3": OklchValue;
  "chart-4": OklchValue;
  "chart-5": OklchValue;
  sidebar: OklchValue;
  "sidebar-foreground": OklchValue;
  "sidebar-primary": OklchValue;
  "sidebar-primary-foreground": OklchValue;
  "sidebar-accent": OklchValue;
  "sidebar-accent-foreground": OklchValue;
  "sidebar-border": OklchValue;
  "sidebar-ring": OklchValue;
};

export type ThemeProperties = {
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  "chart-1": string;
  "chart-2": string;
  "chart-3": string;
  "chart-4": string;
  "chart-5": string;
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-primary": string;
  "sidebar-primary-foreground": string;
  "sidebar-accent": string;
  "sidebar-accent-foreground": string;
  "sidebar-border": string;
  "sidebar-ring": string;
  "font-sans"?: string;
  "font-serif"?: string;
  "font-mono"?: string;
  radius?: string;
  "shadow-color"?: string;
  "shadow-opacity"?: string;
  "shadow-blur"?: string;
  "shadow-spread"?: string;
  "shadow-offset-x"?: string;
  "shadow-offset-y"?: string;
};

export type ColorProperty = keyof OklchColorProperties;

export type CssThemeProperties = RadiusProperty & OklchColorProperties;

export type PresetV4 = "stone" | "zinc" | "neutral" | "gray" | "slate";

export type ColorfulPreset =
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet"
  | "pink";

export type ThemeObject = {
  name: PresetV4 | ColorfulPreset | "custom";
  label: string;
  light: OklchColorProperties;
  dark: OklchColorProperties;
};

export type ThemeConfig = {
  radius: RemValue;
  themeObject: ThemeObject;
};
