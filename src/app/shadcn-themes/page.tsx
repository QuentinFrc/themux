import { CardsDemo } from "@/components/cards-demo";
import { CollapsibleThemeCustomizerWrapper } from "@/components/collapsible-theme-customizer-wrapper";
import { ThemeCustomizer } from "@/components/theme-customizer";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";

export const dynamic = "force-static";

export default function ShadcnThemesPage() {
  return (
    <>
      <SectionWrapper>
        <ContainerWrapper className="border-x">
          <CollapsibleThemeCustomizerWrapper>
            <div className="pt-4">
              <ThemeCustomizer />
            </div>
          </CollapsibleThemeCustomizerWrapper>
        </ContainerWrapper>
      </SectionWrapper>

      <Separator />
      <SectionWrapper>
        <ContainerWrapper>
          <CardsDemo />
        </ContainerWrapper>
      </SectionWrapper>
    </>
  );
}
