import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFirstTwoLettersOfString(inputString: string): string {
  if (inputString.length < 2) {
    throw new Error("Input string must have at least two characters")
  }

  const firstTwoLetters = inputString.substring(0, 2).toUpperCase()

  return firstTwoLetters
}
