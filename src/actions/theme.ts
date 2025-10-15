"use server";

import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";
import { createThemeUpdateHandler } from "@/services/theme/update-theme";
import type { ThemeUpdatePayload, ThemeVersionRecord } from "@/types/theme-update";

export async function updateTheme(payload: ThemeUpdatePayload) {
  const repository = createThemeVersionRepository(db);
  const handler = createThemeUpdateHandler({ repository, payload });
  return handler();
}

export async function listThemeVersions(): Promise<ThemeVersionRecord[]> {
  const repository = createThemeVersionRepository(db);
  const versions = await repository.listThemeVersions();
  return versions;
}
