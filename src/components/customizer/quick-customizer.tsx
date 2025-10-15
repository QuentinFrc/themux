"use client";

import { ArrowUpDown, Layers, SquareRoundCorner, SunMedium } from "lucide-react";

import { Label } from "../ui/label";
import {
  RadiusControls,
  ShadowsControl,
  SurfaceShadesControl,
} from "./customizer-controls";
import { ComingSoon } from "./coming-soon";

export function MiscControls() {
  return (
    <div className="space-y-6">
      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SquareRoundCorner className="size-4" /> Radius
        </Label>
        <RadiusControls className="flex flex-wrap gap-2 @max-lg:[&>*]:flex-1" />
      </section>

      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <Layers className="size-4" /> Surface
        </Label>
        <div className="space-y-3 rounded-lg border border-border/60 bg-background/60 p-4 shadow-sm">
          <SurfaceShadesControl className="bg-transparent" />
          <p className="text-muted-foreground text-xs">
            For background, card, popover, muted, accent…
          </p>
        </div>
      </section>

      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <SunMedium className="size-4" /> Shadows
        </Label>
        <div className="rounded-lg border border-border/60 bg-background/60 p-4 shadow-sm">
          <ShadowsControl />
        </div>
      </section>

      <section className="space-y-1.5">
        <Label className="flex items-center gap-1 pb-2">
          <ArrowUpDown className="size-4" /> Spacing
        </Label>
        <div className="rounded-lg border border-border/60 bg-background/60 p-4 shadow-sm">
          <ComingSoon />
        </div>
      </section>
    </div>
  );
}

export { MiscControls as QuickCustomizer };
