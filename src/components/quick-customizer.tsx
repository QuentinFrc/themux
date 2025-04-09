"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { useSettings } from "@/hooks/use-settings";
import { surfaceShadesPresetArray, surfaceShadesPresets } from "@/lib/colors";
import { TAILWIND_SHADES, TailwindShadeKey } from "@/lib/palettes";
import { cn } from "@/lib/utils";
import { OklchValue, SurfaceShadesPreset, ThemeMode } from "@/types/theme";
import { convertToOklch } from "@/utils/color-converter";
import { getOptimalForegroundColor, isValidColor } from "@/utils/colors";
import {
  BrickWall,
  Check,
  ChevronDown,
  ClipboardPaste,
  Paintbrush,
  SendHorizontal,
  SquareRoundCorner,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  ChangeEvent,
  ComponentProps,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { Color } from "./color";
import { CopyCodeButtonDialog } from "./copy-code-button-dialog";
import { RadiusControls, ThemeModeControls } from "./customizer";
import { CustomizerSettings } from "./customizer-settings";
import { ResetButton } from "./reset-button";
import { MemoizedTailwindV4ColorPalette } from "./tailwind-v4-palette";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "./ui/command";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

const PLACEHOLDERS = [
  "oklch(0.685 0.169 237.323)",
  "hsl(199.18 100% 47.843%)",
  "rgb(0, 166, 244)",
  "#00a6f4",
];

export function QuickCustomizer() {
  const { getColorToken, setPrimaryColorTokens } = useColorTokens();

  const { modesInSync } = useSettings();
  const [shade, setShade] = useState<TailwindShadeKey>("500");

  return (
    <div className="@container flex flex-wrap items-start gap-6 sm:flex-row">
      {/* Paste your primary color */}
      <section className="grow space-y-1.5 md:flex-1">
        <Label className="flex items-center gap-1 pb-2">
          <ClipboardPaste className="size-4" /> Paste your primary color
        </Label>
        <PasteColorControl
          setColorTokens={setPrimaryColorTokens}
          modesInSync={modesInSync}
        />
      </section>

      {/* Theme modes */}
      <section className="relative grow space-y-1.5 sm:flex-1">
        <Label className="flex items-center gap-1 pb-2">
          <SunMoon className="size-4" /> Mode
        </Label>
        <ThemeModeControls
          showSystem={false}
          className="flex flex-row gap-2 @6xl:flex-col"
        />
      </section>

      {/* Primary color */}
      <section className="grow space-y-1.5">
        <div className="flex items-start justify-between gap-2 pb-1">
          <Label className="flex items-center gap-1">
            <Paintbrush className="size-4" /> Primary color
          </Label>
          <Label className="text-muted-foreground flex gap-1">
            Shade
            <Select
              value={shade}
              onValueChange={(v: TailwindShadeKey) => setShade(v)}
            >
              <SelectTrigger
                size="sm"
                className="data-[size=sm]:h-5 data-[size=sm]:px-2 data-[size=sm]:text-xs"
              >
                <SelectValue defaultValue={shade} />
              </SelectTrigger>
              <SelectContent className="w-fit min-w-0">
                <SelectGroup>
                  <SelectLabel>Shade</SelectLabel>
                  {TAILWIND_SHADES.map((shade) => (
                    <SelectItem value={shade} key={shade}>
                      {shade}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </div>
        <div className="grid w-full shrink-0 grid-cols-11 gap-1.5">
          <MemoizedTailwindV4ColorPalette
            currentColor={getColorToken({
              property: "primary",
            })}
            shade={shade}
            className="contents"
            modesInSync={modesInSync}
          />
        </div>
      </section>

      {/* Surface shades */}
      <section className="relative grow space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <BrickWall className="size-4" />
          Surface shades
        </Label>
        <SurfaceShadesControl />
      </section>

      {/* Radius */}
      <section className="relative grow space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="grid w-auto grid-cols-6 gap-2 @6xl:grid-cols-3" />
      </section>

      {/* Action buttons */}
      <section className="grid grow grid-cols-[3fr_1fr] place-content-center items-center gap-2 self-baseline-last sm:grid-cols-[2fr_1fr] xl:grid-cols-1">
        <CopyCodeButtonDialog size="sm" />
        <div className="flex w-full gap-1">
          <ResetButton variant="outline" size="sm" className="grow" />
          <CustomizerSettings />
        </div>
      </section>
    </div>
  );
}

export function PasteColorControl({
  className,
  setColorTokens,
  modesInSync,
  ...props
}: {
  setColorTokens: (args: {
    primaryColor: OklchValue;
    modesInSync: boolean;
  }) => void;
  modesInSync: boolean;
} & ComponentProps<"div">) {
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [pastedColor, setPastedColor] = useState("");
  const isValidPastedColor = isValidColor(pastedColor);
  const { setPrimaryColorTokens } = useColorTokens();

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

    if (!pastedColor) return;
    if (!isValidPastedColor) {
      toast.error("Invalid color format.");
      return;
    }

    const newOklchColor = convertToOklch(pastedColor);
    setPrimaryColorTokens({
      primaryColor: newOklchColor,
      modesInSync: modesInSync,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPastedColor(event.target.value);
  };

  return (
    <div className={cn("min-w-48", className)}>
      <form
        className="relative flex items-center gap-1 overflow-hidden rounded-lg border p-1"
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
            "--pasted-color": isValidPastedColor
              ? convertToOklch(pastedColor)
              : "",
            "--pasted-color-foreground": isValidPastedColor
              ? getOptimalForegroundColor(convertToOklch(pastedColor))
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
        <div className="group scaled relative flex h-10 w-full shrink-0 items-center justify-between gap-1 rounded-lg border p-1 px-2">
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

      <PopoverContent
        className="scaled w-auto overflow-hidden p-0"
        align="start"
      >
        <Command className="w-full">
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
