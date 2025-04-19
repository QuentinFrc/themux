import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function TooltipWrapper({
  label,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipTrigger> & {
  label: string;
}) {
  const { showTootips } = useSettings();

  if (!showTootips) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={500} key={label} defaultOpen={false}>
      <TooltipTrigger className={cn(className)} {...props}>
        {children}
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
