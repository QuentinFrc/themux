"use client";

import { SquareRoundCorner } from "lucide-react";

import { Label } from "../ui/label";
import { RadiusControls } from "./customizer-controls";

export function MiscControls() {
  return (
    <div className="space-y-6">
      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="flex flex-wrap gap-2 @max-lg:[&>*]:flex-1" />
      </section>
    </div>
  );
}

export { MiscControls as QuickCustomizer };
