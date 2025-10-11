import * as React from "react";

import { cn } from "@/lib/utils";

const ButtonGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "inline-flex items-center gap-px rounded-lg border bg-muted/40 p-1 shadow-sm",
          className,
        )}
        {...props}
      />
    );
  },
);
ButtonGroup.displayName = "ButtonGroup";

interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const ButtonGroupItem = React.forwardRef<HTMLButtonElement, ButtonGroupItemProps>(
  ({ className, isActive, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-pressed={isActive}
        className={cn(
          "inline-flex min-h-9 min-w-9 items-center justify-center rounded-md border border-transparent bg-transparent px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          isActive && "bg-background text-foreground shadow",
          className,
        )}
        {...props}
      />
    );
  },
);
ButtonGroupItem.displayName = "ButtonGroupItem";

export { ButtonGroup, ButtonGroupItem };
