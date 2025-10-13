"use client";

import { Loader2, Save } from "lucide-react";
import { useMemo, useTransition } from "react";
import { toast } from "sonner";

import { updateTheme } from "@/actions/theme";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import {
  useColorFormat,
  useFontVars,
  usePreferencesActions,
  useShadowVars,
  useTailwindVersion,
} from "@/store/preferences-store";
import { Button } from "../ui/button";

export type UpdateThemeButtonProps = React.ComponentProps<typeof Button>;

export function UpdateThemeButton({
  className,
  ...props
}: UpdateThemeButtonProps) {
  const { config } = useThemeConfig();
  const colorFormat = useColorFormat();
  const tailwindVersion = useTailwindVersion();
  const showFontVars = useFontVars();
  const showShadowVars = useShadowVars();
  const {
    setTailwindVersion,
    setColorFormat,
    setShowFontVars,
    setShowShadowsVars,
  } = usePreferencesActions();

  const [isPending, startTransition] = useTransition();

  const payload = useMemo(
    () => ({
      themeConfig: config,
      colorFormat,
      tailwindVersion,
      includeFontVars: showFontVars,
      includeShadowVars: showShadowVars,
    }),
    [colorFormat, config, showFontVars, showShadowVars, tailwindVersion]
  );

  const handleUpdateTheme = () => {
    startTransition(async () => {
      const result = await updateTheme(payload);

      if (result.success) {
        const { data } = result;
        setTailwindVersion(payload.tailwindVersion);
        setColorFormat(payload.colorFormat);
        setShowFontVars(payload.includeFontVars ?? false);
        setShowShadowsVars(payload.includeShadowVars ?? false);

        toast.success(`Saved theme v${data.version}`);
        return;
      }

      toast.error(result.error);
    });
  };

  return (
    <Button
      {...props}
      className={cn("gap-2 font-semibold", className)}
      disabled={isPending || props.disabled}
      onClick={handleUpdateTheme}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Save className="size-4" />
      )}
      Update theme
    </Button>
  );
}
