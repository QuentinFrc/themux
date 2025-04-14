export const sansFonts = {
  Inter: "Inter, sans-serif",
  Roboto: "Roboto, sans-serif",
  "Open Sans": "Open Sans, sans-serif",
  Poppins: "Poppins, sans-serif",
  Montserrat: "Montserrat, sans-serif",
  Outfit: "Outfit, sans-serif",
  "Plus Jakarta Sans": "Plus Jakarta Sans, sans-serif",
  "DM Sans": "DM Sans, sans-serif",
  "IBM Plex Sans": "IBM Plex Sans, sans-serif",
  Geist: "Geist, sans-serif",
  Oxanium: "Oxanium, sans-serif",
  "Instrument Sans": "Instrument Sans, sans-serif",
} as const;

export const sansFontsArray = Object.entries(sansFonts).map(([key, value]) => {
  return { label: key, value: value };
});

export const serifFonts = {
  Merriweather: "Merriweather, serif",
  "Playfair Display": "Playfair Display, serif",
  Lora: "Lora, serif",
  "Source Serif Pro": "Source Serif Pro, serif",
  "Libre Baskerville": "Libre Baskerville, serif",
  "Space Grotesk": "Space Grotesk, serif",
} as const;

export const serifFontsArray = Object.entries(serifFonts).map(
  ([key, value]) => {
    return { label: key, value: value };
  },
);

export const monoFonts = {
  "JetBrains Mono": "JetBrains Mono, monospace",
  "Fira Code": "Fira Code, monospace",
  "Source Code Pro": "Source Code Pro, monospace",
  "IBM Plex Mono": "IBM Plex Mono, monospace",
  "Space Mono": "Space Mono, monospace",
  "Geist Mono": "Geist Mono, monospace",
} as const;

export const monoFontsArray = Object.entries(monoFonts).map(([key, value]) => {
  return { label: key, value: value };
});
