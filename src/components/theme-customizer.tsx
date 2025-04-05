// pulled from/inspired by https://github.com/shadcn-ui/ui/blob/main/apps/www/components/theme-customizer.tsx
"use client";

import { initialThemeConfig, useConfig } from "@/hooks/use-config";
import { useMounted } from "@/hooks/use-mounted";
import { Repeat } from "lucide-react";
import { ColorTokens } from "./color-tokens";
import { Customizer } from "./customizer";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export function ThemeCustomizer() {
  const isMounted = useMounted();
  const [config, setConfig] = useConfig();

  const resetThemeConfig = () => {
    setConfig(initialThemeConfig);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Card className="relative min-h-[300px] w-full overflow-hidden rounded-lg">
        <CardHeader>
          <div className="flex justify-between gap-4">
            <div className="space-y-1">
              <div className="leading-none font-semibold tracking-tight">
                Theme Customizer
              </div>
              <div className="text-muted-foreground text-xs">
                Customize your colors, then copy and paste the generated CSS
                code to your project.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" onClick={resetThemeConfig}>
                <span className="hidden @md:inline-flex">Reset</span> <Repeat />
                <span className="sr-only">Reset</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 px-2 @2xl:grid-cols-2 @5xl:grid-cols-[6fr_4fr]">
          <Customizer />

          <ColorTokens className="max-h-52 @2xl:max-h-108 @4xl:max-h-90 @6xl:max-h-75" />
        </CardContent>
      </Card>
    </div>
  );
}
