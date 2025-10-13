"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Item } from "@/components/ui/item";

export function ItemDemo() {
  return (
    <div className="w-full space-y-3">
      <Item>
        <div>
          <p className="font-semibold leading-none">Team workspace</p>
          <p className="text-muted-foreground text-xs">
            Collaborate with up to 10 people
          </p>
        </div>
        <Badge variant="secondary">Active</Badge>
      </Item>

      <Item>
        <div>
          <p className="font-semibold leading-none">Pro plan</p>
          <p className="text-muted-foreground text-xs">
            $29 per month, billed yearly
          </p>
        </div>
        <Button size="sm">Upgrade</Button>
      </Item>
    </div>
  );
}
