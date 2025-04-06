import { useConfig } from "@/hooks/use-config";
import { basePresetsV4Array, colorfulPresetsArray } from "@/lib/colors";
import { cn } from "@/lib/utils";
import { RemValue, ThemeObject } from "@/types/theme";
import { Laptop, Moon, SquareRoundCorner, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import React, { ComponentProps } from "react";
import { Shadcn } from "./icons/shadcn";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useMounted } from "@/hooks/use-mounted";

const RADIUS_VALUES: RemValue[] = [
  "0rem",
  "0.25rem",
  "0.5rem",
  "0.625rem",
  "0.75rem",
  "1rem",
];

export function Customizer({ className }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("@container relative h-full w-full space-y-4", className)}
    >
      <div className="flex flex-col gap-8">
        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <Shadcn className="size-4" /> Shadcn presets
          </Label>
          <PresetsControls className="grid grid-cols-3 gap-2 @sm:grid-cols-4 @md:flex @md:flex-wrap @3xl:max-w-[85px] @3xl:text-sm" />
        </div>

        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <SquareRoundCorner className="size-4" /> Radius
          </Label>
          <RadiusControls className="flex flex-wrap gap-2 @max-md:grid @max-md:grid-cols-3 @3xl:max-w-[85px] @3xl:text-sm" />
        </div>

        <div className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <SunMoon className="size-4" /> Mode
          </Label>
          <ThemeModeControls className="flex flex-wrap gap-2 @max-md:grid @max-md:grid-cols-3 @3xl:max-w-[85px] @3xl:text-sm" />
        </div>
      </div>
    </div>
  );
}

function PresetsControls({ className, ...props }: ComponentProps<"div">) {
  const [config] = useConfig();

  return (
    <div className={cn("", className)}>
      {/* Default shadcn/ui presets */}
      {basePresetsV4Array.map((themeObject) => {
        const isActive = config.themeObject.name === themeObject.name;

        return (
          <PresetButton
            showLabel
            isActive={isActive}
            themeObject={themeObject}
            key={themeObject.name}
            className="bg-card w-full max-w-[75px] pr-1.5 @max-md:max-w-full"
          >
            {themeObject.label}
          </PresetButton>
        );
      })}
      {/* Colorful presets */}
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
  );
}

const BUTTON_CLASSES = cn(
  "ring-border h-fit cursor-pointer p-1 text-xs ring rounded-lg",
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
        isActive &&
          "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
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
          "bg-primary ring-border flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-lg ring",
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

export function RadiusControls({ className, ...props }: ComponentProps<"div">) {
  const [config, setConfig] = useConfig();
  const isMounted = useMounted();

  return (
    <div className={cn("text-muted-foreground", className)} {...props}>
      {RADIUS_VALUES.map((value) => {
        const isActive = config.radius === value;
        const valueWithoutRem = value.replace("rem", "");

        if (!isMounted) {
          return (
            <Button
              variant={"ghost"}
              size="sm"
              key={value}
              className={cn(
                BUTTON_CLASSES,
                "w-full max-w-[75px] pr-1.5 @max-md:max-w-full",
              )}
              style={{
                "--radius": `${value}`,
              }}
            >
              <span className="hidden @lg:inline-flex">{value}</span>
              <span className="inline-flex @lg:hidden">{valueWithoutRem}</span>
            </Button>
          );
        }

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
              "w-full max-w-[75px] pr-1.5 @max-md:max-w-full",
              isActive &&
                "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
            )}
            style={{
              "--radius": `${value}`,
            }}
          >
            <span className="hidden @lg:inline-flex">{value}</span>
            <span className="inline-flex @lg:hidden">{valueWithoutRem}</span>
          </Button>
        );
      })}
    </div>
  );
}

function ThemeModeControls({ className, ...props }: ComponentProps<"div">) {
  const { setTheme: setMode, theme: mode } = useTheme();

  return (
    <div className={cn("text-muted-foreground", className)}>
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => setMode("light")}
        className={cn(
          BUTTON_CLASSES,
          "w-full max-w-[75px] pr-1.5 @max-md:max-w-full",
          mode === "light" &&
            "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
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
          "w-full max-w-[75px] pr-1.5 @max-md:max-w-full",
          mode === "dark" &&
            "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
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
          "w-full max-w-[75px] pr-1.5 @max-md:max-w-full",
          mode === "system" &&
            "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
        )}
      >
        <Laptop />
        <span className={cn("hidden @md:inline-flex")}>Auto</span>
      </Button>
    </div>
  );
}
