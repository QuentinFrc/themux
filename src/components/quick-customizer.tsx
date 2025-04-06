"use client";

import { useColorTokens } from "@/hooks/use-color-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { convertToOklch } from "@/utils/color-converter";
import { getOptimalForegroundColor, isValidColor } from "@/utils/colors";
import {
  ClipboardPaste,
  Droplet,
  Moon,
  SendHorizontal,
  SquareRoundCorner,
  Sun,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { MemoizedTailwindV4ColorPalette } from "./tailwind-v4-palette";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Switch } from "./ui/switch";
import { RadiusControls } from "./customizer";

const PLACEHOLDERS = [
  "oklch(0.685 0.169 237.323)",
  "hsl(199.18 100% 47.843%)",
  "rgb(0, 166, 244)",
  "#00a6f4",
];

export function QuickCustomizer() {
  const { resolvedTheme } = useTheme();
  const { getColorToken, setPrimaryColorTokens } = useColorTokens();
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0]);
  const [pastedColor, setPastedColor] = useState("");
  const isValidPastedColor = isValidColor(pastedColor);
  const [bothModes, setBothModes] = useState(false);
  const isMounted = useMounted();

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
      bothModes: bothModes,
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPastedColor(event.target.value);
  };

  const isLightOnly = isMounted && resolvedTheme === "light" && !bothModes;
  const isDarkOnly = isMounted && resolvedTheme === "dark" && !bothModes;

  return (
    <div className="flex h-full flex-wrap items-start gap-6 sm:flex-row">
      <section className="flex flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between gap-4">
          <Label className="flex items-center gap-1">
            <Droplet className="size-4" /> Primary color
          </Label>
          <Label className="flex items-center gap-1">
            {!isMounted && <Skeleton className="h-3 w-30" />}
            {bothModes && (
              <>
                Both modes
                <SunMoon
                  className={cn(
                    "size-4 transition",
                    bothModes ? "scale-100" : "scale-0",
                  )}
                />
              </>
            )}
            {isLightOnly && (
              <>
                Light mode only
                <Sun
                  className={cn(
                    "size-4 transition",
                    isLightOnly ? "scale-100" : "scale-0",
                  )}
                />
              </>
            )}
            {isDarkOnly && (
              <>
                Dark mode only
                <Moon
                  className={cn(
                    "size-4 transition",
                    isDarkOnly ? "scale-100" : "scale-0",
                  )}
                />
              </>
            )}
            <Switch checked={bothModes} onCheckedChange={setBothModes} />
          </Label>
        </div>
        <div className="grid shrink-0 grid-cols-11 gap-1.5">
          <MemoizedTailwindV4ColorPalette
            currentColor={getColorToken({
              property: "primary",
            })}
            shade="500"
            className="contents"
            bothModes={bothModes}
          />
        </div>
      </section>

      <section className="flex flex-col items-start gap-2">
        <Label className="flex items-center gap-1">
          <ClipboardPaste className="size-4" /> Paste your primary color
        </Label>
        <div className="relative flex flex-col gap-1">
          <form
            className="relative flex shrink-0 items-center gap-1 overflow-hidden rounded-lg border px-1"
            onSubmit={handleSubmitColorPaste}
          >
            <Input
              type="text"
              id="pasted-color"
              onChange={handleInputChange}
              className={cn(
                "h-fit w-40 shrink-0 font-mono lowercase outline transition",
                !isValidColor && "outline-destructive",
              )}
              placeholder={placeholder}
              value={pastedColor}
            />
            <Button
              variant="ghost"
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
      </section>

      {/* <section className="flex flex-col items-start gap-2">
        <Label className="flex items-center gap-1">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="grid grid-cols-6 gap-2 @5xl:grid-cols-3" />
      </section> */}
    </div>
  );
}
