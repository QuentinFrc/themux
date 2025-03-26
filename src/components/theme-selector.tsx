// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/theme-selector.tsx
// I removed this implementation for now, I plan on using it differently in the future
"use client";

import { BASE_THEMES, COLORFUL_THEMES } from "@/lib/themes";
import { useThemeConfig } from "@/components/active-theme";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function ThemeSelector() {
  const { activeTheme, setActiveTheme } = useThemeConfig();

  return (
    <Select value={activeTheme} onValueChange={setActiveTheme}>
      <SelectTrigger size="sm" className="w-32">
        <SelectValue placeholder="Select a theme" />
      </SelectTrigger>
      <SelectContent align="end">
        <SelectGroup>
          <SelectLabel>Base</SelectLabel>
          {BASE_THEMES.map((theme) => (
            <SelectItem key={theme.name} value={theme.value}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Colorful</SelectLabel>
          {COLORFUL_THEMES.map((theme) => (
            <SelectItem key={theme.name} value={theme.value}>
              {theme.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
