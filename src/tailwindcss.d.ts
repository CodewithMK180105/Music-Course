declare module "tailwindcss/lib/util/flattenColorPalette" {
    /**
     * Flattens a nested color palette object into a single-level object with color keys and values.
     * @param colors An object representing a nested color palette.
     * @returns A flattened object with string keys and string values representing colors.
     */
    export default function flattenColorPalette(
      colors: Record<string, Record<string, string> | string>
    ): Record<string, string>;
  }
  