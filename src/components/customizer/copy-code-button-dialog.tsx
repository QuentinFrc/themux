"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSettings } from "@/hooks/use-settings";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { ColorFormat, TailwindVersion } from "@/types/theme";
import { generateThemeCode } from "@/utils/theme-style-generator";
import { Check, Clipboard, Code } from "lucide-react";
import React, { useMemo } from "react";
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
import { Label } from "../ui/label";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

export function CopyCodeButtonDialog({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { colorFormat, tailwindVersion } = useSettings();

  return (
    <>
      {/* A Drawer trigger for smaller screens */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn("flex cursor-pointer sm:hidden", className)}
            {...props}
          >
            <Code className="text-primary" />
            Copy
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="leading-none font-semibold tracking-tight">
              Generated theme
            </DrawerTitle>

            <DrawerDescription className="text-muted-foreground text-xs">
              Copy and paste the following code into your CSS file.
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4">
            <GeneratedCodeOptions />
          </div>

          <CustomizerCode
            colorFormat={colorFormat}
            tailwindVersion={tailwindVersion}
          />
        </DrawerContent>
      </Drawer>

      {/* A Dialog trigger for larger screens */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("hidden cursor-pointer sm:flex", className)}
            {...props}
          >
            <Code className="text-primary" />
            Copy code
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-background min-h-[400px] space-y-2 overflow-hidden rounded-lg outline-none sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="leading-none font-semibold tracking-tight">
              Generated theme
            </DialogTitle>

            <DialogDescription className="text-muted-foreground text-xs">
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>

          <GeneratedCodeOptions />

          <CustomizerCode
            colorFormat={colorFormat}
            tailwindVersion={tailwindVersion}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function GeneratedCodeOptions() {
  const { colorFormat, tailwindVersion, updateSettings, fontVars, shadows } =
    useSettings();

  const changeColorFormat = (colorFormat: ColorFormat) => {
    if (!colorFormat) return;
    updateSettings({ colorFormat: colorFormat });
  };

  const changeTailwindVersion = (tailwindVersion: TailwindVersion) => {
    if (!tailwindVersion) return;

    tailwindVersion === "4"
      ? updateSettings({
          tailwindVersion: tailwindVersion,
          colorFormat: "oklch",
        })
      : updateSettings({
          tailwindVersion: tailwindVersion,
          colorFormat: "hsl",
        });
  };

  const togleFontVars = (isActive: boolean) => {
    if (!isActive) return;

    updateSettings({ fontVars: isActive });
  };

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-start gap-1">
          <Label className="text-muted-foreground text-xs">Color format</Label>
          <ToggleGroup
            className="border shadow-sm"
            type="single"
            value={colorFormat}
            onValueChange={changeColorFormat}
          >
            <ToggleGroupItem
              value="oklch"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              oklch
            </ToggleGroupItem>

            <ToggleGroupItem
              value="hsl"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              hsl
            </ToggleGroupItem>

            <ToggleGroupItem
              value="rgb"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              rgb
            </ToggleGroupItem>

            <ToggleGroupItem
              value="hex"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              hex
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label className="text-muted-foreground text-xs">Tailwind</Label>
          <ToggleGroup
            className="border shadow-sm"
            type="single"
            value={tailwindVersion}
            onValueChange={changeTailwindVersion}
          >
            <ToggleGroupItem
              value="4"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              v4
            </ToggleGroupItem>

            <ToggleGroupItem
              value="3"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              v3
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-start gap-1">
          <Label className="text-muted-foreground text-xs">Font vars</Label>
          <ToggleGroup
            className="border shadow-sm"
            type="single"
            value={fontVars ? "on" : "off"}
            onValueChange={(v) => updateSettings({ fontVars: v === "on" })}
          >
            <ToggleGroupItem
              value="on"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              on
            </ToggleGroupItem>

            <ToggleGroupItem
              value="off"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              off
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="flex flex-col items-start gap-1">
          <Label className="text-muted-foreground text-xs">Shadow vars</Label>
          <ToggleGroup
            className="border shadow-sm"
            type="single"
            value={shadows ? "on" : "off"}
            onValueChange={(v) => updateSettings({ shadows: v === "on" })}
          >
            <ToggleGroupItem
              value="on"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              on
            </ToggleGroupItem>

            <ToggleGroupItem
              value="off"
              className="h-fit px-3 py-1.5 text-xs md:text-sm"
            >
              off
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
}

function CustomizerCode({
  className,
  colorFormat,
  tailwindVersion,
}: React.ComponentProps<"div"> & {
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
}) {
  const { config } = useThemeConfig();
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const { fontVars, shadows } = useSettings();

  const themeCode = useMemo(
    () =>
      generateThemeCode({
        themeConfig: config,
        colorFormat,
        tailwindVersion,
        tailwindInlineOptions: {
          fontVars: fontVars,
          shadowVars: shadows,
        },
      }),
    [config, colorFormat, tailwindVersion, fontVars, shadows],
  );

  const handleCopyThemeStylesCode = () => {
    copyToClipboard(themeCode);
  };

  return (
    <div
      className={cn(
        "bg-card relative h-[500px] w-full overflow-hidden rounded-lg border",
        className,
      )}
    >
      <ScrollArea className="h-full">
        <pre className="p-4">
          <code className="relative border border-none p-0 font-mono text-xs md:text-sm">
            {themeCode}
          </code>
          <ScrollBar orientation="horizontal" />
        </pre>
      </ScrollArea>

      {/* Copy code button */}
      <div className="absolute top-3 right-3 isolate">
        <div className="relative overflow-hidden rounded-lg p-[2px]">
          <div className="from-primary to-secondary via-muted absolute inset-0 size-full bg-linear-45 opacity-40" />
          <Button
            size="sm"
            variant={"ghost"}
            onClick={handleCopyThemeStylesCode}
            className="bg-muted/80 relative isolate flex cursor-pointer items-center justify-start overflow-hidden"
          >
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "absolute scale-0" : "scale-100",
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                !isCopied ? "absolute scale-0" : "scale-100",
              )}
            />
            Copy code
          </Button>
        </div>
      </div>
    </div>
  );
}
