import { DatabaseClient } from "@/database/drizzle/client";
import {
  authorTable,
  commitTable,
  InsertAuthorTable,
  InsertCommitTable,
  InsertThemeTable,
  themeTable,
  ThemeTable,
} from "@/database/drizzle/schema";

export const getThemeMutations = (db: DatabaseClient) => ({
  async createAuthor(values: InsertAuthorTable) {
    const [author] = await db.insert(authorTable).values(values).returning();

    return author;
  },

  async createCommit(values: InsertCommitTable) {
    const [commit] = await db.insert(commitTable).values(values).returning();

    return commit;
  },

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
