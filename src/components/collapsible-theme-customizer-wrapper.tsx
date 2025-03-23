"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React from "react";
import { FrameHighlight } from "./frame-highlight";
import { PageHeader } from "./page-header";
import { Button } from "./ui/button";

export function CollapsibleThemeCustomizerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className="@container w-full">
      <div className="flex flex-col items-center justify-between gap-4 @5xl:flex-row">
        <PageHeader
          heading={
            <>
              shadcn/ui customizer with
              <br className="@4xl:hidden" />
              <span className="relative h-fit px-1.5">
                Tailwind v4
                <FrameHighlight />
              </span>
            </>
          }
          description={
            "Generate a theme for your app and copy-paste the generated css variables, ready for Tailwind CSS v4."
          }
        />

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={"ghost"}
          className="relative flex items-center justify-between gap-2"
        >
          {isExpanded ? "Collapse customizer" : "Expand customizer"}
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
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
