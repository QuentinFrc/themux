import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface PageHeaderProps extends ComponentProps<"header"> {
  heading: React.ReactNode;
  description: React.ReactNode;
}

export function PageHeader({
  heading,
  description,
  children,
  className,
  ...props
}: PageHeaderProps) {
  if (children) {
    return (
      <header
        className={cn("space-y-2 p-2 text-center @4xl:text-left", className)}
        {...props}
      >
        {children}
      </header>
    );
  }

  return (
    <header className="space-y-2 p-2 text-center @4xl:text-left">
      <h1 className="flex h-fit flex-col items-center gap-x-2 text-4xl font-bold @3xl:flex-row">
        {heading}
      </h1>
      <p className="text-muted-foreground mx-auto text-sm text-balance">
        {description}
      </p>
    </header>
  );
}
