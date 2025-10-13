import type { Metadata } from "next";
import type { ReactNode } from "react";

import { CustomizerSidebar } from "@/components/customizer/customizer-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "shadcn/ui themes",
    template: "%s | themux",
  },
};

const SIDEBAR_WIDTH = "21rem";

export default function ShadcnThemesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
        }}
      >
        <CustomizerSidebar variant="inset" />
        {children}
      </SidebarProvider>
    </TooltipProvider>
  );
}
