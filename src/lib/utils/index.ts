import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge CSS classes with Tailwind CSS conflict resolution
 *
 * This function combines clsx for conditional class names with tailwind-merge
 * for intelligent Tailwind CSS class merging. It resolves conflicts by keeping
 * the last conflicting class and removes duplicates.
 *
 * @param inputs - Variable number of class values (strings, objects, arrays, etc.)
 * @returns string - Merged and deduplicated CSS class string
 *
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-2 py-1', 'px-3') // Returns 'py-1 px-3'
 *
 * // Conditional classes
 * cn('base-class', isActive && 'active-class', isDisabled && 'disabled-class')
 *
 * // With objects
 * cn('base-class', { 'conditional-class': someCondition })
 *
 * // Complex example
 * cn(
 *   'text-sm font-medium',
 *   variant === 'primary' && 'bg-blue-500 text-white',
 *   variant === 'secondary' && 'bg-gray-500 text-white',
 *   className
 * )
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
