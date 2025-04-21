"use client";

import { cn } from "@/lib/utils";
import { Contrast, FileCode2 } from "lucide-react";
import { ComponentProps } from "react";
import { ModeSwitcher } from "../mode-switcher";
import { TooltipWrapper } from "../tooltip-wrapper";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { CopyCodeButtonDialog } from "./copy-code-button-dialog";
import { CustomizerSettings } from "./customizer-settings";
import { RandomizeButton } from "./randomize-button";
import { ResetButton } from "./reset-button";

interface ActionButtonsProps extends ComponentProps<"section"> {
  className?: string;
}

export function ActionButtons({ className }: ActionButtonsProps) {
  return (
    <div
      className={cn(
        "@container flex min-h-0 w-full flex-wrap items-center justify-between gap-2",
        className,
      )}
    >
      <section className="flex flex-1 items-center gap-2">
        <TooltipWrapper label="View generated code" asChild>
          <CopyCodeButtonDialog size="sm" className="grow" variant="outline" />
        </TooltipWrapper>
      </section>

      <section className="flex items-center justify-between gap-2 @max-[375px]:w-full">
        <TooltipWrapper label="Toggle light/dark" asChild>
          <ModeSwitcher />
        </TooltipWrapper>

        <TooltipWrapper label="Generate random theme" asChild>
          <RandomizeButton />
        </TooltipWrapper>

        <Separator
          orientation="vertical"
          className="hidden min-h-6 @xl:inline-flex"
        />

        {/* TODO: Contrast checker button */}
        <TooltipWrapper label="Check contrast ratio" asChild>
          <Button size="sm" variant="ghost" disabled>
            <Contrast />
            <span className="hidden @xl:inline-flex">Contrast</span>
            <span className="sr-only">Check constrast</span>
          </Button>
        </TooltipWrapper>

        {/* TODO: Import CSS variables button */}
        <TooltipWrapper label="Bring your CSS variables" asChild>
          <Button size="sm" variant="ghost" disabled>
            <FileCode2 />
            <span className="hidden @xl:inline-flex">Import</span>
            <span className="sr-only">Import CSS variables</span>
          </Button>
        </TooltipWrapper>

        <TooltipWrapper label="Options to reset tokens" asChild>
          <ResetButton size="sm" variant="ghost" />
        </TooltipWrapper>

        <TooltipWrapper label="Configure the customizer" asChild>
          <CustomizerSettings variant="ghost" />
        </TooltipWrapper>
      </section>
    </div>
  );
}
