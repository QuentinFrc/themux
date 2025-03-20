import { ActiveThemeProvider } from "@/components/active-theme";
import { ReactScan } from "@/components/devtools/react-scan";

import { ScreenDevTools } from "@/components/devtools/screen-devtools";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeValue } from "@/lib/themes";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "themux",
  description:
    "themux is a shadcn/ui theme generator supporting TailwindCSS v4.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get("active_theme")?.value as ThemeValue;
  const isScaled = activeThemeValue?.endsWith("-scaled");

  return (
    <html lang="en" suppressHydrationWarning>
      <ReactScan options={{ enabled: false, showToolbar: false }} />

      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} font-sans antialiased`,
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            {children}
            <Toaster />
          </ActiveThemeProvider>
          <ScreenDevTools />
        </ThemeProvider>
      </body>
    </html>
  );
}
