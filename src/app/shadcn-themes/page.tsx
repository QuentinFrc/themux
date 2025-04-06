import { CardsDemo } from "@/components/cards-demo";
import {
  CollapsibleCustomizer,
  CollapsibleCustomizerProvider,
  CollapsibleCustomizerTrigger,
} from "@/components/collapsible-theme-customizer-wrapper";
import { CopyCodeButtonDialog } from "@/components/copy-code-button-dialog";
import { FrameHighlight } from "@/components/frame-highlight";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header";
import { QuickCustomizer } from "@/components/quick-customizer";
import { ResetButton } from "@/components/reset-button";
import { Separator } from "@/components/ui/separator";
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
              shadcn/ui customizer with
              <FrameHighlight>Tailwind v4</FrameHighlight>
            </PageHeaderHeading>
            <PageHeaderDescription>
              Generate a theme for your app and copy-paste the generated css
              variables. Compatible with{" "}
              <span className="font-semibold">Tailwind v3</span>, and supports{" "}
              <code className="font-mono font-semibold">oklch</code>
              {", "}
              <code className="font-mono font-semibold">hsl</code>
              {", "}
              <code className="font-mono font-semibold">rbg</code>
              {" and "}
              <code className="font-mono font-semibold">hex</code>.
            </PageHeaderDescription>
          </PageHeader>

          <div className="content-center">
            <CollapsibleCustomizerTrigger size="sm" />
          </div>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <CollapsibleCustomizer>
        <ContainerWrapper
          withCane
          className="@container flex flex-col justify-between gap-4 py-4 md:flex-row"
        >
          <QuickCustomizer />

          <div className="grid shrink-0 grid-cols-2 place-content-center items-center gap-2 md:grid-cols-1">
            <CopyCodeButtonDialog size="sm" />
            <ResetButton variant="outline" size="sm" />
          </div>
        </ContainerWrapper>
      </CollapsibleCustomizer>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <CardsDemo />
        </SectionWrapper>
      </ContainerWrapper>
    </CollapsibleCustomizerProvider>
  );
}
