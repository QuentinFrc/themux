import { ThemeSnapshot } from "@/types/theme-update";
import { jsonb, pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const registryTable = pgTable("registry", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  registryItem: jsonb("registry_item").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const themeTable = pgTable("theme", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  version: integer("version").notNull(),
  config: jsonb("config").$type<ThemeSnapshot>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type RegistryTable = typeof registryTable.$inferSelect;
export type InsertRegistryTable = typeof registryTable.$inferInsert;

export type ThemeTable = typeof themeTable.$inferSelect;
export type InsertThemeTable = typeof themeTable.$inferInsert;
