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

export function calculateTimeLeft(targetDate) {
  const total = targetDate.getTime() - Date.now();

  if (total <= 0) {
    return { days: '00', hours: '00', minutes: '00', seconds: '00' };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  // Format single digits with a leading 0
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedHours = String(hours).padStart(2, '0');
  const formattedDays = String(days).padStart(2, '0');

  return { days: formattedDays, hours: formattedHours, minutes: formattedMinutes, seconds: formattedSeconds };
}