"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function GoBackButton({
  children,
  className,
  ...props
}: ComponentProps<typeof Button>) {
  const router = useRouter();

  const goBack = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <Button {...props} className={cn(className)} onClick={goBack}>
      {children}
    </Button>
  );
}
