"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { ComponentProps } from "react";

export function CustomizerSettings({
  bothModesInSync,
  setBothModesInSync,
  className,
}: {
  bothModesInSync: boolean;
  setBothModesInSync: (v: boolean) => void;
} & ComponentProps<"div">) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          <Settings />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("p-0", className)} align="end">
        <header className="text-muted-foreground px-4 py-2 text-sm font-semibold">
          Customizer settings
        </header>
        <Separator />
        <section className="grid px-4 pt-2 pb-4">
          <Label className="text-muted-foreground py-1 text-xs">
            Color tokens
          </Label>
          <div className="flex items-center rounded-lg">
            <span className="text-sm">Sync light and dark modes</span>
            <Switch
              className="ml-auto"
              checked={bothModesInSync}
              onCheckedChange={(isActive) => setBothModesInSync(isActive)}
            />
          </div>
        </section>
      </PopoverContent>
    </Popover>
  );
}
