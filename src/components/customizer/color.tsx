"use client";

import { Check, Clipboard } from "lucide-react";
import type { ComponentProps } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import type { ColorFormat } from "@/types/theme";
import { colorFormatter } from "@/utils/color-converter";
import { Button } from "../ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { Skeleton } from "../ui/skeleton";

export function Color({
  color,
  isActive,
  className,
  onClick,
  ...props
}: { color: string; isActive?: boolean } & ComponentProps<typeof Button>) {
  const isMounted = useMounted();
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  const handleCopyColor = (colorFormat: ColorFormat) => {
    const formatedColor = colorFormatter(color, colorFormat, "4");
    copyToClipboard(formatedColor);
    toast.success(`${formatedColor} copied to clipboard!`);
  };

  if (!isMounted) {
    return (
      <Button
        className={cn("size-fit cursor-pointer rounded-lg p-0.5")}
        variant={"ghost"}
      >
        <Skeleton
          className={cn(
            "relative flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted ring ring-border"
          )}
        />
      </Button>
    );
  }

  return (
    <ContextMenu modal={false}>
      <ContextMenuTrigger asChild>
        <Button
          className={cn(
            "size-fit cursor-pointer rounded-lg p-0.5",
            className,
            isActive &&
              "border-primary/50 text-foreground ring-[2px] ring-primary/50"
          )}
          onClick={onClick}
          style={{ "--primary": color }}
          variant={"ghost"}
          {...props}
        >
          <span
            className={cn(
              "relative flex size-3.5 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-primary shadow-xs ring ring-foreground/20"
            )}
          />
        </Button>
      </ContextMenuTrigger>

      <ContextMenuContent>
        <ContextMenuItem
          className="flex items-center justify-between transition hover:bg-accent"
          onClick={() => handleCopyColor("oklch")}
        >
          oklch
          <>
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "absolute scale-0" : "scale-100"
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "scale-100" : "absolute scale-0"
              )}
            />
          </>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center justify-between transition hover:bg-accent"
          onClick={() => handleCopyColor("hsl")}
        >
          hsl
          <>
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "absolute scale-0" : "scale-100"
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "scale-100" : "absolute scale-0"
              )}
            />
          </>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center justify-between transition hover:bg-accent"
          onClick={() => handleCopyColor("rgb")}
        >
          rgb
          <>
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "absolute scale-0" : "scale-100"
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "scale-100" : "absolute scale-0"
              )}
            />
          </>
        </ContextMenuItem>
        <ContextMenuItem
          className="flex items-center justify-between transition hover:bg-accent"
          onClick={() => handleCopyColor("hex")}
        >
          hex
          <>
            <Clipboard
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "absolute scale-0" : "scale-100"
              )}
            />
            <Check
              className={cn(
                "size-4 transition duration-200",
                isCopied ? "scale-100" : "absolute scale-0"
              )}
            />
          </>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
