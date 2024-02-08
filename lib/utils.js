import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(inputString) {
  // Check if the inputString is not empty
  if (inputString && typeof inputString === 'string' && inputString.length > 0) {
    // Slice the first letter, capitalize it, and concatenate it with the rest of the string
    return inputString.charAt(0).toUpperCase();
  } else {
    // Return the input as is if it's empty or not a string
    return inputString;
  }
}