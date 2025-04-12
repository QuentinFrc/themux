"use client";

import { useCollapsibleCustomizer } from "@/hooks/use-collapsible-customizer";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { ComponentProps } from "react";
import { ColorTokens } from "./color-tokens";
import { ControlsSkeleton } from "./customizer-controls";
import { ThemePresets } from "./theme-presets";
import { Typography } from "./typography";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CollapsibleCustomizerTrigger({
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const { isExpanded, setIsExpanded } = useCollapsibleCustomizer();

  return (
    <Button
      onClick={() => setIsExpanded(!isExpanded)}
      variant="ghost"
      className={cn("relative flex", className)}
      {...props}
    >
      <span>{isExpanded ? "Collapse" : "Expand"}</span>
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
          <div className="pt-8">
            <section className="block @3xl:hidden">
              {isMounted ? (
                <MobileCollapsibleCustomizer />
              ) : (
                <MobileCollapsibleCustomizerSkeleton />
              )}
            </section>

            <section className={cn("hidden items-center gap-2", "@3xl:flex")}>
              <div className="relative grid w-full grid-cols-3 gap-6">
                {isMounted ? (
                  <>
                    <ColorTokens className="max-h-82" />
                    <ThemePresets />
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
        <TabsTrigger value="color-tokens">Tokens</TabsTrigger>
        <TabsTrigger value="theme-presets">Presets</TabsTrigger>
        <TabsTrigger value="typography">Typography</TabsTrigger>
      </TabsList>

      <TabsContent value="color-tokens">
        <ColorTokens className="max-h-82 overflow-hidden" />
      </TabsContent>

      <TabsContent value="theme-presets">
        <ThemePresets />
      </TabsContent>

      <TabsContent value="typography">
        <Typography />
      </TabsContent>
    </Tabs>
  );
}

function MobileCollapsibleCustomizerSkeleton() {
  return (
    <Tabs defaultValue="color-tokens" className="space-y-4">
      <TabsList className="w-full">
        <TabsTrigger value="color-tokens">Tokens</TabsTrigger>
        <TabsTrigger value="theme-presets">Presets</TabsTrigger>
        <TabsTrigger value="typography">Typography</TabsTrigger>
      </TabsList>

      <TabsContent value="color-tokens">
        <ControlsSkeleton />
      </TabsContent>

      <TabsContent value="theme-presets">
        <ControlsSkeleton />
      </TabsContent>

      <TabsContent value="typography">
        <ControlsSkeleton />
      </TabsContent>
    </Tabs>
  );
}
