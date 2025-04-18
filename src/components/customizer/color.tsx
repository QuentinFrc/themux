"use client";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function Color({
  color,
  isActive,
  className,
  onClick,
  ...props
}: { color: string; isActive?: boolean } & ComponentProps<typeof Button>) {
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Button
        variant={"ghost"}
        className={cn("size-fit cursor-pointer rounded-lg p-1")}
      >
        <Skeleton
          className={cn(
            "bg-muted ring-border relative flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-lg ring",
          )}
        />
      </Button>
    );
  }

  return (
    <Button
      variant={"ghost"}
      className={cn(
        "size-fit cursor-pointer rounded-lg p-1",
        className,
        isActive &&
          "text-foreground border-primary/50 ring-primary/50 ring-[2px]",
      )}
      style={{ "--primary": color }}
      onClick={onClick}
      {...props}
    >
      <span
        className={cn(
          "bg-primary ring-foreground/20 relative flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow ring",
        )}
      />
    </Button>
  );
}
