import { ColorFormat, TailwindVersion, ThemeConfig } from "./theme";
import { Status } from "./status";

export type ThemeSnapshot = {
  theme: ThemeConfig;
  css: {
    root: string;
    dark: string;
  };
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
  options: {
    fontVars: boolean;
    shadowVars: boolean;
  };
};

export type ThemeUpdatePayload = {
  themeConfig: ThemeConfig;
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
  includeFontVars?: boolean;
  includeShadowVars?: boolean;
};

export type ThemeVersionRecord = {
  id: string;
  name: string;
  version: number;
  config: ThemeSnapshot;
  createdAt: Date;
};

export type CreateThemeVersionInput = {
  themeName: string;
  version: number;
  snapshot: ThemeSnapshot;
};

export interface ThemeVersionRepository {
  getLatestThemeVersion(themeName: string): Promise<ThemeVersionRecord | null>;
  createThemeVersion(
    input: CreateThemeVersionInput,
  ): Promise<ThemeVersionRecord>;
  listThemeVersions(themeName?: string): Promise<ThemeVersionRecord[]>;
}

export type ThemeUpdateHandler = () => Promise<Status<ThemeVersionRecord>>;
