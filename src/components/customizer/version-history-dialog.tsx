"use client";

import { useEffect, useMemo, useState } from "react";
import { History } from "lucide-react";

import { listThemeVersions } from "@/actions/theme";
import { ThemeVersionsTable } from "@/app/shadcn-themes/(shell)/versions/theme-versions-table";
import { TooltipWrapper } from "@/components/tooltip-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import type { ThemeVersionRecord } from "@/types/theme-update";
import { cn } from "@/lib/utils";

interface VersionHistoryDialogProps {
  className?: string;
}

export function VersionHistoryDialog({
  className,
}: VersionHistoryDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [versions, setVersions] = useState<ThemeVersionRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (versions !== null || isLoading) return;

    let isActive = true;
    setIsLoading(true);

    listThemeVersions()
      .then((data) => {
        if (!isActive) return;
        setVersions(data);
        setLoadError(null);
      })
      .catch(() => {
        if (!isActive) return;
        setLoadError("Unable to load theme history. Please try again.");
      })
      .finally(() => {
        if (!isActive) return;
        setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, [isOpen, isLoading, versions]);

  const showEmptyState = useMemo(
    () => !isLoading && versions !== null && versions.length === 0,
    [isLoading, versions]
  );

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <TooltipWrapper
        asChild
        label="Browse the saved versions for this theme"
      >
        <DialogTrigger asChild>
          <Button
            className={cn("gap-2", className)}
            size="sm"
            type="button"
            variant="outline"
          >
            <History className="size-4" />
            <span className="hidden sm:inline">History</span>
            <span className="sm:hidden">History</span>
          </Button>
        </DialogTrigger>
      </TooltipWrapper>

      <DialogContent className="sm:max-w-5xl w-full max-w-[min(100vw-2rem,960px)] max-h-[min(90vh,48rem)] overflow-hidden p-0">
        <DialogHeader className="space-y-2 px-6 pt-6">
          <DialogTitle>Theme history</DialogTitle>
          <DialogDescription>
            Review saved versions, inspect their metadata, compare diffs, and
            restore previous configurations.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 pb-6">
          {loadError ? (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-destructive text-sm">
              {loadError}
            </div>
          ) : null}

          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : null}

          {showEmptyState ? (
            <div className="text-muted-foreground text-sm">
              No theme versions saved yet.
            </div>
          ) : null}

          {versions && versions.length ? (
            <ScrollArea className="h-[min(60vh,28rem)] pr-4">
              <ThemeVersionsTable versions={versions} />
            </ScrollArea>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
