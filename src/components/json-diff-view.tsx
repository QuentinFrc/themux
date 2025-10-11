"use client";

import * as React from "react";
import { diffLines, Change } from "diff";

import { cn } from "@/lib/utils";

type ChangeType = "removed" | "added";

type DiffRow = {
  leftLineNumber?: number;
  rightLineNumber?: number;
  leftText?: string;
  rightText?: string;
  leftChange?: ChangeType;
  rightChange?: ChangeType;
};

function normalizeLines(value: string) {
  const lines = value.split("\n");
  if (lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
}

function buildDiffRows(original: string, updated: string): DiffRow[] {
  const changes = diffLines(original, updated);
  const rows: DiffRow[] = [];
  let leftLine = 1;
  let rightLine = 1;

  for (let index = 0; index < changes.length; index++) {
    const part = changes[index] as Change;

    if (part.removed) {
      const removedLines = normalizeLines(part.value);
      const next = changes[index + 1];
      const addedLines = next?.added ? normalizeLines(next.value) : [];

      const max = Math.max(removedLines.length, addedLines.length);

      for (let lineIndex = 0; lineIndex < max; lineIndex++) {
        rows.push({
          leftLineNumber:
            lineIndex < removedLines.length ? leftLine++ : undefined,
          rightLineNumber:
            lineIndex < addedLines.length ? rightLine++ : undefined,
          leftText: removedLines[lineIndex],
          rightText: addedLines[lineIndex],
          leftChange: lineIndex < removedLines.length ? "removed" : undefined,
          rightChange: lineIndex < addedLines.length ? "added" : undefined,
        });
      }

      if (next?.added) {
        index += 1;
      }
      continue;
    }

    if (part.added) {
      const lines = normalizeLines(part.value);
      for (const line of lines) {
        rows.push({
          rightLineNumber: rightLine++,
          rightText: line,
          rightChange: "added",
        });
      }
      continue;
    }

    const lines = normalizeLines(part.value);
    for (const line of lines) {
      rows.push({
        leftLineNumber: leftLine++,
        rightLineNumber: rightLine++,
        leftText: line,
        rightText: line,
      });
    }
  }

  return rows;
}

function stringify(value: unknown) {
  return JSON.stringify(value, null, 2) + "\n";
}

export interface JsonDiffViewProps {
  original: unknown;
  updated: unknown;
  leftLabel?: string;
  rightLabel?: string;
}

export function JsonDiffView({
  original,
  updated,
  leftLabel = "Saved snapshot",
  rightLabel = "Current state",
}: JsonDiffViewProps) {
  const diffRows = React.useMemo(
    () => buildDiffRows(stringify(original), stringify(updated)),
    [original, updated],
  );

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b bg-muted/50 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <div className="flex items-center gap-2 border-r px-4 py-2">
          <span className="text-muted-foreground/80">{leftLabel}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <span className="text-muted-foreground/80">{rightLabel}</span>
        </div>
      </div>
      <div className="max-h-[70vh] overflow-auto">
        <table className="w-full table-fixed border-separate border-spacing-0 font-mono text-[0.75rem] sm:text-sm">
          <tbody>
            {diffRows.map((row, index) => (
              <tr key={`${row.leftLineNumber}-${row.rightLineNumber}-${index}`} className="border-b last:border-b-0">
                <td className="w-12 select-none border-r bg-muted/40 px-2 text-right text-muted-foreground">
                  {row.leftLineNumber ?? ""}
                </td>
                <td
                  className={cn(
                    "w-1/2 whitespace-pre-wrap border-r px-3 align-top",
                    row.leftChange === "removed" &&
                      "bg-destructive/15 text-destructive",
                  )}
                >
                  {row.leftText ?? ""}
                </td>
                <td className="w-12 select-none border-r bg-muted/40 px-2 text-right text-muted-foreground">
                  {row.rightLineNumber ?? ""}
                </td>
                <td
                  className={cn(
                    "w-1/2 whitespace-pre-wrap px-3 align-top",
                    row.rightChange === "added" &&
                      "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
                  )}
                >
                  {row.rightText ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
