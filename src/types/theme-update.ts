import type { Status } from "./status";
import type { ColorFormat, TailwindVersion, ThemeConfig } from "./theme";

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
  commit: ThemeCommitInput;
  snapshot?: ThemeSnapshot;
};

export type ThemeCommitAuthor = {
  id: string;
  name: string;
  email?: string | null;
};

export type ThemeCommitRecord = {
  hash: string;
  message: string;
  createdAt: Date;
  author: ThemeCommitAuthor;
};

export type ThemeVersionRecord = {
  id: string;
  version: number;
  config: ThemeSnapshot;
  createdAt: Date;
  commit: ThemeCommitRecord;
};

export type ThemeCommitInput = {
  message: string;
  author: {
    name: string;
    email?: string;
  };
};

export type CreateThemeVersionInput = {
  snapshot: ThemeSnapshot;
  commit: ThemeCommitInput;
};

export type ThemeCommitRecordWithTheme = ThemeCommitRecord & {
  theme?: {
    id: string;
    name: string;
  };
};

export interface ThemeVersionRepository {
  getLatestThemeVersion(): Promise<ThemeVersionRecord | null>;
  createThemeVersion(
    input: CreateThemeVersionInput
  ): Promise<ThemeVersionRecord>;
  getThemeVersionById(id: string): Promise<ThemeVersionRecord | null>;
  listThemeVersions(): Promise<ThemeVersionRecord[]>;
  listCommits(): Promise<ThemeCommitRecordWithTheme[]>;
}

export type ThemeUpdateHandler = () => Promise<Status<ThemeVersionRecord>>;
