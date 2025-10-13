import { eq } from "drizzle-orm";
import type { DatabaseClient } from "@/database/drizzle/client";
import { themeTable, authorTable, ThemeTable, commitTable } from "@/database/drizzle/schema";

export const getThemeQueries = (db: DatabaseClient) => ({
  async getLatestThemeVersion() {
    return db.query.themeTable.findFirst({
      orderBy: (theme, { desc: orderDesc }) => [orderDesc(theme.createdAt)],
      with: {
        commit: {
          with: {
            author: true,
          },
        },
      },
    });
  },

  async getThemeVersionById(id: string): Promise<ThemeTable | undefined> {
    const row = await db.query.themeTable.findFirst({
      with: {
        commit: {
          with: {
            author: true,
          },
        },
      },
      where: eq(themeTable.id, id),
    });

    return row;
  },

  async listThemeVersions() {
    return db.query.themeTable.findMany({
      orderBy: (theme, { desc: orderDesc }) => [orderDesc(theme.createdAt)],
      with: {
        commit: {
          with: {
            author: true,
          },
        },
      },
    });
  },

  async listCommits() {
    return db.query.commitTable.findMany({
      orderBy: (commit, { desc: orderDesc }) => [orderDesc(commit.createdAt)],
      with: {
        author: true,
        theme: true,
      },
    });
  },

  async findAuthorByEmail(email: string) {
    return db.query.authorTable.findFirst({
      where: eq(authorTable.email, email),
    });
  },
});
