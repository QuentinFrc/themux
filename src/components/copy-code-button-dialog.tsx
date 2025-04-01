import { useConfig } from "@/hooks/use-config";
import { getCopyableThemeCSSVariablesV4 } from "@/lib/themes";
import { cn, copyToClipboard } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

export function CopyCodeButtonDialog({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <>
      {/* A Drawer trigger for smaller screens */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn("flex cursor-pointer sm:hidden", className)}
            {...props}
          >
            Copy
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="leading-none font-semibold tracking-tight">
              Generated theme
            </DrawerTitle>

            <DrawerDescription className="text-muted-foreground text-xs">
              Copy and paste the following code into your CSS file.
            </DrawerDescription>
          </DrawerHeader>

          <CustomizerCode />
        </DrawerContent>
      </Drawer>

      {/* A Dialog trigger for larger screens */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("hidden cursor-pointer sm:flex", className)}
            {...props}
          >
            Copy code
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-background min-h-[300px] space-y-2 overflow-hidden rounded-lg outline-none sm:max-w-xl lg:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="leading-none font-semibold tracking-tight">
              Generated theme
            </DialogTitle>

            <DialogDescription className="text-muted-foreground text-xs">
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>

          <CustomizerCode />
        </DialogContent>
      </Dialog>
    </>
  );
}

function CustomizerCode({ className }: React.ComponentProps<"div">) {
  const [config] = useConfig();
  const [copied, setCopied] = React.useState(false);

  const handleCopyThemeStylesCode = () => {
    const themeStyleCodeString = getCopyableThemeCSSVariablesV4({
      themeObject: config.themeObject,
      radius: config.radius,
    });

    copyToClipboard(themeStyleCodeString);

    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const themeCode = useMemo(
    () =>
      getCopyableThemeCSSVariablesV4({
        themeObject: config.themeObject,
        radius: config.radius,
      }),
    [config],
  );

  return (
    <div
      className={cn(
        "bg-card relative h-[500px] w-full overflow-hidden rounded-lg",
        className,
      )}
    >
      <ScrollArea className="h-full">
        <pre className="p-4">
          <code className="relative border border-none p-0 font-mono text-sm">
            {themeCode}
          </code>
        </pre>
      </ScrollArea>

      {/* Copy code button */}
      <div className="absolute top-3 right-3 isolate">
        <div className="relative overflow-hidden rounded-lg p-[2px]">
          <div className="bg-rotating-gradient opacity-40" />
          <Button
            size="sm"
            variant={"ghost"}
            onClick={handleCopyThemeStylesCode}
            className="bg-muted/80 relative isolate flex cursor-pointer items-center justify-start overflow-hidden"
          >
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                copied ? "absolute scale-0" : "scale-100",
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                !copied ? "absolute scale-0" : "scale-100",
              )}
            />
            Copy code
          </Button>
        </div>
      </div>
    </div>
  );
}
