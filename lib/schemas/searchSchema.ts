"use client";

import { z } from "zod";

export const searchSchema = z.object({
  city: z.string().optional(),
  dateRange: z
    .object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
    .refine((date) => !date.from || !date.to || date.to >= date.from, {
      message: "Data końcowa musi być późniejsza niż początkowa",
    })
    .optional(),
  rentFrom: z.number().int().nonnegative().optional(),
  rentTo: z.number().int().nonnegative().optional(),
  surfaceAreaFrom: z.number().int().nonnegative().optional(),
  surfaceAreaTo: z.number().int().nonnegative().optional(),
});
