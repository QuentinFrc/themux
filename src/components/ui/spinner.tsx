import * as React from "react";

import { cn } from "@/lib/utils";

const Spinner = React.forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        className={cn("size-6 animate-spin text-primary", className)}
        viewBox="0 0 24 24"
        role="status"
        aria-label="Loading"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"
        />
      </svg>
    );
  },
);
Spinner.displayName = "Spinner";

export { Spinner };
