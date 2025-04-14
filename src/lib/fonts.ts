import {
  DM_Sans,
  Fira_Code,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
  Montserrat,
  Open_Sans,
  Outfit,
  Oxanium,
  Plus_Jakarta_Sans,
  Poppins,
  Roboto,
  Source_Code_Pro,
  Space_Mono,
} from "next/font/google";

import { cn } from "@/lib/utils";

// -------------- sans fonts ------------------
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const oxanium = Oxanium({
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
});

export function loadSansFonts() {
  return {
    sans: cn(
      inter.variable,
      roboto.variable,
      openSans.variable,
      poppins.className,
      montserrat.variable,
      outfit.variable,
      plusJakartaSans.variable,
      dmSans.variable,
      ibmPlexSans.className,
      geistSans.variable,
      oxanium.className,
      instrumentSans.variable,
    ),
  };
}

// ----------- mono fonts ------------------
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function loadMonoFonts() {
  return {
    mono: cn(
      jetBrainsMono.variable,
      firaCode.variable,
      sourceCodePro.variable,
      ibmPlexMono.className,
      spaceMono.className,
      geistMono.variable,
    ),
  };
}
