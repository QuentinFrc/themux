"use client";

import { Bold, Italic, Underline } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

const OPTIONS = [
  { value: "bold", icon: Bold, label: "Bold" },
  { value: "italic", icon: Italic, label: "Italic" },
  { value: "underline", icon: Underline, label: "Underline" },
];

export function ButtonGroupDemo() {
  const [value, setValue] = React.useState<string>(OPTIONS[0]?.value ?? "");

  return (
    <div className="flex flex-col items-start gap-3">
      <ButtonGroup aria-label="Toggle text formatting">
        {OPTIONS.map((option) => (
          <Button
            aria-label={option.label}
            variant={value === option.value ? "default" : "outline"}
            key={option.value}
            onClick={() => setValue(option.value)}
          >
            <option.icon />
          </Button>
        ))}
      </ButtonGroup>

      <p className="text-muted-foreground text-sm">
        Active style:{" "}
        <span className="font-medium text-foreground capitalize">{value}</span>
      </p>
    </div>
  );
}
