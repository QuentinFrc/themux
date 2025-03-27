import { ColorfulPreset, PresetV4, ThemeObject } from "../types/theme";

// ===> Tailwind V4
export const basePresetsV4: Record<PresetV4, ThemeObject> = {
  neutral: {
    name: "neutral",
    label: "Neutral",
    light: {
      background: "oklch(1 0 0)", // --color-neutral-50
      foreground: "oklch(0.145 0 0)", // --color-neutral-950
      card: "oklch(1 0 0)", // --color-neutral-50
      "card-foreground": "oklch(0.145 0 0)", // --color-neutral-950
      popover: "oklch(1 0 0)", // --color-neutral-50
      "popover-foreground": "oklch(0.145 0 0)", // --color-neutral-950
      primary: "oklch(0.205 0 0)", // --color-neutral-900
      "primary-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      secondary: "oklch(0.97 0 0)", // --color-neutral-100
      "secondary-foreground": "oklch(0.205 0 0)", // --color-neutral-900
      muted: "oklch(0.97 0 0)", // --color-neutral-100
      "muted-foreground": "oklch(0.556 0 0)", // --color-neutral-500
      accent: "oklch(0.97 0 0)", // --color-neutral-100
      "accent-foreground": "oklch(0.205 0 0)", // --color-neutral-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.922 0 0)", // --color-neutral-200
      input: "oklch(0.922 0 0)", // --color-neutral-200
      ring: "oklch(0.708 0 0)", // --color-neutral-400
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem",
      sidebar: "oklch(0.985 0 0)", // --color-neutral-50
      "sidebar-foreground": "oklch(0.145 0 0)", // --color-neutral-950
      "sidebar-primary": "oklch(0.205 0 0)", // --color-neutral-900
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      "sidebar-accent": "oklch(0.97 0 0)", // --color-neutral-100
      "sidebar-accent-foreground": "oklch(0.205 0 0)", // --color-neutral-900
      "sidebar-border": "oklch(0.922 0 0)", // --color-neutral-200
      "sidebar-ring": "oklch(0.708 0 0)", // --color-neutral-400
    },
    dark: {
      background: "oklch(0.145 0 0)", // --color-neutral-950
      foreground: "oklch(0.985 0 0)", // --color-neutral-50
      card: "oklch(0.205 0 0)", // --color-neutral-900
      "card-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      popover: "oklch(0.205 0 0)", // --color-neutral-900
      "popover-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      primary: "oklch(0.922 0 0)", // --color-neutral-200
      "primary-foreground": "oklch(0.205 0 0)", // --color-neutral-900
      secondary: "oklch(0.269 0 0)", // --color-neutral-800
      "secondary-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      muted: "oklch(0.269 0 0)", // --color-neutral-800
      "muted-foreground": "oklch(0.708 0 0)", // --color-neutral-400
      accent: "oklch(0.269 0 0)", // --color-neutral-800
      "accent-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      destructive: "oklch(0.704 0.191 22.216)", // --color-red-400
      border: "oklch(1 0 0 / 10%)", // --color-white
      input: "oklch(1 0 0 / 15%)", // --color-white
      ring: "oklch(0.556 0 0)", // --color-neutral-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.205 0 0)", // --color-neutral-900
      "sidebar-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      "sidebar-accent": "oklch(0.269 0 0)", // --color-neutral-800
      "sidebar-accent-foreground": "oklch(0.985 0 0)", // --color-neutral-50
      "sidebar-border": "oklch(1 0 0 / 10%)", // --color-white
      "sidebar-ring": "oklch(0.556 0 0)", // --color-neutral-500
    },
  },
  zinc: {
    name: "zinc",
    label: "Zinc",
    light: {
      background: "oklch(1 0 0)", // --color-zinc-50
      foreground: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      card: "oklch(1 0 0)", // --color-zinc-50
      "card-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      popover: "oklch(1 0 0)", // --color-zinc-50
      "popover-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      primary: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      secondary: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "secondary-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      muted: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "muted-foreground": "oklch(0.552 0.016 285.938)", // --color-zinc-500
      accent: "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "accent-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.92 0.004 286.32)", // --color-zinc-200
      input: "oklch(0.92 0.004 286.32)", // --color-zinc-200
      ring: "oklch(0.705 0.015 286.067)", // --color-zinc-400
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem",
      sidebar: "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-foreground": "oklch(0.141 0.005 285.823)", // --color-zinc-950
      "sidebar-primary": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-accent": "oklch(0.967 0.001 286.375)", // --color-zinc-100
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-border": "oklch(0.92 0.004 286.32)", // --color-zinc-200
      "sidebar-ring": "oklch(0.705 0.015 286.067)", // --color-zinc-400
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)", // --color-zinc-950
      foreground: "oklch(0.985 0 0)", // --color-zinc-50
      card: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "card-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      popover: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "popover-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      primary: "oklch(0.92 0.004 286.32)", // --color-zinc-200
      "primary-foreground": "oklch(0.21 0.006 285.885)", // --color-zinc-900
      secondary: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "secondary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      muted: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "muted-foreground": "oklch(0.705 0.015 286.067)", // --color-zinc-400
      accent: "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "accent-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      destructive: "oklch(0.704 0.191 22.216)", // --color-red-400
      border: "oklch(1 0 0 / 10%)", // --color-white
      input: "oklch(1 0 0 / 15%)", // --color-white
      ring: "oklch(0.552 0.016 285.938)", // --color-zinc-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.21 0.006 285.885)", // --color-zinc-900
      "sidebar-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-accent": "oklch(0.274 0.006 286.033)", // --color-zinc-800
      "sidebar-accent-foreground": "oklch(0.985 0 0)", // --color-zinc-50
      "sidebar-border": "oklch(1 0 0 / 10%)", // --color-white
      "sidebar-ring": "oklch(0.552 0.016 285.938)", // --color-zinc-500
    },
  },
  stone: {
    name: "stone",
    label: "Stone",
    light: {
      background: "oklch(1 0 0)", // --color-white
      foreground: "oklch(0.147 0.004 49.25)", // --color-stone-950
      card: "oklch(1 0 0)", // --color-white
      "card-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      popover: "oklch(1 0 0)", // --color-white
      "popover-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      primary: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      secondary: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "secondary-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      muted: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "muted-foreground": "oklch(0.553 0.013 58.071)", // --color-stone-500
      accent: "oklch(0.97 0.001 106.424)", // --color-stone-100
      "accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.923 0.003 48.717)", // --color-stone-200
      input: "oklch(0.923 0.003 48.717)", // --color-stone-200
      ring: "oklch(0.709 0.01 56.259)", // --color-stone-400
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem",
      sidebar: "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      "sidebar-primary": "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-accent": "oklch(0.97 0.001 106.424)", // --color-stone-100
      "sidebar-accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-border": "oklch(0.923 0.003 48.717)", // --color-stone-200
      "sidebar-ring": "oklch(0.709 0.01 56.259)", // --color-stone-400
    },
    dark: {
      background: "oklch(0.147 0.004 49.25)", // --color-stone-950
      foreground: "oklch(0.985 0.001 106.423)", // --color-stone-50
      card: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "card-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      popover: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "popover-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      primary: "oklch(0.923 0.003 48.717)", // --color-stone-200
      "primary-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      secondary: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "secondary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      muted: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "muted-foreground": "oklch(0.709 0.01 56.259)", // --color-stone-400
      accent: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      destructive: "oklch(0.704 0.191 22.216)", // --color-red-500
      border: "oklch(1 0 0 / 10%)", // --color-white
      input: "oklch(1 0 0 / 15%)", // --color-white
      ring: "oklch(0.553 0.013 58.071)", // --color-stone-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "sidebar-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-accent": "oklch(0.268 0.007 34.298)", // --color-stone-800
      "sidebar-accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-border": "oklch(1 0 0 / 10%)", // --color-white
      "sidebar-ring": "oklch(0.553 0.013 58.071)", // --color-stone-500
    },
  },
  gray: {
    name: "gray",
    label: "Gray",
    light: {
      background: "oklch(1 0 0)", // --color-white (closest to gray-50)
      foreground: "oklch(0.13 0.028 261.692)", // --color-gray-950
      card: "oklch(1 0 0)", // --color-white (closest to gray-50)
      "card-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      popover: "oklch(1 0 0)", // --color-white (closest to gray-50)
      "popover-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      primary: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      secondary: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "secondary-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      muted: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "muted-foreground": "oklch(0.551 0.027 264.364)", // --color-gray-500
      accent: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "accent-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.928 0.006 264.531)", // --color-gray-200
      input: "oklch(0.928 0.006 264.531)", // --color-gray-200
      ring: "oklch(0.707 0.022 261.325)", // --color-gray-400
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem",
      sidebar: "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      "sidebar-primary": "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-accent": "oklch(0.967 0.003 264.542)", // --color-gray-100
      "sidebar-accent-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-border": "oklch(0.928 0.006 264.531)", // --color-gray-200
      "sidebar-ring": "oklch(0.707 0.022 261.325)", // --color-gray-400
    },
    dark: {
      background: "oklch(0.13 0.028 261.692)", // --color-gray-950
      foreground: "oklch(0.985 0.002 247.839)", // --color-gray-50
      card: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "card-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      popover: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "popover-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      primary: "oklch(0.928 0.006 264.531)", // --color-gray-200
      "primary-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      secondary: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "secondary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      muted: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "muted-foreground": "oklch(0.707 0.022 261.325)", // --color-gray-400
      accent: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "accent-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      destructive: "oklch(0.704 0.191 22.216)", // --color-red-400
      border: "oklch(1 0 0 / 10%)", // --color-white
      input: "oklch(1 0 0 / 15%)", // --color-white
      ring: "oklch(0.551 0.027 264.364)", // --color-gray-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-accent": "oklch(0.278 0.033 256.848)", // --color-gray-800
      "sidebar-accent-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-border": "oklch(1 0 0 / 10%)", // --color-white
      "sidebar-ring": "oklch(0.551 0.027 264.364)", // --color-gray-500
    },
  },
  slate: {
    name: "slate",
    label: "Slate",
    light: {
      background: "oklch(1 0 0)", // --color-white (closest to slate-50)
      foreground: "oklch(0.129 0.042 264.695)", // --color-slate-950
      card: "oklch(1 0 0)", // --color-white (closest to slate-50)
      "card-foreground": "oklch(0.129 0.042 264.695)", // --color-slate-950
      popover: "oklch(1 0 0)", // --color-white (closest to slate-50)
      "popover-foreground": "oklch(0.129 0.042 264.695)", // --color-slate-950
      primary: "oklch(0.208 0.042 265.755)", // --color-slate-900
      "primary-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      secondary: "oklch(0.968 0.007 247.896)", // --color-slate-100
      "secondary-foreground": "oklch(0.208 0.042 265.755)", // --color-slate-900
      muted: "oklch(0.968 0.007 247.896)", // --color-slate-100
      "muted-foreground": "oklch(0.554 0.046 257.417)", // --color-slate-500
      accent: "oklch(0.968 0.007 247.896)", // --color-slate-100
      "accent-foreground": "oklch(0.208 0.042 265.755)", // --color-slate-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.929 0.013 255.508)", // --color-slate-200
      input: "oklch(0.929 0.013 255.508)", // --color-slate-200
      ring: "oklch(0.704 0.04 256.788)", // --color-slate-400
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem",
      sidebar: "oklch(0.984 0.003 247.858)", // --color-slate-50
      "sidebar-foreground": "oklch(0.129 0.042 264.695)", // --color-slate-950
      "sidebar-primary": "oklch(0.208 0.042 265.755)", // --color-slate-900
      "sidebar-primary-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      "sidebar-accent": "oklch(0.968 0.007 247.896)", // --color-slate-100
      "sidebar-accent-foreground": "oklch(0.208 0.042 265.755)", // --color-slate-900
      "sidebar-border": "oklch(0.929 0.013 255.508)", // --color-slate-200
      "sidebar-ring": "oklch(0.704 0.04 256.788)", // --color-slate-400
    },
    dark: {
      background: "oklch(0.129 0.042 264.695)", // --color-slate-950
      foreground: "oklch(0.984 0.003 247.858)", // --color-slate-50
      card: "oklch(0.208 0.042 265.755)", // --color-slate-900
      "card-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      popover: "oklch(0.208 0.042 265.755)", // --color-slate-900
      "popover-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      primary: "oklch(0.929 0.013 255.508)", // --color-slate-200
      "primary-foreground": "oklch(0.208 0.042 265.755)", // --color-slate-900
      secondary: "oklch(0.279 0.041 260.031)", // --color-slate-800
      "secondary-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      muted: "oklch(0.279 0.041 260.031)", // --color-slate-800
      "muted-foreground": "oklch(0.704 0.04 256.788)", // --color-slate-400
      accent: "oklch(0.279 0.041 260.031)", // --color-slate-800
      "accent-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      destructive: "oklch(0.704 0.191 22.216)", // --color-red-400
      border: "oklch(1 0 0 / 10%)", // --color-white
      input: "oklch(1 0 0 / 15%)", // --color-white
      ring: "oklch(0.551 0.027 264.364)", // --color-slate-500
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.208 0.042 265.755)", // --color-slate-900
      "sidebar-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      "sidebar-accent": "oklch(0.279 0.041 260.031)", // --color-slate-800
      "sidebar-accent-foreground": "oklch(0.984 0.003 247.858)", // --color-slate-50
      "sidebar-border": "oklch(1 0 0 / 10%)", // --color-white
      "sidebar-ring": "oklch(0.551 0.027 264.364)", // --color-slate-500
    },
  },
} as const;

