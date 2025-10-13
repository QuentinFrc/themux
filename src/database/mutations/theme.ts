import type { DatabaseClient } from "@/database/drizzle/client";
import {
  type InsertThemeTable,
  type ThemeTable,
  themeTable,
} from "@/database/drizzle/schema";

export const getThemeMutations = (db: DatabaseClient) => ({
  async createThemeVersion(
    values: InsertThemeTable
  ): Promise<ThemeTable | undefined> {
    const [createdTheme] = await db
      .insert(themeTable)
      .values(values)
      .returning();

    return createdTheme;
  },
});
