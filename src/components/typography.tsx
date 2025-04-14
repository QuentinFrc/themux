import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Clock, Ligature } from "lucide-react";
import { ControlSection } from "./customizer-controls";
import { ComingSoon } from "./coming-soon";
import { monoFontsArray, sansFonts, sansFontsArray } from "@/utils/fonts";
import { Button } from "./ui/button";
import { useThemeConfig } from "@/hooks/use-theme-config";

export function Typography({ className }: React.ComponentProps<"div">) {
  const { setConfig } = useThemeConfig();
  return (
    <section className={cn("space-y-1.5", className)}>
      <Label className="flex items-center gap-1 pb-2">
        <Ligature className="size-4" /> Typography
      </Label>

      <ControlSection title="Sans font" id="sans-font" className="font-sans">
        {/* <ComingSoon /> */}
        {sansFontsArray.map((font) => {
          return (
            <Button
              variant="ghost"
              key={font.label}
              className="font-sans"
              style={{ "--font-sans": font.value }}
              onClick={() =>
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
            >
              {font.label}
            </Button>
          );
        })}
      </ControlSection>

      <ControlSection title="Serif font" id="serif-font" className="font-serif">
        <ComingSoon />
      </ControlSection>

      <ControlSection title="Mono font" id="mono-font" className="font-mono">
        {monoFontsArray.map((font) => {
          return (
            <Button
              variant="ghost"
              key={font.label}
              className="font-mono"
              style={{ "--font-mono": font.value }}
              onClick={() =>
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
            >
              {font.label}
            </Button>
          );
        })}
      </ControlSection>
    </section>
  );
}
