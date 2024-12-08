"use client";

import { z } from "zod";

export const searchSchema = z.object({
  country: z.string().min(1, { message: "Kraj jest wymagane" }),
  region: z.string().min(1, { message: "Województwo jest wymagane" }),
  city: z.string().min(1, { message: "Miasto jest wymagane" }),
  dateRange: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .refine((date) => date.to >= date.from, {
      message: "Data końcowa musi być późniejsza niż początkowa",
    }),
  rentFrom: z.number().int().min(0, { message: "Cena wynajmu od musi być liczbą dodatnią" }),
  rentTo: z.number().int().min(0, { message: "Cena wynajmu do musi być liczbą dodatnią" }),
  surfaceAreaFrom: z.number().int().min(0, { message: "Powierzchnia od musi być liczbą dodatnią" }),
  surfaceAreaTo: z.number().int().min(0, { message: "Powierzchnia do musi być liczbą dodatnią" }),
});
