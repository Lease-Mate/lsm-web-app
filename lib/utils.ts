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

export function parseLocalDateString(dateString: string) {
  const [day, month, year] = dateString.split(".").map(Number);
  return new Date(year, month - 1, day);
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
