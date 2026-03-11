import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 *
 * @param inputs - Class names, arrays, or objects to merge
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * ```tsx
 * cn("px-2 py-1", isActive && "bg-blue-500", { "font-bold": isImportant })
 * // => "px-2 py-1 bg-blue-500 font-bold" (if both conditions are true)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
