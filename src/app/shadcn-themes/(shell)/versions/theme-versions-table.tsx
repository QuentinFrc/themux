"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";
import isEqual from "lodash/isEqual";
import { JsonDiffView } from "@/components/json-diff-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { usePreferencesActions } from "@/store/preferences-store";
import type { ThemeVersionRecord } from "@/types/theme-update";
import { toast } from "sonner";
import { diffThemeSnapshots, ThemeDiffEntry } from "@/utils/theme-diff";
import { ArrowUpDown, GitCompare, RotateCcw } from "lucide-react";

export type ThemeVersionRow = ThemeVersionRecord;

interface ThemeVersionsTableProps {
  versions: ThemeVersionRow[];
}

function ViewDiffDialog({
  snapshot,
  name,
  version,
}: {
  snapshot: ThemeVersionRecord["config"];
  name: string;
  version: number;
}) {
  const { config: currentConfig } = useThemeConfig();
  const [isOpen, setIsOpen] = useState(false);

  const hasDifferences = useMemo(
    () => !isEqual(snapshot.theme, currentConfig),
    [snapshot.theme, currentConfig]
  );

  const optionLabels = useMemo(() => {
    const labels = [] as string[];
    if (snapshot.options.fontVars) {
      labels.push("Font vars");
    }
    if (snapshot.options.shadowVars) {
      labels.push("Shadow vars");
    }
    if (!labels.length) {
      labels.push("Default options");
    }
    return labels;
  }, [snapshot.options.fontVars, snapshot.options.shadowVars]);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="gap-1" size="sm" variant="ghost">
          <GitCompare className="size-4" />
          Diff
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl space-y-4">
        <DialogHeader>
          <DialogTitle>
            Compare {name} v{version}
          </DialogTitle>
          <DialogDescription>
            {hasDifferences
              ? "Review the JSON diff between this snapshot and your current theme configuration."
              : "This snapshot matches your current theme configuration."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs">
          <Badge className="text-xs" variant="outline">
            Format: {snapshot.colorFormat}
          </Badge>
          <Badge className="text-xs" variant="outline">
            Tailwind: v{snapshot.tailwindVersion}
          </Badge>
          {optionLabels.map((label) => (
            <Badge className="text-xs" key={label} variant="outline">
              {label}
            </Badge>
          ))}
        </div>

        <JsonDiffView
          leftLabel={`${name} v${version}`}
          original={snapshot.theme}
          rightLabel="Current theme"
          updated={currentConfig}
        />
      </DialogContent>
    </Dialog>
  );
}

function RestoreThemeButton({
  version,
  label,
  snapshot,
}: {
  version: number;
  label: string;
  snapshot: ThemeVersionRecord["config"];
}) {
  const { setConfig } = useThemeConfig();
  const {
    setTailwindVersion,
    setColorFormat,
    setShowFontVars,
    setShowShadowsVars,
  } = usePreferencesActions();
  const [isRestoring, startTransition] = useTransition();

  return (
    <Button
      className="gap-1"
      disabled={isRestoring}
      onClick={() => {
        startTransition(() => {
          setConfig(snapshot.theme);
          setTailwindVersion(snapshot.tailwindVersion);
          setColorFormat(snapshot.colorFormat);
          setShowFontVars(snapshot.options.fontVars);
          setShowShadowsVars(snapshot.options.shadowVars);
          toast.success(`Restored ${label} v${version}`);
        });
      }}
      size="sm"
      variant="ghost"
    >
      <RotateCcw className={cn("size-4", isRestoring && "animate-spin")} />
      Restore
    </Button>
  );
}

