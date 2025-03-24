import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface SectionWrapperProps extends ComponentProps<"div"> {
  withCane?: boolean;
}

function SectionWrapper({
  children,
  className,
  withCane = false,
  ...props
}: SectionWrapperProps) {
  if (withCane) {
    return (
      <div
        className={cn("relative isolate my-8 md:my-10 lg:my-12", className)}
        {...props}
      >
        {children}
        <div className="inset-x-0 top-0 hidden h-10 -translate-y-full border-y bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed xl:absolute xl:block" />
        <div className="inset-x-0 bottom-0 hidden h-10 translate-y-full border-y bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed xl:absolute xl:block" />
      </div>
    );
  }

  return (
    <div
      className={cn("relative py-8 md:py-10 lg:py-12", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface ContainerWrapperProps extends ComponentProps<"div"> {
  withCane?: boolean;
}

// My implementarion with cane
function ContainerWrapper({
  children,
  className,
  withCane = false,
  ...props
}: ContainerWrapperProps) {
  if (withCane) {
    return (
      <div
        className={cn(
          "relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8",
          className,
        )}
        {...props}
      >
        {children}
        <div className="inset-y-0 left-0 hidden w-10 -translate-x-full border-x bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed xl:absolute xl:block" />
        <div className="inset-y-0 right-0 hidden w-10 translate-x-full border-x bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed xl:absolute xl:block" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { ContainerWrapper, SectionWrapper };
