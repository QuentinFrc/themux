"use client";

import { Paintbrush2, X } from "lucide-react";
import * as React from "react";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Palette } from "lucide-react";
import { TokensList } from "./color-tokens";
import { CopyCodeButtonDialog } from "./copy-code-button-dialog";
import { Customizer } from "./customizer";
import { ExternalLink } from "./external-link";
import { GitHub } from "./icons/github";
import { ResetButton } from "./reset-button";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar,
} from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CustomizerSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMounted = useMounted();

  if (!isMounted) {
    return (
      <Sidebar {...props}>
        <SidebarContent className="scaled @container max-h-svh overflow-hidden py-2 group-data-[collapsible=icon]:invisible sm:max-w-82 [&>button]:hidden">
          <div className="px-4">
            <Skeleton className="h-10" />
          </div>
          <div className="p-4">
            <Skeleton className="h-118" />
          </div>
          <div className="px-4">
            <Skeleton className="h-10" />
          </div>
        </SidebarContent>

        <SidebarFooter>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="group/toggle size-8"
          >
            <ExternalLink href="https://github.com/llanesluis/themux">
              <GitHub />
            </ExternalLink>
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar {...props}>
      <SidebarContent className="scaled @container relative max-h-svh overflow-hidden py-2 group-data-[collapsible=icon]:invisible sm:max-w-82 [&>button]:hidden">
        <Tabs defaultValue="theme">
          <div className="px-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="theme">
            <Customizer className="animate-in p-4" />
          </TabsContent>

          <TabsContent
            value="tokens"
            className="flex h-fit flex-col space-y-1.5 py-4"
          >
            <Label className="flex items-center gap-1 px-4 pb-2">
              <Palette className="size-4" /> Tokens
            </Label>
            <ScrollArea className="relative max-h-104 px-4">
              <TokensList />
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 px-4 py-4">
          <CopyCodeButtonDialog className="flex-1" />
          <ResetButton />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="group/toggle size-8"
        >
          <ExternalLink href="https://github.com/llanesluis/themux">
            <GitHub />
          </ExternalLink>
        </Button>
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
        <Paintbrush2
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
        <Paintbrush2
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
