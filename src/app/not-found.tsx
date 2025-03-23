import { Footer } from "@/components/footer";
import { GoBackLink } from "@/components/go-back-link";
import { Separator } from "@/components/ui/separator";
import { ContainerWrapper, SectionWrapper } from "@/components/ui/wrappers";
import { MoveLeft } from "lucide-react";

export default function RootNotFound() {
  return (
    <div className="relative flex h-screen flex-col">
      <div className="grid-background-effect" />
      <div className="light-background-effect" />

      <SectionWrapper className="grow content-center">
        <ContainerWrapper className="relative">
          <div className="grid size-full place-content-center gap-4 font-mono max-sm:place-items-start sm:text-center">
            <p className="text-2xl font-bold sm:text-4xl">
              404 - Page Not Found
            </p>
            <p className="text-muted-foreground">
              That thing you're looking for does not exist.
            </p>

            <GoBackLink
              className="flex cursor-pointer items-center gap-2 p-0"
              variant="link"
            >
              <MoveLeft className="size-4" />
              Go back
            </GoBackLink>
          </div>
        </ContainerWrapper>
      </SectionWrapper>

      <Footer />
    </div>
  );
}
