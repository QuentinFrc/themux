import { createThemeSnapshot } from "@/utils/theme-snapshot";
import {
  ThemeUpdateHandler,
  ThemeUpdatePayload,
  ThemeVersionRepository,
} from "@/types/theme-update";

export type ThemeUpdateHandlerDependencies = {
  repository: ThemeVersionRepository;
  payload: ThemeUpdatePayload;
};

export function createThemeUpdateHandler({
  repository,
  payload,
}: ThemeUpdateHandlerDependencies): ThemeUpdateHandler {
  return async () => {
    try {
      const snapshot = createThemeSnapshot(payload);
      const latestVersion = await repository.getLatestThemeVersion();
      const nextVersion = (latestVersion?.version ?? 0) + 1;

      const record = await repository.createThemeVersion({
        version: nextVersion,
        snapshot,
      });

      return {
        success: true,
        data: record,
      };
    } catch (cause) {
      return {
        success: false,
        error: "Failed to persist the theme configuration.",
        cause,
      };
    }
  };
}
