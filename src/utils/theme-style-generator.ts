import {
  ColorFormat,
  TailwindVersion,
  ThemeConfig,
  ThemeMode,
  ThemeObject,
} from "@/types/theme";
import { colorFormatter } from "@/utils/color-converter";

function generateColorVariables(
  themeObject: ThemeObject,
  mode: ThemeMode,
  formatColor: (color: string) => string,
): string {
  const styles = themeObject[mode];

  return `--background: ${formatColor(styles.background)};
  --foreground: ${formatColor(styles.foreground)};
  --card: ${formatColor(styles.card)};
  --card-foreground: ${formatColor(styles["card-foreground"])};
  --popover: ${formatColor(styles.popover)};
  --popover-foreground: ${formatColor(styles["popover-foreground"])};
  --primary: ${formatColor(styles.primary)};
  --primary-foreground: ${formatColor(styles["primary-foreground"])};
  --secondary: ${formatColor(styles.secondary)};
  --secondary-foreground: ${formatColor(styles["secondary-foreground"])};
  --muted: ${formatColor(styles.muted)};
  --muted-foreground: ${formatColor(styles["muted-foreground"])};
  --accent: ${formatColor(styles.accent)};
  --accent-foreground: ${formatColor(styles["accent-foreground"])};
  --destructive: ${formatColor(styles.destructive)};
  --border: ${formatColor(styles.border)};
  --input: ${formatColor(styles.input)};
  --ring: ${formatColor(styles.ring)};
  --chart-1: ${formatColor(styles["chart-1"])};
  --chart-2: ${formatColor(styles["chart-2"])};
  --chart-3: ${formatColor(styles["chart-3"])};
  --chart-4: ${formatColor(styles["chart-4"])};
  --chart-5: ${formatColor(styles["chart-5"])};
  --sidebar: ${formatColor(styles.sidebar)};
  --sidebar-foreground: ${formatColor(styles["sidebar-foreground"])};
  --sidebar-primary: ${formatColor(styles["sidebar-primary"])};
  --sidebar-primary-foreground: ${formatColor(styles["sidebar-primary-foreground"])};
  --sidebar-accent: ${formatColor(styles["sidebar-accent"])};
  --sidebar-accent-foreground: ${formatColor(styles["sidebar-accent-foreground"])};
  --sidebar-border: ${formatColor(styles["sidebar-border"])};
  --sidebar-ring: ${formatColor(styles["sidebar-ring"])};`.trim();
}

function generateThemeVariables(
  themeConfig: ThemeConfig,
  mode: ThemeMode,
  formatColor: (color: string) => string,
): string {
  if (mode === "light") {
    return `:root {
  --radius: ${themeConfig.radius};
  ${generateColorVariables(themeConfig.themeObject, mode, formatColor)}
}`;
  }

  return `.dark {
  ${generateColorVariables(themeConfig.themeObject, mode, formatColor)}
}`;
}

function generateTailwindV4ThemeInline(): string {
  return `@theme inline {
  /* adjust your fonts variables here */
  /* --font-sans: var(--font-sans);   */
  /* --font-mono: var(--font-mono);   */
  /* --font-serif: var(--font-serif); */

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --color-background: var(--background);
  --color-foreground: var(--foreground);

  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);

  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);

  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
  }`.trim();
}

export function generateThemeCode({
  themeConfig,
  colorFormat = "oklch",
  tailwindVersion = "4",
}: {
  themeConfig: ThemeConfig;
  colorFormat?: ColorFormat;
  tailwindVersion?: TailwindVersion;
}): string {
  if (
    !themeConfig ||
    !("light" in themeConfig.themeObject) ||
    !("dark" in themeConfig.themeObject)
  ) {
    throw new Error("Invalid theme styles: missing light or dark mode");
  }

  const formatColor = (color: string) => {
    return colorFormatter(color, colorFormat, tailwindVersion);
  };

  const lightTheme = generateThemeVariables(themeConfig, "light", formatColor);
  const darkTheme = generateThemeVariables(themeConfig, "dark", formatColor);

  if (tailwindVersion === "4") {
    return `${lightTheme}\n\n${darkTheme}\n\n${generateTailwindV4ThemeInline()}`;
  }

  return `@layer base {
${lightTheme}\n\n${darkTheme}
}`;
}
