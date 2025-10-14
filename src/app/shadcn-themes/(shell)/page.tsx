import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { ActionButtons } from "@/components/customizer/action-buttons";
import { QuickCustomizer } from "@/components/customizer/quick-customizer";
import { CardsDemo } from "@/components/demos/cards-demo";
import { DashboardDemo } from "@/components/demos/dashboard-demo";
import { MailDemo } from "@/components/demos/mail-demo";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";
import { ThemeVersionRecord } from "@/types/theme-update";

import { VersionPreviewInitializer } from "./version-preview-initializer";

type PageSearchParams = { versionId?: string };

export const metadata: Metadata = {
  title: "Theme Customizer",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ShadcnThemesPage({
  searchParams,
}: {
  searchParams?: Promise<PageSearchParams>;
}) {
  noStore();
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;
  const versionId = resolvedSearchParams?.versionId;
  let initialVersion: ThemeVersionRecord | null = null;

  if (versionId) {
    const repository = createThemeVersionRepository(db);
    initialVersion = await repository.getThemeVersionById(versionId);
  }

  return (
    <>
      {initialVersion ? (
        <VersionPreviewInitializer key={initialVersion.id} version={initialVersion} />
      ) : null}
      <ContainerWrapper withCane className="@container py-4">
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
