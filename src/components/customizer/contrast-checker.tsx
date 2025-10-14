import { AlertTriangle, Check, Contrast } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { useContrastChecker } from "@/hooks/use-contrast-checker";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import type { ThemeMode, ThemeProperties } from "@/types/theme";
import { getOptimalForegroundColor } from "@/utils/colors";
import { ExternalLink } from "../external-link";
import { ModeSwitcher } from "../mode-switcher";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const MIN_CONTRAST_RATIO = 4.5;

type ColorCategory = "content" | "interactive" | "functional";

type ColorPair = {
  id: string;
  foregroundId: keyof ThemeProperties;
  backgroundId: keyof ThemeProperties;
  foreground: string | undefined;
  background: string | undefined;
  label: string;
  category: ColorCategory;
};

type GroupPair = {
  category: ColorCategory;
  label: string;
  pairs: ColorPair[];
};

export function ContrastChecker({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [filter, setFilter] = useState<"all" | "issues">("all");
  const { currentThemeObject } = useThemeConfig();
  const resolvedMode = useTheme().resolvedTheme as ThemeMode;
  const currentStyles = currentThemeObject[resolvedMode];

  const colorPairsToCheck: ColorPair[] = React.useMemo(
    () => [
      // Content - Base, background, cards, containers
      {
        id: "base",
        foregroundId: "foreground",
        backgroundId: "background",
        foreground: currentStyles?.["foreground"],
        background: currentStyles?.["background"],
        label: "Base",
        category: "content",
      },
      {
        id: "card",
        foregroundId: "card-foreground",
        backgroundId: "card",
        foreground: currentStyles?.["card-foreground"],
        background: currentStyles?.["card"],
        label: "Card",
        category: "content",
      },
      {
        id: "popover",
        foregroundId: "popover-foreground",
        backgroundId: "popover",
        foreground: currentStyles?.["popover-foreground"],
        background: currentStyles?.["popover"],
        label: "Popover",
        category: "content",
      },
      {
        id: "muted",
        foregroundId: "muted-foreground",
        backgroundId: "muted",
        foreground: currentStyles?.["muted-foreground"],
        background: currentStyles?.["muted"],
        label: "Muted",
        category: "content",
      },

      // Interactive - Buttons, links, actions
      {
        id: "primary",
        foregroundId: "primary-foreground",
        backgroundId: "primary",
        foreground: currentStyles?.["primary-foreground"],
        background: currentStyles?.["primary"],
        label: "Primary",
        category: "interactive",
      },
      {
        id: "secondary",
        foregroundId: "secondary-foreground",
        backgroundId: "secondary",
        foreground: currentStyles?.["secondary-foreground"],
        background: currentStyles?.["secondary"],
        label: "Secondary",
        category: "interactive",
      },
      {
        id: "accent",
        foregroundId: "accent-foreground",
        backgroundId: "accent",
        foreground: currentStyles?.["accent-foreground"],
        background: currentStyles?.["accent"],
        label: "Accent",
        category: "interactive",
      },

      // Functional - Sidebar, destructive, special purposes
      {
        id: "destructive",
        foregroundId: "destructive-foreground",
        backgroundId: "destructive",
        foreground: currentStyles?.["destructive-foreground"],
        background: currentStyles?.["destructive"],
        label: "Destructive",
        category: "functional",
      },
      {
        id: "sidebar",
        foregroundId: "sidebar-foreground",
        backgroundId: "sidebar",
        foreground: currentStyles?.["sidebar-foreground"],
        background: currentStyles?.["sidebar"],
        label: "Sidebar Base",
        category: "functional",
      },
      {
        id: "sidebar-primary",
        foregroundId: "sidebar-primary-foreground",
        backgroundId: "sidebar-primary",
        foreground: currentStyles?.["sidebar-primary-foreground"],
        background: currentStyles?.["sidebar-primary"],
        label: "Sidebar Primary",
        category: "functional",
      },
      {
        id: "sidebar-accent",
        foregroundId: "sidebar-accent-foreground",
        backgroundId: "sidebar-accent",
        foreground: currentStyles?.["sidebar-accent-foreground"],
        background: currentStyles?.["sidebar-accent"],
        label: "Sidebar Accent",
        category: "functional",
      },
    ],
    [currentStyles]
  );
  const validColorPairsToCheck = colorPairsToCheck.filter(
    (pair): pair is ColorPair & { foreground: string; background: string } =>
      !!pair.foreground && !!pair.background
  );

  const contrastResults = useContrastChecker(validColorPairsToCheck);

  const getContrastResult = (pairId: string) =>
    contrastResults?.find((res) => res.id === pairId);

  const totalIssues = contrastResults?.filter(
    (result) => result.contrastRatio < MIN_CONTRAST_RATIO
  ).length;

  const filteredPairs =
    filter === "all"
      ? colorPairsToCheck
      : colorPairsToCheck.filter((pair) => {
          const result = getContrastResult(pair.id);
          return result && result.contrastRatio < MIN_CONTRAST_RATIO;
        });

  // Group color pairs by category
  const categoryLabels: Record<ColorCategory, string> = {
    content: "Content & Containers",
    interactive: "Interactive Elements",
    functional: "Navigation & Functional",
  };

  const categories: ColorCategory[] = ["content", "interactive", "functional"];
  const groupedPairs: GroupPair[] = categories
    .map((category) => ({
      category,
      label: categoryLabels[category],
      pairs: filteredPairs.filter((pair) => pair.category === category),
    }))
    .filter((group) => group.pairs.length > 0);

  return (
    <>
      {/* A Drawer for smaller screens */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className={cn("flex cursor-pointer md:hidden", className)}
            size="sm"
            variant="ghost"
            {...props}
          >
            <Contrast />
            <span className="@xl:inline-flex hidden">Contrast</span>
            <span className="sr-only">Check constrast</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="font-semibold leading-none tracking-tight">
              Contrast checker
            </DrawerTitle>

            <DrawerDescription className="text-muted-foreground text-xs">
              WCAG 2.0 AA requires a contrast ratio of at least{" "}
              {MIN_CONTRAST_RATIO}:1{" • "}
              <ExternalLink
                className="text-primary"
                href="https://www.w3.org/TR/WCAG21/"
                showIcon
              >
                Learn more
              </ExternalLink>
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4">
            <ActionButtons
              filter={filter}
              setFilter={setFilter}
              totalIssues={totalIssues}
            />
          </div>

          <ContrastCheckerResults
            className="max-h-[450px]"
            getContrastResult={getContrastResult}
            groupedPairs={groupedPairs}
          />
        </DrawerContent>
      </Drawer>

      {/* A Dialog for larger screens */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={cn("hidden cursor-pointer md:flex", className)}
            size="sm"
            variant="ghost"
            {...props}
          >
            <Contrast />
            <span className="@xl:inline-flex hidden">Contrast</span>
            <span className="sr-only">Check constrast</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="min-h-[400px] space-y-2 overflow-hidden rounded-lg bg-background outline-none sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="font-semibold leading-none tracking-tight">
              Contrast checker
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs">
              WCAG 2.0 AA requires a contrast ratio of at least{" "}
              {MIN_CONTRAST_RATIO}:1{" • "}
              <ExternalLink
                className="text-primary"
                href="https://www.w3.org/TR/WCAG21/"
                showIcon
              >
                Learn more
              </ExternalLink>
            </DialogDescription>
          </DialogHeader>

          <ActionButtons
            filter={filter}
            setFilter={setFilter}
            totalIssues={totalIssues}
          />

          <ContrastCheckerResults
            getContrastResult={getContrastResult}
            groupedPairs={groupedPairs}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function ActionButtons({
  filter,
  setFilter,
  totalIssues,
}: {
  filter: "all" | "issues";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "issues">>;
  totalIssues: number;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        className={cn(
          "ring transition-colors",
          filter === "all"
            ? "ring-transparent"
            : "text-muted-foreground ring-muted-foreground"
        )}
        onClick={() => setFilter("all")}
        size="sm"
        variant={filter === "all" ? "default" : "ghost"}
      >
        All
      </Button>
      <Button
        className={cn(
          "ring transition-colors",
          filter === "issues"
            ? "ring-transparent"
            : "text-muted-foreground ring-muted-foreground"
        )}
        disabled={totalIssues === 0}
        onClick={() => setFilter("issues")}
        size="sm"
        variant={filter === "issues" ? "default" : "ghost"}
      >
        <AlertTriangle className={cn("mr-1 h-3 w-3")} />
        Issues ({totalIssues})
      </Button>

      <ModeSwitcher className="ml-auto" />
    </div>
  );
}

interface ContrastCheckerResultsProps extends React.ComponentProps<"div"> {
  groupedPairs: GroupPair[];
  getContrastResult: (pairId: string) => any;
}

function ContrastCheckerResults({
  groupedPairs,
  getContrastResult,
  className,
}: ContrastCheckerResultsProps) {
  return (
    <div
      className={cn(
        "relative h-[500px] w-full overflow-hidden rounded-lg border bg-card shadow",
        className
      )}
    >
      <ScrollArea className="h-full">
        <div className="space-y-6 p-4">
          {groupedPairs.map((group) => (
            <div className="space-y-4" key={group.category}>
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-md">{group.label}</h2>
                <Separator className="flex-1" />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {group.pairs.map((pair) => {
                  const result = getContrastResult(pair.id);
                  const isValid =
                    result?.contrastRatio !== undefined &&
                    result?.contrastRatio >= MIN_CONTRAST_RATIO;
                  const contrastRatio =
                    result?.contrastRatio?.toFixed(2) ?? "N/A";

                  return (
                    <Card
                      className={cn(
                        "overflow-hidden p-0 transition-all duration-200",
                        !isValid && "border-dashed"
                      )}
                      key={pair.id}
                    >
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between bg-background p-4 py-2">
                          <h3
                            className={cn(
                              "flex items-center font-medium text-sm",
                              !isValid && "text-destructive"
                            )}
                          >
                            {pair.label}
                            {!isValid && (
                              <AlertTriangle className="ml-1 size-3.5" />
                            )}
                          </h3>
                          <Badge
                            className={cn(
                              "flex items-center gap-1 text-xs",
                              isValid
                                ? "bg-muted text-muted-foreground"
                                : "bg-destructive text-white"
                            )}
                            variant={isValid ? "default" : "destructive"}
                          >
                            {isValid ? (
                              <>
                                <Check className="h-3 w-3" />
                                {contrastRatio}
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3" />
                                {contrastRatio}
                              </>
                            )}
                          </Badge>
                        </div>

                        <Separator />

                        <div className="flex items-center gap-2 overflow-hidden p-4">
                          <div className="flex w-full flex-1 flex-col gap-3">
                            <div className="flex w-full items-center gap-3">
                              <div
                                className="h-10 w-10 flex-shrink-0 rounded-md border"
                                style={{
                                  backgroundColor: pair.background ?? "#000000",
                                }}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-xs">
                                  Background
                                </span>
                                <span className="line-clamp-1 font-mono text-muted-foreground text-xs">
                                  {pair.background}
                                </span>
                              </div>
                            </div>

                            <div className="flex w-full items-center gap-3">
                              <div
                                className="h-10 w-10 flex-shrink-0 rounded-md border"
                                style={{
                                  backgroundColor: pair.foreground ?? "#ffffff",
                                }}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium text-xs">
                                  Foreground
                                </span>
                                <span className="line-clamp-1 font-mono text-muted-foreground text-xs">
                                  {pair.foreground}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div
                            className="flex h-full min-h-[100px] flex-1 items-center justify-center overflow-hidden rounded-lg border"
                            style={{
                              backgroundColor: pair.background ?? "transparent",
                            }}
                          >
                            {pair.foreground && pair.background ? (
                              <div className="flex h-full flex-col items-center gap-2 p-2 text-center">
                                <p
                                  className="font-bold text-4xl tracking-wider"
                                  style={{ color: pair.foreground }}
                                >
                                  Aa
                                </p>
                                <p
                                  className="font-medium text-sm"
                                  style={{ color: pair.foreground }}
                                >
                                  Sample Text
                                </p>
                              </div>
                            ) : (
                              <p
                                className="text-foreground text-xs"
                                style={{
                                  "--foreground": getOptimalForegroundColor(
                                    pair.background ?? "#000000",
                                    pair.foreground ?? "#ffffff"
                                  ),
                                }}
                              >
                                Preview
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
