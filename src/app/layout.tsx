import { ReactScan } from "@/components/devtools/react-scan";

import { ScreenDevTools } from "@/components/devtools/screen-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSync } from "@/components/theme-sync";
import { Toaster } from "@/components/ui/sonner";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

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
    title: "themux | shadcn/ui theme generator supporting Tailwind v4.",
    description:
      "A shadcn/ui theme generator, but fully customizable. Supports Tailwind v4 and v3.",
  },
  generator: "Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan options={{ enabled: true }} />

      <body className={cn(`font-sans antialiased`, fontVariables)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <ThemeSync />
          <Toaster />
          <ScreenDevTools />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
