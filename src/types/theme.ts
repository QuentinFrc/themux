export type RemValue = `${number}rem`; // For rem values, i.e. "0.625rem"

export type OklchValue =
  | `oklch(${number} ${number} ${number})` // For oklch values without an alpha channel, i.e., 'oklch(0.145 0 0)'
  | `oklch(${number} ${number} ${number} / ${number}%)`; // For oklch values with with the alpha channel, i.e., 'oklch(1 0 0 / 15%)'

export type RadiusProperty = {
  radius: RemValue;
};

export type ColorProperties = {
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

export type CssThemeProperties = RadiusProperty & ColorProperties;

export type PresetV4 = "stone" | "zinc" | "neutral" | "gray" | "slate";

export type ColorfulPreset =
  | "red"
  | "rose"
  | "orange"
  | "green"
  | "blue"
  | "yellow"
  | "violet"
  | "teal"
  | "pink";

export type ThemeObject = {
  name: PresetV4 | ColorfulPreset;
  label: string;
  light: CssThemeProperties;
  dark: Omit<CssThemeProperties, "radius">;
};
