"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ColumnDef, SortingState, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { ThemeCommitDialog } from "@/components/customizer/theme-commit-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCommitAuthor } from "@/hooks/use-commit-author";
import { useThemeConfig } from "@/hooks/use-theme-config";
import { cn } from "@/lib/utils";
import { usePreferencesActions } from "@/store/preferences-store";
import { ThemeVersionRecord } from "@/types/theme-update";
import { updateTheme } from "@/actions/theme";

export type ThemeVersionRow = ThemeVersionRecord;

interface ThemeVersionsTableProps {
  versions: ThemeVersionRow[];
}

function RestoreThemeButton({ record }: { record: ThemeVersionRecord }) {
  const { setConfig } = useThemeConfig();
  const { setTailwindVersion, setColorFormat, setShowFontVars, setShowShadowsVars } =
    usePreferencesActions();
  const { author, setAuthor } = useCommitAuthor();
  const [isRestoring, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commitMessage, setCommitMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const defaultMessage = useMemo(
    () => `Restore ${record.name} to ${record.commit.hash.slice(0, 7)}`,
    [record.commit.hash, record.name],
  );

  useEffect(() => {
    setCommitMessage(defaultMessage);
  }, [defaultMessage]);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);

    if (!open) {
      setFormError(null);
    }
  };

  const handleRestore = () => {
    const trimmedName = author.name.trim();
    const trimmedEmail = author.email.trim();
    const trimmedMessage = commitMessage.trim();

    if (!trimmedName) {
      setFormError("Author name is required.");
      return;
    }

    setFormError(null);

    startTransition(async () => {
      const result = await updateTheme({
        themeConfig: record.config.theme,
        colorFormat: record.config.colorFormat,
        tailwindVersion: record.config.tailwindVersion,
        includeFontVars: record.config.options.fontVars,
        includeShadowVars: record.config.options.shadowVars,
        snapshot: record.config,
        commit: {
          message: trimmedMessage,
          author: {
            name: trimmedName,
            email: trimmedEmail ? trimmedEmail : undefined,
          },
        },
      });

      if (result.success) {
        const { data } = result;
        setConfig(record.config.theme);
        setTailwindVersion(record.config.tailwindVersion);
        setColorFormat(record.config.colorFormat);
        setShowFontVars(record.config.options.fontVars);
        setShowShadowsVars(record.config.options.shadowVars);
        setAuthor({ name: trimmedName, email: trimmedEmail });
        setIsDialogOpen(false);

        toast.success(
          `Restored ${data.name} (${data.commit.hash.slice(0, 7)})`,
        );
        return;
      }

      toast.error(result.error);
    });
  };

  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="gap-1"
        disabled={isRestoring}
        onClick={() => handleDialogChange(true)}
      >
        <RotateCcw className={cn("size-4", isRestoring && "animate-spin")}
        />
        Restore
      </Button>

      <ThemeCommitDialog
        open={isDialogOpen}
        onOpenChange={handleDialogChange}
        title="Restore theme"
        description="Confirm the restoration commit. The message is generated automatically."
        message={commitMessage}
        onMessageChange={setCommitMessage}
        author={author}
        onAuthorChange={setAuthor}
        onSubmit={handleRestore}
        isSubmitting={isRestoring}
        submitLabel="Restore"
        error={formError}
        messageReadOnly
      />
    </>
  );
}

export function ThemeVersionsTable({ versions }: ThemeVersionsTableProps) {
  const columns = useMemo<ColumnDef<ThemeVersionRow>[]>(
    () => [
      {
        accessorKey: "commit.hash",
        header: "Commit",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.commit.message}</span>
            <span className="text-muted-foreground text-xs">
              {row.original.commit.hash.slice(0, 7)}
            </span>
          </div>
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
        accessorKey: "commit.author.name",
        header: "Author",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium">{row.original.commit.author.name}</span>
            {row.original.commit.author.email ? (
              <span className="text-muted-foreground text-xs">
                {row.original.commit.author.email}
              </span>
            ) : null}
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
        cell: ({ row }) => format(row.original.createdAt, "PPpp"),
      },
      {
        id: "actions",
        header: "",
        enableSorting: false,
        cell: ({ row }) => <RestoreThemeButton record={row.original} />, 
      },
    ],
    [],
  );

  const [sorting, setSorting] = useState<SortingState>([
    { id: "createdAt", desc: true },
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
