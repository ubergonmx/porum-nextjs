import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { randomBytes } from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomString = (
  length: number,
  numericOnly: boolean = false,
) => {
  const numericAlphabet = "23456789"; // Removing 0 and 1
  const alphabet = numericOnly
    ? numericAlphabet
    : "abcdefghjkmnpqrstuvwxyz23456789"; // Lowercase letters only, removing 0, 1, and ambiguous letters

  const secureRandomString = randomBytes(length)
    .map((value) =>
      alphabet.charCodeAt(Math.floor((value / 256) * alphabet.length)),
    )
    .reduce((acc, charCode) => acc + String.fromCharCode(charCode), "");

  return secureRandomString;
};

export const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};
