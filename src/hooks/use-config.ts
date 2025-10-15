import {useAtom} from "jotai/react";
import {atomWithStorage, createJSONStorage, unstable_withStorageValidator as withStorageValidator,} from "jotai/utils";
import {initialThemeConfig, themeConfigSchema} from "@/lib/themes";
import type {ThemeConfig} from "@/types/theme";
import {LOCAL_STORAGE_KEYS} from "@/utils/constants";

const isThemeConfigSchema = (v) => themeConfigSchema.safeParse(v).success

const initialConfigAtom = atomWithStorage<ThemeConfig>(
    LOCAL_STORAGE_KEYS.themeConfig,
    initialThemeConfig,
    withStorageValidator(isThemeConfigSchema)(createJSONStorage())
);

export function useConfig() {
    return useAtom(initialConfigAtom);
}