function DiffThemeButton({
  snapshot,
  version,
  label,
}: {
  snapshot: ThemeVersionRecord["config"];
  version: number;
  label: string;
}) {
  const { config } = useThemeConfig();
  const colorFormat = useColorFormat();
  const tailwindVersion = useTailwindVersion();
  const showFontVars = useFontVars();
  const showShadowVars = useShadowVars();
  const [open, setOpen] = useState(false);

  const currentSnapshot = useMemo(
    () =>
      createThemeSnapshot({
        themeConfig: config,
        colorFormat,
        tailwindVersion,
        includeFontVars: showFontVars,
        includeShadowVars: showShadowVars,
      }),
    [config, colorFormat, tailwindVersion, showFontVars, showShadowVars],
  );

  const differences = useMemo<ThemeDiffEntry[]>(
    () => diffThemeSnapshots(currentSnapshot, snapshot),
    [currentSnapshot, snapshot],
  );

  const formatValue = (value: unknown) => {
    if (value === undefined) return "undefined";
    if (typeof value === "string") return value;
    return JSON.stringify(value, null, 2);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <GitCompare className="size-4" />
          Diff
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-3xl">
        <DialogHeader>
          <DialogTitle>Differences with v{version}</DialogTitle>
          <DialogDescription>
            Comparing your current configuration with {label} v{version}.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          {differences.length ? (
            <div className="space-y-4 pr-2">
              {differences.map((entry) => (
                <div
                  key={entry.path}
                  className="rounded-md border bg-muted/30 p-3"
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {entry.path}
                  </p>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold">Current</h4>
                      <pre className="bg-background mt-1 max-h-48 overflow-auto rounded border p-2 text-xs">
                        {formatValue(entry.current)}
                      </pre>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Version v{version}</h4>
                      <pre className="bg-background mt-1 max-h-48 overflow-auto rounded border p-2 text-xs">
                        {formatValue(entry.selected)}
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Your current configuration already matches this version.
            </p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export function ThemeVersionsTable({ versions }: ThemeVersionsTableProps) {
  const columns = useMemo<ColumnDef<ThemeVersionRow>[]>(
    () => [
      {
        accessorKey: "version",
        header: ({ column }) => (
          <Button
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="ghost"
          >
            Version
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="font-semibold">v{row.original.version}</span>
        ),
      },
      {
        id: "theme",
        header: "Theme",
        cell: ({ row }) => {
          const themeObject = row.original.config.theme.themeObject;
          const themeLabel = themeObject.label ?? themeObject.name ?? "Theme";

          return (
            <div className="flex flex-col">
              <span className="font-medium capitalize">{themeLabel}</span>
              {themeObject.name ? (
                <span className="text-muted-foreground text-xs">
                  {themeObject.name}
                </span>
              ) : null}
            </div>
          );
        },
      },
      {
        accessorKey: "config.colorFormat",
        header: "Color format",
        cell: ({ row }) => row.original.config.colorFormat,
      },
      {
        accessorKey: "config.tailwindVersion",
        header: "Tailwind",
        cell: ({ row }) => `v${row.original.config.tailwindVersion}`,
      },
      {
        id: "options",
        header: "Options",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.config.options.fontVars && (
              <Badge className="text-xs" variant="outline">
                Font vars
              </Badge>
            )}
            {row.original.config.options.shadowVars && (
              <Badge className="text-xs" variant="outline">
                Shadow vars
              </Badge>
            )}
            {!(
              row.original.config.options.fontVars ||
              row.original.config.options.shadowVars
            ) && <span className="text-muted-foreground text-xs">Default</span>}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            className="px-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            variant="ghost"
          >
            Created at
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) => format(row.original.createdAt, "PPpp"),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => {
          const themeObject = row.original.config.theme.themeObject;
          const themeLabel = themeObject.label ?? themeObject.name ?? "Theme";
          const versionHref = `/shadcn-themes?versionId=${encodeURIComponent(row.original.id)}`;

          return (
            <div className="flex flex-wrap items-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href={versionHref}>View</Link>
              </Button>
              <ViewDiffDialog
                name={themeLabel}
                version={row.original.version}
                snapshot={row.original.config}
              />
              <RestoreThemeButton
                label={themeLabel}
                version={row.original.version}
                snapshot={row.original.config}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<SortingState>([
    { id: "version", desc: true },
  ]);

  const table = useReactTable({
    data: versions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No theme versions saved yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
