"use client";

import { ColorProperty, OklchValue } from "@/types/theme";
import { hexToOklch, oklchToHex } from "@/utils/colors";
import { Pipette } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { TokenDisplay, TokenInfo } from "./token";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface OklchColorPickerProps {
  colorProperty: ColorProperty;
  label: string;
  oklchColor: OklchValue;
  setColorTokens: (color: OklchValue) => void;
}

export function OklchColorPicker({
  colorProperty,
  label,
  oklchColor,
  setColorTokens,
}: OklchColorPickerProps) {
  const [hexColor, setHexColor] = useState(() => oklchToHex(oklchColor));

  const handleColorChange = (newHexColor: string) => {
    setHexColor(newHexColor);

    const newOklchColor = hexToOklch(newHexColor);
    setColorTokens(newOklchColor);
  };

  return (
    <div>
      <div>
        <TokenColorPicker
          label={label}
          colorProperty={colorProperty}
          oklchColor={oklchColor}
          hexColor={hexColor}
          handleColorChange={handleColorChange}
        />
      </div>
    </div>
  );
}

function TokenColorPicker({
  colorProperty,
  oklchColor,
  hexColor,
  handleColorChange,
}: {
  colorProperty: ColorProperty;
  label: string;
  oklchColor: OklchValue;
  hexColor: string;
  handleColorChange: (newHexColor: string) => void;
}) {
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
