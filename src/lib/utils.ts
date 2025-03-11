import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const compactFormatter = Intl.NumberFormat("DA-dk", {
  notation: "compact",
});
export const numberFormatter = Intl.NumberFormat("DA-dk", { style: "decimal" });
