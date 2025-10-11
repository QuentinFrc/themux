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
  version: number;
  config: ThemeSnapshot;
  createdAt: Date;
};

export type CreateThemeVersionInput = {
  version: number;
  snapshot: ThemeSnapshot;
};

export interface ThemeVersionRepository {
  getLatestThemeVersion(): Promise<ThemeVersionRecord | null>;
  createThemeVersion(
    input: CreateThemeVersionInput,
  ): Promise<ThemeVersionRecord>;
  getThemeVersionById(id: string): Promise<ThemeVersionRecord | null>;
  listThemeVersions(): Promise<ThemeVersionRecord[]>;
}

export type ThemeUpdateHandler = () => Promise<Status<ThemeVersionRecord>>;
