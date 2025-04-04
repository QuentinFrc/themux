import { AppSidebar } from "@/components/app-sidebar";
import { ModeSwitcher } from "@/components/mode-switcher";
import { ToolsSidebar } from "@/components/tools-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { MainNavigation } from "./navigation";
import { ContainerWrapper } from "@/components/wrappers";

export const metadata: Metadata = {
  title: {
    default: "shadcn/ui themes",
    template: "%s | themux",
  },
};

export default async function ShadcnThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />

      <SidebarInset className="relative max-h-svh overflow-hidden peer-data-[variant=inset]:max-h-[calc(100svh-1rem)]">
        <header className="isolate z-10 flex shrink-0 items-center gap-2 border-b px-2">
          <ContainerWrapper className="flex items-center justify-between">
            <div className="flex h-14 w-full items-center gap-2">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />

              <MainNavigation />
            </div>

            <div className="flex items-center justify-center">
              <ModeSwitcher />
              <ToolsSidebar />
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
