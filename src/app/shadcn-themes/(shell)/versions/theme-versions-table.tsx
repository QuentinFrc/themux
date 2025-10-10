"use client";

import { useMemo, useState, useTransition } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ThemeVersionRecord } from "@/types/theme-update";
import { cn } from "@/lib/utils";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { usePreferencesActions } from "@/store/preferences-store";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, RotateCcw } from "lucide-react";

export type ThemeVersionRow = ThemeVersionRecord;

interface ThemeVersionsTableProps {
  versions: ThemeVersionRow[];
}

function RestoreThemeButton({ version, name, snapshot }: {
  version: number;
  name: string;
  snapshot: ThemeVersionRecord["config"];
}) {
  const { setConfig } = useThemeConfig();
  const { setTailwindVersion, setColorFormat, setShowFontVars, setShowShadowsVars } =
    usePreferencesActions();
  const [isRestoring, startTransition] = useTransition();

  return (
    <Button
      size="sm"
      variant="ghost"
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
    >
      <RotateCcw className={cn("size-4", isRestoring && "animate-spin")}
      />
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
            variant="ghost"
            className="px-0"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
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
              <Badge variant="outline" className="text-xs">
                Font vars
              </Badge>
            )}
            {row.original.config.options.shadowVars && (
              <Badge variant="outline" className="text-xs">
                Shadow vars
              </Badge>
            )}
            {!row.original.config.options.fontVars &&
              !row.original.config.options.shadowVars && (
                <span className="text-muted-foreground text-xs">Default</span>
              )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="px-0"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }
          >
            Created at
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        ),
        cell: ({ row }) =>
          format(row.original.createdAt, "PPpp"),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => (
          <RestoreThemeButton
            name={row.original.name}
            version={row.original.version}
            snapshot={row.original.config}
          />
        ),
      },
    ],
    [],
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
                          header.getContext(),
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
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
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
