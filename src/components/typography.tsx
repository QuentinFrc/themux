import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Clock, Ligature } from "lucide-react";
import { ControlSection } from "./customizer-controls";
import { ComingSoon } from "./coming-soon";

export function Typography({ className }: React.ComponentProps<"div">) {
  return (
    <section className={cn("space-y-1.5", className)}>
      <Label className="flex items-center gap-1 pb-2">
        <Ligature className="size-4" /> Typography
      </Label>

      <ControlSection
        title="Sans-Serif font"
        id="sans-serif-font"
        className="font-sans"
      >
        <ComingSoon />
      </ControlSection>

      <ControlSection title="Serif font" id="serif-font" className="font-serif">
        <ComingSoon />
      </ControlSection>

      <ControlSection title="Mono font" id="mono-font" className="font-mono">
        <ComingSoon />
      </ControlSection>
    </section>
  );
}
