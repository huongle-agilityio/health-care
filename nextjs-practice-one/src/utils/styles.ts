import clsx from 'clsx';
import { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names into a single string.
 * @param inputs - The class name inputs to process.
 * @returns A single string of combined and resolved class names.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
