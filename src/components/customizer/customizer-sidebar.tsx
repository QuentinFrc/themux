"use client";

import { Palette, X } from "lucide-react";
import type * as React from "react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
import { ActionButtons } from "./action-buttons";
import { Typography } from "./typography";

export function CustomizerSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Sidebar className={cn("overflow-hidden", className)} {...props}>
        <SidebarHeader className="px-2 pr-3 max-md:pt-4">
          <Skeleton className="h-6 w-28 bg-muted" />
        </SidebarHeader>

        <SidebarContent className="scrollbar-thin @container relative flex max-h-svh flex-col py-2 group-data-[collapsible=icon]:invisible [&>button]:hidden">
          <div className="flex grow flex-col space-y-4 overflow-hidden px-2 pr-3">
            <Skeleton className="h-10 bg-muted" />

            <div className="grow overflow-hidden">
              <Skeleton className="h-full bg-muted" />
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
    <Sidebar className={cn("overflow-hidden", className)} {...props}>
      <SidebarHeader className="px-2 pr-3 max-md:pt-4">
        <div className="px-2">
          <p className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Typography
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent className="@container relative my-0 max-h-svh pt-2 pb-0 group-data-[collapsible=icon]:invisible [&>button]:hidden">
        <ScrollArea className="flex flex-col overflow-hidden px-2 pr-1">
          <div className="mr-2 mb-2">
            <Typography />
          </div>
        </ScrollArea>
      </SidebarContent>

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
