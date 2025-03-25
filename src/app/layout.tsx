import { ReactScan } from "@/components/devtools/react-scan";

import { ScreenDevTools } from "@/components/devtools/screen-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { ThemeWrapper } from "@/components/theme-wrapper";
import { Toaster } from "@/components/ui/sonner";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "themux",
  description: "A shadcn/ui theme generator that supports TailwindCSS v4.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan options={{ enabled: false, showToolbar: false }} />

      <body className={cn(`font-sans antialiased`, fontVariables)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeWrapper>{children}</ThemeWrapper>
          <ThemeSwitcher />
          <Toaster />
          <ScreenDevTools />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
