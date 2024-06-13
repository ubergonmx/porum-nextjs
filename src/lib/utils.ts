import { type ClassValue, clsx } from "clsx";
import { headers } from "next/headers";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getIP() {
  const forwardedFor = headers().get("x-forwarded-for");
  const realIP = headers().get("x-real-ip");

  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  if (realIP) return realIP.trim();
  return headers().get("remote-addr");
}
