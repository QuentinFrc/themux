// pulled from https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/component-wrapper.tsx#L7
"use client";

import { cn } from "@/lib/utils";
import { Check, Clipboard, Globe, Terminal } from "lucide-react";
import * as React from "react";
import { ExternalLink } from "../external-link";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export function ComponentWrapper({
  className,
  name,
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & { name: string }) {
  const [copied, setCopied] = React.useState(false);

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

                <ExternalLink
                  href={`https://ui.shadcn.com/docs/components/${name}`}
                  showIcon
                  className="size-fit cursor-pointer p-1"
                >
                  <Globe className="size-4" />
                </ExternalLink>
              </div>
            </Alert>
          </div>
        </div>
        <div className="flex flex-1 items-center gap-2 p-4">{children}</div>
      </div>
    </ComponentErrorBoundary>
  );
}

class ComponentErrorBoundary extends React.Component<
  { children: React.ReactNode; name: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; name: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Error in component ${this.props.name}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong in component: {this.props.name}
        </div>
      );
    }

    return this.props.children;
  }
}

function getComponentName(name: string) {
  // convert kebab-case to title case
  return name.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
