"use client";

import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { Paintbrush2, Palette, X } from "lucide-react";
import { useState } from "react";
import { TokensList } from "./color-tokens";
import { CopyCodeButtonDialog } from "./copy-code-button-dialog";
import { Customizer } from "./customizer";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function ToolsSidebar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleToolsSidebar = () => setIsOpen(!isOpen);

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <ToolSidebarToggle
          toggleToolsSidebar={toggleToolsSidebar}
          isOpen={isOpen}
        />
      </SheetTrigger>

      <SheetContent
        className={cn(
          "scaled bg-sidebar @container py-2 sm:max-w-82 [&>button]:hidden",
          className,
        )}
      >
        <SheetHeader className="px-4">
          <SheetTitle className="flex items-center gap-2">
            <Paintbrush2 className="size-5" /> Theme customizer
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="fixed top-4 right-4 z-10 size-10"
            >
              <X className="size-5" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <section className="h-fit">
          <Tabs className="h-full max-h-fit" defaultValue="theme">
            <TabsList className="grid w-full grid-cols-2 px-4">
              <TabsTrigger value="theme">Theme</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="max-h-fit">
              <Customizer className="max-h-fit py-4" />
            </TabsContent>

            <TabsContent
              value="tokens"
              className="flex h-fit flex-col space-y-1.5 py-4"
            >
              <Label className="flex items-center gap-1 px-4 pb-2">
                <Palette className="size-4" /> Tokens
              </Label>
              <ScrollArea className="relative max-h-130 overflow-hidden px-2">
                <TokensList />
              </ScrollArea>
            </TabsContent>
          </Tabs>

          <div className="px-4 py-4">
            <CopyCodeButtonDialog className="w-full" />
          </div>
        </section>
      </SheetContent>
    </Sheet>
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
      onClick={toggleToolsSidebar}
      {...props}
    >
      <Paintbrush2
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
