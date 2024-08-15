import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: "Sonner" }), 1500));

export const discountCodes = ["SAVE10", "FLAT20"];
