// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/component-wrapper.tsx#L7
"use client";

import { cn } from "@/lib/utils";
import { Check, Clipboard, Expand, Globe, Terminal } from "lucide-react";
import * as React from "react";
import { ComponentErrorBoundary } from "../error-boundary";
import { ExternalLink } from "../external-link";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

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
  const [copied, setCopied] = React.useState(false);
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://themux.vercel.app";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`pnpm dlx shadcn@latest add ${name}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <ComponentErrorBoundary name={name}>
      <div
        id={name}
        data-name={name.toLowerCase()}
        className={cn(
          "@container flex w-full scroll-mt-16 flex-col overflow-clip rounded-lg border",
          className,
        )}
        {...props}
      >
        <div className="border-b px-4 py-3">
          <div className="flex flex-col items-center gap-2 text-xs font-medium lg:text-sm @lg:flex-row">
            <span className="shrink-0 font-semibold">
              {getComponentName(name)}
            </span>
            <Alert className="border-primary/30 bg-primary/10 ml-auto flex w-full items-center border px-4 py-1 @lg:max-w-1/2">
              <div className="pr-2">
                <Terminal className="size-4" />
              </div>

              <AlertTitle className="w-full font-mono text-pretty">
                {`pnpm dlx shadcn@latest add `}
                <span className="text-foreground">{name}</span>
              </AlertTitle>

              <div className="ml-auto flex items-center">
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  className="relative size-4 cursor-pointer p-1"
                  onClick={copyToClipboard}
                >
                  <Clipboard
                    className={cn(
                      "absolute size-4 transition duration-200",
                      copied ? "scale-0" : "scale-100",
                    )}
                  />

                  <Check
                    className={cn(
                      "absolute size-4 transition duration-200",
                      !copied ? "scale-0" : "scale-100",
                    )}
                  />
                </Button>

                {showUrl && (
                  <ExternalLink
                    href={
                      internalUrl
                        ? `${baseUrl}${internalUrl}`
                        : `https://ui.shadcn.com/docs/components/${name}`
                    }
                    showIcon
                    className="size-fit cursor-pointer p-1"
                  >
                    {internalUrl ? (
                      <Expand className="size-4" />
                    ) : (
                      <Globe className="size-4" />
                    )}
                  </ExternalLink>
                )}
              </div>
            </Alert>
          </div>
        </div>
        <div
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-8 p-4 @5xl:flex-row @5xl:items-start",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </ComponentErrorBoundary>
  );
}

function getComponentName(name: string) {
  // convert kebab-case to title case
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
