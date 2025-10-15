"use client";

import { Check, ChevronDown, ChevronUp, SendHorizontal } from "lucide-react";
import { useTheme } from "next-themes";
import {
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import { useMounted } from "@/hooks/use-mounted";
import { useSurfaceShades } from "@/hooks/use-surface-shades";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { useTokens } from "@/hooks/use-tokens";
import {
  basePresetsV4Array,
  colorfulPresetsArray,
  surfaceShadesPresetArray,
  surfaceShadesPresets,
} from "@/lib/colors";
import { otherPresetsArray } from "@/lib/presets";
import { cn } from "@/lib/utils";
import type {
  ColorProperty,
  SurfaceShades,
  SurfaceShadesPreset,
  ThemeMode,
  ThemeProperties,
} from "@/types/theme";
import { isValidColor } from "@/utils/colors";
import { RADIUS_VALUES } from "@/utils/constants";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "../ui/command";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import { Slider } from "../ui/slider";
import { Color } from "./color";
import { TokenColorPicker } from "./token-color-picker";

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
    if (pastedColor === "") return;

    const normalizedColor = pastedColor.trim().toLowerCase();

    const allowedStartWith = ["oklch", "hsl", "rgb", "#"];
    const colorStartsWithAnyAllowed = allowedStartWith.some((c) =>
      normalizedColor.startsWith(c)
    );

    if (!(colorStartsWithAnyAllowed && isValidPastedColor)) {
      toast.error("Invalid color format.");
      return;
    }

    setColorTokens({
      color: normalizedColor,
      property,
      modesInSync,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    setPastedColor(value);
  };

  return (
    <div className={cn("rounded-lg shadow", className)} {...props}>
      <form
        className="relative flex items-center"
        onSubmit={handleSubmitColorPaste}
      >
        <Input
          className={cn(
            "relative h-10 border-border bg-transparent px-0 py-2 pr-10 pl-2 font-mono lowercase shadow outline transition dark:bg-transparent",
            !isValidColor && "outline-destructive"
          )}
          id="pasted-color"
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          value={pastedColor}
        />
        <Button
          className={cn(
            "absolute right-2 size-6 rounded-lg transition",
            isValidPastedColor ? "text-(--pasted-color)" : ""
          )}
          size="sm"
          style={{
            "--pasted-color": isValidPastedColor ? pastedColor : "",
          }}
          variant="ghost"
        >
          <SendHorizontal className="size-4" />
        </Button>
      </form>
    </div>
  );
}

export function SurfaceShadesControl({ className }: ComponentProps<"div">) {
  const { setSurfaceShadesColorTokens } = useTokens();
  const { currentSurfacePreset } = useThemeConfig();

  const isMounted = useMounted();
  const resolvedTheme = useTheme().resolvedTheme as ThemeMode;

  const setSelectedBackgroundShadePreset = (preset: SurfaceShadesPreset) => {
    const bgShadesThemeObject = surfaceShadesPresets[preset];
    setSurfaceShadesColorTokens({ bgShadesThemeObject, modesInSync: true });
  };

  const {
    getDefaultSurfaceShades,
    getInvertedSurfaceShades,
    getPlainSurfaceShades,
  } = useSurfaceShades();

  const currentPresetShadesArray = [
    getDefaultSurfaceShades(),
    getInvertedSurfaceShades(),
    getPlainSurfaceShades(),
  ];

  return (
    <Command className={cn(className)}>
      {isMounted && (
        <>
          <CommandEmpty>No surface shades found.</CommandEmpty>

          <CommandGroup heading="Current preset">
            {currentPresetShadesArray.map((bgShadesThemeObject) => {
              const properties = bgShadesThemeObject[resolvedTheme];
              const { name, label } = bgShadesThemeObject;
              const isActive = name === currentSurfacePreset;

              return (
                <CommandItem
                  className="flex items-center gap-2 py-2"
                  key={bgShadesThemeObject.name}
                  onSelect={() =>
                    setSurfaceShadesColorTokens({
                      bgShadesThemeObject,
                      modesInSync: true,
                    })
                  }
                >
                  <div className="flex items-center gap-4">
                    <div className="pointer-events-none flex">
                      <SurfaceColorTokens properties={properties} />
                    </div>
                    <span className="min-w-18 text-sm">{label}</span>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0 transition",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Neutralize">
            {surfaceShadesPresetArray.map((bgShadesThemeObject) => {
              const properties = bgShadesThemeObject[resolvedTheme];
              const { name, label } = bgShadesThemeObject;
              const isActive = name === currentSurfacePreset;
              return (
                <CommandItem
                  className="flex items-center gap-2 py-2"
                  key={bgShadesThemeObject.name}
                  onSelect={() => setSelectedBackgroundShadePreset(name)}
                >
                  <div className="flex items-center gap-4">
                    <div className="pointer-events-none flex">
                      <SurfaceColorTokens properties={properties} />
                    </div>
                    <span className="min-w-18 text-sm">{label}</span>
                  </div>

                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0 transition",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </>
      )}
    </Command>
  );
}

function SurfaceColorTokens({ properties }: { properties: SurfaceShades }) {
  return (
    <>
      <Color className="pointer-events-none" color={properties["background"]} />
      <Color className="pointer-events-none" color={properties["foreground"]} />
      <Color className="pointer-events-none" color={properties["card"]} />
      <Color className="pointer-events-none" color={properties["popover"]} />
      <Color className="pointer-events-none" color={properties["muted"]} />
      <Color className="pointer-events-none" color={properties["accent"]} />
      <Color className="pointer-events-none" color={properties["border"]} />
      <Color className="pointer-events-none" color={properties["sidebar"]} />
    </>
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
              className={cn(
                "h-fit cursor-pointer rounded-lg p-1 text-xs shadow ring ring-border",
                "w-full @max-md:max-w-full max-w-[75px] pr-1.5"
              )}
              key={value}
              size="sm"
              style={{
                "--radius": `${value}`,
              }}
              variant={"ghost"}
            >
              <span className="@lg:inline-flex hidden">{value}</span>
              <span className="inline-flex @lg:hidden">{valueWithoutRem}</span>
            </Button>
          );
        }

        return (
          <Button
            className={cn(
              "h-fit cursor-pointer rounded-lg p-1 text-xs shadow ring ring-border",
              "w-full @max-md:max-w-full max-w-[75px] pr-1.5",
              isActive &&
                "border-primary/50 text-foreground ring-[2px] ring-primary/50"
            )}
            key={value}
            onClick={() => {
              setConfig((prev) => ({
                ...prev,
                radius: value,
              }));
            }}
            size="sm"
            style={{
              "--radius": `${value}`,
            }}
            variant={"ghost"}
          >
            <span className="@lg:inline-flex hidden">{value}</span>
            <span className="inline-flex @lg:hidden">{valueWithoutRem}</span>
          </Button>
        );
      })}
    </div>
  );
}

export function RadiusSliderControl() {
  const { currentRadius, setConfig } = useThemeConfig();
  const currentRadiusValue = Number.parseFloat(
    currentRadius.replace("rem", "")
  );

  const handleChange = useDebouncedCallback((v: number) => {
    setConfig((prev) => ({ ...prev, radius: `${v}rem` }));
  }, 100);

  return (
    <SliderWithInput
      className="font-mono"
      label="--radius"
      max={2}
      min={0}
      onValueChange={handleChange}
      step={0.025}
      unit="rem"
      value={currentRadiusValue}
    />
  );
}

interface AllPresetsControlProps extends ComponentProps<"div"> {}

export function AllPresetsControl({ className }: AllPresetsControlProps) {
  const { getActiveThemeColorToken } = useTokens();
  const { currentThemeObject, updateThemeConfig } = useThemeConfig();

  const isMounted = useMounted();
  const resolvedTheme = useTheme().resolvedTheme as ThemeMode;
  const activePresetName = currentThemeObject.name;

  const baseShadcnPresets = basePresetsV4Array;
  const colorShadcnPresets = colorfulPresetsArray;
  const otherPresets = otherPresetsArray;

  const allPresets = [
    ...otherPresets,
    ...baseShadcnPresets,
    ...colorShadcnPresets,
  ];

  const activeThemeInArray = allPresets.find(
    (p) => p.name === activePresetName
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="rounded-lg border shadow">
        <div className="group/control flex h-10 w-full cursor-pointer items-center justify-between gap-4 bg-background p-2.5 transition-colors duration-300 ease-in-out *:shrink-0 hover:bg-muted/40">
          <div className="flex items-center gap-2">
            {activeThemeInArray ? (
              <div className="flex">
                <Color
                  className="pointer-events-none"
                  color={
                    isMounted
                      ? getActiveThemeColorToken({
                          property: "primary",
                          mode: resolvedTheme,
                        })
                      : ""
                  }
                />
                <Color
                  className="pointer-events-none"
                  color={
                    isMounted
                      ? getActiveThemeColorToken({
                          property: "background",
                          mode: resolvedTheme,
                        })
                      : ""
                  }
                />
                <Color
                  className="pointer-events-none"
                  color={
                    isMounted
                      ? getActiveThemeColorToken({
                          property: "secondary",
                          mode: resolvedTheme,
                        })
                      : ""
                  }
                />
                <Color
                  className="pointer-events-none"
                  color={
                    isMounted
                      ? getActiveThemeColorToken({
                          property: "muted",
                          mode: resolvedTheme,
                        })
                      : ""
                  }
                />
                <Color
                  className="pointer-events-none"
                  color={
                    isMounted
                      ? getActiveThemeColorToken({
                          property: "card",
                          mode: resolvedTheme,
                        })
                      : ""
                  }
                />
              </div>
            ) : null}

            <h3
              className={cn(
                "font-medium text-muted-foreground text-sm group-hover/control:text-foreground",
                activeThemeInArray && "text-foreground"
              )}
            >
              {isMounted ? (
                activeThemeInArray ? (
                  activeThemeInArray.label
                ) : (
                  "Select a preset"
                )
              ) : (
                <Skeleton className="h-4 w-full" />
              )}
            </h3>
          </div>
          <button
            aria-label="Expand section"
            className="text-muted-foreground transition-colors group-hover/control:text-foreground"
            type="button"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0">
        <Command className={cn(className)}>
          <CommandInput className="text-base" />

          <ScrollArea className="flex max-h-81 flex-col">
            <CommandEmpty>
              <span className="text-muted-foreground">
                No theme presets found.
              </span>
            </CommandEmpty>
            {isMounted && (
              <>
                <CommandGroup heading="Community">
                  {otherPresets.map((presetThemeObject) => {
                    const properties = presetThemeObject[resolvedTheme];
                    const { name, label } = presetThemeObject;
                    const isActive = name === activePresetName;
                    return (
                      <CommandItem
                        className="flex items-center gap-4 py-2"
                        key={presetThemeObject.name}
                        onSelect={() => updateThemeConfig(presetThemeObject)}
                      >
                        <ThemePresetColors
                          label={label}
                          properties={properties}
                        />

                        <Check
                          className={cn(
                            "ml-auto size-4 shrink-0 transition",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Shadcn/ui base">
                  {baseShadcnPresets.map((presetThemeObject) => {
                    const properties = presetThemeObject[resolvedTheme];
                    const { name, label } = presetThemeObject;
                    const isActive = name === activePresetName;
                    return (
                      <CommandItem
                        className="flex items-center gap-4 py-2"
                        key={presetThemeObject.name}
                        onSelect={() => updateThemeConfig(presetThemeObject)}
                      >
                        <ThemePresetColors
                          label={label}
                          properties={properties}
                        />

                        <Check
                          className={cn(
                            "ml-auto size-4 shrink-0 transition",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Shadcn/ui color">
                  {colorShadcnPresets.map((presetThemeObject) => {
                    const properties = presetThemeObject[resolvedTheme];
                    const { name, label } = presetThemeObject;
                    const isActive = name === activePresetName;
                    return (
                      <CommandItem
                        className="flex items-center gap-4 py-2"
                        key={presetThemeObject.name}
                        onSelect={() => updateThemeConfig(presetThemeObject)}
                      >
                        <ThemePresetColors
                          label={label}
                          properties={properties}
                        />

                        <Check
                          className={cn(
                            "ml-auto size-4 shrink-0 transition",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </>
            )}
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ThemePresetColors({
  properties,
  label,
}: {
  properties: Partial<ThemeProperties>;
  label: ColorProperty | (string & {});
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="pointer-events-none flex">
        <Color className="pointer-events-none" color={properties["primary"]!} />
        <Color
          className="pointer-events-none"
          color={properties["background"]!}
        />
        <Color
          className="pointer-events-none"
          color={properties["secondary"]!}
        />
        <Color className="pointer-events-none" color={properties["muted"]!} />
        <Color className="pointer-events-none" color={properties["card"]!} />
      </div>
      <span>{label}</span>
    </div>
  );
}

// Building blocks
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
    <div
      className={cn("overflow-hidden rounded-lg border shadow", className)}
      id={id}
    >
      <div
        className={cn(
          "group/control flex h-10 w-full shrink-0 cursor-pointer items-center justify-between gap-4 border-b bg-background p-2.5 transition-colors duration-300 ease-in-out hover:bg-muted/40",
          isExpanded ? "border-border" : "border-transparent"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3
          className={cn(
            "font-medium text-muted-foreground text-sm group-hover/control:text-foreground",
            isExpanded && "text-foreground"
          )}
        >
          {title}
        </h3>
        <button
          aria-label={isExpanded ? "Collapse section" : "Expand section"}
          className="text-muted-foreground transition-colors group-hover/control:text-foreground"
          type="button"
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
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden bg-background">
          <div className={cn("space-y-2 p-2.5", className)}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export function ControlsSkeleton({ className }: ComponentProps<"div">) {
  return (
    <div className="space-y-3.5">
      <div className="flex items-center gap-1">
        <Skeleton className="size-4 bg-muted" />
        <Skeleton className="h-4 w-24 bg-muted" />
      </div>
      <Skeleton className={cn("h-48 bg-muted", className)} />
    </div>
  );
}

export function ShadowsControl() {
  const { getToken, setToken, setColorToken } = useTokens();

  const shadowColor = getToken({
    property: "shadow-color",
  });
  const shadowOpacity = Number.parseFloat(
    getToken({ property: "shadow-opacity" })
  );
  const shadowBlur = Number.parseFloat(
    getToken({ property: "shadow-blur" }).replace("px", "")
  );
  const shadowSpread = Number.parseFloat(
    getToken({ property: "shadow-spread" }).replace("px", "")
  );
  const shadowOffsetX = Number.parseFloat(
    getToken({ property: "shadow-offset-x" }).replace("px", "")
  );
  const shadowOffsetY = Number.parseFloat(
    getToken({ property: "shadow-offset-y" }).replace("px", "")
  );

  return (
    <div className="space-y-4 font-mono">
      <div>
        <TokenColorPicker
          color={shadowColor}
          colorProperty="shadow-color"
          rawColor={shadowColor}
          setColorTokens={setColorToken}
          syncModes={false}
        />
      </div>

      <div>
        <SliderWithInput
          label="--shadow-opacity"
          max={1}
          min={0}
          onValueChange={(value) =>
            setToken({
              property: "shadow-opacity",
              value: `${value}`,
              modesInSync: true,
            })
          }
          step={0.01}
          unit=""
          value={shadowOpacity}
        />
      </div>

      <div>
        <SliderWithInput
          label="--shadow-blur"
          max={50}
          min={0}
          onValueChange={(value) =>
            setToken({
              property: "shadow-blur",
              value: `${value}px`,
              modesInSync: true,
            })
          }
          step={0.5}
          unit="px"
          value={shadowBlur}
        />
      </div>

      <div>
        <SliderWithInput
          label="--shadow-spread"
          max={50}
          min={-50}
          onValueChange={(value) =>
            setToken({
              property: "shadow-spread",
              value: `${value}px`,
              modesInSync: true,
            })
          }
          step={0.5}
          unit="px"
          value={shadowSpread}
        />
      </div>

      <div>
        <SliderWithInput
          label="--shadow-offset-x"
          max={50}
          min={-50}
          onValueChange={(value) =>
            setToken({
              property: "shadow-offset-x",
              value: `${value}px`,
              modesInSync: true,
            })
          }
          step={0.5}
          unit="px"
          value={shadowOffsetX}
        />
      </div>

      <div>
        <SliderWithInput
          label="--shadow-offset-y"
          max={50}
          min={-50}
          onValueChange={(value) =>
            setToken({
              property: "shadow-offset-y",
              value: `${value}px`,
              modesInSync: true,
            })
          }
          step={0.5}
          unit="px"
          value={shadowOffsetY}
        />
      </div>
    </div>
  );
}

interface SliderWithInputProps extends ComponentProps<"div"> {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  label: string;
  unit?: string;
}

function SliderWithInput({
  value,
  onValueChange,
  min,
  max,
  step = 1,
  label,
  unit = "px",
  className,
  ...props
}: SliderWithInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (localValue !== value) {
      setLocalValue(value);
    }
  }, [value]);

  return (
    <div className={cn("space-y-2 pb-2", className)} {...props}>
      <div className="flex items-center justify-between">
        <Label
          className="font-medium text-xs"
          htmlFor={`slider-${label.replace(/\s+/g, "-").toLowerCase()}`}
        >
          {label}
        </Label>
        <div className="flex items-center gap-1">
          <Input
            className="h-6 w-18 px-2 pr-0 text-xs"
            id={`input-${label.replace(/\s+/g, "-").toLowerCase()}`}
            max={max}
            min={min}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              setLocalValue(newValue);
              onValueChange(newValue);
            }}
            step={step}
            type="number"
            value={localValue}
          />
          <span className="text-muted-foreground text-xs">{unit}</span>
        </div>
      </div>
      <Slider
        className="py-1"
        id={`slider-${label.replace(/\s+/g, "-").toLowerCase()}`}
        max={max}
        min={min}
        onValueChange={(values) => {
          setLocalValue(values[0]);
          onValueChange(values[0]);
        }}
        step={step}
        value={[localValue]}
      />
    </div>
  );
}
