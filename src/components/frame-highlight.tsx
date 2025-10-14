import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function FrameHighlight({
  children,
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <>
      {" "}
      <span className="relative h-fit text-nowrap px-1">
        <span className={cn("w-full", className)} {...props}>
          {children}
        </span>
        <span className="z absolute inset-0 h-full border border-primary/60 border-dashed bg-primary/15 px-1.5 group-hover:bg-primary/20 dark:border-primary/40">
          <Corner className="absolute top-[-2px] left-[-2px] fill-primary dark:fill-primary/70" />
          <Corner className="absolute top-[-2px] right-[-2px] fill-primary dark:fill-primary/70" />
          <Corner className="absolute bottom-[-2px] left-[-2px] fill-primary dark:fill-primary/70" />
          <Corner className="absolute right-[-2px] bottom-[-2px] fill-primary dark:fill-primary/70" />
        </span>
      </span>{" "}
    </>
  );
}

function Corner({ className }: ComponentProps<"svg">) {
  return (
    <svg
      className={cn("absolute", className)}
      height="5"
      viewBox="0 0 5 5"
      width="5"
    >
      <path d="M2 0h1v2h2v1h-2v2h-1v-2h-2v-1h2z" />
    </svg>
  );
}
