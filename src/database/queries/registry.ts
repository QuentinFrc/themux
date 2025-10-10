import { DatabaseClient } from "@/database/drizzle/client";
import { registryTable, RegistryTable } from "@/database/drizzle/schema";
import { eq } from "drizzle-orm";

export const getRegistryQueries = (db: DatabaseClient) => ({
  async getRegistryItem(id: string): Promise<RegistryTable | undefined> {
    const [row] = await db
      .select()
      .from(registryTable)
      .where(eq(registryTable.id, id))
      .limit(1);

    return row;
  },
});
