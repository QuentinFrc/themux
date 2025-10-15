"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { toast } from "sonner";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";
import {
  type TailwindColorName,
  type TailwindShadeKey,
} from "@/lib/palettes";
import { convertToHex, convertToOklch } from "@/utils/color-converter";
import { isValidColor } from "@/utils/colors";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { TokenDisplay, TokenInfo } from "./token";

interface BaseColorPickerProps {
  colorName: TailwindColorName;
  shade: TailwindShadeKey;
  color: string;
  onChange: (color: string) => void;
}

export function BaseColorPicker({
  colorName,
  shade,
  color,
  onChange,
}: BaseColorPickerProps) {
  const [currentColor, setCurrentColor] = useState(color);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (color !== currentColor) {
      setCurrentColor(color);
    }
  }, [color, currentColor]);

  const hexColor = convertToHex(currentColor);

  const handleColorChange = useDebouncedCallback((value: string) => {
    const nextColor = convertToOklch(value);
    setCurrentColor(nextColor);
    onChange(nextColor);
  }, 100);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue.trim() === "") return;

    const normalizedValue = inputValue.trim().toLowerCase();

    if (!isValidColor(normalizedValue)) {
      toast.error("Invalid color format.");
      return;
    }

    try {
      const nextColor = convertToOklch(normalizedValue);
      setCurrentColor(nextColor);
      onChange(nextColor);
      setInputValue("");
    } catch {
      toast.error("Failed to normalize color.");
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const propertyName = `color-${colorName}-${shade}`;

  return (
    <Popover>
      <div className="flex items-center gap-2">
        <PopoverTrigger className="relative cursor-pointer">
          <TokenDisplay color={currentColor} />
        </PopoverTrigger>
        <TokenInfo
          color={currentColor}
          colorProperty={propertyName}
          rawColor={color}
        />
      </div>

      <PopoverContent align="start" className="w-60 space-y-3 p-4">
        <div className="mx-auto w-fit">
          <HexColorPicker color={hexColor} onChange={handleColorChange} />
        </div>

        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <Input
            className="h-9 flex-1 font-mono lowercase"
            onChange={handleInputChange}
            placeholder="oklch(), hsl(), rgb(), #hex"
            value={inputValue}
          />
          <Button size="sm" type="submit" variant="outline">
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
