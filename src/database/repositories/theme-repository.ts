import { DatabaseClient } from "@/database/drizzle/client";
import { getThemeMutations } from "@/database/mutations/theme";
import { getThemeQueries } from "@/database/queries/theme";
import {
  CreateThemeVersionInput,
  ThemeVersionRecord,
  ThemeVersionRepository,
} from "@/types/theme-update";

export function createThemeVersionRepository(
  db: DatabaseClient,
): ThemeVersionRepository {
  const queries = getThemeQueries(db);
  const mutations = getThemeMutations(db);

  return {
    async getLatestThemeVersion(themeName: string) {
      const row = await queries.getLatestThemeVersion(themeName);

      if (!row) {
        return null;
      }

      return {
        id: row.id,
        name: row.name,
        version: row.version,
        config: row.config,
        createdAt: row.createdAt ?? new Date(),
      } satisfies ThemeVersionRecord;
    },

    async createThemeVersion(input: CreateThemeVersionInput) {
      const inserted = await mutations.createThemeVersion({
        name: input.themeName,
        version: input.version,
        config: input.snapshot,
      });

      if (!inserted) {
        throw new Error("Failed to persist the theme version.");
      }

      return {
        id: inserted.id,
        name: inserted.name,
        version: inserted.version,
        config: inserted.config,
        createdAt: inserted.createdAt ?? new Date(),
      } satisfies ThemeVersionRecord;
    },

    async listThemeVersions() {
      const rows = await queries.listThemeVersions();

      return rows.map((row) => ({
        id: row.id,
        name: row.name,
        version: row.version,
        config: row.config,
        createdAt: row.createdAt ?? new Date(),
      })) satisfies ThemeVersionRecord[];
    },
  } satisfies ThemeVersionRepository;
}
