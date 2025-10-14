import type { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

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
  title: "Theme history",
  description: "Browse saved commits and restore previous theme configurations.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VersionsPage() {
  noStore();
  const repository = createThemeVersionRepository(db);
  const versions = await repository.listThemeVersions();

  return (
    <>
      <ContainerWrapper className="@container py-4" withCane>
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

      <ContainerWrapper className="py-6" withCane>
        <ThemeVersionsTable versions={versions} />
      </ContainerWrapper>
    </>
  );
}
