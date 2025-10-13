"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePathname } from "next/navigation";

import {
  CustomizerSidebar,
  CustomizerSidebarToggle,
} from "@/components/customizer/customizer-sidebar";
import { RandomizeButton } from "@/components/customizer/randomize-button";
import { ExternalLink } from "@/components/external-link";
import { GitHub } from "@/components/icons/github";
import { ModeSwitcher } from "@/components/mode-switcher";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ContainerWrapper } from "@/components/wrappers";
import { MainNavigation, MobileNavigation } from "../navigation";

const CUSTOMIZER_PATH = "/shadcn-themes";
const SIDEBAR_WIDTH = "21rem";

export default function ShellLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isCustomizer = pathname === CUSTOMIZER_PATH;

  const content = (
    <SidebarInset className="relative isolate max-h-svh overflow-hidden peer-data-[variant=inset]:max-h-[calc(100svh-1rem)]">
      <header className="isolate z-20 flex shrink-0 items-center gap-2 border-b md:z-10">
        <ContainerWrapper className="flex items-center justify-between">
          <div className="flex h-14 w-full items-center gap-2">
            {isCustomizer ? (
              <div className="inline-flex">
                <CustomizerSidebarToggle />
              </div>
            ) : null}

            <MainNavigation />
          </div>

          <div className="flex items-center justify-center gap-1">
            {isCustomizer ? (
              <TooltipWrapper label="Generate random theme" asChild>
                <RandomizeButton />
              </TooltipWrapper>
            ) : null}
            <ModeSwitcher />
            {isCustomizer ? (
              <Button
              className="group/toggle"
              size="icon"
              variant="ghost"
              asChild
            >
                <ExternalLink href="https://github.com/llanesluis/themux">
                  <GitHub />
                </ExternalLink>
              </Button>
            ) : null}

            <MobileNavigation />
          </div>
        </ContainerWrapper>
      </header>

      <ScrollArea className="relative z-10 flex h-full flex-col overflow-hidden">
        {children}
      </ScrollArea>
    </SidebarInset>
  );

  if (isCustomizer) {
    return (
      <SidebarProvider
        defaultOpen
        style={{ "--sidebar-width": SIDEBAR_WIDTH } as CSSProperties}
      >
        <CustomizerSidebar variant="inset" />
        {content}
      </SidebarProvider>
    );
  }

  return content;
}
