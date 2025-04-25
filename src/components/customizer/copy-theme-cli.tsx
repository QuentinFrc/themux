"use client";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { usePreferencesActions } from "@/store/preferences-store";
import { Terminal } from "lucide-react";
import React, { useState, useTransition } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

import { generateThemeRegistryItemFromThemeObject } from "@/actions/registry";
import { usePackageManager } from "@/store/preferences-store";
import { toast } from "sonner";
import { CopyToClipboardButton } from "../copy-to-clipboard-button";
import { ExternalLink } from "../external-link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function CopyThemeCLI({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { currentPresetThemeObject } = useThemeConfig();
  const { hasCurrentPresetChanged } = useThemeConfig();

  const alertTitle = hasCurrentPresetChanged()
    ? "Use the shadcn CLI"
    : "Theme preset has not changed";
  const alertDescription = hasCurrentPresetChanged()
    ? `Make sure to generate the theme registry item, otherwise the command will apply the base styles for the current preset: ${currentPresetThemeObject?.label}.`
    : `This command will apply the base styles for the current preset: ${currentPresetThemeObject?.label}.`;

  return (
    <>
      {/* A Drawer trigger for smaller screens */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn("flex cursor-pointer md:hidden", className)}
            {...props}
          >
            <Terminal className="text-primary" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="leading-none font-semibold tracking-tight">
              Shadcn registry command
            </DrawerTitle>

            <DrawerDescription className="text-muted-foreground text-xs">
              Copy and paste the following command into your terminal. This will
              use the{" "}
              <ExternalLink
                href="https://ui.shadcn.com/docs/cli"
                className="text-primary"
                showIcon
              >
                shadcn CLI
              </ExternalLink>{" "}
              to add or update the styles in your project.{" "}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 px-4 pb-24">
            <Alert className="bg-muted">
              <Terminal className="h-4 w-4" />
              <AlertTitle>{alertTitle}</AlertTitle>
              <AlertDescription>{alertDescription}</AlertDescription>
            </Alert>

            <CopyThemeCLITabs />
          </div>
        </DrawerContent>
      </Drawer>

      {/* A Dialog trigger for larger screens */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("hidden cursor-pointer md:flex", className)}
            {...props}
          >
            <Terminal className="text-primary" />
            Command
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-background space-y-2 overflow-hidden rounded-lg outline-none sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="leading-none font-semibold tracking-tight">
              Shadcn registry command
            </DialogTitle>

            <DialogDescription className="text-muted-foreground text-xs">
              Copy and paste the following command into your terminal. This will
              use the{" "}
              <ExternalLink
                href="https://ui.shadcn.com/docs/cli"
                className="text-primary"
                showIcon
              >
                shadcn CLI
              </ExternalLink>{" "}
              to add or update the styles in your project.
            </DialogDescription>
          </DialogHeader>

          <Alert className="bg-muted">
            <Terminal className="h-4 w-4" />
            <AlertTitle>{alertTitle}</AlertTitle>
            <AlertDescription>{alertDescription}</AlertDescription>
          </Alert>

          <CopyThemeCLITabs />
        </DialogContent>
      </Dialog>
    </>
  );
}

function CopyThemeCLITabs() {
  const themeRegistryUrl = process.env.NEXT_PUBLIC_THEME_REGISTRY_URL;

  const packageManager = usePackageManager();
  const { setPackageManager } = usePreferencesActions();
  const { currentThemeObject, hasCurrentPresetChanged } = useThemeConfig();
  const [isLoading, startTransition] = useTransition();
  const [themeName, setThemeName] = useState(currentThemeObject.name);

  const generateCLICommandForCurrentThemeObject = () => {
    startTransition(async () => {
      const promise = new Promise(async (resolve, reject) => {
        const res =
          await generateThemeRegistryItemFromThemeObject(currentThemeObject);
        if (res.success) {
          resolve(res.data);
        } else {
          reject(res.error);
        }
      });

      toast.promise(promise, {
        loading: "Generating theme registry item...",
        success: (name) => {
          setThemeName(name as string);
          return `Theme registry item has been created!`;
        },
        error: (error) => {
          return error;
        },
      });
    });
  };

  const getThemeRegistryCommandBase = () => {
    const shadcnAddThemeRegistryCommand = `shadcn@latest add ${themeRegistryUrl}/`;
    let commandPrefix = `npx`;
    if (packageManager === "npm") commandPrefix = `npx`;
    else if (packageManager === "pnpm") commandPrefix = `pnpm dlx`;
    else if (packageManager === "bun") commandPrefix = `bunx`;
    else if (packageManager === "yarn") commandPrefix = `yarn dlx`;

    return `${commandPrefix} ${shadcnAddThemeRegistryCommand}`;
  };

  const shadcnCommandBase = getThemeRegistryCommandBase();

  return (
    <>
      {hasCurrentPresetChanged() && (
        <Button
          disabled={isLoading || !hasCurrentPresetChanged()}
          onClick={generateCLICommandForCurrentThemeObject}
          className="font-semibold uppercase"
        >
          Generate theme registry item
        </Button>
      )}

      <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg border shadow">
        <div className="flex items-center justify-between gap-4">
          <ToggleGroup
            className="m-0 overflow-visible rounded-none border-none p-0"
            type="single"
            value={packageManager}
            onValueChange={setPackageManager}
          >
            <ToggleGroupItem
              value="npm"
              className="text-muted-foreground h-8 p-0 px-2 font-mono text-xs shadow-none first:rounded-none md:text-sm"
            >
              npm
            </ToggleGroupItem>

            <ToggleGroupItem
              value="pnpm"
              className="text-muted-foreground h-8 p-0 px-2 font-mono text-xs shadow-none md:text-sm"
            >
              pnpm
            </ToggleGroupItem>

            <ToggleGroupItem
              value="bun"
              className="text-muted-foreground h-8 p-0 px-2 font-mono text-xs shadow-none md:text-sm"
            >
              bun
            </ToggleGroupItem>

            <ToggleGroupItem
              value="yarn"
              className="text-muted-foreground h-8 p-0 px-2 font-mono text-xs shadow-none last:rounded-none md:text-sm"
            >
              yarn
            </ToggleGroupItem>
          </ToggleGroup>
          <CopyToClipboardButton
            text={`${shadcnCommandBase}${themeName}.json`}
            className="mr-1 size-6"
            disabled={isLoading}
          />
        </div>

        <div className="bg-muted w-full px-2 py-1">
          <code className={cn("truncate font-mono text-xs md:text-sm")}>
            <span>{shadcnCommandBase}</span>
            <span
              className={cn(
                "text-primary transition-all",
                isLoading && "text-foreground animate-pulse",
              )}
            >{`${themeName}.json`}</span>
          </code>
        </div>
      </div>
    </>
  );
}
