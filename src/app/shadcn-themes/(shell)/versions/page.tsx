import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";

import { ThemeVersionsTable } from "./theme-versions-table";

export const metadata: Metadata = {
  title: "Theme versions",
  description: "Browse and restore saved theme configurations.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VersionsPage() {
  noStore();
  const repository = createThemeVersionRepository(db);
  const versions = await repository.listThemeVersions();

  return (
    <>
      <ContainerWrapper withCane className="@container py-4">
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Saved theme versions</PageHeaderHeading>
            <PageHeaderDescription>
              Review previously saved configurations and restore them to continue customizing.
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane className="py-6">
        <ThemeVersionsTable versions={versions} />
      </ContainerWrapper>
    </>
  );
}
