// pulled from/inspired by https://github.com/shadcn-ui/ui/blob/main/apps/www/components/theme-customizer.tsx
"use client";

import { useMounted } from "@/hooks/use-mounted";
import { ColorTokens } from "./color-tokens";
import { Customizer } from "./customizer";

export function ThemeCustomizer() {
  const isMounted = useMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full">
        <div className="grid grid-cols-1 gap-6 @2xl:grid-cols-2 @5xl:grid-cols-[6fr_4fr]">
          <Customizer />

          <ColorTokens className="max-h-58" />
        </div>
      </div>
    </div>
  );
}
