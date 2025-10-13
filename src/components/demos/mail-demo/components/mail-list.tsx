import { formatDistanceToNow } from "date-fns";
import type { ComponentProps } from "react";

import type { Mail } from "@/components/demos/mail-demo/data";
import { useMail } from "@/components/demos/mail-demo/use-mail";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MailListProps {
  items: Mail[];
}

export function MailList({ items }: MailListProps) {
  const [mail, setMail] = useMail();

  return (
    <>
      {items.map((item) => (
        <button
          className={cn(
            "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent hover:text-accent-foreground",
            mail.selected === item.id && "bg-muted"
          )}
          key={item.id}
          onClick={() =>
            setMail({
              ...mail,
              selected: item.id,
            })
          }
        >
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="font-semibold">{item.name}</div>
                {!item.read && (
                  <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                )}
              </div>
              <div
                className={cn(
                  "ml-auto text-xs",
                  mail.selected === item.id
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                })}
              </div>
            </div>
            <div className="font-medium text-xs">{item.subject}</div>
          </div>
          <div className="line-clamp-2 text-muted-foreground text-xs">
            {item.text.substring(0, 300)}
          </div>
          {item.labels.length ? (
            <div className="flex items-center gap-2">
              {item.labels.map((label) => (
                <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                  {label}
                </Badge>
              ))}
            </div>
          ) : null}
        </button>
      ))}
    </>
  );
}

function getBadgeVariantFromLabel(
  label: string
): ComponentProps<typeof Badge>["variant"] {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
