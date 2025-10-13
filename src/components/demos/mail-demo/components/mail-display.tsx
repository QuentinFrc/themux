import { addDays, addHours, format, nextSaturday } from "date-fns";
import {
  Archive,
  ArchiveX,
  Clock,
  Forward,
  MoreVertical,
  Reply,
  ReplyAll,
  Trash2,
} from "lucide-react";

import type { Mail } from "@/components/demos/mail-demo/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface MailDisplayProps {
  mail: Mail | null;
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const today = new Date();

  return (
    <div className="flex grow flex-col">
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Button disabled={!mail} size="icon" title="Archive" variant="ghost">
            <Archive className="h-4 w-4" />
            <span className="sr-only">Archive</span>
          </Button>
          <Button
            disabled={!mail}
            size="icon"
            title="Move to junk"
            variant="ghost"
          >
            <ArchiveX className="h-4 w-4" />
            <span className="sr-only">Move to junk</span>
          </Button>
          <Button
            disabled={!mail}
            size="icon"
            title="Move to trash"
            variant="ghost"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Move to trash</span>
          </Button>
          <Separator className="mx-1 h-6" orientation="vertical" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={!mail}
                size="icon"
                title="Snooze"
                variant="ghost"
              >
                <Clock className="h-4 w-4" />
                <span className="sr-only">Snooze</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-[535px] p-0">
              <div className="flex flex-col gap-2 border-r px-2 py-4">
                <div className="px-4 font-medium text-sm">Snooze until</div>
                <div className="grid min-w-[250px] gap-1">
                  <Button className="justify-start font-normal" variant="ghost">
                    Later today{" "}
                    <span className="ml-auto text-muted-foreground">
                      {format(addHours(today, 4), "E, h:m b")}
                    </span>
                  </Button>
                  <Button className="justify-start font-normal" variant="ghost">
                    Tomorrow
                    <span className="ml-auto text-muted-foreground">
                      {format(addDays(today, 1), "E, h:m b")}
                    </span>
                  </Button>
                  <Button className="justify-start font-normal" variant="ghost">
                    This weekend
                    <span className="ml-auto text-muted-foreground">
                      {format(nextSaturday(today), "E, h:m b")}
                    </span>
                  </Button>
                  <Button className="justify-start font-normal" variant="ghost">
                    Next week
                    <span className="ml-auto text-muted-foreground">
                      {format(addDays(today, 7), "E, h:m b")}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="p-2">
                <Calendar />
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button disabled={!mail} size="icon" title="Reply" variant="ghost">
            <Reply className="h-4 w-4" />
            <span className="sr-only">Reply</span>
          </Button>
          <Button
            disabled={!mail}
            size="icon"
            title="Reply all"
            variant="ghost"
          >
            <ReplyAll className="h-4 w-4" />
            <span className="sr-only">Reply all</span>
          </Button>
          <Button disabled={!mail} size="icon" title="Forward" variant="ghost">
            <Forward className="h-4 w-4" />
            <span className="sr-only">Forward</span>
          </Button>
        </div>
        <Separator className="mx-2 h-6" orientation="vertical" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={!mail} size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mark as unread</DropdownMenuItem>
            <DropdownMenuItem>Star thread</DropdownMenuItem>
            <DropdownMenuItem>Add label</DropdownMenuItem>
            <DropdownMenuItem>Mute thread</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Separator />
      {mail ? (
        <div className="flex flex-1 flex-col">
          <div className="flex items-start p-4">
            <div className="flex items-start gap-4 text-sm">
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(" ")
                    .map((chunk) => chunk[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="font-semibold">{mail.name}</div>
                <div className="line-clamp-1 text-xs">{mail.subject}</div>
                <div className="line-clamp-1 text-xs">
                  <span className="font-medium">Reply-To:</span> {mail.email}
                </div>
              </div>
            </div>
            {mail.date && (
              <div className="ml-auto text-muted-foreground text-xs">
                {format(new Date(mail.date), "PPpp")}
              </div>
            )}
          </div>
          <Separator />
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            {mail.text}
          </div>
          <Separator className="mt-auto" />
          <div className="p-4">
            <form>
              <div className="grid gap-4">
                <Textarea
                  className="p-4"
                  placeholder={`Reply ${mail.name}...`}
                />
                <div className="flex items-center">
                  <Label
                    className="flex items-center gap-2 font-normal text-xs"
                    htmlFor="mute"
                  >
                    <Switch aria-label="Mute thread" id="mute" /> Mute this
                    thread
                  </Label>
                  <Button
                    className="ml-auto"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground">
          No message selected
        </div>
      )}
    </div>
  );
}
