import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export function FrameHighlight({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-primary-300/60 bg-primary/15 group-hover:bg-primary/20 dark:border-primary/40 absolute inset-0 border border-dashed",
        className,
      )}
      {...props}
    >
      {children}

      <Corner className="fill-primary dark:fill-primary/50 absolute top-[-2px] left-[-2px]" />
      <Corner className="fill-primary dark:fill-primary/50 absolute top-[-2px] right-[-2px]" />
      <Corner className="fill-primary dark:fill-primary/50 absolute bottom-[-2px] left-[-2px]" />
      <Corner className="fill-primary dark:fill-primary/50 absolute right-[-2px] bottom-[-2px]" />
    </span>
  );
}

function Corner({ className }: ComponentProps<"svg">) {
  return (
    <svg
      width="5"
      height="5"
      viewBox="0 0 5 5"
      className={cn("absolute", className)}
    >
      <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z"></path>
    </svg>
  );
}
