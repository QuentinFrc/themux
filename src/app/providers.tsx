import { NuqsAdapter } from "nuqs/adapters/next/app";

import { PostHogProvider } from "@/components/posthog-provider";
import { ThemeConfigProvider } from "@/components/theme-config-provider";
import { ThemeProvider } from "@/components/theme-provider";
import type { ThemeConfig } from "@/types/theme";

export function Providers({
  children,
  initialThemeConfig,
}: {
  children: React.ReactNode;
  initialThemeConfig: ThemeConfig;
}) {
  return (
    <ThemeConfigProvider initialConfig={initialThemeConfig}>
      <PostHogProvider>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}
          </ThemeProvider>
        </NuqsAdapter>
      </PostHogProvider>
    </ThemeConfigProvider>
  );
}
