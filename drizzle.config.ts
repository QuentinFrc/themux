import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

import { defineConfig } from "drizzle-kit";
import { getNeonDatabaseUrl } from "./src/database/neon/config";

export default defineConfig({
  out: "./src/database/drizzle/migrations",
  schema: "./src/database/drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: getNeonDatabaseUrl(),
  },
});
