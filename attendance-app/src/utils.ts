import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind cn merge
const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export { cn }