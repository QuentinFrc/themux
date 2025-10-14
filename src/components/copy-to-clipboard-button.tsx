import { Check, Clipboard } from "lucide-react";
import type { ComponentProps } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface CopyToClipboardButtonProps extends ComponentProps<typeof Button> {
  text: string;
}

export function CopyToClipboardButton({
  text,
  className,
  onClick,
  ...props
}: CopyToClipboardButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  return (
    <Button
      className={className}
      onClick={() => copyToClipboard(text)}
      size="icon"
      variant="ghost"
      {...props}
    >
      <Clipboard
        className={cn(
          "size-4 transition duration-200",
          isCopied ? "absolute scale-0" : "scale-100"
        )}
      />
      <Check
        className={cn(
          "size-4 transition duration-200",
          isCopied ? "scale-100" : "absolute scale-0"
        )}
      />
    </Button>
  );
}
