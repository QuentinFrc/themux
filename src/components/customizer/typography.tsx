import { Check, Ligature } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { monoFontsArray, sansFontsArray, serifFontsArray } from "@/utils/fonts";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { ControlSection } from "./customizer-controls";

export function Typography({ className }: React.ComponentProps<"div">) {
  const { setConfig, currentFonts } = useThemeConfig();

  return (
    <section className={cn("space-y-1.5", className)}>
      <Label className="flex items-center gap-1 pb-2">
        <Ligature className="size-4" /> Typography
      </Label>

      <ControlSection className="p-0" expanded id="sans-font" title="Sans font">
        <Command className={cn("bg-background", className)}>
          <CommandInput className="text-base" />

          <ScrollArea className="flex max-h-72 flex-col">
            <CommandEmpty>
              <span className="text-muted-foreground">No fonts found.</span>
            </CommandEmpty>
            <CommandGroup className="font-sans" heading="Sans fonts">
              {sansFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.sans;
                return (
                  <CommandItem
                    className="group/item flex items-center gap-4 py-2 font-sans"
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          sans: font.value,
                        },
                      }))
                    }
                    style={{ "--font-sans": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "line-clamp-1 text-muted-foreground/80 text-xs opacity-0 transition",
                        "group-hover/item:opacity-100"
                      )}
                    >
                      This is just sample text
                    </span>
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

            <CommandGroup className="w-full font-serif" heading="Serif fonts">
              {serifFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.sans;
                return (
                  <CommandItem
                    className="group/item flex items-center gap-4 py-2 font-sans"
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          sans: font.value,
                        },
                      }))
                    }
                    style={{ "--font-sans": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "line-clamp-1 text-muted-foreground/80 text-xs opacity-0 transition",
                        "group-hover/item:opacity-100"
                      )}
                    >
                      This is just sample text
                    </span>
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

            <CommandGroup className="font-mono" heading="Mono fonts">
              {monoFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.sans;
                return (
                  <CommandItem
                    className="group/item flex items-center gap-4 py-2 font-mono"
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          sans: font.value,
                        },
                      }))
                    }
                    style={{ "--font-mono": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "line-clamp-1 text-muted-foreground/80 text-xs opacity-0 transition",
                        "group-hover/item:opacity-100"
                      )}
                    >
                      let sampleText = "Hello!";
                    </span>
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
          </ScrollArea>
        </Command>
      </ControlSection>

      <ControlSection
        className="p-0 font-serif"
        id="serif-font"
        title="Serif font"
      >
        <Command className={cn("bg-background", className)}>
          <CommandInput className="text-base" />

          <ScrollArea className="flex max-h-47 flex-col">
            <CommandEmpty>
              <span className="text-muted-foreground">No fonts found.</span>
            </CommandEmpty>
            <CommandGroup>
              {serifFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.serif;
                return (
                  <CommandItem
                    className="group/item flex items-center gap-4 py-2 font-serif"
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          serif: font.value,
                        },
                      }))
                    }
                    style={{ "--font-serif": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "line-clamp-1 text-muted-foreground/80 text-xs opacity-0 transition",
                        "group-hover/item:opacity-100"
                      )}
                    >
                      This is just sample text
                    </span>
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
          </ScrollArea>
        </Command>
      </ControlSection>

      <ControlSection
        className="p-0 font-mono"
        id="mono-font"
        title="Mono font"
      >
        <Command className={cn("bg-background", className)}>
          <CommandInput className="text-base" />

          <ScrollArea className="flex max-h-47 flex-col">
            <CommandEmpty>
              <span className="text-muted-foreground">No fonts found.</span>
            </CommandEmpty>
            <CommandGroup>
              {monoFontsArray.map((font) => {
                const isActive = font.value === currentFonts?.mono;
                return (
                  <CommandItem
                    className="group/item relative flex w-full items-center gap-4 py-2 font-mono"
                    key={font.key}
                    onSelect={() =>
                      setConfig((prev) => ({
                        ...prev,
                        fonts: {
                          ...prev.fonts,
                          mono: font.value,
                        },
                      }))
                    }
                    style={{ "--font-mono": font.value }}
                  >
                    <span className="text-nowrap">{font.key}</span>
                    <span
                      className={cn(
                        "line-clamp-1 text-muted-foreground/80 text-xs opacity-0 transition",
                        "group-hover/item:opacity-100"
                      )}
                    >
                      echo "hello world"
                    </span>
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
          </ScrollArea>
        </Command>
      </ControlSection>
    </section>
  );
}
