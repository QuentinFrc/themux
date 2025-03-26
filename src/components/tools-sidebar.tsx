"use client";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Palette, X } from "lucide-react";
import { useState } from "react";
import { CopyCodeButtonDialog, Customizer } from "./theme-customizer";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "./ui/sidebar";

export function ToolsSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMounted = useMounted();
  const [isOpen, setIsOpen] = useState(false);
  const toggleToolsSidebar = () => setIsOpen(!isOpen);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ToolSidebarToggle
        toggleToolsSidebar={toggleToolsSidebar}
        isOpen={isOpen}
      />
      <Sidebar
        variant="floating"
        collapsible="none"
        className={cn(
          "sticky hidden h-svh transition lg:grid",
          isOpen ? "visible w-70" : "invisible w-0",
          className,
        )}
        {...props}
      >
        <SidebarContent className="py-8">
          <SidebarGroup>
            <SidebarGroupContent className="scaled">
              <Customizer className="max-h-fit px-2 py-4" />

              <div className="px-2 py-4">
                <CopyCodeButtonDialog
                  className="w-full"
                  variant={"secondary"}
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
}

interface ToolsSidebarProps extends React.ComponentProps<typeof Button> {
  toggleToolsSidebar: () => void;
  isOpen: boolean;
}

function ToolSidebarToggle({
  toggleToolsSidebar,
  isOpen,
  className,
  ...props
}: ToolsSidebarProps) {
  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      className={cn("fixed top-4 right-4 z-10 max-lg:hidden", className)}
      onClick={toggleToolsSidebar}
      {...props}
    >
      <Palette
        className={cn(
          "transition duration-200",
          isOpen ? "absolute scale-0" : "scale-100",
        )}
      />
      <X
        className={cn(
          "transition duration-200",
          !isOpen ? "absolute scale-0" : "scale-100",
        )}
      />
    </Button>
  );
}
