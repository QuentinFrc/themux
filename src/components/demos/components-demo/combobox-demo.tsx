"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronsUpDown,
  PlusCircleIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type Framework = (typeof frameworks)[number];

const users = [
  {
    id: "1",
    username: "shadcn",
  },
  {
    id: "2",
    username: "leerob",
  },
  {
    id: "3",
    username: "evilrabbit",
  },
] as const;

type User = (typeof users)[number];

const timezones = [
  {
    label: "Americas",
    timezones: [
      { value: "America/New_York", label: "(GMT-5) New York" },
      { value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
      { value: "America/Chicago", label: "(GMT-6) Chicago" },
      { value: "America/Toronto", label: "(GMT-5) Toronto" },
      { value: "America/Vancouver", label: "(GMT-8) Vancouver" },
      { value: "America/Sao_Paulo", label: "(GMT-3) São Paulo" },
    ],
  },
  {
    label: "Europe",
    timezones: [
      { value: "Europe/London", label: "(GMT+0) London" },
      { value: "Europe/Paris", label: "(GMT+1) Paris" },
      { value: "Europe/Berlin", label: "(GMT+1) Berlin" },
      { value: "Europe/Rome", label: "(GMT+1) Rome" },
      { value: "Europe/Madrid", label: "(GMT+1) Madrid" },
      { value: "Europe/Amsterdam", label: "(GMT+1) Amsterdam" },
    ],
  },
  {
    label: "Asia/Pacific",
    timezones: [
      { value: "Asia/Tokyo", label: "(GMT+9) Tokyo" },
      { value: "Asia/Shanghai", label: "(GMT+8) Shanghai" },
      { value: "Asia/Singapore", label: "(GMT+8) Singapore" },
      { value: "Asia/Dubai", label: "(GMT+4) Dubai" },
      { value: "Australia/Sydney", label: "(GMT+11) Sydney" },
      { value: "Asia/Seoul", label: "(GMT+9) Seoul" },
    ],
  },
] as const;

type Timezone = (typeof timezones)[number];

export function ComboboxDemo() {
  return (
    <div className="flex w-full flex-wrap items-start @max-3xl:justify-start justify-center gap-4">
      <FrameworkCombobox frameworks={[...frameworks]} />
      <UserCombobox selectedUserId={users[0].id} users={[...users]} />
      <TimezoneCombobox
        selectedTimezone={timezones[0].timezones[0]}
        timezones={[...timezones]}
      />
      <ComboboxWithCheckbox frameworks={[...frameworks]} />
    </div>
  );
}

function FrameworkCombobox({ frameworks }: { frameworks: Framework[] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between md:max-w-[200px]"
          role="combobox"
          variant="outline"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  value={framework.value}
                >
                  {framework.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function UserCombobox({
  users,
  selectedUserId,
}: {
  users: User[];
  selectedUserId: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedUserId);

  const selectedUser = React.useMemo(
    () => users.find((user) => user.id === value),
    [value, users]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-full justify-between px-2 md:max-w-[200px]"
          role="combobox"
          variant="outline"
        >
          {selectedUser ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-5">
                <AvatarImage
                  src={`https://github.com/${selectedUser.username}.png`}
                />
                <AvatarFallback>{selectedUser.username[0]}</AvatarFallback>
              </Avatar>
              {selectedUser.username}
            </div>
          ) : (
            "Select user..."
          )}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  value={user.id}
                >
                  <Avatar className="size-5">
                    <AvatarImage
                      src={`https://github.com/${user.username}.png`}
                    />
                    <AvatarFallback>{user.username[0]}</AvatarFallback>
                  </Avatar>
                  {user.username}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      value === user.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <PlusCircleIcon />
                Create user
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function TimezoneCombobox({
  timezones,
  selectedTimezone,
}: {
  timezones: Timezone[];
  selectedTimezone: Timezone["timezones"][number];
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(selectedTimezone.value);

  const selectedGroup = React.useMemo(
    () =>
      timezones.find((group) =>
        group.timezones.find((tz) => tz.value === value)
      ),
    [value, timezones]
  );

  const selectedTimezoneLabel = React.useMemo(
    () => selectedGroup?.timezones.find((tz) => tz.value === value)?.label,
    [value, selectedGroup]
  );

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className="h-12 w-full justify-between px-2.5 md:max-w-[200px]"
          variant="outline"
        >
          {selectedTimezone ? (
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-normal text-muted-foreground text-xs">
                {selectedGroup?.label}
              </span>
              <span>{selectedTimezoneLabel}</span>
            </div>
          ) : (
            "Select timezone"
          )}
          <ChevronDownIcon className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <Command>
          <CommandInput placeholder="Search timezone..." />
          <CommandList className="scroll-pb-12">
            <CommandEmpty>No timezone found.</CommandEmpty>
            {timezones.map((region) => (
              <CommandGroup heading={region.label} key={region.label}>
                {region.timezones.map((timezone) => (
                  <CommandItem
                    key={timezone.value}
                    onSelect={(currentValue) => {
                      setValue(
                        currentValue as Timezone["timezones"][number]["value"]
                      );
                      setOpen(false);
                    }}
                    value={timezone.value}
                  >
                    {timezone.label}
                    <CheckIcon
                      className="ml-auto opacity-0 data-[selected=true]:opacity-100"
                      data-selected={value === timezone.value}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            <CommandSeparator className="sticky bottom-10" />
            <CommandGroup className="sticky bottom-0 bg-popover">
              <CommandItem>
                <PlusCircleIcon />
                Create timezone
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function ComboboxWithCheckbox({ frameworks }: { frameworks: Framework[] }) {
  const [open, setOpen] = React.useState(false);
  const [selectedFrameworks, setSelectedFrameworks] = React.useState<
    Framework[]
  >([]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          className="w-fit min-w-[280px] justify-between"
          role="combobox"
          variant="outline"
        >
          {selectedFrameworks.length > 0
            ? selectedFrameworks.map((framework) => framework.label).join(", ")
            : "Select frameworks (multi-select)..."}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue) => {
                    setSelectedFrameworks(
                      selectedFrameworks.some((f) => f.value === currentValue)
                        ? selectedFrameworks.filter(
                            (f) => f.value !== currentValue
                          )
                        : [...selectedFrameworks, framework]
                    );
                  }}
                  value={framework.value}
                >
                  <div
                    className="pointer-events-none size-4 shrink-0 select-none rounded-[4px] border border-input transition-all data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
                    data-selected={selectedFrameworks.some(
                      (f) => f.value === framework.value
                    )}
                  >
                    <CheckIcon className="size-3.5 text-current" />
                  </div>
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
