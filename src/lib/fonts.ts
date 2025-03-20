import {
  Geist,
  Geist_Mono,
  Instrument_Sans,
  Inter,
  Mulish,
  Noto_Sans_Mono,
} from "next/font/google";

import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fontInstrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

const fontNotoMono = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-noto-mono",
});

const fontMullish = Mulish({
  subsets: ["latin"],
  variable: "--font-mullish",
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = cn(
  geistSans.variable,
  geistMono.variable,
  fontInstrument.variable,
  fontNotoMono.variable,
  fontMullish.variable,
  fontInter.variable,
);
