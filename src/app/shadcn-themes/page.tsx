import { CardsDemo } from "@/components/cards-demo";
import { CollapsibleThemeCustomizerWrapper } from "@/components/collapsible-theme-customizer-wrapper";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/wrappers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Theme Customizer",
};

export default function ShadcnThemesPage() {
  return (
    <>
      <ContainerWrapper withCane>
        <SectionWrapper>
          <CollapsibleThemeCustomizerWrapper>
            <div className="pt-4">
              <ThemeCustomizer />
            </div>
          </CollapsibleThemeCustomizerWrapper>
        </SectionWrapper>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper withCane>
        <SectionWrapper>
          <CardsDemo />
        </SectionWrapper>
      </ContainerWrapper>
    </>
  );
}
