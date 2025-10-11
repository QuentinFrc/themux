import { DatabaseClient } from "@/database/drizzle/client";
import { authorTable, commitTable, themeTable } from "@/database/drizzle/schema";
import { desc, eq } from "drizzle-orm";

export const getThemeQueries = (db: DatabaseClient) => ({
  async getLatestThemeVersion(themeName: string) {
    return db.query.themeTable.findFirst({
      where: eq(themeTable.name, themeName),
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
