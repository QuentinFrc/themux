"use client";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { PaintBucket, Palette, SlidersHorizontal, X } from "lucide-react";
import * as React from "react";
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
        <SidebarContent className="scrollbar-thin @container relative flex max-h-svh flex-col py-2 group-data-[collapsible=icon]:invisible [&>button]:hidden">
          <div className="px-2 pr-3">
            <Skeleton className="bg-muted h-9" />
          </div>
          <div className="flex grow flex-col space-y-6 overflow-hidden px-2 py-4 pr-3 pb-2">
            <ControlsSkeleton className="h-10" />

            <div className="grow overflow-hidden">
              <ControlsSkeleton className="h-200" />
            </div>
          </div>
          <div className="space-y-2 px-2 pr-3">
            <Skeleton className="bg-muted h-8" />
            <Skeleton className="bg-muted h-8" />
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar className="overflow-hidden" {...props}>
      <Tabs
        defaultValue="palette"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <SidebarHeader className="px-2 pr-3 max-md:pt-2">
          <TabsList className="w-full p-1">
            <TabsTrigger value="palette" className="text-xs">
              Palette
            </TabsTrigger>
            <TabsTrigger value="tokens" className="text-xs">
              Tokens
            </TabsTrigger>
            <TabsTrigger value="typography" className="text-xs">
              Typography
            </TabsTrigger>
          </TabsList>
        </SidebarHeader>

        <SidebarContent className="@container relative max-h-svh group-data-[collapsible=icon]:invisible [&>button]:hidden">
          <ScrollArea className="flex flex-col overflow-hidden pr-1">
            <div className="y-0 flex h-full flex-col gap-2 px-2">
              <TabsContent
                value="palette"
                className="flex flex-col space-y-6 py-2"
              >
                <section className="flex-1 space-y-1.5 max-sm:w-full max-sm:max-w-full">
                  <Label className="flex items-center gap-1 pb-2">
                    <PaintBucket className="size-4" /> Theme presets
                  </Label>
                  <AllPresetsControl />
                </section>

                <ColorTokens />
              </TabsContent>

              <TabsContent value="tokens" className="py-2">
                <section className="space-y-1.5">
                  <Label className="flex items-center gap-1 pb-2">
                    <SlidersHorizontal className="size-4" /> Other tokens
                  </Label>

                  <ControlSection title="Surface" expanded className="p-0">
                    <SurfaceShadesControl className="bg-transparent" />
                    <div className="text-muted-foreground mb-3 truncate px-3 text-xs">
                      For background, card, popover, muted, accent...
                    </div>
                  </ControlSection>

                  <ControlSection title="Radius" expanded>
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

              <TabsContent value="typography" className="py-2">
                <Typography />
              </TabsContent>
            </div>
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
        variant={"ghost"}
        size={"icon"}
        onClick={toggleSidebar}
        className={cn("relative hidden md:inline-flex", className)}
        {...props}
      >
        <Palette
          className={cn(
            "transition duration-200",
            open ? "absolute scale-0" : "scale-100",
          )}
        />
        <X
          className={cn(
            "transition duration-200",
            !open ? "absolute scale-0" : "scale-100",
          )}
        />
        <div
          className={cn(
            "bg-primary absolute top-0 right-0 size-2 rounded-full transition-opacity duration-300 ease-in-out",
            open ? "opacity-0" : "animate-bounce opacity-100",
          )}
        />
      </Button>

      <Button
        variant={"ghost"}
        size={"icon"}
        onClick={toggleSidebar}
        className={cn("relative inline-flex md:hidden", className)}
        {...props}
      >
        <Palette
          className={cn(
            "transition duration-200",
            openMobile ? "absolute scale-0" : "scale-100",
          )}
        />
        <X
          className={cn(
            "transition duration-200",
            !openMobile ? "absolute scale-0" : "scale-100",
          )}
        />
        <div
          className={cn(
            "bg-primary absolute top-0 right-0 size-2 rounded-full transition-opacity duration-300 ease-in-out",
            openMobile ? "opacity-0" : "animate-bounce opacity-100",
          )}
        />
      </Button>
    </>
  );
}
