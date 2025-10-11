import {
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { ThemeSnapshot } from "@/types/theme-update";
import { relations } from "drizzle-orm";

export const authorTable = pgTable("author", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const commitTable = pgTable("commit", {
  hash: text("hash").primaryKey(),
  message: text("message").notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => authorTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const themeTable = pgTable("theme", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  commitHash: text("commit_hash")
    .notNull()
    .references(() => commitTable.hash, { onDelete: "cascade" }),
  config: jsonb("config").$type<ThemeSnapshot>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const authorRelations = relations(authorTable, ({ many }) => ({
  commits: many(commitTable),
}));

export const commitRelations = relations(commitTable, ({ one }) => ({
  author: one(authorTable, {
    fields: [commitTable.authorId],
    references: [authorTable.id],
  }),
  theme: one(themeTable, {
    fields: [commitTable.hash],
    references: [themeTable.commitHash],
  }),
}));

export const themeRelations = relations(themeTable, ({ one }) => ({
  commit: one(commitTable, {
    fields: [themeTable.commitHash],
    references: [commitTable.hash],
  }),
}));

export type ThemeTable = typeof themeTable.$inferSelect;
export type InsertThemeTable = typeof themeTable.$inferInsert;
export type CommitTable = typeof commitTable.$inferSelect;
export type InsertCommitTable = typeof commitTable.$inferInsert;
export type AuthorTable = typeof authorTable.$inferSelect;
export type InsertAuthorTable = typeof authorTable.$inferInsert;
