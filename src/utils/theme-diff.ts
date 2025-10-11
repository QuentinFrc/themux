import { ThemeSnapshot } from "@/types/theme-update";
import { isEqual } from "lodash";

export type ThemeDiffEntry = {
  path: string;
  current: unknown;
  selected: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function diffValues(
  current: unknown,
  selected: unknown,
  path: string[],
): ThemeDiffEntry[] {
  if (isEqual(current, selected)) {
    return [];
  }

  if (Array.isArray(current) && Array.isArray(selected)) {
    const entries: ThemeDiffEntry[] = [];

    if (current.length !== selected.length) {
      entries.push({
        path: [...path, "length"].join("."),
        current: current.length,
        selected: selected.length,
      });
    }

    const maxLength = Math.max(current.length, selected.length);
    for (let index = 0; index < maxLength; index += 1) {
      entries.push(
        ...diffValues(current[index], selected[index], [...path, `${index}`]),
      );
    }

    return entries;
  }

  if (isRecord(current) && isRecord(selected)) {
    const keys = new Set([
      ...Object.keys(current as Record<string, unknown>),
      ...Object.keys(selected as Record<string, unknown>),
    ]);

    const entries: ThemeDiffEntry[] = [];

    for (const key of keys) {
      entries.push(
        ...diffValues(
          (current as Record<string, unknown>)[key],
          (selected as Record<string, unknown>)[key],
          [...path, key],
        ),
      );
    }

    return entries;
  }

  return [
    {
      path: path.join("."),
      current,
      selected,
    },
  ];
}

export function diffThemeSnapshots(
  current: ThemeSnapshot,
  selected: ThemeSnapshot,
): ThemeDiffEntry[] {
  const entries: ThemeDiffEntry[] = [];

  if (current.colorFormat !== selected.colorFormat) {
    entries.push({
      path: "colorFormat",
      current: current.colorFormat,
      selected: selected.colorFormat,
    });
  }

  if (current.tailwindVersion !== selected.tailwindVersion) {
    entries.push({
      path: "tailwindVersion",
      current: current.tailwindVersion,
      selected: selected.tailwindVersion,
    });
  }

  entries.push(...diffValues(current.options, selected.options, ["options"]));
  entries.push(...diffValues(current.theme, selected.theme, ["theme"]));

  return entries;
}
