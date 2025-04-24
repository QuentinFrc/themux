"use client";

import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { usePreferencesActions } from "@/store/preferences-store";
import { Terminal } from "lucide-react";
import React from "react";
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

import { usePackageManager } from "@/store/preferences-store";
import { CopyToClipboardButton } from "../copy-to-clipboard-button";
import { ExternalLink } from "../external-link";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

export function CopyThemeCLI({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { currentPresetThemeObject } = useThemeConfig();

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
              <AlertTitle>You need to know...</AlertTitle>
              <AlertDescription>
                {`This command will apply the base styles for the current preset: ${currentPresetThemeObject?.label}. If you customized it or created one from scratch, you can get the generated CSS vars from the "Copy Code" button.`}
              </AlertDescription>
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
            <AlertTitle>You need to know...</AlertTitle>
            <AlertDescription>
              {`This command will apply the base styles for the current preset: ${currentPresetThemeObject?.label}. If you customized it or created one from scratch, you can get the generated CSS vars from the "Copy Code" button.`}
            </AlertDescription>
          </Alert>

          <CopyThemeCLITabs />
        </DialogContent>
      </Dialog>
    </>
  );
}

function CopyThemeCLITabs() {
  const { currentPresetName } = useThemeConfig();
  const packageManager = usePackageManager();
  const { setPackageManager } = usePreferencesActions();
  const themeRegistryUrl = process.env.NEXT_PUBLIC_THEME_REGISTRY_URL;

  const getThemeRegistryUrl = (name: string) => {
    const shadcnAddThemeRegistryCommand = `shadcn@latest add ${themeRegistryUrl}/${name}.json`;
    let commandPrefix = `npx`;
    if (packageManager === "npm") commandPrefix = `npx`;
    else if (packageManager === "pnpm") commandPrefix = `pnpm dlx`;
    else if (packageManager === "bun") commandPrefix = `bunx`;
    else if (packageManager === "yarn") commandPrefix = `yarn dlx`;

    return `${commandPrefix} ${shadcnAddThemeRegistryCommand}`;
  };

  const shadcnCommand = getThemeRegistryUrl(currentPresetName);

  return (
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
        <CopyToClipboardButton text={shadcnCommand} className="mr-1 size-6" />
      </div>

      <div className="bg-muted w-full px-2 py-1">
        <code className="truncate font-mono text-xs md:text-sm">
          {shadcnCommand}
        </code>
      </div>
    </div>
  );
}
