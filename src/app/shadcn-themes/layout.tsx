import type { ReactNode } from "react";
import { Metadata } from "next";

import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "shadcn/ui themes",
    template: "%s | themux",
  },
};

export default function ShadcnThemesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
