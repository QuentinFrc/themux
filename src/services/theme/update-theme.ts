import type {
  ThemeUpdateHandler,
  ThemeUpdatePayload,
  ThemeVersionRepository,
} from "@/types/theme-update";
import { createThemeSnapshot } from "@/utils/theme-snapshot";

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
      const themeName = payload.themeConfig.themeObject.name;
      const snapshot = createThemeSnapshot(payload);
      const latestVersion = await repository.getLatestThemeVersion(themeName);
      const nextVersion = (latestVersion?.version ?? 0) + 1;

      const record = await repository.createThemeVersion({
        themeName,
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
