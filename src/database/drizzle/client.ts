import { getNeonDatabaseUrl } from "@/database/neon/config";
import * as schema from "@/database/drizzle/schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export function createDatabaseClient() {
  const sql = neon(getNeonDatabaseUrl());
  return drizzle(sql, { schema });
}

export type DatabaseClient = ReturnType<typeof createDatabaseClient>;

export const db = createDatabaseClient();
