import { ExternalLink } from "@/components/external-link";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";

export default function ShadcnThemesPage() {
  return (
    <SectionWrapper className="space-y-8">
      <ContainerWrapper>
        <h1 className="text-4xl font-bold">Theme customizer page</h1>
      </ContainerWrapper>

      <Separator />

      <ContainerWrapper>
        <span className="text-muted-foreground">TODO: </span>
        <p>{"Hi, I'm a ShadcnUI themes sandbox."}</p>

        <span className="text-muted-foreground">
          Source code available on{" "}
          <ExternalLink href="https://github.com/llanesluis/themux" showIcon>
            GitHub
          </ExternalLink>
        </span>
      </ContainerWrapper>
    </SectionWrapper>
  );
}
