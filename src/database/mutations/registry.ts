import { DatabaseClient } from "@/database/drizzle/client";
import {
  InsertRegistryTable,
  registryTable,
  RegistryTable,
} from "@/database/drizzle/schema";

export const getRegistryMutations = (db: DatabaseClient) => ({
  async createRegistryItem(
    values: InsertRegistryTable,
  ): Promise<RegistryTable | undefined> {
    const [createdRegistryItem] = await db
      .insert(registryTable)
      .values(values)
      .returning();

    return createdRegistryItem;
  },
});
