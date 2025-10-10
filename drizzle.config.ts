import { getNeonDatabaseUrl } from "./src/database/neon/config";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/database/drizzle/migrations",
  schema: "./src/database/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getNeonDatabaseUrl(),
  },
});
