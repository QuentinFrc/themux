"use client";

import { addDays } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

const start = new Date(2025, 5, 5);

export function CardsCalendar() {
  return (
    <Card className="@2xl:flex hidden p-0">
      <CardContent className="p-0">
        <Calendar
          defaultMonth={start}
          mode="range"
          numberOfMonths={1}
          selected={{
            from: start,
            to: addDays(start, 8),
          }}
        />
      </CardContent>
    </Card>
  );
}
