// pulled from/inspired by https://github.com/shadcn-ui/ui/blob/main/apps/www/components/theme-customizer.tsx
"use client";

import { useConfig } from "@/hooks/use-config";
import {
  allPresetsArray,
  basePresetsV4Array,
  colorfulPresetsArray,
} from "@/lib/colors";
import { ThemeObject } from "@/lib/themes";
import { cn, copyToClipboard } from "@/lib/utils";
import { Check, Clipboard, Moon, Repeat, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const RADIUS_VALUES = [0, 0.25, 0.5, 0.625, 0.75, 1];

export function ThemeCustomizer() {
  const [config, setConfig] = useConfig();

  useEffect(() => {
    const bodyElement = document.querySelector("body");
    bodyElement?.classList.add(`theme-${config.theme}`);
  }, [config.radius]);

  return (
    <div className="flex items-center gap-2">
      <Tabs defaultValue="customizer" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="customizer">Customizer</TabsTrigger>
          <TabsTrigger value="code">CSS code</TabsTrigger>
        </TabsList>

        <TabsContent value="customizer">
          <Card className="bg-background relative min-h-[300px] w-full overflow-hidden rounded-lg">
            <CardHeader>
              <div className="flex gap-4">
                <div className="space-y-1">
                  <div className="leading-none font-semibold tracking-tight">
                    Theme Customizer
                  </div>
                  <div className="text-muted-foreground text-xs">
                    Customize your components colors.
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="ml-auto text-xs"
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: "neutral",
                      radius: 1,
                    });
                  }}
                >
                  Reset <Repeat />
                  <span className="sr-only">Reset</span>
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <Customizer className="border p-5" />
            </CardContent>

            <CardFooter>
              <CopyCodeButtonDialog variant={"secondary"} />
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card className="bg-background relative min-h-[300px] w-full overflow-hidden rounded-lg">
            <CardHeader>
              <div className="space-y-1">
                <div className="leading-none font-semibold tracking-tight">
                  Generated theme
                </div>
                <div className="text-muted-foreground text-xs">
                  Copy and paste the following code into your CSS file to apply
                  the theme to your project. Look for{" "}
                  <code className="code-inline">globals.css</code> in a Next.js
                  project.
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <CustomizerCode />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function Customizer({ className }: React.ComponentProps<"div">) {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const [config, setConfig] = useConfig();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) "Not mounted...";

  return (
    <div
      className={cn(
        "bg-card @container relative h-full max-h-[450px] w-full space-y-4 overflow-hidden rounded-lg",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        {/* Presets */}
        <div className="space-y-1.5">
          <Label className="pb-2">Presets</Label>

          {/* BASE PRESETS */}
          <div className="pb-2">
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Base shadcn/ui presets
            </Label>
            <div className="@2xl:grid-cols-fluid grid grid-cols-2 gap-2 @lg:grid-cols-3">
              {basePresetsV4Array.map((theme) => {
                const isActive = config.theme === theme.name;
                return (
                  <Button
                    variant={"outline"}
                    size="sm"
                    key={theme.name}
                    onClick={() => {
                      setConfig({
                        ...config,
                        theme: theme.name,
                      });
                    }}
                    className={cn(
                      "cursor-pointer justify-start",
                      isActive && "ring-primary ring",
                    )}
                    style={
                      {
                        backgroundColor: `${mode === "dark" ? theme.dark.card : theme.light.card}`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-lg",
                      )}
                      style={
                        {
                          backgroundColor: `${mode === "dark" ? theme.dark.primary : theme.light.primary}`,
                          color: `${mode === "dark" ? theme.dark["primary-foreground"] : theme.light["primary-foreground"]}`,
                        } as React.CSSProperties
                      }
                    >
                      <Check
                        className={cn(
                          "h-4 w-4 scale-100 stroke-3 transition duration-200",
                          isActive ? "scale-100" : "scale-0",
                        )}
                      />
                    </span>
                    {theme.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* MY CUSTOM PRESETS */}
          <div>
            <Label className="text-muted-foreground pb-2 text-xs font-semibold">
              Colorful presets
            </Label>
            <div className="@2xl:grid-cols-fluid grid grid-cols-2 gap-2 @lg:grid-cols-3">
              {colorfulPresetsArray.map((theme) => {
                const isActive = config.theme === theme.name;
                return (
                  <Button
                    variant={"outline"}
                    size="sm"
                    key={theme.name}
                    onClick={() => {
                      setConfig({
                        ...config,
                        theme: theme.name,
                      });
                    }}
                    className={cn(
                      "cursor-pointer justify-start",
                      isActive && "ring-primary ring",
                    )}
                    style={
                      {
                        backgroundColor: `${mode === "dark" ? theme.dark.card : theme.light.card}`,
                      } as React.CSSProperties
                    }
                  >
                    <span
                      className={cn(
                        "flex size-5 shrink-0 items-center justify-center rounded-lg",
                      )}
                      style={
                        {
                          backgroundColor: `${mode === "dark" ? theme.dark.primary : theme.light.primary}`,
                          color: `${mode === "dark" ? theme.dark["primary-foreground"] : theme.light["primary-foreground"]}`,
                        } as React.CSSProperties
                      }
                    >
                      <Check
                        className={cn(
                          "h-4 w-4 scale-100 stroke-3 transition duration-200",
                          isActive ? "scale-100" : "scale-0",
                        )}
                      />
                    </span>
                    {theme.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <Label className="pb-2">Radius</Label>
          <div className="@2xl:grid-cols-fluid grid grid-cols-2 gap-2 @lg:grid-cols-3">
            {RADIUS_VALUES.map((value) => {
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setConfig({
                      ...config,
                      radius: value,
                    });
                  }}
                  className={cn(config.radius === value && "ring-primary ring")}
                >
                  {value}
                </Button>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className="space-y-1.5">
          <Label className="pb-2">Mode</Label>
          <div className="grid grid-cols-2 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("light")}
                  className={cn(mode === "light" && "border-primary border-2")}
                >
                  <Sun className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("dark")}
                  className={cn(mode === "dark" && "ring-primary ring")}
                >
                  <Moon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
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
        <Button
          className={cn("hidden w-full cursor-pointer md:flex", className)}
          {...props}
        >
          Copy code
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background min-h-[300px] w-full min-w-3xl space-y-2 overflow-hidden rounded-lg outline-none">
        <DialogTitle className="sr-only">Copy generated theme</DialogTitle>
        <div className="space-y-1">
          <div className="leading-none font-semibold tracking-tight">
            Generated theme
          </div>
          <div className="text-muted-foreground text-xs">
            Copy and paste the following code into your CSS file to apply the
            theme to your project. Look for{" "}
            <code className="code-inline">globals.css</code> in a Next.js
            project.
          </div>
        </div>

        <CustomizerCode />
      </DialogContent>
    </Dialog>
  );
}

function CustomizerCode() {
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

  return (
    <div className="bg-card relative h-[450px] w-full overflow-hidden rounded-lg border">
      <ScrollArea className="h-full overflow-hidden">
        <pre className="p-4">
          <code className="relative border border-none p-0 font-mono text-sm">
            {getThemeSylesCodeWithVariablesV4({
              themeObject: activeTheme!,
              radius: config.radius,
            }).trim()}
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

// Move to lib
function getThemeSylesCodeWithVariablesV4({
  themeObject,
  radius,
}: {
  themeObject: ThemeObject;
  radius: number;
}) {
  if (!themeObject) {
    return "No theme object provided";
  }

  return `
:root {
  --radius: ${radius}rem;
  --background: ${themeObject.light.background};
  --foreground: ${themeObject.light.foreground};
  --card: ${themeObject.light.card};
  --card-foreground: ${themeObject.light["card-foreground"]};
  --popover: ${themeObject.light.popover};
  --popover-foreground: ${themeObject.light["popover-foreground"]};
  --primary: ${themeObject.light.primary};
  --primary-foreground: ${themeObject.light["primary-foreground"]};
  --secondary: ${themeObject.light.secondary};
  --secondary-foreground: ${themeObject.light["secondary-foreground"]};
  --muted: ${themeObject.light.muted};
  --muted-foreground: ${themeObject.light["muted-foreground"]};
  --accent: ${themeObject.light.accent};
  --accent-foreground: ${themeObject.light["accent-foreground"]};
  --destructive: ${themeObject.light.destructive};
  --border: ${themeObject.light.border};
  --input: ${themeObject.light.input};
  --ring: ${themeObject.light.ring};
  --chart-1: ${themeObject.light["chart-1"]};
  --chart-2: ${themeObject.light["chart-2"]};
  --chart-3: ${themeObject.light["chart-3"]};
  --chart-4: ${themeObject.light["chart-4"]};
  --chart-5: ${themeObject.light["chart-5"]};
  --sidebar: ${themeObject.light.sidebar};
  --sidebar-foreground: ${themeObject.light["sidebar-foreground"]};
  --sidebar-primary: ${themeObject.light["sidebar-primary"]};
  --sidebar-primary-foreground: ${themeObject.light["sidebar-primary-foreground"]};
  --sidebar-accent: ${themeObject.light["sidebar-accent"]};
  --sidebar-accent-foreground: ${themeObject.light["sidebar-accent-foreground"]};
  --sidebar-border: ${themeObject.light["sidebar-border"]};
  --sidebar-ring: ${themeObject.light["sidebar-ring"]};
}

.dark {
  --background: ${themeObject.dark.background};
  --foreground: ${themeObject.dark.foreground};
  --card: ${themeObject.dark.card};
  --card-foreground: ${themeObject.dark["card-foreground"]};
  --popover: ${themeObject.dark.popover};
  --popover-foreground: ${themeObject.dark["popover-foreground"]};
  --primary: ${themeObject.dark.primary};
  --primary-foreground: ${themeObject.dark["primary-foreground"]};
  --secondary: ${themeObject.dark.secondary};
  --secondary-foreground: ${themeObject.dark["secondary-foreground"]};
  --muted: ${themeObject.dark.muted};
  --muted-foreground: ${themeObject.dark["muted-foreground"]};
  --accent: ${themeObject.dark.accent};
  --accent-foreground: ${themeObject.dark["accent-foreground"]};
  --destructive: ${themeObject.dark.destructive};
  --border: ${themeObject.dark.border};
  --input: ${themeObject.dark.input};
  --ring: ${themeObject.dark.ring};
  --chart-1: ${themeObject.dark["chart-1"]};
  --chart-2: ${themeObject.dark["chart-2"]};
  --chart-3: ${themeObject.dark["chart-3"]};
  --chart-4: ${themeObject.dark["chart-4"]};
  --chart-5: ${themeObject.dark["chart-5"]};
  --sidebar: ${themeObject.dark.sidebar};
  --sidebar-foreground: ${themeObject.dark["sidebar-foreground"]};
  --sidebar-primary: ${themeObject.dark["sidebar-primary"]};
  --sidebar-primary-foreground: ${themeObject.dark["sidebar-primary-foreground"]};
  --sidebar-accent: ${themeObject.dark["sidebar-accent"]};
  --sidebar-accent-foreground: ${themeObject.dark["sidebar-accent-foreground"]};
  --sidebar-border: ${themeObject.dark["sidebar-border"]};
  --sidebar-ring: ${themeObject.dark["sidebar-ring"]};
}

@theme inline {
  /* fonts variables go here  */
  /* --font-sans: var(...);   */
  /* --font-mono: var(...);   */

  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  ----primary-foreground: var(--primary-foreground);
  ----primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
`;
}
