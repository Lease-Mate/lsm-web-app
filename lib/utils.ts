import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isObject(obj: unknown) {
  return obj !== null && typeof obj === "object";
}

function isArray(val: unknown) {
  return Object.prototype.toString.apply(val) === "[object Array]";
}

export function flattenObject(obj: object) {
  let flattened = {};

  for (const key in obj) {
    if (isObject(obj[key]) && !isArray(obj[key])) {
      flattened = { ...flattened, ...obj[key] };
    } else {
      flattened = { ...flattened, [key]: obj[key] };
    }
  }

  return flattened;
}
