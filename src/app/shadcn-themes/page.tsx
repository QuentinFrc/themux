import { ThemeCustomizer } from "@/components/theme-customizer";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";

export default function ShadcnThemesPage() {
  return (
    <SectionWrapper className="space-y-8">
      <ContainerWrapper>
        <ThemeCustomizer />
      </ContainerWrapper>
    </SectionWrapper>
  );
}
