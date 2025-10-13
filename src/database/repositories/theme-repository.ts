import { randomBytes } from "crypto";

import type { DatabaseClient } from "@/database/drizzle/client";
import { getThemeMutations } from "@/database/mutations/theme";
import { getThemeQueries } from "@/database/queries/theme";
import {
  AuthorTable,
  CommitTable,
  ThemeTable,
} from "@/database/drizzle/schema";
import {
  CreateThemeVersionInput,
  ThemeCommitRecord,
  ThemeCommitRecordWithTheme,
  ThemeVersionRecord,
  ThemeVersionRepository,
} from "@/types/theme-update";

type ThemeRowWithRelations = ThemeTable & {
  commit: (CommitTable & { author: AuthorTable }) | null;
};

function toCommitRecord(row: CommitTable & { author: AuthorTable }): ThemeCommitRecord {
  return {
    hash: row.hash,
    message: row.message,
    createdAt: row.createdAt ?? new Date(),
    author: {
      id: row.author.id,
      name: row.author.name,
      email: row.author.email,
    },
  } satisfies ThemeCommitRecord;
}

function toThemeVersionRecord(row: ThemeRowWithRelations): ThemeVersionRecord {
  if (!row.commit) {
    throw new Error("Theme record is missing commit information.");
  }

  return {
    id: row.id,
    name: row.name,
    config: row.config,
    createdAt: row.createdAt ?? new Date(),
    commit: toCommitRecord({ ...row.commit, author: row.commit.author }),
  } satisfies ThemeVersionRecord;
}

function generateCommitHash() {
  return randomBytes(20).toString("hex");
}

export function createThemeVersionRepository(
  db: DatabaseClient
): ThemeVersionRepository {
  const queries = getThemeQueries(db);
  const mutations = getThemeMutations(db);

  return {
    async getLatestThemeVersion() {
      const row = await queries.getLatestThemeVersion();

      if (!row) {
        return null;
      }

      return toThemeVersionRecord(row as ThemeRowWithRelations);
    },

    async createThemeVersion(input: CreateThemeVersionInput) {
      const snapshot = input.snapshot;
      const themeName = snapshot.theme.themeObject.name;
      const commitHash = generateCommitHash();
      const authorEmail = input.commit.author.email?.trim();
      const authorName = input.commit.author.name.trim();
      const commitMessage = input.commit.message.trim();

      let author = authorEmail
        ? await queries.findAuthorByEmail(authorEmail)
        : null;

      if (!author) {
        author = await mutations.createAuthor({
          name: authorName,
          email: authorEmail ?? null,
        });
      }

      const commit = await mutations.createCommit({
        hash: commitHash,
        message: commitMessage,
        authorId: author.id,
      });

      const inserted = await mutations.createThemeVersion({
        name: themeName,
        commitHash: commit.hash,
        config: snapshot,
      });

      if (!inserted) {
        throw new Error("Failed to persist the theme version.");
      }

      return toThemeVersionRecord({
        ...inserted,
        commit: { ...commit, author },
      } as ThemeRowWithRelations);
    },

    async getThemeVersionById(id: string) {
      const row = await queries.getThemeVersionById(id);

      if (!row) {
        return null;
      }

      return {
        id: row.id,
        version: row.version,
        config: row.config,
        createdAt: row.createdAt ?? new Date(),
      } satisfies ThemeVersionRecord;
    },

    async listThemeVersions() {
      const rows = await queries.listThemeVersions();

      return rows.map((row) => toThemeVersionRecord(row as ThemeRowWithRelations));
    },

    async listCommits() {
      const rows = await queries.listCommits();

      return rows.map((row) => ({
        ...toCommitRecord({ ...row, author: row.author }),
        theme: row.theme
          ? {
              id: row.theme.id,
              name: row.theme.name,
            }
          : undefined,
      })) satisfies ThemeCommitRecordWithTheme[];
    },
  } satisfies ThemeVersionRepository;
}