export const basePresetsV4Array = Object.values(basePresetsV4);

// ===> Presets based on Shadcn website for TailwindCSS V3 (✅Red, ✅Rose, ✅Orange, ✅Green, ✅Blue, ✅Yellow, ✅Violet, ✅Teal, ✅Pink)
export const colorfulPresets: Record<ColorfulPreset, ThemeObject> = {
  red: {
    name: "red",
    label: "Red",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0.001 106.423)", // --color-stone-50 with 1 lightness
      foreground: "oklch(0.147 0.004 49.25)", // --color-stone-950
      card: "oklch(0.985 0.001 106.423)", // --color-stone-50
      "card-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      popover: "oklch(0.985 0.001 106.423)", // --color-stone-50
      "popover-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950,
      primary: "oklch(0.637 0.237 25.331)", // --color-red-500
      "primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      secondary: "oklch(0.885 0.062 18.334)", // --color-red-200
      "secondary-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      muted: "oklch(0.97 0.001 106.424)", // --color-stone-200
      "muted-foreground": "oklch(0.553 0.013 58.071)", // --color-stone-500
      accent: "oklch(0.97 0.001 106.424)", // --color-stone-200
      "accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900
      destructive: "oklch(0.45 0.245 27.325)",
      border: "oklch(0.923 0.003 48.717)", // --color-stone-200
      input: "oklch(0.923 0.003 48.717)", // --color-stone-200
      ring: "oklch(0.637 0.237 25.331)", // --color-red-500,
      "chart-1": "oklch(0.645 0.246 16.439)", // --color-rose-500
      "chart-2": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-3": "oklch(0.705 0.213 47.604)", // --color-orange-400
      "chart-4": "oklch(0.704 0.14 182.503)", // --color-teal-500
      "chart-5": "oklch(0.768 0.233 130.85)", // --color-green-500
      sidebar: "oklch(0.97 0.001 106.424)", // --color-stone-200
      "sidebar-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950,
      "sidebar-primary": "oklch(0.637 0.237 25.331)", // --color-red-500,
      "sidebar-primary-foreground": "oklch(0.147 0.004 49.25)", // --color-stone-950
      "sidebar-accent": "oklch(0.97 0.001 106.424)", // --color-stone-200
      "sidebar-accent-foreground": "oklch(0.216 0.006 56.043)", // --color-stone-900",
      "sidebar-border": "oklch(0.923 0.003 48.717)", // --color-stone-200
      "sidebar-ring": "oklch(0.637 0.237 25.331)", // --color-red-500,
    },
    dark: {
      background: "oklch(0.147 0.004 49.25)", // --color-stone-950
      foreground: "oklch(0.985 0.001 106.423)", // --color-stone-50
      card: "oklch(0.216 0.006 56.043)", // --color-stone-900
      "card-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      popover: "oklch(0.216 0.006 56.043)", // --color-stone-900",
      "popover-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      primary: "oklch(0.637 0.237 25.331)", // --color-red-500
      "primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      secondary: "oklch(0.444 0.177 26.899)", // --color-red-800
      "secondary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      muted: "oklch(0.268 0.007 34.298)", // --color-stone-800
      "muted-foreground": "oklch(0.709 0.01 56.259)", // --color-stone-400
      accent: "oklch(0.268 0.007 34.298)", // --color-stone-800,
      "accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.637 0.237 25.331)", // --color-red-500
      "chart-1": "oklch(0.645 0.246 16.439)", // --color-rose-500
      "chart-2": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-3": "oklch(0.705 0.213 47.604)", // --color-orange-400
      "chart-4": "oklch(0.704 0.14 182.503)", // --color-teal-500
      "chart-5": "oklch(0.768 0.233 130.85)", // --color-green-500
      sidebar: "oklch(0.216 0.006 56.043)", // --color-stone-900",
      "sidebar-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-primary": "oklch(0.637 0.237 25.331)", // --color-red-500",
      "sidebar-primary-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-accent": "oklch(0.268 0.007 34.298)", // --color-stone-800",
      "sidebar-accent-foreground": "oklch(0.985 0.001 106.423)", // --color-stone-50
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.637 0.237 25.331)", // --color-red-500",
    },
  },
  rose: {
    name: "rose",
    label: "Rose",
    light: {
      radius: "0.5rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(0.985 0.001 106.423)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(0.985 0.001 106.423)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.59 0.2224 13.72)",
      "primary-foreground": "oklch(0.97 0.01 347)",
      secondary: "oklch(0.941 0.03 12.58)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.45 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.59 0.2224 13.72)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0.001 106.423)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.59 0.2224 13.72)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.59 0.2224 13.72)",
    },
    dark: {
      background: "oklch(0.205 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.235 0.002 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.235 0.002 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.58 0.2221 12.55)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.455 0.188 13.697)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.58 0.2221 12.55)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.235 0.002 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.58 0.2221 12.55)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.58 0.2221 12.55)",
    },
  },
  orange: {
    name: "orange",
    label: "Orange",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.705 0.213 47.604)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.954 0.038 75.164)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.705 0.213 47.604)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.705 0.213 47.604)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.705 0.213 47.604)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.705 0.213 47.604)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.47 0.157 37.304)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.705 0.213 47.604)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.205 0 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.705 0.213 47.604)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.705 0.213 47.604)",
    },
  },
  green: {
    name: "green",
    label: "Green",
    light: {
      radius: "0.5rem",
      background: "oklch(0.99 0.005 200)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(0.99 0.005 200)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(0.99 0.005 200)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.6273 0.17 149.2)",
      "primary-foreground": "oklch(0.97 0.01 149.2)",
      secondary: "oklch(0.962 0.044 156.743)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.94 0.005 200)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0.005 200)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.45 0.245 27.325)",
      border: "oklch(0.922 0.005 200)",
      input: "oklch(0.922 0.005 200)",
      ring: "oklch(0.6273 0.17 149.2)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.97 0.008 200)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.6273 0.17 149.2)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0.015 200)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0.015 200)",
      "sidebar-ring": "oklch(0.6273 0.17 149.2)",
    },
    dark: {
      background: "oklch(0.145 0.015 235)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0.015 235)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0.015 235)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.627 0.194 149.214)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.448 0.119 151.328)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.249 0.009 170)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.249 0.009 170)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.627 0.194 149.214)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.205 0.015 235)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.627 0.194 149.214)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.249 0.009 170)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.627 0.194 149.214)",
    },
  },
  blue: {
    name: "blue",
    label: "Blue",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.623 0.214 259.815)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.932 0.032 255.585)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.623 0.214 259.815)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.623 0.214 259.815)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.623 0.214 259.815)",
    },
    dark: {
      background: "oklch(0.185 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.145 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.145 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.623 0.214 259.815)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.424 0.199 265.638)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.623 0.214 259.815)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.145 0 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.623 0.214 259.815)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.623 0.214 259.815)",
    },
  },
  yellow: {
    name: "yellow",
    label: "Yellow",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.145 0 0)",
      primary: "oklch(0.795 0.184 86.047)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.973 0.071 103.193)",
      "secondary-foreground": "oklch(0.205 0 0)",
      muted: "oklch(0.97 0 0)",
      "muted-foreground": "oklch(0.556 0 0)",
      accent: "oklch(0.97 0 0)",
      "accent-foreground": "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.795 0.184 86.047)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.145 0 0)",
      "sidebar-primary": "oklch(0.795 0.184 86.047)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.97 0 0)",
      "sidebar-accent-foreground": "oklch(0.205 0 0)",
      "sidebar-border": "oklch(0.922 0 0)",
      "sidebar-ring": "oklch(0.795 0.184 86.047)",
    },
    dark: {
      background: "oklch(0.145 0 0)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0 0)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0 0)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.795 0.184 86.047)",
      "primary-foreground": "oklch(0.205 0 0)",
      secondary: "oklch(0.476 0.114 61.907)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.269 0 0)",
      "muted-foreground": "oklch(0.708 0 0)",
      accent: "oklch(0.269 0 0)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.795 0.184 86.047)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.205 0 0)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.795 0.184 86.047)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.269 0 0)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.795 0.184 86.047)",
    },
  },
  violet: {
    name: "violet",
    label: "Violet",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(0.985 0 0)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(0.985 0 0)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.606 0.25 292.717)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.943 0.029 294.588)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.967 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.967 0.001 286.375)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.92 0.004 286.32)",
      input: "oklch(0.92 0.004 286.32)",
      ring: "oklch(0.606 0.25 292.717)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-primary": "oklch(0.606 0.25 292.717)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.967 0.001 286.375)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.92 0.004 286.32)",
      "sidebar-ring": "oklch(0.606 0.25 292.717)",
    },
    dark: {
      background: "oklch(0.18 0.005 285.823)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.21 0.006 285.885)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.21 0.006 285.885)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.541 0.281 293.009)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.432 0.232 292.759)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.541 0.281 293.009)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.21 0.006 285.885)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.541 0.281 293.009)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.274 0.006 286.033)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.541 0.281 293.009)",
    },
  },
  teal: {
    name: "teal",
    label: "Teal",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(1 0 0)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(1 0 0)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.704 0.14 182.503)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.953 0.051 180.801)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.967 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.967 0.001 286.375)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.92 0.004 286.32)",
      input: "oklch(0.92 0.004 286.32)",
      ring: "oklch(0.704 0.14 182.503)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-primary": "oklch(0.704 0.14 182.503)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.967 0.001 286.375)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.92 0.004 286.32)",
      "sidebar-ring": "oklch(0.704 0.14 182.503)",
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.21 0.006 285.885)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.21 0.006 285.885)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.6 0.118 184.704)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.437 0.078 188.216)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.6 0.118 184.704)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.21 0.006 285.885)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.6 0.118 184.704)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.274 0.006 286.033)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.6 0.118 184.704)",
    },
  },
  pink: {
    name: "pink",
    label: "Pink",
    light: {
      radius: "0.625rem",
      background: "oklch(1 0 0)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(0.985 0 0)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(0.985 0 0)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      primary: "oklch(0.718 0.202 349.761)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.948 0.028 342.258)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.967 0.001 286.375)",
      "muted-foreground": "oklch(0.552 0.016 285.938)",
      accent: "oklch(0.967 0.001 286.375)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      destructive: "oklch(0.577 0.245 27.325)",
      border: "oklch(0.92 0.004 286.32)",
      input: "oklch(0.92 0.004 286.32)",
      ring: "oklch(0.718 0.202 349.761)",
      "chart-1": "oklch(0.646 0.222 41.116)",
      "chart-2": "oklch(0.6 0.118 184.704)",
      "chart-3": "oklch(0.398 0.07 227.392)",
      "chart-4": "oklch(0.828 0.189 84.429)",
      "chart-5": "oklch(0.769 0.188 70.08)",
      sidebar: "oklch(0.985 0 0)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-primary": "oklch(0.718 0.202 349.761)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.967 0.001 286.375)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.92 0.004 286.32)",
      "sidebar-ring": "oklch(0.718 0.202 349.761)",
    },
    dark: {
      background: "oklch(0.141 0.005 285.823)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.21 0.006 285.885)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.21 0.006 285.885)",
      "popover-foreground": "oklch(0.985 0 0)",
      primary: "oklch(0.656 0.241 354.308)",
      "primary-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.459 0.187 3.815)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.274 0.006 286.033)",
      "muted-foreground": "oklch(0.705 0.015 286.067)",
      accent: "oklch(0.274 0.006 286.033)",
      "accent-foreground": "oklch(0.985 0 0)",
      destructive: "oklch(0.704 0.191 22.216)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      ring: "oklch(0.656 0.241 354.308)",
      "chart-1": "oklch(0.488 0.243 264.376)",
      "chart-2": "oklch(0.696 0.17 162.48)",
      "chart-3": "oklch(0.769 0.188 70.08)",
      "chart-4": "oklch(0.627 0.265 303.9)",
      "chart-5": "oklch(0.645 0.246 16.439)",
      sidebar: "oklch(0.21 0.006 285.885)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-primary": "oklch(0.656 0.241 354.308)",
      "sidebar-primary-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.274 0.006 286.033)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "sidebar-ring": "oklch(0.656 0.241 354.308)",
    },
  },
} as const;

export const colorfulPresetsArray = Object.values(colorfulPresets);

// Combination of base and colorful presets
export const allPresets = { ...basePresetsV4, ...colorfulPresets };
export const allPresetsArray = Object.values(allPresets);
