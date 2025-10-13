import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";

import { ThemeVersionsTable } from "./theme-versions-table";

export const metadata: Metadata = {
  title: "Theme versions",
  description: "Browse and restore saved theme configurations.",
};

export default async function VersionsPage() {
  const repository = createThemeVersionRepository(db);
  const versions = await repository.listThemeVersions();

  return (
    <>
      <ContainerWrapper className="@container py-4" withCane>
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Saved theme versions</PageHeaderHeading>
            <PageHeaderDescription>
              Review previously saved configurations and restore them to
              continue customizing.
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper className="py-6" withCane>
        <ThemeVersionsTable versions={versions} />
      </ContainerWrapper>
    </>
  );
}
