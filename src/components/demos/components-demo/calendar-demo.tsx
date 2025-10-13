"use client";

import { addDays } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 30),
  });
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 12),
    to: addDays(new Date(new Date().getFullYear(), 0, 12), 50),
  });

  return (
    <div className="flex @md:flex-row flex-col flex-wrap items-start justify-center gap-2">
      <Calendar
        className="rounded-md border shadow-sm"
        mode="single"
        onSelect={setDate}
        selected={date}
      />
      <Calendar
        className="rounded-md border shadow-sm"
        defaultMonth={dateRange?.from}
        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
        mode="range"
        numberOfMonths={2}
        onSelect={setDateRange}
        selected={dateRange}
      />
      <Calendar
        className="@4xl:flex hidden rounded-md border shadow-sm [&>div]:gap-5"
        defaultMonth={range?.from}
        mode="range"
        numberOfMonths={3}
        onSelect={setRange}
        selected={range}
      />
    </div>
  );
}
