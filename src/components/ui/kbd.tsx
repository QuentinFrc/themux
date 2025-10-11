import * as React from "react";

import { cn } from "@/lib/utils";

const Kbd = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "text-muted-foreground inline-flex min-h-5 items-center justify-center rounded border border-b-2 border-border bg-muted px-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.2em]",
          className,
        )}
        {...props}
      />
    );
  },
);
Kbd.displayName = "Kbd";

export { Kbd };
