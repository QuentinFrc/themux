import type { Metadata } from "next";

import { ActionButtons } from "@/components/customizer/action-buttons";
import { QuickCustomizer } from "@/components/customizer/quick-customizer";
import { CardsDemo } from "@/components/demos/cards-demo";
import { DashboardDemo } from "@/components/demos/dashboard-demo";
import { MailDemo } from "@/components/demos/mail-demo";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerWrapper } from "@/components/wrappers";

export const metadata: Metadata = {
  title: "Theme Customizer",
};

export default function ShadcnThemesPage() {
  return (
    <>
      <ContainerWrapper className="@container py-4" withCane>
        <ActionButtons className="pb-4" />
        <QuickCustomizer />
      </ContainerWrapper>

      <Separator />

      <Tabs
        className="pointer-events-none relative gap-0"
        defaultValue="cards-demo"
      >
        <ContainerWrapper withCane>
          <div className="absolute inset-0 z-[-1] size-full bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]" />

          <TabsList className="pointer-events-auto my-4 bg-transparent">
            <TabsTrigger className="px-4" value="cards-demo">
              Cards
            </TabsTrigger>
            <TabsTrigger className="px-4" value="dashboard-demo">
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              className="hidden px-4 lg:inline-flex"
              value="mail-demo"
            >
              Mail
            </TabsTrigger>
          </TabsList>
        </ContainerWrapper>

        <Separator />

        <ContainerWrapper
          className="pointer-events-auto relative isolate py-8"
          withCane
        >
          <TabsContent className="@container" value="cards-demo">
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
