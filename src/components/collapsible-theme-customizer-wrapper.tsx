"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React, { ComponentProps, use } from "react";
import { ThemeCustomizer } from "./theme-customizer";
import { Button } from "./ui/button";
import { ContainerWrapper } from "./wrappers";

const CollapsibleCustomizerContext = React.createContext<{
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isExpanded: false, setIsExpanded: () => {} });

export function CollapsibleCustomizerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <CollapsibleCustomizerContext value={{ isExpanded, setIsExpanded }}>
      {children}
    </CollapsibleCustomizerContext>
  );
}

export function CollapsibleCustomizer({
  className,
  children,
}: ComponentProps<"div">) {
  const { isExpanded } = use(CollapsibleCustomizerContext);

  return (
    <>
      <div className={cn(className)}>{children}</div>

      <div className="@container w-full">
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <ContainerWrapper withCane className="py-2 pb-4">
              <ThemeCustomizer />
            </ContainerWrapper>
          </div>
        </div>
      </div>
    </>
  );
}

export function CollapsibleCustomizerTrigger({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { isExpanded, setIsExpanded } = use(CollapsibleCustomizerContext);

  return (
    <Button
      onClick={() => setIsExpanded(!isExpanded)}
      variant="ghost"
      className={cn("relative min-w-30", className)}
      {...props}
    >
      <span>{isExpanded ? "Collapse customizer" : "Expand customizer"}</span>
      <ChevronUp
        className={cn(
          "size-6 transition",
          isExpanded ? "rotate-0" : "rotate-180",
        )}
      />
      <div
        className={cn(
          "bg-primary absolute top-0 right-0 size-2 rounded-full transition-opacity duration-300 ease-in-out",
          isExpanded ? "opacity-0" : "animate-bounce opacity-100",
        )}
      />
    </Button>
  );
}
