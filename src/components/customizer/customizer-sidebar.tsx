"use client";

import { PaintBucket, Palette, SlidersHorizontal, X } from "lucide-react";
import type * as React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ActionButtons } from "./action-buttons";
import { ColorTokens } from "./color-tokens";
import { ComingSoon } from "./coming-soon";
import {
  AllPresetsControl,
  ControlSection,
  ControlsSkeleton,
  RadiusSliderControl,
  ShadowsControl,
  SurfaceShadesControl,
} from "./customizer-controls";
import { Typography } from "./typography";

export function CustomizerSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Sidebar className="overflow-hidden" {...props}>
        <SidebarHeader className="px-2 pr-3 max-md:pt-4">
          <Skeleton className="h-9 bg-muted" />
        </SidebarHeader>

        <SidebarContent className="scrollbar-thin @container relative flex max-h-svh flex-col py-2 group-data-[collapsible=icon]:invisible [&>button]:hidden">
          <div className="flex grow flex-col space-y-4 overflow-hidden px-2 pr-3">
            <ControlsSkeleton className="h-10" />

            <div className="grow overflow-hidden">
              <ControlsSkeleton className="h-200" />
            </div>
          </div>
        </SidebarContent>

        <SidebarFooter className="space-y-1 px-2 pr-3">
          <Skeleton className="h-8 bg-muted" />
          <Skeleton className="h-8 bg-muted" />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar className="overflow-hidden" {...props}>
      <Tabs
        className="flex flex-1 flex-col gap-0 overflow-hidden"
        defaultValue="palette"
      >
        <SidebarHeader className="px-2 pr-3 max-md:pt-4">
          <TabsList className="w-full p-1">
            <TabsTrigger className="text-xs" value="palette">
              Palette
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="tokens">
              Tokens
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="typography">
              Typography
            </TabsTrigger>
          </TabsList>
        </SidebarHeader>

        <SidebarContent className="@container relative my-0 max-h-svh pt-2 pb-0 group-data-[collapsible=icon]:invisible [&>button]:hidden">
          <ScrollArea className="flex flex-col overflow-hidden px-2 pr-1">
            <TabsContent
              className="mr-2 mb-2 flex flex-col space-y-4"
              value="palette"
            >
              <section className="flex-1 space-y-1.5 max-sm:w-full max-sm:max-w-full">
                <Label className="flex items-center gap-1 pb-2">
                  <PaintBucket className="size-4" /> Theme presets
                </Label>
                <AllPresetsControl />
              </section>

              <ColorTokens />
            </TabsContent>

            <TabsContent className="mr-2 mb-2" value="tokens">
              <section className="space-y-1.5">
                <Label className="flex items-center gap-1 pb-2">
                  <SlidersHorizontal className="size-4" /> Other tokens
                </Label>

                <ControlSection className="p-0" expanded title="Surface">
                  <SurfaceShadesControl className="bg-transparent" />
                  <div className="mb-3 truncate px-3 text-muted-foreground text-xs">
                    For background, card, popover, muted, accent...
                  </div>
                </ControlSection>

                <ControlSection expanded title="Radius">
                  <RadiusSliderControl />
                </ControlSection>

                <ControlSection title="Shadows">
                  <ShadowsControl />
                </ControlSection>

                <ControlSection title="Spacing">
                  <ComingSoon />
                </ControlSection>
              </section>
            </TabsContent>

            <TabsContent className="mr-2 mb-2" value="typography">
              <Typography />
            </TabsContent>
          </ScrollArea>
        </SidebarContent>
      </Tabs>

      <SidebarFooter className="px-2 pr-3">
        <ActionButtons />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

export function CustomizerSidebarToggle({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { open, toggleSidebar, openMobile } = useSidebar();
  return (
    <>
      <Button
        className={cn("relative hidden md:inline-flex", className)}
        onClick={toggleSidebar}
        size={"icon"}
        variant={"ghost"}
        {...props}
      >
        <Palette
          className={cn(
            "transition duration-200",
            open ? "absolute scale-0" : "scale-100"
          )}
        />
        <X
          className={cn(
            "transition duration-200",
            open ? "scale-100" : "absolute scale-0"
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 size-2 rounded-full bg-primary transition-opacity duration-300 ease-in-out",
            open ? "opacity-0" : "animate-bounce opacity-100"
          )}
        />
      </Button>

      <Button
        className={cn("relative inline-flex md:hidden", className)}
        onClick={toggleSidebar}
        size={"icon"}
        variant={"ghost"}
        {...props}
      >
        <Palette
          className={cn(
            "transition duration-200",
            openMobile ? "absolute scale-0" : "scale-100"
          )}
        />
        <X
          className={cn(
            "transition duration-200",
            openMobile ? "scale-100" : "absolute scale-0"
          )}
        />
        <div
          className={cn(
            "absolute top-0 right-0 size-2 rounded-full bg-primary transition-opacity duration-300 ease-in-out",
            openMobile ? "opacity-0" : "animate-bounce opacity-100"
          )}
        />
      </Button>
    </>
  );
}
