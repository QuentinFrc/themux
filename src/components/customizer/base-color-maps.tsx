"use client";

import {PaintBucket} from "lucide-react";
import {startCase} from "lodash";
import type {ComponentProps} from "react";
import {useTokens} from "@/hooks/use-tokens";
import {
    TAILWIND_COLOR_NAMES,
    TAILWIND_SHADES,
    type TailwindColorName,
} from "@/lib/palettes";
import {Label} from "../ui/label";
import {ControlSection} from "./customizer-controls";
import {BaseColorPicker} from "./base-color-picker";

export function BaseColorMaps({className}: ComponentProps<"section">) {
    const {getBaseColor, setBaseColor} = useTokens();

    const handleChange = (
        colorName: TailwindColorName,
        shade: (typeof TAILWIND_SHADES)[number],
        value: string
    ) => {
        setBaseColor({colorName, shade, color: value});
    };

    return (
        <section className={className}>
            <Label className="flex items-center gap-1 pb-2">
                <PaintBucket className="size-4"/> Base colors
            </Label>

            <div className="grid grid-cols-[max-content_auto] gap-y-1 gap-x-3">
                {TAILWIND_COLOR_NAMES.map((colorName) => (
                    <div className="grid grid-cols-subgrid col-span-full" key={colorName}>
                        <p className="font-medium text-sm text-muted-foreground mt-2.5">{startCase(colorName)}</p>
                        <div className="grid grid-cols-5 gap-2 sm:grid-cols-7 lg:grid-cols-11">
                            {TAILWIND_SHADES.map((shade) => {
                                const shadeValue = getBaseColor({colorName, shade});
                                return <BaseColorPicker key={shadeValue} color={shadeValue} colorName={colorName} shade={shade}
                                                        onChange={() => handleChange(colorName, shade, colorName)}/>
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
