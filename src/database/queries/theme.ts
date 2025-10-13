import { desc, eq } from "drizzle-orm";
import type { DatabaseClient } from "@/database/drizzle/client";
import { type ThemeTable, themeTable } from "@/database/drizzle/schema";

export const getThemeQueries = (db: DatabaseClient) => ({
  async getLatestThemeVersion(): Promise<ThemeTable | undefined> {
    const [row] = await db
      .select()
      .from(themeTable)
      .orderBy(desc(themeTable.version))
      .limit(1);

    return row;
  },

  async getThemeVersionById(id: string): Promise<ThemeTable | undefined> {
    const [row] = await db
      .select()
      .from(themeTable)
      .where(eq(themeTable.id, id))
      .limit(1);

    return row;
  },

  async listThemeVersions(): Promise<ThemeTable[]> {
    const query = db.select().from(themeTable);

    const rows = await query.orderBy(
      desc(themeTable.version),
      desc(themeTable.createdAt)
    );

    return rows;
  },
});
