"use client";

import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useSettings } from "@/hooks/use-settings";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { ColorFormat, TailwindVersion } from "@/types/theme";
import { generateThemeCode } from "@/utils/theme-style-generator";
import { Check, Clipboard } from "lucide-react";
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
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

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
    updateSettings({ colorFormat: colorFormat });
  };

  const changeTailwindVersion = (tailwindVersion: TailwindVersion) => {
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

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:justify-between lg:items-center lg:gap-x-8">
      <div className="col-span-2 grid grid-cols-2 gap-x-8">
        <div className="flex flex-col items-start gap-2 md:flex-row">
          <Label className="text-muted-foreground text-xs max-lg:w-24">
            Color format
          </Label>
          <RadioGroup
            value={colorFormat}
            onValueChange={changeColorFormat}
            className="flex flex-row gap-2 md:ml-auto"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="oklch" id="color-oklch" />
              <Label htmlFor="color-oklch" className="text-xs font-normal">
                oklch
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="hsl" id="color-hsl" />
              <Label htmlFor="color-hsl" className="text-xs font-normal">
                hsl
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="rgb" id="color-rgb" />
              <Label htmlFor="color-rgb" className="text-xs font-normal">
                rgb
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="hex" id="color-hex" />
              <Label htmlFor="color-hex" className="text-xs font-normal">
                hex
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col items-start gap-2 md:flex-row">
          <Label className="text-muted-foreground text-xs max-lg:w-24">
            Tailwind version
          </Label>
          <RadioGroup
            value={tailwindVersion}
            onValueChange={changeTailwindVersion}
            className="flex flex-row gap-2 md:ml-auto"
          >
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="4" id="tw-v4" />

              <Label htmlFor="tw-v4" className="text-xs font-normal">
                v4
              </Label>
            </div>
            <div className="flex items-center space-x-1">
              <RadioGroupItem value="3" id="tw-v3" />
              <Label htmlFor="tw-v3" className="text-xs font-normal">
                v3
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-x-8">
        <div className="flex shrink-0 grow flex-row items-start justify-between gap-2">
          <Label className="text-muted-foreground text-xs text-nowrap">
            Show font variables
          </Label>
          <Switch
            checked={fontVars}
            onCheckedChange={(isActive) =>
              updateSettings({ fontVars: isActive })
            }
          />
        </div>

        <div className="flex shrink-0 grow flex-row items-start justify-between gap-2">
          <Label className="text-muted-foreground text-xs text-nowrap">
            Show shadow variables
          </Label>
          <Switch
            checked={shadows}
            onCheckedChange={(isActive) =>
              updateSettings({ shadows: isActive })
            }
          />
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
          <code className="relative border border-none p-0 font-mono text-xs">
            {themeCode}
          </code>
          <ScrollBar orientation="horizontal" />
        </pre>
      </ScrollArea>

      {/* Copy code button */}
      <div className="absolute top-3 right-3 isolate">
        <div className="relative overflow-hidden rounded-lg p-[2px]">
          <div className="bg-rotating-gradient opacity-40" />
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
