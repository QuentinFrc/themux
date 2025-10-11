import * as React from "react";

import { cn } from "@/lib/utils";

const Empty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed bg-muted/20 p-6 text-center text-sm text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children ?? (
          <>
            <span className="font-medium">Nothing here yet</span>
            <span className="text-xs text-muted-foreground">Add or import content to get started.</span>
          </>
        )}
      </div>
    );
  },
);
Empty.displayName = "Empty";

export { Empty };
