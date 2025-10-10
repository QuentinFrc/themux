import "dotenv/config";

export function getNeonDatabaseUrl(): string {
  const databaseUrl = process.env.NEON_DATABASE_URL ?? process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "NEON_DATABASE_URL is not defined in the environment variables.",
    );
  }

  return databaseUrl;
}
