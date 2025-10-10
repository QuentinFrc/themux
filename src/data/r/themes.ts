import { db } from "@/database/drizzle/client";
import { getRegistryMutations } from "@/database/mutations/registry";
import { getRegistryQueries } from "@/database/queries/registry";
import {
  InsertRegistryTable,
  RegistryTable,
} from "@/database/drizzle/schema";
import { RegistryItem } from "shadcn/registry";

const registryQueries = getRegistryQueries(db);
const registryMutations = getRegistryMutations(db);

export async function getRegistryItem(id: string): Promise<RegistryTable> {
  const row = await registryQueries.getRegistryItem(id);

  if (!row) {
    throw new Error("Registry item not found");
  }

  return row;
}

export async function createRegistryItem(
  registryItem: RegistryItem,
): Promise<string> {
  const newItem: InsertRegistryTable = {
    id: registryItem.name,
    name: registryItem.name,
    type: registryItem.type,
    registryItem: JSON.stringify(registryItem),
  };

  const createdRegistryItem = await registryMutations.createRegistryItem(newItem);

  if (!createdRegistryItem) {
    throw new Error("Failed to create registry item");
  }

  return createdRegistryItem.name;
}
