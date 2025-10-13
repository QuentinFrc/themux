"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import isEqual from "lodash/isEqual";
import { ArrowUpDown, GitCompare, RotateCcw } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
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
  name,
  snapshot,
}: {
  version: number;
  name: string;
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
          toast.success(`Restored ${name} v${version}`);
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
        accessorKey: "name",
        header: "Theme",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium capitalize">{row.original.name}</span>
            <span className="text-muted-foreground text-xs">
              {row.original.config.theme.themeObject.label}
            </span>
          </div>
        ),
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
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <ViewDiffDialog
              name={row.original.name}
              snapshot={row.original.config}
              version={row.original.version}
            />
            <RestoreThemeButton
              name={row.original.name}
              snapshot={row.original.config}
              version={row.original.version}
            />
          </div>
        ),
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
