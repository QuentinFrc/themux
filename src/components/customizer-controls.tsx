"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { useThemeConfig } from "@/hooks/use-theme-config";
import {
  basePresetsV4Array,
  colorfulPresetsArray,
  surfaceShadesPresetArray,
  surfaceShadesPresets,
} from "@/lib/colors";
import { cn } from "@/lib/utils";
import {
  ColorProperty,
  RemValue,
  SurfaceShadesPreset,
  ThemeMode,
  ThemeObject,
} from "@/types/theme";
import { getOptimalForegroundColor, isValidColor } from "@/utils/colors";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Laptop,
  Moon,
  SendHorizontal,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import React, {
  ChangeEvent,
  ComponentProps,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { Color } from "./color";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

const RADIUS_VALUES: RemValue[] = [
  "0rem",
  "0.25rem",
  "0.5rem",
  "0.625rem",
  "0.75rem",
  "1rem",
];

const PLACEHOLDERS = [
  "oklch(0.685 0.169 237.323)",
  "hsl(199.18 100% 47.843%)",
  "rgb(0, 166, 244)",
  "#00a6f4",
];

export function PasteColorControl({
  className,
  property,
  setColorTokens,
  modesInSync,
  ...props
}: {
  setColorTokens: (obj: {
    property: ColorProperty;
    color: string;
    modesInSync?: boolean;
  }) => void;
  property: ColorProperty;
  modesInSync: boolean;
} & ComponentProps<"div">) {
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [pastedColor, setPastedColor] = useState("");
  const isValidPastedColor = isValidColor(pastedColor);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholder((prev) => {
        const index = PLACEHOLDERS.indexOf(prev);
        return PLACEHOLDERS[(index + 1) % PLACEHOLDERS.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitColorPaste = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedColor = pastedColor.trim().toLowerCase();

    const allowedStartWith = ["oklch", "hsl", "rgb", "#"];
    const colorStartsWithAnyAllowed = allowedStartWith.some((c) =>
      normalizedColor.startsWith(c),
    );

    if (!colorStartsWithAnyAllowed || !isValidPastedColor) {
      toast.error("Invalid color format.");
      return;
    }

    setColorTokens({
      color: normalizedColor,
      property: property,
      modesInSync: modesInSync,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPastedColor(event.target.value);
  };

  return (
    <div className={cn(className)} {...props}>
      <form
        className="relative flex items-center gap-1 overflow-hidden rounded-lg border p-0.5"
        onSubmit={handleSubmitColorPaste}
      >
        <Input
          type="text"
          id="pasted-color"
          onChange={handleInputChange}
          className={cn(
            "h-fit font-mono lowercase outline transition",
            !isValidColor && "outline-destructive",
          )}
          placeholder={placeholder}
          value={pastedColor}
        />
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "transition",
            isValidPastedColor
              ? "bg-(--pasted-color) text-(--pasted-color-foreground) inset-ring-2 inset-ring-(--pasted-color)"
              : "",
          )}
          style={{
            "--pasted-color": isValidPastedColor ? pastedColor : "",
            "--pasted-color-foreground": isValidPastedColor
              ? getOptimalForegroundColor(pastedColor)
              : "",
          }}
        >
          <SendHorizontal />
        </Button>
      </form>
      <span className="text-muted-foreground text-xs">
        {`oklch(), hsl(), rbg() and #hex`}
      </span>
    </div>
  );
}

export function SurfaceShadesControl({ className }: ComponentProps<"div">) {
  const { getColorToken, setSurfaceShadesColorTokens, getActiveSurfaceShades } =
    useColorTokens();

  const isMounted = useMounted();
  const resolvedTheme = useTheme().resolvedTheme as ThemeMode;
  const activePresetName = getActiveSurfaceShades()?.name;
  const activePresetLabel = getActiveSurfaceShades()?.label;

  const setSelectedBackgroundShadePreset = (preset: SurfaceShadesPreset) => {
    const bgShadesThemeObject = surfaceShadesPresets[preset];
    setSurfaceShadesColorTokens({ bgShadesThemeObject, modesInSync: true });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group scaled relative mb-0 flex h-10 w-full shrink-0 items-center justify-between gap-1 rounded-lg border p-1 px-2">
          <div className="flex items-center gap-2 px-1">
            <span className="min-w-16 text-sm">
              {isMounted && activePresetLabel}
              {!isMounted && <Skeleton className="h-4 w-full" />}
            </span>
            <div className="flex">
              <Color
                color={
                  isMounted ? getColorToken({ property: "background" }) : ""
                }
                className="pointer-events-none"
              />
              <Color
                color={isMounted ? getColorToken({ property: "card" }) : ""}
                className="pointer-events-none"
              />
              <Color
                color={isMounted ? getColorToken({ property: "popover" }) : ""}
                className="pointer-events-none"
              />
              <Color
                color={isMounted ? getColorToken({ property: "muted" }) : ""}
                className="pointer-events-none"
              />
              <Color
                color={isMounted ? getColorToken({ property: "sidebar" }) : ""}
                className="pointer-events-none"
              />
            </div>
          </div>
          <ChevronDown className="size-4 shrink-0 opacity-50" />
        </div>
      </PopoverTrigger>
      <span className="text-muted-foreground truncate text-xs">
        {`background, card, popover, muted, etc.`}
      </span>

      <PopoverContent
        className="scaled w-auto overflow-hidden p-0"
        align="start"
      >
        <Command className={cn("w-full", className)}>
          {isMounted && (
            <>
              <CommandEmpty>No surface shades found.</CommandEmpty>
              <CommandGroup>
                {surfaceShadesPresetArray.map((bgShadesThemeObject) => {
                  const properties = bgShadesThemeObject[resolvedTheme];
                  const { name, label } = bgShadesThemeObject;
                  const isActive = name === activePresetName;
                  return (
                    <CommandItem
                      key={bgShadesThemeObject.name}
                      onSelect={() => setSelectedBackgroundShadePreset(name)}
                      className="flex items-center gap-2 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="min-w-16 text-sm">{label}</span>
                        <div className="pointer-events-none flex">
                          <Color
                            color={properties["background"]}
                            className="pointer-events-none"
                          />
                          <Color
                            color={properties["card"]}
                            className="pointer-events-none"
                          />
                          <Color
                            color={properties["popover"]}
                            className="pointer-events-none"
                          />
                          <Color
                            color={properties["muted"]}
                            className="pointer-events-none"
                          />
                          <Color
                            color={properties["sidebar"]}
                            className="pointer-events-none"
                          />
                        </div>
                      </div>

                      <Check
                        className={cn(
                          "size-4 shrink-0 transition",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ShadcnPresetsControls({
  className,
  ...props
}: ComponentProps<"div">) {
  const { currentThemeObject } = useThemeConfig();

  return (
    <div className={cn("", className)} {...props}>
      {/* Default shadcn/ui presets */}
      {basePresetsV4Array.map((themeObject) => {
        const isActive = currentThemeObject.name === themeObject.name;

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
        const isActive = currentThemeObject.name === themeObject.name;

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
  const { setConfig } = useThemeConfig();
  const { resolvedTheme: mode } = useTheme();

  const setThemeConfig = () => {
    setConfig((prev) => ({
      ...prev,
      radius: themeObject.radius ?? prev.radius,
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
  const { currentRadius, setConfig } = useThemeConfig();
  const isMounted = useMounted();

  return (
    <div className={cn("text-muted-foreground", className)} {...props}>
      {RADIUS_VALUES.map((value) => {
        const isActive = currentRadius === value;
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
              setConfig((prev) => {
                return {
                  ...prev,
                  radius: value,
                };
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

export function ThemeModeControls({
  className,
  showSystem = true,
  ...props
}: { showSystem?: boolean } & ComponentProps<"div">) {
  const { setTheme: setMode, resolvedTheme: mode } = useTheme();
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <div className={cn("text-muted-foreground", className)}>
        <Button
          variant={"ghost"}
          size="sm"
          className={cn(
            BUTTON_CLASSES,
            "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
          )}
        >
          <Sun />
          <span className={cn("hidden @md:inline-flex")}>Light</span>
        </Button>

        <Button
          variant={"ghost"}
          size="sm"
          className={cn(
            BUTTON_CLASSES,
            "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
          )}
        >
          <Moon />
          <span className={cn("hidden @md:inline-flex")}>Dark</span>
        </Button>

        {showSystem && (
          <Button
            variant={"ghost"}
            size="sm"
            className={cn(
              BUTTON_CLASSES,
              "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
            )}
          >
            <Laptop />
            <span className={cn("hidden @md:inline-flex")}>Auto</span>
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn("text-muted-foreground", className)}>
      <Button
        variant={"ghost"}
        size="sm"
        onClick={() => setMode("light")}
        className={cn(
          BUTTON_CLASSES,
          "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
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
          "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
          mode === "dark" &&
            "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
        )}
      >
        <Moon />
        <span className={cn("hidden @md:inline-flex")}>Dark</span>
      </Button>

      {showSystem && (
        <Button
          variant={"ghost"}
          size="sm"
          onClick={() => setMode("system")}
          className={cn(
            BUTTON_CLASSES,
            "w-auto max-w-[75px] grow pr-1.5 @max-md:max-w-full",
            mode === "system" &&
              "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
          )}
        >
          <Laptop />
          <span className={cn("hidden @md:inline-flex")}>Auto</span>
        </Button>
      )}
    </div>
  );
}

export function ControlSection({
  id,
  title,
  expanded = false,
  className,
  children,
}: {
  title: string;
  expanded?: boolean;
  id?: string;
} & ComponentProps<"div">) {
  const [isExpanded, setIsExpanded] = useState(expanded);
  return (
    <div id={id} className="overflow-hidden rounded-lg border">
      <div
        className={cn(
          "group/control bg-background hover:bg-muted/40 flex h-10 w-full shrink-0 cursor-pointer items-center justify-between gap-4 border-b p-2.5 transition-colors duration-300 ease-in-out",
          isExpanded ? "border-border" : "border-transparent",
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3
          className={cn(
            "group-hover/control:text-foreground text-muted-foreground text-sm font-medium",
            isExpanded && "text-foreground",
          )}
        >
          {title}
        </h3>
        <button
          type="button"
          className="text-muted-foreground group-hover/control:text-foreground transition-colors"
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="bg-background overflow-hidden">
          <div className={cn("space-y-2 p-2.5", className)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ControlsSkeleton() {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-1">
        <Skeleton className="size-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-48" />
    </div>
  );
}
