import { useEffect, useState } from "react";
import { getContrastRatio } from "@/utils/contrast-checker";
import { useDebouncedCallback } from "./use-debounced-callback";

type ColorPair = {
  id: string;
  foreground: string;
  background: string;
};

type ContrastResult = {
  id: string;
  contrastRatio: number;
};

/**
 * Hook that calculates the contrast ratio between foreground and background colors for a list of pairs.
 * @param colorPairs - An array of color pairs, each with an id, foreground color, and background color.
 * @returns An array of objects, each containing the id and calculated contrast ratio for a pair.
 */
export function useContrastChecker(colorPairs: ColorPair[]) {
  const [contrastResults, setContrastResults] = useState<ContrastResult[]>([]);

  const debouncedCalculation = useDebouncedCallback((pairs: ColorPair[]) => {
    if (!pairs.length) {
      setContrastResults([]);
      return;
    }

    try {
      const results = pairs.map((pair) => {
        const ratio = Number.parseFloat(
          getContrastRatio(pair.foreground, pair.background)
        );
        return {
          id: pair.id,
          contrastRatio: ratio,
        };
      });

      setContrastResults(results);
    } catch (error) {
      console.error("Error checking contrast:", error);
      setContrastResults([]);
    }
  }, 50);

  useEffect(() => {
    debouncedCalculation(colorPairs);
  }, [colorPairs, debouncedCalculation]);

  return contrastResults;
}
