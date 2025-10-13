"use client";

import * as React from "react";

import {
  Field,
  FieldControl,
  FieldDescription,
  FieldLabel,
  FieldMessage,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function FieldDemo() {
  const [value, setValue] = React.useState("");
  const showError = value.trim().length > 0 && value.trim().length < 3;

  return (
    <Field className="max-w-sm">
      <FieldLabel>Display name</FieldLabel>
      <FieldDescription>
        Used to personalize your public profile.
      </FieldDescription>
      <FieldControl>
        <Input
          onChange={(event) => setValue(event.target.value)}
          placeholder="Enter at least 3 characters"
          value={value}
        />
      </FieldControl>
      {showError ? (
        <FieldMessage>
          Display name must be at least 3 characters long.
        </FieldMessage>
      ) : null}
    </Field>
  );
}
