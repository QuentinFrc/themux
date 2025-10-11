"use client";

import { Spinner } from "@/components/ui/spinner";

export function SpinnerDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <Spinner className="size-5" />
        <span>Small</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <Spinner className="size-7 text-primary" />
        <span>Default</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-xs text-muted-foreground">
        <Spinner className="size-9 text-foreground" />
        <span>Large</span>
      </div>
    </div>
  );
}
