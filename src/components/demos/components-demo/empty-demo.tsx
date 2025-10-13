"use client";

import { Button } from "@/components/ui/button";
import { Empty } from "@/components/ui/empty";

export function EmptyDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Empty>
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-base">You're all caught up</span>
          <p className="text-muted-foreground text-xs">
            No pending notifications right now.
          </p>
          <Button size="sm" variant="outline">
            Refresh
          </Button>
        </div>
      </Empty>

      <Empty className="border-dashed bg-muted/10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-semibold text-base">Invite your team</span>
          <p className="text-muted-foreground text-xs">
            Share a link so everyone can collaborate.
          </p>
        </div>
      </Empty>
    </div>
  );
}
