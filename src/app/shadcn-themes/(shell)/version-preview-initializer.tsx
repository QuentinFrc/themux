"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { usePreferencesActions } from "@/store/preferences-store";
import { ThemeVersionRecord } from "@/types/theme-update";

type VersionPreviewInitializerProps = {
  version: ThemeVersionRecord;
};

export function VersionPreviewInitializer({
  version,
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
    if (hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    setConfig(version.config.theme);
    setTailwindVersion(version.config.tailwindVersion);
    setColorFormat(version.config.colorFormat);
    setShowFontVars(version.config.options.fontVars);
    setShowShadowsVars(version.config.options.shadowVars);

    const themeObject = version.config.theme.themeObject;
    const themeLabel = themeObject.label ?? themeObject.name ?? "Theme";

    toast.success(`Loaded ${themeLabel} v${version.commit.hash.slice(0, 7)}`);
  }, [
    setConfig,
    setTailwindVersion,
    setColorFormat,
    setShowFontVars,
    setShowShadowsVars,
    version,
  ]);

  return null;
}
