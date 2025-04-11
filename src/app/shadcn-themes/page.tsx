import { CardsDemo } from "@/components/cards-demo";
import {
  CollapsibleCustomizer,
  CollapsibleCustomizerTrigger,
} from "@/components/collapsible-customizer";

import { ComponentWrapper } from "@/components/components-demo/component-wrapper";
import { DashboardDemo } from "@/components/dashboard-demo";
import { FrameHighlight } from "@/components/frame-highlight";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { QuickCustomizer } from "@/components/quick-customizer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { CollapsibleCustomizerProvider } from "@/hooks/use-collapsible-customizer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Customizer",
};

export default function ShadcnThemesPage() {
  return (
    <>
      <ContainerWrapper withCane>
        <SectionWrapper className="@container">
          <PageHeader className="grow">
            <PageHeaderHeading>
              shadcn/ui customizer supporting
              <FrameHighlight>Tailwind v4</FrameHighlight>
            </PageHeaderHeading>
            <PageHeaderDescription>
              Generate a theme for your app and copy-paste the css variables.
              Compatible with
              <FrameHighlight className="font-semibold">
                Tailwind v3
              </FrameHighlight>
              and supports
              <code className="font-mono font-semibold">oklch</code>
              {", "}
              <code className="font-mono font-semibold">hsl</code>
              {", "}
              <code className="font-mono font-semibold">rbg</code>
              {" and "}
              <code className="font-mono font-semibold">hex</code>.
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <CollapsibleCustomizerProvider>
        <ContainerWrapper withCane className="@container py-8">
          <QuickCustomizer />
          <CollapsibleCustomizer />
          <CollapsibleCustomizerTrigger className="absolute bottom-0 left-1/2 z-50 -translate-x-1/2 translate-y-1/2 backdrop-blur-lg" />
        </ContainerWrapper>
      </CollapsibleCustomizerProvider>

      <Separator />

      <ContainerWrapper withCane>
        <Tabs defaultValue="cards-demo" className="isolate space-y-2 py-4">
          <TabsList className="bg-background sticky top-0 z-10 flex h-12 w-full content-center justify-start rounded-none py-2">
            <TabsTrigger value="cards-demo" className="grow-0 px-4">
              Cards
            </TabsTrigger>
            <TabsTrigger value="dashboard-demo" className="grow-0 px-4">
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cards-demo">
            <CardsDemo />
          </TabsContent>

          <TabsContent value="dashboard-demo">
            <ComponentWrapper
              className="p-0"
              name="dashboard-01"
              internalUrl="/dashboard"
            >
              <DashboardDemo />
            </ComponentWrapper>
          </TabsContent>
        </Tabs>
      </ContainerWrapper>
    </>
  );
}
