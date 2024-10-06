import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertOptionToFoundVia(option: string): string {
  if (option === "option1") {
    return "Social Media";
  } else if (option === "option2") {
    return "Through a friend";
  } else if (option === "option3") {
    return "Google Search/Website";
  } else if (option === "option4") {
    return "Revisit";
  } else if (option === "option5") {
    return "Others";
  } else {
    return "Undefined";
  }
}
