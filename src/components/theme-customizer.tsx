// pulled from/inspired by https://github.com/shadcn-ui/ui/blob/main/apps/www/components/theme-customizer.tsx
"use client";

import { useConfig } from "@/hooks/use-config";
import {
  allPresetsArray,
  basePresetsV4Array,
  colorfulPresetsArray,
} from "@/lib/colors";
import { getThemeSylesCodeWithVariablesV4, ThemeObject } from "@/lib/themes";
import { cn, copyToClipboard } from "@/lib/utils";
import { Check, Clipboard, Computer, Moon, Repeat, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

const RADIUS_VALUES = [0, 0.25, 0.5, 0.625, 0.75, 1];

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    bodyElement?.classList.add(`theme-${config.theme}`);
  }, [config.radius]);

  return (
    <div className="flex items-center gap-2">
      <Card className="relative min-h-[300px] w-full overflow-hidden rounded-lg">
        <CardHeader>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <div className="leading-none font-semibold tracking-tight">
                Theme Customizer
              </div>
              <div className="text-muted-foreground text-xs">
                Customize your components colors, then simply copy and paste the
                generated CSS code to your proyect.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setConfig({
                    ...config,
                    theme: "neutral",
                    radius: 0.625,
                  });
                }}
              >
                <span className="hidden @md:inline-flex">Reset</span> <Repeat />
                <span className="sr-only">Reset</span>
              </Button>
              <CopyCodeButtonDialog />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Customizer />
        </CardContent>
      </Card>
    </div>
  );
}

export function Customizer({ className }: React.ComponentProps<"div">) {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, theme: mode } = useTheme();
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) "Not mounted...";

  return (
    <div
      className={cn(
        "@container relative h-full w-full space-y-4 overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Presets */}
        <div className="space-y-1.5">
          <Label className="pb-2">Presets</Label>

          {/* Base shadcn/ui presets */}
          <div className="pb-2">
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Base shadcn/ui presets
            </Label>
            <div className="@max-md:grid-cols-fluid items-center gap-2 @md:flex @md:flex-wrap">
              {basePresetsV4Array.map((theme) => {
                const isActive = config.theme === theme.name;
                return (
                  <PresetButton
                    showLabel
                    isActive={isActive}
                    theme={theme}
                    key={theme.name}
                    className="@md:w-full @md:pr-1.5"
                  >
                    {theme.label}
                  </PresetButton>
                );
              })}
            </div>
          </div>

          {/* Custom presets */}
          <div>
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Colorful presets
            </Label>
            <div className="flex flex-wrap items-center gap-2">
              {colorfulPresetsArray.map((theme) => {
                const isActive = config.theme === theme.name;
                return (
                  <PresetButton
                    isActive={isActive}
                    theme={theme}
                    key={theme.name}
                    className="@md:w-full @md:pr-1.5"
                  >
                    {theme.label}
                  </PresetButton>
                );
              })}
            </div>
          </div>
        </div>

        <Separator />

        {/* Radius */}
        <div className="space-y-1.5">
          <Label className="pb-2">Radius</Label>
          <div className="@max-md:grid-cols-fluid items-center gap-2 @md:flex @md:flex-wrap">
            {RADIUS_VALUES.map((value) => {
              return (
                <Button
                  variant={"ghost"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: value,
                    });
                  }}
                  className={cn(
                    BUTTON_CLASSES,
                    "w-full @md:max-w-[80px]",
                    config.radius === value && "inset-ring-primary inset-ring",
                  )}
                  style={{
                    "--radius": `${value}rem`,
                  }}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Modes */}
        <div className="space-y-1.5">
          <Label className="pb-2">Mode</Label>
          <div className="@max-md:grid-cols-fluid items-center gap-2 @md:flex @md:flex-wrap">
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setMode("light")}
              className={cn(
                BUTTON_CLASSES,
                "w-full @md:max-w-[80px]",
                mode === "light" && "border-primary border-2",
              )}
            >
              <Sun />
              <span className={cn("hidden @md:inline-flex")}>Light</span>
            </Button>
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setMode("dark")}
              className={cn(
                BUTTON_CLASSES,
                "w-full @md:max-w-[80px]",
                mode === "dark" && "inset-ring-primary inset-ring",
              )}
            >
              <Moon />
              <span className={cn("hidden @md:inline-flex")}>Dark</span>
            </Button>
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setMode("system")}
              className={cn(
                BUTTON_CLASSES,
                "w-full @md:max-w-[80px]",
                mode === "system" && "inset-ring-primary inset-ring",
              )}
            >
              <Computer />
              <span className={cn("hidden @md:inline-flex")}>System</span>
            </Button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export function CopyCodeButtonDialog({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("flex cursor-pointer", className)} {...props}>
          <span>
            Copy <span className="hidden sm:inline">code</span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background min-h-[300px] space-y-2 overflow-hidden rounded-lg outline-none sm:max-w-xl lg:max-w-2xl">
        <DialogTitle className="sr-only">Copy generated theme</DialogTitle>
        <div className="space-y-1">
          <div className="leading-none font-semibold tracking-tight">
            Generated theme
          </div>
          <div className="text-muted-foreground text-xs">
            Copy and paste the following code into your CSS file to apply the
            theme to your project.
          </div>
        </div>

        <CustomizerCode />
      </DialogContent>
    </Dialog>
  );
}

