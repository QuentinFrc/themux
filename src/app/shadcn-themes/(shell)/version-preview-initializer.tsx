"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { usePreferencesActions } from "@/store/preferences-store";
import type { ThemeVersionRecord } from "@/types/theme-update";

const COMMIT_HASH_LENGTH = 7;

type VersionPreviewInitializerProps = {
  version: ThemeVersionRecord;
  shouldNotify?: boolean;
};

export function VersionPreviewInitializer({
  version,
  shouldNotify = true,
}: VersionPreviewInitializerProps) {
  const { setConfig } = useThemeConfig();
  const {
    setTailwindVersion,
    setColorFormat,
    setShowFontVars,
    setShowShadowsVars,
  } = usePreferencesActions();
  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (hasInitializedRef.current) {
      return;
    }
    hasInitializedRef.current = true;

    setConfig(version.config.theme);
    setTailwindVersion(version.config.tailwindVersion);
    setColorFormat(version.config.colorFormat);
    setShowFontVars(version.config.options.fontVars);
    setShowShadowsVars(version.config.options.shadowVars);

    if (shouldNotify) {
      const themeObject = version.config.theme.themeObject;
      const themeLabel = themeObject.label ?? themeObject.name ?? "Theme";

      toast.success(
        `Loaded ${themeLabel} v${version.commit.hash.slice(0, COMMIT_HASH_LENGTH)}`,
      );
    }
  }, [
    setConfig,
    setTailwindVersion,
    setColorFormat,
    setShowFontVars,
    setShowShadowsVars,
    version,
    shouldNotify,
  ]);

  return null;
}
