import { ReactScan } from "@/components/devtools/react-scan";

import { ScreenDevTools } from "@/components/devtools/screen-devtools";
import { FontLoader } from "@/components/font-loader";
import { ThemeSync } from "@/components/theme-sync";
import { Toaster } from "@/components/ui/sonner";
import { db } from "@/database/drizzle/client";
import { createThemeVersionRepository } from "@/database/repositories/theme-repository";
import { initialThemeConfig } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { generateThemeVariables } from "@/utils/theme-style-generator";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "themux | shadcn/ui theme generator",
    template: "%s | themux",
  },
  description:
    "A shadcn/ui theme generator, but fully customizable. Supports Tailwind v4 and v3.",
  keywords: [
    "themux",
    "themux shadcn",
    "shadcn",
    "shadcn/ui",
    "Tailwind",
    "Tailwind v4",
    "TailwindCSS",
    "theme generator",
    "theme customizer",
    "theme editor",
    "Next.js",
    "llanesluis",
  ],
  authors: [
    {
      name: "llanesluis",
      url: "https://www.llanesluis.xyz/",
    },
  ],
  creator: "llanesluis",
  metadataBase: new URL("https://themux.vercel.app"),
  openGraph: {
    title: "themux | Not your regular shadcn/ui theme generator",
    description:
      "A shadcn/ui theme generator, but fully customizable. Supports Tailwind v4 and v3 and different color formats.",
  },
  generator: "Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const repository = createThemeVersionRepository(db);
  const latestThemeVersion = await repository.getLatestThemeVersion();

  const activeThemeConfig = latestThemeVersion?.config.theme ?? initialThemeConfig;

  const themeCss = latestThemeVersion
    ? `${latestThemeVersion.config.css.root}\n${latestThemeVersion.config.css.dark}`
    : [
        generateThemeVariables(initialThemeConfig, "light", {
          themeVarsSettings: { fontVars: true, shadowVars: true },
        }),
        generateThemeVariables(initialThemeConfig, "dark", {
          themeVarsSettings: { fontVars: true, shadowVars: true },
        }),
      ].join("\n");

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.googleapis.com" rel="preconnect" />
        <style id="theme-variables">{themeCss}</style>
      </head>
      <ReactScan options={{ enabled: true }} />

      <body className={cn("antialiased")}>
        <Providers initialThemeConfig={activeThemeConfig}>
          <Suspense>
            {children}
            <ThemeSync />
          </Suspense>

          <FontLoader />
          <Toaster />
          <ScreenDevTools />
        </Providers>
      </body>
    </html>
  );
}
