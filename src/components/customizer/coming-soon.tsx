import { Clock } from "lucide-react";

export function ComingSoon() {
  return (
    <span className="flex items-center gap-2 text-muted-foreground text-sm">
      <Clock className="size-4" />
      Coming soon...
    </span>
  );
}
