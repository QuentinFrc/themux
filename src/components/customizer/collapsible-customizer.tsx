"use client";

import { useCollapsibleCustomizer } from "@/hooks/use-collapsible-customizer";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { ChevronUp, SlidersHorizontal } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ScrollArea } from "../ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ColorTokens } from "./color-tokens";
import { ComingSoon } from "./coming-soon";
import {
  ControlSection,
  ControlsSkeleton,
  RadiusSliderControl,
  ShadowsControl,
} from "./customizer-controls";
import { Typography } from "./typography";

export function CollapsibleCustomizerTrigger({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { isExpanded, setIsExpanded } = useCollapsibleCustomizer();

  return (
    <Button
      onClick={() => setIsExpanded(!isExpanded)}
      variant="ghost"
      className={cn("relative flex h-8", className)}
      {...props}
    >
      <span>{isExpanded ? "Collapse" : "Expand"}</span>
      <ChevronUp
        className={cn(
          "size-4 transition",
          isExpanded ? "rotate-0" : "rotate-180",
        )}
      />
      <div
        className={cn(
          "bg-primary absolute top-1 right-0 size-2 rounded-full transition-opacity duration-300 ease-in-out",
          isExpanded ? "opacity-0" : "animate-bounce opacity-100",
        )}
      />
    </Button>
  );
}

export function CollapsibleCustomizer() {
  const { isExpanded } = useCollapsibleCustomizer();
  const isMounted = useMounted();

  return (
    <div className="@container w-full">
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-6">
            <section className="block @3xl:hidden">
              {isMounted ? (
                <MobileCollapsibleCustomizer />
              ) : (
                <MobileCollapsibleCustomizerSkeleton />
              )}
            </section>

            <section className={cn("hidden items-center gap-2", "@3xl:flex")}>
              <div className="relative grid w-full grid-cols-3 gap-6 px-2 pb-4">
                {isMounted ? (
                  <>
                    <ScrollArea>
                      <ColorTokens className="max-h-73 pr-2" />
                    </ScrollArea>

                    <section className="space-y-1.5">
                      <Label className="flex items-center gap-1 pb-2">
                        <SlidersHorizontal className="size-4" /> Other tokens
                      </Label>

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

                    <Typography />
                  </>
                ) : (
                  <>
                    <ControlsSkeleton />
                    <ControlsSkeleton />
                    <ControlsSkeleton />
                  </>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileCollapsibleCustomizer() {
  return (
    <Tabs defaultValue="color-tokens" className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="color-tokens">Color tokens</TabsTrigger>
        <TabsTrigger value="other-tokens">Other tokens</TabsTrigger>
        <TabsTrigger value="typography">Typography</TabsTrigger>
      </TabsList>

      <TabsContent value="color-tokens">
        <ScrollArea className="h-86">
          <div className="px-2">
            <ColorTokens />
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="other-tokens" className="px-2">
        <section className="space-y-1.5">
          <Label className="flex items-center gap-1 pb-2">
            <SlidersHorizontal className="size-4" /> Other tokens
          </Label>

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

      <TabsContent value="typography" className="px-2">
        <Typography />
      </TabsContent>
    </Tabs>
  );
}

function MobileCollapsibleCustomizerSkeleton() {
  return (
    <Tabs defaultValue="color-tokens" className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="color-tokens">Color tokens</TabsTrigger>
        <TabsTrigger value="other-tokens">Other tokens</TabsTrigger>
        <TabsTrigger value="typography">Typography</TabsTrigger>
      </TabsList>

      <TabsContent value="color-tokens">
        <ControlsSkeleton />
      </TabsContent>

      <TabsContent value="other-tokens">
        <ControlsSkeleton />
      </TabsContent>

      <TabsContent value="typography">
        <ControlsSkeleton />
      </TabsContent>
    </Tabs>
  );
}
