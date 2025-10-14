import type { Metadata } from "next";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";

export const metadata: Metadata = {
  title: "Fonts",
};

export default function FontsPage() {
  return (
    <>
      <ContainerWrapper className="@container" withCane>
        <SectionWrapper>
          <PageHeader>
            <PageHeaderHeading>Fonts page</PageHeaderHeading>
            <PageHeaderDescription>
              This will be inspired on Google Fonts.
            </PageHeaderDescription>
          </PageHeader>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <p className="font-bold text-6xl">this is a 6xl text</p>
          <p className="font-bold text-5xl">this is a 5xl text</p>
          <p className="font-bold text-4xl">this is a 4xl text</p>
          <p className="font-bold text-3xl">this is a 3xl text</p>
          <p className="font-semibold text-2xl">this is a semibold 2xl text</p>
          <p className="font-semibold text-xl">this is a semibold xl text</p>
          <p className="text-lg">this is lg text</p>
          <p className="text-md">this is a md text</p>
          <p className="text-sm">this is a sm text</p>
          <p className="text-xs">this is a xs text</p>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <p className="font-sans">this is a regular sans font text</p>
          <p className="font-sans font-semibold">
            this is a semibold sans font text
          </p>
          <p className="font-bold font-sans">this is a bold sans font text</p>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <p className="font-mono">this is a regular mono font text</p>
          <p className="font-mono font-semibold">
            this is a semibold mono font text
          </p>
          <p className="font-bold font-mono">this is a bold mono font text</p>
        </SectionWrapper>
      </ContainerWrapper>
    </>
  );
}
