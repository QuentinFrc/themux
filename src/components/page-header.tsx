import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: ComponentProps<"section">) {
  return (
    <section className={cn("", className)} {...props}>
      <div className="flex flex-col items-start gap-1">{children}</div>
    </section>
  );
}

function PageHeaderHeading({ className, ...props }: ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-bold text-2xl leading-tight tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]",
        className
      )}
      {...props}
    />
  );
}

function PageHeaderDescription({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "max-w-3xl text-balance font-light text-muted-foreground text-sm sm:text-base",
        className
      )}
      {...props}
    />
  );
}

function PageActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-start gap-2 pt-2",
        className
      )}
      {...props}
    />
  );
}

export { PageActions, PageHeader, PageHeaderDescription, PageHeaderHeading };
