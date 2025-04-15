export const sansFonts = {
  Geist: "Geist, sans-serif",
  Inter: "Inter, sans-serif",
  Roboto: "Roboto, sans-serif",
  "Open Sans": "Open Sans, sans-serif",
  Poppins: "Poppins, sans-serif",
  Montserrat: "Montserrat, sans-serif",
  "Plus Jakarta Sans": "Plus Jakarta Sans, sans-serif",
  "DM Sans": "DM Sans, sans-serif",
  "IBM Plex Sans": "IBM Plex Sans, sans-serif",
  Quicksand: "Quicksand, sans-serif",
  Outfit: "Outfit, sans-serif",
  Lato: "Lato, sans-serif",
  Oxanium: "Oxanium, sans-serif",
  "Instrument Sans": "Instrument Sans, sans-serif",
} as const;

export const sansFontsArray = Object.entries(sansFonts).map(([key, value]) => {
  return { label: key, value: value };
});

export const serifFonts = {
  "IBM Plex Serif": "IBM Plex Serif, serif",
  "Roboto Serif": "Roboto Serif, serif",
  Merriweather: "Merriweather, serif",
  "Playfair Display": "Playfair Display, serif",
  Lora: "Lora, serif",
  "Libre Baskerville": "Libre Baskerville, serif",
} as const;

export const serifFontsArray = Object.entries(serifFonts).map(
  ([key, value]) => {
    return { label: key, value: value };
  },
);

export const monoFonts = {
  "Geist Mono": "Geist Mono, monospace",
  "JetBrains Mono": "JetBrains Mono, monospace",
  "Fira Code": "Fira Code, monospace",
  "IBM Plex Mono": "IBM Plex Mono, monospace",
  "Source Code Pro": "Source Code Pro, monospace",
  "Space Mono": "Space Mono, monospace",
} as const;

export const monoFontsArray = Object.entries(monoFonts).map(([key, value]) => {
  return { label: key, value: value };
});
