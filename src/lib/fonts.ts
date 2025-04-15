import {
  DM_Sans,
  Fira_Code,
  Geist,
  Geist_Mono,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Instrument_Sans,
  Inter,
  JetBrains_Mono,
  Lato,
  Libre_Baskerville,
  Lora,
  Merriweather,
  Montserrat,
  Open_Sans,
  Outfit,
  Oxanium,
  Playfair_Display,
  Plus_Jakarta_Sans,
  Poppins,
  Quicksand,
  Roboto,
  Roboto_Serif,
  Source_Code_Pro,
  Space_Mono,
} from "next/font/google";

import { cn } from "@/lib/utils";

// -------------- sans fonts ------------------
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const oxanium = Oxanium({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
});

const lato = Lato({
  variable: "--font-lato",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
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
      lato.variable,
      quicksand.variable,
    ),
  };
}

// ----------- mono fonts ------------------
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  weight: ["400"],
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  weight: ["400"],
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  weight: ["400"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400"],
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

// ------------------ serif fonts ------------------
const merriweather = Merriweather({
  variable: "--font-merriweather",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  variable: "--font-source-serif-pro",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  variable: "--font-roboto-serif",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const loadSerifFonts = () => {
  return {
    serif: cn(
      merriweather.variable,
      playfairDisplay.variable,
      lora.variable,
      libreBaskerville.variable,
      ibmPlexSerif.variable,
      robotoSerif.variable,
    ),
  };
};
