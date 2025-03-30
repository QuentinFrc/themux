import { useConfig } from "@/hooks/use-config";
import { getCopyableThemeCSSVariablesV4 } from "@/lib/themes";
import { cn, copyToClipboard } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

export function CopyCodeButtonDialog({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("flex cursor-pointer", className)} {...props}>
          <span>
            Copy <span className="hidden sm:inline">code</span>
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-background min-h-[300px] space-y-2 overflow-hidden rounded-lg outline-none sm:max-w-xl lg:max-w-2xl">
        <DialogTitle className="sr-only">Copy generated theme</DialogTitle>
        <div className="space-y-1">
          <div className="leading-none font-semibold tracking-tight">
            Generated theme
          </div>
          <div className="text-muted-foreground text-xs">
            Copy and paste the following code into your CSS file to apply the
            theme to your project.
          </div>
        </div>

        <CustomizerCode />
      </DialogContent>
    </Dialog>
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
      <div className="absolute top-3 right-3">
        <div className="relative overflow-hidden rounded-lg p-[2px]">
          <div className="absolute inset-0 size-full animate-spin bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700 blur-xl" />
          <Button
            size="sm"
            variant={"ghost"}
            onClick={handleCopyThemeStylesCode}
            className="bg-muted/90 relative isolate flex cursor-pointer items-center justify-start overflow-hidden"
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
