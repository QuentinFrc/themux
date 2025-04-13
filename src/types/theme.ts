export type ThemeMode = "light" | "dark";

export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

export type TailwindVersion = "3" | "4";

export type RemValue = `${number}rem`; // For rem values, i.e. "0.625rem"

export type OklchValue =
  | `oklch(${number} ${number} ${number})` // For oklch values without an alpha channel, i.e., 'oklch(0.145 0 0)'
  | `oklch(${number} ${number} ${number} / ${number}%)` // For oklch values with with the alpha channel in %, i.e., 'oklch(1 0 0 / 15%)'
  | `oklch(${number} ${number} ${number} / ${number})`; // For oklch values with with the alpha channel in decimal, i.e., 'oklch(1 0 0 / 0.15)'

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
  background: string | OklchValue;
  foreground: string | OklchValue;
  card: string | OklchValue;
  "card-foreground": string | OklchValue;
  popover: string | OklchValue;
  "popover-foreground": string | OklchValue;
  primary: string | OklchValue;
  "primary-foreground": string | OklchValue;
  secondary: string | OklchValue;
  "secondary-foreground": string | OklchValue;
  muted: string | OklchValue;
  "muted-foreground": string | OklchValue;
  accent: string | OklchValue;
  "accent-foreground": string | OklchValue;
  destructive: string | OklchValue;
  "destructive-foreground"?: string | OklchValue;
  border: string | OklchValue;
  input: string | OklchValue;
  ring: string | OklchValue;
  "chart-1": string | OklchValue;
  "chart-2": string | OklchValue;
  "chart-3": string | OklchValue;
  "chart-4": string | OklchValue;
  "chart-5": string | OklchValue;
  sidebar: string | OklchValue;
  "sidebar-foreground": string | OklchValue;
  "sidebar-primary": string | OklchValue;
  "sidebar-primary-foreground": string | OklchValue;
  "sidebar-accent": string | OklchValue;
  "sidebar-accent-foreground": string | OklchValue;
  "sidebar-border": string | OklchValue;
  "sidebar-ring": string | OklchValue;
  "font-sans"?: string;
  "font-serif"?: string;
  "font-mono"?: string;
  radius?: string | RemValue;
  "shadow-color"?: string;
  "shadow-opacity"?: string;
  "shadow-blur"?: string;
  "shadow-spread"?: string;
  "shadow-offset-x"?: string;
  "shadow-offset-y"?: string;
};

export type ColorProperty = keyof OklchColorProperties;

export type PresetV4 = "stone" | "zinc" | "neutral" | "gray" | "slate";

export type ColorfulPreset =
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet";

export type OtherPresets = "claude" | "t3.chat";

export type ThemeObject = {
  name: PresetV4 | ColorfulPreset | OtherPresets | (string & {});
  label: string;
  radius?: string;
  light: Partial<ThemeProperties>;
  dark: Partial<ThemeProperties>;
};

export type ThemeConfig = {
  radius: RemValue | string;
  surface?: SurfaceShadesPreset;
  themeObject: ThemeObject;
};

// Surface shades
export type SurfaceShadesPreset =
  | "default"
  | "plain"
  | "grayish"
  | "gray"
  | "inverted";

export type SurfaceShadesThemeObject = {
  name: SurfaceShadesPreset;
  label: string;
  light: SurfaceShades;
  dark: SurfaceShades;
};

export type SurfaceShades = {
  background: OklchValue | string;
  foreground: OklchValue | string;

  card: OklchValue | string;
  "card-foreground": OklchValue | string;
  popover: OklchValue | string;
  "popover-foreground": OklchValue | string;

  muted: OklchValue | string;
  "muted-foreground": OklchValue | string;

  accent: OklchValue | string;
  "accent-foreground": OklchValue | string;

  border: OklchValue | string;
  input: OklchValue | string;

  sidebar: OklchValue | string;
  "sidebar-foreground": OklchValue | string;

  "sidebar-accent": OklchValue | string;
  "sidebar-accent-foreground": OklchValue | string;

  "sidebar-border": OklchValue | string;
};
