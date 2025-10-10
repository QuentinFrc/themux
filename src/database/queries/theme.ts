import { DatabaseClient } from "@/database/drizzle/client";
import { themeTable, ThemeTable } from "@/database/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const getThemeQueries = (db: DatabaseClient) => ({
  async getLatestThemeVersion(
    themeName: string,
  ): Promise<ThemeTable | undefined> {
    const [row] = await db
      .select()
      .from(themeTable)
      .where(eq(themeTable.name, themeName))
      .orderBy(desc(themeTable.version))
      .limit(1);

    return row;
  },

  async listThemeVersions(): Promise<ThemeTable[]> {
    let query = db.select().from(themeTable);

    const rows = await query.orderBy(
      desc(themeTable.version),
      desc(themeTable.createdAt),
    );

    return rows;
  },
});
