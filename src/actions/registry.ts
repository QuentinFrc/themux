"use server";

import { ThemeObject } from "@/types/theme";
import { generateThemeRegistryFromThemeObject } from "@/utils/registry/themes";

export async function generateThemeRegistryItemFromThemeObject(
  themeObject: ThemeObject,
) {
  // Mutate the name to make it unique
  const randomId = crypto.randomUUID();
  themeObject.name = `${themeObject.name}-${randomId}`;

  try {
    const registryItem = generateThemeRegistryFromThemeObject(themeObject);
    return {
      success: true,
      data: registryItem.name,
    };
  } catch (e) {
    return {
      success: false,
      error: "An error occurred while generating the theme registry item.",
    };
  }
}
