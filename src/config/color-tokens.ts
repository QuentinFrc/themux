import { ColorProperty } from "@/types/theme";

type ColorTokenSetter = "single" | "paired";

export interface ColorTokenConfig {
  property: ColorProperty;
  setter?: ColorTokenSetter;
  syncModes?: boolean;
  optional?: boolean;
}

export interface ColorTokenGroupConfig {
  id: string;
  title: string;
  expanded?: boolean;
  tokens: ColorTokenConfig[];
}

export const colorTokenGroups: ColorTokenGroupConfig[] = [
  {
    id: "base-colors",
    title: "Base colors",
    expanded: true,
    tokens: [
      { property: "background", setter: "paired", syncModes: false },
      { property: "foreground", syncModes: false },
    ],
  },
  {
    id: "primary-colors",
    title: "Primary colors",
    expanded: true,
    tokens: [
      { property: "primary", setter: "paired" },
      { property: "primary-foreground", syncModes: false },
    ],
  },
  {
    id: "secondary-colors",
    title: "Secondary colors",
    tokens: [
      { property: "secondary", setter: "paired" },
      { property: "secondary-foreground", syncModes: false },
    ],
  },
  {
    id: "card-colors",
    title: "Card colors",
    tokens: [
      { property: "card", setter: "paired", syncModes: false },
      { property: "card-foreground", syncModes: false },
    ],
  },
  {
    id: "popover-colors",
    title: "Popover colors",
    tokens: [
      { property: "popover", setter: "paired", syncModes: false },
      { property: "popover-foreground", syncModes: false },
    ],
  },
  {
    id: "muted-colors",
    title: "Muted colors",
    tokens: [
      { property: "muted", setter: "paired", syncModes: false },
      { property: "muted-foreground", syncModes: false },
    ],
  },
  {
    id: "accent-colors",
    title: "Accent colors",
    tokens: [
      { property: "accent", setter: "paired", syncModes: false },
      { property: "accent-foreground", syncModes: false },
    ],
  },
  {
    id: "destructive-colors",
    title: "Destructive colors",
    tokens: [
      { property: "destructive", setter: "paired", syncModes: false },
      { property: "destructive-foreground", syncModes: false, optional: true },
    ],
  },
  {
    id: "border-input-ring-colors",
    title: "Border/Input/Ring colors",
    tokens: [
      { property: "border", syncModes: false },
      { property: "input", syncModes: false },
      { property: "ring" },
    ],
  },
  {
    id: "chart-colors",
    title: "Chart colors",
    tokens: [
      { property: "chart-1" },
      { property: "chart-2" },
      { property: "chart-3" },
      { property: "chart-4" },
      { property: "chart-5" },
    ],
  },
  {
    id: "sidebar-colors",
    title: "Sidebar colors",
    tokens: [
      { property: "sidebar", setter: "paired", syncModes: false },
      { property: "sidebar-foreground", syncModes: false },
      { property: "sidebar-primary", setter: "paired" },
      { property: "sidebar-primary-foreground", syncModes: false },
      { property: "sidebar-accent", setter: "paired", syncModes: false },
      { property: "sidebar-accent-foreground", syncModes: false },
      { property: "sidebar-border", syncModes: false },
      { property: "sidebar-ring" },
    ],
  },
];
