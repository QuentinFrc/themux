import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { ActionButtons } from "@/components/customizer/action-buttons";
import { ColorsPreview } from "@/components/customizer/colors-preview";
import { MiscControls } from "@/components/customizer/quick-customizer";
import { ComponentsShowcase } from "@/components/demos/components-demo/components-showcase";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContainerWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";
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
  const repository = createThemeVersionRepository(db);
  const latestVersion = await repository.getLatestThemeVersion();
  const initialVersion = versionId
    ? await repository.getThemeVersionById(versionId)
    : null;
  const activeVersion = initialVersion ?? latestVersion;

  return (
    <>
      {activeVersion ? (
        <VersionPreviewInitializer
          key={activeVersion.id}
          shouldNotify={Boolean(initialVersion)}
          version={activeVersion}
        />
      ) : null}
      <ContainerWrapper withCane className="@container py-4">
        <ActionButtons className="pb-4" />
      </ContainerWrapper>

      <Separator />

      <Tabs className="pointer-events-none relative gap-0" defaultValue="colors">
        <ContainerWrapper withCane>
          <div className="absolute inset-0 z-[-1] size-full bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px]" />

          <TabsList className="pointer-events-auto my-4 bg-transparent">
            <TabsTrigger className="px-4" value="colors">
              Colors
            </TabsTrigger>
            <TabsTrigger className="px-4" value="misc">
              Misc
            </TabsTrigger>
            <TabsTrigger value="components" className="px-4">
              Components
            </TabsTrigger>
          </TabsList>
        </ContainerWrapper>

        <Separator />

        <ContainerWrapper
          className="pointer-events-auto relative isolate py-8"
          withCane
        >
          <TabsContent className="@container" value="colors">
            <ColorsPreview />
          </TabsContent>

          <TabsContent className="@container" value="misc">
            <div className="space-y-6 rounded-lg border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
              <MiscControls />
            </div>
          </TabsContent>

          <TabsContent value="components">
            <ComponentsShowcase />
          </TabsContent>
        </ContainerWrapper>
      </Tabs>
    </>
  );
}