function CustomizerCode({ className }: React.ComponentProps<"div">) {
  const [config] = useConfig();
  const activeTheme = useMemo(
    () => allPresetsArray.find((theme) => theme.name === config.theme),
    [config.theme],
  );
  const [copied, setCopied] = React.useState(false);

  const handleCopyThemeStylesCode = () => {
    const themeStyleCodeString = getThemeSylesCodeWithVariablesV4({
      themeObject: activeTheme!,
      radius: config.radius,
    });

    copyToClipboard(themeStyleCodeString);

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const themeCode = useMemo(
    () =>
      getThemeSylesCodeWithVariablesV4({
        themeObject: activeTheme!,
        radius: config.radius,
      }),
    [activeTheme, config.radius],
  );

  return (
    <div
      className={cn(
        "bg-card relative h-[500px] w-full overflow-hidden rounded-lg",
        className,
      )}
    >
      <ScrollArea className="h-full">
        <pre className="p-4">
          <code className="relative border border-none p-0 font-mono text-sm">
            {themeCode}
          </code>
        </pre>
      </ScrollArea>

      {/* Copy code button */}
      <div className="absolute top-3 right-3">
        <div className="relative overflow-hidden rounded-lg p-[2px]">
          <div className="absolute inset-0 size-full animate-spin bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 blur-xl" />
          <Button
            size="sm"
            variant={"ghost"}
            onClick={handleCopyThemeStylesCode}
            className="bg-muted/90 relative isolate flex cursor-pointer items-center justify-start overflow-hidden"
          >
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                copied ? "absolute scale-0" : "scale-100",
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                !copied ? "absolute scale-0" : "scale-100",
              )}
            />
            Copy code
          </Button>
        </div>
      </div>
    </div>
  );
}

const BUTTON_CLASSES = cn(
  "inset-ring-border h-fit cursor-pointer p-1 text-xs inset-ring rounded-lg",
  "@3xl:max-w-[85px] @3xl:text-sm",
);

function PresetButton({
  theme,
  isActive,
  className,
  children,
  showLabel = false,
  ...props
}: {
  theme: ThemeObject;
  isActive: boolean;
  showLabel?: boolean;
} & React.ComponentProps<typeof Button>) {
  const [config, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();

  return (
    <Button
      variant={"ghost"}
      key={theme.name}
      onClick={() => {
        setConfig({
          ...config,
          theme: theme.name,
        });
      }}
      className={cn(
        BUTTON_CLASSES,
        "flex max-w-[80px] items-center justify-start gap-1",
        isActive && "inset-ring-primary inset-ring",
        showLabel && "min-w-[75px]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "bg-primary from-primary to-background ring-border/70 flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-lg from-50% to-50% ring",
          "bg-linear-45",
          isActive && "bg-foreground",
        )}
        style={
          {
            "--primary": `${mode === "dark" ? theme.dark.primary : theme.light.primary}`,
            "--background": `${mode === "dark" ? theme.dark.background : theme.light.background}`,
            "--foreground": `${mode === "dark" ? theme.dark.foreground : theme.light.foreground}`,
          } as React.CSSProperties
        }
      >
        <Check
          className={cn(
            "text-foreground size-6 transition duration-200",
            isActive ? "scale-100" : "scale-0",
          )}
        />
      </span>
      <span
        className={cn("leading-tight", !showLabel && "hidden @md:inline-flex")}
      >
        {children}
      </span>
    </Button>
  );
}
