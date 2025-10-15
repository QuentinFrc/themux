"use client";

import {type ChangeEvent, type FormEvent, useEffect, useState} from "react";
import {HexColorPicker} from "react-colorful";
import {toast} from "sonner";
import {useDebouncedCallback} from "@/hooks/use-debounced-callback";
import {
    type TailwindColorName,
    type TailwindShadeKey,
} from "@/lib/palettes";
import {convertToHex, convertToOklch} from "@/utils/color-converter";
import {isValidColor} from "@/utils/colors";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover";
import {TokenDisplay, TokenInfo} from "./token";
import {Badge} from "@/components/ui/badge";
import {Check, Clipboard, Link2} from "lucide-react";
import {cn} from "@/lib/utils";
import {ButtonGroup} from "@/components/ui/button-group";
import {InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput} from "@/components/ui/input-group";

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

    return (
        <Popover>
            <div className="flex flex-col items-center gap-2 ">
                <PopoverTrigger className="w-full relative cursor-pointer">
                    <TokenDisplay className={"h-10 w-full aspect-[unset]"} color={currentColor}/>
                </PopoverTrigger>
                <p className="font-mono font-semibold text-xs text-muted-foreground">
                    {shade}
                </p>
            </div>

            <PopoverContent align="start" className="w-60 space-y-3 p-4">
                <div className="mx-auto w-fit">
                    <HexColorPicker color={hexColor} onChange={handleColorChange}/>
                </div>

                <form className="flex items-center gap-2" onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputGroupInput
                            className="flex-1 font-mono lowercase"
                            onChange={handleInputChange}
                            placeholder="oklch(), hsl(), rgb(), #hex"
                            value={inputValue}
                        />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton type="submit" variant="outline" size="icon-xs">
                                <Check />
                            </InputGroupButton>
                        </InputGroupAddon>
                    </InputGroup>
                </form>
            </PopoverContent>
        </Popover>
    );
}
