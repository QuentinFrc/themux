// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/component-wrapper.tsx#L7
"use client";

import { Check, Clipboard, Expand, Globe, Terminal } from "lucide-react";
import type * as React from "react";
import { ComponentErrorBoundary } from "@/components/error-boundary";
import { ExternalLink } from "@/components/external-link";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn, getComponentName } from "@/lib/utils";

export function ComponentWrapper({
  className,
  name,
  children,
  internalUrl,
  showUrl = true,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  name: string;
  internalUrl?: string;
  showUrl?: boolean;
}) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <ComponentErrorBoundary name={name}>
      <div
        className={cn(
          "@container flex w-full scroll-mt-16 flex-col overflow-clip rounded-lg border shadow",
          className
        )}
        data-name={name.toLowerCase()}
        id={name}
        {...props}
      >
        <div className="border-b px-4 py-3">
          <div className="flex @lg:flex-row flex-col items-center justify-between gap-2 font-medium text-xs lg:text-sm">
            <span className="shrink-0 font-semibold">
              {getComponentName(name)}
            </span>

            <Alert className="flex w-full @lg:max-w-1/3 items-center border border-primary/30 bg-primary/10 px-4 py-1 shadow-sm">
              <div className="pr-2">
                <Terminal className="size-4" />
              </div>

              <AlertTitle className="w-full text-pretty font-mono text-xs">
                {"npx shadcn@latest add "}
                <span>{name}</span>
              </AlertTitle>

              <div className="ml-auto flex items-center">
                <TooltipWrapper asChild label="Copy command">
                  <Button
                    className="relative size-4 cursor-pointer p-1"
                    onClick={() =>
                      copyToClipboard(`npx shadcn@latest add ${name}`)
                    }
                    size={"icon"}
                    variant={"ghost"}
                  >
                    <Clipboard
                      className={cn(
                        "absolute size-4 transition duration-200",
                        isCopied ? "scale-0" : "scale-100"
                      )}
                    />
                    <Check
                      className={cn(
                        "absolute size-4 transition duration-200",
                        isCopied ? "scale-100" : "scale-0"
                      )}
                    />
                  </Button>
                </TooltipWrapper>

                {showUrl && (
                  <TooltipWrapper asChild label="Shadcn docs">
                    <ExternalLink
                      className="size-fit cursor-pointer p-1"
                      href={
                        internalUrl
                          ? `${baseUrl}${internalUrl}`
                          : `https://ui.shadcn.com/docs/components/${name}`
                      }
                      showIcon
                    >
                      {internalUrl ? (
                        <Expand className="size-4" />
                      ) : (
                        <Globe className="size-4" />
                      )}
                    </ExternalLink>
                  </TooltipWrapper>
                )}
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-1 @5xl:flex-row flex-col @5xl:items-start items-center justify-center gap-8 p-4",
            className
          )}
        >
          {children}
        </div>
      </div>
    </ComponentErrorBoundary>
  );
}
