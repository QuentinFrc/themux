import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { ThemeSnapshot } from "@/types/theme-update";

export const themeTable = pgTable("theme", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  version: integer("version").notNull(),
  config: jsonb("config").$type<ThemeSnapshot>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type ThemeTable = typeof themeTable.$inferSelect;
export type InsertThemeTable = typeof themeTable.$inferInsert;
