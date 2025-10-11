import { Metadata } from "next";

import { PageHeader, PageHeaderDescription, PageHeaderHeading } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";

import { ThemeVersionsTable } from "./theme-versions-table";

export const metadata: Metadata = {
  title: "Theme history",
  description: "Browse saved commits and restore previous theme configurations.",
};

export default async function VersionsPage() {
  const repository = createThemeVersionRepository(db);
  const versions = await repository.listThemeVersions();

  return (
    <>
      <ContainerWrapper withCane className="@container py-4">
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Theme history</PageHeaderHeading>
            <PageHeaderDescription>
              Review previous commits, inspect their details, and restore them to continue customizing.
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
