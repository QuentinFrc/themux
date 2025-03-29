// pulled from/inspired by https://github.com/shadcn-ui/ui/blob/main/apps/www/components/theme-customizer.tsx
"use client";

import { initialThemeConfig, useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";
import { basePresetsV4Array, colorfulPresetsArray } from "@/lib/colors";
import { getCopyableThemeCSSVariablesV4 } from "@/lib/themes";
import { cn, copyToClipboard } from "@/lib/utils";
import { RemValue, ThemeObject } from "@/types/theme";
import {
  Check,
  Clipboard,
  Laptop,
  Moon,
  Repeat,
  SquareRoundCorner,
  Sun,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, { useMemo } from "react";
import { ColorTokens } from "./color-tokens";
import { Shadcn } from "./icons/shadcn";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";

const RADIUS_VALUES: RemValue[] = [
  "0rem",
  "0.25rem",
  "0.5rem",
  "0.625rem",
  "0.75rem",
  "1rem",
];

export function ThemeCustomizer() {
  const isMounted = useMounted();
  const [config, setConfig] = useConfig();

  const resetThemeConfig = () => {
    setConfig(initialThemeConfig);
  };

  if (!isMounted) {
    return null;
  }

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
                Customize your colors, then copy and paste the generated CSS
                code to your project.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={resetThemeConfig}>
                <span className="hidden @md:inline-flex">Reset</span> <Repeat />
                <span className="sr-only">Reset</span>
              </Button>
              <CopyCodeButtonDialog />
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 @2xl:grid-cols-2 @5xl:grid-cols-[6fr_4fr]">
          <Customizer />

          <ColorTokens />
        </CardContent>
      </Card>
    </div>
  );
}

export function Customizer({ className }: React.ComponentProps<"div">) {
  const { setTheme: setMode, theme: mode } = useTheme();
  const [config, setConfig] = useConfig();

  return (
    <div
      className={cn(
        "@container relative h-full w-full space-y-4 overflow-hidden",
        className,
      )}
    >
      <div className="flex flex-col gap-8">
        {/* Presets */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <Shadcn className="size-4" /> Presets
          </Label>

          {/* Default shadcn/ui presets */}
          <div className="pb-2">
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Default shadcn/ui
            </Label>
            <div className="flex flex-wrap gap-2 @max-md:grid @max-md:grid-cols-3">
              {basePresetsV4Array.map((themeObject) => {
                const isActive = config.themeObject.name === themeObject.name;

                return (
                  <PresetButton
                    showLabel
                    isActive={isActive}
                    themeObject={themeObject}
                    key={themeObject.name}
                    className="w-full max-w-[75px] pr-1.5 @max-md:max-w-full"
                  >
                    {themeObject.label}
                  </PresetButton>
                );
              })}
            </div>
          </div>

          {/* Custom presets */}
          <div>
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Custom
            </Label>
            <div className="grid grid-cols-3 gap-2 @sm:grid-cols-4 @md:flex @md:flex-wrap">
              {colorfulPresetsArray.map((themeObject) => {
                const isActive = config.themeObject.name === themeObject.name;

                return (
                  <PresetButton
                    showLabel
                    isActive={isActive}
                    themeObject={themeObject}
                    key={themeObject.name}
                    className="w-full max-w-full @md:max-w-[75px] @md:pr-1.5"
                  >
                    {themeObject.label}
                  </PresetButton>
                );
              })}
            </div>
          </div>
        </div>

        {/* Radius */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <SquareRoundCorner className="size-4" /> Radius
          </Label>
          <div className="text-muted-foreground flex flex-wrap gap-2 @max-md:grid @max-md:grid-cols-3">
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
                    (className =
                      "w-full max-w-[75px] pr-1.5 @max-md:max-w-full"),
                    config.radius === value &&
                      "inset-ring-primary text-foreground inset-ring",
                  )}
                  style={{
                    "--radius": `${value}`,
                  }}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Modes */}
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <SunMoon className="size-4" /> Mode
          </Label>
          <div className="text-muted-foreground flex flex-wrap gap-2 @max-md:grid @max-md:grid-cols-3">
            <Button
              variant={"ghost"}
              size="sm"
              onClick={() => setMode("light")}
              className={cn(
                BUTTON_CLASSES,
                (className = "w-full max-w-[75px] pr-1.5 @max-md:max-w-full"),
                mode === "light" && "border-primary text-foreground border-2",
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
                (className = "w-full max-w-[75px] pr-1.5 @max-md:max-w-full"),
                mode === "dark" &&
                  "inset-ring-primary text-foreground inset-ring",
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
                (className = "w-full max-w-[75px] pr-1.5 @max-md:max-w-full"),
                mode === "system" &&
                  "inset-ring-primary text-foreground inset-ring",
              )}
            >
              <Laptop />
              <span className={cn("hidden @md:inline-flex")}>Auto</span>
            </Button>
          </div>
        </div>
      </div>
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
  const [copied, setCopied] = React.useState(false);

  const handleCopyThemeStylesCode = () => {
    const themeStyleCodeString = getCopyableThemeCSSVariablesV4({
      themeObject: config.themeObject,
      radius: config.radius,
    });

    copyToClipboard(themeStyleCodeString);

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const themeCode = useMemo(
    () =>
      getCopyableThemeCSSVariablesV4({
        themeObject: config.themeObject,
        radius: config.radius,
      }),
    [config],
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
  themeObject,
  isActive,
  className,
  children,
  showLabel = false,
  ...props
}: {
  themeObject: ThemeObject;
  isActive: boolean;
  showLabel?: boolean;
} & React.ComponentProps<typeof Button>) {
  const [_, setConfig] = useConfig();
  const { resolvedTheme: mode } = useTheme();

  const setThemeConfig = () => {
    setConfig((prev) => ({
      ...prev,
      themeObject,
    }));
  };

  return (
    <Button
      variant={"ghost"}
      key={themeObject.name}
      onClick={setThemeConfig}
      className={cn(
        BUTTON_CLASSES,
        "text-muted-foreground flex max-w-[75px] items-center justify-start gap-1",
        isActive && "inset-ring-primary text-foreground inset-ring",
        showLabel && "min-w-[75px]",
        className,
      )}
      style={
        {
          "--primary": `${mode === "dark" ? themeObject.dark.primary : themeObject.light.primary}`,
          "--secondary": `${mode === "dark" ? themeObject.dark.secondary : themeObject.light.secondary}`,
          "--background": `${mode === "dark" ? themeObject.dark.background : themeObject.light.background}`,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        className={cn(
          "ring-border flex size-5 shrink-0 items-center justify-center overflow-hidden rounded-lg ring",
          "from-primary to-secondary -bg-linear-45 from-50% to-50%",
        )}
      />
      <span
        className={cn("leading-tight", !showLabel && "hidden @md:inline-flex")}
      >
        {children}
      </span>
    </Button>
  );
}
