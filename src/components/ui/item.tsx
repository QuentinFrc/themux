import * as React from "react";

import { cn } from "@/lib/utils";

const Item = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 rounded-lg border bg-card px-4 py-3 text-sm shadow-sm transition-colors",
          className,
        )}
        {...props}
      />
    );
  },
);
Item.displayName = "Item";

export { Item };
