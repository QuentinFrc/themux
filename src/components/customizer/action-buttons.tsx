"use client";

import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { ModeSwitcher } from "../mode-switcher";
import { TooltipWrapper } from "../tooltip-wrapper";
import { Separator } from "../ui/separator";
import { ContrastChecker } from "./contrast-checker";
import { CustomizerSettings } from "./customizer-settings";
import { UpdateThemeButton } from "./update-theme-button";
import { VersionHistoryDialog } from "./version-history-dialog";

interface ActionButtonsProps extends ComponentProps<"section"> {
  className?: string;
}

export function ActionButtons({ className }: ActionButtonsProps) {
  return (
    <div
      className={cn(
        "@container flex min-h-0 w-full flex-wrap items-center justify-between gap-2",
        className
      )}
    >
      <section className="flex grow flex-wrap items-center gap-2">
        <TooltipWrapper asChild label="Persist the current theme">
          <UpdateThemeButton className="flex-1" size="sm" variant="default" />
        </TooltipWrapper>
        <VersionHistoryDialog className="@md:w-auto flex-1" />
      </section>

      <Separator
        className="@xl:inline-flex hidden min-h-6"
        orientation="vertical"
      />

      <section className="flex @max-[375px]:w-full items-center justify-between gap-2">
        <div className="@md:hidden">
          <TooltipWrapper asChild label="Toggle light/dark">
            <ModeSwitcher />
          </TooltipWrapper>
        </div>

        <TooltipWrapper asChild label="Check contrast ratio">
          <ContrastChecker />
        </TooltipWrapper>

        {/* TODO: Import CSS variables button */}
        {/* <TooltipWrapper label="Bring your CSS variables" asChild>
          <Button size="sm" variant="ghost" disabled>
            <FileCode2 />
            <span className="hidden @xl:inline-flex">Import</span>
            <span className="sr-only">Import CSS variables</span>
          </Button>
        </TooltipWrapper> */}

        <TooltipWrapper asChild label="Configure the customizer">
          <CustomizerSettings variant="ghost" />
        </TooltipWrapper>
      </section>
    </div>
  );
}
