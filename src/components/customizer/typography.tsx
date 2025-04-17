import { Label } from "@/components/ui/label";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { monoFontsArray, sansFontsArray, serifFontsArray } from "@/utils/fonts";
import { Check, Ligature } from "lucide-react";
import { ControlSection } from "./customizer-controls";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";

export function Typography({ className }: React.ComponentProps<"div">) {
  const { setConfig, currentFonts } = useThemeConfig();

  return (
    <section className={cn("space-y-1.5", className)}>
      <Label className="flex items-center gap-1 pb-2">
        <Ligature className="size-4" /> Typography
      </Label>

      <ControlSection
        title="Sans-Serif font"
        id="sans-serif-font"
        className="p-0"
      >
        <Command className={cn("", className)}>
          <CommandEmpty>No theme presets found.</CommandEmpty>
          <CommandGroup className="scrollbar-thin bg-background max-h-38 w-full overflow-y-auto font-sans">
            <section className="font-sans">
              <Label className="text-muted-foreground px-2 py-1 text-xs">
                Sans fonts
              </Label>
              {sansFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.sans;
                return (
                  <CommandItem
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => {
                        return {
                          ...prev,
                          fonts: {
                            ...prev.fonts,
                            sans: font.value,
                          },
                        };
                      })
                    }
                    className="group/item flex items-center gap-4 py-2 font-sans"
                    style={{ "--font-sans": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "text-muted-foreground/80 justify-end truncate text-xs text-nowrap opacity-0 transition",
                        "group-hover/item:opacity-100",
                      )}
                    >
                      This is just sample text
                    </span>
                    <Check
                      className={cn(
                        "ml-auto size-4 shrink-0 transition",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </section>

            <section className="font-serif">
              <Label className="text-muted-foreground px-2 py-1 text-xs">
                Serif fonts
              </Label>
              {serifFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.sans;
                return (
                  <CommandItem
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => {
                        return {
                          ...prev,
                          fonts: {
                            ...prev.fonts,
                            sans: font.value,
                          },
                        };
                      })
                    }
                    className="group/item flex items-center gap-4 py-2 font-sans"
                    style={{ "--font-sans": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "text-muted-foreground/80 justify-end truncate text-xs text-nowrap opacity-0 transition",
                        "group-hover/item:opacity-100",
                      )}
                    >
                      This is just sample text
                    </span>
                    <Check
                      className={cn(
                        "ml-auto size-4 shrink-0 transition",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                );
              })}
            </section>
          </CommandGroup>
        </Command>
      </ControlSection>

      <ControlSection
        title="Serif font"
        id="serif-font"
        className="p-0 font-serif"
      >
        <Command className={cn("", className)}>
          <CommandEmpty>No theme presets found.</CommandEmpty>
          <CommandGroup className="scrollbar-thin bg-background max-h-38 w-full overflow-y-auto">
            {serifFontsArray.map((font) => {
              const isActive = font.value === currentFonts?.serif;
              return (
                <CommandItem
                  key={font.key}
                  onSelect={() =>
                    setConfig((prev) => {
                      return {
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          serif: font.value,
                        },
                      };
                    })
                  }
                  className="group/item flex items-center gap-4 py-2 font-serif"
                  style={{ "--font-serif": font.value }}
                >
                  <span className="text-nowrap">{font.key}</span>
                  <span
                    className={cn(
                      "text-muted-foreground/80 justify-end truncate text-xs text-nowrap opacity-0 transition",
                      "group-hover/item:opacity-100",
                    )}
                  >
                    This is just sample text
                  </span>
                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0 transition",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </ControlSection>

      <ControlSection
        title="Mono font"
        id="mono-font"
        className="p-0 font-mono"
      >
        <Command className={cn("", className)}>
          <CommandEmpty>No theme presets found.</CommandEmpty>
          <CommandGroup className="scrollbar-thin bg-background max-h-38 w-full overflow-y-auto">
            {monoFontsArray.map((font) => {
              const isActive = font.value === currentFonts?.mono;
              return (
                <CommandItem
                  key={font.key}
                  onSelect={() =>
                    setConfig((prev) => {
                      return {
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          mono: font.value,
                        },
                      };
                    })
                  }
                  className="group/item flex items-center gap-4 py-2 font-mono"
                  style={{ "--font-mono": font.value }}
                >
                  <span className="text-nowrap">{font.key}</span>
                  <span
                    className={cn(
                      "text-muted-foreground/80 justify-end truncate text-xs text-nowrap opacity-0 transition",
                      "group-hover/item:opacity-100",
                    )}
                  >
                    let sampleText = "Hello!";
                  </span>
                  <Check
                    className={cn(
                      "ml-auto size-4 shrink-0 transition",
                      isActive ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </ControlSection>
    </section>
  );
}
