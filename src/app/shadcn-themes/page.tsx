import { CardsDemo } from "@/components/cards-demo";
import {
  CollapsibleCustomizer,
  CollapsibleCustomizerTrigger,
} from "@/components/collapsible-customizer";

import { DashboardDemo } from "@/components/dashboard-demo";
import { FrameHighlight } from "@/components/frame-highlight";
import { MailDemo } from "@/components/mail-demo";
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
              and supports{" "}
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
        <ContainerWrapper withCane className="@container pt-4 pb-8">
          <QuickCustomizer />
          <CollapsibleCustomizer />
          <CollapsibleCustomizerTrigger className="bg-background absolute bottom-1 left-1/2 -translate-x-1/2 translate-y-1/2 backdrop-blur" />
        </ContainerWrapper>
      </CollapsibleCustomizerProvider>

      <Separator />

      <Tabs
        defaultValue="cards-demo"
        className="pointer-events-none relative gap-0"
      >
        <ContainerWrapper withCane>
          <div className="absolute inset-0 z-[-1] size-full bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]" />

          <TabsList className="pointer-events-auto my-4 bg-transparent">
            <TabsTrigger value="cards-demo" className="px-4">
              Cards
            </TabsTrigger>
            <TabsTrigger value="dashboard-demo" className="px-4">
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="mail-demo" className="px-4">
              Mail
            </TabsTrigger>
          </TabsList>
        </ContainerWrapper>

        <Separator />

        <ContainerWrapper
          withCane
          className="pointer-events-auto relative isolate py-8"
        >
          <TabsContent value="cards-demo">
            <CardsDemo />
          </TabsContent>

          <TabsContent value="dashboard-demo">
            <DashboardDemo />
          </TabsContent>

          <TabsContent value="mail-demo">
            <MailDemo />
          </TabsContent>
        </ContainerWrapper>
      </Tabs>
    </>
  );
}
