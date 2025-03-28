"use client";

import { ColorProperty, OklchValue } from "@/types/theme";
import { hexToOklch, oklchToHex } from "@/utils/colors";
import { Pipette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { TokenDisplay, TokenInfo } from "./token";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface TokenColorPickerProps {
  colorProperty: ColorProperty;
  oklchColor: OklchValue;
  setColorTokens: (color: OklchValue) => void;
}

export function TokenColorPicker({
  colorProperty,
  oklchColor,
  setColorTokens,
}: TokenColorPickerProps) {
  const hexColor = oklchToHex(oklchColor);

  const handleColorChange = (newHexColor: string) => {
    const newOklchColor = hexToOklch(newHexColor);
    setColorTokens(newOklchColor);
  };

  return (
    <Popover>
      <div className="flex items-center gap-2">
        <PopoverTrigger className="relative cursor-pointer">
          <TokenDisplay oklchColor={oklchColor} />
          <Pipette className="text-primary-foreground absolute inset-0 m-auto size-4" />
        </PopoverTrigger>

        <TokenInfo colorProperty={colorProperty} oklchColor={oklchColor} />
      </div>

      <PopoverContent className="m-0 size-fit p-0">
        <HexColorPicker
          color={hexColor}
          onChange={(hexColor) => handleColorChange(hexColor)}
        />
      </PopoverContent>
    </Popover>
  );
}
