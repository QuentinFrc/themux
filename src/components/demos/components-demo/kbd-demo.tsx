"use client";

import { Kbd } from "@/components/ui/kbd";

export function KbdDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Kbd>⌘</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
        <span className="sr-only">Open command palette</span>
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Kbd>⇧</Kbd>
        <span>+</span>
        <Kbd>P</Kbd>
        <span className="sr-only">Switch profile</span>
      </div>
      <Kbd className="text-xs">Esc</Kbd>
    </div>
  );
}
