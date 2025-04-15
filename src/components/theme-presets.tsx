import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { basePresetsV4Array, colorfulPresetsArray } from "@/lib/colors";
import { otherPresetsArray } from "@/lib/presets";
import { cn } from "@/lib/utils";
import {
  ColorProperty,
  ThemeMode,
  ThemeObject,
  ThemeProperties,
} from "@/types/theme";
import { Check, ChevronDown, PaintBucket } from "lucide-react";
import { useTheme } from "next-themes";
import React, { ComponentProps } from "react";
import { Color } from "./color";
import { Shadcn } from "./icons/shadcn";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";

export function ThemePresets({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("@container relative w-full space-y-4", className)}>
      <div className="flex flex-col gap-7">
        <section className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <PaintBucket className="size-4" /> Theme presets
          </Label>
          <PresetsControl presetObjectsArray={otherPresetsArray} />
        </section>

        <section className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <Shadcn className="size-4" /> Shadcn presets
          </Label>
          <PresetsControl
            presetObjectsArray={[
              ...basePresetsV4Array,
              ...colorfulPresetsArray,
            ]}
          />
        </section>
      </div>
    </div>
  );
}

export function PresetsControl({
  className,
  presetObjectsArray,
}: { presetObjectsArray: ThemeObject[] } & ComponentProps<"div">) {
  const { getActiveThemeColorToken } = useColorTokens();
  const { updateThemeConfig, currentThemeObject } = useThemeConfig();

  const isMounted = useMounted();
  const resolvedTheme = useTheme().resolvedTheme as ThemeMode;
  const activePresetName = currentThemeObject.name;

  const activeThemeInArray = presetObjectsArray.find(
    (p) => p.name === activePresetName,
  );

  return (
    <Popover>
      <PopoverTrigger asChild className="rounded-lg border">
        <div className="group/control bg-background hover:bg-muted/40 flex h-10 w-full cursor-pointer items-center justify-between gap-4 p-2.5 transition-colors duration-300 ease-in-out *:shrink-0">
          <div className="flex items-center gap-2">
            {activeThemeInArray ? (
              <div className="flex">
                <Color
                  color={
                    isMounted
                      ? getActiveThemeColorToken({ property: "primary" })
                      : ""
                  }
                  className="pointer-events-none"
                />
                <Color
                  color={
                    isMounted
                      ? getActiveThemeColorToken({ property: "background" })
                      : ""
                  }
                  className="pointer-events-none"
                />
                <Color
                  color={
                    isMounted
                      ? getActiveThemeColorToken({ property: "secondary" })
                      : ""
                  }
                  className="pointer-events-none"
                />
                <Color
                  color={
                    isMounted
                      ? getActiveThemeColorToken({ property: "muted" })
                      : ""
                  }
                  className="pointer-events-none"
                />
                <Color
                  color={
                    isMounted
                      ? getActiveThemeColorToken({ property: "card" })
                      : ""
                  }
                  className="pointer-events-none"
                />
              </div>
            ) : null}

            <h3
              className={cn(
                "group-hover/control:text-foreground text-muted-foreground text-sm font-medium",
                activeThemeInArray && "text-foreground",
              )}
            >
              {isMounted && activeThemeInArray
                ? activeThemeInArray.label
                : "Select a preset"}

              {!isMounted && <Skeleton className="h-4 w-full" />}
            </h3>
          </div>
          <button
            type="button"
            className="text-muted-foreground group-hover/control:text-foreground transition-colors"
            aria-label="Expand section"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </PopoverTrigger>

      <PopoverContent className="overflow-hidden p-0" align="center">
        <Command className={cn("", className)}>
          {isMounted && (
            <>
              <CommandEmpty>No theme presets found.</CommandEmpty>
              <CommandGroup className="scrollbar-thin max-h-82 w-full overflow-y-auto">
                {presetObjectsArray.map((presetThemeObject) => {
                  const properties = presetThemeObject[resolvedTheme];
                  const { name, label } = presetThemeObject;
                  const isActive = name === activePresetName;
                  return (
                    <CommandItem
                      key={presetThemeObject.name}
                      onSelect={() => updateThemeConfig(presetThemeObject)}
                      className="flex items-center gap-4 py-2"
                    >
                      <ThemePresetColors
                        label={label}
                        properties={properties}
                      />

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
        <Color color={properties["primary"]!} className="pointer-events-none" />
        <Color
          color={properties["background"]!}
          className="pointer-events-none"
        />
        <Color
          color={properties["secondary"]!}
          className="pointer-events-none"
        />
        <Color color={properties["muted"]!} className="pointer-events-none" />
        <Color color={properties["card"]!} className="pointer-events-none" />
      </div>
      <span>{label}</span>
    </div>
  );
}
