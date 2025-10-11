import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type InputGroupProps = React.HTMLAttributes<HTMLDivElement>;

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-stretch overflow-hidden rounded-lg border bg-background divide-x divide-border",
          className,
        )}
        {...props}
      />
    );
  },
);
InputGroup.displayName = "InputGroup";

interface InputGroupItemProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  asChild?: boolean;
}

const baseItemClasses =
  "flex h-10 min-w-0 items-center rounded-none border-0 bg-transparent px-3 py-2 text-sm shadow-none outline-none ring-0 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 first:rounded-l-lg last:rounded-r-lg";

const InputGroupItem = React.forwardRef<HTMLElement, InputGroupItemProps>(
  ({ asChild = true, className, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<any>}
          className={cn(className, baseItemClasses)}
          {...props}
        />
      );
    }

    return (
      <input
        ref={ref as React.Ref<HTMLInputElement>}
        className={cn(className, baseItemClasses)}
        {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
      />
    );
  },
);
InputGroupItem.displayName = "InputGroupItem";

const InputGroupText = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-muted-foreground inline-flex h-10 items-center gap-2 bg-muted px-3 text-xs font-semibold uppercase tracking-[0.2em] first:rounded-l-lg last:rounded-r-lg",
          className,
        )}
        {...props}
      />
    );
  },
);
InputGroupText.displayName = "InputGroupText";

const InputGroupAddon = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "text-muted-foreground inline-flex h-10 items-center bg-muted/60 px-3 text-sm first:rounded-l-lg last:rounded-r-lg",
          className,
        )}
        {...props}
      />
    );
  },
);
InputGroupAddon.displayName = "InputGroupAddon";

interface InputGroupButtonProps extends React.ComponentPropsWithoutRef<typeof Slot> {
  asChild?: boolean;
}

const InputGroupButton = React.forwardRef<HTMLElement, InputGroupButtonProps>(
  ({ asChild = true, className, ...props }, ref) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<any>}
          className={cn(
            className,
            "inline-flex h-10 items-center justify-center rounded-none border-0 px-3 text-sm font-medium transition-colors first:rounded-l-lg last:rounded-r-lg",
          )}
          {...props}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          className,
          "inline-flex h-10 items-center justify-center rounded-none border-0 bg-muted px-3 text-sm font-medium transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring first:rounded-l-lg last:rounded-r-lg",
        )}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    );
  },
);
InputGroupButton.displayName = "InputGroupButton";

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupItem, InputGroupText };
