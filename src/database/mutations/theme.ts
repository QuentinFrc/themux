import { DatabaseClient } from "@/database/drizzle/client";
import { InsertThemeTable, themeTable, ThemeTable } from "@/database/drizzle/schema";

export const getThemeMutations = (db: DatabaseClient) => ({
  async createThemeVersion(
    values: InsertThemeTable,
  ): Promise<ThemeTable | undefined> {
    const [createdTheme] = await db
      .insert(themeTable)
      .values(values)
      .returning();

    return createdTheme;
  },
});
