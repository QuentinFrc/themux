"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export function CollapsibleThemeCustomizerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <header>
          <h1 className="flex items-center gap-4 text-4xl font-bold">
            Tailwind CSS v4 shadcn/ui theme customizer
          </h1>
        </header>

        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant={"ghost"}
          className="relative flex items-center justify-between gap-2"
        >
          {isExpanded ? "Collapse" : "Expand"}
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
