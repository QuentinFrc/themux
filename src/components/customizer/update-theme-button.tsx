"use client";

import { useMemo, useState, useTransition } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { updateTheme } from "@/actions/theme";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { useCommitAuthor } from "@/hooks/use-commit-author";
import { cn } from "@/lib/utils";
import {
  useColorFormat,
  useFontVars,
  usePreferencesActions,
  useShadowVars,
  useTailwindVersion,
} from "@/store/preferences-store";
import { Button } from "../ui/button";
import { ThemeCommitDialog } from "./theme-commit-dialog";

export type UpdateThemeButtonProps = React.ComponentProps<typeof Button>;

export function UpdateThemeButton({ className, ...props }: UpdateThemeButtonProps) {
  const { config } = useThemeConfig();
  const colorFormat = useColorFormat();
  const tailwindVersion = useTailwindVersion();
  const showFontVars = useFontVars();
  const showShadowVars = useShadowVars();
  const { setTailwindVersion, setColorFormat, setShowFontVars, setShowShadowsVars } =
    usePreferencesActions();
  const { author, setAuthor } = useCommitAuthor();

  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const payload = useMemo(
    () => ({
      themeConfig: config,
      colorFormat,
      tailwindVersion,
      includeFontVars: showFontVars,
      includeShadowVars: showShadowVars,
    }),
    [colorFormat, config, showFontVars, showShadowVars, tailwindVersion],
  );

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setFormError(null);
    }
  };

  const handleUpdateTheme = () => {
    const trimmedMessage = commitMessage.trim();
    const trimmedName = author.name.trim();
    const trimmedEmail = author.email.trim();

    if (!trimmedMessage) {
      setFormError("Commit message is required.");
      return;
    }

    if (!trimmedName) {
      setFormError("Author name is required.");
      return;
    }

    setFormError(null);

    startTransition(async () => {
      const result = await updateTheme({
        ...payload,
        commit: {
          message: trimmedMessage,
          author: {
            name: trimmedName,
            email: trimmedEmail ? trimmedEmail : undefined,
          },
        },
      });

      if (result.success) {
        const { data } = result;
        setTailwindVersion(payload.tailwindVersion);
        setColorFormat(payload.colorFormat);
        setShowFontVars(payload.includeFontVars ?? false);
        setShowShadowsVars(payload.includeShadowVars ?? false);
        setAuthor({ name: trimmedName, email: trimmedEmail });
        setCommitMessage("");
        setIsDialogOpen(false);

        toast.success(
          `Saved ${data.name} (${data.commit.hash.slice(0, 7)})`,
        );
        return;
      }

      toast.error(result.error);
    });
  };

  return (
    <>
      <Button
        {...props}
        className={cn("gap-2 font-semibold", className)}
        disabled={isPending || props.disabled}
        onClick={() => handleDialogChange(true)}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        Update theme
      </Button>

      <ThemeCommitDialog
        open={isDialogOpen}
        onOpenChange={handleDialogChange}
        message={commitMessage}
        onMessageChange={setCommitMessage}
        author={author}
        onAuthorChange={setAuthor}
        onSubmit={handleUpdateTheme}
        isSubmitting={isPending}
        submitLabel="Save commit"
        error={formError}
      />
    </>
  );
}
