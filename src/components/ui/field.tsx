import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";
import { Label } from "./label";

type FieldContextValue = {
  id: string;
  descriptionId: string;
  messageId: string;
  invalid: boolean;
  setInvalid: (value: boolean) => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useFieldContext(component: string): FieldContextValue {
  const context = React.useContext(FieldContext);
  if (!context) {
    throw new Error(`${component} must be used within a <Field />`);
  }
  return context;
}

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const generatedId = React.useId();
    const [invalid, setInvalid] = React.useState(false);

    const value = React.useMemo(
      () => ({
        id: generatedId,
        descriptionId: `${generatedId}-description`,
        messageId: `${generatedId}-message`,
        invalid,
        setInvalid,
      }),
      [generatedId, invalid],
    );

    return (
      <FieldContext.Provider value={value}>
        <div ref={ref} className={cn("grid w-full gap-2", className)} {...props} />
      </FieldContext.Provider>
    );
  },
);
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, htmlFor, ...props }, ref) => {
  const { id } = useFieldContext("FieldLabel");
  return (
    <Label
      ref={ref}
      htmlFor={htmlFor ?? id}
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
});
FieldLabel.displayName = "FieldLabel";

interface FieldControlProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Slot>, "className"> {
  className?: string;
  asChild?: boolean;
}

const FieldControl = React.forwardRef<HTMLElement, FieldControlProps>(
  ({ asChild = true, className, children, ...props }, ref) => {
    const { id, descriptionId, messageId, invalid } = useFieldContext("FieldControl");

    if (!children) return null;

    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<any>}
          id={(props as React.HTMLAttributes<HTMLElement>).id ?? id}
          aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
          aria-invalid={invalid || undefined}
          className={cn("w-full", className)}
          {...props}
        >
          {children}
        </Slot>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        id={(props as React.HTMLAttributes<HTMLDivElement>).id ?? id}
        aria-describedby={[descriptionId, messageId].filter(Boolean).join(" ") || undefined}
        aria-invalid={invalid || undefined}
        className={cn("flex w-full items-center gap-2", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FieldControl.displayName = "FieldControl";

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFieldContext("FieldDescription");

  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-muted-foreground text-xs", className)}
      {...props}
    />
  );
});
FieldDescription.displayName = "FieldDescription";

const FieldMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { messageId, setInvalid } = useFieldContext("FieldMessage");

  React.useEffect(() => {
    setInvalid(true);
    return () => setInvalid(false);
  }, [setInvalid]);

  return (
    <p
      ref={ref}
      id={messageId}
      className={cn("text-destructive text-xs font-medium", className)}
      {...props}
    />
  );
});
FieldMessage.displayName = "FieldMessage";

export { Field, FieldControl, FieldDescription, FieldLabel, FieldMessage };
