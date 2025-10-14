import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ExternalLinkProps extends ComponentProps<"a"> {
  showIcon?: boolean;
}

export function ExternalLink({
  href,
  className,
  children,
  title,
  showIcon,
  ...rest
}: ExternalLinkProps) {
  if (!children) return null;

  return (
    <a
      className={cn(
        "group/link inline-flex w-fit items-center justify-between",
        className
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={title}
      {...rest}
    >
      <span className="group-hover/link:underline">{children}</span>
      {showIcon && (
        <ArrowUpRight
          className="transition group-hover/link:rotate-45"
          size={12}
        />
      )}
    </a>
  );
}
