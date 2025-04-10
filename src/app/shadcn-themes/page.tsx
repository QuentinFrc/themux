import { CardsDemo } from "@/components/cards-demo";
import {
  CollapsibleCustomizer,
  CollapsibleCustomizerProvider,
  CollapsibleCustomizerTrigger,
} from "@/components/collapsible-theme-customizer-wrapper";
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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Customizer",
};

export default function ShadcnThemesPage() {
  return (
    <CollapsibleCustomizerProvider>
      <ContainerWrapper withCane>
        <SectionWrapper className="@container flex flex-col gap-x-8 gap-y-4 lg:flex-row">
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

          <div className="flex content-center items-center gap-2">
            <CollapsibleCustomizerTrigger />
          </div>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <CollapsibleCustomizer>
        <ContainerWrapper withCane className="@container py-4">
          <QuickCustomizer />
        </ContainerWrapper>
      </CollapsibleCustomizer>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <Tabs defaultValue="cards-demo" className="space-y-4">
            <TabsList className="content-center bg-transparent">
              <TabsTrigger value="cards-demo" className="px-4">
                Cards
              </TabsTrigger>
              <TabsTrigger value="dashboard-demo" className="px-4">
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
        </SectionWrapper>
      </ContainerWrapper>
    </CollapsibleCustomizerProvider>
  );
}
