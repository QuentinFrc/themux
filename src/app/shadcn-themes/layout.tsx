import type { Metadata } from "next";
import type { ReactNode } from "react";

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
