import { cn } from "@/lib/utils";
import React from "react";
import { PresetsControls } from "./customizer-controls";
import { Shadcn } from "./icons/shadcn";
import { Label } from "./ui/label";

export function Customizer({ className }: React.ComponentProps<"div">) {
  return (
    <div className={cn("@container relative w-full space-y-4", className)}>
      <div className="flex flex-col gap-8">
        <section className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <Shadcn className="size-4" /> Shadcn presets
          </Label>
          <PresetsControls className="grid grid-cols-3 gap-2 @sm:grid-cols-4 @md:flex @md:flex-wrap @3xl:max-w-[85px] @3xl:text-sm" />
        </section>
      </div>
    </div>
  );
}
