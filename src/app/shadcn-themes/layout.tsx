import {
  CustomizerSidebar,
  CustomizerSidebarToggle,
} from "@/components/customizer-sidebar";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ContainerWrapper } from "@/components/wrappers";
import { Metadata } from "next";
import { MainNavigation } from "./navigation";

export const metadata: Metadata = {
  title: {
    default: "shadcn/ui themes",
    template: "%s | themux",
  },
};

const SIDEBAR_WIDTH = "19rem";
const SIDEBAR_WIDTH_MOBILE = "19rem";

export default async function ShadcnThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      defaultOpen={false}
      style={{
        "--sidebar-width": SIDEBAR_WIDTH,
        "--sidebar-width-mobile": SIDEBAR_WIDTH_MOBILE,
      }}
    >
      <CustomizerSidebar variant="inset" collapsible="icon" />

      <SidebarInset className="relative max-h-svh overflow-hidden peer-data-[variant=inset]:max-h-[calc(100svh-1rem)]">
        <header className="isolate z-10 flex shrink-0 items-center gap-2 border-b">
          <ContainerWrapper className="flex items-center justify-between">
            <div className="flex h-14 w-full items-center gap-2">
              <div className="inline-flex md:hidden">
                <CustomizerSidebarToggle />
              </div>

              <MainNavigation />
            </div>

            <div className="flex items-center justify-center">
              <ModeSwitcher />
            </div>
          </ContainerWrapper>
        </header>

        <ScrollArea className="relative flex h-full flex-col overflow-hidden">
          {children}
        </ScrollArea>
      </SidebarInset>
    </SidebarProvider>
  );
}
